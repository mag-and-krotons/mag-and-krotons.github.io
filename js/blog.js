/**
 * Academic Research Platform - Dispatches & Working Notes
 * Author: Abhijit Singh | Number Theory & Quantum Networks
 * Email: abhijitsingh@tuta.io
 * 
 * Supports both pre-compiled research dispatches and client-side in-browser
 * dispatch authoring & publishing directly from the website.
 */

let BLOG_ENTRIES = [
  {
    id: "medial-antiprism-two-strands",
    title: "The Medial Antiprism: What Survives When Each Step Passes Only a Sum",
    date: "October 9, 2026",
    isoDate: "2026-10-09",
    readTime: "5 min read",
    category: "differential-geometry",
    categoryLabel: "Geometry & Structure",
    categoryClass: "cat-violet",
    tags: ["Medial Antiprism", "Two Strands", "Horizon", "Möbius Ladder", "Triad"],
    formulaHighlight: "J = I + C + C^2,\\qquad J\\,(1,1,1) = 3\\,(1,1,1),\\qquad J\\,(1,\\omega,\\omega^2) = 0",
    summary: "Stack triangles, each turned through $180^\\circ$, and join every vertex to every side midpoint of its neighbours. One move builds it, a half-turn with a halving. Its 36 nodes and 90 lines form two strands that meet only at the half of each gap.",
    paperId: "medial_antiprism",
    paperTitle: "The Medial Antiprism: Two Strands, a Horizon at One Half and an Undecided Trefoil",
    paperPdf: "papers/medial_antiprism/medial_antiprism.pdf",
    contentHtml: `
      <p class="blog-lead">
        The side midpoints of a triangle are its vertices multiplied by $-\\tfrac12$: the medial triangle is the triangle turned through $180^\\circ$ and halved. Repeat that move along an axis and join every vertex of each layer to every side midpoint of the next. The result is the medial antiprism.
      </p>
      <h3>1. Two strands</h3>
      <p>
        Every line reverses two signs, vertex or midpoint and the parity of the layer, so their product is conserved. With six layers the 36 nodes and 90 lines split into two strands of 18 nodes. They share every layer and no line, and the central inversion $x\\mapsto -x$ exchanges them.
      </p>
      <h3>2. Each step passes only a sum</h3>
      <p>
        Between layers the lines join three nodes completely to three, so the coupling is $J=I+C+C^2$. It keeps the still pattern $(1,1,1)$ and erases the two patterns that turn by a third.
      </p>
      <div class="blog-callout"><strong>The slab:</strong> in every gap each strand crosses itself three times, at one third and at two thirds of the height, and the two strands meet six times at one half. Moving the midpoints to the fraction $f$ of their sides moves the meetings to $f$ and $1-f$.</div>
      <h3>3. The bridge and the ring</h3>
      <p>
        Each bridge is a Möbius ladder whose rim is a six-edge trefoil with its three crossings undecided. A ring of an odd number of layers joins the two strands into one, which returns only after two circuits.
      </p>
      <h3>4. Unrolled</h3>
      <p>
        The routes of a strand unroll into the $3$-adic tree, whose ends are the $3$-adic integers written in the digits $\\{-1,0,1\\}$. In the tree's variable $s$ the still pattern of a bridge sits at $s=1$ and its turning patterns on $\\operatorname{Re}s=\\tfrac12$. Every statement here is proved in the paper.
      </p>
    `
  },
  {
    id: "prime-two-mirror-merge-riemann-zeros",
    title: "The Prime Two and the Mirror: Why One Copy Has No Mirror and Two Copies Do",
    date: "September 28, 2026",
    isoDate: "2026-09-28",
    readTime: "4 min read",
    category: "number-theory",
    categoryLabel: "Number Theory & Riemann Zeros",
    categoryClass: "cat-blue",
    tags: ["Riemann Zeta", "Euler Product", "Merge", "Davenport–Heilbronn"],
    formulaHighlight: "\\mathbb E[Y^s]=2\\xi(s),\\qquad M_\\nu(s)=M_\\nu(1-s)\\iff\\nu=2",
    summary: "Riemann\\'s $\\xi$ is the moment function of two merged copies of one random unit. One copy gives the completed alternating series of the prime two, whose zeros on $\\operatorname{Re}s=1$ have no mirror partners; among $\\nu$ merged copies the mirror $s\\mapsto1-s$ holds only at $\\nu=2$.",
    paperId: "01_Mathematics_Pair_Balance_and_the_Riemann_Zeros",
    paperTitle: "Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two",
    paperPdf: "papers/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros.pdf",
    contentHtml: `
      <p class="blog-lead">
        Paper 01 writes the Riemann Hypothesis as the positivity of a current, $J=2\\partial_y|\\Xi(x+iy)|^2>0$ for $y>0$, the criterion of Sondow and Dumitrescu and of Lagarias, and reads the Euler product as a merge. This note follows the merge.
      </p>
      <h3>1. Two copies of one unit</h3>
      <p>
        $\\xi$ is the moment function of two merged copies of one random unit $Y$:
      </p>
      <div class="katex-display-block">$$\\mathbb E[Y^s]=2\\xi(s).$$</div>
      <p>
        One copy gives $s\\pi^{-s/2}\\Gamma(\\frac s2)\\eta(s)$, the completed alternating series of the prime two. The factor $1-2^{1-s}$ puts zeros on the line $\\operatorname{Re}s=1$, at $s=1+2\\pi ik/\\log2$, and they have no mirror partners.
      </p>
      <h3>2. The mirror holds only at two</h3>
      <p>
        Let $M_\\nu$ be the moment function of $\\nu$ merged copies. For every $\\nu>0$, $\\log\\bigl(M_\\nu(1-2k)/M_\\nu(2k)\\bigr)=2k\\log(2/\\nu)+o(k)$, so
      </p>
      <div class="katex-display-block">$$M_\\nu(s)=M_\\nu(1-s)\\ \\text{for all } s\\iff\\nu=2.$$</div>
      <p>
        Followed in $\\nu$, the first zero of $M_\\nu$ moves from $1+2\\pi i/\\log2$ at $\\nu=1$ to $\\frac12+14.134725\\,i$ at $\\nu=2$, the only point of its path within $10^{-6}$ of the critical line.
      </p>
      <h3>3. The mirror without the merge</h3>
      <p>
        The Davenport–Heilbronn function has the mirror and not the merge. It has eight zeros off the line with $0.5\\lt t\\lt200$, Spira's four mirrored pairs, while all $114$ zeros of $L(s,\\chi_{-3})$ and all $122$ zeros of $L(s,\\chi_{-4})$ in that range lie on the line.
      </p>
      <div class="blog-callout"><strong>What remains:</strong> the paper proves $J\\gt0$ outside an explicit region and states the remaining step, $J\\ge0$ there, as a conjecture equivalent to RH, which a proof must close with a property such as the Euler product.</div>
    `
  },
  {
    id: "hill-throats-cubic-asymmetry-flux",
    title: "Two Throats About One Centre: The Hill Polynomial and the Asymmetry of the Lagrange Points",
    date: "September 14, 2026",
    isoDate: "2026-09-14",
    readTime: "4 min read",
    category: "celestial-mechanics",
    categoryLabel: "Celestial Mechanics & Hill Throats",
    categoryClass: "cat-crimson",
    tags: ["Hill Throats", "Lagrange Points", "Restricted Three-Body Problem", "Giant Planets"],
    formulaHighlight: "\\lambda^4-2\\lambda^2-27=0,\\qquad \\mathcal A=\\frac h3\\Bigl(1-\\frac{h^2}{27}+O(h^3)\\Bigr),\\quad h=(\\mu/3)^{1/3}",
    summary: "Around every planet the two collinear Lagrange points $L_1$ and $L_2$ are two throats about one centre. Their linear rates obey one polynomial for every planet, and the throats are unequal by a third of the Hill scale, a law that holds in the full restricted problem to $0.99972$ for Jupiter.",
    paperId: "07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs",
    paperTitle: "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    paperPdf: "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs.pdf",
    contentHtml: `
      <p class="blog-lead">
        A planet and its star leave two narrow gates in the planet's sphere of influence, at the collinear Lagrange points $L_1$ and $L_2$. Paper 07 reads them as a balanced pair about one centre and measures how far the balance holds.
      </p>
      <h3>1. One polynomial for every planet</h3>
      <p>
        In Hill's problem the linear motion near either collinear point has the characteristic polynomial
      </p>
      <div class="katex-display-block">$$\\lambda^4-2\\lambda^2-27=0,$$</div>
      <p>
        the same for every planet. Its roots are a real pair $\\pm\\lambda_H$, with $\\lambda_H^2=1+2\\sqrt7$, and an imaginary pair $\\pm i\\omega_H$, with $\\omega_H^2=2\\sqrt7-1$. Hence $\\lambda_H^2-\\omega_H^2=2$ and $\\lambda_H^2\\omega_H^2=27$, and the vertical frequency is $2$.
      </p>
      <h3>2. The two throats are unequal by a third of the Hill scale</h3>
      <p>
        Expanding the collinear equilibrium conditions in the Hill scale $h=(\\mu/3)^{1/3}$ gives the asymmetry of the two throats:
      </p>
      <div class="katex-display-block">$$\\mathcal A=\\frac h3\\Bigl(1-\\frac{h^2}{27}+O(h^3)\\Bigr).$$</div>
      <p>
        In the full restricted problem $\\mathcal A/(h/3)$ is $0.99972$ for Jupiter and within $10^{-5}$ of $1$ for the planets of the pulsar PSR B1257+12. The October paper <em>The Pair, the Triad and the Half</em> carries the series one order further, $\\mathcal A=\\frac h3\\bigl(1-\\frac{h^2}{27}-\\frac{h^3}{3}+O(h^4)\\bigr)$.
      </p>
      <h3>3. The throat in phase space</h3>
      <p>
        Near each throat the planar energy surface is $S^2\\times I$. The flux through the throat is the action $2\\pi\\Delta E/\\omega$ of its Lyapunov orbit, which the computed orbits at Jupiter's $L_1$ approach to $1.000002$ times it. The quantum transmission through the saddle is the two-state law
      </p>
      <div class="katex-display-block">$$T=\\frac{1}{1+e^{-2\\pi\\Delta E/\\hbar\\lambda}},$$</div>
      <p>
        equal to $\\frac12$ at the saddle energy. Every long temporary capture of a comet by Jupiter in the Ohtsuka catalogue entered and left through the $L_1$ or $L_2$ region.
      </p>
      <div class="blog-callout"><strong>The visitors:</strong> the paper also tests the three interstellar objects. They share neither a direction nor a kinematic origin: no statistic of their incoming directions departs from an isotropic or kinematic population (smallest $p=0.27$).</div>
    `
  },
  {
    id: "wigner-negativity-decoherence-thirds",
    title: "Decoherence at the Thirds: Riemann's Kernel as a Quantum State",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    readTime: "4 min read",
    category: "quantum-physics",
    categoryLabel: "Quantum Coherence",
    categoryClass: "cat-amber",
    tags: ["Wigner Function", "Decoherence", "Lee–Yang", "Triad"],
    formulaHighlight: "L(t)=\\frac{1+2\\cos2\\lambda t}{3},\\qquad L(t)=\\frac{\\Xi(\\lambda t)}{\\Xi(0)}",
    summary: "Riemann\\'s kernel is both a pure quantum state and a probability law. Its Wigner function is negative on only $4.844\\times10^{-5}$ of its mass; a qubit coupled to the triad $\\{-s,0,s\\}$ loses its coherence completely at one third and two thirds of the period; and a qubit in a field with Riemann\\'s law loses it exactly at the zeros of $\\zeta$.",
    paperId: "03_Quantum_The_Riemann_Kernel_as_a_Quantum_State",
    paperTitle: "The Riemann Kernel as a Quantum State: Wigner Negativity, Decoherence at the Thirds and Lee-Yang Zeros",
    paperPdf: "papers/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State.pdf",
    contentHtml: `
      <p class="blog-lead">
        Riemann's kernel $\\Phi$, the positive even function with $\\Xi(z)=\\int_0^\\infty\\Phi(\\tau)\\cos(z\\tau)\\,d\\tau$, is square-integrable and integrable. Paper 03 reads it twice: as a pure state $\\varphi=\\Phi/\\|\\Phi\\|$ and as a probability law.
      </p>
      <h3>1. Confined negativity</h3>
      <p>
        The Wigner function of $\\varphi$ is negative, but only slightly: its negative part carries $4.844\\times10^{-5}$ of the Wigner mass. On the axis $a=0$ it is negative for $11.1994\\lt k\\lt15.8346$ and deepest at $k=12.022$. For every momentum $k$ it is positive whenever $2\\pi e^{2|a|}\\ge\\max(\\sqrt{2k^2+\\frac12},20)$.
      </p>
      <h3>2. Decoherence at the thirds</h3>
      <p>
        A qubit prepared in $|+\\rangle$ and coupled by $\\lambda\\sigma_z\\otimes S_z$ to a maximally mixed spin one, the triad $\\{-s,0,s\\}$, has coherence
      </p>
      <div class="katex-display-block">$$L(t)=\\frac{1+2\\cos2\\lambda t}{3},$$</div>
      <p>
        which vanishes exactly at $\\frac13$ and $\\frac23$ of the revival period $\\pi/\\lambda$. Two Ising spins one half with weight $e^{4g\\mu_1\\mu_2}$ give the same law exactly at $g=\\frac12\\ln2$, the merged pair; the unmerged pair, $g=0$, gives $\\cos^2\\lambda t$. For an open chain of $N$ three-state spins with $K\\ge0$, all $2N$ zeros of the partition function lie on the unit circle: the coherence vanishes only at real times.
      </p>
      <h3>3. Riemann's spin</h3>
      <p>
        A qubit coupled to a classical field with law $\\Phi/(2\\Xi(0))$ has coherence
      </p>
      <div class="katex-display-block">$$L(t)=\\frac{\\Xi(\\lambda t)}{\\Xi(0)},$$</div>
      <p>
        which vanishes at a real time exactly when $\\frac12\\pm i\\lambda t$ is a zero of $\\zeta$ on the critical line. RH holds if and only if this coherence, continued to complex time, vanishes only at real times.
      </p>
    `
  },
  {
    id: "radix-economy-cortical-balance",
    title: "Three Is Enough: Radix Economy, Balanced Ternary and Ternary Weights",
    date: "August 10, 2026",
    isoDate: "2026-08-10",
    readTime: "4 min read",
    category: "cortical-networks",
    categoryLabel: "Ternary & Cortical Networks",
    categoryClass: "cat-emerald",
    tags: ["Radix Economy", "Balanced Ternary", "Ternary Weights", "Balanced Networks"],
    formulaHighlight: "E(b)=\\frac{b}{\\ln b},\\qquad \\frac{E(2)}{E(3)}=\\frac{E(4)}{E(3)}=\\tfrac23\\log_2 3=1.0566",
    summary: "Base $3$ is a cheapest base for every $N\\ge2^{16}$ and the unique cheapest for every $N\\ge2^{27}$. Balanced ternary $\\{-1,0,1\\}$ is a complete signed arithmetic, and a network with weights in $\\{-\\alpha,0,+\\alpha\\}$ matches 32-bit floats within the spread of five seeds.",
    paperId: "06_Algorithms_Three_Is_Enough",
    paperTitle: "Three Is Enough: Radix Economy, Balanced-Ternary Arithmetic and Ternary-Weight Networks",
    paperPdf: "papers/06_Algorithms_Three_Is_Enough/06_Algorithms_Three_Is_Enough.pdf",
    contentHtml: `
      <p class="blog-lead">
        A base-$b$ register that holds the integers $0,\\dots,N$ costs $C_b(N)=b\\,d_b(N)$ digit-states, where $d_b(N)$ is the number of digits. Its growth rate $E(b)=b/\\ln b$ is least over the reals at $b=e$ and over the integers at $b=3$. Paper 06 makes this exact.
      </p>
      <h3>1. Three is the cheapest radix</h3>
      <p>
        Base $3$ is a cheapest base for every $N\\ge2^{16}$ and the unique cheapest base for every $N\\ge2^{27}$, and both thresholds are sharp. Asymptotically binary and base $4$ both pay the factor
      </p>
      <div class="katex-display-block">$$\\frac{E(2)}{E(3)}=\\frac{E(4)}{E(3)}=\\tfrac23\\log_2 3=1.0566.$$</div>
      <h3>2. Balanced ternary is a complete signed arithmetic</h3>
      <p>
        With digits $\\{-1,0,1\\}$ every integer has exactly one representation, negation is the digit flip, the carries of addition stay in the triad, products of digits need no carry, rounding is truncation, the sign is the leading nonzero trit and order is lexicographic. The generating function of a width-$d$ register has all its $3^d-1$ zeros on the unit circle.
      </p>
      <h3>3. Ternary weights</h3>
      <p>
        The quantiser $\\{-\\alpha,0,+\\alpha\\}$ is optimal in least squares exactly when $\\alpha=\\mathrm E(|W|\\mid|W|\\gt\\Delta)$ and $\\Delta=\\alpha/2$; for uniform weights it sets exactly one third of them to zero. On the 1797 test digits of the UCI optical-recognition set, a $64$–$128$–$10$ network with ternary weights reaches $97.44\\pm0.73\\%$, against $97.70\\pm0.43\\%$ with 32-bit floats and $97.11\\pm0.55\\%$ with binary weights (five seeds), at $\\log_2 3=1.585$ bits per weight.
      </p>
      <div class="blog-callout"><strong>The same pair in tissue:</strong> Paper 05 proves that in a balanced network the residual input and the distance of the rates from balance are one object, $\\mu=\\sqrt K\\,A\\,(\\nu-\\nu_{\\mathrm{bal}})$. At $K=1600$ inhibition cancels $97.63\\%$ of the excitatory drive.</div>
    `
  }
];

// --- Category Class Mapping ---
const CATEGORY_MAP = {
  "differential-geometry": { label: "Geometry & Structure", class: "cat-violet" },
  "number-theory": { label: "Number Theory & Zeros", class: "cat-blue" },
  "celestial-mechanics": { label: "Celestial Mechanics", class: "cat-crimson" },
  "quantum-physics": { label: "Quantum Coherence", class: "cat-amber" },
  "cortical-networks": { label: "Ternary & Cortical Networks", class: "cat-emerald" },
  "general-physics": { label: "Mathematical Physics", class: "cat-blue" }
};

// --- State Variables ---
let blogActiveCategory = "all";
let blogSearchQuery = "";

// --- Filter Counts ---
function updateBlogFilterCounts() {
  const pills = document.querySelectorAll(".blog-filter-pill");
  pills.forEach(pill => {
    const cat = pill.getAttribute("data-category");
    if (cat === "all") {
      pill.textContent = `All Dispatches (${BLOG_ENTRIES.length})`;
    } else {
      const count = BLOG_ENTRIES.filter(e => e.category === cat).length;
      const baseLabel = pill.getAttribute("data-base-label") || pill.textContent.replace(/\s*\(\d+\)/, "");
      pill.setAttribute("data-base-label", baseLabel);
      pill.textContent = `${baseLabel} (${count})`;
    }
  });

  const headerCount = document.getElementById("blog-header-count");
  if (headerCount) {
    headerCount.textContent = `${BLOG_ENTRIES.length} ARTICLES • REGULARLY UPDATED`;
  }
}

// --- Rendering Function ---
function renderBlogEntries(category = "all", query = "") {
  const container = document.getElementById("blog-posts-grid");
  if (!container) return;

  blogActiveCategory = category;
  blogSearchQuery = query.trim().toLowerCase();

  const filtered = BLOG_ENTRIES.filter(entry => {
    const catMatch = category === "all" || entry.category === category;
    if (!catMatch) return false;

    if (!blogSearchQuery) return true;
    const q = blogSearchQuery;
    const titleMatch = (entry.title || "").toLowerCase().includes(q);
    const summaryMatch = (entry.summary || "").toLowerCase().includes(q);
    const tagMatch = (entry.tags || []).some(t => t.toLowerCase().includes(q));
    const catLabelMatch = (entry.categoryLabel || "").toLowerCase().includes(q);
    const formulaMatch = (entry.formulaHighlight || "").toLowerCase().includes(q);

    return titleMatch || summaryMatch || tagMatch || catLabelMatch || formulaMatch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="blog-empty-state">
        <div class="blog-empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m8 11 6 0"/></svg>
        </div>
        <h4 class="blog-empty-title">No dispatches match your search</h4>
        <p class="blog-empty-text">No articles found matching "<strong>${escapeHtml(blogSearchQuery)}</strong>" in this category.</p>
        <button onclick="resetBlogFilters()" class="btn-secondary" style="margin-top: 0.8rem;">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(entry => {
    const tagsHtml = (entry.tags || []).map(t => {
      const clean = t.replace(/^#+/, "").trim();
      return `<span class="blog-tag-pill">#${escapeHtml(clean)}</span>`;
    }).join(" ");

    const formulaBox = entry.formulaHighlight ? `
      <div class="blog-formula-box">
        <div class="blog-formula-tag">${escapeHtml(entry.formulaTag || "KEY FORMULA / CRITERION")}</div>
        <div class="blog-formula-math">$$${entry.formulaHighlight}$$</div>
      </div>
    ` : ``;

    return `
      <article class="blog-card" id="card-${entry.id}">
        <div class="blog-card-meta">
          <span class="blog-cat-badge ${entry.categoryClass}">${escapeHtml(entry.categoryLabel)}</span>
          <div class="blog-date-wrap">
            <span class="blog-date">${escapeHtml(entry.date)}</span>
            <span class="blog-meta-sep">&bull;</span>
            <span class="blog-read-time">${escapeHtml(entry.readTime)}</span>
          </div>
        </div>

        <h3 class="blog-card-title">
          <a href="#blog-${entry.id}" onclick="openBlogModal('${entry.id}'); return false;">
            ${escapeHtml(entry.title)}
          </a>
        </h3>

        <div class="blog-card-excerpt">
          ${entry.summary}
        </div>

        ${formulaBox}

        <div class="blog-tags-row">
          ${tagsHtml}
        </div>

        <div class="blog-card-footer">
          <div class="blog-card-author">
            <span class="author-dot"></span>
            <span>Abhijit Singh</span>
          </div>
          <div class="blog-card-actions">
            <a href="mailto:abhijitsingh@tuta.io?subject=Discussion:%20${encodeURIComponent(entry.title)}" class="blog-discuss-btn" title="Discuss dispatch with Abhijit Singh via Tuta Mail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Email</span>
            </a>
            <button onclick="openBlogModal('${entry.id}')" class="btn-primary blog-read-btn">
              <span>Read Full Note</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  if (window.triggerMathRendering) {
    window.triggerMathRendering(container);
  }
}

// --- Helper Functions ---
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function resetBlogFilters() {
  const input = document.getElementById("blog-search-input");
  const clearBtn = document.getElementById("blog-clear-search-btn");
  if (input) input.value = "";
  if (clearBtn) clearBtn.style.display = "none";
  blogSearchQuery = "";
  blogActiveCategory = "all";

  document.querySelectorAll(".blog-filter-pill").forEach(p => {
    p.classList.toggle("active", p.getAttribute("data-category") === "all");
  });

  renderBlogEntries("all", "");
}

// --- Modal Reader Functions ---
function openBlogModal(id) {
  const entry = BLOG_ENTRIES.find(e => e.id === id);
  if (!entry) return;

  const modal = document.getElementById("blog-modal");
  const modalCat = document.getElementById("blog-modal-cat");
  const modalDate = document.getElementById("blog-modal-date");
  const modalReadTime = document.getElementById("blog-modal-readtime");
  const modalTitle = document.getElementById("blog-modal-title");
  const modalContent = document.getElementById("blog-modal-content");
  const discussBtn = document.getElementById("blog-modal-discuss-btn");
  const copyLinkBtn = document.getElementById("blog-modal-copy-link-btn");

  if (!modal || !modalContent) return;

  if (modalCat) {
    modalCat.innerText = entry.categoryLabel;
    modalCat.className = `blog-modal-cat-badge ${entry.categoryClass}`;
  }
  if (modalDate) modalDate.innerText = entry.date;
  if (modalReadTime) modalReadTime.innerText = entry.readTime;
  if (modalTitle) modalTitle.innerText = entry.title;

  let relatedPaperBanner = "";
  if (entry.paperTitle && entry.paperPdf) {
    relatedPaperBanner = `
      <div class="blog-paper-link-card">
        <div class="blog-paper-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>
        <div class="blog-paper-info">
          <span class="blog-paper-badge">ACCOMPANYING PREPRINT</span>
          <div class="blog-paper-title">${escapeHtml(entry.paperTitle)}</div>
        </div>
        <a href="${entry.paperPdf}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-sm" style="white-space: nowrap;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Open PDF
        </a>
      </div>
    `;
  }

  modalContent.innerHTML = `
    ${relatedPaperBanner}
    <div class="blog-modal-prose">
      ${entry.contentHtml}
    </div>
  `;

  if (discussBtn) {
    discussBtn.href = `mailto:abhijitsingh@tuta.io?subject=Discussion:%20${encodeURIComponent(entry.title)}`;
  }

  if (copyLinkBtn) {
    copyLinkBtn.onclick = () => {
      const url = `${window.location.origin}${window.location.pathname}#blog-${entry.id}`;
      navigator.clipboard.writeText(url).then(() => {
        if (window.showToast) {
          window.showToast("Dispatch link copied to clipboard!");
        } else {
          alert("Link copied: " + url);
        }
      });
    };
  }

  modal.classList.add("open");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Deep link update in URL bar without jumping
  if (history.pushState) {
    history.pushState(null, null, `#blog-${entry.id}`);
  }

  // Trigger KaTeX math rendering in the modal content
  if (window.triggerMathRendering) {
    window.triggerMathRendering(modalContent);
  }
}

function closeBlogModal(e) {
  if (e && e.target && e.target.closest(".modal-card") && !e.target.classList.contains("modal-close-btn")) {
    return;
  }
  const modal = document.getElementById("blog-modal");
  if (modal) {
    modal.classList.remove("open");
    modal.classList.remove("active");
    document.body.style.overflow = "";
    if (history.pushState) {
      history.pushState(null, null, "#blog");
    }
  }
}

// --- Initialization ---
function initBlog() {
  renderBlogEntries("all", "");
  updateBlogFilterCounts();

  // Category filter pills
  const pills = document.querySelectorAll(".blog-filter-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const category = pill.getAttribute("data-category") || "all";
      renderBlogEntries(category, blogSearchQuery);
    });
  });

  // Search input with debounce
  const searchInput = document.getElementById("blog-search-input");
  const clearBtn = document.getElementById("blog-clear-search-btn");
  if (searchInput) {
    let timeout = null;
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = val.length > 0 ? "block" : "none";
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        renderBlogEntries(blogActiveCategory, val);
      }, 150);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      clearBtn.style.display = "none";
      renderBlogEntries(blogActiveCategory, "");
    });
  }

  // Deep linking via URL hash (e.g. #blog-fluid-manifold)
  const hash = window.location.hash;
  if (hash && hash.startsWith("#blog-")) {
    const entryId = hash.replace("#blog-", "");
    setTimeout(() => {
      openBlogModal(entryId);
    }, 300);
  }

  // ESC key to close modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeBlogModal();
    }
  });
}

// Auto-initialize when ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBlog);
} else {
  initBlog();
}

// Global exposure
window.BLOG_ENTRIES = BLOG_ENTRIES;
window.renderBlogEntries = renderBlogEntries;
window.openBlogModal = openBlogModal;
window.closeBlogModal = closeBlogModal;
window.resetBlogFilters = resetBlogFilters;
