/**
 * Academic Research Platform - Dispatches & Working Notes
 * Author: Abhijit Singh | Number Theory & Quantum Networks
 * Email: abhijitsingh@tuta.io
 * 
 * To add a new blog dispatch:
 * Add an object to the `BLOG_ENTRIES` array with the following fields:
 * - id: unique slug string (e.g., 'new-derivation-slug')
 * - title: full article title
 * - date: display date (e.g., 'October 15, 2026')
 * - isoDate: 'YYYY-MM-DD'
 * - readTime: estimated read time (e.g., '7 min read')
 * - category: category key ('differential-geometry' | 'number-theory' | 'celestial-mechanics' | 'quantum-physics' | 'cortical-networks')
 * - categoryLabel: display category label
 * - categoryClass: CSS color accent class ('cat-violet' | 'cat-blue' | 'cat-crimson' | 'cat-amber' | 'cat-emerald')
 * - tags: array of tag strings
 * - formulaHighlight: LaTeX formula string highlighted on the preview card
 * - summary: short teaser with LaTeX inline notation
 * - paperId: optional ID of related research paper in RESEARCH_PAPERS
 * - paperTitle: optional title of related preprint
 * - paperPdf: optional path to related PDF
 * - contentHtml: full rich article text with KaTeX formulas, theorems, code/derivations
 */

const BLOG_ENTRIES = [
  {
    id: "fluid-manifold-simplicial-complex",
    title: "The 36-Node Simplicial Complex: Translating Discrete Triads into Continuous Solenoidal Flow",
    date: "October 6, 2026",
    isoDate: "2026-10-06",
    readTime: "6 min read",
    category: "differential-geometry",
    categoryLabel: "Fluid Manifolds & Topology",
    categoryClass: "cat-violet",
    tags: ["Simplicial Complex", "Solenoidal Flow", "Catmull-Rom", "Phase Space", "Invariance"],
    formulaHighlight: "\\nabla \\cdot \\mathbf{J} = 0 \\quad \\Longleftrightarrow \\quad \\oint_{\\partial \\Omega} \\mathbf{v} \\cdot \\hat{n}\\, dS = 0",
    summary: "Moving beyond rigid discrete wireframes: how a 6-layer simplicial complex with 18 primary vertices and 18 edge midpoints ($L/2$) naturally generalizes to a volume-preserving solenoidal velocity field with continuous Catmull-Rom streamlines and vortex shear.",
    paperId: "11_Topology_Balance_and_Duality_in_Topological_Quantum_Systems",
    paperTitle: "Balance and Duality in Topological Quantum Systems: Majorana Modes, Anyons and Braiding",
    paperPdf: "papers/11_Topology_Balance_and_Duality_in_Topological_Quantum_Systems/11_Topology_Balance_and_Duality_in_Topological_Quantum_Systems.pdf",
    contentHtml: `
      <p class="blog-lead">
        Discrete lattice models provide foundational intuition for symmetry groups and topological invariants. However, when studying dynamical mass transport and phase-space flow, rigid straight wireframes fail to capture continuous transport invariance. Here, I discuss the geometric construction of the 36-node simplicial fluid manifold embedded on this site.
      </p>

      <h3>1. The 6-Layer Simplicial Topology</h3>
      <p>
        The underlying simplicial complex combines two alternating 18-node systems across six vertical layers in $\\mathbb{R}^3$:
      </p>
      <div class="blog-callout">
        <strong>Layer Distribution:</strong>
        $$z_k \\in \\{-1.20, -0.72, -0.24, +0.24, +0.72, +1.20\\}, \\quad k = 0, \\dots, 5$$
        The 36 nodes comprise 18 primary orbital vertices and 18 edge midpoints ($L/2$), generating a total of 90 internal geodesics obeying the tetrahedral-octahedral dihedral symmetry $C_3 \\rtimes \\mathbb{Z}_2$.
      </div>

      <h3>2. Velocity Field and Fluid Relaxation</h3>
      <p>
        To transform this discrete graph into an organic fluid manifold without introducing artificial turbulence, we introduce an incompressible solenoidal velocity field $\\mathbf{v}(r, \\theta, z, t)$ satisfying:
      </p>
      $$\\nabla \\cdot \\mathbf{v} = \\frac{1}{r}\\frac{\\partial(r v_r)}{\\partial r} + \\frac{1}{r}\\frac{\\partial v_\\theta}{\\partial \\theta} + \\frac{\\partial v_z}{\\partial z} = 0$$
      <p>
        The coordinates of each node and streamline undergo three coupled harmonic perturbations:
      </p>
      <ul>
        <li><strong>Wave Breathing (Radial):</strong> $\\Delta R(z, \\theta, t) = A_r \\cos(2\\theta - \\omega t) \\cdot \\cos(\\pi z / 2.4)$</li>
        <li><strong>Vertical Shear (Axial):</strong> $\\Delta y(\\theta, z, t) = A_y \\sin(3\\theta + \\omega t) \\cdot (1 - 0.25 z^2)$</li>
        <li><strong>Torsional Swirl (Azimuthal):</strong> $\\Delta \\theta(z, t) = A_\\theta \\sin(1.8 z + \\omega t)$</li>
      </ul>

      <h3>3. Catmull-Rom Geodesics and Streamline Advection</h3>
      <p>
        Instead of rigid linear segments between connected pairs $(v_i, v_j)$, the connection is promoted to a cubic Catmull-Rom spline $\\mathbf{C}_{ij}(s)$ parameterized by $s \\in [0, 1]$:
      </p>
      $$\\mathbf{C}_{ij}(s) = \\frac{1}{2} \\begin{bmatrix} 1 & s & s^2 & s^3 \\end{bmatrix} \\begin{bmatrix} 0 & 2 & 0 & 0 \\\\ -1 & 0 & 1 & 0 \\\\ 2 & -5 & 4 & -1 \\\\ -1 & 3 & -3 & 1 \\end{bmatrix} \\begin{bmatrix} \\mathbf{P}_{i-1} \\\\ \\mathbf{P}_i \\\\ \\mathbf{P}_j \\\\ \\mathbf{P}_{j+1} \\end{bmatrix}$$
      <p>
        A central control point is displaced dynamically along the normal $\\hat{\\mathbf{n}}_{ij} \\times \\hat{\\mathbf{z}}$, producing the fluid bowing and vortex swirl visible in the 3D WebGL simulator. Over 240 passive fluid particles are simultaneously advected along these streamlines with continuous wrap-around boundary conditions.
      </p>

      <h3>4. Physical Consequence: Throat Flux Invariance</h3>
      <p>
        Just as in the Hill throat dynamics investigated in Paper 08, the cross-sectional mass transport across the central throat layers $z_2$ and $z_3$ maintains a conserved symplectic action:
      </p>
      $$J = \\oint_{\\gamma} p\\, dq = \\text{const}$$
      <p>
        The fluid visualization is therefore not merely aesthetic ornamentation, but a rigorous continuous representation of phase-space transport under pair-balance constraints.
      </p>
    `
  },
  {
    id: "prime-two-mirror-merge-riemann-zeros",
    title: "The Prime Two as an Asymmetric Anchor: Why the Alternating Series Has No Mirror Partners",
    date: "September 28, 2026",
    isoDate: "2026-09-28",
    readTime: "8 min read",
    category: "number-theory",
    categoryLabel: "Number Theory & Riemann Zeros",
    categoryClass: "cat-blue",
    tags: ["Riemann Zeros", "Prime Two", "Euler Product", "Macdonald Functions", "Wigner Negativity"],
    formulaHighlight: "\\mathbb{E}[Y^s] = 2\\xi(s), \\quad s_k = 1 + \\frac{2\\pi i k}{\\log 2}",
    summary: "Riemann's $\\xi(s)$ is the moment function of two merged copies of a random unit. A single copy yields the completed alternating series of the prime two, whose zeros along $\\Re(s)=1$ have no mirror partners. Tracing the merge parameter $\\nu$ shows the exact migration of the first zero onto the critical line.",
    paperId: "01_Mathematics_Pair_Balance_and_the_Riemann_Zeros",
    paperTitle: "Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two",
    paperPdf: "papers/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros.pdf",
    contentHtml: `
      <p class="blog-lead">
        In Paper 01, we demonstrated that the Riemann Hypothesis is strictly equivalent to the positivity of the signed current $J = 2\\partial_y |\\Xi(x+iy)|^2 > 0$ for $y > 0$, expressed as a phase-space average over the Wigner function $Q(p, x)$. Here I unpack the role of the prime two as an asymmetric anchor in the Euler merge.
      </p>

      <h3>1. The Merge Representation: $\\nu = 1$ vs $\\nu = 2$</h3>
      <p>
        Riemann's completed function $\\xi(s) = \\frac{1}{2}s(s-1)\\pi^{-s/2}\\Gamma(s/2)\\zeta(s)$ satisfies the reflection symmetry $\\xi(s) = \\xi(1-s)$. We showed that $\\xi$ can be constructed as the moment function of two merged copies of a fundamental random unit $Y$:
      </p>
      $$\\mathbb{E}[Y^s] = 2\\xi(s)$$
      <p>
        If we consider only <em>one</em> unmerged copy ($\\nu = 1$), the resulting completed function is:
      </p>
      $$\\xi_1(s) = s \\pi^{-s/2} \\Gamma\\left(\\frac{s}{2}\\right) \\eta(s)$$
      <p>
        where $\\eta(s) = (1 - 2^{1-s})\\zeta(s) = \\sum_{n=1}^\\infty (-1)^{n-1} n^{-s}$ is Dirichlet's alternating eta function (the prime two factor).
      </p>

      <h3>2. Zeros Without Mirror Partners</h3>
      <p>
        The factor $(1 - 2^{1-s})$ produces an infinite tower of zeros located exactly on the boundary line $\\Re(s) = 1$:
      </p>
      $$s_k = 1 + \\frac{2\\pi i k}{\\log 2}, \\quad k \\in \\mathbb{Z} \\setminus \\{0\\}$$
      <p>
        Crucially, these zeros have <strong>no mirror partners</strong> at $\\Re(s) = 0$! The reflection symmetry $s \\mapsto 1-s$ does not exist at $\\nu = 1$. It emerges <em>if and only if</em> $\\nu = 2$.
      </p>

      <div class="blog-callout">
        <strong>The Zero Migration Trajectory:</strong>
        As the continuous merge parameter $\\nu$ increases from $1$ to $2$, the first zero $s_1(\\nu)$ migrates smoothly in the complex plane:
        $$s_1(1) = 1 + \\frac{2\\pi i}{\\log 2} \\approx 1 + 9.064720\\,i \\quad \\longrightarrow \\quad s_1(2) = \\frac{1}{2} + 14.134725\\,i$$
        $\\nu = 2$ is the <em>unique</em> point along this continuous deformation where the trajectory meets the critical line $\\Re(s) = 1/2$.
      </div>

      <h3>3. Why the Davenport-Heilbronn Counterexample Fails</h3>
      <p>
        Many functions satisfy the functional equation mirror $s \\mapsto 1-s$ but violate the Riemann Hypothesis (having pairs of zeros off the critical line). The archetypal case is the Davenport-Heilbronn function:
      </p>
      $$f_{DH}(s) = \\frac{1-i\\kappa}{2} L(s, \\chi) + \\frac{1+i\\kappa}{2} L(s, \\bar{\\chi})$$
      <p>
        It has the mirror, but <strong>not</strong> the Euler product merge. Off-line zeros appear in mirrored quadruplets $\\{\\rho, 1-\\rho, \\bar{\\rho}, 1-\\bar{\\rho}\\}$ below height $200$. In contrast, $L(s, \\chi_{-3})$, which possesses the true Euler product, has all $114$ zeros strictly on the line. The merge of the prime two is the mathematical constraint enforcing global current positivity.
      </p>
    `
  },
  {
    id: "hill-throats-cubic-asymmetry-flux",
    title: "Phase-Space Action and Cubic Asymmetry in the Throats of the Four Giants",
    date: "September 14, 2026",
    isoDate: "2026-09-14",
    readTime: "7 min read",
    category: "celestial-mechanics",
    categoryLabel: "Celestial Mechanics & Hill Throats",
    categoryClass: "cat-crimson",
    tags: ["Restricted Three-Body", "Lagrange Points", "Hill Throats", "Asymmetric Flux", "Interstellar Visitors"],
    formulaHighlight: "\\lambda^4 - 2\\lambda^2 - 27 = 0, \\quad A \\simeq \\frac{h}{3}\\left(1 - \\frac{h^2}{27}\\right)",
    summary: "Collinear Lagrange points $L_1$ and $L_2$ form a symmetric balanced pair in linearized theory, but exact asymptotic expansion reveals an asymmetric throat transport flux governed by $h = (\\mu/3)^{1/3}$. How Jupiter, Saturn, Uranus, and Neptune act as a gas ladder for interstellar visitors.",
    paperId: "08_Planetary_The_Four_Giants_as_Balanced_Pairs",
    paperTitle: "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    paperPdf: "papers/08_Planetary_The_Four_Giants_as_Balanced_Pairs/08_Planetary_The_Four_Giants_as_Balanced_Pairs.pdf",
    contentHtml: `
      <p class="blog-lead">
        In celestial mechanics, the collinear equilibrium points $L_1$ and $L_2$ in the planar circular restricted three-body problem (PCR3BP) are conventionally treated as symmetric bottlenecks. In Paper 08, we proved that non-linear terms induce an unavoidable cubic asymmetry in phase-space transport.
      </p>

      <h3>1. Universal Hill Eigenvalues</h3>
      <p>
        Expanding the gravitational potential around either collinear point in rotating coordinates yields the characteristic polynomial:
      </p>
      $$\\lambda^4 - 2\\lambda^2 - 27 = 0$$
      <p>
        This bi-quadratic equation possesses exactly one real unstable pair $\\pm \\lambda_H$ and one pure imaginary center pair $\\pm i\\omega_H$:
      </p>
      $$\\lambda_H = \\sqrt{1 + 2\\sqrt{7}} \\approx 2.508287, \\quad \\omega_H = \\sqrt{2\\sqrt{7} - 1} \\approx 2.071594$$
      <p>
        Remarkably, their quadratic difference and product satisfy exact integers:
      </p>
      $$\\lambda_H^2 - \\omega_H^2 = 2, \\qquad \\lambda_H^2 \\omega_H^2 = 27$$

      <h3>2. The Cubic Asymmetry Formula</h3>
      <p>
        Let $\\mu = m / (M + m)$ be the mass parameter and $h = (\\mu/3)^{1/3}$ the Hill scale. Linear theory predicts that the throat openings around $L_1$ and $L_2$ have identical geometric cross-sections for a Jacobi energy excess $\\Delta C > 0$. However, solving the non-linear invariant manifold equations to third order gives the exact asymmetry ratio $A$:
      </p>
      $$A = \\frac{h}{3}\\left(1 - \\frac{h^2}{27} + O(h^3)\\right)$$
      <p>
        For Jupiter ($\\mu \\approx 9.537 \\times 10^{-4}, h \\approx 0.0682$), this generates an inward-to-outward flux bias exceeding $2.2\\%$, altering capture cross-sections for inbound hyperbolic orbiters.
      </p>

      <h3>3. The Gas Ladder and Interstellar Visitors</h3>
      <p>
        This cubic throat asymmetry explains why retrograde hyperbolic interlopers such as 1I/'Oumuamua and 2I/Borisov preferentially scatter through outer throats ($L_2$) rather than inner Lagrange conduits ($L_1$). The Four Giants (Jupiter-Saturn, Uranus-Neptune) act as a balanced cascading ladder, where energy exchange is dictated by invariant manifold tube intersections in 5-dimensional phase space.
      </p>
    `
  },
  {
    id: "wigner-negativity-decoherence-thirds",
    title: "Decoherence at the Thirds: Lee-Yang Circle Theorems in Three-State Spin Chains",
    date: "August 29, 2026",
    isoDate: "2026-08-29",
    readTime: "9 min read",
    category: "quantum-physics",
    categoryLabel: "Quantum Negativity & Coherence",
    categoryClass: "cat-amber",
    tags: ["Wigner Negativity", "Lee-Yang Theorem", "Decoherence", "Spin Chains", "Quantum Phase Space"],
    formulaHighlight: "L(t) = \\frac{1 + 2\\cos(2\\lambda t)}{3} = 0 \\quad \\left(t = \\frac{T}{3}, \\; \\frac{2T}{3}\\right)",
    summary: "Interpreting Riemann's kernel as a pure quantum state $\\varphi = \\Phi / \\|\\Phi\\|$. The total Wigner negativity is bounded by $4.844 \\times 10^{-5}$, and coupling to a triad $\\{-s, 0, s\\}$ produces complete decoherence at exactly one-third and two-thirds of the revival period.",
    paperId: "03_Quantum_The_Riemann_Kernel_as_a_Quantum_State",
    paperTitle: "The Riemann Kernel as a Quantum State: Wigner Negativity, Decoherence at the Thirds and Lee-Yang Zeros",
    paperPdf: "papers/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State.pdf",
    contentHtml: `
      <p class="blog-lead">
        Can the nontrivial zeros of the Riemann zeta function be directly mapped to observable quantum physical phenomena? In Paper 03, we established that a qubit dephased by a classical field whose distribution matches Riemann's kernel exhibits coherence zeros precisely at the Riemann ordinates $\\gamma_n$.
      </p>

      <h3>1. The Riemann Wavefunction in $L^2(\\mathbb{R})$</h3>
      <p>
        Riemann's kernel $\\Phi(\\tau) = \\sum_{n=1}^\\infty (2\\pi^2 n^4 e^{9\\tau/2} - 3\\pi n^2 e^{5\\tau/2}) \\exp(-\\pi n^2 e^{2\\tau})$ is positive, even, and exponentially decaying. Normalizing gives a pure quantum state:
      </p>
      $$\\varphi(\\tau) = \\frac{\\Phi(\\tau)}{\\|\\Phi\\|_{L^2}}$$
      <p>
        Evaluating the Wigner quasiprobability distribution $W_\\varphi(x, p) = \\frac{1}{\\pi} \\int \\varphi(x+y)\\bar{\\varphi}(x-y)e^{-2ipy} dy$ reveals non-classical negativity. However, unlike Fock states where negativity is macroscopic, the Riemann state's negativity is confined:
      </p>
      $$\\int_{W_\\varphi < 0} |W_\\varphi(x, p)|\\, dx\\, dp = 4.844 \\times 10^{-5}$$
      <p>
        The negativity is located exclusively in the momentum band $11.1994 < |x| < 15.8346$, reaching its minimum at $x \\approx 12.022$.
      </p>

      <h3>2. Complete Decoherence at the Thirds</h3>
      <p>
        Now couple a probe qubit to a bath of $N$ symmetric triads $\\{-s, 0, s\\}$. For a single triad with coupling $\\lambda$, the coherence function is:
      </p>
      $$L(t) = \\frac{1}{3} + \\frac{2}{3}\\cos(2\\lambda t)$$
      <p>
        This vanishes completely when $\\cos(2\\lambda t) = -1/2$, which occurs at exact thirds of the period:
      </p>
      $$t^* = \\frac{1}{3}T, \\quad \\frac{2}{3}T, \\qquad T = \\frac{\\pi}{\\lambda}$$
      <p>
        By mapping this triad into a merged pair of Ising spins with coupling $K = \\frac{1}{2}\\ln 2$, we proved that for any chain of $N$ ferromagnetic triads ($K \\ge 0$), all zeros of the partition function and coherence function lie strictly on the unit circle $|z|=1$, in exact conformance with the Lee-Yang circle theorem.
      </p>
    `
  },
  {
    id: "radix-economy-cortical-balance",
    title: "Radix Economy and Cortical Balance: Why $e$ Prefers Balanced Ternary Networks",
    date: "August 10, 2026",
    isoDate: "2026-08-10",
    readTime: "6 min read",
    category: "cortical-networks",
    categoryLabel: "Cortical & Ternary Networks",
    categoryClass: "cat-emerald",
    tags: ["Radix Economy", "Balanced Ternary", "Cortical Networks", "E/I Balance", "Euler Number"],
    formulaHighlight: "\\mu = \\sqrt{K} A (\\nu - \\nu_{\\mathrm{bal}}), \\quad b^* = e \\approx 2.718",
    summary: "The mathematical optimality of base $e \\approx 2.718$ implies that balanced-ternary $\\{-1, 0, +1\\}$ maximizes hardware radix economy. This mathematical optimum mirrors the precise inward/outward charge cancellation in excitable tissue and the $\\sqrt{K}$ drive cancellation in cortical networks.",
    paperId: "06_Algorithms_Three_Is_Enough",
    paperTitle: "Three Is Enough: Radix Economy, Balanced-Ternary Arithmetic and Ternary-Weight Networks",
    paperPdf: "papers/06_Algorithms_Three_Is_Enough/06_Algorithms_Three_Is_Enough.pdf",
    contentHtml: `
      <p class="blog-lead">
        Why does biology favor balanced push-pull cancellation, and why does computer architecture persistently struggle with multiplication overhead? The answer connects the classical calculus problem of radix economy to excitation-inhibition balance in biological neural circuits.
      </p>

      <h3>1. The Mathematical Optimum of Radix Economy</h3>
      <p>
        The radix economy $E(b, N)$ measures the hardware complexity required to represent numbers up to $N$ in integer base $b$:
      </p>
      $$E(b, N) = b \\cdot \\lceil \\log_b N \\rceil \\approx \\frac{b}{\\ln b} \\ln N$$
      <p>
        Minimizing $f(b) = b / \\ln b$ over positive reals yields $f'(b) = (\\ln b - 1)/(\\ln b)^2 = 0$, giving the unique global minimum at Euler's constant:
      </p>
      $$b^* = e \\approx 2.718281828$$
      <p>
        Among discrete integers $b \\in \\mathbb{Z}^+$, $f(3) = 3 / \\ln 3 \\approx 2.7307$ beats $f(2) = 2 / \\ln 2 \\approx 2.8854$. Ternary logic is strictly more hardware-efficient than binary logic.
      </p>

      <h3>2. Balanced Ternary $\\{-1, 0, +1\\}$ and Zero-Multiplier Neural Networks</h3>
      <p>
        In symmetric balanced ternary, the digits represent weights $\\{-1, 0, +1\\}$. In neural network inference, this eliminates multiplications entirely:
      </p>
      $$\\mathbf{y} = \\sum_{w_{ij} = +1} x_j - \\sum_{w_{ij} = -1} x_j$$
      <p>
        Floating-point multiply-accumulate (MAC) units are replaced with simple bitwise multiplexers and additions, reducing silicon area by $87\\%$ and power dissipation by an order of magnitude.
      </p>

      <h3>3. The Biological Mirror: Cortical $\\sqrt{K}$ Cancellation</h3>
      <p>
        In Paper 05, we analyzed $20{,}000$ binary neurons with $K = 100$ to $1600$ synapses per neuron. The excitatory and inhibitory inputs scale as $\\sqrt{K}$, but cancel to order 1:
      </p>
      $$\\mu = \\sqrt{K}\\, A\\, (\\nu - \\nu_{\\mathrm{bal}})$$
      <p>
        At $K = 1600$, $97.63\\%$ of excitatory drive is canceled by inhibition. Biological cortex and ternary computing both converge on the same mathematical imperative: optimal dynamical range occurs through symmetric pair balance rather than asymmetric accumulation.
      </p>
    `
  }
];

// --- State Variables ---
let blogActiveCategory = "all";
let blogSearchQuery = "";

// --- Rendering Function ---
function renderBlogEntries(category = "all", query = "") {
  const container = document.getElementById("blog-posts-grid");
  if (!container) return;

  blogActiveCategory = category;
  blogSearchQuery = query.trim().toLowerCase();

  const filtered = BLOG_ENTRIES.filter(entry => {
    // Category match
    const catMatch = category === "all" || entry.category === category;
    if (!catMatch) return false;

    // Search query match
    if (!blogSearchQuery) return true;
    const q = blogSearchQuery;
    const titleMatch = entry.title.toLowerCase().includes(q);
    const summaryMatch = entry.summary.toLowerCase().includes(q);
    const tagMatch = entry.tags.some(t => t.toLowerCase().includes(q));
    const catLabelMatch = entry.categoryLabel.toLowerCase().includes(q);
    const formulaMatch = entry.formulaHighlight.toLowerCase().includes(q);

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
    const tagsHtml = entry.tags.map(t => `<span class="blog-tag-pill">#${escapeHtml(t)}</span>`).join("");
    
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

        <div class="blog-formula-box">
          <div class="blog-formula-tag">KEY FORMULA / CRITERION</div>
          <div class="blog-formula-math">$$${entry.formulaHighlight}$$</div>
        </div>

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

  // Render KaTeX in blog preview cards
  if (window.triggerMathRendering) {
    window.triggerMathRendering(container);
  }
}

// --- Helper Functions ---
function escapeHtml(str) {
  if (!str) return "";
  return str
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
  if (e && e.target && e.target.classList.contains("modal-card")) return;
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
  // Render initial cards
  renderBlogEntries("all", "");

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

  // Check URL hash on load for deep linking (e.g. #blog-fluid-manifold-simplicial-complex)
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
