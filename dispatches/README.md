# Research Dispatches & Working Notes — Authoring Guide

This directory stores your raw Markdown research notes and theoretical dispatches. All posts are compiled into `js/blog.js` using the local publisher tool (`publish_dispatch.py`) with zero server-side exposure and zero browser vulnerabilities.

---

## 1. Quick Start

### Create a New Draft
Generate a pre-filled markdown draft with standard frontmatter:
```bash
python3 publish_dispatch.py --new
```
This creates a new file `dispatches/draft_YYYYMMDD.md`.

### Publish a Dispatch Locally
Compile the markdown note directly into `js/blog.js`:
```bash
python3 publish_dispatch.py dispatches/my_note.md
```

### Publish and Push Live in One Command
Compile and automatically run `git add`, `git commit`, and `git push` to deploy live to GitHub Pages:
```bash
python3 publish_dispatch.py dispatches/my_note.md --push
```

---

## 2. Frontmatter Specification

Every dispatch starts with a standard YAML frontmatter block:

```markdown
---
title: "Mirror Asymmetries in Collinear Hill Throats"
category: "celestial-mechanics"
formula_tag: "THROAT ASYMMETRY EXPANSION"
formula_math: "A = \frac{h}{3}\left(1 - \frac{h^2}{27} + \mathcal{O}(h^3)\right)"
tags: ["Hill Throats", "Celestial Mechanics", "Restricted Three-Body Problem"]
summary: "An analytical derivation of the throat flux and asymmetry in collinear Lagrange systems."
paper_id: "07"
---
```

### Fields:
* **`title`** (Required): The full title of the dispatch.
* **`category`** (Required): One of the 6 canonical research domains:
  * `differential-geometry` (Geometry & Structure)
  * `number-theory` (Number Theory & Zeros)
  * `celestial-mechanics` (Celestial Mechanics)
  * `quantum-physics` (Quantum Coherence)
  * `cortical-networks` (Ternary & Cortical Networks)
  * `general-physics` (Mathematical Physics)
* **`formula_tag`**: Short uppercase badge text for the formula callout (e.g. `KEY INVARIANCE FORMULA`).
* **`formula_math`**: LaTeX formula highlighted on the feed card.
* **`tags`**: List or comma-separated tags (e.g. `["Topology", "Phase Space"]`).
* **`summary`**: 2-3 sentence teaser summary for the card feed.
* **`paper_id`**: Optional. One of `"01"`–`"10"` (the September 2026 series) or `"srh"`, `"antiprism"`, `"twin"`, `"pattern"`, `"seven"` (the October 2026 papers). It links the paper's title and PDF.

---

## 3. Formatting in the Body

* **Headings**: Use `### Section Heading` or `## Section Heading`.
* **Inline Math**: Enclose in single dollars: `$J = I + C + C^2$`. A `<` or `>` inside math is converted for the browser automatically.
* **Block Display Math**:
  ```latex
  $$
  \lambda^4 - 2\lambda^2 - 27 = 0
  $$
  ```
* **Callout Box**:
  ```markdown
  :::callout
  <strong>Theoretical Note:</strong>
  The still pattern survives every step; the turning patterns are erased.
  :::
  ```
* **Code Blocks**: Fenced with triple backticks ` ```python `.
* **Lists, Bold, Italic**: Standard GitHub-flavored Markdown.
