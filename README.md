# 🌌 80s Cyber-Quantum Research Portfolio & Paper Repository

An ultra-modern, retro-futuristic personal academic website tailored specifically for theoretical physics, quantum computing, and mathematics researchers. Built with high-performance static web technologies, ready for **100% free hosting on GitHub Pages**, Cloudflare Pages, or Vercel.

---

## ⚡ Architectural Verdict: WordPress.org vs. Modern Static Sites

### Is WordPress.org good for research papers & code?
**Short answer: No.** WordPress.org is suboptimal for academic research and computational physics for several critical reasons:

| Evaluation Metric | WordPress.org | Static Site + GitHub Pages (This Project) |
| :--- | :--- | :--- |
| **Hosting Cost** | $5 – $25/month for PHP & MySQL database servers | **$0 / month forever** (Free GitHub / Cloudflare CDN) |
| **LaTeX / KaTeX Math** | Clunky plugins that break on core updates and lag | **Native instant sub-millisecond KaTeX rendering** |
| **GitHub Integration** | Needs insecure third-party plugins with API keys | **Direct 1-click git push deploy & live GitHub API** |
| **Security & Maintenance**| Constant PHP patches, SQL injection risks, spam bots | **Zero server attack surface, 100% immune to SQL hacks** |
| **80s Visual Aesthetics** | Constrained to generic rigid corporate templates | **Unconstrained custom neon glow, canvas & glassmorphism** |
| **Academic Citations** | Difficult BibTeX copy without heavy formatting | **1-click BibTeX copy, DOI links, and license tags** |

---

## 🚀 Key Features

1. **80s Synthwave meets Quantum Rigor**:
   - Dynamic 3D wireframe perspective laser grid and quantum probability particles canvas.
   - Glowing neon color palette (laser cyan `#00f0ff`, electric magenta `#ff2a85`, amber `#ffaa00`, deep cosmos `#070712`).
   - CRT Phosphor scanline toggle button in the header.
2. **Interactive Quantum Bloch Sphere Lab**:
   - Interactive real-time 3D Bloch sphere vector visualization.
   - Sliders for polar angle $\theta$ and azimuthal phase $\phi$.
   - Real-time LaTeX state display $|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle$.
   - Live Born rule probability bars $P(\|0\rangle)$ and $P(\|1\rangle)$ with **Measure State (Collapse)** button.
3. **Research Papers & Preprints Hosting**:
   - Expandable paper cards with abstracts, DOI, and arXiv badges.
   - Direct PDF download buttons linked to preprints.
   - Interactive BibTeX modal with 1-click clipboard copier.
   - Open Access and license badges.
4. **Open Science & Licensing Attacher Facility**:
   - Interactive license generator supporting **CC BY 4.0** (Papers), **MIT License** (Code), **Apache 2.0** (Quantum Software & Patents), and **CC0** (Datasets).
   - Generates formatted Markdown shield badges, BibTeX `license={...}` tags, and LaTeX header notices.
5. **Live GitHub Repository Showcase**:
   - Real-time connector to GitHub REST API (`api.github.com/users/<username>/repos`).
   - Interactive username input to instantly sync and preview your own repositories with star counts, languages, and license badges.
   - Offline fallback to curated quantum research projects.

---

## 🌐 How to Host for FREE on GitHub Pages in 3 Steps

### Step 1: Create a GitHub Repository
1. Log into your GitHub account.
2. Create a new repository named `<your-username>.github.io` (e.g. `abhijitsingh.github.io`).
3. Make sure it is set to **Public**.

### Step 2: Push This Directory to Your Repository
Open your terminal in `/home/abhijit-singh/Documents/here_now_always` and run:

```bash
git init
git add .
git commit -m "Launch 80s Quantum Research Website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

### Step 3: Visit Your Live Site
- Go to `https://<your-username>.github.io`.
- It will be live globally within 60 seconds with **free SSL/HTTPS**!
- You can also bind your own custom domain (e.g., `dr-singh-quantum.org`) for free in `Repository Settings -> Pages -> Custom domain`.

---

## 📁 Project Structure

```text
├── assets/
│   ├── banner.jpg         # 80s Synthwave Quantum Hero Banner
│   └── avatar.jpg         # Researcher Quantum Badge / Avatar
├── css/
│   └── style.css          # Design system, 80s neon variables & glassmorphism
├── js/
│   └── app.js             # Canvas animation, Bloch sphere, papers & GitHub sync
├── papers/
│   ├── quantum-error-mitigation.pdf
│   ├── topological-quantum-invariants.pdf
│   └── tensor-network-hamiltonians.pdf
├── index.html             # Main entry point with KaTeX, Lucide icons, & sections
└── README.md              # Deployment & Architecture Guide
```

---

## 🛠️ Adding New Papers

To add a new publication, simply open [js/app.js](file:///home/abhijit-singh/Documents/here_now_always/js/app.js) and append your paper object to the `RESEARCH_PAPERS` array:

```javascript
{
  id: "your-paper-slug",
  title: "Your Paper Title",
  authors: "<strong>Abhijit Singh</strong>, Co-Author",
  venue: "Physical Review B, Vol. XX",
  year: "2026",
  category: "quantum-computing", // or "topology", "math-physics"
  doi: "10.1103/PhysRevB.XX.XXXXXX",
  arxiv: "arXiv:2603.XXXXX",
  pdf: "papers/your-paper.pdf",
  github: "https://github.com/your-username/repo-name",
  license: "CC-BY 4.0",
  abstract: "Summary of your breakthrough...",
  bibtex: `@article{singh2026..., ...}`
}
```
Drop the corresponding PDF in the `papers/` directory and commit!
