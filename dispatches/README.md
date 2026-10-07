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
paper_id: "08"
---
```

### Fields:
* **`title`** (Required): The full title of the dispatch.
* **`category`** (Required): One of the 6 canonical research domains:
  * `differential-geometry` (Fluid Manifolds & Topology)
  * `number-theory` (Number Theory & Zeros)
  * `celestial-mechanics` (Celestial Throats & Flux)
  * `quantum-physics` (Quantum Negativity & Coherence)
  * `cortical-networks` (Cortical & Ternary Networks)
  * `general-physics` (Mathematical Physics & Balance)
* **`formula_tag`**: Short uppercase badge text for the formula callout (e.g. `KEY INVARIANCE FORMULA`).
* **`formula_math`**: LaTeX formula highlighted on the feed card.
* **`tags`**: List or comma-separated tags (e.g. `["Topology", "Phase Space"]`).
* **`summary`**: 2-3 sentence teaser summary for the card feed.
* **`paper_id`**: Optional preprint index (`"01"` to `"12"`). Automatically links the preprint title and PDF button.

---

## 3. Formatting in the Body

* **Headings**: Use `### Section Heading` or `## Section Heading`.
* **Inline Math**: Enclose in single dollars: `$\nabla \cdot \mathbf{J} = 0$`.
* **Block Display Math**:
  ```latex
  $$
  J = \frac{1}{2\pi} \oint p \, dq = \frac{E - E_c}{\omega_H}
  $$
  ```
* **Callout Box**:
  ```markdown
  :::callout
  <strong>Theoretical Note:</strong>
  Invariance holds under canonical contact transformations.
  :::
  ```
* **Code Blocks**: Fenced with triple backticks ` ```python `.
* **Lists, Bold, Italic**: Standard GitHub-flavored Markdown.
