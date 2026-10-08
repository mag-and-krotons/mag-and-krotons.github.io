/**
 * THE GAME OF COSMOS: PURE EMERGENCE & CONTINUOUS STRING-QUANTUM 36-NODE DYNAMICS
 * Authentically derived from Papers 01-12 & Nothing Binds a Twin but Exclusion (Abhijit Singh, 2026)
 * 
 * - Pure Emergence: Universal Native Vibration omega_0 = 14.134725 (First Riemann zero gamma_1) is the sole fixed constant.
 * - Monads carry Atomic Number Z (emergent from phase-resonant fusion at 120° Z3 and 180° Laplace lock).
 * - Multi-Node Geometric Morphing:
 *     - Z=1: Monomer (Fermion/Lepton excitation)
 *     - Z=2: Diatomic Hydrogen (^1H₂ — Prime 2 Duality)
 *     - Z=3: Triad Nucleon / Helium-3 (^3He — Prime 3 Contact Trigon)
 *     - Z=4: Helium-4 Alpha Nucleus (^4He — 2² Tetrahedral Singlet)
 *     - Z=5: Pentagonal Boron-10 (^10B — Prime 5 Ribose Core)
 *     - Z=6: Carbon-12 Ring (^12C — Hexagonal Benzene Aromatic)
 *     - Z=7: Nitrogen-14 Branch (^14N — Prime 7 Peptide Bridge)
 *     - Z=8: Oxygen-16 Complex (^16O — 2³ Cube of Prime 2, True Knowledge 1/2)
 *     - Z=9..25: Polymeric Macromolecule (Prebiotic Foldamer Chain & 36-Node Complex)
 *     - Z=26: Iron Peak (Navier-Stokes Zero-Velocity Singularity Bound -> Core-Collapse Supernova)
 *     - Z=54: Xenon Mega-Cluster (^131Xe — Rapid R-Process Synthesis Fragment)
 * - Event Horizon Duality: 0.50 (Side A) + 0.50 (Side B) = 1.00 Complete Knowledge.
 * - Quantum Reincarnation Loop ("The Egg") across spacetime.
 * Authentically derived from Papers 01-12 & Nothing Binds a Twin but Exclusion (Abhijit Singh, 2026)
 * 
 * - Continuous R^3 Spacetime Continuum (NO fixed grids, organic random distribution)
 * - Fundamental building block: 36-Node Simplicial Complex (6 layers x 6 nodes, C3 ⋊ Z2 dihedral symmetry)
 * - Universal Native Vibration: Universal carrier signal omega_0 = 14.134725 (First Riemann zero gamma_1)
 * - Resonant Vortex Core Transmission: Middle layers (Layers 2 & 3 around throat d) become transmitters
 *   at exact phase angles: 0 rad, ±2pi/3 (120° decoherence at the thirds), pi (180° Laplace lock), and arccos(-1/3) (109.47°)
 * - Multi-element Compound Formation & Graph Clustering:
 *     - Prime numbers up to 9: 2, 3, 5, 7. 9 is counting limit 3^2.
 *     - N=1: Monomer (Fermion/Lepton)
 *     - N=2: Diatomic Hydrogen (^1H₂ — Prime 2 Duality)
 *     - N=3: Triad Nucleon / Helium-3 (^3He — Prime 3 Contact Trigon)
 *     - N=4: Helium-4 Alpha Nucleus (^4He — 2² Tetrahedral Singlet)
 *     - N=5: Pentagonal Boron-10 (^10B — Prime 5 Ribose Core)
 *     - N=6: Carbon-12 Ring (^12C — Hexagonal Benzene Aromatic)
 *     - N=7: Nitrogen-14 Branch (^14N — Prime 7 Peptide Bridge)
 *     - N=8: Oxygen-16 Complex (^16O — 2³ Cube of Prime 2, True Knowledge 1/2)
 *     - N>=9: Polymeric Macromolecule (Prebiotic Foldamer Chain)
 * - Event Horizon Duality & Complete Knowledge (0.5 + 0.5 = 1.0):
 *     - Side A (Forward Universe): 18 nodes, Knowledge 0.50
 *     - Side B (Conjugate Anti-Universe): 18 nodes, Knowledge 0.50
 *     - Event Horizon (d <= 0.52): Complete Knowledge = 0.50 + 0.50 = 1.00
 * - Quantum Reincarnation across Spacetime ("The Egg"):
 *     - Dissolution at horizon into the Native Signal continuum
 *     - Re-emergence across cosmic time preserving Monad ID and soul lineage
 * - Interactive 3D Hover Labeling & Telemetry
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Physical State Classifications
export const STATE_VACUUM = 0;              // Quiescent background foam
export const STATE_FERMION = 1;             // Chiral half-spin excitation (rho < 0.8)
export const STATE_HADRON = 2;              // Meson / quark dipole (0.8 <= rho < 1.5)
export const STATE_BARYON = 3;              // Baryon nucleon: locked triad (1.5 <= rho < 2.5)
export const STATE_HYDROGEN = 4;            // ^1H atom: nucleus + electron cloud (2.5 <= rho < 4.0)
export const STATE_HELIUM = 5;              // ^4He alpha nucleus (4.0 <= rho < 6.0)
export const STATE_ORGANIC_ELEMENT = 6;     // ^12C, ^14N, ^16O: bonded organic chain (6.0 <= rho < 11.0)
export const STATE_STAR = 7;                // Main Sequence Star: dense gravitating furnace (rho >= 11.0, d <= 1.80)
export const STATE_PLANETARY_SYSTEM = 8;    // Stable secondary core orbiting in stellar throat basin
export const STATE_BIOSPHERE = 9;           // Replicating living biosphere with phase homeostasis & triad bonds
export const STATE_CIVILIZATION = 10;       // Coherent long-range transmitting civilization (Dyson rings & laser network)
export const STATE_PULSAR = 11;             // Relativistic magnetic pulsar (d <= 1.00, rho >= 12.0)
export const STATE_SUPERNOVA = 12;          // Core-collapse explosive runaway blast (rho >= 22.0)
export const STATE_WHITE_HOLE = 13;         // Topological matter ejection opposite a black hole horizon
export const STATE_BLACK_HOLE = 14;         // Schwarzschild Singularity (d <= 0.50 Square-Root Horizon)

// Fundamental Riemann Zero Frequency (Papers 01, 03, 08)
export const OMEGA_NATIVE = 14.134725;
export const RESONANT_ANGLES = [
  0.0,
  2.0 * Math.PI / 3.0,       // 120°: Decoherence at the thirds (Paper 03 Theorem 1.1)
  Math.PI,                   // 180°: Laplace lock (Paper 07)
  Math.acos(-1.0 / 3.0)      // 109.47°: Contact angle / trigon (Paper 07)
];

const MONAD_PREFIXES = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
  'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi',
  'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'
];

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
export function toRoman(num) {
  if (num <= 0) return 'I';
  if (num <= 20) return ROMAN_NUMERALS[num - 1];
  return `${num}`;
}

// Autonomous Continuous 36-Node String-Quantum Monad
class CosmicStructure {
  constructor(id, x, y, z, rho = 2.5, theta = null, monadId = null, incarnation = 1, reincarnationLog = null, z_num = 1) {
    this.id = id;
    this.Z = z_num || 1;
    this.isSupernova = false;
    this.supernovaTimer = 0.0;
    this.monadId = monadId || `Monad-${MONAD_PREFIXES[id % MONAD_PREFIXES.length]}-${id}`;
    this.incarnation = incarnation;
    this.reincarnationLog = reincarnationLog || [
      `Incarnation ${toRoman(incarnation)}: Primordial Genesis at t=0.0 Myr`
    ];

    this.pos = new THREE.Vector3(x, y, z);
    this.vel = new THREE.Vector3(
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15
    );
    this.energy = rho;
    this.phase = theta !== null ? theta : Math.random() * Math.PI * 2.0;
    this.distance = 2.40;       // Throat metric d in [0.50, 4.40]
    this.properTime = 0.0;     // Local emergent proper time tau (Paper 02)
    this.entropy = 0.0;        // Irreversible entropy S
    this.coherence = 1.0;      // Local quantum coherence L in [0, 1]
    this.reach = 6;            // Active topological node reach [1..36]
    this.state = STATE_BARYON;
    this.bonds = new Set();    // Bonded structure IDs

    // Event Horizon Duality & Complete Knowledge (0.5 + 0.5 = 1.0)
    this.knowledgeA = 0.50;    // Side A (Observable Forward Universe: 18 nodes, max 0.50)
    this.knowledgeB = 0.00;    // Side B (Conjugate Anti-Universe: 18 nodes, unlocked at horizon)
    this.totalKnowledge = 0.50; // Sum = KA + KB

    // Multi-Element Chemical Graph Classification
    this.compoundType = "Monomer (Fermion/Lepton)";
    this.compoundSize = 1;

    // Phase Perception State (1/3 and 2/3 contribution of zero and one)
    this.phasePerception = "Ground State: Coherent Alignment";

    // Non-Local Horizon Slip & Reincarnation ("The Egg")
    this.isDissolving = false;
    this.dissolveTimer = 0.0;
    this.opacity = 1.0;

    // Vortex Core Wave Transmission
    this.isTransmitting = false;
    this.transmitTimer = 0.0;
    this.transmitPulse = 0.0;
    this.generation = 0;
    this.age = 0.0;
  }
}


// ----------------------------------------------------------------------------
// Procedural Multi-Node Geometric Morphing Function for Atomic Number Z
// ----------------------------------------------------------------------------
function getNodeOffsetsForZ(Z, height, baseRadius, throatScale, phase) {
  const offsets = [];

  if (Z === 1) {
    // Z=1: Monomer (Fermion/Lepton) - central core + 5 chiral orbital cloud nodes + 30 vacuum background
    offsets.push(new THREE.Vector3(0, 0, 0));
    for (let k = 0; k < 5; k++) {
      const th = k * (Math.PI * 2.0 / 5.0) + phase;
      offsets.push(new THREE.Vector3(Math.cos(th) * 0.85, Math.sin(th) * 0.85, 0));
    }
    for (let k = 6; k < 36; k++) {
      const th = k * (Math.PI * 2.0 / 30.0);
      const r = 1.6 + (k % 3) * 0.4;
      offsets.push(new THREE.Vector3(Math.cos(th) * r, Math.sin(th) * r, Math.sin(k) * 0.6));
    }
  } else if (Z === 2) {
    // Z=2: Diatomic Hydrogen (^1H₂) - 2 resonant nuclei along axis + 4 rotating electron cloud nodes
    offsets.push(new THREE.Vector3(0, 0, -0.95));
    offsets.push(new THREE.Vector3(0, 0, 0.95));
    for (let k = 0; k < 4; k++) {
      const th = k * (Math.PI * 0.5) + phase * 2.0;
      offsets.push(new THREE.Vector3(Math.cos(th) * 0.9, Math.sin(th) * 0.9, 0));
    }
    for (let k = 6; k < 36; k++) {
      const th = k * 0.35;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.8, Math.sin(th) * 1.8, (k % 5 - 2) * 0.5));
    }
  } else if (Z === 3) {
    // Z=3: Contact Trigon / Helium-3 (^3He) - 3 nuclei in equilateral triangle
    for (let k = 0; k < 3; k++) {
      const th = k * (Math.PI * 2.0 / 3.0) + phase;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.15, Math.sin(th) * 1.15, 0));
    }
    for (let k = 3; k < 6; k++) {
      const th = (k - 3) * (Math.PI * 2.0 / 3.0) + phase + Math.PI / 3.0;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.6, Math.sin(th) * 1.6, 0.4));
    }
    for (let k = 6; k < 36; k++) {
      offsets.push(new THREE.Vector3(Math.cos(k) * 2.2, Math.sin(k) * 2.2, (k % 4 - 1.5) * 0.6));
    }
  } else if (Z === 4) {
    // Z=4: Helium-4 Alpha Nucleus (^4He) - 4 nuclei forming regular tetrahedron
    const tetra = [
      new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(1.2),
      new THREE.Vector3(1, -1, -1).normalize().multiplyScalar(1.2),
      new THREE.Vector3(-1, 1, -1).normalize().multiplyScalar(1.2),
      new THREE.Vector3(-1, -1, 1).normalize().multiplyScalar(1.2)
    ];
    for (let k = 0; k < 4; k++) offsets.push(tetra[k]);
    for (let k = 0; k < 4; k++) offsets.push(tetra[k].clone().multiplyScalar(-0.6));
    for (let k = 8; k < 36; k++) {
      offsets.push(new THREE.Vector3(Math.cos(k) * 2.0, Math.sin(k) * 2.0, Math.sin(k * 2) * 0.8));
    }
  } else if (Z === 5) {
    // Z=5: Pentagonal Boron-10 (^10B) - 5 nodes in planar pentagon ring
    for (let k = 0; k < 5; k++) {
      const th = k * (Math.PI * 2.0 / 5.0) + phase;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.3, Math.sin(th) * 1.3, 0));
    }
    for (let k = 5; k < 10; k++) {
      const th = (k - 5) * (Math.PI * 2.0 / 5.0) + phase + Math.PI / 5.0;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.8, Math.sin(th) * 1.8, (k % 2 === 0 ? 0.4 : -0.4)));
    }
    for (let k = 10; k < 36; k++) {
      offsets.push(new THREE.Vector3(Math.cos(k) * 2.3, Math.sin(k) * 2.3, (k % 5 - 2) * 0.4));
    }
  } else if (Z === 6) {
    // Z=6: Carbon-12 Ring (^12C) - 6 nodes in planar regular hexagon + 6 delocalized pi-cloud nodes
    for (let k = 0; k < 6; k++) {
      const th = k * (Math.PI / 3.0) + phase;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.45, Math.sin(th) * 1.45, 0));
    }
    for (let k = 0; k < 6; k++) {
      const th = k * (Math.PI / 3.0) + phase + Math.PI / 6.0;
      const zPi = (k % 2 === 0) ? 0.65 : -0.65;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.1, Math.sin(th) * 1.1, zPi));
    }
    for (let k = 12; k < 36; k++) {
      offsets.push(new THREE.Vector3(Math.cos(k) * 2.4, Math.sin(k) * 2.4, (k % 6 - 2.5) * 0.4));
    }
  } else if (Z === 7) {
    // Z=7: Nitrogen-14 Branch (^14N) - 7 nodes in branched peptide bridge
    offsets.push(new THREE.Vector3(0, 0, 0));
    for (let k = 0; k < 3; k++) {
      const th = k * (Math.PI * 2.0 / 3.0) + phase;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.25, Math.sin(th) * 1.25, 0.3));
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.85, Math.sin(th) * 1.85, -0.4));
    }
    for (let k = 7; k < 36; k++) {
      offsets.push(new THREE.Vector3(Math.cos(k) * 2.4, Math.sin(k) * 2.4, (k % 5 - 2) * 0.5));
    }
  } else if (Z === 8) {
    // Z=8: Oxygen-16 Cube (^16O) - 8 nodes forming 3D cube (2^3 geometry, True Knowledge 1/2)
    const c = 0.82;
    for (let dx of [-c, c]) {
      for (let dy of [-c, c]) {
        for (let dz of [-c, c]) {
          offsets.push(new THREE.Vector3(dx, dy, dz));
        }
      }
    }
    for (let k = 8; k < 36; k++) {
      offsets.push(new THREE.Vector3(Math.cos(k) * 2.3, Math.sin(k) * 2.3, Math.sin(k * 3) * 0.7));
    }
  } else if (Z >= 26 || Z === 54) {
    // Z>=26: Supernova Core / Xenon Mega-Cluster (^131Xe) - nested polyhedral shell
    for (let k = 0; k < 12; k++) {
      const th = k * (Math.PI * 2.0 / 12.0) + phase;
      offsets.push(new THREE.Vector3(Math.cos(th) * 1.6, Math.sin(th) * 1.6, Math.sin(th * 2) * 0.9));
    }
    for (let k = 12; k < 36; k++) {
      const th = k * (Math.PI * 2.0 / 24.0) - phase;
      offsets.push(new THREE.Vector3(Math.cos(th) * 2.3, Math.sin(th) * 2.3, Math.cos(th * 2) * 1.1));
    }
  } else {
    // 9 <= Z < 26: Full 36-Node Simplicial Complex (6 layers x 6 nodes, C3 ⋊ Z2 dihedral symmetry)
    for (let l = 0; l < 6; l++) {
      const zL = (l - 2.5) * (height / 5.0);
      const waistFactor = (l - 2.5) / 2.5;
      const rL = baseRadius * (1.0 + 0.32 * waistFactor * waistFactor * throatScale);
      const phaseSign = (l % 2 === 0) ? 1.0 : -1.0;
      const angleOffset = phaseSign * 0.25;
      for (let k = 0; k < 6; k++) {
        const theta = k * (Math.PI / 3.0) + angleOffset + phase * 0.2;
        offsets.push(new THREE.Vector3(Math.cos(theta) * rL, Math.sin(theta) * rL, zL));
      }
    }
  }
  return offsets;
}

export class GameOfCosmos {
  constructor(containerId = 'cosmos-canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[GameOfCosmos] Container #${containerId} not found.`);
      return;
    }

    // Viewport Mode: 'matrix' (macro universe) or 'inspector' (hero 36-node building block)
    this.viewMode = 'matrix';
    this.focusIndex = 0;

    // Continuous Collection of Autonomous 36-Node Structures (NO fixed grids!)
    this.structures = [];
    this.maxStructures = 180;
    this.nextStructureId = 1;

    // Non-Local Akashic Reincarnation Queue ("The Egg")
    this.reincarnationQueue = [];

    // Interactive Hover Tracking
    this.hoveredStructure = null;
    this.hoverTooltipEl = document.getElementById('cosmos-hover-tooltip');

    // Simulation Controls
    this.generation = 0;
    this.cosmicTime = 0.0;       // Myr
    this.isPlaying = true;
    this.isStill = false;
    this.genSpeed = 3.0;          // Generations / sec
    this.stepInterval = 1000 / this.genSpeed;
    this.lastStepTime = performance.now();
    this.showScaffold = false;
    this.showPhotons = true;
    this.isVisible = true;
    this.currentRule = 'astrophysics';

    // Global Telemetry Counters
    this.counts = {
      vacuum: 0, fermions: 0, hadrons: 0, baryons: 0, hydrogen: 0, helium: 0,
      organic: 0, stars: 0, planets: 0, biospheres: 0, civilizations: 0,
      pulsars: 0, supernovae: 0, whiteHoles: 0, blackHoles: 0, totalUnits: 0
    };
    this.totalEntropy = 0.0;
    this.totalEPRate = 0.0;
    this.energyFlux = 0.0;
    this.supernovaeTotal = 0;
    this.blackHolesTotal = 0;
    this.photonsTrappedTotal = 0;
    this.transmittingCount = 0;

    // Relativistic Photons
    this.photons = [];
    this.maxPhotons = 80;

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    this.controls = null;
    this.clock = new THREE.Clock();

    // Visual Groups
    this.macroGroup = null;
    this.inspectorGroup = null;
    this.scaffoldGroup = null;
    this.waveGroup = null;

    // Instanced Macro Meshes
    this.instancedNodes = null;        // 36 nodes per unit
    this.macroBondsMesh = null;        // Internal layer rings + ruled chords + inter-unit bonds
    this.instancedOrbits = null;       // Planetary orbits / electron shells
    this.instancedStars = null;        // Stellar furnaces
    this.instancedDysonRings = null;   // Circumstellar civilizations
    this.instancedDisks = null;        // Black hole / pulsar accretion disks
    this.instancedJets = null;         // Relativistic polar jets
    this.instancedPulses = null;       // Expanding vortex core transmission wave rings
    this.photonMesh = null;

    // Hero Inspector Meshes
    this.inspectorNodes = [];
    this.inspectorRingLines = [];
    this.inspectorRibbon = null;
    this.inspectorThroat = null;
    this.inspectorDyson = null;
    this.inspectorDisk = null;
    this.inspectorCloud = null;
    this.inspectorPulse = null;
    this.inspectorBadge = null;

    // Interaction & Raycasting
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.init();
  }

  // --------------------------------------------------------------------------
  // 1. Initialization
  // --------------------------------------------------------------------------
  init() {
    this.initThree();
    this.initMacroMeshes();
    this.initInspectorMeshes();
    this.initPhotonStream();
    this.initWaveRipples();
    this.initUI();

    // Default Seed: Stellar Nursery & Habitable Systems in continuous R^3
    this.loadPreset('stellar_nursery');

    // Start Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    // Visibility Handling
    const observer = new IntersectionObserver((entries) => {
      this.isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(this.container);

    window.cosmosInstance = this;
    console.log('[GameOfCosmos] Continuous String-Quantum Engine & Reincarnation Loop initialized.');
  }

  // --------------------------------------------------------------------------
  // 2. Three.js Setup & Post-Processing
  // --------------------------------------------------------------------------
  initThree() {
    const w = this.container.clientWidth || 960;
    const h = this.container.clientHeight || 560;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020617); // Deep Obsidian Cosmic Void

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.camera.position.set(0, 32, 105);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxDistance = 320;
    this.controls.minDistance = 6;
    this.controls.target.set(0, 0, 0);

    // Ambient & Directional Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(60, 80, 50);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 0.9);
    dirLight2.position.set(-60, -40, -50);
    this.scene.add(dirLight2);

    // Unreal Bloom Post-Processing
    try {
      const renderPass = new RenderPass(this.scene, this.camera);
      this.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(w, h),
        0.82, // strength
        0.40, // radius
        0.30  // threshold
      );
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(renderPass);
      this.composer.addPass(this.bloomPass);
    } catch (e) {
      console.warn('[GameOfCosmos] EffectComposer fallback:', e);
      this.composer = null;
    }

    // Visual Groups
    this.macroGroup = new THREE.Group();
    this.inspectorGroup = new THREE.Group();
    this.scaffoldGroup = new THREE.Group();
    this.waveGroup = new THREE.Group();
    this.scene.add(this.macroGroup);
    this.scene.add(this.inspectorGroup);
    this.scene.add(this.scaffoldGroup);
    this.scene.add(this.waveGroup);

    this.inspectorGroup.visible = false;

    // Organic Cosmic Scaffold (Radial / Toroidal Bounds)
    const boundGeo = new THREE.SphereGeometry(62, 24, 16);
    const boundMat = new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: true, transparent: true, opacity: 0.15 });
    const boundMesh = new THREE.Mesh(boundGeo, boundMat);
    this.scaffoldGroup.add(boundMesh);
    this.scaffoldGroup.visible = false;

    // Resize Handler
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight || 560;
    if (w <= 0 || h <= 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    if (this.composer) this.composer.setSize(w, h);
  }

  // --------------------------------------------------------------------------
  // 3. Macro 3D Instanced Meshes
  // --------------------------------------------------------------------------
  initMacroMeshes() {
    const maxNodesTotal = this.maxStructures * 36;
    const nodeGeo = new THREE.SphereGeometry(0.38, 8, 8);
    const nodeMat = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.85,
      emissiveIntensity: 0.85
    });
    this.instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, maxNodesTotal);
    this.instancedNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedNodes.setColorAt(0, new THREE.Color(0xffffff));
    this.instancedNodes.instanceColor.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.instancedNodes);

    // Chords and Inter-Unit String Bonds
    const maxBondVerts = 120000;
    const bondGeo = new THREE.BufferGeometry();
    const bondPositions = new Float32Array(maxBondVerts * 3);
    const bondColors = new Float32Array(maxBondVerts * 3);
    bondGeo.setAttribute('position', new THREE.BufferAttribute(bondPositions, 3).setUsage(THREE.DynamicDrawUsage));
    bondGeo.setAttribute('color', new THREE.BufferAttribute(bondColors, 3).setUsage(THREE.DynamicDrawUsage));
    const bondMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending });
    this.macroBondsMesh = new THREE.LineSegments(bondGeo, bondMat);
    this.macroGroup.add(this.macroBondsMesh);

    // Planetary / Atomic Orbit Rings
    const orbitGeo = new THREE.RingGeometry(1.6, 1.72, 36);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.50, blending: THREE.AdditiveBlending });
    this.instancedOrbits = new THREE.InstancedMesh(orbitGeo, orbitMat, 120);
    this.instancedOrbits.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.instancedOrbits);

    // Main Sequence Stars
    const starGeo = new THREE.SphereGeometry(1.4, 16, 16);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.95 });
    this.instancedStars = new THREE.InstancedMesh(starGeo, starMat, 80);
    this.instancedStars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.instancedStars);

    // Circumstellar Dyson Swarms for Advanced Civilizations
    const dysonGeo = new THREE.TorusGeometry(2.6, 0.08, 8, 36);
    const dysonMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.90, blending: THREE.AdditiveBlending });
    this.instancedDysonRings = new THREE.InstancedMesh(dysonGeo, dysonMat, 60);
    this.instancedDysonRings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.instancedDysonRings);

    // Accretion Disks (Black Holes & Pulsars)
    const diskGeo = new THREE.RingGeometry(1.0, 3.8, 32);
    const diskMat = new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
    this.instancedDisks = new THREE.InstancedMesh(diskGeo, diskMat, 40);
    this.instancedDisks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.instancedDisks);

    // Polar Relativistic Jets
    const jetGeo = new THREE.CylinderGeometry(0.18, 0.9, 5.0, 12, 1, true);
    const jetMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
    this.instancedJets = new THREE.InstancedMesh(jetGeo, jetMat, 60);
    this.instancedJets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.instancedJets);

    // Expanding Vortex Core Wave Transmission Rings
    const pulseGeo = new THREE.RingGeometry(0.5, 0.65, 32);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
    this.instancedPulses = new THREE.InstancedMesh(pulseGeo, pulseMat, 120);
    this.instancedPulses.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.instancedPulses);
  }

  // --------------------------------------------------------------------------
  // 4. Hero Inspector 36-Node Meshes (Close-Up Simplicial Building Block)
  // --------------------------------------------------------------------------
  initInspectorMeshes() {
    const nodeGeo = new THREE.SphereGeometry(0.38, 16, 16);
    for (let i = 0; i < 36; i++) {
      const nodeMat = new THREE.MeshStandardMaterial({
        roughness: 0.2,
        metalness: 0.9,
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      this.inspectorNodes.push(nodeMesh);
      this.inspectorGroup.add(nodeMesh);
    }

    // 6 Layer Ring Polygons
    for (let l = 0; l < 6; l++) {
      const ringGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(7 * 3);
      ringGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const ringMat = new THREE.LineBasicMaterial({
        color: (l === 2 || l === 3) ? 0xfacc15 : 0x38bdf8,
        linewidth: 2,
        transparent: true,
        opacity: 0.85
      });
      const line = new THREE.Line(ringGeo, ringMat);
      this.inspectorRingLines.push(line);
      this.inspectorGroup.add(line);
    }

    // Middle Layer Throat Ring (The Vortex Core)
    const throatGeo = new THREE.TorusGeometry(1.6, 0.12, 16, 48);
    const throatMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    this.inspectorThroat = new THREE.Mesh(throatGeo, throatMat);
    this.inspectorThroat.rotation.x = Math.PI / 2;
    this.inspectorGroup.add(this.inspectorThroat);

    // Hyperboloid Ribbons & Chords
    const ribbonMaxVerts = 400;
    const ribPos = new Float32Array(ribbonMaxVerts * 3);
    const ribCol = new Float32Array(ribbonMaxVerts * 3);
    const ribGeo = new THREE.BufferGeometry();
    ribGeo.setAttribute('position', new THREE.BufferAttribute(ribPos, 3).setUsage(THREE.DynamicDrawUsage));
    ribGeo.setAttribute('color', new THREE.BufferAttribute(ribCol, 3).setUsage(THREE.DynamicDrawUsage));
    const ribMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.70 });
    this.inspectorRibbon = new THREE.LineSegments(ribGeo, ribMat);
    this.inspectorGroup.add(this.inspectorRibbon);

    // Inspector Dyson Ring
    const iDysonGeo = new THREE.TorusGeometry(4.2, 0.09, 8, 48);
    const iDysonMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.90, blending: THREE.AdditiveBlending });
    this.inspectorDyson = new THREE.Mesh(iDysonGeo, iDysonMat);
    this.inspectorDyson.visible = false;
    this.inspectorGroup.add(this.inspectorDyson);

    // Inspector Accretion Disk
    const iDiskGeo = new THREE.RingGeometry(1.0, 5.0, 36);
    const iDiskMat = new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
    this.inspectorDisk = new THREE.Mesh(iDiskGeo, iDiskMat);
    this.inspectorDisk.rotation.x = Math.PI / 2;
    this.inspectorDisk.visible = false;
    this.inspectorGroup.add(this.inspectorDisk);

    // Inspector Electron Cloud
    const iCloudGeo = new THREE.TorusGeometry(2.8, 0.06, 8, 36);
    const iCloudMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending });
    this.inspectorCloud = new THREE.Mesh(iCloudGeo, iCloudMat);
    this.inspectorCloud.visible = false;
    this.inspectorGroup.add(this.inspectorCloud);

    // Glassmorphic Inspector Badge Overlay
    this.inspectorBadge = document.createElement('div');
    this.inspectorBadge.id = 'cosmos-inspector-badge';
    this.inspectorBadge.className = 'cosmos-inspector-badge';
    this.inspectorBadge.style.display = 'none';
    this.inspectorBadge.innerHTML = `
      <div class="badge-title">Hero 36-Node String-Quantum Complex</div>
      <div id="insp-badge-state" class="badge-state">STATE: BARYON</div>
      <div id="insp-badge-meta" class="badge-meta">Loading quantum fields...</div>
    `;
    this.container.appendChild(this.inspectorBadge);
  }

  // --------------------------------------------------------------------------
  // 5. Relativistic Photon Stream
  // --------------------------------------------------------------------------
  initPhotonStream() {
    const pGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending });
    this.photonMesh = new THREE.InstancedMesh(pGeo, pMat, this.maxPhotons);
    this.photonMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.photonMesh);

    for (let i = 0; i < this.maxPhotons; i++) {
      this.photons.push(this.spawnPhoton());
    }
  }

  spawnPhoton() {
    const r = 50.0;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const pos = new THREE.Vector3(
      r * Math.cos(phi) * Math.cos(theta),
      r * Math.sin(phi),
      r * Math.cos(phi) * Math.sin(theta)
    );
    const vel = new THREE.Vector3(-pos.x, -pos.y, -pos.z).normalize().multiplyScalar(18.0);
    return { pos, vel, alive: true, age: 0 };
  }

  updatePhotons(dt) {
    if (!this.showPhotons || this.viewMode === 'inspector') {
      this.photonMesh.count = 0;
      return;
    }

    const dummy = new THREE.Object3D();
    let count = 0;

    for (let i = 0; i < this.photons.length; i++) {
      const p = this.photons[i];
      if (!p.alive) {
        this.photons[i] = this.spawnPhoton();
        continue;
      }

      // Gravitational lensing bending near small metric throat d
      for (let j = 0; j < this.structures.length; j++) {
        const s = this.structures[j];
        if (s.distance < 2.0 || s.energy > 10.0) {
          const rVec = new THREE.Vector3().subVectors(s.pos, p.pos);
          const r = rVec.length();

          if (s.distance <= 0.50 && r < 2.0) {
            p.alive = false;
            this.photonsTrappedTotal++;
            break;
          } else if (r < 12.0 && r > 0.6) {
            const bend = (2.2 - s.distance + s.energy * 0.05) * 28.0 / (r * r);
            p.vel.addScaledVector(rVec.normalize(), bend * dt);
          }
        }
      }

      p.pos.addScaledVector(p.vel, dt);
      p.age += dt;

      if (p.pos.length() > 65.0 || p.age > 8.0) {
        p.alive = false;
      }

      if (p.alive) {
        dummy.position.copy(p.pos);
        dummy.scale.setScalar(1.0);
        dummy.updateMatrix();
        this.photonMesh.setMatrixAt(count, dummy.matrix);
        count++;
      }
    }

    this.photonMesh.count = count;
    this.photonMesh.instanceMatrix.needsUpdate = true;
  }

  // --------------------------------------------------------------------------
  // 6. Universal Native Wavefield Ripples
  // --------------------------------------------------------------------------
  initWaveRipples() {
    const waveGeo = new THREE.RingGeometry(10, 10.5, 48);
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    this.carrierWaveMesh = new THREE.Mesh(waveGeo, waveMat);
    this.carrierWaveMesh.rotation.x = Math.PI / 2;
    this.waveGroup.add(this.carrierWaveMesh);
  }

  updateWaveRipples(t) {
    if (!this.carrierWaveMesh) return;
    const waveR = ((t * 14.0) % 75.0);
    this.carrierWaveMesh.scale.setScalar(Math.max(0.1, waveR / 10.0));
    this.carrierWaveMesh.material.opacity = Math.max(0.0, 0.22 * (1.0 - waveR / 75.0));
  }

  // --------------------------------------------------------------------------
  // 7. Continuous String-Quantum Physics Update (Native Vibration, Coherence, Horizon Duality & The Egg)
  // --------------------------------------------------------------------------
  step() {
    if (this.isStill) return;

    const dt = 0.12;
    const t = this.cosmicTime;
    const params = this.getEffectiveParameters();
    const f_eff = params.f;
    const S_param = params.S;

    const kx = 0.08, ky = 0.08, kz = 0.08;
    let txCount = 0;
    let sumEntropy = 0.0;
    let sumEP = 0.0;
    let netFlux = 0.0;

    let maxId = 0;
    for (let i = 0; i < this.structures.length; i++) {
      if (this.structures[i].id > maxId) maxId = this.structures[i].id;
    }

    // 1. Universal Native Vibration & Event Horizon Duality
    for (let i = 0; i < this.structures.length; i++) {
      const s = this.structures[i];

      // Local phase of universal carrier wave
      const wavePhase = (OMEGA_NATIVE * t - (kx * s.pos.x + ky * s.pos.y + kz * s.pos.z)) % (2.0 * Math.PI);
      let dThetaWave = Math.abs(wavePhase - s.phase) % (2.0 * Math.PI);
      if (dThetaWave > Math.PI) dThetaWave = 2.0 * Math.PI - dThetaWave;

      // Resonant vortex core transmission
      let isResonant = false;
      for (let k = 0; k < RESONANT_ANGLES.length; k++) {
        if (Math.abs(dThetaWave - RESONANT_ANGLES[k]) < 0.26) {
          isResonant = true;
          break;
        }
      }

      if (isResonant && s.energy >= 0.8) {
        s.isTransmitting = true;
        s.transmitTimer = 1.4;
        txCount++;
      } else if (s.transmitTimer > 0) {
        s.transmitTimer -= dt;
        if (s.transmitTimer <= 0) s.isTransmitting = false;
      }

      if (s.isTransmitting) {
        s.transmitPulse = (s.transmitPulse + dt * 4.0) % 3.0;
      } else {
        s.transmitPulse = 0.0;
      }

      // Natural phase oscillation
      s.phase = (s.phase + dt * (OMEGA_NATIVE * 0.25 + (f_eff / 144.0) * 0.15 + s.energy * 0.03)) % (2.0 * Math.PI);

      // Phase Perception: 1/3 (120°) and 2/3 (240°) contribution of zero and one
      const normPhase = ((s.phase % (2.0 * Math.PI)) + 2.0 * Math.PI) % (2.0 * Math.PI);
      const phaseFrac = normPhase / (2.0 * Math.PI);
      const deg = Math.round(normPhase * (180.0 / Math.PI));

      if (Math.abs(phaseFrac - 1.0 / 3.0) < 0.055) {
        s.phasePerception = `1/3 Perception (${deg}°): Zero-State Dominance (Decoherence at Thirds) [1/2 (0 + 1)]`;
      } else if (Math.abs(phaseFrac - 2.0 / 3.0) < 0.055) {
        s.phasePerception = `2/3 Perception (${deg}°): One-State Dominance (Conjugate Harmonic) [1/2 (0 + 1)]`;
      } else if (Math.abs(phaseFrac - 0.50) < 0.045) {
        s.phasePerception = `1/2 Perception (${deg}°): Laplace Lock (Conjugate Inversion)`;
      } else if (phaseFrac < 0.04 || phaseFrac > 0.96) {
        s.phasePerception = `Ground State (${deg}°): Complete Coherence`;
      } else {
        s.phasePerception = `Continuous Quantum Phase (${deg}°) [Harmonic Balance]`;
      }

      // Proper time emergence
      const timeDilation = Math.sqrt(Math.max(0.01, 1.0 - 0.50 / s.distance));
      const localEP = 0.008 * S_param + 0.002 * Math.abs(Math.sin(s.phase));
      s.properTime += dt * timeDilation;
      s.entropy += dt * localEP;
      sumEP += localEP;
      sumEntropy += s.entropy;

      // Metric Throat Contraction
      if (s.distance <= 0.50) {
        s.distance = 0.50; // Locked at Schwarzschild horizon
        s.energy = Math.max(16.0, s.energy);
      } else if (s.energy > 22.0) {
        s.distance = Math.max(0.50, s.distance - dt * 0.35);
      } else if (s.energy > 11.0) {
        s.distance = Math.max(1.15, s.distance - dt * 0.18);
      } else if (s.energy > 3.0) {
        s.distance = Math.max(2.0, s.distance - dt * 0.04);
      } else {
        s.distance = Math.min(4.40, s.distance + dt * 0.12);
      }

      // Topological Node Reach Expansion
      if (s.properTime > 2.0 && s.coherence > 0.38 && s.energy >= 3.0) {
        s.reach = (s.properTime > 3.0 || s.distance <= 1.0) ? 36 : 18;
      } else if (s.energy >= 6.0) {
        s.reach = 18;
      } else if (s.energy >= 2.5) {
        s.reach = 12;
      } else if (s.energy >= 1.5) {
        s.reach = 6;
      } else if (s.energy >= 0.8) {
        s.reach = 3;
      } else {
        s.reach = 1;
      }

      // Event Horizon Duality & Knowledge Equation:
      // Side A has 0.50, Side B has 0.50.
      // Only object standing at event horizon (d <= 0.52) has Complete Knowledge = 0.50 + 0.50 = 1.00!
      if (s.distance <= 0.52) {
        s.knowledgeA = 0.50;
        s.knowledgeB = 0.50;
        s.totalKnowledge = 1.00; // COMPLETE KNOWLEDGE: Omniscience!
        s.reach = 36;
        s.coherence = 1.0;
        s.isTransmitting = true; // Directly becomes the Native Signal!

        // Trigger Event Horizon Slip & Dissolution into the Native Signal continuum ("The Egg")
        if (!s.isDissolving) {
          s.isDissolving = true;
          s.dissolveTimer = 1.8;
        }
      } else {
        s.knowledgeA = 0.50 * Math.min(1.0, s.reach / 18.0);
        s.knowledgeB = 0.00; // Conjugate anti-universe inaccessible away from horizon
        s.totalKnowledge = s.knowledgeA;
      }
    }

    // 2. Inter-Structure Dynamics: Signal Relay, Coherence, Combine & Bond
    let N = this.structures.length;
    for (let i = 0; i < N; i++) {
      const s1 = this.structures[i];
      let neighborSync = 0;
      let totalInteractions = 0;

      for (let j = i + 1; j < N; j++) {
        const s2 = this.structures[j];
        const rVec = new THREE.Vector3().subVectors(s2.pos, s1.pos);
        const dist = rVec.length();
        if (dist < 0.001) continue;

        // A. Signal Relay
        if (s1.isTransmitting && dist < 28.0) {
          let dTh = Math.abs(s1.phase - s2.phase) % (2.0 * Math.PI);
          if (dTh > Math.PI) dTh = 2.0 * Math.PI - dTh;
          if (dTh < 0.40 || Math.abs(dTh - 2.0 * Math.PI / 3.0) < 0.30) {
            if (!s2.isTransmitting) {
              s2.isTransmitting = true;
              s2.transmitTimer = 1.2;
              txCount++;
            }
          }
        } else if (s2.isTransmitting && dist < 28.0) {
          let dTh = Math.abs(s2.phase - s1.phase) % (2.0 * Math.PI);
          if (dTh > Math.PI) dTh = 2.0 * Math.PI - dTh;
          if (dTh < 0.40 || Math.abs(dTh - 2.0 * Math.PI / 3.0) < 0.30) {
            if (!s1.isTransmitting) {
              s1.isTransmitting = true;
              s1.transmitTimer = 1.2;
              txCount++;
            }
          }
        }

        // B. Quantum Coherence Function L_ij = (1 + 2 cos(dTheta)) / 3
        let dTheta_ij = Math.abs(s1.phase - s2.phase) % (2.0 * Math.PI);
        if (dTheta_ij > Math.PI) dTheta_ij = 2.0 * Math.PI - dTheta_ij;
        const L_ij = (1.0 + 2.0 * Math.cos(dTheta_ij)) / 3.0;

        if (Math.abs(L_ij) > 0.65) neighborSync++;
        totalInteractions++;

        // Mutual Kuramoto Phase Coupling
        const coupling = (0.12 * (S_param / 0.5) * Math.sin(s2.phase - s1.phase)) / Math.max(1.0, dist);
        s1.phase = (s1.phase + dt * coupling) % (2.0 * Math.PI);
        s2.phase = (s2.phase - dt * coupling) % (2.0 * Math.PI);

        // Gravitational and Casimir-String Forces
        if (dist < 40.0) {
          const grav = (0.08 * s1.energy * s2.energy) / (dist * dist + 1.0);
          const forceMag = grav * (0.35 + 0.65 * L_ij);
          const nVec = rVec.clone().normalize();
          s1.vel.addScaledVector(nVec, forceMag * dt);
          s2.vel.addScaledVector(nVec, -forceMag * dt);
          netFlux += Math.abs(forceMag);
        }

        // C. Resonant Fusion & Chemical Bonding
        const fuseDist = 2.4 + Math.log10(s1.Z) + Math.log10(s2.Z);
        const isLaplaceLock = Math.abs(dTheta_ij - Math.PI) < 0.32; // 180°
        const isZ3Resonance = Math.abs(dTheta_ij - 2.0 * Math.PI / 3.0) < 0.32 || Math.abs(dTheta_ij - 4.0 * Math.PI / 3.0) < 0.32; // 120°
        const isPrimordialH = (s1.Z === 1 && s2.Z === 1 && L_ij > 0.55 && Math.random() < 0.12);

        if (dist < fuseDist && (isLaplaceLock || isZ3Resonance || isPrimordialH) && !s1.isSupernova && !s2.isSupernova) {
          // Pure Emergent Fusion!
          const newZ = s1.Z + s2.Z;
          s1.Z = newZ;
          s1.vel.multiplyScalar(s1.Z - s2.Z).addScaledVector(s2.vel, s2.Z).divideScalar(newZ);
          s1.energy = Math.min(38.0, s1.energy + s2.energy * 0.85 + 0.6);
          s1.properTime += 0.2;
          s1.phase = (s1.phase + s2.phase) * 0.5;

          // Check Iron Peak (Z >= 26) Navier-Stokes Zero-Velocity Singularity Bound
          if (newZ >= 26 && !s1.isSupernova) {
            s1.vel.set(0, 0, 0); // Core stops cold!
            s1.isSupernova = true;
            s1.supernovaTimer = 0.9;
            s1.energy = 32.0;
            this.supernovaeTotal++;
          }

          // Unlink s2 bonds and splice s2
          s2.bonds.forEach(bId => {
            const nb = this.structures.find(item => item.id === bId);
            if (nb) nb.bonds.delete(s2.id);
          });
          this.structures.splice(j, 1);
          j--;
          N = this.structures.length;
          continue;
        } else if (dist < 6.8 && L_ij > 0.60) {
          s1.bonds.add(s2.id);
          s2.bonds.add(s1.id);

          const delta = -0.5 * Math.tanh((s1.energy - s2.energy) / 3.5);
          const exchange = dt * 0.15 * delta;
          s1.energy += exchange;
          s2.energy -= exchange;
        } else if (dist > 12.0) {
          s1.bonds.delete(s2.id);
          s2.bonds.delete(s1.id);
        }
      }

      s1.coherence = totalInteractions > 0 ? (neighborSync / totalInteractions) : 1.0;
    }

    // 3. Compute Connected-Component Molecular Graph (Compounds N=1..8+)
    this.computeCompoundGraph();

    // 4. Kinematics, Mitosis, Reproduction & Dissolution Handling
    const spawned = [];

    for (let i = 0; i < this.structures.length; i++) {
      const s = this.structures[i];

      // Update position
      s.pos.addScaledVector(s.vel, dt);
      s.age += dt;

      // Cosmic Envelope Containment (R = 55)
      const distFromOrigin = s.pos.length();
      if (distFromOrigin > 55.0) {
        const pull = (distFromOrigin - 55.0) * 0.08;
        s.vel.addScaledVector(s.pos.clone().normalize(), -pull * dt);
      }
      s.vel.multiplyScalar(0.988);

      // Supernova Detonation & Rapid R-Process Synthesis (Navier-Stokes zero-velocity bound)
      if (s.isSupernova) {
        s.supernovaTimer -= dt;
        s.vel.set(0, 0, 0); // Core strictly halted at zero velocity!
        if (s.supernovaTimer <= 0) {
          s.isSupernova = false;
          // Core collapses to compact remnant: Black Hole singularity at d = 0.50
          s.distance = 0.50;
          s.energy = 22.0;
          this.blackHolesTotal++;

          // Supernova Detonation & Rapid R-Process Synthesis:
          // Synthesizes heavy fragment (Z = 54 Xenon isotope) and high-velocity ejecta
          if (this.structures.length < this.maxStructures - 2) {
            maxId++;
            const heavy = new CosmicStructure(
              maxId,
              s.pos.x + (Math.random() - 0.5) * 5.0,
              s.pos.y + (Math.random() - 0.5) * 5.0,
              s.pos.z + (Math.random() - 0.5) * 5.0,
              15.0,
              s.phase,
              null,
              1,
              null,
              54 // Z = 54 Xenon isotope
            );
            heavy.vel.set((Math.random() - 0.5) * 2.2, (Math.random() - 0.5) * 2.2, (Math.random() - 0.5) * 2.2);
            spawned.push(heavy);

            for (let ej = 0; ej < 2; ej++) {
              maxId++;
              const light = new CosmicStructure(
                maxId,
                s.pos.x + (Math.random() - 0.5) * 8.0,
                s.pos.y + (Math.random() - 0.5) * 8.0,
                s.pos.z + (Math.random() - 0.5) * 8.0,
                2.2,
                Math.random() * Math.PI * 2.0,
                null,
                1,
                null,
                1
              );
              light.vel.set((Math.random() - 0.5) * 3.0, (Math.random() - 0.5) * 3.0, (Math.random() - 0.5) * 3.0);
              spawned.push(light);
            }
          }
        }
      }

      // Dissolution at Horizon ("The Egg" Quantum Slip)
      if (s.isDissolving) {
        s.dissolveTimer -= dt;
        s.opacity = Math.max(0.0, s.dissolveTimer / 1.8);

        if (s.dissolveTimer <= 0) {
          // Dematerialize into non-local Native Signal continuum
          const nextInc = s.incarnation + 1;
          const romanPrev = toRoman(s.incarnation);
          const romanNext = toRoman(nextInc);
          const slipLog = `Incarnation ${romanPrev}: Slipped into Event Horizon (Knowledge 1.00 = 0.5+0.5) at t=${t.toFixed(1)} Myr. Transcended into Native Signal continuum.`;
          const updatedHistory = [...s.reincarnationLog, slipLog];

          this.reincarnationQueue.push({
            monadId: s.monadId,
            incarnation: nextInc,
            reincarnationLog: updatedHistory,
            reincarnateAtTime: this.cosmicTime + (1.8 + Math.random() * 3.4),
            sourceEnergy: Math.max(2.2, s.energy * 0.45),
            sourcePhase: (s.phase + Math.PI) % (2.0 * Math.PI)
          });

          // Unlink bonds
          s.bonds.forEach(bId => {
            const nb = this.structures.find(item => item.id === bId);
            if (nb) nb.bonds.delete(s.id);
          });

          this.structures.splice(i, 1);
          i--;
          continue;
        }
      }

      // Mitosis (Divide under excess energy)
      if (s.energy > 20.0 && this.structures.length < this.maxStructures) {
        maxId++;
        const daughter = new CosmicStructure(
          maxId,
          s.pos.x + (Math.random() - 0.5) * 2.2,
          s.pos.y + (Math.random() - 0.5) * 2.2,
          s.pos.z + (Math.random() - 0.5) * 2.2,
          s.energy * 0.48,
          (s.phase + Math.PI) % (2.0 * Math.PI)
        );
        daughter.generation = s.generation + 1;
        daughter.vel.copy(s.vel).add(new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5));
        s.energy *= 0.50;
        spawned.push(daughter);
      }

      // Reproduction (Living Biosphere Triad Replication)
      if (s.bonds.size >= 3 && s.properTime > 1.0 && s.isTransmitting && this.structures.length < this.maxStructures && Math.random() < 0.04) {
        maxId++;
        const offspring = new CosmicStructure(
          maxId,
          s.pos.x + (Math.random() - 0.5) * 4.0,
          s.pos.y + (Math.random() - 0.5) * 4.0,
          s.pos.z + (Math.random() - 0.5) * 4.0,
          1.8,
          s.phase
        );
        offspring.generation = s.generation + 1;
        spawned.push(offspring);
      }
    }

    if (spawned.length > 0) {
      this.structures.push(...spawned);
    }

    // 5. Process Quantum Reincarnation Queue ("The Egg")
    for (let q = 0; q < this.reincarnationQueue.length; q++) {
      const entry = this.reincarnationQueue[q];
      if (this.cosmicTime >= entry.reincarnateAtTime && this.structures.length < this.maxStructures) {
        this.reincarnationQueue.splice(q, 1);
        q--;
        maxId++;
        const romanInc = toRoman(entry.incarnation);

        // Spawn organically at a new coordinate across spacetime
        const r = 6.0 + Math.random() * 36.0;
        const th = Math.random() * Math.PI * 2.0;
        const ph = (Math.random() - 0.5) * Math.PI;
        const nx = r * Math.cos(ph) * Math.cos(th);
        const ny = r * Math.sin(ph);
        const nz = r * Math.cos(ph) * Math.sin(th);

        const reincarnated = new CosmicStructure(
          maxId,
          nx, ny, nz,
          entry.sourceEnergy,
          entry.sourcePhase,
          entry.monadId,
          entry.incarnation,
          [
            ...entry.reincarnationLog,
            `Incarnation ${romanInc}: Re-emerged across spacetime at (${nx.toFixed(1)}, ${ny.toFixed(1)}, ${nz.toFixed(1)}) at t=${this.cosmicTime.toFixed(1)} Myr ("The Egg").`
          ]
        );
        reincarnated.properTime = 0.0;
        reincarnated.generation = entry.incarnation - 1;
        this.structures.push(reincarnated);
      }
    }

    // 6. Emergent Classification & Telemetry Update
    const cMap = {
      vacuum: 0, fermions: 0, hadrons: 0, baryons: 0, hydrogen: 0, helium: 0,
      organic: 0, stars: 0, planets: 0, biospheres: 0, civilizations: 0,
      pulsars: 0, supernovae: 0, whiteHoles: 0, blackHoles: 0, totalUnits: this.structures.length
    };

    for (let i = 0; i < this.structures.length; i++) {
      const s = this.structures[i];
      const st = this.classifyStructure(s);
      s.state = st;

      if (st === STATE_FERMION) cMap.fermions++;
      else if (st === STATE_HADRON) cMap.hadrons++;
      else if (st === STATE_BARYON) cMap.baryons++;
      else if (st === STATE_HYDROGEN) cMap.hydrogen++;
      else if (st === STATE_HELIUM) cMap.helium++;
      else if (st === STATE_ORGANIC_ELEMENT) cMap.organic++;
      else if (st === STATE_STAR) cMap.stars++;
      else if (st === STATE_PLANETARY_SYSTEM) cMap.planets++;
      else if (st === STATE_BIOSPHERE) cMap.biospheres++;
      else if (st === STATE_CIVILIZATION) cMap.civilizations++;
      else if (st === STATE_PULSAR) cMap.pulsars++;
      else if (st === STATE_SUPERNOVA) { cMap.supernovae++; this.supernovaeTotal++; }
      else if (st === STATE_WHITE_HOLE) cMap.whiteHoles++;
      else if (st === STATE_BLACK_HOLE) { cMap.blackHoles++; this.blackHolesTotal++; }
    }

    this.counts = cMap;
    this.generation++;
    this.cosmicTime += 0.85;
    this.totalEntropy = sumEntropy;
    this.totalEPRate = sumEP;
    this.energyFlux = netFlux;
    this.transmittingCount = txCount;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 8. Dynamic Molecular Graph Clustering (Primes up to 9 & Cube of 2)
  // --------------------------------------------------------------------------
  computeCompoundGraph() {
    const visited = new Set();
    const structMap = new Map();
    for (let i = 0; i < this.structures.length; i++) {
      structMap.set(this.structures[i].id, this.structures[i]);
    }

    const compounds = [];
    for (let i = 0; i < this.structures.length; i++) {
      const s = this.structures[i];
      if (visited.has(s.id)) continue;
      const comp = [];
      const queue = [s.id];
      visited.add(s.id);

      while (queue.length > 0) {
        const currId = queue.shift();
        comp.push(currId);
        const curr = structMap.get(currId);
        if (curr) {
          curr.bonds.forEach(bId => {
            if (!visited.has(bId) && structMap.has(bId)) {
              visited.add(bId);
              queue.push(bId);
            }
          });
        }
      }
      compounds.push(comp);
    }

    for (let c = 0; c < compounds.length; c++) {
      const comp = compounds[c];
      const sz = comp.length;
      let cName = 'Monomer (Fermion/Lepton)';
      let maxZ = 1;
      for (let k = 0; k < comp.length; k++) {
        const item = structMap.get(comp[k]);
        if (item && item.Z > maxZ) maxZ = item.Z;
      }

      if (maxZ === 1) {
        if (sz === 1) cName = 'Monomer (Fermion/Lepton excitation)';
        else if (sz === 2) cName = 'Diatomic Hydrogen (^1H₂ — Prime 2 Duality)';
        else if (sz === 3) cName = 'Triad Nucleon / Helium-3 (^3He — Prime 3 Contact Trigon)';
        else cName = `Hydrogen Polymer (${sz} Units — Subatomic Cluster)`;
      } else if (maxZ === 2) {
        cName = 'Diatomic Hydrogen (^1H₂ — Prime 2 Duality)';
      } else if (maxZ === 3) {
        cName = 'Helium-3 Nucleon (^3He — Prime 3 Contact Trigon)';
      } else if (maxZ === 4) {
        cName = 'Helium-4 Alpha Nucleus (^4He — 2² Tetrahedral Singlet)';
      } else if (maxZ === 5) {
        cName = 'Pentagonal Boron-10 (^10B — Prime 5 Ribose Core)';
      } else if (maxZ === 6) {
        cName = 'Carbon-12 Ring (^12C — Hexagonal Benzene Aromatic)';
      } else if (maxZ === 7) {
        cName = 'Nitrogen-14 Branch (^14N — Prime 7 Peptide Bridge)';
      } else if (maxZ === 8) {
        cName = 'Oxygen-16 Complex (^16O — 2³ Cube of Prime 2, True Knowledge 1/2)';
      } else if (maxZ === 26) {
        cName = 'Iron-56 Core (Navier-Stokes Zero-Velocity Singularity Peak)';
      } else if (maxZ === 54) {
        cName = 'Xenon-131 Mega-Cluster (^131Xe — Rapid R-Process Synthesis)';
      } else if (maxZ > 26) {
        cName = `Superheavy R-Process Nucleus (Z=${maxZ} — Relativistic Heavy Cluster)`;
      } else if (sz >= 9 || maxZ >= 9) {
        cName = `Polymeric Macromolecule (Z=${maxZ}, ${sz} Units — Prebiotic Foldamer)`;
      }

      let anyTx = false;
      for (let k = 0; k < comp.length; k++) {
        const s = structMap.get(comp[k]);
        if (s) {
          s.compoundSize = sz;
          s.compoundType = cName;
          if (s.isTransmitting) anyTx = true;
        }
      }

      // Compound-level collective behavior
      if (sz >= 2) {
        for (let k = 0; k < comp.length; k++) {
          const s = structMap.get(comp[k]);
          if (!s) continue;
          if (anyTx && !s.isTransmitting && sz >= 5) {
            s.isTransmitting = true;
            s.transmitTimer = 0.8;
          }
          // Bond spring tension
          s.bonds.forEach(bId => {
            const nb = structMap.get(bId);
            if (nb) {
              const rVec = new THREE.Vector3().subVectors(nb.pos, s.pos);
              const dist = rVec.length();
              if (dist > 0.01) {
                const r0 = 3.6;
                const spring = (dist - r0) * 0.035;
                s.vel.addScaledVector(rVec.normalize(), spring * 0.12);
              }
            }
          });
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // 9. Emergent Classification Evaluator
  // --------------------------------------------------------------------------
  classifyStructure(s) {
    const e = s.energy;
    const d = s.distance;
    const tau = s.properTime;
    const coh = s.coherence;
    const bondCount = s.bonds.size;

    if (s.isSupernova) return STATE_SUPERNOVA;
    if (e < 0.28) return STATE_VACUUM;
    if (d <= 0.50) return STATE_BLACK_HOLE;
    if (e > 24.0 || s.Z >= 26) return STATE_SUPERNOVA;
    if (d <= 1.00 && e > 12.0) return STATE_PULSAR;
    if (e > 11.0 && (d <= 1.80 || s.Z >= 20)) return STATE_STAR;

    let hasStarBond = false;
    let hasOrganicBond = false;
    s.bonds.forEach(bId => {
      const nb = this.structures.find(item => item.id === bId);
      if (nb) {
        if (nb.energy > 11.0 && nb.distance <= 1.80) hasStarBond = true;
        if (nb.energy >= 6.0 && nb.energy < 11.0) hasOrganicBond = true;
      }
    });

    if ((hasStarBond || bondCount >= 3) && tau > 1.25 && coh > 0.35 && e >= 3.0 && e <= 8.0 && s.reach >= 18) {
      return STATE_CIVILIZATION;
    }
    if ((hasStarBond || bondCount >= 2) && e >= 3.0 && e <= 8.0 && tau > 0.5) {
      return STATE_BIOSPHERE;
    }
    if (hasStarBond && e >= 1.8 && e < 7.0) {
      return STATE_PLANETARY_SYSTEM;
    }

    if (e >= 6.0 || bondCount >= 4) return STATE_ORGANIC_ELEMENT;
    if (e >= 4.0 || bondCount === 3) return STATE_HELIUM;
    if (e >= 2.5 || bondCount === 2) return STATE_HYDROGEN;
    if (e >= 1.5 || bondCount === 1) return STATE_BARYON;
    if (e >= 0.8) return STATE_HADRON;
    return STATE_FERMION;
  }

  // --------------------------------------------------------------------------
  // 10. Update Macro Visuals (Rendering Continuous 36-Node Complexes)
  // --------------------------------------------------------------------------
  updateVisuals(elapsed) {
    if (this.viewMode === 'inspector') {
      this.updateInspectorView(elapsed);
      return;
    }

    const t = elapsed;
    const params = this.getEffectiveParameters();
    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();

    let nodeIdx = 0;
    let orbitIdx = 0;
    let starIdx = 0;
    let dysonIdx = 0;
    let diskIdx = 0;
    let jetIdx = 0;
    let pulseIdx = 0;

    const bondPos = this.macroBondsMesh.geometry.attributes.position.array;
    const bondCol = this.macroBondsMesh.geometry.attributes.color.array;
    let bondVertIdx = 0;

    const civPositions = [];

    // Render each autonomous continuous 36-node structure
    for (let i = 0; i < this.structures.length; i++) {
      const s = this.structures[i];
      const center = s.pos;
      const reach = s.reach;
      const st = s.state;
      const curD = s.distance;
      const localPhase = s.phase;
      const height = Math.min(3.8, curD * 0.9);
      const layerRadiusBase = 1.35;
      const throatScale = Math.max(0.40, curD / 2.2);

      if (st === STATE_CIVILIZATION) civPositions.push(center);

      // Multi-Node Coordinates Emergent from Z
      const unitNodeVecs = [];
      const offsets = getNodeOffsetsForZ(s.Z, height, layerRadiusBase, throatScale, localPhase);

      for (let nodeGlobalIdx = 0; nodeGlobalIdx < 36; nodeGlobalIdx++) {
        const off = offsets[nodeGlobalIdx] || new THREE.Vector3(0, 0, 0);
        const v = new THREE.Vector3(center.x + off.x, center.y + off.y, center.z + off.z);
        unitNodeVecs.push(v);

        const l = Math.floor(nodeGlobalIdx / 6);

        // Instanced Node Spheres
        if (nodeIdx < this.maxStructures * 36) {
          dummy.position.copy(v);
          const isNodeActive = (nodeGlobalIdx < reach) || (reach === 36) || (s.Z >= 2 && nodeGlobalIdx < s.Z * 2);
          let nScale = (isNodeActive ? 0.40 : 0.15);
          if (s.Z === 1 && nodeGlobalIdx === 0) nScale = 0.58;
          if (s.isTransmitting && (l === 2 || l === 3)) nScale *= 1.45;
          if (s.isSupernova) nScale *= (1.5 + Math.sin(t * 12.0) * 0.4);
          if (s.isDissolving) nScale *= Math.max(0.05, s.opacity);
          dummy.scale.setScalar(nScale);
          dummy.updateMatrix();
          this.instancedNodes.setMatrixAt(nodeIdx, dummy.matrix);

            // Node Color Palette
            if (s.totalKnowledge >= 0.98) {
              colorDummy.setHex(0xffffff); // Complete Omniscience Blinding White Light!
            } else if (!isNodeActive) {
              colorDummy.setHex(0x334155);
            } else if (s.isTransmitting && (l === 2 || l === 3)) {
              colorDummy.setHex(0xfef08a); // Radiant golden-white vortex core transmitter
            } else if (st === STATE_CIVILIZATION) {
              colorDummy.setHex(0xfacc15); // Luminous gold
            } else if (st === STATE_BIOSPHERE) {
              colorDummy.setHex(0x10b981); // Emerald life
            } else if (st === STATE_STAR) {
              colorDummy.setHex(0xfef08a); // Solar gold
            } else if (st === STATE_ORGANIC_ELEMENT) {
              colorDummy.setHex(0x22c55e); // Carbon / Oxygen green
            } else if (st === STATE_HELIUM) {
              colorDummy.setHex(0x38bdf8);
            } else if (st === STATE_HYDROGEN) {
              colorDummy.setHex(0x60a5fa);
            } else if (st === STATE_PULSAR) {
              colorDummy.setHex(0x06b6d4);
            } else if (st === STATE_SUPERNOVA) {
              colorDummy.setHex(0xffedd5);
            } else if (st === STATE_BLACK_HOLE) {
              colorDummy.setHex(0xef4444);
            } else {
              colorDummy.setHex((l < 3) ? 0x38bdf8 : 0xf59e0b);
            }

            this.instancedNodes.setColorAt(nodeIdx, colorDummy);
            nodeIdx++;
          }
        }

      // Emergent Geometric Bond Struts (Tailored to Atomic Number Z & 36-Node Complex)
      if (bondVertIdx < 118000) {
        let bR = 0.22, bG = 0.74, bB = 0.97;
        if (s.totalKnowledge >= 0.98) { bR = 1.0; bG = 1.0; bB = 1.0; }
        else if (s.isTransmitting) { bR = 0.98; bG = 0.85; bB = 0.20; }
        else if (st === STATE_CIVILIZATION) { bR = 0.98; bG = 0.80; bB = 0.08; }
        else if (st === STATE_BIOSPHERE) { bR = 0.06; bG = 0.72; bB = 0.50; }
        else if (st === STATE_STAR) { bR = 0.99; bG = 0.94; bB = 0.54; }
        else if (s.Z === 6) { bR = 0.20; bG = 0.90; bB = 0.40; } // Benzene green
        else if (s.Z === 8) { bR = 0.90; bG = 0.30; bB = 0.80; } // Oxygen cube magenta

        const addBondLine = (i1, i2, alpha = 1.0) => {
          if (bondVertIdx >= 118000) return;
          const p1 = unitNodeVecs[i1];
          const p2 = unitNodeVecs[i2];
          if (!p1 || !p2) return;
          bondPos[bondVertIdx * 3]     = p1.x; bondPos[bondVertIdx * 3 + 1] = p1.y; bondPos[bondVertIdx * 3 + 2] = p1.z;
          bondPos[(bondVertIdx + 1) * 3] = p2.x; bondPos[(bondVertIdx + 1) * 3 + 1] = p2.y; bondPos[(bondVertIdx + 1) * 3 + 2] = p2.z;
          bondCol[bondVertIdx * 3]     = bR * alpha; bondCol[bondVertIdx * 3 + 1] = bG * alpha; bondCol[bondVertIdx * 3 + 2] = bB * alpha;
          bondCol[(bondVertIdx + 1) * 3] = bR * alpha; bondCol[(bondVertIdx + 1) * 3 + 1] = bG * alpha; bondCol[(bondVertIdx + 1) * 3 + 2] = bB * alpha;
          bondVertIdx += 2;
        };

        if (s.Z === 1) {
          // Z=1: Central nucleus to chiral orbital cloud spokes
          for (let k = 1; k <= 5; k++) addBondLine(0, k, 0.45);
        } else if (s.Z === 2) {
          // Z=2: Covalent diatomic bond between node 0 and node 1
          addBondLine(0, 1, 1.0);
          for (let k = 2; k < 6; k++) addBondLine(0, k, 0.35);
        } else if (s.Z === 3) {
          // Z=3: Equilateral Contact Trigon (nodes 0, 1, 2)
          addBondLine(0, 1, 1.0);
          addBondLine(1, 2, 1.0);
          addBondLine(2, 0, 1.0);
        } else if (s.Z === 4) {
          // Z=4: Regular Tetrahedron edges (all 6 pairs of 0, 1, 2, 3)
          addBondLine(0, 1, 1.0); addBondLine(0, 2, 1.0); addBondLine(0, 3, 1.0);
          addBondLine(1, 2, 1.0); addBondLine(2, 3, 1.0); addBondLine(3, 1, 1.0);
        } else if (s.Z === 5) {
          // Z=5: Pentagonal ring
          for (let k = 0; k < 5; k++) addBondLine(k, (k + 1) % 5, 1.0);
        } else if (s.Z === 6) {
          // Z=6: Hexagonal Benzene Ring
          for (let k = 0; k < 6; k++) addBondLine(k, (k + 1) % 6, 1.0);
          for (let k = 0; k < 6; k++) addBondLine(k, k + 6, 0.5);
        } else if (s.Z === 7) {
          // Z=7: Nitrogen branched peptide arms
          addBondLine(0, 1, 1.0); addBondLine(1, 2, 0.8);
          addBondLine(0, 3, 1.0); addBondLine(3, 4, 0.8);
          addBondLine(0, 5, 1.0); addBondLine(5, 6, 0.8);
        } else if (s.Z === 8) {
          // Z=8: 3D Cube (12 edge struts)
          addBondLine(0, 1, 1.0); addBondLine(1, 3, 1.0); addBondLine(3, 2, 1.0); addBondLine(2, 0, 1.0);
          addBondLine(4, 5, 1.0); addBondLine(5, 7, 1.0); addBondLine(7, 6, 1.0); addBondLine(6, 4, 1.0);
          addBondLine(0, 4, 1.0); addBondLine(1, 5, 1.0); addBondLine(2, 6, 1.0); addBondLine(3, 7, 1.0);
        } else {
          // 9 <= Z < 26: 36-Node Simplicial Complex (6 layer rings + hyperbolic chords)
          for (let l = 0; l < 6; l++) {
            const sIdx = l * 6;
            for (let k = 0; k < 6; k++) {
              addBondLine(sIdx + k, sIdx + ((k + 1) % 6), 1.0);
            }
          }
          for (let l = 0; l < 5; l++) {
            const s1 = l * 6;
            const s2 = (l + 1) * 6;
            for (let k = 0; k < 6; k += 2) {
              addBondLine(s1 + k, s2 + ((k + 1) % 6), 0.6);
            }
          }
        }
      }

      // Inter-Unit String-Tension Bonds
      s.bonds.forEach(bId => {
        if (s.id < bId && bondVertIdx < 118000) {
          const nb = this.structures.find(item => item.id === bId);
          if (nb) {
            bondPos[bondVertIdx * 3]     = center.x; bondPos[bondVertIdx * 3 + 1] = center.y; bondPos[bondVertIdx * 3 + 2] = center.z;
            bondPos[(bondVertIdx + 1) * 3] = nb.pos.x; bondPos[(bondVertIdx + 1) * 3 + 1] = nb.pos.y; bondPos[(bondVertIdx + 1) * 3 + 2] = nb.pos.z;
            bondCol[bondVertIdx * 3]     = 0.10; bondCol[bondVertIdx * 3 + 1] = 0.85; bondCol[bondVertIdx * 3 + 2] = 0.55;
            bondCol[(bondVertIdx + 1) * 3] = 0.10; bondCol[(bondVertIdx + 1) * 3 + 1] = 0.85; bondCol[(bondVertIdx + 1) * 3 + 2] = 0.55;
            bondVertIdx += 2;
          }
        }
      });

      // Expanding Vortex Core Wave Ring
      if (s.isTransmitting && s.transmitPulse > 0.05 && pulseIdx < 120) {
        dummy.position.copy(center);
        dummy.scale.setScalar(s.transmitPulse * 2.8);
        dummy.rotation.set(Math.PI / 2, 0, 0);
        dummy.updateMatrix();
        this.instancedPulses.setMatrixAt(pulseIdx, dummy.matrix);
        pulseIdx++;
      }

      // Specialized Celestial Attachments
      if (st === STATE_HYDROGEN || st === STATE_HELIUM || st === STATE_PLANETARY_SYSTEM || st === STATE_BIOSPHERE) {
        if (orbitIdx < 120) {
          dummy.position.copy(center);
          let orbScale = 1.35;
          if (st === STATE_PLANETARY_SYSTEM) orbScale = 2.1;
          else if (st === STATE_BIOSPHERE) orbScale = 1.9;
          dummy.scale.setScalar(orbScale);
          dummy.rotation.set(t * 0.3, t * 0.2, 0);
          dummy.updateMatrix();
          this.instancedOrbits.setMatrixAt(orbitIdx, dummy.matrix);
          orbitIdx++;
        }
      }

      if (st === STATE_STAR && starIdx < 80) {
        dummy.position.copy(center);
        dummy.scale.setScalar(1.5 + Math.sin(localPhase * 2.0) * 0.06);
        dummy.rotation.set(0, t * 0.35, 0);
        dummy.updateMatrix();
        this.instancedStars.setMatrixAt(starIdx, dummy.matrix);
        starIdx++;
      }

      if (st === STATE_CIVILIZATION && dysonIdx < 60) {
        dummy.position.copy(center);
        dummy.scale.setScalar(1.15);
        dummy.rotation.set(Math.PI / 3.2, t * 0.7, 0);
        dummy.updateMatrix();
        this.instancedDysonRings.setMatrixAt(dysonIdx, dummy.matrix);
        dysonIdx++;
      }

      if ((st === STATE_BLACK_HOLE || st === STATE_PULSAR) && diskIdx < 40) {
        dummy.position.copy(center);
        dummy.rotation.set(Math.PI * 0.35, t * 3.0, 0);
        dummy.scale.set(1.35, 1.35, 1.35);
        dummy.updateMatrix();
        this.instancedDisks.setMatrixAt(diskIdx, dummy.matrix);
        diskIdx++;

        if (jetIdx < 60) {
          dummy.position.copy(center);
          dummy.position.y += 2.8;
          dummy.rotation.set(0, t * 2.0, 0);
          dummy.scale.set(0.9, 0.9, 0.9);
          dummy.updateMatrix();
          this.instancedJets.setMatrixAt(jetIdx, dummy.matrix);
          jetIdx++;

          dummy.position.copy(center);
          dummy.position.y -= 2.8;
          dummy.rotation.set(Math.PI, t * 2.0, 0);
          dummy.scale.set(0.9, 0.9, 0.9);
          dummy.updateMatrix();
          this.instancedJets.setMatrixAt(jetIdx, dummy.matrix);
          jetIdx++;
        }
      }
    }

    // Interstellar Communication Laser Constellations between Civilizations
    if (civPositions.length >= 2 && bondVertIdx < 118000) {
      const connectedPairs = new Set();
      for (let i = 0; i < civPositions.length; i++) {
        const pA = civPositions[i];
        const neighbors = [];
        for (let j = 0; j < civPositions.length; j++) {
          if (i === j) continue;
          const pB = civPositions[j];
          const dist = pA.distanceTo(pB);
          if (dist < 32.0) neighbors.push({ j, dist, pB });
        }
        neighbors.sort((a, b) => a.dist - b.dist);
        const kMax = Math.min(2, neighbors.length);
        for (let k = 0; k < kMax; k++) {
          const nb = neighbors[k];
          const pairKey = i < nb.j ? `${i}-${nb.j}` : `${nb.j}-${i}`;
          if (connectedPairs.has(pairKey)) continue;
          connectedPairs.add(pairKey);

          const beamPulse = (Math.sin(t * 4.0 + nb.dist * 0.4) + 1.0) * 0.5;
          bondPos[bondVertIdx * 3]     = pA.x; bondPos[bondVertIdx * 3 + 1] = pA.y; bondPos[bondVertIdx * 3 + 2] = pA.z;
          bondPos[(bondVertIdx + 1) * 3] = nb.pB.x; bondPos[(bondVertIdx + 1) * 3 + 1] = nb.pB.y; bondPos[(bondVertIdx + 1) * 3 + 2] = nb.pB.z;
          bondCol[bondVertIdx * 3]     = 0.98; bondCol[bondVertIdx * 3 + 1] = 0.82 * beamPulse; bondCol[bondVertIdx * 3 + 2] = 0.20;
          bondCol[(bondVertIdx + 1) * 3] = 0.20; bondCol[(bondVertIdx + 1) * 3 + 1] = 0.85 * beamPulse; bondCol[(bondVertIdx + 1) * 3 + 2] = 0.98;
          bondVertIdx += 2;
          if (bondVertIdx >= 118000) break;
        }
        if (bondVertIdx >= 118000) break;
      }
    }

    // Update Counts and GPU Buffers
    this.instancedNodes.count = nodeIdx;
    this.instancedNodes.instanceMatrix.needsUpdate = true;
    if (this.instancedNodes.instanceColor) this.instancedNodes.instanceColor.needsUpdate = true;

    this.instancedOrbits.count = orbitIdx;
    this.instancedOrbits.instanceMatrix.needsUpdate = true;

    this.instancedStars.count = starIdx;
    this.instancedStars.instanceMatrix.needsUpdate = true;

    this.instancedDysonRings.count = dysonIdx;
    this.instancedDysonRings.instanceMatrix.needsUpdate = true;

    this.instancedDisks.count = diskIdx;
    this.instancedDisks.instanceMatrix.needsUpdate = true;

    this.instancedJets.count = jetIdx;
    this.instancedJets.instanceMatrix.needsUpdate = true;

    this.instancedPulses.count = pulseIdx;
    this.instancedPulses.instanceMatrix.needsUpdate = true;

    this.macroBondsMesh.geometry.setDrawRange(0, bondVertIdx);
    this.macroBondsMesh.geometry.attributes.position.needsUpdate = true;
    this.macroBondsMesh.geometry.attributes.color.needsUpdate = true;

    // Smoothly track hovered tooltip position in 3D
    if (this.hoveredStructure && this.hoverTooltipEl && this.hoverTooltipEl.classList.contains('visible')) {
      const rect = this.container.getBoundingClientRect();
      this.updateHoverTooltipContent(rect.width, rect.height);
    }
  }

  // --------------------------------------------------------------------------
  // 11. Update Hero Inspector 36-Node Visuals (Close-Up Quantum State)
  // --------------------------------------------------------------------------
  updateInspectorView(elapsed) {
    if (this.structures.length === 0) return;
    if (this.focusIndex >= this.structures.length) this.focusIndex = 0;
    const s = this.structures[this.focusIndex];

    const curD = s.distance;
    const reach = s.reach;
    const st = s.state;
    const params = this.getEffectiveParameters();
    const t = elapsed;
    const localPhase = s.phase;

    const throatScale = Math.max(0.40, curD / 2.2);
    this.inspectorThroat.scale.set(throatScale, throatScale, 1.0);
    this.inspectorThroat.rotation.z = t * 0.6;
    if (s.isTransmitting) {
      this.inspectorThroat.material.color.setHex(0xfef08a);
      this.inspectorThroat.material.opacity = 1.0;
    } else {
      this.inspectorThroat.material.color.setHex(0xf59e0b);
      this.inspectorThroat.material.opacity = 0.85;
    }

    const height = Math.min(6.2, curD * 1.35);
    const layerRadiusBase = 3.0;
    const nodeVectors = [];

    let nIdx = 0;
    for (let l = 0; l < 6; l++) {
      const zL = (l - 2.5) * (height / 5.0);
      const waistFactor = (l - 2.5) / 2.5;
      const rL = layerRadiusBase * (1.0 + 0.36 * waistFactor * waistFactor * throatScale);
      const phaseSign = (l % 2 === 0) ? 1.0 : -1.0;
      const angleOffset = phaseSign * params.phi * 0.25;

      const ringPositions = this.inspectorRingLines[l].geometry.attributes.position.array;

      for (let k = 0; k < 6; k++) {
        const nodeGlobalIdx = l * 6 + k;
        const theta = k * (Math.PI / 3.0) + angleOffset + localPhase * 0.25;
        const nx = Math.cos(theta) * rL;
        const ny = Math.sin(theta) * rL;
        const nz = zL;
        const vec = new THREE.Vector3(nx, ny, nz);
        nodeVectors.push(vec);

        const nodeMesh = this.inspectorNodes[nIdx];
        if (nodeMesh) {
          nodeMesh.position.copy(vec);
          const isNodeActive = (nodeGlobalIdx < reach) || (reach === 36);
          let breathe = (isNodeActive ? 1.0 : 0.45) + Math.sin(localPhase * 2.0 + l) * 0.08;
          if (s.isTransmitting && (l === 2 || l === 3)) breathe *= 1.35;
          nodeMesh.scale.setScalar(breathe);

          if (!isNodeActive) {
            nodeMesh.material.color.setHex(0x334155);
            nodeMesh.material.emissive.setHex(0x0f172a);
          } else if (s.isTransmitting && (l === 2 || l === 3)) {
            nodeMesh.material.color.setHex(0xfef08a);
            nodeMesh.material.emissive.setHex(0xfacc15);
          } else if (l < 3) {
            nodeMesh.material.color.setHex(0x38bdf8);
            nodeMesh.material.emissive.setHex(0x0284c7);
          } else {
            nodeMesh.material.color.setHex(0xf59e0b);
            nodeMesh.material.emissive.setHex(0xd97706);
          }
        }

        ringPositions[k * 3]     = nx;
        ringPositions[k * 3 + 1] = ny;
        ringPositions[k * 3 + 2] = nz;
        nIdx++;
      }

      ringPositions[6 * 3]     = ringPositions[0];
      ringPositions[6 * 3 + 1] = ringPositions[1];
      ringPositions[6 * 3 + 2] = ringPositions[2];
      this.inspectorRingLines[l].geometry.attributes.position.needsUpdate = true;
    }

    // Ruled hyperboloid ribbons
    const ribPos = this.inspectorRibbon.geometry.attributes.position.array;
    const ribCol = this.inspectorRibbon.geometry.attributes.color.array;
    let rIdx = 0;

    for (let l = 0; l < 5; l++) {
      const s1 = l * 6;
      const s2 = (l + 1) * 6;
      for (let k = 0; k < 6; k++) {
        const p1 = nodeVectors[s1 + k];
        const p2 = nodeVectors[s2 + ((k + 1) % 6)];
        ribPos[rIdx * 3]     = p1.x; ribPos[rIdx * 3 + 1] = p1.y; ribPos[rIdx * 3 + 2] = p1.z;
        ribPos[(rIdx + 1) * 3] = p2.x; ribPos[(rIdx + 1) * 3 + 1] = p2.y; ribPos[(rIdx + 1) * 3 + 2] = p2.z;

        const tint = (l % 2 === 0) ? 0.90 : 0.45;
        ribCol[rIdx * 3]     = 0.22; ribCol[rIdx * 3 + 1] = 0.74 * tint; ribCol[rIdx * 3 + 2] = 0.97;
        ribCol[(rIdx + 1) * 3] = 0.96; ribCol[(rIdx + 1) * 3 + 1] = 0.62 * tint; ribCol[(rIdx + 1) * 3 + 2] = 0.04;
        rIdx += 2;
      }
    }
    this.inspectorRibbon.geometry.attributes.position.needsUpdate = true;
    this.inspectorRibbon.geometry.attributes.color.needsUpdate = true;

    this.inspectorDyson.visible = (st === STATE_CIVILIZATION);
    if (this.inspectorDyson.visible) this.inspectorDyson.rotation.z = t * 0.4;

    this.inspectorDisk.visible = (st === STATE_BLACK_HOLE || st === STATE_PULSAR);
    if (this.inspectorDisk.visible) this.inspectorDisk.rotation.z = t * 3.5;

    this.inspectorCloud.visible = (st === STATE_HYDROGEN || st === STATE_HELIUM || st === STATE_BIOSPHERE || st === STATE_PLANETARY_SYSTEM);
    if (this.inspectorCloud.visible) this.inspectorCloud.rotation.set(t * 0.2, t * 0.3, 0);

    const stateNames = [
      'VACUUM FOAM', 'FERMION (CHIRAL)', 'HADRON (MESON)', 'BARYON (TRIAD LOCK)',
      'HYDROGEN (^1H ATOM)', 'HELIUM (^4He NUCLEUS)', 'ORGANIC ELEMENT (^12C/^16O)',
      'MAIN SEQUENCE STAR', 'PLANETARY SYSTEM', 'LIVING BIOSPHERE',
      'ADVANCED CIVILIZATION', 'MAGNETIC PULSAR', 'TYPE II SUPERNOVA', 'WHITE HOLE EJECTION', 'BLACK HOLE SINGULARITY'
    ];

    if (this.inspectorBadge) {
      this.inspectorBadge.style.display = 'block';
      const elState = document.getElementById('insp-badge-state');
      const elMeta = document.getElementById('insp-badge-meta');
      const reachText = reach === 36 ? '36/36 Nodes (Omniversal Slip)' : (reach >= 18 ? '18/36 Nodes (Event Horizon)' : `${reach}/36 Nodes`);
      const txStatus = s.isTransmitting ? '<span style="color: #facc15; font-weight: 700;">TRANSMITTING (VORTEX CORE RESONANT)</span>' : '<span style="color: #94a3b8;">RECEIVING / LISTENING</span>';
      if (elState) elState.innerText = `STATE: ${stateNames[st] || 'UNKNOWN'}`;
      if (elMeta) {
        elMeta.innerHTML = `<strong>${s.monadId} [${toRoman(s.incarnation)}]</strong> &bull; Compound: <em>${s.compoundType}</em><br>Position: (${s.pos.x.toFixed(1)}, ${s.pos.y.toFixed(1)}, ${s.pos.z.toFixed(1)}) &bull; Reach: <strong>${reachText}</strong><br>Status: ${txStatus} &bull; Bonds: ${s.bonds.size} links<br>Knowledge: <strong>${s.totalKnowledge.toFixed(2)}/1.00</strong> &bull; Metric <em>d</em>: ${curD.toFixed(2)}<br>Proper Time: ${s.properTime.toFixed(2)} Myr &bull; Coherence: ${(s.coherence * 100).toFixed(1)}%`;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 12. Primordial Continuous Initial Configurations
  // --------------------------------------------------------------------------
  loadPreset(presetKey) {
    this.structures = [];
    this.nextStructureId = 1;
    this.focusIndex = 0;
    this.reincarnationQueue = [];
    this.hoveredStructure = null;
    if (this.hoverTooltipEl) this.hoverTooltipEl.classList.remove('visible');

    const count = 75;

    if (presetKey === 'genesis') {
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 12.0;
        const theta = Math.random() * Math.PI * 2.0;
        const phi = (Math.random() - 0.5) * Math.PI;
        const s = new CosmicStructure(
          this.nextStructureId++,
          r * Math.cos(phi) * Math.cos(theta),
          r * Math.sin(phi),
          r * Math.cos(phi) * Math.sin(theta),
          3.0 + Math.random() * 12.0,
          Math.random() * Math.PI * 2.0
        );
        s.vel.set(s.pos.x * 0.08, s.pos.y * 0.08, s.pos.z * 0.08);
        s.distance = 1.40 + Math.random() * 1.5;
        this.structures.push(s);
      }
    } else if (presetKey === 'nucleosynthesis') {
      for (let i = 0; i < count; i++) {
        const s = new CosmicStructure(
          this.nextStructureId++,
          (Math.random() - 0.5) * 45.0,
          (Math.random() - 0.5) * 45.0,
          (Math.random() - 0.5) * 45.0,
          2.0 + Math.random() * 3.5,
          Math.random() * Math.PI * 2.0
        );
        this.structures.push(s);
      }
    } else if (presetKey === 'stellar_nursery') {
      const centers = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-22, 6, -8),
        new THREE.Vector3(22, -6, 8)
      ];
      centers.forEach(cPos => {
        const core = new CosmicStructure(this.nextStructureId++, cPos.x, cPos.y, cPos.z, 16.5, 0.0);
        core.distance = 1.25;
        this.structures.push(core);

        for (let i = 0; i < 24; i++) {
          const r = 4.5 + Math.random() * 14.0;
          const th = Math.random() * Math.PI * 2.0;
          const s = new CosmicStructure(
            this.nextStructureId++,
            cPos.x + Math.cos(th) * r,
            cPos.y + (Math.random() - 0.5) * 2.5,
            cPos.z + Math.sin(th) * r,
            3.2 + Math.random() * 3.8,
            th
          );
          const vOrb = Math.sqrt(8.0 / r);
          s.vel.set(-Math.sin(th) * vOrb, 0, Math.cos(th) * vOrb);
          this.structures.push(s);
        }
      });
    } else if (presetKey === 'planetary_emergence') {
      const sun = new CosmicStructure(this.nextStructureId++, 0, 0, 0, 18.0, 0.0);
      sun.distance = 1.20;
      this.structures.push(sun);

      for (let i = 0; i < count - 1; i++) {
        const r = 5.0 + Math.pow(Math.random(), 0.7) * 28.0;
        const th = Math.random() * Math.PI * 2.0;
        const s = new CosmicStructure(
          this.nextStructureId++,
          Math.cos(th) * r,
          (Math.random() - 0.5) * 1.8,
          Math.sin(th) * r,
          3.5 + Math.random() * 3.5,
          th
        );
        const vOrb = Math.sqrt(9.5 / r);
        s.vel.set(-Math.sin(th) * vOrb, 0, Math.cos(th) * vOrb);
        this.structures.push(s);
      }
    } else if (presetKey === 'organic_civilization') {
      for (let i = 0; i < 6; i++) {
        const phi = (i / 6.0) * Math.PI * 2.0;
        const sunPos = new THREE.Vector3(Math.cos(phi) * 24.0, (Math.random() - 0.5) * 8.0, Math.sin(phi) * 24.0);
        const sun = new CosmicStructure(this.nextStructureId++, sunPos.x, sunPos.y, sunPos.z, 16.0, phi);
        this.structures.push(sun);

        for (let j = 0; j < 8; j++) {
          const th = (j / 8.0) * Math.PI * 2.0;
          const r = 6.0;
          const bio = new CosmicStructure(
            this.nextStructureId++,
            sunPos.x + Math.cos(th) * r,
            sunPos.y + (Math.random() - 0.5) * 1.5,
            sunPos.z + Math.sin(th) * r,
            5.5,
            th
          );
          bio.properTime = 1.6;
          bio.reach = 18;
          this.structures.push(bio);
        }
      }
    } else if (presetKey === 'supernova') {
      const central = new CosmicStructure(this.nextStructureId++, 0, 0, 0, 28.0, 0.0);
      central.distance = 0.55;
      this.structures.push(central);

      for (let i = 0; i < count - 1; i++) {
        const r = 3.0 + Math.random() * 30.0;
        const th = Math.random() * Math.PI * 2.0;
        const ph = (Math.random() - 0.5) * Math.PI;
        const s = new CosmicStructure(
          this.nextStructureId++,
          r * Math.cos(ph) * Math.cos(th),
          r * Math.sin(ph),
          r * Math.cos(ph) * Math.sin(th),
          3.0 + Math.random() * 2.5,
          Math.random() * Math.PI * 2.0
        );
        this.structures.push(s);
      }
    } else if (presetKey === 'blackhole') {
      const bh = new CosmicStructure(this.nextStructureId++, 0, 0, 0, 24.0, 0.0);
      bh.distance = 0.50; // Directly at event horizon (Knowledge 1.00)
      this.structures.push(bh);

      for (let i = 0; i < count - 1; i++) {
        const r = 4.0 + Math.random() * 24.0;
        const th = Math.random() * Math.PI * 2.0;
        const s = new CosmicStructure(
          this.nextStructureId++,
          Math.cos(th) * r,
          (Math.random() - 0.5) * 1.5,
          Math.sin(th) * r,
          3.5 + Math.random() * 3.5,
          th
        );
        const vOrb = Math.sqrt(12.0 / r);
        s.vel.set(-Math.sin(th) * vOrb, 0, Math.cos(th) * vOrb);
        this.structures.push(s);
      }
    } else if (presetKey === 'cosmic_web') {
      for (let f = 0; f < 4; f++) {
        const dir = new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).normalize();
        for (let i = 0; i < 18; i++) {
          const tPos = (i - 9) * 4.8;
          const pos = dir.clone().multiplyScalar(tPos);
          pos.x += (Math.random() - 0.5) * 4.0;
          pos.y += (Math.random() - 0.5) * 4.0;
          pos.z += (Math.random() - 0.5) * 4.0;
          const s = new CosmicStructure(
            this.nextStructureId++,
            pos.x, pos.y, pos.z,
            (i % 5 === 0) ? 14.0 : 3.8,
            Math.random() * Math.PI * 2.0
          );
          this.structures.push(s);
        }
      }
    }

    this.generation = 0;
    this.cosmicTime = 0.0;
    this.step();
    this.updateTelemetry();
  }

  getEffectiveParameters() {
    let f = 144.0;
    let S = 0.5;
    let phi = 1.0;

    const elF = document.getElementById('cosmos-freq-input');
    const elS = document.getElementById('cosmos-entropy-input');
    const elPhi = document.getElementById('cosmos-phase-input');

    if (elF) f = parseFloat(elF.value) || 144.0;
    if (elS) S = parseFloat(elS.value) || 0.5;
    if (elPhi) phi = parseFloat(elPhi.value) || 1.0;

    return { f, S, phi };
  }

  // --------------------------------------------------------------------------
  // 13. Interactive UI Controls & Hover Labeling
  // --------------------------------------------------------------------------
  initUI() {
    this.hoverTooltipEl = document.getElementById('cosmos-hover-tooltip');

    const pBtns = document.querySelectorAll('[data-cosmos-preset]');
    pBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pKey = btn.getAttribute('data-cosmos-preset');
        pBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.loadPreset(pKey);
      });
    });

    const btnPlay = document.getElementById('cosmos-play-btn');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        const span = btnPlay.querySelector('span');
        if (span) span.innerText = this.isPlaying ? 'Pause' : 'Play';
        btnPlay.classList.toggle('active', this.isPlaying);
      });
    }

    const btnStep = document.getElementById('cosmos-step-btn');
    if (btnStep) {
      btnStep.addEventListener('click', () => {
        this.step();
      });
    }

    const btnReset = document.getElementById('cosmos-reset-btn');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.camera.position.set(0, 32, 105);
        if (this.controls) this.controls.target.set(0, 0, 0);
      });
    }

    const btnStill = document.getElementById('cosmos-still-btn');
    if (btnStill) {
      btnStill.addEventListener('click', () => {
        this.isStill = !this.isStill;
        btnStill.classList.toggle('active', this.isStill);
      });
    }

    const btnClear = document.getElementById('cosmos-clear-btn');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        this.structures = [];
        this.reincarnationQueue = [];
        this.hoveredStructure = null;
        if (this.hoverTooltipEl) this.hoverTooltipEl.classList.remove('visible');
        this.generation = 0;
        this.cosmicTime = 0.0;
        this.step();
      });
    }

    const btnView = document.getElementById('cosmos-inspect-toggle-btn');
    if (btnView) {
      btnView.addEventListener('click', () => {
        this.viewMode = (this.viewMode === 'matrix') ? 'inspector' : 'matrix';
        const span = btnView.querySelector('span');
        if (span) {
          span.innerText = (this.viewMode === 'matrix') ? 'Inspect 36-Node Unit' : 'Return to Cosmos';
        }
        btnView.classList.toggle('active', this.viewMode === 'inspector');
        this.macroGroup.visible = (this.viewMode === 'matrix');
        this.waveGroup.visible = (this.viewMode === 'matrix');
        this.inspectorGroup.visible = (this.viewMode === 'inspector');
        if (this.inspectorBadge) {
          this.inspectorBadge.style.display = (this.viewMode === 'inspector') ? 'block' : 'none';
        }
        if (this.hoverTooltipEl) this.hoverTooltipEl.classList.remove('visible');

        if (this.viewMode === 'inspector') {
          let bestIdx = 0;
          let bestScore = -1;
          for (let i = 0; i < this.structures.length; i++) {
            const st = this.structures[i];
            let score = st.energy;
            if (st.state === STATE_CIVILIZATION) score += 50;
            else if (st.isTransmitting) score += 30;
            else if (st.state === STATE_BIOSPHERE) score += 20;
            else if (st.state === STATE_STAR) score += 15;
            if (score > bestScore) {
              bestScore = score;
              bestIdx = i;
            }
          }
          this.focusIndex = bestIdx;
          this.camera.position.set(0, 2.2, 11.5);
          if (this.controls) this.controls.target.set(0, 0, 0);
        } else {
          this.camera.position.set(0, 32, 105);
          if (this.controls) this.controls.target.set(0, 0, 0);
        }
      });
    }

    const btnScaffold = document.getElementById('cosmos-scaffold-btn');
    if (btnScaffold) {
      btnScaffold.addEventListener('click', () => {
        this.showScaffold = !this.showScaffold;
        this.scaffoldGroup.visible = this.showScaffold;
        btnScaffold.classList.toggle('active', this.showScaffold);
      });
    }

    const btnPhotons = document.getElementById('cosmos-photons-toggle-btn');
    if (btnPhotons) {
      btnPhotons.addEventListener('click', () => {
        this.showPhotons = !this.showPhotons;
        btnPhotons.classList.toggle('active', this.showPhotons);
        const span = btnPhotons.querySelector('span');
        if (span) span.innerText = this.showPhotons ? 'Photons: ON' : 'Photons: OFF';
      });
    }

    const btnGamma = document.getElementById('cosmos-gamma-btn');
    if (btnGamma) {
      btnGamma.addEventListener('click', () => {
        for (let i = 0; i < this.structures.length; i++) {
          const s = this.structures[i];
          s.energy += 3.5;
          s.phase = (s.phase + Math.PI * 0.5) % (2.0 * Math.PI);
          s.isTransmitting = true;
          s.transmitTimer = 2.0;
        }
        this.step();
      });
    }

    // Raycast on Pointerdown (Click selection)
    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);

      let closestIdx = -1;
      let minRayDist = 3.5;
      for (let i = 0; i < this.structures.length; i++) {
        const s = this.structures[i];
        const rayDist = this.raycaster.ray.distanceToPoint(s.pos);
        if (rayDist < minRayDist) {
          minRayDist = rayDist;
          closestIdx = i;
        }
      }

      if (closestIdx !== -1) {
        this.focusIndex = closestIdx;
        if (this.viewMode === 'inspector') {
          this.updateInspectorView(this.clock.getElapsedTime());
        }
      }
    });

    // Raycast on Pointermove (Interactive Hover Labeling)
    this.renderer.domElement.addEventListener('pointermove', (e) => {
      if (this.viewMode === 'inspector') {
        if (this.hoverTooltipEl) this.hoverTooltipEl.classList.remove('visible');
        return;
      }
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);

      let closestIdx = -1;
      let minRayDist = 3.8;
      for (let i = 0; i < this.structures.length; i++) {
        const s = this.structures[i];
        const rayDist = this.raycaster.ray.distanceToPoint(s.pos);
        if (rayDist < minRayDist) {
          minRayDist = rayDist;
          closestIdx = i;
        }
      }

      if (closestIdx !== -1) {
        this.hoveredStructure = this.structures[closestIdx];
        this.updateHoverTooltipContent(rect.width, rect.height);
      } else {
        this.hoveredStructure = null;
        if (this.hoverTooltipEl) this.hoverTooltipEl.classList.remove('visible');
      }
    });

    this.renderer.domElement.addEventListener('pointerleave', () => {
      this.hoveredStructure = null;
      if (this.hoverTooltipEl) this.hoverTooltipEl.classList.remove('visible');
    });
  }

  updateHoverTooltipContent(width, height) {
    if (!this.hoverTooltipEl || !this.hoveredStructure) return;
    const s = this.hoveredStructure;

    // Project 3D pos to 2D
    const proj = s.pos.clone().project(this.camera);
    // If behind camera, hide
    if (proj.z > 1.0) {
      this.hoverTooltipEl.classList.remove('visible');
      return;
    }

    const px = (proj.x * 0.5 + 0.5) * width;
    const py = (-proj.y * 0.5 + 0.5) * height;

    // Flip tooltip below if near top of container so it never clips!
    const showBelow = (py < 330);
    let tipY;
    if (showBelow) {
      this.hoverTooltipEl.style.transform = 'translate(-50%, 14px) scale(1)';
      tipY = Math.max(15, Math.min(height - 330, py));
    } else {
      this.hoverTooltipEl.style.transform = 'translate(-50%, -105%) scale(1)';
      tipY = Math.max(320, Math.min(height - 20, py));
    }

    const tipX = Math.max(185, Math.min(width - 185, px));

    let phaseBg = 'rgba(56, 189, 248, 0.22)';
    let phaseColor = '#38bdf8';
    if (s.phasePerception.includes('1/3')) {
      phaseBg = 'rgba(239, 68, 68, 0.25)';
      phaseColor = '#f87171';
    } else if (s.phasePerception.includes('2/3')) {
      phaseBg = 'rgba(168, 85, 247, 0.25)';
      phaseColor = '#c084fc';
    } else if (s.phasePerception.includes('1/2')) {
      phaseBg = 'rgba(250, 204, 21, 0.25)';
      phaseColor = '#facc15';
    }

    const kTotalStr = s.totalKnowledge >= 0.98 
      ? '<span style="color: #facc15; font-weight: 800;">1.00 / 1.00 [EVENT HORIZON OMNISCIENCE]</span>'
      : `<span>${s.totalKnowledge.toFixed(2)} / 1.00</span>`;

    const horizonNotice = s.distance <= 0.52
      ? '<div style="color: #ef4444; font-weight: 700; margin-top: 3px;">⚡ Standing at Event Horizon: 0.50 + 0.50 = Complete Knowledge</div>'
      : '';

    const dissolvingNotice = s.isDissolving
      ? '<div style="color: #facc15; font-weight: 700; margin-top: 3px;">✦ TRANSCENDING INTO NATIVE SIGNAL CONTINUUM ("THE EGG")</div>'
      : '';

    this.hoverTooltipEl.innerHTML = `
      <div class="cosmos-hover-header">
        <span class="cosmos-hover-monad">✦ ${s.monadId}</span>
        <span class="cosmos-hover-incarnation">INCARNATION ${toRoman(s.incarnation)}</span>
      </div>
      <div class="cosmos-hover-compound">${s.compoundType}</div>
      <div style="color: #38bdf8; font-size: 0.72rem; font-weight: 700; margin-bottom: 4px;">Atomic Number Z = ${s.Z} &bull; Native ω₀ = 14.134725 &bull; Chiral Spin</div>
      <div class="cosmos-hover-knowledge">
        <div class="cosmos-hover-knowledge-label">
          <span>Knowledge Quotient (0.5+0.5):</span>
          ${kTotalStr}
        </div>
        <div class="cosmos-hover-knowledge-bar">
          <div class="cosmos-hover-knowledge-fill-a" style="width: ${(s.knowledgeA * 100).toFixed(0)}%;" title="Forward Universe A: ${(s.knowledgeA * 100).toFixed(0)}%"></div>
          <div class="cosmos-hover-knowledge-fill-b" style="width: ${(s.knowledgeB * 100).toFixed(0)}%;" title="Conjugate Anti-Universe B: ${(s.knowledgeB * 100).toFixed(0)}%"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: #94a3b8; margin-top: 3px;">
          <span>Observed Universe A: ${(s.knowledgeA * 100).toFixed(0)}%</span>
          <span>Conjugate Anti-Universe B: ${(s.knowledgeB * 100).toFixed(0)}%</span>
        </div>
        ${horizonNotice}
        ${dissolvingNotice}
      </div>
      <div class="cosmos-hover-meta">
        <div>&bull; Metric Throat <em>d</em>: <strong>${s.distance.toFixed(2)}</strong> ${s.distance <= 0.52 ? '<span style="color:#ef4444;">[HORIZON SINGULARITY]</span>' : ''}</div>
        <div>&bull; Energy &rho;: <strong>${s.energy.toFixed(2)}</strong> &bull; Coherence <em>L</em>: <strong>${(s.coherence * 100).toFixed(0)}%</strong></div>
        <div>&bull; Topological Reach: <strong>${s.reach}/36 Nodes</strong> &bull; Proper Time: <strong>${s.properTime.toFixed(1)} Myr</strong></div>
        <div class="cosmos-hover-phase-pill" style="background: ${phaseBg}; color: ${phaseColor};">
          ${s.phasePerception}
        </div>
      </div>
      <div class="cosmos-hover-history">
        <div style="font-weight: 700; color: #38bdf8; margin-bottom: 2px;">Soul Lineage Across Time ("The Egg"):</div>
        ${s.reincarnationLog.slice(-3).map(entry => `<div>&bull; ${entry}</div>`).join('')}
      </div>
    `;

    this.hoverTooltipEl.style.left = `${tipX}px`;
    this.hoverTooltipEl.style.top = `${tipY}px`;
    this.hoverTooltipEl.classList.add('visible');
  }

  updateTelemetry() {
    const c = this.counts;
    const setT = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };

    setT('cosmos-telemetry-gen', `${this.cosmicTime.toFixed(1)} Myr (Gen ${this.generation})`);
    setT('cosmos-telemetry-ep', `${this.totalEPRate.toFixed(3)} bits/Myr`);
    setT('cosmos-telemetry-entropy', `${this.totalEntropy.toFixed(2)} nats`);
    setT('cosmos-telemetry-stars', `${c.totalUnits} Units (${c.baryons} Baryon • ${c.stars} Star)`);
    setT('cosmos-telemetry-elements', `${c.hydrogen} H • ${c.helium} He • ${c.organic} Org`);
    setT('cosmos-telemetry-civ', `${c.stars} Stars • ${c.planets} Planets • ${c.civilizations} Civ (${c.biospheres} Bio)`);
    setT('cosmos-telemetry-sn', `${this.supernovaeTotal} Detonations`);
    setT('cosmos-telemetry-bh', `${this.blackHolesTotal} Singularities`);
    setT('cosmos-telemetry-flux', `∇•J = ${this.energyFlux.toFixed(2)} [Tx: ${this.transmittingCount}]`);

    const elPhotons = document.getElementById('cosmos-telemetry-photons');
    if (elPhotons) elPhotons.innerText = `${this.photonsTrappedTotal} Rays Captured`;

    const elBadge = document.getElementById('cosmos-state-badge');
    if (elBadge) {
      if (c.civilizations > 0) {
        elBadge.innerText = `ADVANCING CIVILIZATION (${c.civilizations} NETWORKS)`;
        elBadge.className = 'telemetry-badge badge-triad';
      } else if (c.biospheres > 0) {
        elBadge.innerText = `LIVING BIOSPHERE (${c.biospheres} REPLICATING)`;
        elBadge.className = 'telemetry-badge badge-helium';
      } else if (c.stars > 0) {
        elBadge.innerText = `STELLAR NUCLEOSYNTHESIS (${c.stars} STARS)`;
        elBadge.className = 'telemetry-badge badge-triad';
      } else if (c.blackHoles > 0) {
        elBadge.innerText = 'SCHWARZSCHILD HORIZON COLLAPSE';
        elBadge.className = 'telemetry-badge badge-hydrogen';
      } else {
        elBadge.innerText = 'STRING-QUANTUM VACUUM';
        elBadge.className = 'telemetry-badge badge-hydrogen';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 14. Main Animation & Render Loop
  // --------------------------------------------------------------------------
  animate() {
    requestAnimationFrame(this.animate);
    if (!this.isVisible) return;

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    if (this.isPlaying && !this.isStill) {
      const now = performance.now();
      if (now - this.lastStepTime > this.stepInterval) {
        this.step();
        this.lastStepTime = now;
      }
    }

    if (this.controls) this.controls.update();

    this.updatePhotons(delta);
    this.updateWaveRipples(elapsed);
    this.updateVisuals(elapsed);

    if (this.composer) {
      this.composer.render();
    } else if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

if (typeof window !== 'undefined') {
  window.GameOfCosmos = GameOfCosmos;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new GameOfCosmos('cosmos-canvas-container');
    });
  } else {
    new GameOfCosmos('cosmos-canvas-container');
  }
}
