/**
 * THE GAME OF COSMOS: 3D 36-NODE CELLULAR AUTOMATA & NATIVE PRIMALITY EMERGENCE
 * Authentically derived from Papers 01-12 & Nothing Binds a Twin but Exclusion (Abhijit Singh, 2026)
 * 
 * - Fundamental building block: 36-Node Simplicial Spacetime Unit (6 layers x 6 nodes = 36 nodes, C3 ⋊ Z2 dihedral symmetry)
 * - Microscopic Local Laws:
 *     1. Modulo-6 Primality Resonance (Nothing Binds a Twin): non-canceling 2, 3 and 6k ± 1 clock states
 *     2. Gravitational Metric Basins (Papers 07 & 11): energy condenses into metric wells (d < 2.0)
 *     3. Kuramoto Phase Coupling & Vector Flux (Paper 01 Euler Merge): J_ij = rho_j sin(theta_j - theta_i)
 *     4. Two-State Energy Partitioning (Paper 04 Which Member Carries): delta = -1/2 tanh((rho - 3.5)/2)
 *     5. Throat Metric Stress & Horizon Infall (Paper 11 The Square-Root Horizon): d in [0.50, 4.40], polar jets at d = 0.50
 *     6. Theorem 1.1 Time Emergence (Paper 02): dtau = sqrt(1 - 0.50/d) dt driven by irreversible EP
 *     7. Node Reach Advancement: 1 -> 3 -> 6 -> 12 -> 18 (1/2 horizon reach) -> 36 (complete omniversal knowledge)
 *     8. Interstellar Communication: Coherent gamma-wave laser beams link advancing 36-node civilizations
 * - Pure Emergence: Particles, atoms, stars, planets, biospheres, civilizations, pulsars, white holes,
 *   and black holes emerge spontaneously from local physics without hardcoded sequential logic.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Physical State Classifications (Emergent from local continuous fields)
export const STATE_VACUUM = 0;              // Ground state 36-node quantum foam (rho < 0.28, d = 4.40)
export const STATE_FERMION = 1;             // Subatomic chiral half-spin excitation (0.28 <= rho < 0.8)
export const STATE_HADRON = 2;              // Meson: bound quark-antiquark dipole (0.8 <= rho < 1.5)
export const STATE_BARYON = 3;              // Baryon nucleon: C3 triad balanced core (1.5 <= rho < 2.5)
export const STATE_HYDROGEN = 4;            // ^1H atom: core + 1s orbital cloud (2.5 <= rho < 4.0)
export const STATE_HELIUM = 5;              // ^4He alpha atom: dual closed fusion shell (4.0 <= rho < 6.0)
export const STATE_ORGANIC_ELEMENT = 6;     // ^12C, ^14N, ^16O: multi-directional covalent bonding (6.0 <= rho < 11.0)
export const STATE_STAR = 7;                // Main Sequence Star: dense core (rho >= 11.0, d <= 1.80) radiating thermal flux
export const STATE_PLANETARY_SYSTEM = 8;    // Stable secondary core orbiting in stellar throat basin
export const STATE_BIOSPHERE = 9;           // Non-equilibrium living biosphere near organic element & star
export const STATE_CIVILIZATION = 10;       // Coherent phase-synchronized network of biospheres (gamma > 0.38, tau > 2.0, reach >= 18)
export const STATE_PULSAR = 11;             // Rapidly rotating relativistic magnetic core (d <= 1.00, rho >= 12.0)
export const STATE_SUPERNOVA = 12;          // Relativistic explosive runaway blast (rho >= 24.0)
export const STATE_WHITE_HOLE = 13;         // Topological matter ejection opposite a black hole horizon
export const STATE_BLACK_HOLE = 14;         // Schwarzschild Singularity (d <= 0.50 Square-Root Horizon)

// Primes up to 26 (3D Moore Neighborhood)
const NEIGHBOR_PRIMES = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23]);

export class GameOfCosmos {
  constructor(containerId = 'cosmos-canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[GameOfCosmos] Container #${containerId} not found.`);
      return;
    }

    // 3D Cellular Lattice Dimensions (10x10x10 = 1,000 sites)
    this.GRID = 10;
    this.SPACING = 8.6;

    // Viewport Mode: 'matrix' (macro universe) or 'inspector' (hero 36-node building block)
    this.viewMode = 'matrix';
    this.focusCoord = { x: 5, y: 5, z: 5 };

    // Continuous Microscopic Physical Field Tensors (10x10x10)
    this.energy = this.createGrid3D(0.0);          // Local excitation density rho
    this.phase = this.createGrid3D(0.0);           // Node phase angle theta in [0, 2pi)
    this.distance = this.createGrid3D(4.40);       // Inter-layer throat metric d in [0.50, 4.40]
    this.properTime = this.createGrid3D(0.0);      // Local proper time tau (Paper 02)
    this.entropy = this.createGrid3D(0.0);         // Irreversible entropy S_irr
    this.coherence = this.createGrid3D(0.0);       // Local phase coherence gamma in [0, 1]
    this.nodeReach = this.createGrid3D(0);         // Active node reach K in [0, 36] (Prompt 5)
    this.fluxX = this.createGrid3D(0.0);           // Vector momentum J_x
    this.fluxY = this.createGrid3D(0.0);           // Vector momentum J_y
    this.fluxZ = this.createGrid3D(0.0);           // Vector momentum J_z

    // Cache of Emergent Classifications
    this.state = this.createGrid3D(STATE_VACUUM);

    // Simulation Engine Controls
    this.generation = 0;
    this.cosmicTime = 0.0;                        // Myr
    this.isPlaying = true;
    this.isStill = false;
    this.genSpeed = 3.0;                           // Generations / sec
    this.stepInterval = 1000 / this.genSpeed;
    this.lastStepTime = performance.now();
    this.showScaffold = false;
    this.isVisible = true;
    this.currentRule = 'astrophysics';

    // Global Telemetry Counters
    this.counts = {
      vacuum: 0,
      fermions: 0,
      hadrons: 0,
      baryons: 0,
      hydrogen: 0,
      helium: 0,
      organic: 0,
      stars: 0,
      planets: 0,
      biospheres: 0,
      civilizations: 0,
      pulsars: 0,
      supernovae: 0,
      whiteHoles: 0,
      blackHoles: 0,
      totalUnits: 0
    };
    this.supernovaeTotal = 0;
    this.blackHolesTotal = 0;
    this.totalEntropy = 0.0;
    this.totalEPRate = 0.0;
    this.energyFlux = 0.0;

    // Null Geodesic Photon Beams
    this.showPhotons = true;
    this.maxPhotons = 90;
    this.photons = [];
    this.photonsTrappedTotal = 0;

    // Three.js Systems
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.composer = null;
    this.bloomPass = null;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.animId = null;

    // Visual Mesh Groups
    this.macroGroup = null;
    this.inspectorGroup = null;
    this.scaffoldGroup = null;
    this.instancedNodes = null;       // 36 nodes per unit
    this.instancedOrbits = null;      // Electron clouds & planetary tracks
    this.instancedStars = null;       // Stellar coronae
    this.instancedDysonRings = null;  // Civilization Dyson swarm rings
    this.instancedDisks = null;       // Black hole accretion disks
    this.instancedJets = null;        // Relativistic polar jets
    this.macroBondsMesh = null;       // Internal layer rings, chords & inter-unit laser beams
    this.macroBondPositions = null;
    this.macroBondColors = null;
    this.inspectorBadge = null;       // Glassmorphic Inspector Badge

    // Initialize System
    this.initThree();
    this.initScaffold();
    this.initMacroInstancing();
    this.initHeroInspector();
    this.initPhotonStream();
    this.initUI();
    this.loadPreset('genesis');

    window.cosmosInstance = this;
    window.GameOfCosmos = GameOfCosmos;
    this.updateTelemetry();
    this.animate();
  }

  createGrid3D(val) {
    const G = this.GRID;
    const g = [];
    for (let x = 0; x < G; x++) {
      g[x] = [];
      for (let y = 0; y < G; y++) {
        g[x][y] = [];
        for (let z = 0; z < G; z++) {
          g[x][y][z] = val;
        }
      }
    }
    return g;
  }

  getCellCenter(x, y, z) {
    const half = (this.GRID - 1) * 0.5;
    return new THREE.Vector3(
      (x - half) * this.SPACING,
      (y - half) * this.SPACING,
      (z - half) * this.SPACING
    );
  }

  // --------------------------------------------------------------------------
  // 1. Three.js Scene Setup & Post-Processing
  // --------------------------------------------------------------------------
  initThree() {
    const w = this.container.clientWidth || 900;
    const h = this.container.clientHeight || 560;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x030712); // Deep obsidian void

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1200);
    this.camera.position.set(0, 32, 105);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 450;
    this.controls.minDistance = 6;

    // Ambient and Point Illumination
    const ambLight = new THREE.AmbientLight(0xffffff, 0.65);
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
        0.82, // strength (calibrated so space remains deep obsidian)
        0.40, // radius
        0.30  // threshold (crisp stellar glow without overexposure)
      );
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(renderPass);
      this.composer.addPass(this.bloomPass);
    } catch (e) {
      console.warn('[GameOfCosmos] Post-processing composer fallback:', e);
      this.composer = null;
    }

    // Groups
    this.macroGroup = new THREE.Group();
    this.inspectorGroup = new THREE.Group();
    this.scaffoldGroup = new THREE.Group();
    this.scene.add(this.macroGroup);
    this.scene.add(this.inspectorGroup);
    this.scene.add(this.scaffoldGroup);

    this.inspectorGroup.visible = false;

    // Resize Handler
    window.addEventListener('resize', () => this.onWindowResize());
  }

  onResize() {
    this.onWindowResize();
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w <= 0 || h <= 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    if (this.composer) this.composer.setSize(w, h);
  }

  // --------------------------------------------------------------------------
  // 2. Spatial Lattice Scaffold (10x10x10 Box Grid)
  // --------------------------------------------------------------------------
  initScaffold() {
    const G = this.GRID;
    const boxGeo = new THREE.BoxGeometry(this.SPACING * 0.92, this.SPACING * 0.92, this.SPACING * 0.92);
    const edges = new THREE.EdgesGeometry(boxGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.22 });

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const center = this.getCellCenter(x, y, z);
          const wire = new THREE.LineSegments(edges, lineMat);
          wire.position.copy(center);
          this.scaffoldGroup.add(wire);
        }
      }
    }
    this.scaffoldGroup.visible = this.showScaffold;
  }

  // --------------------------------------------------------------------------
  // 3. Macro Universe Instanced Geometry (36-Node Complexes & Astrophysics)
  // --------------------------------------------------------------------------
  initMacroInstancing() {
    // A. 36 Nodes per Unit (up to 1,000 units x 36 = 36,000 instances)
    const nodeGeo = new THREE.SphereGeometry(0.28, 12, 10);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.18,
      metalness: 0.85,
      emissive: 0x0f172a,
      emissiveIntensity: 0.6
    });
    this.instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, 36000);
    this.instancedNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedNodes.count = 0;
    this.macroGroup.add(this.instancedNodes);

    // B. Electron Cloud / Planetary Orbital Tracks (up to 300 instances)
    const orbitGeo = new THREE.TorusGeometry(1.6, 0.04, 8, 36);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.instancedOrbits = new THREE.InstancedMesh(orbitGeo, orbitMat, 300);
    this.instancedOrbits.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedOrbits.count = 0;
    this.macroGroup.add(this.instancedOrbits);

    // C. Stellar Coronae (up to 120 instances)
    const starGeo = new THREE.SphereGeometry(1.4, 16, 14);
    const starMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending
    });
    this.instancedStars = new THREE.InstancedMesh(starGeo, starMat, 120);
    this.instancedStars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedStars.count = 0;
    this.macroGroup.add(this.instancedStars);

    // D. Civilization Dyson Swarm Rings (up to 64 instances)
    const dysonGeo = new THREE.TorusGeometry(2.3, 0.06, 8, 48);
    const dysonMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.instancedDysonRings = new THREE.InstancedMesh(dysonGeo, dysonMat, 64);
    this.instancedDysonRings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedDysonRings.count = 0;
    this.macroGroup.add(this.instancedDysonRings);

    // E. Black Hole Accretion Disks (up to 32 instances)
    const diskGeo = new THREE.RingGeometry(0.8, 3.2, 32);
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.80,
      blending: THREE.AdditiveBlending
    });
    this.instancedDisks = new THREE.InstancedMesh(diskGeo, diskMat, 32);
    this.instancedDisks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedDisks.count = 0;
    this.macroGroup.add(this.instancedDisks);

    // F. Relativistic Polar Jets (up to 60 instances)
    const jetGeo = new THREE.CylinderGeometry(0.12, 0.65, 5.0, 12, 1, true);
    const jetMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    this.instancedJets = new THREE.InstancedMesh(jetGeo, jetMat, 60);
    this.instancedJets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedJets.count = 0;
    this.macroGroup.add(this.instancedJets);

    // G. Dynamic Macro Internal Chords, Layer Rings & Inter-Unit Laser Beams
    const maxBondVerts = 80000;
    this.macroBondPositions = new Float32Array(maxBondVerts * 3);
    this.macroBondColors = new Float32Array(maxBondVerts * 3);
    const bondGeo = new THREE.BufferGeometry();
    bondGeo.setAttribute('position', new THREE.BufferAttribute(this.macroBondPositions, 3).setUsage(THREE.DynamicDrawUsage));
    bondGeo.setAttribute('color', new THREE.BufferAttribute(this.macroBondColors, 3).setUsage(THREE.DynamicDrawUsage));

    const bondMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.macroBondsMesh = new THREE.LineSegments(bondGeo, bondMat);
    this.macroGroup.add(this.macroBondsMesh);
  }

  // --------------------------------------------------------------------------
  // 4. Hero 36-Node Spacetime Inspector View (6 Layers x 6 Nodes)
  // --------------------------------------------------------------------------
  initHeroInspector() {
    this.inspectorNodes = [];
    this.inspectorRingLines = [];

    const nodeGeo = new THREE.SphereGeometry(0.38, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7
    });

    // 36 Nodes across 6 Layers (6 layers x 6 nodes = 36 nodes)
    for (let i = 0; i < 36; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
      this.inspectorGroup.add(mesh);
      this.inspectorNodes.push(mesh);
    }

    // 6 Layer Ring Lines
    const ringMat = new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.75 });
    for (let l = 0; l < 6; l++) {
      const pts = [];
      for (let k = 0; k <= 6; k++) {
        pts.push(new THREE.Vector3());
      }
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geom, ringMat);
      this.inspectorGroup.add(line);
      this.inspectorRingLines.push(line);
    }

    // Central Throat Constriction Ring
    const throatGeo = new THREE.TorusGeometry(1.8, 0.08, 12, 48);
    const throatMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.85 });
    this.inspectorThroat = new THREE.Mesh(throatGeo, throatMat);
    this.inspectorThroat.rotation.x = Math.PI / 2;
    this.inspectorGroup.add(this.inspectorThroat);

    // Hyperbolic Ruled Ribbons Connecting the 6 Layers
    const ribbonMaxVerts = 400;
    const ribPos = new Float32Array(ribbonMaxVerts * 3);
    const ribCol = new Float32Array(ribbonMaxVerts * 3);
    const ribGeo = new THREE.BufferGeometry();
    ribGeo.setAttribute('position', new THREE.BufferAttribute(ribPos, 3).setUsage(THREE.DynamicDrawUsage));
    ribGeo.setAttribute('color', new THREE.BufferAttribute(ribCol, 3).setUsage(THREE.DynamicDrawUsage));
    const ribMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.65 });
    this.inspectorRibbon = new THREE.LineSegments(ribGeo, ribMat);
    this.inspectorGroup.add(this.inspectorRibbon);

    // Inspector Dyson Swarm Ring
    const iDysonGeo = new THREE.TorusGeometry(3.6, 0.08, 8, 48);
    const iDysonMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.90, blending: THREE.AdditiveBlending });
    this.inspectorDyson = new THREE.Mesh(iDysonGeo, iDysonMat);
    this.inspectorDyson.visible = false;
    this.inspectorGroup.add(this.inspectorDyson);

    // Inspector Accretion Disk
    const iDiskGeo = new THREE.RingGeometry(1.0, 4.5, 32);
    const iDiskMat = new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending });
    this.inspectorDisk = new THREE.Mesh(iDiskGeo, iDiskMat);
    this.inspectorDisk.rotation.x = Math.PI / 2;
    this.inspectorDisk.visible = false;
    this.inspectorGroup.add(this.inspectorDisk);

    // Inspector Orbital Electron Cloud
    const iCloudGeo = new THREE.TorusGeometry(2.4, 0.05, 8, 36);
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
      <div class="badge-title">Hero 36-Node Spacetime Complex</div>
      <div id="insp-badge-state" class="badge-state">STATE: BARYON</div>
      <div id="insp-badge-meta" class="badge-meta">Coord: (5,5,5) | Reach: 36/36 Nodes</div>
    `;
    this.container.appendChild(this.inspectorBadge);
  }

  // --------------------------------------------------------------------------
  // 5. Null Geodesic Photon Stream
  // --------------------------------------------------------------------------
  initPhotonStream() {
    const pGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    this.photonMesh = new THREE.InstancedMesh(pGeo, pMat, this.maxPhotons);
    this.photonMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.macroGroup.add(this.photonMesh);

    for (let i = 0; i < this.maxPhotons; i++) {
      this.photons.push(this.spawnPhoton());
    }
  }

  spawnPhoton() {
    const half = (this.GRID - 1) * 0.5 * this.SPACING;
    const axis = Math.floor(Math.random() * 3);
    const sign = Math.random() < 0.5 ? -1 : 1;
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * half * 1.8,
      (Math.random() - 0.5) * half * 1.8,
      (Math.random() - 0.5) * half * 1.8
    );
    const vel = new THREE.Vector3();
    if (axis === 0) { pos.x = sign * half * 1.2; vel.x = -sign * 18.0; }
    else if (axis === 1) { pos.y = sign * half * 1.2; vel.y = -sign * 18.0; }
    else { pos.z = sign * half * 1.2; vel.z = -sign * 18.0; }

    return { pos, vel, alive: true, age: 0 };
  }

  updatePhotons(dt) {
    if (!this.showPhotons || this.viewMode === 'inspector') {
      this.photonMesh.count = 0;
      return;
    }

    const dummy = new THREE.Object3D();
    const half = (this.GRID - 1) * 0.5 * this.SPACING;
    let count = 0;

    for (let i = 0; i < this.photons.length; i++) {
      const p = this.photons[i];
      if (!p.alive) {
        this.photons[i] = this.spawnPhoton();
        continue;
      }

      // Gravitational lensing bending near small metric throat d
      for (let x = 0; x < this.GRID; x++) {
        for (let y = 0; y < this.GRID; y++) {
          for (let z = 0; z < this.GRID; z++) {
            const dVal = this.distance[x][y][z];
            if (dVal < 2.0) {
              const center = this.getCellCenter(x, y, z);
              const rVec = new THREE.Vector3().subVectors(center, p.pos);
              const r = rVec.length();

              if (dVal <= 0.50 && r < 1.8) {
                // Trapped by Schwarzschild horizon singularity
                p.alive = false;
                this.photonsTrappedTotal++;
                break;
              } else if (r < 8.0 && r > 0.5) {
                // Geodesic deflection: a = G M / r^2
                const bend = (2.2 - dVal) * 35.0 / (r * r);
                p.vel.addScaledVector(rVec.normalize(), bend * dt);
              }
            }
          }
          if (!p.alive) break;
        }
        if (!p.alive) break;
      }

      p.pos.addScaledVector(p.vel, dt);
      p.age += dt;

      if (p.pos.length() > half * 2.2 || p.age > 8.0) {
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
  // 6. Microscopic CA Physics Update (Native Primality, Kuramoto & Metric Basins)
  // --------------------------------------------------------------------------
  step() {
    if (this.isStill) return;

    const G = this.GRID;
    const params = this.getEffectiveParameters();
    const f = params.f;
    const S = params.S;
    const dt = 0.12;
    const f_norm = f / (1.0 + f / 1e9);

    const nextEnergy = this.createGrid3D(0.0);
    const nextPhase = this.createGrid3D(0.0);
    const nextDistance = this.createGrid3D(4.40);
    const nextReach = this.createGrid3D(0);

    let sumEntropy = 0.0;
    let sumEP = 0.0;
    let netFlux = 0.0;

    // 1. Pure Microscopic Field Evolution across 1,000 Cells
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const e = this.energy[x][y][z];
          const p = this.phase[x][y][z];
          const d = this.distance[x][y][z];

          let nActive = 0;
          let sumENeighbor = 0.0;
          let sumPhaseCoupling = 0.0;
          let metricGradX = 0.0, metricGradY = 0.0, metricGradZ = 0.0;
          let fx = 0.0, fy = 0.0, fz = 0.0;
          let syncCount = 0;

          // 26-neighbor interaction
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;
                const nx = (x + dx + G) % G;
                const ny = (y + dy + G) % G;
                const nz = (z + dz + G) % G;
                const ne = this.energy[nx][ny][nz];
                const np = this.phase[nx][ny][nz];
                const nd = this.distance[nx][ny][nz];

                if (ne > 0.28) {
                  nActive++;
                  sumENeighbor += ne;
                }

                // Gravitational metric attraction: energy flows down throat basins
                const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const gradD = (d - nd) / dist3D;
                metricGradX += gradD * (dx / dist3D);
                metricGradY += gradD * (dy / dist3D);
                metricGradZ += gradD * (dz / dist3D);

                // Phase difference and vector flux exchange (Paper 01 Euler Merge)
                const dPhase = np - p;
                const coupling = Math.sin(dPhase);
                sumPhaseCoupling += coupling;

                if (Math.abs(Math.cos(dPhase)) > 0.85) {
                  syncCount++;
                }

                const fluxMag = ne * 0.03 * coupling;
                fx += fluxMag * dx;
                fy += fluxMag * dy;
                fz += fluxMag * dz;
              }
            }
          }

          // A. Modulo-6 Primality & Stability (Nothing Binds a Twin):
          // In modulo-6 clock space: 2, 3 are primordial seeds, and all primes >= 5 are 6k ± 1
          const isPrime = NEIGHBOR_PRIMES.has(nActive);
          const isTwin = (nActive > 0 && (nActive % 6 === 1 || nActive % 6 === 5));
          const isBoundCore = (nActive >= 18) || (nActive === 4 || nActive === 5 || nActive === 6);
          const isResonant = isPrime || isTwin || isBoundCore;

          // B. Two-State Energy Partitioning (Paper 04 Which Member Carries):
          const delta = -0.5 * Math.tanh((e - 3.5) / 2.0);

          // C. Gravitational Metric Inflow into Throat Basins:
          const gravInflow = 0.06 * Math.max(0.0, (metricGradX * fx + metricGradY * fy + metricGradZ * fz));

          // D. Energy Density Update:
          let eNew = e;
          if (e < 0.28) {
            // Vacuum germination: born when prime resonance seeds the site
            if (isResonant && sumENeighbor > 6.0) {
              eNew = 1.0 + 0.10 * sumENeighbor;
            } else {
              eNew = 0.0;
            }
          } else {
            if (e >= 12.0) {
              // Dense stellar fusion core
              if (isResonant) {
                eNew = e + dt * (0.02 * sumENeighbor + gravInflow - 0.025 * e);
              } else {
                eNew = e * 0.96;
              }
            } else if (isResonant) {
              // Resonant molecular, planetary, and biological zone
              eNew = e + dt * (0.07 * sumENeighbor * (0.5 + delta) + gravInflow - 0.05 * e);
            } else {
              // Non-resonant dissipative damping
              eNew = e * 0.82;
            }
          }

          // E. Metric Throat Contraction & Horizon Singularity (Papers 07 & 11):
          let dNew = d;
          if (d <= 0.50) {
            dNew = 0.50; // Locked at square-root horizon
            eNew = Math.max(16.0, eNew);
            fy += 12.0; // Divert radial accretion into polar relativistic jets
          } else if (eNew > 22.0) {
            // Gravitational Chandrasekhar collapse
            dNew = Math.max(0.50, d - dt * 0.40);
          } else if (eNew > 11.0) {
            // Stellar core compression
            dNew = Math.max(1.15, d - dt * 0.20);
          } else if (eNew > 3.0) {
            // Circumstellar orbital basin
            dNew = Math.max(2.0, d - dt * 0.05);
          } else {
            // Cosmic expansion back to flat spacetime
            dNew = Math.min(4.40, d + dt * 0.15);
          }

          // F. Kuramoto Phase Update (Paper 01):
          const pNew = (p + dt * (f_norm * 0.04 + (S / 6.0) * sumPhaseCoupling)) % (2 * Math.PI);

          // G. Proper Time Flow & Irreversible EP (Theorem 1.1, Paper 02):
          const timeDilation = Math.sqrt(Math.max(0.01, 1.0 - 0.50 / dNew));
          this.properTime[x][y][z] += dt * timeDilation;
          const localEP = (0.008 * S + 0.0015 * Math.abs(sumPhaseCoupling));
          this.entropy[x][y][z] += dt * localEP;
          sumEP += localEP;
          sumEntropy += this.entropy[x][y][z];
          netFlux += Math.sqrt(fx * fx + fy * fy + fz * fz);

          const localCoh = syncCount / 26.0;
          this.coherence[x][y][z] = localCoh;
          const tau = this.properTime[x][y][z];

          // H. Topological Node Reach Evolution (Prompt 5):
          // As proper time, energy, and coherence accumulate, the unit discovers its nodes!
          let newReach = 0;
          if (tau > 1.25 && localCoh > 0.38 && eNew >= 3.0) {
            // Advanced coherent civilization: reaches 18 nodes and slips through horizon into 36 nodes!
            newReach = (tau > 2.5 || dNew <= 1.0) ? 36 : 18;
          } else if (eNew >= 6.0) {
            newReach = 18; // Organic / complex molecular triad (Layers 0, 1, 2)
          } else if (eNew >= 2.5) {
            newReach = 12; // Atomic shells (Layers 0 & 1)
          } else if (eNew >= 1.5) {
            newReach = 6;  // Baryon nucleon (Layer 0 complete)
          } else if (eNew >= 0.8) {
            newReach = 3;  // Hadron triad
          } else if (eNew >= 0.28) {
            newReach = 1;  // Fermion
          }

          nextEnergy[x][y][z] = Math.max(0.0, eNew);
          nextPhase[x][y][z] = pNew;
          nextDistance[x][y][z] = dNew;
          nextReach[x][y][z] = newReach;
          this.fluxX[x][y][z] = fx;
          this.fluxY[x][y][z] = fy;
          this.fluxZ[x][y][z] = fz;
        }
      }
    }

    this.energy = nextEnergy;
    this.phase = nextPhase;
    this.distance = nextDistance;
    this.nodeReach = nextReach;

    // 2. Emergent State Classification from Physical Fields
    const cMap = {
      vacuum: 0, fermions: 0, hadrons: 0, baryons: 0, hydrogen: 0, helium: 0,
      organic: 0, stars: 0, planets: 0, biospheres: 0, civilizations: 0,
      pulsars: 0, supernovae: 0, whiteHoles: 0, blackHoles: 0, totalUnits: 0
    };

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.classifyState(x, y, z);
          this.state[x][y][z] = st;

          if (st === STATE_VACUUM) cMap.vacuum++;
          else {
            cMap.totalUnits++;
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
        }
      }
    }

    this.counts = cMap;
    this.generation++;
    this.cosmicTime += 0.85;
    this.totalEntropy = sumEntropy;
    this.totalEPRate = sumEP;
    this.energyFlux = netFlux;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 7. Dynamic Classification Evaluator (Purely Emergent from Field State)
  // --------------------------------------------------------------------------
  classifyState(x, y, z) {
    const e = this.energy[x][y][z];
    const d = this.distance[x][y][z];
    const tau = this.properTime[x][y][z];
    const coh = this.coherence[x][y][z];
    const reach = this.nodeReach[x][y][z];

    if (e < 0.28) return STATE_VACUUM;
    if (d <= 0.50) return STATE_BLACK_HOLE;
    if (e > 24.0) return STATE_SUPERNOVA;
    if (d <= 1.00 && e > 12.0) return STATE_PULSAR;
    if (e > 11.0 && d <= 1.80) return STATE_STAR;

    // Check neighbors for environmental context
    const G = this.GRID;
    let hasStarNeighbor = false;
    let hasOrganicNeighbor = false;
    let hasBHNeighbor = false;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue;
          const nx = (x + dx + G) % G;
          const ny = (y + dy + G) % G;
          const nz = (z + dz + G) % G;
          const ne = this.energy[nx][ny][nz];
          const nd = this.distance[nx][ny][nz];

          if (nd <= 0.50) hasBHNeighbor = true;
          if (ne > 11.0 && nd <= 1.80) hasStarNeighbor = true;
          if (ne >= 6.0 && ne < 11.0) hasOrganicNeighbor = true;
        }
      }
    }

    // White Hole: topological ejection opposite a black hole
    if (hasBHNeighbor && e > 14.0 && d > 2.0) return STATE_WHITE_HOLE;

    // Advancing Civilization: Living biosphere that achieves deep proper time, phase coherence, and node reach:
    if (hasStarNeighbor && hasOrganicNeighbor && tau > 1.25 && coh > 0.38 && e >= 3.0 && e <= 7.0) {
      return STATE_CIVILIZATION;
    }
    // Living Biosphere: goldilocks zone near star and organic elements
    if (hasStarNeighbor && hasOrganicNeighbor && e >= 3.0 && e <= 7.0) {
      return STATE_BIOSPHERE;
    }
    // Planetary System: orbiting within stellar gravitation basin
    if (hasStarNeighbor && e >= 1.8 && e < 7.0) {
      return STATE_PLANETARY_SYSTEM;
    }

    // Elementary and chemical particle levels:
    if (e >= 6.0) return STATE_ORGANIC_ELEMENT;
    if (e >= 4.0) return STATE_HELIUM;
    if (e >= 2.5) return STATE_HYDROGEN;
    if (e >= 1.5) return STATE_BARYON;
    if (e >= 0.8) return STATE_HADRON;
    return STATE_FERMION;
  }

  // --------------------------------------------------------------------------
  // 8. Update Macro 3D Visuals & Instancing
  // --------------------------------------------------------------------------
  updateVisuals(elapsed) {
    if (this.viewMode === 'inspector') {
      this.updateInspectorView(elapsed);
      return;
    }

    const G = this.GRID;
    const t = elapsed;
    const params = this.getEffectiveParameters();

    let nodeIdx = 0;
    let orbitIdx = 0;
    let starIdx = 0;
    let dysonIdx = 0;
    let bondVertIdx = 0;
    let diskIdx = 0;
    let jetIdx = 0;

    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();
    const bondPos = this.macroBondPositions;
    const bondCol = this.macroBondColors;

    const civPositions = [];

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.state[x][y][z];
          if (st === STATE_VACUUM) continue;

          const center = this.getCellCenter(x, y, z);
          const curD = this.distance[x][y][z];
          const reach = this.nodeReach[x][y][z];
          const localPhase = this.phase[x][y][z] + t * (params.f * 0.015 + 1.0);

          if (st === STATE_CIVILIZATION) {
            civPositions.push(center);
          }

          // A. Render 36 Nodes across 6 Layers
          const baseRadius = (st === STATE_BLACK_HOLE || st === STATE_PULSAR) ? 0.90 : 1.70;
          const unitHeight = Math.min(2.6, curD * 0.52);
          const unitNodeVecs = [];

          for (let l = 0; l < 6; l++) {
            const layerZ = (l - 2.5) * (unitHeight / 5.0);
            const waistFactor = (l - 2.5) / 2.5;
            const layerRadius = baseRadius * (1.0 + 0.30 * waistFactor * waistFactor);
            const layerOffset = (l % 2 === 0) ? (params.phi * 0.15) : (-params.phi * 0.15);

            for (let k = 0; k < 6; k++) {
              const nodeGlobalIdx = l * 6 + k;
              const angle = k * (Math.PI / 3.0) + layerOffset + localPhase * 0.25;
              const nx = center.x + Math.cos(angle) * layerRadius;
              const ny = center.y + Math.sin(angle) * layerRadius;
              const nz = center.z + layerZ;

              unitNodeVecs.push(new THREE.Vector3(nx, ny, nz));

              if (nodeIdx < 36000) {
                dummy.position.set(nx, ny, nz);
                
                // Active node illumination based on nodeReach:
                const isNodeActive = (nodeGlobalIdx < reach) || (reach === 36);
                let scaleVal = isNodeActive ? 0.90 : 0.35;
                if (st === STATE_STAR || st === STATE_CIVILIZATION || st === STATE_PULSAR) {
                  scaleVal = isNodeActive ? 1.15 : 0.40;
                } else if (st === STATE_BIOSPHERE || st === STATE_ORGANIC_ELEMENT) {
                  scaleVal = isNodeActive ? 1.00 : 0.35;
                }

                dummy.scale.setScalar(scaleVal);
                dummy.updateMatrix();
                this.instancedNodes.setMatrixAt(nodeIdx, dummy.matrix);

                // Cosmic State Color Palette
                if (!isNodeActive) {
                  colorDummy.setHex(0x334155); // Faint translucent quantum foam
                } else if (st === STATE_FERMION) {
                  colorDummy.setHex(k % 2 === 0 ? 0x38bdf8 : 0xa855f7);
                } else if (st === STATE_HADRON) {
                  colorDummy.setHex(0xd946ef);
                } else if (st === STATE_BARYON) {
                  colorDummy.setHex(0xf59e0b);
                } else if (st === STATE_HYDROGEN) {
                  colorDummy.setHex(0x38bdf8);
                } else if (st === STATE_HELIUM) {
                  colorDummy.setHex(0x10b981);
                } else if (st === STATE_ORGANIC_ELEMENT) {
                  colorDummy.setHex((l === 2 || l === 3) ? 0x22c55e : 0xf8fafc);
                } else if (st === STATE_STAR) {
                  colorDummy.setHex(0xfef08a);
                } else if (st === STATE_PLANETARY_SYSTEM) {
                  colorDummy.setHex(0x0284c7);
                } else if (st === STATE_BIOSPHERE) {
                  colorDummy.setHex(0x10b981);
                } else if (st === STATE_CIVILIZATION) {
                  colorDummy.setHex(0xfacc15); // Luminous Gold Civilization
                } else if (st === STATE_PULSAR) {
                  colorDummy.setHex(0x06b6d4); // Cyan Pulsar
                } else if (st === STATE_SUPERNOVA) {
                  colorDummy.setHex(0xffedd5);
                } else if (st === STATE_WHITE_HOLE) {
                  colorDummy.setHex(0xffffff); // Brilliant White Hole
                } else if (st === STATE_BLACK_HOLE) {
                  colorDummy.setHex(0xef4444);
                }

                this.instancedNodes.setColorAt(nodeIdx, colorDummy);
                nodeIdx++;
              }
            }
          }

          // B. Internal Chords & Layer Rings of the 36-Node Unit
          if (bondVertIdx < 78000) {
            let bR = 0.22, bG = 0.74, bB = 0.97;
            if (st === STATE_CIVILIZATION) { bR = 0.98; bG = 0.80; bB = 0.08; }
            else if (st === STATE_BIOSPHERE) { bR = 0.06; bG = 0.72; bB = 0.50; }
            else if (st === STATE_STAR) { bR = 0.99; bG = 0.94; bB = 0.54; }
            else if (st === STATE_ORGANIC_ELEMENT) { bR = 0.13; bG = 0.77; bB = 0.36; }
            else if (st === STATE_BARYON) { bR = 0.96; bG = 0.62; bB = 0.04; }

            for (let l = 0; l < 6; l++) {
              const startIdx = l * 6;
              for (let k = 0; k < 6; k++) {
                const p1 = unitNodeVecs[startIdx + k];
                const p2 = unitNodeVecs[startIdx + ((k + 1) % 6)];

                bondPos[bondVertIdx * 3]     = p1.x;
                bondPos[bondVertIdx * 3 + 1] = p1.y;
                bondPos[bondVertIdx * 3 + 2] = p1.z;
                bondPos[(bondVertIdx + 1) * 3]     = p2.x;
                bondPos[(bondVertIdx + 1) * 3 + 1] = p2.y;
                bondPos[(bondVertIdx + 1) * 3 + 2] = p2.z;

                bondCol[bondVertIdx * 3]     = bR; bondCol[bondVertIdx * 3 + 1] = bG; bondCol[bondVertIdx * 3 + 2] = bB;
                bondCol[(bondVertIdx + 1) * 3] = bR; bondCol[(bondVertIdx + 1) * 3 + 1] = bG; bondCol[(bondVertIdx + 1) * 3 + 2] = bB;
                bondVertIdx += 2;
              }
            }

            for (let l = 0; l < 5; l++) {
              const s1 = l * 6;
              const s2 = (l + 1) * 6;
              for (let k = 0; k < 6; k += 2) {
                const p1 = unitNodeVecs[s1 + k];
                const p2 = unitNodeVecs[s2 + ((k + 1) % 6)];

                bondPos[bondVertIdx * 3]     = p1.x;
                bondPos[bondVertIdx * 3 + 1] = p1.y;
                bondPos[bondVertIdx * 3 + 2] = p1.z;
                bondPos[(bondVertIdx + 1) * 3]     = p2.x;
                bondPos[(bondVertIdx + 1) * 3 + 1] = p2.y;
                bondPos[(bondVertIdx + 1) * 3 + 2] = p2.z;

                bondCol[bondVertIdx * 3]     = bR * 0.65; bondCol[bondVertIdx * 3 + 1] = bG * 0.65; bondCol[bondVertIdx * 3 + 2] = bB * 0.65;
                bondCol[(bondVertIdx + 1) * 3] = bR * 0.65; bondCol[(bondVertIdx + 1) * 3 + 1] = bG * 0.65; bondCol[(bondVertIdx + 1) * 3 + 2] = bB * 0.65;
                bondVertIdx += 2;
              }
            }
          }

          // C. Specialized Geometry Attachments:
          if (st === STATE_HYDROGEN || st === STATE_HELIUM || st === STATE_PLANETARY_SYSTEM || st === STATE_BIOSPHERE) {
            dummy.position.copy(center);
            const breathe = 1.0 + Math.sin(localPhase * 2.0) * 0.06;
            let orbScale = 1.5;
            if (st === STATE_HELIUM) orbScale = 1.9;
            else if (st === STATE_PLANETARY_SYSTEM) orbScale = 2.2;
            else if (st === STATE_BIOSPHERE) orbScale = 2.0;
            dummy.scale.setScalar(orbScale * breathe);
            dummy.rotation.set(t * 0.35, t * 0.25, 0);
            dummy.updateMatrix();
            this.instancedOrbits.setMatrixAt(orbitIdx, dummy.matrix);
            orbitIdx++;
          }

          if (st === STATE_STAR && starIdx < 120) {
            dummy.position.copy(center);
            dummy.scale.setScalar(1.65 + Math.sin(localPhase * 2.5) * 0.08);
            dummy.rotation.set(0, t * 0.4, 0);
            dummy.updateMatrix();
            this.instancedStars.setMatrixAt(starIdx, dummy.matrix);
            starIdx++;
          }

          if (st === STATE_CIVILIZATION && dysonIdx < 64) {
            dummy.position.copy(center);
            dummy.scale.setScalar(1.15);
            dummy.rotation.set(Math.PI / 3.2, t * 0.7, 0);
            dummy.updateMatrix();
            this.instancedDysonRings.setMatrixAt(dysonIdx, dummy.matrix);
            dysonIdx++;
          }

          if ((st === STATE_BLACK_HOLE || st === STATE_PULSAR) && diskIdx < 32) {
            dummy.position.copy(center);
            dummy.rotation.set(Math.PI * 0.35, t * 3.0, 0);
            dummy.scale.set(1.35, 1.35, 1.35);
            dummy.updateMatrix();
            this.instancedDisks.setMatrixAt(diskIdx, dummy.matrix);
            diskIdx++;

            if (jetIdx < 60) {
              dummy.position.copy(center);
              dummy.position.y += 3.0;
              dummy.rotation.set(0, t * 2.0, 0);
              dummy.scale.set(0.9, 0.9, 0.9);
              dummy.updateMatrix();
              this.instancedJets.setMatrixAt(jetIdx, dummy.matrix);
              jetIdx++;

              dummy.position.copy(center);
              dummy.position.y -= 3.0;
              dummy.rotation.set(Math.PI, t * 2.0, 0);
              dummy.scale.set(0.9, 0.9, 0.9);
              dummy.updateMatrix();
              this.instancedJets.setMatrixAt(jetIdx, dummy.matrix);
              jetIdx++;
            }
          }
        }
      }
    }

    // D. Interstellar Communication Gamma-Wave Laser Beams between Civilizations (k-NN Constellation Web)
    if (civPositions.length >= 2 && bondVertIdx < 78000) {
      const connectedPairs = new Set();
      for (let i = 0; i < civPositions.length; i++) {
        const pA = civPositions[i];
        const neighbors = [];
        for (let j = 0; j < civPositions.length; j++) {
          if (i === j) continue;
          const pB = civPositions[j];
          const dist = pA.distanceTo(pB);
          if (dist < 28.0) {
            neighbors.push({ j, dist, pB });
          }
        }
        neighbors.sort((a, b) => a.dist - b.dist);
        const kMax = Math.min(2, neighbors.length);
        for (let k = 0; k < kMax; k++) {
          const nb = neighbors[k];
          const pairKey = i < nb.j ? `${i}-${nb.j}` : `${nb.j}-${i}`;
          if (connectedPairs.has(pairKey)) continue;
          connectedPairs.add(pairKey);

          const beamPulse = (Math.sin(t * 4.0 + nb.dist * 0.4) + 1.0) * 0.5;
          bondPos[bondVertIdx * 3]     = pA.x;
          bondPos[bondVertIdx * 3 + 1] = pA.y;
          bondPos[bondVertIdx * 3 + 2] = pA.z;
          bondPos[(bondVertIdx + 1) * 3]     = nb.pB.x;
          bondPos[(bondVertIdx + 1) * 3 + 1] = nb.pB.y;
          bondPos[(bondVertIdx + 1) * 3 + 2] = nb.pB.z;

          // Radiant golden-cyan constellation laser beam
          bondCol[bondVertIdx * 3]     = 0.98;
          bondCol[bondVertIdx * 3 + 1] = 0.82 * beamPulse;
          bondCol[bondVertIdx * 3 + 2] = 0.20;
          bondCol[(bondVertIdx + 1) * 3]     = 0.20;
          bondCol[(bondVertIdx + 1) * 3 + 1] = 0.85 * beamPulse;
          bondCol[(bondVertIdx + 1) * 3 + 2] = 0.98;

          bondVertIdx += 2;
          if (bondVertIdx >= 78000) break;
        }
        if (bondVertIdx >= 78000) break;
      }
    }

    // Update Counts and Buffers
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

    this.macroBondsMesh.geometry.setDrawRange(0, bondVertIdx);
    this.macroBondsMesh.geometry.attributes.position.needsUpdate = true;
    this.macroBondsMesh.geometry.attributes.color.needsUpdate = true;
  }

  // --------------------------------------------------------------------------
  // 9. Update Hero Inspector 36-Node Visuals
  // --------------------------------------------------------------------------
  updateInspectorView(elapsed) {
    const fx = this.focusCoord.x;
    const fy = this.focusCoord.y;
    const fz = this.focusCoord.z;
    const curD = this.distance[fx][fy][fz];
    const reach = this.nodeReach[fx][fy][fz];
    const st = this.state[fx][fy][fz];
    const params = this.getEffectiveParameters();
    const t = elapsed;
    const localPhase = t * (params.f * 0.02 + 1.2);

    const throatScale = Math.max(0.40, curD / 2.2);
    this.inspectorThroat.scale.set(throatScale, throatScale, 1.0);
    this.inspectorThroat.rotation.z = t * 0.5;

    const height = Math.min(6.0, curD * 1.30);
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
          const breathe = (isNodeActive ? 1.0 : 0.45) + Math.sin(localPhase * 2.0 + l) * 0.08;
          nodeMesh.scale.setScalar(breathe);

          // Color based on active status and layer
          if (!isNodeActive) {
            nodeMesh.material.color.setHex(0x334155);
            nodeMesh.material.emissive.setHex(0x0f172a);
          } else if (l < 3) {
            // Lower 18 nodes: Forward Universe (cyan-green)
            nodeMesh.material.color.setHex(0x38bdf8);
            nodeMesh.material.emissive.setHex(0x0284c7);
          } else {
            // Upper 18 nodes: Conjugate Anti-Universe beyond horizon (amber-purple)
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
      const reachText = reach === 36 ? '36/36 Nodes (Omniversal Horizon Slip)' : (reach >= 18 ? '18/36 Nodes (Event Horizon Sector)' : `${reach}/36 Nodes (Forward Sector)`);
      if (elState) elState.innerText = `STATE: ${stateNames[st] || 'UNKNOWN'}`;
      if (elMeta) {
        elMeta.innerHTML = `Coord: (${fx},${fy},${fz}) &bull; Reach: <strong>${reachText}</strong><br>Metric <em>d</em>: ${curD.toFixed(2)} &bull; Energy &rho;: ${this.energy[fx][fy][fz].toFixed(2)}<br>Proper Time &tau;: ${this.properTime[fx][fy][fz].toFixed(2)} Myr &bull; Coherence &gamma;: ${(this.coherence[fx][fy][fz] * 100).toFixed(1)}%`;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 10. Primordial Seeds & UI Controls (Pure Physical Initial Configurations)
  // --------------------------------------------------------------------------
  loadPreset(presetKey) {
    const G = this.GRID;

    // Reset ALL continuous fields to zero (NO hardcoding of proper time or future states!)
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          this.energy[x][y][z] = 0.0;
          this.phase[x][y][z] = 0.0;
          this.distance[x][y][z] = 4.40;
          this.properTime[x][y][z] = 0.0;
          this.entropy[x][y][z] = 0.0;
          this.coherence[x][y][z] = 0.0;
          this.nodeReach[x][y][z] = 0;
          this.fluxX[x][y][z] = 0.0;
          this.fluxY[x][y][z] = 0.0;
          this.fluxZ[x][y][z] = 0.0;
          this.state[x][y][z] = STATE_VACUUM;
        }
      }
    }

    const center = Math.floor(G / 2);

    if (presetKey === 'genesis') {
      // Primordial Cosmic Egg: Dense central cluster with random phases and contracted metric
      for (let x = center - 2; x <= center + 2; x++) {
        for (let y = center - 2; y <= center + 2; y++) {
          for (let z = center - 2; z <= center + 2; z++) {
            const dist = Math.sqrt((x - center)**2 + (y - center)**2 + (z - center)**2);
            if (dist <= 2.2) {
              this.energy[x][y][z] = 3.0 + Math.random() * 14.0;
              this.phase[x][y][z] = Math.random() * Math.PI * 2.0;
              this.distance[x][y][z] = 1.60 + Math.random() * 1.5;
            }
          }
        }
      }
    } else if (presetKey === 'nucleosynthesis') {
      // Hot Primordial Plasma with Prime-Harmonic Spatial Ripples
      for (let x = 1; x < G - 1; x++) {
        for (let y = 1; y < G - 1; y++) {
          for (let z = 1; z < G - 1; z++) {
            if ((x + y + z) % 6 === 1 || (x + y + z) % 6 === 5 || Math.random() < 0.20) {
              this.energy[x][y][z] = 3.5 + Math.random() * 5.5;
              this.phase[x][y][z] = Math.random() * Math.PI * 2.0;
              this.distance[x][y][z] = 2.40;
            }
          }
        }
      }
    } else if (presetKey === 'stellar_nursery') {
      // 3 Dense Gravitational Gas Clouds
      const centers = [
        [center, center, center],
        [center - 3, center + 1, center],
        [center + 3, center - 1, center]
      ];
      centers.forEach(([sx, sy, sz]) => {
        this.energy[sx][sy][sz] = 16.5;
        this.distance[sx][sy][sz] = 1.30;
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              if (dx === 0 && dy === 0 && dz === 0) continue;
              const px = (sx + dx + G) % G;
              const py = (sy + dy + G) % G;
              const pz = (sz + dz + G) % G;
              this.energy[px][py][pz] = 3.5 + Math.random() * 3.5;
              this.distance[px][py][pz] = 2.40;
            }
          }
        }
      });
    } else if (presetKey === 'planetary_emergence') {
      // Central Stellar Furnace surrounded by Circumstellar Protoplanetary Disk
      this.energy[center][center][center] = 17.0;
      this.distance[center][center][center] = 1.25;

      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -3; dz <= 3; dz++) {
          const r = Math.sqrt(dx * dx + dz * dz);
          if (r >= 1.5 && r <= 3.2) {
            const px = (center + dx + G) % G;
            const pz = (center + dz + G) % G;
            this.energy[px][center][pz] = 4.0 + Math.random() * 3.5;
            this.distance[px][center][pz] = 2.40;
            this.phase[px][center][pz] = Math.atan2(dz, dx);
          }
        }
      }
    } else if (presetKey === 'organic_civilization') {
      // Star System with Circumsolar Habitable Gas Rings
      this.energy[center][center][center] = 16.5;
      this.distance[center][center][center] = 1.30;

      const planetOffsets = [
        [-2, 0, 0], [2, 0, 0], [0, -2, 0], [0, 2, 0], [0, 0, -2], [0, 0, 2]
      ];
      planetOffsets.forEach(([dx, dy, dz]) => {
        const px = (center + dx + G) % G;
        const py = (center + dy + G) % G;
        const pz = (center + dz + G) % G;
        this.energy[px][py][pz] = 6.5;
        this.distance[px][py][pz] = 2.30;
        this.phase[px][py][pz] = Math.random() * 0.5;
      });
    } else if (presetKey === 'supernova') {
      // Runaway Central Overpressure Core
      this.energy[center][center][center] = 28.0;
      this.distance[center][center][center] = 0.55;

      for (let x = center - 2; x <= center + 2; x++) {
        for (let y = center - 2; y <= center + 2; y++) {
          for (let z = center - 2; z <= center + 2; z++) {
            if (x === center && y === center && z === center) continue;
            if (Math.random() < 0.35) {
              this.energy[x][y][z] = 3.5;
              this.distance[x][y][z] = 2.60;
            }
          }
        }
      }
    } else if (presetKey === 'blackhole') {
      // Square-Root Horizon Singularity at d = 0.50 with Accretion Ring
      this.energy[center][center][center] = 22.0;
      this.distance[center][center][center] = 0.50;

      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -3; dz <= 3; dz++) {
          const r = Math.sqrt(dx * dx + dz * dz);
          if (r >= 1.2 && r <= 3.0) {
            const px = (center + dx + G) % G;
            const pz = (center + dz + G) % G;
            this.energy[px][center][pz] = 3.5;
            this.distance[px][center][pz] = 1.90;
            this.phase[px][center][pz] = Math.atan2(dz, dx);
          }
        }
      }
    } else if (presetKey === 'cosmic_web') {
      // Large-Scale Cosmic Web Filaments
      for (let i = 0; i < G; i++) {
        this.energy[i][i][center] = (i % 3 === 0) ? 14.0 : 4.5;
        this.distance[i][i][center] = 2.10;

        const inv = G - 1 - i;
        this.energy[i][center][inv] = (i % 3 === 0) ? 14.0 : 4.5;
        this.distance[i][center][inv] = 2.10;
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

  initUI() {
    // Preset Buttons
    const pBtns = document.querySelectorAll('[data-cosmos-preset]');
    pBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pKey = btn.getAttribute('data-cosmos-preset');
        pBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.loadPreset(pKey);
      });
    });

    // Control Buttons in index.html
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
        const G = this.GRID;
        for (let x = 0; x < G; x++) {
          for (let y = 0; y < G; y++) {
            for (let z = 0; z < G; z++) {
              this.energy[x][y][z] = 0.0;
              this.distance[x][y][z] = 4.40;
              this.properTime[x][y][z] = 0.0;
              this.entropy[x][y][z] = 0.0;
              this.nodeReach[x][y][z] = 0;
              this.state[x][y][z] = STATE_VACUUM;
            }
          }
        }
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
        this.inspectorGroup.visible = (this.viewMode === 'inspector');
        if (this.inspectorBadge) {
          this.inspectorBadge.style.display = (this.viewMode === 'inspector') ? 'block' : 'none';
        }
        if (this.viewMode === 'inspector') {
          // If current focus cell is vacuum, find the highest energy cell to inspect
          const curE = this.energy[this.focusCoord.x][this.focusCoord.y][this.focusCoord.z];
          if (curE < 0.28) {
            let bestE = -1;
            let bestC = { x: 5, y: 5, z: 5 };
            const G = this.GRID;
            for (let x = 0; x < G; x++) {
              for (let y = 0; y < G; y++) {
                for (let z = 0; z < G; z++) {
                  if (this.energy[x][y][z] > bestE) {
                    bestE = this.energy[x][y][z];
                    bestC = { x, y, z };
                  }
                }
              }
            }
            this.focusCoord = bestC;
          }
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
        // High-frequency gamma burst: triggers rapid time emergence and irreversible entropy expansion
        const G = this.GRID;
        for (let x = 2; x < G - 2; x++) {
          for (let y = 2; y < G - 2; y++) {
            for (let z = 2; z < G - 2; z++) {
              if (this.energy[x][y][z] > 0.28) {
                this.energy[x][y][z] += 3.5;
                this.phase[x][y][z] = (this.phase[x][y][z] + Math.PI * 0.5) % (2 * Math.PI);
              }
            }
          }
        }
        this.step();
      });
    }

    const speedSlider = document.getElementById('cosmos-speed-slider');
    const speedBadge = document.getElementById('cosmos-speed-badge');
    if (speedSlider) {
      speedSlider.addEventListener('input', () => {
        this.genSpeed = parseFloat(speedSlider.value) || 3.0;
        this.stepInterval = 1000 / this.genSpeed;
        if (speedBadge) speedBadge.innerText = `${this.genSpeed.toFixed(1)} gen/s`;
      });
    }

    // Click to Inspect Cell in Canvas
    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects([this.instancedNodes], false);
      if (intersects.length > 0) {
        const instanceId = intersects[0].instanceId;
        const cellIdx = Math.floor(instanceId / 36);
        const G = this.GRID;
        const cz = cellIdx % G;
        const cy = Math.floor(cellIdx / G) % G;
        const cx = Math.floor(cellIdx / (G * G));

        if (cx >= 0 && cx < G && cy >= 0 && cy < G && cz >= 0 && cz < G) {
          this.focusCoord = { x: cx, y: cy, z: cz };
          if (this.viewMode === 'inspector') {
            this.updateInspectorView(this.clock.getElapsedTime());
          }
        }
      }
    });
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
    setT('cosmos-telemetry-flux', `∇•J = ${this.energyFlux.toFixed(2)}`);
    setT('cosmos-telemetry-photons', `${this.photonsTrappedTotal} Rays Pulled`);

    const elBadge = document.getElementById('cosmos-state-badge');
    if (elBadge) {
      if (c.civilizations > 0) {
        elBadge.innerText = 'KARDASHEV II DYSON NETWORK';
        elBadge.className = 'telemetry-badge badge-civ';
      } else if (c.stars > 0) {
        elBadge.innerText = 'STELLAR EQUILIBRIUM';
        elBadge.className = 'telemetry-badge badge-star';
      } else if (c.blackHoles > 0) {
        elBadge.innerText = 'SCHWARZSCHILD HORIZON';
        elBadge.className = 'telemetry-badge badge-blackhole';
      } else {
        elBadge.innerText = 'PRIMORDIAL EMERGENCE';
        elBadge.className = 'telemetry-badge badge-triad';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 11. Main Animation & Render Loop
  // --------------------------------------------------------------------------
  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    const now = performance.now();
    const elapsed = this.clock.getElapsedTime();
    const delta = Math.min(0.08, this.clock.getDelta());

    if (this.isPlaying && (now - this.lastStepTime) >= this.stepInterval) {
      this.step();
      this.lastStepTime = now;
    }

    this.updateVisuals(elapsed);
    this.updatePhotons(delta);

    if (this.controls) this.controls.update();

    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

// Auto-initialize when container is ready
if (typeof window !== 'undefined') {
  window.GameOfCosmos = GameOfCosmos;
  const initCosmos = () => {
    const el = document.getElementById('cosmos-canvas-container');
    if (el && !window.cosmosInstance) {
      new GameOfCosmos('cosmos-canvas-container');
    }
  };
  initCosmos();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCosmos);
  } else {
    setTimeout(initCosmos, 40);
  }
}
