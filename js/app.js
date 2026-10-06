/**
 * 80s QUANTUM SYNTHWAVE RESEARCH PLATFORM
 * Core Application Engine: Visuals, Canvas, Quantum Simulator, Papers, GitHub API, License Generator
 */

// --- Research Papers Data ---
const RESEARCH_PAPERS = [
  {
    id: "q-error-mitigation-2026",
    title: "Fault-Tolerant Quantum Error Mitigation in NISQ Systems via Continuous Dynamical Decoupling",
    authors: "<strong>Abhijit Singh</strong>, Elena Vance, Marcus Thorne",
    venue: "Physical Review Letters (PRL), Vol. 136, 040502",
    year: "2026",
    category: "quantum-computing",
    doi: "10.1103/PhysRevLett.136.040502",
    arxiv: "arXiv:2603.08412",
    pdf: "papers/quantum-error-mitigation.pdf",
    github: "https://github.com/abhijitsingh/quantum-error-mitigation",
    license: "CC-BY 4.0",
    licenseType: "open-access",
    abstract: "We introduce a non-perturbative mathematical framework for continuous dynamical decoupling that suppresses correlated 1/f phase noise in multi-qubit transmon processors without requiring prohibitive Trotter step overheads. Exact Lie-algebraic bounds are derived for high-frequency Hamiltonian engineering.",
    bibtex: `@article{singh2026fault,
  title={Fault-Tolerant Quantum Error Mitigation in NISQ Systems via Continuous Dynamical Decoupling},
  author={Singh, Abhijit and Vance, Elena and Thorne, Marcus},
  journal={Physical Review Letters},
  volume={136},
  number={4},
  pages={040502},
  year={2026},
  publisher={APS},
  doi={10.1103/PhysRevLett.136.040502},
  license={CC-BY-4.0}
}`
  },
  {
    id: "topo-anyons-2025",
    title: "Non-Abelian Anyons & Topological Invariants in 2D Non-Commutative Manifolds",
    authors: "<strong>Abhijit Singh</strong>, Sophia Kovalevsky",
    venue: "Journal of High Energy Physics & Geometry (JHEP)",
    year: "2025",
    category: "topology",
    doi: "10.1007/JHEP2025.09.114",
    arxiv: "arXiv:2509.09114",
    pdf: "papers/topological-quantum-invariants.pdf",
    github: "https://github.com/abhijitsingh/topological-anyons-sim",
    license: "CC-BY 4.0",
    licenseType: "open-access",
    abstract: "We investigate Fibonacci anyonic braid group representations on higher-genus Riemann surfaces with non-commutative geometry. Using Chern-Simons gauge theories and K-theory invariants, we prove universal quantum computation robustness against local topological defects.",
    bibtex: `@article{singh2025nonabelian,
  title={Non-Abelian Anyons & Topological Invariants in 2D Non-Commutative Manifolds},
  author={Singh, Abhijit and Kovalevsky, Sophia},
  journal={Journal of High Energy Physics},
  year={2025},
  doi={10.1007/JHEP2025.09.114},
  license={CC-BY-4.0}
}`
  },
  {
    id: "tensor-mps-2025",
    title: "Matrix Product States for Strongly Correlated Quantum Hamiltonians in 2D Lattices",
    authors: "<strong>Abhijit Singh</strong>, David Bohm, Chen Ning",
    venue: "Annals of Mathematics & Quantum Foundations",
    year: "2025",
    category: "math-physics",
    doi: "10.1016/j.amqf.2025.02.019",
    arxiv: "arXiv:2502.02019",
    pdf: "papers/tensor-network-hamiltonians.pdf",
    github: "https://github.com/abhijitsingh/tensor-hamiltonian-solver",
    license: "MIT License",
    licenseType: "software-paper",
    abstract: "A variational tensor network renormalization algorithm is constructed for chiral spin liquids. The method achieves spectral gap convergence with bond dimension D=2048, circumventing negative sign problems in Monte Carlo calculations.",
    bibtex: `@article{singh2025mps,
  title={Matrix Product States for Strongly Correlated Quantum Hamiltonians in 2D Lattices},
  author={Singh, Abhijit and Bohm, David and Ning, Chen},
  journal={Annals of Mathematics and Quantum Foundations},
  year={2025},
  license={MIT}
}`
  },
  {
    id: "quantum-chaos-2024",
    title: "Spectral Form Factors and Out-of-Time-Order Correlators in Random Unitary Circuits",
    authors: "<strong>Abhijit Singh</strong>, Julian S.",
    venue: "Communications in Mathematical Physics",
    year: "2024",
    category: "math-physics",
    doi: "10.1007/s00220-024-05118-2",
    arxiv: "arXiv:2407.03921",
    pdf: "papers/quantum-error-mitigation.pdf",
    github: "https://github.com/abhijitsingh/otoc-quantum-chaos",
    license: "CC-BY 4.0",
    licenseType: "open-access",
    abstract: "We prove exact asymptotic formulas for the ramp and plateau of the spectral form factor in Haar-random Floquet quantum circuits, establishing direct correspondence with random matrix Gaussian Unitary Ensembles (GUE).",
    bibtex: `@article{singh2024chaos,
  title={Spectral Form Factors and Out-of-Time-Order Correlators in Random Unitary Circuits},
  author={Singh, Abhijit and Julian, S.},
  journal={Communications in Mathematical Physics},
  year={2024},
  doi={10.1007/s00220-024-05118-2},
  license={CC-BY-4.0}
}`
  }
];

// Curated Fallback Research Repositories
const DEMO_REPOSITORIES = [
  {
    name: "quantum-error-mitigation",
    description: "High-performance Python & C++ library for continuous dynamical decoupling and stabilizer error mitigation on Qiskit & Cirq.",
    html_url: "https://github.com/abhijitsingh/quantum-error-mitigation",
    language: "Python",
    langColor: "#3572A5",
    stargazers_count: 142,
    forks_count: 38,
    license: "MIT"
  },
  {
    name: "topological-anyons-sim",
    description: "Interactive Mathematica and Julia computational framework for topological braiding matrices and Fibonacci anyons.",
    html_url: "https://github.com/abhijitsingh/topological-anyons-sim",
    language: "Julia",
    langColor: "#a270ba",
    stargazers_count: 98,
    forks_count: 19,
    license: "Apache-2.0"
  },
  {
    name: "tensor-hamiltonian-solver",
    description: "High-throughput Matrix Product State (MPS) and PEPS tensor network contraction algorithms with GPU CUDA acceleration.",
    html_url: "https://github.com/abhijitsingh/tensor-hamiltonian-solver",
    language: "C++",
    langColor: "#f34b7d",
    stargazers_count: 215,
    forks_count: 54,
    license: "GPL-3.0"
  },
  {
    name: "q-circuit-visualizer-80s",
    description: "Ultra-modern synthwave web visualizer for multi-qubit entanglement verification and Bell inequalities.",
    html_url: "https://github.com/abhijitsingh/q-circuit-visualizer-80s",
    language: "JavaScript",
    langColor: "#f1e05a",
    stargazers_count: 87,
    forks_count: 22,
    license: "MIT"
  }
];

// --- 80s Perspective Canvas & Quantum Particles Animation ---
function initBackgroundCanvas() {
  const canvas = document.getElementById("quantum-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Floating Quantum probability particles
  const particles = [];
  const PARTICLE_COUNT = 65;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "rgba(0, 240, 255, " : "rgba(255, 42, 133, ",
      phase: Math.random() * Math.PI * 2
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  let gridOffset = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw 80s Synthwave Horizon Grid
    const horizonY = height * 0.72;
    gridOffset = (gridOffset + 0.6) % 36;

    ctx.save();
    ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
    ctx.lineWidth = 1;

    // Horizontal perspective lines
    for (let i = 0; i < 18; i++) {
      const pow = Math.pow(i / 18, 2.2);
      const y = horizonY + pow * (height - horizonY) + (gridOffset * pow * 0.3);
      if (y <= height) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Perspective vanishing lines from horizon
    const vanishingX = width / 2 + (mouseX - width / 2) * 0.05;
    const lines = 26;
    for (let i = -lines; i <= lines; i++) {
      ctx.beginPath();
      ctx.moveTo(vanishingX, horizonY);
      const bottomX = vanishingX + (i * width) / 14;
      ctx.lineTo(bottomX, height);
      ctx.stroke();
    }

    // Horizon glowing laser line
    const horizonGrad = ctx.createLinearGradient(0, horizonY, width, horizonY);
    horizonGrad.addColorStop(0, "rgba(255, 42, 133, 0)");
    horizonGrad.addColorStop(0.3, "rgba(255, 42, 133, 0.4)");
    horizonGrad.addColorStop(0.5, "rgba(0, 240, 255, 0.8)");
    horizonGrad.addColorStop(0.7, "rgba(255, 42, 133, 0.4)");
    horizonGrad.addColorStop(1, "rgba(255, 42, 133, 0)");

    ctx.strokeStyle = horizonGrad;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00f0ff";
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(width, horizonY);
    ctx.stroke();
    ctx.restore();

    // 2. Draw Floating Quantum Probability Cloud Particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.phase += 0.025;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const alpha = 0.25 + 0.35 * Math.sin(p.phase);
      ctx.fillStyle = p.color + alpha + ")";
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color === "rgba(0, 240, 255, " ? "#00f0ff" : "#ff2a85";

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

// --- Interactive Quantum Bloch Sphere & State Simulator ---
let quantumState = {
  theta: Math.PI / 3, // 60 degrees
  phi: Math.PI / 4,    // 45 degrees
  measured: null
};

function initBlochSphere() {
  const canvas = document.getElementById("bloch-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const thetaSlider = document.getElementById("theta-slider");
  const phiSlider = document.getElementById("phi-slider");
  const thetaVal = document.getElementById("theta-val");
  const phiVal = document.getElementById("phi-val");
  const measureBtn = document.getElementById("measure-btn");
  const resetBtn = document.getElementById("reset-btn");
  const formulaElem = document.getElementById("quantum-formula");
  const prob0Bar = document.getElementById("prob-fill-0");
  const prob1Bar = document.getElementById("prob-fill-1");
  const prob0Text = document.getElementById("prob-0-text");
  const prob1Text = document.getElementById("prob-1-text");

  function updateMathDisplay() {
    const t = quantumState.theta;
    const p = quantumState.phi;

    const prob0 = Math.cos(t / 2) ** 2;
    const prob1 = Math.sin(t / 2) ** 2;

    prob0Bar.style.width = `${(prob0 * 100).toFixed(1)}%`;
    prob1Bar.style.width = `${(prob1 * 100).toFixed(1)}%`;
    prob0Text.innerText = `${(prob0 * 100).toFixed(1)}%`;
    prob1Text.innerText = `${(prob1 * 100).toFixed(1)}%`;

    const cosVal = Math.cos(t / 2).toFixed(3);
    const sinVal = Math.sin(t / 2).toFixed(3);
    const phiDeg = Math.round((p * 180) / Math.PI);

    if (window.katex && formulaElem) {
      try {
        const latex = `|\\psi\\rangle = ${cosVal}|0\\rangle + ${sinVal}e^{i${phiDeg}^\\circ}|1\\rangle`;
        window.katex.render(latex, formulaElem, { throwOnError: false });
      } catch (e) {
        formulaElem.innerText = `|ψ⟩ = ${cosVal}|0⟩ + ${sinVal}e^{i${phiDeg}°}|1⟩`;
      }
    }
  }

  function drawSphere() {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const R = 95;

    ctx.clearRect(0, 0, w, h);

    // Glowing Sphere Background Circle
    const sphereGrad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, R);
    sphereGrad.addColorStop(0, "rgba(35, 25, 70, 0.6)");
    sphereGrad.addColorStop(0.8, "rgba(10, 8, 25, 0.85)");
    sphereGrad.addColorStop(1, "rgba(0, 240, 255, 0.35)");

    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    // Outer border
    ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Equator ring (perspective ellipse)
    ctx.save();
    ctx.strokeStyle = "rgba(255, 42, 133, 0.35)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, R, R * 0.32, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Central Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    // Z axis (vertical)
    ctx.beginPath();
    ctx.moveTo(cx, cy - R - 12);
    ctx.lineTo(cx, cy + R + 12);
    ctx.stroke();

    // Labels |0> and |1>
    ctx.fillStyle = "#00f0ff";
    ctx.font = "bold 12px JetBrains Mono, monospace";
    ctx.fillText("|0⟩ (|z+⟩)", cx - 25, cy - R - 16);
    ctx.fillStyle = "#ff2a85";
    ctx.fillText("|1⟩ (|z-⟩)", cx - 25, cy + R + 24);

    // State Vector calculation:
    // spherical coordinates on unit sphere:
    // x = R * sin(theta) * cos(phi)
    // y = R * sin(theta) * sin(phi) (tilted perspective)
    // z = R * cos(theta) (upward)
    const t = quantumState.theta;
    const p = quantumState.phi;

    const px = cx + R * Math.sin(t) * Math.cos(p);
    const py = cy - R * Math.cos(t) + (R * 0.32) * Math.sin(t) * Math.sin(p);

    // Vector line
    ctx.save();
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#00f0ff";
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Tip point
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();

    // Neon Halo
    ctx.strokeStyle = "#ff2a85";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Event Listeners for controls
  if (thetaSlider) {
    thetaSlider.addEventListener("input", (e) => {
      quantumState.theta = (parseFloat(e.target.value) * Math.PI) / 180;
      thetaVal.innerText = `${e.target.value}°`;
      updateMathDisplay();
      drawSphere();
    });
  }

  if (phiSlider) {
    phiSlider.addEventListener("input", (e) => {
      quantumState.phi = (parseFloat(e.target.value) * Math.PI) / 180;
      phiVal.innerText = `${e.target.value}°`;
      updateMathDisplay();
      drawSphere();
    });
  }

  if (measureBtn) {
    measureBtn.addEventListener("click", () => {
      const prob0 = Math.cos(quantumState.theta / 2) ** 2;
      const outcome = Math.random() < prob0 ? 0 : 1;

      // Collapse state
      quantumState.theta = outcome === 0 ? 0 : Math.PI;
      thetaSlider.value = outcome === 0 ? "0" : "180";
      thetaVal.innerText = `${thetaSlider.value}°`;

      updateMathDisplay();
      drawSphere();

      showToast(`⚡ Wavefunction Collapsed into State |${outcome}⟩!`, 3000);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      quantumState.theta = Math.PI / 2; // Hadamard superposition (|0> + |1>)/sqrt(2)
      quantumState.phi = 0;
      thetaSlider.value = "90";
      phiSlider.value = "0";
      thetaVal.innerText = "90°";
      phiVal.innerText = "0°";
      updateMathDisplay();
      drawSphere();
      showToast("Superposition state |+⟩ restored.");
    });
  }

  updateMathDisplay();
  drawSphere();
}

// --- Research Papers Renderer & Filter ---
function renderPapers(filterTag = "all") {
  const container = document.getElementById("papers-container");
  if (!container) return;

  const filtered = filterTag === "all" 
    ? RESEARCH_PAPERS 
    : RESEARCH_PAPERS.filter(p => p.category === filterTag);

  container.innerHTML = filtered.map(paper => `
    <article class="paper-card" data-id="${paper.id}">
      <div class="paper-meta-row">
        <span class="paper-year">${paper.year}</span>
        <span class="paper-venue">${paper.venue}</span>
        <span class="license-tag" title="Open Science License">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          ${paper.license}
        </span>
      </div>
      <h3 class="paper-title">${paper.title}</h3>
      <p class="paper-authors">${paper.authors}</p>
      <p class="paper-abstract">${paper.abstract}</p>
      
      <div class="paper-tags">
        <span class="topic-pill">DOI: ${paper.doi}</span>
        <span class="topic-pill">${paper.arxiv}</span>
      </div>

      <div class="paper-actions">
        <a href="${paper.pdf}" target="_blank" class="action-btn pdf-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Download PDF
        </a>
        <button class="action-btn bibtex-trigger" data-id="${paper.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          Cite BibTeX
        </button>
        <a href="${paper.github}" target="_blank" rel="noopener noreferrer" class="action-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          Source Code
        </a>
        <button class="action-btn attach-license-btn" data-id="${paper.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          License Metadata
        </button>
      </div>
    </article>
  `).join("");

  // Attach BibTeX modal triggers
  document.querySelectorAll(".bibtex-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const paper = RESEARCH_PAPERS.find(p => p.id === id);
      if (paper) openBibtexModal(paper);
    });
  });

  // Attach license metadata modal
  document.querySelectorAll(".attach-license-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const paper = RESEARCH_PAPERS.find(p => p.id === id);
      if (paper) openLicenseModal(paper);
    });
  });
}

function initPaperFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderPapers(category);
    });
  });
}

// --- GitHub Repositories Live Connector ---
async function fetchGitHubRepos(username) {
  const reposGrid = document.getElementById("repos-grid");
  const statusElem = document.getElementById("github-status");

  if (!reposGrid) return;
  statusElem.innerHTML = `<span style="color: var(--neon-cyan);">Connecting to api.github.com/users/${username}...</span>`;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No public repositories found.");
    }

    statusElem.innerHTML = `<span style="color: var(--neon-emerald);">✓ Connected to @${username} (${data.length} repos found)</span>`;
    renderRepoCards(data.map(r => ({
      name: r.name,
      description: r.description || "Research code and computational implementations.",
      html_url: r.html_url,
      language: r.language || "LaTeX/Python",
      langColor: getLanguageColor(r.language),
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      license: r.license ? r.license.spdx_id : "Open Access"
    })));
  } catch (err) {
    statusElem.innerHTML = `<span style="color: var(--neon-amber);">Displaying curated quantum research repositories (Live API fallback):</span>`;
    renderRepoCards(DEMO_REPOSITORIES);
  }
}

function getLanguageColor(lang) {
  const colors = {
    Python: "#3572A5",
    Julia: "#a270ba",
    "C++": "#f34b7d",
    Rust: "#dea584",
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    TeX: "#3D6117"
  };
  return colors[lang] || "#00f0ff";
}

function renderRepoCards(repos) {
  const reposGrid = document.getElementById("repos-grid");
  if (!reposGrid) return;

  reposGrid.innerHTML = repos.map(repo => `
    <div class="repo-card">
      <div>
        <div class="repo-header">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            ${repo.name}
          </a>
          <span class="license-tag">${repo.license}</span>
        </div>
        <p class="repo-desc">${repo.description}</p>
      </div>
      <div class="repo-footer">
        <div class="repo-lang">
          <span class="lang-dot" style="background: ${repo.langColor}"></span>
          <span>${repo.language}</span>
        </div>
        <div class="repo-stats">
          <span title="Stars">★ ${repo.stargazers_count}</span>
          <span title="Forks">⑂ ${repo.forks_count}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function initGitHubConnector() {
  const syncBtn = document.getElementById("github-sync-btn");
  const input = document.getElementById("github-username-input");

  if (syncBtn && input) {
    syncBtn.addEventListener("click", () => {
      const user = input.value.trim();
      if (user) fetchGitHubRepos(user);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const user = input.value.trim();
        if (user) fetchGitHubRepos(user);
      }
    });
  }

  // Initial load with default
  fetchGitHubRepos("mag-and-krotons");
}

// --- Interactive License Generator Tool ---
const LICENSES = {
  "cc-by-4": {
    name: "Creative Commons Attribution 4.0 (CC BY 4.0)",
    type: "Research Papers & Preprints",
    summary: "Gold standard for Open Access publications. Anyone can read, share, and build upon your research as long as they credit your authorship.",
    badge: "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)",
    latexNotice: "% This paper is published under Creative Commons Attribution 4.0 International (CC BY 4.0)\n\\usepackage{hyperref}\n% Citation attribution required.",
    citationField: "license={CC-BY-4.0}"
  },
  "mit": {
    name: "MIT License",
    type: "Research Code & Quantum Simulators",
    summary: "Extremely popular for scientific computing libraries. Allows others to reuse code commercially and academically with minimal restrictions.",
    badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    latexNotice: "/* MIT License - Copyright (c) 2026 Abhijit Singh */\nPermission is hereby granted, free of charge...",
    citationField: "license={MIT}"
  },
  "apache-2": {
    name: "Apache License 2.0",
    type: "Quantum Software & Patents",
    summary: "Ideal for deep-tech quantum libraries; includes explicit grants of patent rights from contributors to users.",
    badge: "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    latexNotice: "Licensed under the Apache License, Version 2.0 (the \"License\")...",
    citationField: "license={Apache-2.0}"
  },
  "cc0": {
    name: "Creative Commons Zero (CC0 - Public Domain)",
    type: "Datasets, Benchmarks & Raw Spectra",
    summary: "Waives all copyright globally so other researchers can benchmark quantum models against your experimental data without legal friction.",
    badge: "[![License: CC0-1.0](https://licensebuttons.net/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)",
    latexNotice: "This dataset is dedicated to the public domain under CC0 1.0 Universal.",
    citationField: "license={CC0-1.0}"
  }
};

let selectedLicenseKey = "cc-by-4";

function initLicenseTool() {
  const options = document.querySelectorAll(".license-option-card");
  const outputElem = document.getElementById("license-code-output");
  const copyBtn = document.getElementById("copy-license-btn");

  function updateOutput() {
    const lic = LICENSES[selectedLicenseKey];
    if (!lic || !outputElem) return;

    outputElem.innerText = `### ${lic.name}
Scope: ${lic.type}

Markdown Badge:
${lic.badge}

BibTeX Integration:
${lic.citationField}

Paper Header Attribution:
${lic.latexNotice}`;
  }

  options.forEach(opt => {
    opt.addEventListener("click", () => {
      options.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      selectedLicenseKey = opt.getAttribute("data-license");
      updateOutput();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(outputElem.innerText);
      showToast("License metadata copied to clipboard!");
    });
  }

  updateOutput();
}

// --- Modals & BibTeX Copier ---
function openBibtexModal(paper) {
  const modal = document.getElementById("bibtex-modal");
  const title = document.getElementById("modal-paper-title");
  const bibCode = document.getElementById("bibtex-code");
  const copyBtn = document.getElementById("copy-bibtex-btn");

  if (!modal) return;
  title.innerText = paper.title;
  bibCode.innerText = paper.bibtex;

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(paper.bibtex);
    showToast("BibTeX citation copied to clipboard!");
  };

  modal.classList.add("open");
}

function openLicenseModal(paper) {
  const modal = document.getElementById("license-modal");
  const content = document.getElementById("license-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <h4 style="color: var(--neon-cyan); margin-bottom: 0.8rem; font-family: var(--font-mono);">
      Paper: ${paper.title}
    </h4>
    <p style="color: var(--text-muted); margin-bottom: 1rem; font-size: 0.9rem;">
      This publication is distributed under the <strong>${paper.license}</strong> open science agreement. You are free to read, download, redistribute, and cite in both academic and computational works.
    </p>
    <div style="background: #060512; padding: 1rem; border-radius: 6px; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.82rem; color: var(--neon-emerald);">
      DOI: https://doi.org/${paper.doi}<br>
      Preprint: https://${paper.arxiv.replace(':', '/')}<br>
      Code: ${paper.github}<br>
      License URI: https://creativecommons.org/licenses/by/4.0/
    </div>
  `;

  modal.classList.add("open");
}

function initModals() {
  document.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach(elem => {
    elem.addEventListener("click", (e) => {
      if (e.target === elem || elem.classList.contains("modal-close-btn")) {
        document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("open"));
      }
    });
  });
}

// --- Toast System ---
function showToast(message, duration = 2500) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// --- CRT Scanline Mode Toggle ---
function initVibeToggle() {
  const toggleBtn = document.getElementById("vibe-toggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("crt-active");
    const active = document.body.classList.contains("crt-active");
    toggleBtn.innerHTML = active 
      ? `<span>📺 CRT Scanlines: ON</span>`
      : `<span>🕹️ 80s CRT: OFF</span>`;
    showToast(active ? "80s Phosphor Scanline Mode Activated!" : "Clean Modern Mode Active");
  });
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initBackgroundCanvas();
  initBlochSphere();
  renderPapers("all");
  initPaperFilters();
  initGitHubConnector();
  initLicenseTool();
  initModals();
  initVibeToggle();
});
