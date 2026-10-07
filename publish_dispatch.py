#!/usr/bin/env python3
"""
Research Dispatch Publisher CLI
===============================
Local publishing tool for Abhijit Singh's Research Archive (mag-and-krotons.github.io).

Usage:
  python3 publish_dispatch.py dispatches/my_note.md
  python3 publish_dispatch.py dispatches/my_note.md --push
  python3 publish_dispatch.py --new
"""

import sys, os, re, json, datetime, subprocess

CATEGORY_MAP = {
    "differential-geometry": {"label": "Fluid Manifolds & Topology", "class": "cat-violet"},
    "number-theory": {"label": "Number Theory & Zeros", "class": "cat-blue"},
    "celestial-mechanics": {"label": "Celestial Throats & Flux", "class": "cat-crimson"},
    "quantum-physics": {"label": "Quantum Negativity & Coherence", "class": "cat-amber"},
    "cortical-networks": {"label": "Cortical & Ternary Networks", "class": "cat-emerald"},
    "general-physics": {"label": "Mathematical Physics & Balance", "class": "cat-blue"}
}

PAPERS_MAP = {
    "01": ("01_Mathematics_Pair_Balance_and_the_Riemann_Zeros", "Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two"),
    "02": ("02_Physics_Pair_Balance_and_the_Universal_Spectrum", "Pair Balance and the Universal Spectrum: The Signed Current and the Wigner Positivity of Riemann States"),
    "03": ("03_Quantum_The_Riemann_Kernel_as_a_Quantum_State", "The Riemann Kernel as a Quantum State: Wigner Negativity, Decoherence at the Thirds and Lee-Yang Zeros"),
    "04": ("04_Computer_Science_Pair_Balanced_Network_Flow", "Pair-Balanced Network Flow: The Signed Current as an Admissibility Criterion for Quantum Routing"),
    "05": ("05_Biology_Excitation_Inhibition_Balance_in_Cortical_Networks", "Excitation-Inhibition Balance in Cortical Networks: The Signed Current as an Order Parameter for Neural Excitability"),
    "06": ("06_Algorithms_Three_Is_Enough", "Three Is Enough: Radix Economy, Balanced-Ternary Arithmetic and Ternary-Weight Networks"),
    "07": ("07_Astrobiology_The_Enceladus_Subsurface_Ocean", "The Enceladus Subsurface Ocean: A Coupled Hydrothermal-Electrochemical Model of Metabolic Energy Availability"),
    "08": ("08_Planetary_The_Four_Giants_as_Balanced_Pairs", "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors"),
    "09": ("09_Neural_Networks_Pair_Balanced_Graph_Attention_Networks", "Pair-Balanced Graph Attention Networks: Sign-Preserving Message Passing for Quantum Circuit Graphs"),
    "10": ("10_Energy_Pair_Balanced_State_of_Charge_Estimation", "Pair-Balanced State-of-Charge Estimation in Multicell Battery Packs: Thermodynamic Current Bounds"),
    "11": ("11_Topology_Balance_and_Duality_in_Topological_Quantum_Systems", "Balance and Duality in Topological Quantum Systems: Majorana Modes, Anyons and Braiding"),
    "12": ("12_Synthesis_The_Geometry_of_Balance", "The Geometry of Balance: A Unifying Principle Across Mathematics, Physics and Biology")
}

def escape_html(text):
    return (text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace('"', "&quot;")
                .replace("'", "&#039;"))

def parse_inline(text):
    # Inline code
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    # Bold
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    # Italic
    text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', text)
    # Links [text](url)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2" target="_blank" rel="noopener noreferrer">\1</a>', text)
    return text

def markdown_to_html(md_text):
    lines = md_text.splitlines()
    html_out = []
    in_list = False
    in_code = False
    in_callout = False
    in_math_block = False
    math_buffer = []

    for line in lines:
        stripped = line.strip()

        # Math display block $$
        if stripped == "$$":
            if in_math_block:
                html_out.append(f'<div class="katex-display-block">$${chr(10).join(math_buffer)}$$</div>')
                math_buffer = []
                in_math_block = False
            else:
                in_math_block = True
            continue
        if in_math_block:
            math_buffer.append(line)
            continue

        # Callout block :::callout ... :::
        if stripped.startswith(":::callout"):
            in_callout = True
            html_out.append('<div class="blog-callout-box">')
            continue
        if stripped == ":::" and in_callout:
            in_callout = False
            html_out.append('</div>')
            continue

        # Code block ```
        if stripped.startswith("```"):
            if in_code:
                html_out.append('</code></pre>')
                in_code = False
            else:
                lang = stripped.replace("```", "").strip()
                html_out.append(f'<pre class="blog-code-block"><code class="language-{lang}">')
                in_code = True
            continue
        if in_code:
            html_out.append(escape_html(line))
            continue

        # Lists
        if stripped.startswith("- ") or stripped.startswith("* "):
            if not in_list:
                html_out.append('<ul>')
                in_list = True
            item_text = parse_inline(stripped[2:])
            html_out.append(f'  <li>{item_text}</li>')
            continue
        elif in_list:
            html_out.append('</ul>')
            in_list = False

        # Headings
        if stripped.startswith("### "):
            html_out.append(f'<h3>{parse_inline(stripped[4:])}</h3>')
            continue
        if stripped.startswith("## "):
            html_out.append(f'<h2>{parse_inline(stripped[3:])}</h2>')
            continue

        # Blockquote
        if stripped.startswith("> "):
            html_out.append(f'<blockquote>{parse_inline(stripped[2:])}</blockquote>')
            continue

        # Empty line
        if not stripped:
            continue

        # Standard paragraph
        html_out.append(f'<p>{parse_inline(stripped)}</p>')

    if in_list:
        html_out.append('</ul>')
    if in_code:
        html_out.append('</code></pre>')
    if in_callout:
        html_out.append('</div>')
    if in_math_block:
        html_out.append(f'<div class="katex-display-block">$${chr(10).join(math_buffer)}$$</div>')

    return "\n".join(html_out)

def parse_frontmatter(file_content):
    meta = {}
    body = file_content

    if file_content.startswith("---"):
        parts = file_content.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1].strip()
            body = parts[2].strip()
            for line in fm_text.splitlines():
                if ":" in line:
                    key, val = line.split(":", 1)
                    key = key.strip().lower().replace("-", "_")
                    val = val.strip().strip('"').strip("'")
                    meta[key] = val

    return meta, body

def publish_from_file(filepath, push_to_git=False):
    if not os.path.exists(filepath):
        print(f"Error: File not found: {filepath}")
        sys.exit(1)

    with open(filepath, "r", encoding="utf-8") as f:
        raw_text = f.read()

    meta, body = parse_frontmatter(raw_text)

    title = meta.get("title")
    if not title:
        print("Error: Dispatch 'title' is required in frontmatter.")
        sys.exit(1)

    category = meta.get("category", "differential-geometry")
    if category not in CATEGORY_MAP:
        print(f"Warning: Unknown category '{category}'. Defaulting to 'differential-geometry'.")
        category = "differential-geometry"

    cat_info = CATEGORY_MAP[category]

    # Generate slug & ID
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')[:48]
    entry_id = meta.get("id") or f"{slug}-{int(datetime.datetime.now().timestamp()) % 100000}"

    now = datetime.datetime.now()
    date_str = meta.get("date") or now.strftime("%B %Y")
    iso_date = meta.get("iso_date") or now.strftime("%Y-%m-%d")

    # Read time estimate
    word_count = len(body.split())
    read_mins = max(1, round(word_count / 160))
    read_time = meta.get("read_time") or f"{read_mins} min read"

    formula_tag = meta.get("formula_tag", "KEY FORMULA / CRITERION")
    formula_highlight = meta.get("formula_highlight") or meta.get("formula_math") or ""

    summary = meta.get("summary") or ""
    if not summary:
        # Default summary from first body paragraph
        summary = body.split("\n\n")[0].replace("#", "").strip()[:200]

    # Tags
    tags_raw = meta.get("tags", "")
    if isinstance(tags_raw, str):
        tags = [t.strip().lstrip('#') for t in tags_raw.split(",") if t.strip()]
    elif isinstance(tags_raw, list):
        tags = tags_raw
    else:
        tags = [cat_info["label"]]

    # Linked paper
    paper_id = meta.get("paper_id", "")
    paper_title = meta.get("paper_title", "")
    paper_pdf = meta.get("paper_pdf", "")

    if paper_id in PAPERS_MAP:
        pdf_stem, official_title = PAPERS_MAP[paper_id]
        paper_title = paper_title or official_title
        paper_pdf = paper_pdf or f"papers/{pdf_stem}.pdf"
        paper_id = pdf_stem

    content_html = markdown_to_html(body)

    # Format JS object
    js_entry = {
        "id": entry_id,
        "title": title,
        "date": date_str,
        "isoDate": iso_date,
        "readTime": read_time,
        "category": category,
        "categoryLabel": cat_info["label"],
        "categoryClass": cat_info["class"],
        "tags": tags,
        "formulaTag": formula_tag,
        "formulaHighlight": formula_highlight,
        "summary": summary,
        "paperId": paper_id,
        "paperTitle": paper_title,
        "paperPdf": paper_pdf
    }

    entry_js_code = (
        "  {\n"
        f"    id: {json.dumps(js_entry['id'])},\n"
        f"    title: {json.dumps(js_entry['title'])},\n"
        f"    date: {json.dumps(js_entry['date'])},\n"
        f"    isoDate: {json.dumps(js_entry['isoDate'])},\n"
        f"    readTime: {json.dumps(js_entry['readTime'])},\n"
        f"    category: {json.dumps(js_entry['category'])},\n"
        f"    categoryLabel: {json.dumps(js_entry['categoryLabel'])},\n"
        f"    categoryClass: {json.dumps(js_entry['categoryClass'])},\n"
        f"    tags: {json.dumps(js_entry['tags'])},\n"
        f"    formulaTag: {json.dumps(js_entry['formulaTag'])},\n"
        f"    formulaHighlight: {json.dumps(js_entry['formulaHighlight'])},\n"
        f"    summary: {json.dumps(js_entry['summary'])},\n"
        f"    paperId: {json.dumps(js_entry['paperId'])},\n"
        f"    paperTitle: {json.dumps(js_entry['paperTitle'])},\n"
        f"    paperPdf: {json.dumps(js_entry['paperPdf'])},\n"
        f"    contentHtml: `\n{content_html}\n    `\n"
        "  },\n"
    )

    # Inject into js/blog.js
    blog_js_path = os.path.join(os.path.dirname(__file__), "js", "blog.js")
    with open(blog_js_path, "r", encoding="utf-8") as f:
        blog_js = f.read()

    target_needle = "const BLOG_ENTRIES = ["
    if target_needle not in blog_js:
        target_needle = "let BLOG_ENTRIES = ["

    if target_needle not in blog_js:
        print("Error: Could not locate BLOG_ENTRIES declaration in js/blog.js")
        sys.exit(1)

    new_blog_js = blog_js.replace(target_needle, f"{target_needle}\n{entry_js_code}")

    with open(blog_js_path, "w", encoding="utf-8") as f:
        f.write(new_blog_js)

    print(f"\n=======================================================")
    print(f" SUCCESS: Research Dispatch Published!")
    print(f" Title:    {title}")
    print(f" Domain:   {cat_info['label']}")
    print(f" ID:       {entry_id}")
    print(f" File:     js/blog.js updated successfully.")
    print(f"=======================================================\n")

    if push_to_git:
        print("Committing and pushing to Git repository...")
        subprocess.run(["git", "add", "js/blog.js"], check=True)
        subprocess.run(["git", "commit", "-m", f"Publish research dispatch: {title}"], check=True)
        subprocess.run(["git", "push", "origin", "main"], check=True)
        print("\n✓ Live on GitHub Pages! Your post will be visible in seconds.")
    else:
        print("Tip: Run 'git add js/blog.js && git commit -m \"Publish dispatch\" && git push' to deploy live.")

def create_template(filepath):
    template = """---
title: "Your Dispatch Title Here"
category: "differential-geometry"
formula_tag: "KEY INVARIANCE FORMULA"
formula_math: "\\nabla \\cdot \\mathbf{J} = 0 \\iff \\oint_{\\partial \\Omega} \\mathbf{v} \\cdot \\hat{n} \\, dS = 0"
tags: ["Topology", "Fluid Manifolds", "Solenoidal Flux"]
summary: "A concise 2-3 sentence overview of this research note to be displayed on the card."
paper_id: "01"
---

### 1. Theoretical Premise
Write your analytical notes in standard Markdown with KaTeX math.

Inline math: $\\lambda_H = 2.508287$.

Display math:
$$
\\lambda^4 - 2\\lambda^2 - 27 = 0
$$

:::callout
<strong>Theoretical Note:</strong>
Any key observation or theorem can be placed inside this callout box.
:::

- Key finding 1
- Key finding 2
"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(template)
    print(f"Created template dispatch at: {filepath}")

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] in ["--help", "-h"]:
        print(__doc__)
        sys.exit(0)

    if sys.argv[1] == "--new":
        dest = f"dispatches/draft_{datetime.date.today().strftime('%Y%m%d')}.md"
        os.makedirs("dispatches", exist_ok=True)
        create_template(dest)
        sys.exit(0)

    target_file = sys.argv[1]
    push = "--push" in sys.argv or "-p" in sys.argv
    publish_from_file(target_file, push_to_git=push)
