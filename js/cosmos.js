/**
 * THE GAME OF COSMOS: 3D 36-NODE SIMPLICIAL UNITS & COSMIC EMERGENCE ENGINE
 * Authentically derived from Papers 01-12 (Abhijit Singh, 2026)
 * 
 * - Fundamental building block: 36-Node Simplicial Spacetime Unit (6 layers x 6 nodes = 36 nodes, C3 ⋊ Z2 dihedral symmetry)
 * - Frequency (f), Entropy (S), and Chiral Phase Twist (phi) drive node resonance and inter-unit combinations
 * - Cosmic Emergence Hierarchy:
 *     Vacuum -> Subatomic (Fermions, Hadrons, Baryons) -> Primordial Elements (^1H, ^4He) ->
 *     Organic Elements (^12C, ^16O, ^56Fe) -> Stars -> Planetary Systems -> Living Biospheres ->
 *     Advancing Civilizations (Kardashev I/II, Dyson Swarms, Interstellar Lasers) ->
 *     Type II Supernovae & Schwarzschild Black Holes (d <= 0.50 Square-Root Horizon)
 * - Theorem 1.1 Time Emergence: Timeless ground state (tau=0) -> Irreversible Entropy EP = D(J||J^T) > 0 -> Proper Time tau
 * - 60 FPS WebGL: Instanced rendering for 36,000 nodes, orbital clouds, stellar coronae & laser communication networks
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Particle, Chemical, Astrophysical & Civilizational States
export const STATE_VACUUM = 0;              // Ground state 36-node quantum foam (tau=0, d=4.40)
export const STATE_FERMION = 1;             // Subatomic chiral half-spin excitation (asymmetric triad current)
export const STATE_HADRON = 2;              // Meson: bound quark-antiquark pair with gluon flux
export const STATE_BARYON = 3;              // Baryon nucleon: proton/neutron locked in C3 triad balance (Paper 08)
export const STATE_HYDROGEN = 4;            // ^1H atom: 36-node baryon nucleus + 1s electron cloud (Paper 04)
export const STATE_HELIUM = 5;              // ^4He alpha atom: dual-triad closed nuclear fusion shell + 2s halos
export const STATE_ORGANIC_ELEMENT = 6;     // ^12C, ^14N, ^16O, ^56Fe: covalent bonding cages
export const STATE_STAR = 7;                // Main Sequence Star: nuclear furnace, corona & solar flares
export const STATE_PLANETARY_SYSTEM = 8;    // Star with orbiting terrestrial & habitable goldilocks planets
export const STATE_BIOSPHERE = 9;           // Organic Life: self-replicating chiral biopolymer/DNA webs
export const STATE_CIVILIZATION = 10;       // Advancing Kardashev I/II Civilization: Dyson swarms & laser beams
export const STATE_SUPERNOVA = 11;          // Type II Supernova: expanding Sedov blast wave nucleosynthesis
export const STATE_BLACK_HOLE = 12;         // Schwarzschild Singularity (d <= 0.50), accretion disk & polar jets

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

    // Continuous Field & Cellular State Tensors (10x10x10)
    this.state = this.createGrid3D(STATE_VACUUM);
    this.nextState = this.createGrid3D(STATE_VACUUM);
    this.distance = this.createGrid3D(4.40);       // Inter-layer metric d in [0.50, 4.40]
    this.energy = this.createGrid3D(0.0);          // Energy density rho
    this.properTime = this.createGrid3D(0.0);      // Local proper time tau
    this.entropy = this.createGrid3D(0.0);         // Irreversible entropy S_irr
    this.phase = this.createGrid3D(0.0);           // Node phase angle
    this.age = this.createGrid3D(0);               // Generations in current state
    this.blastRadius = this.createGrid3D(0.0);     // Supernova shockwave radius

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
      supernovae: 0,
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
    const G = this.GRID;
    const S = this.SPACING;
    const offset = ((G - 1) * S) * 0.5;
    return new THREE.Vector3(x * S - offset, y * S - offset, z * S - offset);
  }

  // --------------------------------------------------------------------------
  // 1. Three.js Scene, Lighting & Bloom Pipeline (Balanced Exposure)
  // --------------------------------------------------------------------------
  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020409);
    this.scene.fog = new THREE.FogExp2(0x020409, 0.0035);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
    this.camera.position.set(48.0, 40.0, 62.0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.maxDistance = 320;
    this.controls.minDistance = 3.0;

    // UnrealBloomPass Post-Processing (Calibrated to prevent blowout)
    try {
      this.composer = new EffectComposer(this.renderer);
      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);
      this.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        1.15, // strength
        0.42, // radius
        0.24  // threshold
      );
      this.composer.addPass(this.bloomPass);
    } catch (err) {
      console.warn('[GameOfCosmos] Post-processing fallback to standard WebGL', err);
      this.composer = null;
    }

    // Space Lighting (Triad Color Spectrum)
    this.scene.add(new THREE.AmbientLight(0x0a1226, 2.2));
    const pl1 = new THREE.PointLight(0x38bdf8, 2.4, 240);
    pl1.position.set(60, 70, 60);
    this.scene.add(pl1);

    const pl2 = new THREE.PointLight(0xa855f7, 2.2, 240);
    pl2.position.set(-60, -60, -60);
    this.scene.add(pl2);

    const pl3 = new THREE.PointLight(0xf59e0b, 1.8, 180);
    pl3.position.set(0, 40, 0);
    this.scene.add(pl3);

    this.macroGroup = new THREE.Group();
    this.scene.add(this.macroGroup);

    this.inspectorGroup = new THREE.Group();
    this.inspectorGroup.visible = false;
    this.scene.add(this.inspectorGroup);

    this.initDeepStarfield();

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth || 800;
    const h = this.container.clientHeight || 600;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    if (this.composer) {
      this.composer.setSize(w, h);
    }
  }

  initDeepStarfield() {
    const starCount = 2000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 180 + Math.random() * 220;

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const tint = Math.random();
      if (tint < 0.35) {
        col[i * 3] = 0.50; col[i * 3 + 1] = 0.75; col[i * 3 + 2] = 1.0;
      } else if (tint < 0.70) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 0.60;
      } else {
        col[i * 3] = 0.90; col[i * 3 + 1] = 0.60; col[i * 3 + 2] = 0.95;
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.30,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    this.scene.add(new THREE.Points(geo, mat));
  }

  initScaffold() {
    this.scaffoldGroup = new THREE.Group();
    const G = this.GRID;
    const S = this.SPACING;
    const extent = (G - 1) * S;

    const boxGeo = new THREE.BoxGeometry(extent, extent, extent);
    const edges = new THREE.EdgesGeometry(boxGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.40
    });
    const boundingBox = new THREE.LineSegments(edges, lineMat);
    this.scaffoldGroup.add(boundingBox);

    this.scaffoldGroup.visible = this.showScaffold;
    this.scene.add(this.scaffoldGroup);
  }

  // --------------------------------------------------------------------------
  // 2. High-Performance Macro Instanced WebGL Systems (36 Nodes per Unit)
  // --------------------------------------------------------------------------
  initMacroInstancing() {
    const maxUnits = this.GRID * this.GRID * this.GRID; // 1,000 units
    const maxActiveNodes = 36000; // 36 nodes per unit for up to 1,000 active units

    // A. 36 Nodes per active unit (Authentic 36-Node Simplicial Complex: 6 layers x 6 nodes)
    const nodeGeo = new THREE.SphereGeometry(0.24, 8, 6);
    const nodeMat = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.80,
      emissive: 0x000000,
      emissiveIntensity: 0.75
    });
    this.instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, maxActiveNodes);
    this.instancedNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedNodes.count = 0;
    this.macroGroup.add(this.instancedNodes);

    // B. Internal Chords & Inter-Unit Resonance Bonds
    const maxBonds = 35000;
    const bondGeo = new THREE.BufferGeometry();
    this.macroBondPositions = new Float32Array(maxBonds * 2 * 3);
    this.macroBondColors = new Float32Array(maxBonds * 2 * 3);
    bondGeo.setAttribute('position', new THREE.BufferAttribute(this.macroBondPositions, 3));
    bondGeo.setAttribute('color', new THREE.BufferAttribute(this.macroBondColors, 3));

    const bondMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.macroBondsMesh = new THREE.LineSegments(bondGeo, bondMat);
    this.macroGroup.add(this.macroBondsMesh);

    // C. Electron Probability Clouds / Planetary Track Orbits
    const orbitGeo = new THREE.SphereGeometry(1.65, 14, 10);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });
    this.instancedOrbits = new THREE.InstancedMesh(orbitGeo, orbitMat, maxUnits);
    this.instancedOrbits.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedOrbits.count = 0;
    this.macroGroup.add(this.instancedOrbits);

    // D. Main Sequence Star Glowing Photosphere Coronae
    const starGeo = new THREE.SphereGeometry(1.45, 16, 12);
    const starMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    this.instancedStars = new THREE.InstancedMesh(starGeo, starMat, 120);
    this.instancedStars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedStars.count = 0;
    this.macroGroup.add(this.instancedStars);

    // E. Circumstellar Dyson Swarm Energy Rings (Kardashev I/II Civilizations)
    const dysonGeo = new THREE.TorusGeometry(2.10, 0.06, 10, 28);
    const dysonMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.80,
      blending: THREE.AdditiveBlending
    });
    this.instancedDysonRings = new THREE.InstancedMesh(dysonGeo, dysonMat, 64);
    this.instancedDysonRings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedDysonRings.count = 0;
    this.macroGroup.add(this.instancedDysonRings);

    // F. Black Hole Accretion Disks
    const diskGeo = new THREE.RingGeometry(0.70, 2.5, 24);
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    this.instancedDisks = new THREE.InstancedMesh(diskGeo, diskMat, 32);
    this.instancedDisks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedDisks.count = 0;
    this.macroGroup.add(this.instancedDisks);

    // G. Relativistic Polar Jets
    const jetGeo = new THREE.ConeGeometry(0.45, 5.8, 10, 1, true);
    const jetMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.60,
      blending: THREE.AdditiveBlending
    });
    this.instancedJets = new THREE.InstancedMesh(jetGeo, jetMat, 64);
    this.instancedJets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedJets.count = 0;
    this.macroGroup.add(this.instancedJets);
  }

  // --------------------------------------------------------------------------
  // 3. Hero Unit Inspector Mode (Close-Up of Single 36-Node Complex)
  // --------------------------------------------------------------------------
  initHeroInspector() {
    this.inspectorNodes = [];

    // Central Throat Constriction Torus (d in [0.50, 4.40])
    const throatGeo = new THREE.TorusGeometry(2.2, 0.08, 16, 48);
    const throatMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.inspectorThroat = new THREE.Mesh(throatGeo, throatMat);
    this.inspectorThroat.rotation.x = Math.PI / 2;
    this.inspectorGroup.add(this.inspectorThroat);

    // 36 Node Spheres (6 Layers x 6 Nodes)
    const layerColors = [
      0x38bdf8, // Layer 0: Cyan Bell
      0x818cf8, // Layer 1: Indigo
      0xf59e0b, // Layer 2: Amber Throat Ingress
      0xf59e0b, // Layer 3: Amber Throat Egress
      0x818cf8, // Layer 4: Indigo
      0x38bdf8  // Layer 5: Cyan Bell
    ];

    for (let l = 0; l < 6; l++) {
      for (let k = 0; k < 6; k++) {
        const sGeo = new THREE.SphereGeometry(0.38, 18, 14);
        const sMat = new THREE.MeshStandardMaterial({
          color: layerColors[l],
          roughness: 0.15,
          metalness: 0.85,
          emissive: layerColors[l],
          emissiveIntensity: 0.80
        });
        const nodeMesh = new THREE.Mesh(sGeo, sMat);
        this.inspectorGroup.add(nodeMesh);
        this.inspectorNodes.push(nodeMesh);
      }
    }

    // Layer Perimeter Rings (6 Hexagonal Rings)
    this.inspectorRingLines = [];
    for (let l = 0; l < 6; l++) {
      const ringGeo = new THREE.BufferGeometry();
      const ringPos = new Float32Array(7 * 3);
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
      const ringMat = new THREE.LineBasicMaterial({
        color: layerColors[l],
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const ringMesh = new THREE.Line(ringGeo, ringMat);
      this.inspectorGroup.add(ringMesh);
      this.inspectorRingLines.push(ringMesh);
    }

    // Ruled Ribbon Strip Sheets / Helicoid Sheets between alternating layers
    const ribbonGeo = new THREE.BufferGeometry();
    const ribbonPos = new Float32Array(5 * 6 * 2 * 3);
    const ribbonCol = new Float32Array(5 * 6 * 2 * 3);
    const indices = [];
    for (let seg = 0; seg < 5 * 6; seg++) {
      const r1 = seg * 2, r2 = (seg + 1) * 2;
      indices.push(r1, r2, r1 + 1);
      indices.push(r1 + 1, r2, r2 + 1);
    }
    ribbonGeo.setAttribute('position', new THREE.BufferAttribute(ribbonPos, 3));
    ribbonGeo.setAttribute('color', new THREE.BufferAttribute(ribbonCol, 3));
    ribbonGeo.setIndex(indices);

    const ribbonMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.60,
      blending: THREE.AdditiveBlending
    });
    this.inspectorRibbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    this.inspectorGroup.add(this.inspectorRibbon);

    // Specialized Feature Meshes for Hero Inspector:
    // 1. Electron Cloud / Habitable Atmosphere
    const cloudGeo = new THREE.SphereGeometry(5.2, 32, 24);
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });
    this.inspectorCloud = new THREE.Mesh(cloudGeo, cloudMat);
    this.inspectorGroup.add(this.inspectorCloud);

    // 2. Circumsolar Dyson Swarm Ring
    const dysonGeo = new THREE.TorusGeometry(6.4, 0.12, 16, 64);
    const dysonMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.inspectorDyson = new THREE.Mesh(dysonGeo, dysonMat);
    this.inspectorDyson.rotation.x = Math.PI / 3;
    this.inspectorDyson.visible = false;
    this.inspectorGroup.add(this.inspectorDyson);

    // 3. Black Hole Accretion Disk & Jets
    const diskGeo = new THREE.RingGeometry(1.6, 5.8, 48);
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.80,
      blending: THREE.AdditiveBlending
    });
    this.inspectorDisk = new THREE.Mesh(diskGeo, diskMat);
    this.inspectorDisk.rotation.x = Math.PI / 2.3;
    this.inspectorDisk.visible = false;
    this.inspectorGroup.add(this.inspectorDisk);

    // Inspector HUD Label Billboard
    this.inspectorBadge = document.createElement('div');
    this.inspectorBadge.className = 'cosmos-inspector-badge';
    this.inspectorBadge.style.display = 'none';
    this.inspectorBadge.innerHTML = `
      <div class="badge-title">36-NODE SPACETIME COMPLEX INSPECTOR</div>
      <div class="badge-state" id="insp-state">STATE: 36-NODE BARYON</div>
      <div class="badge-meta" id="insp-meta">Layers: 6 x 6 = 36 Nodes | Metric d: 4.40</div>
    `;
    this.container.appendChild(this.inspectorBadge);
  }

  // --------------------------------------------------------------------------
  // 4. Photon Stream (Relativistic Null Geodesic Deflection)
  // --------------------------------------------------------------------------
  initPhotonStream() {
    this.photons = [];
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(this.maxPhotons * 3);
    const col = new Float32Array(this.maxPhotons * 3);

    for (let i = 0; i < this.maxPhotons; i++) {
      this.photons.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 85,
          (Math.random() - 0.5) * 85,
          (Math.random() - 0.5) * 85
        ),
        vel: new THREE.Vector3(0.9 + Math.random() * 0.9, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3),
        alive: true,
        age: Math.random() * 10
      });
      pos[i * 3]     = this.photons[i].pos.x;
      pos[i * 3 + 1] = this.photons[i].pos.y;
      pos[i * 3 + 2] = this.photons[i].pos.z;

      col[i * 3] = 0.22; col[i * 3 + 1] = 0.74; col[i * 3 + 2] = 0.97;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.photonPoints = new THREE.Points(geo, mat);
    this.scene.add(this.photonPoints);
  }

  updatePhotons(delta) {
    if (!this.showPhotons || !this.photonPoints) return;
    const pos = this.photonPoints.geometry.attributes.position.array;
    const G = this.GRID;

    const singularities = [];
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.state[x][y][z] === STATE_BLACK_HOLE) {
            singularities.push(this.getCellCenter(x, y, z));
          }
        }
      }
    }

    for (let i = 0; i < this.maxPhotons; i++) {
      const p = this.photons[i];
      if (!p.alive) {
        p.pos.set(-45, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80);
        p.vel.set(1.2 + Math.random() * 0.6, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2);
        p.alive = true;
      }

      // Gravitational Deflection toward Black Holes
      for (let s = 0; s < singularities.length; s++) {
        const diff = new THREE.Vector3().subVectors(singularities[s], p.pos);
        const distSq = diff.lengthSq();
        if (distSq < 3.2) {
          p.alive = false;
          this.photonsTrappedTotal++;
          break;
        } else if (distSq < 350.0) {
          const force = 28.0 / (distSq + 4.0);
          diff.normalize().multiplyScalar(force * delta);
          p.vel.add(diff);
        }
      }

      p.pos.addScaledVector(p.vel, delta * 28.0);
      if (Math.abs(p.pos.x) > 55 || Math.abs(p.pos.y) > 55 || Math.abs(p.pos.z) > 55) {
        p.alive = false;
      }

      pos[i * 3]     = p.pos.x;
      pos[i * 3 + 1] = p.pos.y;
      pos[i * 3 + 2] = p.pos.z;
    }
    this.photonPoints.geometry.attributes.position.needsUpdate = true;
  }

  // --------------------------------------------------------------------------
  // 5. Cosmic Parameters (Frequency, Entropy & Planck Asymptotic Renormalization)
  // --------------------------------------------------------------------------
  getEffectiveParameters() {
    const elF = document.getElementById('cosmos-freq-input');
    const elS = document.getElementById('cosmos-entropy-input');
    const elP = document.getElementById('cosmos-phase-input');

    let rawF = elF ? parseFloat(elF.value) : 144.0;
    let rawS = elS ? parseFloat(elS.value) : 0.5;
    let rawPhi = elP ? parseFloat(elP.value) : 1.0;

    if (isNaN(rawF) || rawF < 0) rawF = 144.0;
    if (isNaN(rawS) || rawS < 0) rawS = 0.5;
    if (isNaN(rawPhi)) rawPhi = 1.0;

    // Asymptotic Renormalization: allows arbitrary inputs up to 10^15 and infinity
    const fPlanck = 1.0e9;
    const fNorm = rawF / (1.0 + rawF / fPlanck);

    return {
      f: fNorm,
      rawF: rawF,
      S: rawS,
      phi: rawPhi
    };
  }

  // --------------------------------------------------------------------------
  // 6. Cellular Automata Update Loop: 36-Node Complex Resonant Combinations
  // --------------------------------------------------------------------------
  step() {
    if (this.isStill) return;

    const G = this.GRID;
    const params = this.getEffectiveParameters();
    const f = params.f;
    const S = params.S;

    let countFermions = 0;
    let countHadrons = 0;
    let countBaryons = 0;
    let countHydrogen = 0;
    let countHelium = 0;
    let countOrganic = 0;
    let countStars = 0;
    let countPlanets = 0;
    let countBiospheres = 0;
    let countCiv = 0;
    let countSN = 0;
    let countBH = 0;

    let sumEntropy = 0.0;
    let sumEP = 0.0;
    let netFlux = 0.0;

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const cur = this.state[x][y][z];
          const cellAge = this.age[x][y][z] + 1;
          this.age[x][y][z] = cellAge;

          // 26-Neighbor Moore Census
          let nTotal = 0;
          let nSubatomic = 0;
          let nHydrogen = 0;
          let nHelium = 0;
          let nOrganic = 0;
          let nStars = 0;
          let nPlanets = 0;
          let nBiospheres = 0;
          let nCiv = 0;
          let nSN = 0;
          let nBH = 0;

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;
                const nx = (x + dx + G) % G;
                const ny = (y + dy + G) % G;
                const nz = (z + dz + G) % G;
                const st = this.state[nx][ny][nz];

                if (st !== STATE_VACUUM) nTotal++;
                if (st === STATE_FERMION || st === STATE_HADRON || st === STATE_BARYON) nSubatomic++;
                if (st === STATE_HYDROGEN) nHydrogen++;
                if (st === STATE_HELIUM) nHelium++;
                if (st === STATE_ORGANIC_ELEMENT) nOrganic++;
                if (st === STATE_STAR) nStars++;
                if (st === STATE_PLANETARY_SYSTEM) nPlanets++;
                if (st === STATE_BIOSPHERE) nBiospheres++;
                if (st === STATE_CIVILIZATION) nCiv++;
                if (st === STATE_SUPERNOVA) nSN++;
                if (st === STATE_BLACK_HOLE) nBH++;
              }
            }
          }

          let next = cur;

          // A. BLACK HOLES: Singularities consume matter rather than cloning!
          if (cur === STATE_BLACK_HOLE) {
            next = STATE_BLACK_HOLE;
            this.distance[x][y][z] = 0.50;
            countBH++;
          }
          // Adjacent matter accretion into existing Black Hole:
          else if (nBH > 0 && Math.random() < 0.08) {
            // Matter falls in and disappears into vacuum!
            next = STATE_VACUUM;
            netFlux += 10.0;
          }
          // B. SUPERNOVA DETONATION & BLAST WAVE:
          else if (cur === STATE_SUPERNOVA) {
            // Detonation completed -> leaves nucleosynthetic gas and potential remnant
            if (Math.random() < 0.25) {
              next = STATE_BLACK_HOLE; // Remnant core collapse
              this.distance[x][y][z] = 0.50;
              countBH++;
              this.blackHolesTotal++;
            } else {
              next = STATE_ORGANIC_ELEMENT; // Seed organic element cloud
              countOrganic++;
            }
          }
          else if (nSN > 0) {
            // Blast wave shockfront compresses neighboring space
            if (cur === STATE_BIOSPHERE || cur === STATE_CIVILIZATION) {
              // Devastating radiation pushes back to organic elements
              next = STATE_ORGANIC_ELEMENT;
              countOrganic++;
            } else if (cur === STATE_VACUUM || nSubatomic > 0) {
              // Supernova nucleosynthetic seeding!
              next = (Math.random() < 0.45) ? STATE_ORGANIC_ELEMENT : STATE_HYDROGEN;
              if (next === STATE_ORGANIC_ELEMENT) countOrganic++; else countHydrogen++;
            }
          }

          // C. STELLAR EVOLUTION & CHANDRASEKHAR COLLAPSE:
          else if (cur === STATE_STAR) {
            // Massive Star Core Collapse after long stellar lifetime:
            if (cellAge > 24 && Math.random() < 0.06) {
              next = STATE_SUPERNOVA;
              this.supernovaeTotal++;
              countSN++;
            } else if (nTotal >= 1 && nTotal <= 8) {
              next = STATE_STAR;
              countStars++;
            } else {
              next = STATE_ORGANIC_ELEMENT;
              countOrganic++;
            }
          }

          // D. CIVILIZATION & BIOSPHERE EVOLUTION (Prigogine Dissipative Order):
          else if (cur === STATE_CIVILIZATION) {
            // Advanced Civilizations are resilient and thrive
            if (nTotal >= 1 && nTotal <= 10) {
              next = STATE_CIVILIZATION;
              countCiv++;
            } else {
              next = STATE_BIOSPHERE;
              countBiospheres++;
            }
          }
          else if (cur === STATE_BIOSPHERE) {
            // Living biosphere with sustained proper time and moderate entropy evolves technology!
            if (cellAge >= 4 && S >= 0.2 && S <= 2.8 && Math.random() < 0.35) {
              next = STATE_CIVILIZATION;
              countCiv++;
            } else if (nTotal >= 1 && nTotal <= 7) {
              next = STATE_BIOSPHERE;
              countBiospheres++;
            } else {
              next = STATE_ORGANIC_ELEMENT;
              countOrganic++;
            }
          }
          else if (cur === STATE_PLANETARY_SYSTEM) {
            // Planets with organic elements in habitable zone emerge into biospheres
            if (nOrganic >= 1 && S >= 0.2 && S <= 2.4 && Math.random() < 0.35) {
              next = STATE_BIOSPHERE;
              countBiospheres++;
            } else if (nStars >= 1 || (nTotal >= 1 && nTotal <= 6)) {
              next = STATE_PLANETARY_SYSTEM;
              countPlanets++;
            } else {
              next = STATE_ORGANIC_ELEMENT;
              countOrganic++;
            }
          }

          // E. NUCLEOSYNTHESIS & STELLAR CONDENSATION:
          // 1. Accretion into Planetary System around Stars:
          else if ((cur === STATE_HYDROGEN || cur === STATE_HELIUM || cur === STATE_ORGANIC_ELEMENT) && nStars >= 1 && Math.random() < 0.38) {
            next = STATE_PLANETARY_SYSTEM;
            countPlanets++;
          }
          // 2. Gravitational Stellar Ignition (Jeans Collapse):
          else if ((nHydrogen + nHelium) >= 4 && (cur === STATE_HELIUM || cur === STATE_HYDROGEN) && Math.random() < 0.28) {
            next = STATE_STAR;
            this.distance[x][y][z] = 1.40;
            countStars++;
          }
          // 3. Organic Element Nucleosynthesis (^12C, ^16O, ^56Fe):
          else if ((cur === STATE_HELIUM || cur === STATE_HYDROGEN) && (nStars >= 1 || f > 85 || (nHelium >= 2 && nTotal >= 3))) {
            next = STATE_ORGANIC_ELEMENT;
            countOrganic++;
          }
          // 4. Helium (^4He) Fusion:
          else if (cur === STATE_HYDROGEN && (nHydrogen >= 2 || f > 75)) {
            next = STATE_HELIUM;
            countHelium++;
          }
          // 5. Hydrogen (^1H) Atom Formation (Paper 04):
          else if ((cur === STATE_BARYON || cur === STATE_HADRON) && (nSubatomic >= 1 || Math.random() < 0.32)) {
            next = STATE_HYDROGEN;
            countHydrogen++;
          }
          // 6. Baryon Nucleon Triad Lock (Paper 08 Triad Principle {-s, 0, s}):
          else if (cur === STATE_HADRON && (nSubatomic >= 2 || Math.random() < 0.40)) {
            next = STATE_BARYON;
            countBaryons++;
          }
          // 7. Hadron Meson Gluon Bound State:
          else if (cur === STATE_FERMION && (nSubatomic >= 1 || Math.random() < 0.45)) {
            next = STATE_HADRON;
            countHadrons++;
          }
          // 8. Fermion Chiral Spin-1/2 Excitation:
          else if (cur === STATE_FERMION && nTotal >= 1 && nTotal <= 5) {
            next = STATE_FERMION;
            countFermions++;
          }

          // F. VACUUM PRIMORDIAL GENESIS:
          else if (cur === STATE_VACUUM) {
            if (nTotal === 3 || nTotal === 4 || (nTotal === 5 && Math.random() < 0.28)) {
              const r = Math.random();
              if (r < 0.35) { next = STATE_FERMION; countFermions++; }
              else if (r < 0.65) { next = STATE_HADRON; countHadrons++; }
              else if (r < 0.88) { next = STATE_HYDROGEN; countHydrogen++; }
              else { next = STATE_ORGANIC_ELEMENT; countOrganic++; }
              this.energy[x][y][z] = 20.0;
            } else {
              next = STATE_VACUUM;
            }
          }
          else {
            next = STATE_VACUUM;
          }

          this.nextState[x][y][z] = next;

          // Local Field ODE Updates
          if (next !== STATE_VACUUM) {
            // Paper 02 Theorem 1.1: Local EP Rate
            let epMultiplier = 1.0;
            if (next === STATE_BLACK_HOLE) epMultiplier = 4.0;
            else if (next === STATE_CIVILIZATION) epMultiplier = 3.0;
            else if (next === STATE_BIOSPHERE) epMultiplier = 2.0;
            else if (next === STATE_STAR) epMultiplier = 2.5;

            const localEP = (0.0025 * S + 0.00012 * (f % 60)) * epMultiplier;
            this.entropy[x][y][z] += localEP * (1000 / this.stepInterval * 0.001);
            sumEP += localEP;
            sumEntropy += this.entropy[x][y][z];

            // Proper time dilation tau(t) = integral sqrt(1 - 0.5/d) dt
            const timeDilation = Math.sqrt(Math.max(0.01, 1.0 - 0.50 / this.distance[x][y][z]));
            this.properTime[x][y][z] += (1000 / this.stepInterval * 0.001) * timeDilation;

            // Metric throat constriction / relaxation
            if (next === STATE_BLACK_HOLE) {
              this.distance[x][y][z] = 0.50;
            } else if (next === STATE_STAR && this.distance[x][y][z] > 1.30) {
              this.distance[x][y][z] = Math.max(1.30, this.distance[x][y][z] - 0.08);
            } else if (nTotal >= 6 && this.distance[x][y][z] > 0.50) {
              this.distance[x][y][z] = Math.max(0.50, this.distance[x][y][z] - 0.04);
            } else if (nTotal <= 1 && this.distance[x][y][z] < 4.40) {
              this.distance[x][y][z] = Math.min(4.40, this.distance[x][y][z] + 0.04);
            }
          }
        }
      }
    }

    // Polar Relativistic Jets from Black Holes
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.state[x][y][z] === STATE_BLACK_HOLE) {
            const yUp = (y + 1) % G;
            const yDown = (y - 1 + G) % G;

            if (this.nextState[x][yUp][z] === STATE_VACUUM && Math.random() > 0.45) {
              this.nextState[x][yUp][z] = STATE_FERMION;
              this.energy[x][yUp][z] = 20.0;
              netFlux += 12.0;
            }
            if (this.nextState[x][yDown][z] === STATE_VACUUM && Math.random() > 0.45) {
              this.nextState[x][yDown][z] = STATE_FERMION;
              this.energy[x][yDown][z] = 20.0;
              netFlux += 12.0;
            }
          }
        }
      }
    }

    // Swap State Grids
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          this.state[x][y][z] = this.nextState[x][y][z];
        }
      }
    }

    this.generation++;
    this.cosmicTime += 0.85;

    // Telemetry Sync
    this.counts.fermions = countFermions;
    this.counts.hadrons = countHadrons;
    this.counts.baryons = countBaryons;
    this.counts.hydrogen = countHydrogen;
    this.counts.helium = countHelium;
    this.counts.organic = countOrganic;
    this.counts.stars = countStars;
    this.counts.planets = countPlanets;
    this.counts.biospheres = countBiospheres;
    this.counts.civilizations = countCiv;
    this.counts.supernovae = countSN;
    this.counts.blackHoles = countBH;
    this.counts.totalUnits = countFermions + countHadrons + countBaryons + countHydrogen + countHelium +
      countOrganic + countStars + countPlanets + countBiospheres + countCiv + countSN + countBH;

    this.totalEntropy = sumEntropy;
    this.totalEPRate = sumEP;
    this.energyFlux = netFlux;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 7. Visual Updates & Three.js Instancing Updates (36 Nodes per Unit, 60 FPS)
  // --------------------------------------------------------------------------
  updateVisuals(elapsed) {
    const G = this.GRID;
    const t = elapsed;
    const params = this.getEffectiveParameters();

    if (this.viewMode === 'inspector') {
      this.updateInspectorVisuals(t, params);
      return;
    }

    let nodeIdx = 0;
    let bondVertIdx = 0;
    let orbitIdx = 0;
    let starIdx = 0;
    let dysonIdx = 0;
    let diskIdx = 0;
    let jetIdx = 0;

    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();
    const bondPos = this.macroBondPositions;
    const bondCol = this.macroBondColors;

    // Active civilization coordinates for inter-civilization laser communication lines
    const civPositions = [];

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.state[x][y][z];
          if (st === STATE_VACUUM) continue;

          const center = this.getCellCenter(x, y, z);
          const curD = this.distance[x][y][z];
          const localPhase = (x + y + z) * 0.45 + t * (params.f * 0.015 + 1.0);

          if (st === STATE_CIVILIZATION) {
            civPositions.push(center);
          }

          // A. Render the authentic 36 Nodes of this Unit (6 Layers x 6 Nodes)
          const baseRadius = (st === STATE_BLACK_HOLE) ? 0.90 : 1.70;
          const unitHeight = Math.min(2.6, curD * 0.52);
          const unitNodeVecs = [];

          for (let l = 0; l < 6; l++) {
            const layerZ = (l - 2.5) * (unitHeight / 5.0);
            const waistFactor = (l - 2.5) / 2.5;
            const layerRadius = baseRadius * (1.0 + 0.30 * waistFactor * waistFactor);
            const layerOffset = (l % 2 === 0) ? (params.phi * 0.15) : (-params.phi * 0.15);

            for (let k = 0; k < 6; k++) {
              const angle = k * (Math.PI / 3.0) + layerOffset + localPhase * 0.25;
              const nx = center.x + Math.cos(angle) * layerRadius;
              const ny = center.y + Math.sin(angle) * layerRadius;
              const nz = center.z + layerZ;

              unitNodeVecs.push(new THREE.Vector3(nx, ny, nz));

              if (nodeIdx < 36000) {
                dummy.position.set(nx, ny, nz);
                let scaleVal = 0.85;
                if (st === STATE_STAR || st === STATE_CIVILIZATION) scaleVal = 1.15;
                else if (st === STATE_BIOSPHERE || st === STATE_ORGANIC_ELEMENT) scaleVal = 1.00;
                dummy.scale.setScalar(scaleVal);
                dummy.updateMatrix();

                this.instancedNodes.setMatrixAt(nodeIdx, dummy.matrix);

                // Cosmic State Color Palette
                if (st === STATE_FERMION) {
                  colorDummy.setHex(k % 2 === 0 ? 0x38bdf8 : 0xa855f7); // Cyan / Violet
                } else if (st === STATE_HADRON) {
                  colorDummy.setHex(0xd946ef); // Magenta
                } else if (st === STATE_BARYON) {
                  colorDummy.setHex(0xf59e0b); // Golden Amber Nucleon
                } else if (st === STATE_HYDROGEN) {
                  colorDummy.setHex(0x38bdf8); // Sky Blue 1H
                } else if (st === STATE_HELIUM) {
                  colorDummy.setHex(0x10b981); // Emerald Alpha Core
                } else if (st === STATE_ORGANIC_ELEMENT) {
                  colorDummy.setHex((l === 2 || l === 3) ? 0x22c55e : 0xf8fafc); // Carbon Diamond / Jade
                } else if (st === STATE_STAR) {
                  colorDummy.setHex(0xfef08a); // Blazing White-Gold Stellar Photosphere
                } else if (st === STATE_PLANETARY_SYSTEM) {
                  colorDummy.setHex(0x0284c7); // Deep Ocean Blue / Terrestrial
                } else if (st === STATE_BIOSPHERE) {
                  colorDummy.setHex(0x10b981); // Shimmering Bioluminescent Emerald
                } else if (st === STATE_CIVILIZATION) {
                  colorDummy.setHex(0xfacc15); // Advancing Kardashev Gold
                } else if (st === STATE_SUPERNOVA) {
                  colorDummy.setHex(0xffedd5); // Detonating Incandescent Blast
                } else if (st === STATE_BLACK_HOLE) {
                  colorDummy.setHex(0xef4444); // Gravitational Horizon Redshift
                }

                this.instancedNodes.setColorAt(nodeIdx, colorDummy);
                nodeIdx++;
              }
            }
          }

          // B. Internal Chords & Layer Rings of the 36-Node Unit
          if (bondVertIdx < 68000) {
            let bR = 0.22, bG = 0.74, bB = 0.97;
            if (st === STATE_CIVILIZATION) { bR = 0.98; bG = 0.80; bB = 0.08; }
            else if (st === STATE_BIOSPHERE) { bR = 0.06; bG = 0.72; bB = 0.50; }
            else if (st === STATE_STAR) { bR = 0.99; bG = 0.94; bB = 0.54; }
            else if (st === STATE_ORGANIC_ELEMENT) { bR = 0.13; bG = 0.77; bB = 0.36; }
            else if (st === STATE_BARYON) { bR = 0.96; bG = 0.62; bB = 0.04; }

            // 6 Hexagonal Layer Rings
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

            // Inter-layer helicoid chords (layers l <-> l+1)
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

          // C. Specialized Macro Geometry per Cosmic State:
          // 1. Electron Probability Clouds (Hydrogen, Helium, Planetary Systems, Biospheres)
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

          // 2. Stars: Luminous Photosphere Coronae
          if (st === STATE_STAR && starIdx < 120) {
            dummy.position.copy(center);
            dummy.scale.setScalar(1.65 + Math.sin(localPhase * 2.5) * 0.08);
            dummy.rotation.set(0, t * 0.4, 0);
            dummy.updateMatrix();
            this.instancedStars.setMatrixAt(starIdx, dummy.matrix);
            starIdx++;
          }

          // 3. Civilizations: Circumsolar Dyson Swarm Rings
          if (st === STATE_CIVILIZATION && dysonIdx < 64) {
            dummy.position.copy(center);
            dummy.scale.setScalar(1.15);
            dummy.rotation.set(Math.PI / 3.2, t * 0.7, 0);
            dummy.updateMatrix();
            this.instancedDysonRings.setMatrixAt(dysonIdx, dummy.matrix);
            dysonIdx++;
          }

          // 4. Black Holes: Accretion Disks & Polar Jets
          if (st === STATE_BLACK_HOLE && diskIdx < 32) {
            dummy.position.copy(center);
            dummy.rotation.set(Math.PI * 0.35, t * 3.0, 0);
            dummy.scale.set(1.35, 1.35, 1.35);
            dummy.updateMatrix();
            this.instancedDisks.setMatrixAt(diskIdx, dummy.matrix);
            diskIdx++;

            // Upward & Downward Relativistic Jets
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

    // D. Interstellar Communication Laser Beams between Advanced Civilizations!
    if (civPositions.length >= 2 && bondVertIdx < 68000) {
      for (let i = 0; i < civPositions.length; i++) {
        for (let j = i + 1; j < civPositions.length; j++) {
          const pA = civPositions[i];
          const pB = civPositions[j];
          const dist = pA.distanceTo(pB);

          if (dist < 32.0) { // In range for interstellar optical laser communication
            bondPos[bondVertIdx * 3]     = pA.x;
            bondPos[bondVertIdx * 3 + 1] = pA.y;
            bondPos[bondVertIdx * 3 + 2] = pA.z;
            bondPos[(bondVertIdx + 1) * 3]     = pB.x;
            bondPos[(bondVertIdx + 1) * 3 + 1] = pB.y;
            bondPos[(bondVertIdx + 1) * 3 + 2] = pB.z;

            // Intense Golden/Cyan Coherent Laser Beam
            bondCol[bondVertIdx * 3]     = 0.98; bondCol[bondVertIdx * 3 + 1] = 0.85; bondCol[bondVertIdx * 3 + 2] = 0.12;
            bondCol[(bondVertIdx + 1) * 3] = 0.38; bondCol[(bondVertIdx + 1) * 3 + 1] = 0.95; bondCol[(bondVertIdx + 1) * 3 + 2] = 0.98;
            bondVertIdx += 2;
          }
        }
      }
    }

    // Set Active Mesh Counts
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
  // 8. Hero Unit Inspector View Visuals (36 Nodes, Ruled Ribbons, Throat)
  // --------------------------------------------------------------------------
  updateInspectorVisuals(elapsed, params) {
    const t = elapsed;
    const fx = this.focusCoord.x;
    const fy = this.focusCoord.y;
    const fz = this.focusCoord.z;
    const st = this.state[fx][fy][fz];
    const curD = this.distance[fx][fy][fz];
    const localPhase = t * (params.f * 0.02 + 1.2);

    // Dynamic Throat Constriction Torus
    const throatScale = Math.max(0.40, curD / 2.2);
    this.inspectorThroat.scale.set(throatScale, throatScale, 1.0);
    this.inspectorThroat.rotation.z = t * 0.5;

    // Position 36 Nodes across 6 Layers
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
        const theta = k * (Math.PI / 3.0) + angleOffset + localPhase * 0.25;
        const nx = Math.cos(theta) * rL;
        const ny = Math.sin(theta) * rL;
        const nz = zL;

        const vec = new THREE.Vector3(nx, ny, nz);
        nodeVectors.push(vec);

        const nodeMesh = this.inspectorNodes[nIdx];
        if (nodeMesh) {
          nodeMesh.position.copy(vec);
          const breathe = 1.0 + Math.sin(localPhase * 2.0 + l) * 0.08;
          nodeMesh.scale.setScalar(breathe);
        }

        ringPositions[k * 3]     = nx;
        ringPositions[k * 3 + 1] = ny;
        ringPositions[k * 3 + 2] = nz;
        nIdx++;
      }

      // Close ring loop
      ringPositions[6 * 3]     = ringPositions[0];
      ringPositions[6 * 3 + 1] = ringPositions[1];
      ringPositions[6 * 3 + 2] = ringPositions[2];
      this.inspectorRingLines[l].geometry.attributes.position.needsUpdate = true;
    }

    // Ruled Ribbon Strip Sheets between adjacent layers
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

    // State Specific Attachments in Inspector
    this.inspectorDyson.visible = (st === STATE_CIVILIZATION);
    if (this.inspectorDyson.visible) {
      this.inspectorDyson.rotation.z = t * 0.4;
    }

    this.inspectorDisk.visible = (st === STATE_BLACK_HOLE);
    if (this.inspectorDisk.visible) {
      this.inspectorDisk.rotation.z = t * 3.5;
    }

    this.inspectorCloud.visible = (st === STATE_HYDROGEN || st === STATE_HELIUM || st === STATE_BIOSPHERE || st === STATE_PLANETARY_SYSTEM);
    if (this.inspectorCloud.visible) {
      this.inspectorCloud.rotation.set(t * 0.2, t * 0.3, 0);
    }

    // Update Inspector Badge Text
    const stateNames = [
      'VACUUM FOAM', 'FERMION (CHIRAL)', 'HADRON (MESON)', 'BARYON (TRIAD LOCK)',
      'HYDROGEN (^1H ATOM)', 'HELIUM (^4He NUCLEUS)', 'ORGANIC ELEMENT (^12C/^16O)',
      'MAIN SEQUENCE STAR', 'PLANETARY SYSTEM', 'LIVING BIOSPHERE',
      'ADVANCED CIVILIZATION', 'TYPE II SUPERNOVA', 'BLACK HOLE SINGULARITY'
    ];
    const elState = document.getElementById('insp-state');
    const elMeta = document.getElementById('insp-meta');
    if (elState) elState.innerText = `STATE: ${stateNames[st] || 'UNKNOWN'}`;
    if (elMeta) {
      elMeta.innerText = `Coord: (${fx},${fy},${fz}) | 36 Nodes | Metric d: ${curD.toFixed(2)} | Proper Time tau: ${this.properTime[fx][fy][fz].toFixed(2)} Myr`;
    }
  }

  // --------------------------------------------------------------------------
  // 9. UI, Presets & Event Handlers
  // --------------------------------------------------------------------------
  loadPreset(presetKey) {
    const G = this.GRID;

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          this.state[x][y][z] = STATE_VACUUM;
          this.nextState[x][y][z] = STATE_VACUUM;
          this.distance[x][y][z] = 4.40;
          this.energy[x][y][z] = 0.0;
          this.properTime[x][y][z] = 0.0;
          this.entropy[x][y][z] = 0.0;
          this.age[x][y][z] = 0;
        }
      }
    }

    const center = Math.floor(G / 2);

    if (presetKey === 'genesis') {
      // Big Bang Primordial Seed: High density core with subatomic and hydrogen seeds
      for (let x = center - 2; x <= center + 2; x++) {
        for (let y = center - 2; y <= center + 2; y++) {
          for (let z = center - 2; z <= center + 2; z++) {
            const dist = Math.sqrt((x - center)**2 + (y - center)**2 + (z - center)**2);
            if (dist <= 2.2) {
              const r = Math.random();
              if (r < 0.35) this.state[x][y][z] = STATE_HYDROGEN;
              else if (r < 0.65) this.state[x][y][z] = STATE_FERMION;
              else if (r < 0.85) this.state[x][y][z] = STATE_HADRON;
              else this.state[x][y][z] = STATE_BARYON;
              this.distance[x][y][z] = 2.40;
            }
          }
        }
      }
    } else if (presetKey === 'nucleosynthesis') {
      // Nuclear Forge: Hydrogen and Helium fusion clusters with organic carbon seeds
      for (let x = 2; x < G - 2; x++) {
        for (let y = 2; y < G - 2; y++) {
          for (let z = 2; z < G - 2; z++) {
            if (Math.random() < 0.22) {
              const r = Math.random();
              if (r < 0.45) this.state[x][y][z] = STATE_HYDROGEN;
              else if (r < 0.75) this.state[x][y][z] = STATE_HELIUM;
              else this.state[x][y][z] = STATE_ORGANIC_ELEMENT;
              this.distance[x][y][z] = 2.10;
            }
          }
        }
      }
    } else if (presetKey === 'stellar_nursery') {
      // Protostellar Clouds & Main Sequence Stars with Accretion
      for (let s = 0; s < 3; s++) {
        const sx = center + (s === 0 ? 0 : (s === 1 ? -3 : 3));
        const sy = center + (s === 1 ? 1 : -1);
        const sz = center;
        this.state[sx][sy][sz] = STATE_STAR;
        this.distance[sx][sy][sz] = 1.35;

        // Surround with planetary systems and gas
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              if (dx === 0 && dy === 0 && dz === 0) continue;
              const px = (sx + dx + G) % G;
              const py = (sy + dy + G) % G;
              const pz = (sz + dz + G) % G;
              if (Math.random() < 0.40) {
                this.state[px][py][pz] = STATE_PLANETARY_SYSTEM;
                this.distance[px][py][pz] = 2.60;
              }
            }
          }
        }
      }
    } else if (presetKey === 'planetary_emergence') {
      // Habitable Worlds with Prebiotic Oceans & Organic Elements
      this.state[center][center][center] = STATE_STAR;
      this.distance[center][center][center] = 1.35;

      const planetOffsets = [
        [-2, 0, 0], [2, 0, 0], [0, -2, 0], [0, 2, 0], [0, 0, -2], [0, 0, 2]
      ];
      planetOffsets.forEach(([dx, dy, dz]) => {
        const px = center + dx, py = center + dy, pz = center + dz;
        this.state[px][py][pz] = STATE_PLANETARY_SYSTEM;
        this.distance[px][py][pz] = 2.40;
      });

      // Adjacent organic element clouds
      for (let i = 0; i < 8; i++) {
        const rx = center + Math.floor((Math.random() - 0.5) * 6);
        const ry = center + Math.floor((Math.random() - 0.5) * 6);
        const rz = center + Math.floor((Math.random() - 0.5) * 6);
        if (this.state[rx][ry][rz] === STATE_VACUUM) {
          this.state[rx][ry][rz] = STATE_ORGANIC_ELEMENT;
        }
      }
    } else if (presetKey === 'organic_civilization') {
      // Living Biospheres and Advancing Technological Civilizations!
      this.state[center][center][center] = STATE_STAR;
      this.distance[center][center][center] = 1.35;

      const civNodes = [
        [center - 2, center, center],
        [center + 2, center, center],
        [center, center - 2, center],
        [center, center + 2, center],
        [center + 1, center + 1, center - 2]
      ];
      civNodes.forEach(([cx, cy, cz], idx) => {
        this.state[cx][cy][cz] = (idx < 3) ? STATE_CIVILIZATION : STATE_BIOSPHERE;
        this.distance[cx][cy][cz] = 2.50;
        this.properTime[cx][cy][cz] = 8.5;
        this.age[cx][cy][cz] = 6;
      });

      // Supporting organic biospheres & organic clouds
      for (let i = 0; i < 10; i++) {
        const rx = center + Math.floor((Math.random() - 0.5) * 6);
        const ry = center + Math.floor((Math.random() - 0.5) * 6);
        const rz = center + Math.floor((Math.random() - 0.5) * 6);
        if (this.state[rx][ry][rz] === STATE_VACUUM) {
          this.state[rx][ry][rz] = (Math.random() < 0.6) ? STATE_BIOSPHERE : STATE_ORGANIC_ELEMENT;
          this.properTime[rx][ry][rz] = 4.0;
        }
      }
    } else if (presetKey === 'supernova') {
      // Massive Star Core Collapse Detonation
      this.state[center][center][center] = STATE_SUPERNOVA;
      this.distance[center][center][center] = 0.55;
      this.blastRadius[center][center][center] = 1.0;

      // Seed surrounding hydrogen and helium gas
      for (let x = center - 3; x <= center + 3; x++) {
        for (let y = center - 3; y <= center + 3; y++) {
          for (let z = center - 3; z <= center + 3; z++) {
            if (x === center && y === center && z === center) continue;
            if (Math.random() < 0.25) {
              this.state[x][y][z] = (Math.random() < 0.6) ? STATE_HYDROGEN : STATE_HELIUM;
              this.distance[x][y][z] = 2.80;
            }
          }
        }
      }
    } else if (presetKey === 'blackhole') {
      // Schwarzschild Horizon d = 0.50 Singularity with Relativistic Jets
      this.state[center][center][center] = STATE_BLACK_HOLE;
      this.distance[center][center][center] = 0.50;

      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (dx === 0 && dz === 0) continue;
          if (Math.random() < 0.40) {
            this.state[center + dx][center][center + dz] = STATE_FERMION;
            this.distance[center + dx][center][center + dz] = 1.80;
          }
        }
      }
    } else if (presetKey === 'cosmic_web') {
      // Filaments connecting stars, planets and civilizations across the cosmos
      for (let i = 0; i < G; i++) {
        if (Math.random() < 0.65) {
          this.state[i][i][center] = (i % 3 === 0) ? STATE_STAR : (i % 3 === 1 ? STATE_PLANETARY_SYSTEM : STATE_BIOSPHERE);
          this.distance[i][i][center] = 2.20;
        }
        if (Math.random() < 0.65) {
          const inv = G - 1 - i;
          this.state[i][center][inv] = (i % 2 === 0) ? STATE_CIVILIZATION : STATE_ORGANIC_ELEMENT;
          this.distance[i][center][inv] = 2.30;
        }
      }
    }

    this.generation = 0;
    this.cosmicTime = 0.0;
    this.step();
    this.updateTelemetry();
  }

  initUI() {
    // Inspector Mode Toggle
    const inspBtn = document.getElementById('cosmos-inspect-toggle-btn');
    if (inspBtn) {
      inspBtn.addEventListener('click', () => {
        this.viewMode = (this.viewMode === 'matrix') ? 'inspector' : 'matrix';
        const isInsp = (this.viewMode === 'inspector');
        inspBtn.classList.toggle('active', isInsp);
        inspBtn.querySelector('span').innerText = isInsp ? 'Macro Cosmos' : 'Inspect 36-Node Unit';
        this.macroGroup.visible = !isInsp;
        this.inspectorGroup.visible = isInsp;
        if (this.inspectorBadge) this.inspectorBadge.style.display = isInsp ? 'block' : 'none';

        if (isInsp) {
          this.camera.position.set(0, 0, 18.0);
          this.controls.target.set(0, 0, 0);
        } else {
          this.camera.position.set(48.0, 40.0, 62.0);
          this.controls.target.set(0, 0, 0);
        }
      });
    }

    // Presets
    document.querySelectorAll('[data-cosmos-preset]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-cosmos-preset]').forEach(b => b.classList.remove('active'));
        const chip = e.currentTarget;
        chip.classList.add('active');
        const pKey = chip.getAttribute('data-cosmos-preset');
        this.loadPreset(pKey);
      });
    });

    // Speed Slider
    const speedSlider = document.getElementById('cosmos-speed-slider');
    const speedBadge = document.getElementById('cosmos-speed-badge');
    if (speedSlider) {
      speedSlider.addEventListener('input', () => {
        this.genSpeed = parseFloat(speedSlider.value);
        this.stepInterval = 1000 / this.genSpeed;
        if (speedBadge) speedBadge.innerText = `${this.genSpeed.toFixed(1)} gen/s`;
      });
    }

    // Play / Pause
    const playBtn = document.getElementById('cosmos-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.querySelector('span').innerText = this.isPlaying ? 'Pause' : 'Play';
      });
    }

    // Step 1 Gen
    const stepBtn = document.getElementById('cosmos-step-btn');
    if (stepBtn) {
      stepBtn.addEventListener('click', () => {
        this.step();
      });
    }

    // Clear Grid
    const clearBtn = document.getElementById('cosmos-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const G = this.GRID;
        for (let x = 0; x < G; x++) {
          for (let y = 0; y < G; y++) {
            for (let z = 0; z < G; z++) {
              this.state[x][y][z] = STATE_VACUUM;
              this.distance[x][y][z] = 4.40;
              this.energy[x][y][z] = 0.0;
              this.properTime[x][y][z] = 0.0;
              this.entropy[x][y][z] = 0.0;
            }
          }
        }
        this.generation = 0;
        this.cosmicTime = 0.0;
        this.updateTelemetry();
      });
    }

    // Freeze Still (Theorem 1.1 Ground State)
    const stillBtn = document.getElementById('cosmos-still-btn');
    if (stillBtn) {
      stillBtn.addEventListener('click', () => {
        this.isStill = !this.isStill;
        stillBtn.classList.toggle('active', this.isStill);
        stillBtn.querySelector('span').innerText = this.isStill ? 'Still: ON' : 'Freeze Still';
        if (this.isStill) {
          const G = this.GRID;
          for (let x = 0; x < G; x++) {
            for (let y = 0; y < G; y++) {
              for (let z = 0; z < G; z++) {
                this.distance[x][y][z] = 4.40;
                this.entropy[x][y][z] = 0.0;
              }
            }
          }
          this.totalEPRate = 0.0;
          this.updateTelemetry();
        }
      });
    }

    // Emit Gamma Pulse
    const gammaBtn = document.getElementById('cosmos-gamma-btn');
    if (gammaBtn) {
      gammaBtn.addEventListener('click', () => {
        const G = this.GRID;
        const center = Math.floor(G / 2);
        this.state[center][center][center] = STATE_BLACK_HOLE;
        this.distance[center][center][center] = 0.50;

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              const nx = (center + dx + G) % G;
              const ny = (center + dy + G) % G;
              const nz = (center + dz + G) % G;
              if (this.state[nx][ny][nz] !== STATE_BLACK_HOLE) {
                this.state[nx][ny][nz] = STATE_SUPERNOVA;
              }
            }
          }
        }
        this.step();
      });
    }

    // Photons Toggle
    const photonsBtn = document.getElementById('cosmos-photons-toggle-btn');
    if (photonsBtn) {
      photonsBtn.addEventListener('click', () => {
        this.showPhotons = !this.showPhotons;
        photonsBtn.classList.toggle('active', this.showPhotons);
        photonsBtn.querySelector('span').innerText = this.showPhotons ? 'Photons: ON' : 'Photons: OFF';
        if (this.photonPoints) this.photonPoints.visible = this.showPhotons;
      });
    }

    // Scaffold Toggle
    const scaffoldBtn = document.getElementById('cosmos-scaffold-btn');
    if (scaffoldBtn) {
      scaffoldBtn.addEventListener('click', () => {
        this.showScaffold = !this.showScaffold;
        scaffoldBtn.classList.toggle('active', this.showScaffold);
        if (this.scaffoldGroup) this.scaffoldGroup.visible = this.showScaffold;
      });
    }

    // Reset Camera
    const resetBtn = document.getElementById('cosmos-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.camera.position.set(48.0, 40.0, 62.0);
        this.controls.target.set(0, 0, 0);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 10. Live HUD Telemetry Updates
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const elGen = document.getElementById('cosmos-telemetry-gen');
    const elEP = document.getElementById('cosmos-telemetry-ep');
    const elEntropy = document.getElementById('cosmos-telemetry-entropy');
    const elStars = document.getElementById('cosmos-telemetry-stars');
    const elElements = document.getElementById('cosmos-telemetry-elements');
    const elCiv = document.getElementById('cosmos-telemetry-civ');
    const elSN = document.getElementById('cosmos-telemetry-sn');
    const elBH = document.getElementById('cosmos-telemetry-bh');
    const elFlux = document.getElementById('cosmos-telemetry-flux');
    const elPhotons = document.getElementById('cosmos-telemetry-photons');
    const elBadge = document.getElementById('cosmos-state-badge');

    if (elGen) elGen.innerText = `${this.cosmicTime.toFixed(2)} Myr (Gen ${this.generation})`;
    if (elEP) elEP.innerText = `${this.totalEPRate.toFixed(4)} bits/Myr`;
    if (elEntropy) elEntropy.innerText = `${this.totalEntropy.toFixed(2)} nats`;
    if (elStars) elStars.innerText = `${this.counts.totalUnits} Units`;

    if (elElements) {
      elElements.innerText = `${this.counts.hydrogen} H • ${this.counts.helium} He • ${this.counts.organic} Org`;
    }

    if (elCiv) {
      elCiv.innerText = `${this.counts.stars} Stars • ${this.counts.planets} Planets • ${this.counts.civilizations} Civ`;
    }

    if (elSN) elSN.innerText = `${this.counts.supernovae} Detonations`;
    if (elBH) elBH.innerText = `${this.counts.blackHoles} Singularities`;
    if (elFlux) elFlux.innerText = `∇•J = ${this.energyFlux.toFixed(2)}`;
    if (elPhotons) elPhotons.innerText = `${this.photonsTrappedTotal} Rays Trapped`;

    if (elBadge) {
      if (this.counts.civilizations > 0) {
        elBadge.innerText = 'KARDASHEV CIVILIZATION ERA';
        elBadge.className = 'telemetry-badge badge-civ';
      } else if (this.counts.biospheres > 0) {
        elBadge.innerText = 'ORGANIC BIOSPHERE ERA';
        elBadge.className = 'telemetry-badge badge-biosphere';
      } else if (this.counts.stars > 0) {
        elBadge.innerText = 'STELLAR FUSION ERA';
        elBadge.className = 'telemetry-badge badge-star';
      } else if (this.counts.blackHoles > 0) {
        elBadge.innerText = 'SINGULARITY RELATIVISTIC HORIZON';
        elBadge.className = 'telemetry-badge badge-blackhole';
      } else if (this.counts.hydrogen > 0 || this.counts.helium > 0) {
        elBadge.innerText = 'ATOMIC NUCLEOSYNTHESIS';
        elBadge.className = 'telemetry-badge badge-hydrogen';
      } else {
        elBadge.innerText = 'PRIMORDIAL INFLATION';
        elBadge.className = 'telemetry-badge badge-inflation';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 11. Main Animation & Render Loop (60 FPS)
  // --------------------------------------------------------------------------
  animate() {
    this.animId = requestAnimationFrame(() => this.animate());
    if (!this.isVisible) return;

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
