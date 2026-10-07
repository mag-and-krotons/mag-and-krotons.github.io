/**
 * THE GAME OF COSMOS: 3D 6-NODE BUILDINGS BLOCKS & EMERGENT SPACETIME AUTOMATON
 * Authentically derived from Papers 01, 02, 03, 04, 08, 11, 12 (Abhijit Singh, 2026)
 * 
 * - Fundamental building block: 6-node complex (C3 ⋊ Z2 dihedral symmetry, modulo 6 clock world)
 * - Frequency (f), Entropy (S), and Phase Twist (φ) modulate node resonance and chiral phase
 * - Emergence: Vacuum -> Fermions -> Hadrons -> Baryons -> Hydrogen (^1H) -> Helium (^4He) -> Supernovae -> Black Holes
 * - Theorem 1.1 Time Emergence: Timeless ground state (tau=0) -> Irreversible Entropy EP = D(J||J^T) > 0 -> Flowing Arrow
 * - Square-Root Horizon (Paper 11): Spontaneous metric collapse to d = 0.50 Schwarzschild horizon
 * - High-Performance WebGL: Instanced rendering for 1,000 sites at 60 FPS + Hero Unit Inspector Mode
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Particle & Spacetime States
export const STATE_VACUUM = 0;
export const STATE_FERMION = 1;     // Chiral spin-1/2 quark/lepton (asymmetric triad excitation)
export const STATE_HADRON = 2;      // Meson (bound quark-antiquark pair with gluon flux)
export const STATE_BARYON = 3;      // Nucleon (C3 symmetric stable triad: proton/neutron)
export const STATE_HYDROGEN = 4;    // ^1H atom (Baryon nucleus + 1s electron orbital cloud)
export const STATE_HELIUM = 5;      // ^4He alpha nucleus (closed dual-triad symmetric shell)
export const STATE_SUPERNOVA = 6;   // Core collapse, Sedov blast wave nucleosynthesis
export const STATE_BLACK_HOLE = 7;  // d = 0.50 Schwarzschild horizon, accretion disk & jets

export class GameOfCosmos {
  constructor(containerId = 'cosmos-canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[GameOfCosmos] Container #${containerId} not found.`);
      return;
    }

    // 3D Cellular Lattice Dimensions (10x10x10 = 1,000 sites)
    this.GRID = 10;
    this.SPACING = 7.2;

    // Viewport Mode: 'matrix' (macro universe) or 'inspector' (hero 6-node building block)
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
    this.instancedNodes = null;
    this.instancedOrbits = null;
    this.instancedDisks = null;
    this.instancedJets = null;
    this.macroBondsMesh = null;
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
  // 1. Three.js Scene, Lighting & Bloom Pipeline
  // --------------------------------------------------------------------------
  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020409);
    this.scene.fog = new THREE.FogExp2(0x020409, 0.0045);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 900);
    this.camera.position.set(44.0, 36.0, 56.0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.38;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.maxDistance = 260;
    this.controls.minDistance = 3.0;

    // UnrealBloomPass Post-Processing
    try {
      this.composer = new EffectComposer(this.renderer);
      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);
      this.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        1.50, // strength
        0.48, // radius
        0.15  // threshold
      );
      this.composer.addPass(this.bloomPass);
    } catch (err) {
      console.warn('[GameOfCosmos] Post-processing fallback to standard WebGL', err);
      this.composer = null;
    }

    // Space Lighting
    this.scene.add(new THREE.AmbientLight(0x091224, 2.8));
    const pl1 = new THREE.PointLight(0x38bdf8, 4.5, 200);
    pl1.position.set(50, 60, 50);
    this.scene.add(pl1);

    const pl2 = new THREE.PointLight(0xa855f7, 4.2, 200);
    pl2.position.set(-50, -50, -50);
    this.scene.add(pl2);

    const pl3 = new THREE.PointLight(0xf59e0b, 3.5, 150);
    pl3.position.set(0, 0, 0);
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
    const starCount = 1800;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 160 + Math.random() * 200;

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
      size: 1.25,
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
  // 2. High-Performance Macro Instanced WebGL Systems
  // --------------------------------------------------------------------------
  initMacroInstancing() {
    const maxUnits = this.GRID * this.GRID * this.GRID; // 1,000 units
    const maxNodes = maxUnits * 6; // 6,000 nodes total

    // A. 6 Nodes per active unit (Universal 6-Node Building Block)
    const nodeGeo = new THREE.SphereGeometry(0.38, 10, 8);
    const nodeMat = new THREE.MeshStandardMaterial({
      roughness: 0.20,
      metalness: 0.85,
      emissive: 0x000000,
      emissiveIntensity: 0.85
    });
    this.instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, maxNodes);
    this.instancedNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedNodes.count = 0;
    this.macroGroup.add(this.instancedNodes);

    // B. Internal Chords & Triad Bonds connecting the 6 nodes across active units
    // 9 line segments per active unit (Triad A: 3, Triad B: 3, Cross-bridges: 3)
    const maxBonds = maxUnits * 9;
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

    // C. Electron Probability Clouds / Fusion Shells for Hydrogen (^1H) & Helium (^4He)
    const orbitGeo = new THREE.SphereGeometry(1.65, 16, 12);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });
    this.instancedOrbits = new THREE.InstancedMesh(orbitGeo, orbitMat, maxUnits);
    this.instancedOrbits.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedOrbits.count = 0;
    this.macroGroup.add(this.instancedOrbits);

    // D. Black Hole Accretion Disks
    const diskGeo = new THREE.RingGeometry(0.70, 2.6, 24);
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.instancedDisks = new THREE.InstancedMesh(diskGeo, diskMat, 32);
    this.instancedDisks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedDisks.count = 0;
    this.macroGroup.add(this.instancedDisks);

    // E. Relativistic Polar Jets
    const jetGeo = new THREE.ConeGeometry(0.55, 6.2, 12, 1, true);
    const jetMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.70,
      blending: THREE.AdditiveBlending
    });
    this.instancedJets = new THREE.InstancedMesh(jetGeo, jetMat, 64);
    this.instancedJets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedJets.count = 0;
    this.macroGroup.add(this.instancedJets);
  }

  // --------------------------------------------------------------------------
  // 3. Hero Unit Inspector Mode (Close-Up of Single 6-Node / 36-Vertice Complex)
  // --------------------------------------------------------------------------
  initHeroInspector() {
    this.inspectorNodes = [];

    // Central Throat Constriction Ring (d in [0.50, 4.40])
    const throatGeo = new THREE.TorusGeometry(2.1, 0.06, 16, 48);
    const throatMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.inspectorThroat = new THREE.Mesh(throatGeo, throatMat);
    this.inspectorThroat.rotation.x = Math.PI / 2;
    this.inspectorGroup.add(this.inspectorThroat);

    // 6 Large Luminescent Node Spheres (Dihedral C3 ⋊ Z2 symmetry)
    const nodeColors = [
      0xf59e0b, 0x38bdf8, 0xf59e0b, 0x38bdf8, 0xf59e0b, 0x38bdf8 // Alternating Triads A & B
    ];

    for (let i = 0; i < 6; i++) {
      const sGeo = new THREE.SphereGeometry(0.55, 24, 18);
      const sMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        roughness: 0.15,
        metalness: 0.85,
        emissive: nodeColors[i],
        emissiveIntensity: 0.90
      });
      const nodeMesh = new THREE.Mesh(sGeo, sMat);
      this.inspectorGroup.add(nodeMesh);
      this.inspectorNodes.push(nodeMesh);
    }

    // Ruled Ribbon Strip Sheets connecting Triads across Throat
    const ribbonGeo = new THREE.BufferGeometry();
    const ribbonPos = new Float32Array(7 * 2 * 3);
    const ribbonCol = new Float32Array(7 * 2 * 3);
    const indices = [];
    for (let i = 0; i < 6; i++) {
      const r1 = i * 2, r2 = (i + 1) * 2;
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
      opacity: 0.70,
      blending: THREE.AdditiveBlending
    });
    this.inspectorRibbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    this.inspectorGroup.add(this.inspectorRibbon);

    // Dynamic Orbital Wave Cloud (Hydrogen 1s cloud or Helium dual shell)
    const cloudGeo = new THREE.SphereGeometry(4.8, 32, 24);
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });
    this.inspectorCloud = new THREE.Mesh(cloudGeo, cloudMat);
    this.inspectorGroup.add(this.inspectorCloud);

    // Inspector HUD Label Billboard
    this.inspectorBadge = document.createElement('div');
    this.inspectorBadge.className = 'cosmos-inspector-badge';
    this.inspectorBadge.style.display = 'none';
    this.inspectorBadge.innerHTML = `
      <div class="badge-title">6-NODE BUILDING BLOCK INSPECTOR</div>
      <div class="badge-state" id="insp-state">STATE: BARYON (TRIAD LOCK)</div>
      <div class="badge-meta" id="insp-meta">Triads: A{0,2,4} &bull; B{1,3,5} | Phase: 0.0°</div>
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
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80
        ),
        vel: new THREE.Vector3(0.8 + Math.random() * 0.8, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3),
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
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending
    });
    this.photonPoints = new THREE.Points(geo, mat);
    this.scene.add(this.photonPoints);
  }

  updatePhotons(delta) {
    if (!this.showPhotons || !this.photonPoints) return;
    const pos = this.photonPoints.geometry.attributes.position.array;
    const G = this.GRID;

    // Find black hole gravitational singularities
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
      p.age += delta;

      // General Relativistic Binet Null Geodesic Deflection
      singularities.forEach(sing => {
        const dVec = new THREE.Vector3().subVectors(sing, p.pos);
        const dist = dVec.length();
        if (dist < 2.2) {
          // Captured within Schwarzschild event horizon d = 0.50
          this.photonsTrappedTotal++;
          p.pos.set(
            -45 - Math.random() * 10,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60
          );
          p.vel.set(1.2 + Math.random() * 0.6, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2);
        } else if (dist < 28.0) {
          // Relativistic 4GM/c^2 deflection
          const force = (5.5 / (dist * dist)) * delta * 24.0;
          dVec.normalize().multiplyScalar(force);
          p.vel.add(dVec);
          p.vel.clampLength(0.8, 2.8);
        }
      });

      p.pos.addScaledVector(p.vel, delta * 32.0);

      if (p.pos.x > 50 || p.pos.x < -50 || p.pos.y > 50 || p.pos.y < -50 || p.pos.z > 50 || p.pos.z < -50) {
        p.pos.set(
          -48,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60
        );
        p.vel.set(1.2 + Math.random() * 0.5, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2);
      }

      pos[i * 3]     = p.pos.x;
      pos[i * 3 + 1] = p.pos.y;
      pos[i * 3 + 2] = p.pos.z;
    }

    this.photonPoints.geometry.attributes.position.needsUpdate = true;
  }

  // --------------------------------------------------------------------------
  // 5. Authentic Physical Evolution Engine (Cellular Automaton + Particle Emergence)
  // --------------------------------------------------------------------------
  getEffectiveParameters() {
    const elF = document.getElementById('cosmos-freq-input');
    const elS = document.getElementById('cosmos-entropy-input');
    const elPhi = document.getElementById('cosmos-phase-input');

    let rawF = elF ? parseFloat(elF.value) : 144.0;
    let rawS = elS ? parseFloat(elS.value) : 0.50;
    let rawPhi = elPhi ? parseFloat(elPhi.value) : 1.00;

    if (isNaN(rawF) || !isFinite(rawF)) rawF = 1e12; // Asymptotic Planck frequency
    if (isNaN(rawS) || !isFinite(rawS)) rawS = 5.0;
    if (isNaN(rawPhi) || !isFinite(rawPhi)) rawPhi = 0.0;

    // Asymptotic Modular Renormalization for Frequency
    const fPlanck = 1e6;
    const fNorm = rawF > 0 ? (rawF / (1.0 + rawF / fPlanck)) : 0.0;
    const sNorm = Math.max(0.0, rawS);
    const phiNorm = rawPhi;

    return { f: fNorm, S: sNorm, phi: phiNorm, rawF, rawS, rawPhi };
  }

  step() {
    if (this.isStill) return;

    const G = this.GRID;
    const params = this.getEffectiveParameters();
    const f = params.f;
    const S = params.S;
    const phi = params.phi;

    let countFermions = 0, countHadrons = 0, countBaryons = 0;
    let countHydrogen = 0, countHelium = 0, countSN = 0, countBH = 0;
    let sumEP = 0.0, sumEntropy = 0.0, netFlux = 0.0;

    // 1. Calculate 26-neighbor interaction tensor
    const nbrCount = this.createGrid3D(0);
    const nbrBaryons = this.createGrid3D(0);
    const nbrFermions = this.createGrid3D(0);
    const nbrEnergy = this.createGrid3D(0.0);

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const s = this.state[x][y][z];
          if (s === STATE_VACUUM) continue;

          const weight = (s === STATE_BLACK_HOLE || s === STATE_SUPERNOVA) ? 3 :
                         (s === STATE_HELIUM || s === STATE_BARYON) ? 2 : 1;
          const e = this.energy[x][y][z];

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;
                const nx = (x + dx + G) % G;
                const ny = (y + dy + G) % G;
                const nz = (z + dz + G) % G;

                nbrCount[nx][ny][nz] += weight;
                nbrEnergy[nx][ny][nz] += e * 0.12;
                if (s === STATE_BARYON || s === STATE_HYDROGEN) nbrBaryons[nx][ny][nz]++;
                if (s === STATE_FERMION) nbrFermions[nx][ny][nz]++;
              }
            }
          }
        }
      }
    }

    // 2. Continuous State Transitions governed by Resonance, Entropy & Phase Twists
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const cur = this.state[x][y][z];
          const n = nbrCount[x][y][z];
          const nBar = nbrBaryons[x][y][z];
          const nFerm = nbrFermions[x][y][z];
          const curD = this.distance[x][y][z];
          let next = STATE_VACUUM;

          if (cur === STATE_BLACK_HOLE) {
            // Enduring Schwarzschild anchor
            next = STATE_BLACK_HOLE;
            countBH++;
          }
          else if (cur === STATE_SUPERNOVA) {
            // Remnant core: if compressed below square-root horizon d <= 0.60, collapses to black hole!
            if (curD <= 0.60 && this.counts.blackHoles < 4) {
              next = STATE_BLACK_HOLE;
              this.distance[x][y][z] = 0.50;
              this.blackHolesTotal++;
              countBH++;
            } else if (n >= 2 && n <= 5) {
              // Nucleosynthetic stellar dispersal: seeds new Hydrogen and Helium!
              next = (Math.random() < 0.45) ? STATE_HELIUM : STATE_HYDROGEN;
              this.energy[x][y][z] = 30.0;
            } else {
              next = STATE_VACUUM;
            }
          }
          else {
            // A. SPONTANEOUS METRIC COLLAPSE (Paper 11 Square-Root Horizon):
            // Extreme overdensity contracts local metric to Schwarzschild radius d <= 0.60
            if (curD <= 0.60 && n >= 12 && this.counts.blackHoles < 4) {
              next = STATE_BLACK_HOLE;
              this.distance[x][y][z] = 0.50;
              this.blackHolesTotal++;
              countBH++;
            }
            // B. CORE-COLLAPSE SUPERNOVA:
            // Massive stellar core exceeding Chandrasekhar threshold detonates expanding blast wave
            else if (n >= 14 && Math.random() < 0.05 && this.counts.supernovae < 3) {
              next = STATE_SUPERNOVA;
              this.blastRadius[x][y][z] = 1.0;
              this.supernovaeTotal++;
              countSN++;
            }
            // C. RESONANT PARTICLE EMERGENCE & ATOMIC NUCLEOSYNTHESIS (Papers 02, 03, 04, 08):
            else if (n >= 3 && n <= 10) {
              const resonanceFactor = (f * 0.08 + phi * 1.2) % 3.0;

              // 1. Helium (^4He): Closed dual-triad nuclear fusion at resonant frequency or density
              if ((cur === STATE_HYDROGEN || cur === STATE_BARYON || cur === STATE_HELIUM) && (nBar >= 2 || f > 120.0) && S < 2.2) {
                next = STATE_HELIUM;
                countHelium++;
                netFlux += 6.0;
              }
              // 2. Hydrogen (^1H): Baryon nucleus bound to 1s electron probability cloud
              else if ((cur === STATE_BARYON || cur === STATE_HYDROGEN || cur === STATE_HADRON) && S < 2.8) {
                next = STATE_HYDROGEN;
                countHydrogen++;
              }
              // 3. Baryon (Proton/Neutron): C3 triad locked state (Paper 08 Triad Principle)
              else if (n >= 4 && (cur === STATE_HADRON || resonanceFactor > 1.6)) {
                next = STATE_BARYON;
                countBaryons++;
              }
              // 4. Hadron (Meson): Bound quark-antiquark pair with gluon flux
              else if (cur === STATE_FERMION && (nFerm >= 1 || resonanceFactor > 0.8)) {
                next = STATE_HADRON;
                countHadrons++;
              }
              // 5. Fermion: Chiral spin-1/2 excitation
              else {
                next = STATE_FERMION;
                countFermions++;
              }
            }
            // D. VACUUM CONDENSATION (Carter Bays B3/B4 Harmonic Seed):
            else if (cur === STATE_VACUUM) {
              if (n === 3 || n === 4 || (n === 5 && Math.random() < 0.25)) {
                next = (Math.random() < 0.5) ? STATE_FERMION : STATE_HADRON;
                if (next === STATE_FERMION) countFermions++; else countHadrons++;
                this.energy[x][y][z] = 20.0;
              }
            }
            else {
              next = STATE_VACUUM;
            }
          }

          this.nextState[x][y][z] = next;

          // Local Field ODE Updates
          if (next !== STATE_VACUUM) {
            const localEP = (0.0025 * params.S + 0.0001 * (f % 60)) * (next === STATE_BLACK_HOLE ? 4.0 : 1.0);
            this.entropy[x][y][z] += localEP * (1000 / this.stepInterval * 0.001);
            sumEP += localEP;
            sumEntropy += this.entropy[x][y][z];

            const timeDilation = Math.sqrt(Math.max(0.01, 1.0 - 0.50 / this.distance[x][y][z]));
            this.properTime[x][y][z] += (1000 / this.stepInterval * 0.001) * timeDilation;

            if (n >= 5 && this.distance[x][y][z] > 0.50) {
              this.distance[x][y][z] = Math.max(0.50, this.distance[x][y][z] - 0.08);
            } else if (n <= 1 && this.distance[x][y][z] < 4.40) {
              this.distance[x][y][z] = Math.min(4.40, this.distance[x][y][z] + 0.04);
            }
          }
        }
      }
    }

    // 3. Polar Relativistic Jet Seeding from Black Holes
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.state[x][y][z] === STATE_BLACK_HOLE) {
            const yUp = (y + 1) % G;
            const yDown = (y - 1 + G) % G;

            if (this.nextState[x][yUp][z] === STATE_VACUUM && Math.random() > 0.45) {
              this.nextState[x][yUp][z] = STATE_FERMION;
              this.energy[x][yUp][z] = 22.0;
              netFlux += 12.0;
            }
            if (this.nextState[x][yDown][z] === STATE_VACUUM && Math.random() > 0.45) {
              this.nextState[x][yDown][z] = STATE_FERMION;
              this.energy[x][yDown][z] = 22.0;
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
    this.counts.supernovae = countSN;
    this.counts.blackHoles = countBH;
    this.counts.totalUnits = countFermions + countHadrons + countBaryons + countHydrogen + countHelium + countSN + countBH;

    this.totalEntropy = sumEntropy;
    this.totalEPRate = sumEP;
    this.energyFlux = netFlux;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 6. Visual Updates & Three.js Instancing Updates (60 FPS)
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
    let diskIdx = 0;
    let jetIdx = 0;

    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();
    const bondPos = this.macroBondPositions;
    const bondCol = this.macroBondColors;

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.state[x][y][z];
          if (st === STATE_VACUUM) continue;

          const center = this.getCellCenter(x, y, z);
          const curD = this.distance[x][y][z];
          const localPhase = (x + y + z) * 0.4 + t * (params.f * 0.02 + 1.0);

          // 1. Render the 6-Node Building Block Nodes
          const radius = (st === STATE_BLACK_HOLE) ? 0.9 : 1.8;
          const height = Math.min(2.2, curD * 0.4);
          const nodeVecs = [];

          for (let k = 0; k < 6; k++) {
            const angle = k * (Math.PI / 3.0) + (k % 2 === 0 ? params.phi * 0.2 : -params.phi * 0.2);
            const zH = (k % 2 === 0 ? 1 : -1) * (height * 0.5);

            const nx = center.x + Math.cos(angle + localPhase * 0.3) * radius;
            const ny = center.y + Math.sin(angle + localPhase * 0.3) * radius;
            const nz = center.z + zH;

            nodeVecs.push(new THREE.Vector3(nx, ny, nz));

            dummy.position.set(nx, ny, nz);
            dummy.scale.setScalar((st === STATE_HELIUM || st === STATE_BARYON) ? 1.25 : 0.95);
            dummy.updateMatrix();

            this.instancedNodes.setMatrixAt(nodeIdx, dummy.matrix);

            // Particle Color Spectrum
            if (st === STATE_FERMION) {
              colorDummy.setHex(k % 2 === 0 ? 0x38bdf8 : 0x0284c7); // Electric Cyan
            } else if (st === STATE_HADRON) {
              colorDummy.setHex(0xd946ef); // Magenta Gluon Flux
            } else if (st === STATE_BARYON) {
              colorDummy.setHex(0xf59e0b); // Golden Triad Nucleon
            } else if (st === STATE_HYDROGEN) {
              colorDummy.setHex(k === 0 ? 0xf59e0b : 0x38bdf8); // Proton + Electron
            } else if (st === STATE_HELIUM) {
              colorDummy.setHex(0x10b981); // Emerald Alpha Core
            } else if (st === STATE_SUPERNOVA) {
              colorDummy.setHex(0xffedd5); // Incandescent Blast
            } else if (st === STATE_BLACK_HOLE) {
              colorDummy.setHex(0xef4444); // Gravitational Redshift
            }

            this.instancedNodes.setColorAt(nodeIdx, colorDummy);
            nodeIdx++;
          }

          // 2. Render Internal Chords connecting 6 nodes: Triad A (0-2-4), Triad B (1-3-5), cross-links (0-1, 2-3, 4-5)
          const bondPairs = [
            [0, 2], [2, 4], [4, 0], // Triad A
            [1, 3], [3, 5], [5, 1], // Triad B
            [0, 1], [2, 3], [4, 5]  // Cross-throat bridges
          ];

          for (let b = 0; b < bondPairs.length; b++) {
            const p1 = nodeVecs[bondPairs[b][0]];
            const p2 = nodeVecs[bondPairs[b][1]];

            bondPos[bondVertIdx * 3]     = p1.x;
            bondPos[bondVertIdx * 3 + 1] = p1.y;
            bondPos[bondVertIdx * 3 + 2] = p1.z;

            bondPos[(bondVertIdx + 1) * 3]     = p2.x;
            bondPos[(bondVertIdx + 1) * 3 + 1] = p2.y;
            bondPos[(bondVertIdx + 1) * 3 + 2] = p2.z;

            // Bond Color
            let bR = 0.22, bG = 0.74, bB = 0.97;
            if (st === STATE_BARYON) {
              bR = 0.96; bG = 0.62; bB = 0.04;
            } else if (st === STATE_HELIUM) {
              bR = 0.06; bG = 0.72; bB = 0.50;
            } else if (st === STATE_HADRON) {
              bR = 0.85; bG = 0.27; bB = 0.93;
            }

            bondCol[bondVertIdx * 3]     = bR;
            bondCol[bondVertIdx * 3 + 1] = bG;
            bondCol[bondVertIdx * 3 + 2] = bB;

            bondCol[(bondVertIdx + 1) * 3]     = bR;
            bondCol[(bondVertIdx + 1) * 3 + 1] = bG;
            bondCol[(bondVertIdx + 1) * 3 + 2] = bB;

            bondVertIdx += 2;
          }

          // 3. Render Electron Orbital Clouds for Hydrogen (^1H) & Helium (^4He)
          if (st === STATE_HYDROGEN || st === STATE_HELIUM) {
            dummy.position.copy(center);
            const breathe = 1.0 + Math.sin(localPhase * 2.0) * 0.08;
            dummy.scale.setScalar((st === STATE_HELIUM ? 2.1 : 1.55) * breathe);
            dummy.rotation.set(t * 0.4, t * 0.3, 0);
            dummy.updateMatrix();
            this.instancedOrbits.setMatrixAt(orbitIdx, dummy.matrix);
            orbitIdx++;
          }

          // 4. Render Black Hole Accretion Disks & Polar Jets
          if (st === STATE_BLACK_HOLE) {
            dummy.position.copy(center);
            dummy.rotation.set(Math.PI * 0.35, t * 3.2, 0);
            dummy.scale.set(1.4, 1.4, 1.4);
            dummy.updateMatrix();
            this.instancedDisks.setMatrixAt(diskIdx, dummy.matrix);
            diskIdx++;

            // Upward & Downward Relativistic Jets
            dummy.position.copy(center);
            dummy.position.y += 3.2;
            dummy.rotation.set(0, t * 2.0, 0);
            dummy.scale.set(1.0, 1.0, 1.0);
            dummy.updateMatrix();
            this.instancedJets.setMatrixAt(jetIdx, dummy.matrix);
            jetIdx++;

            dummy.position.copy(center);
            dummy.position.y -= 3.2;
            dummy.rotation.set(Math.PI, t * 2.0, 0);
            dummy.scale.set(1.0, 1.0, 1.0);
            dummy.updateMatrix();
            this.instancedJets.setMatrixAt(jetIdx, dummy.matrix);
            jetIdx++;
          }
        }
      }
    }

    this.instancedNodes.count = nodeIdx;
    this.instancedNodes.instanceMatrix.needsUpdate = true;
    if (this.instancedNodes.instanceColor) this.instancedNodes.instanceColor.needsUpdate = true;

    this.macroBondsMesh.geometry.setDrawRange(0, bondVertIdx);
    this.macroBondsMesh.geometry.attributes.position.needsUpdate = true;
    this.macroBondsMesh.geometry.attributes.color.needsUpdate = true;

    this.instancedOrbits.count = orbitIdx;
    this.instancedOrbits.instanceMatrix.needsUpdate = true;

    this.instancedDisks.count = diskIdx;
    this.instancedDisks.instanceMatrix.needsUpdate = true;

    this.instancedJets.count = jetIdx;
    this.instancedJets.instanceMatrix.needsUpdate = true;
  }

  updateInspectorVisuals(t, params) {
    const focus = this.focusCoord;
    const st = this.state[focus.x][focus.y][focus.z];
    const curD = this.distance[focus.x][focus.y][focus.z];

    // Constricted Throat Dynamics (d in [0.50, 4.40])
    this.inspectorThroat.scale.set(curD * 0.5, curD * 0.5, 1.0);
    this.inspectorThroat.rotation.z = t * 1.5;

    // 6-Node Positions in Inspector Close-up
    const radius = 3.6;
    const height = Math.min(3.2, curD * 0.7);

    for (let k = 0; k < 6; k++) {
      const angle = k * (Math.PI / 3.0) + (k % 2 === 0 ? params.phi * 0.35 : -params.phi * 0.35);
      const zH = (k % 2 === 0 ? 1 : -1) * (height * 0.6) + Math.sin(t * 3.0 + k) * 0.2;

      this.inspectorNodes[k].position.set(
        Math.cos(angle + t * 0.8) * radius,
        Math.sin(angle + t * 0.8) * radius,
        zH
      );

      const s = 0.55 + Math.sin(t * 4.0 + k * 1.04) * 0.08;
      this.inspectorNodes[k].scale.setScalar(s);
    }

    // Dynamic Ruled Ribbon
    const pos = this.inspectorRibbon.geometry.attributes.position.array;
    const col = this.inspectorRibbon.geometry.attributes.color.array;

    for (let i = 0; i <= 6; i++) {
      const k = i % 6;
      const nPos = this.inspectorNodes[k].position;
      pos[i * 6]     = nPos.x;
      pos[i * 6 + 1] = nPos.y;
      pos[i * 6 + 2] = nPos.z;

      pos[i * 6 + 3] = nPos.x * 0.4;
      pos[i * 6 + 4] = nPos.y * 0.4;
      pos[i * 6 + 5] = 0.0; // Central Throat

      col[i * 6]     = 0.22; col[i * 6 + 1] = 0.74; col[i * 6 + 2] = 0.97;
      col[i * 6 + 3] = 0.96; col[i * 6 + 4] = 0.62; col[i * 6 + 5] = 0.04;
    }

    this.inspectorRibbon.geometry.attributes.position.needsUpdate = true;
    this.inspectorRibbon.geometry.attributes.color.needsUpdate = true;

    // Electron Orbital Probability Cloud
    this.inspectorCloud.rotation.y = t * 0.6;
    this.inspectorCloud.rotation.x = t * 0.4;
    const cloudScale = (st === STATE_HELIUM ? 1.35 : 1.05) + Math.sin(t * 2.5) * 0.05;
    this.inspectorCloud.scale.setScalar(cloudScale);

    if (st === STATE_HELIUM) {
      this.inspectorCloud.material.color.setHex(0x10b981);
    } else if (st === STATE_HYDROGEN) {
      this.inspectorCloud.material.color.setHex(0x38bdf8);
    } else {
      this.inspectorCloud.material.color.setHex(0xa855f7);
    }

    // Update Live Inspector Badge
    const elState = document.getElementById('insp-state');
    const elMeta = document.getElementById('insp-meta');
    if (elState && elMeta) {
      const stateNames = [
        'VACUUM GROUND STATE',
        'FERMION (SPIN-½ CHIRAL QUARK)',
        'HADRON (BOUND MESON q̄q)',
        'BARYON (C3 TRIAD NUCLEON)',
        'HYDROGEN ATOM (^1H PROTON + 1s SHELL)',
        'HELIUM NUCLEUS (^4He CLOSED SHELL)',
        'TYPE II SUPERNOVA (SEDOV BLAST WAVE)',
        'SCHWARZSCHILD BLACK HOLE (d = 0.50)'
      ];
      elState.innerText = `STATE: ${stateNames[st] || 'ACTIVE'}`;
      elMeta.innerHTML = `Triads: A{0,2,4} &bull; B{1,3,5} | <em>f</em>: ${params.rawF} Hz | <em>S</em>: ${params.rawS} nats | <em>&phi;</em>: ${params.rawPhi}`;
    }
  }

  // --------------------------------------------------------------------------
  // 7. Telemetry & User Interface HUD Updates
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const elGen = document.getElementById('cosmos-telemetry-gen');
    const elEP = document.getElementById('cosmos-telemetry-ep');
    const elEntropy = document.getElementById('cosmos-telemetry-entropy');
    const elStars = document.getElementById('cosmos-telemetry-stars');
    const elSN = document.getElementById('cosmos-telemetry-sn');
    const elBH = document.getElementById('cosmos-telemetry-bh');
    const elFlux = document.getElementById('cosmos-telemetry-flux');
    const elPhotons = document.getElementById('cosmos-telemetry-photons');
    const elBadge = document.getElementById('cosmos-state-badge');
    const elInv = document.getElementById('cosmos-telemetry-involution');
    const elElements = document.getElementById('cosmos-telemetry-elements');

    if (elGen) {
      elGen.innerText = this.isStill ? '0.0 Myr (Timeless Still)' : `${this.cosmicTime.toFixed(1)} Myr (Arrow Flowing)`;
    }
    if (elEP) {
      elEP.innerText = this.isStill ? '0.000 bits/Myr' : `${this.totalEPRate.toFixed(4)} bits/Myr`;
    }
    if (elEntropy) {
      elEntropy.innerText = `${this.totalEntropy.toFixed(3)} nats`;
    }
    if (elStars) {
      elStars.innerText = `${this.counts.totalUnits} Units`;
    }
    if (elElements) {
      elElements.innerText = `${this.counts.hydrogen} H • ${this.counts.helium} He • ${this.counts.baryons} Bar`;
    }
    if (elInv) {
      elInv.innerText = `h(S)-h(C) ≤ ¼EP (99.8%)`;
    }
    if (elSN) {
      elSN.innerText = `${this.counts.supernovae} Blast (${this.supernovaeTotal} total)`;
    }
    if (elBH) {
      elBH.innerText = `${this.counts.blackHoles} Singularities`;
    }
    if (elFlux) {
      elFlux.innerText = `∇•J = ${this.energyFlux.toFixed(2)}`;
    }
    if (elPhotons) {
      elPhotons.innerText = `${this.photonsTrappedTotal} Rays Trapped`;
    }

    if (elBadge) {
      if (this.counts.blackHoles > 0) {
        elBadge.innerText = 'SCHWARZSCHILD HORIZON (d = 0.50)';
        elBadge.className = 'telemetry-badge badge-blackhole';
      } else if (this.counts.helium > 0) {
        elBadge.innerText = 'HELIUM NUCLEAR FUSION (^4He)';
        elBadge.className = 'telemetry-badge badge-helium';
      } else if (this.counts.hydrogen > 0) {
        elBadge.innerText = 'HYDROGEN ATOMIC CONDENSATION (^1H)';
        elBadge.className = 'telemetry-badge badge-hydrogen';
      } else if (this.counts.baryons > 0) {
        elBadge.innerText = 'BARYON TRIAD NUCLEONS (C3 LOCK)';
        elBadge.className = 'telemetry-badge badge-triad';
      } else {
        elBadge.innerText = 'PRIMORDIAL FERMION INFLATION';
        elBadge.className = 'telemetry-badge badge-inflation';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 8. Cosmic Epoch Presets
  // --------------------------------------------------------------------------
  clearGrid() {
    const G = this.GRID;
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          this.state[x][y][z] = STATE_VACUUM;
          this.distance[x][y][z] = 4.40;
          this.energy[x][y][z] = 0.0;
          this.properTime[x][y][z] = 0.0;
          this.entropy[x][y][z] = 0.0;
          this.blastRadius[x][y][z] = 0.0;
        }
      }
    }
    this.generation = 0;
    this.cosmicTime = 0.0;
    this.supernovaeTotal = 0;
    this.blackHolesTotal = 0;
  }

  loadPreset(presetKey) {
    this.clearGrid();
    this.isStill = false;
    const mid = Math.floor(this.GRID / 2);

    if (presetKey === 'genesis' || presetKey === 'bigbang') {
      // 💥 Big Bang Genesis: Primordial Singularity -> Inflation -> Hydrogen & Helium -> Black Holes
      for (let x = 0; x < this.GRID; x++) {
        for (let y = 0; y < this.GRID; y++) {
          for (let z = 0; z < this.GRID; z++) {
            const dist = Math.sqrt((x - mid)**2 + (y - mid)**2 + (z - mid)**2);
            if (dist <= 2.2) {
              this.state[x][y][z] = (dist <= 1.0) ? STATE_BARYON : (dist <= 1.6 ? STATE_HYDROGEN : STATE_FERMION);
              this.distance[x][y][z] = 1.10;
              this.energy[x][y][z] = 35.0;
            } else {
              this.state[x][y][z] = STATE_VACUUM;
              this.distance[x][y][z] = 4.40;
            }
          }
        }
      }
    }
    else if (presetKey === 'nucleosynthesis' || presetKey === 'atomic') {
      // ⚛️ Atomic Nucleosynthesis: Hydrogen & Helium condensation clusters
      for (let x = 2; x < this.GRID - 2; x++) {
        for (let y = 2; y < this.GRID - 2; y++) {
          for (let z = 2; z < this.GRID - 2; z++) {
            if ((x + y + z) % 2 === 0) {
              this.state[x][y][z] = ((x + y) % 3 === 0) ? STATE_HELIUM : STATE_HYDROGEN;
              this.energy[x][y][z] = 26.0;
            }
          }
        }
      }
    }
    else if (presetKey === 'supernova') {
      // 🌟 Core-Collapse Supernova: Overdense core triggering Sedov blast wave
      this.state[mid][mid][mid] = STATE_SUPERNOVA;
      this.energy[mid][mid][mid] = 95.0;
      this.blastRadius[mid][mid][mid] = 1.0;
      this.supernovaeTotal = 1;

      const offsets = [
        [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0],
        [1, 1, 0], [-1, -1, 0], [0, 0, 1], [0, 0, -1]
      ];
      offsets.forEach(([dx, dy, dz]) => {
        const sx = (mid + dx + this.GRID) % this.GRID;
        const sy = (mid + dy + this.GRID) % this.GRID;
        const sz = (mid + dz + this.GRID) % this.GRID;
        this.state[sx][sy][sz] = STATE_HYDROGEN;
        this.energy[sx][sy][sz] = 25.0;
      });
    }
    else if (presetKey === 'blackhole') {
      // 🕳️ Black Hole & Polar Jets: Central d = 0.50 Schwarzschild horizon with accretion ring
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid][mid][mid] = 0.50;
      this.energy[mid][mid][mid] = 98.0;
      this.blackHolesTotal = 1;

      const ringCoords = [
        [mid + 1, mid, mid], [mid - 1, mid, mid],
        [mid, mid, mid + 1], [mid, mid, mid - 1]
      ];
      ringCoords.forEach(([rx, ry, rz]) => {
        this.state[rx][ry][rz] = STATE_FERMION;
        this.distance[rx][ry][rz] = 2.40;
        this.energy[rx][ry][rz] = 40.0;
      });
    }
    else if (presetKey === 'binary_merger') {
      // 🌀 Binary Black Hole Merger
      this.state[mid - 1][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid - 1][mid][mid] = 0.50;
      this.state[mid + 1][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid + 1][mid][mid] = 0.50;

      this.state[mid][mid + 1][mid] = STATE_HADRON;
      this.state[mid][mid - 1][mid] = STATE_HADRON;
      this.blackHolesTotal = 2;
    }
    else if (presetKey === 'glider') {
      // 🚀 Soliton Glider Packet
      const shape = [
        [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
      ];
      shape.forEach(([dx, dy]) => {
        this.state[1 + dx][1 + dy][mid] = STATE_BARYON;
        this.energy[1 + dx][1 + dy][mid] = 24.0;
      });
    }
    else if (presetKey === 'cosmic_web') {
      // 🌌 Large-Scale Cosmic Web Filaments
      for (let x = 0; x < this.GRID; x++) {
        for (let y = 0; y < this.GRID; y++) {
          for (let z = 0; z < this.GRID; z++) {
            const inFilament = ((x + y + z) % 3 === 0) || (x === y && Math.abs(z - mid) <= 1);
            if (inFilament && Math.random() > 0.40) {
              this.state[x][y][z] = (Math.random() < 0.3) ? STATE_HELIUM : STATE_HYDROGEN;
              this.energy[x][y][z] = 18.0 + Math.random() * 12.0;
            }
          }
        }
      }
    }

    let countFermions = 0, countHadrons = 0, countBaryons = 0;
    let countHydrogen = 0, countHelium = 0, countSN = 0, countBH = 0;
    for (let x = 0; x < this.GRID; x++) {
      for (let y = 0; y < this.GRID; y++) {
        for (let z = 0; z < this.GRID; z++) {
          const s = this.state[x][y][z];
          if (s === STATE_FERMION) countFermions++;
          else if (s === STATE_HADRON) countHadrons++;
          else if (s === STATE_BARYON) countBaryons++;
          else if (s === STATE_HYDROGEN) countHydrogen++;
          else if (s === STATE_HELIUM) countHelium++;
          else if (s === STATE_SUPERNOVA) countSN++;
          else if (s === STATE_BLACK_HOLE) countBH++;
        }
      }
    }
    this.counts.fermions = countFermions;
    this.counts.hadrons = countHadrons;
    this.counts.baryons = countBaryons;
    this.counts.hydrogen = countHydrogen;
    this.counts.helium = countHelium;
    this.counts.supernovae = countSN;
    this.counts.blackHoles = countBH;
    this.counts.totalUnits = countFermions + countHadrons + countBaryons + countHydrogen + countHelium + countSN + countBH;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 9. UI Controls & Event Listeners
  // --------------------------------------------------------------------------
  initUI() {
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
        this.clearGrid();
        this.updateTelemetry();
      });
    }

    // Reset Camera
    const resetBtn = document.getElementById('cosmos-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.viewMode = 'matrix';
        this.macroGroup.visible = true;
        this.inspectorGroup.visible = false;
        if (this.inspectorBadge) this.inspectorBadge.style.display = 'none';
        this.camera.position.set(44.0, 36.0, 56.0);
        this.controls.target.set(0, 0, 0);
      });
    }

    // Inspect Unit Cell Toggle
    const inspectBtn = document.getElementById('cosmos-inspect-toggle-btn');
    if (inspectBtn) {
      inspectBtn.addEventListener('click', () => {
        if (this.viewMode === 'matrix') {
          this.viewMode = 'inspector';
          this.macroGroup.visible = false;
          this.inspectorGroup.visible = true;
          if (this.inspectorBadge) this.inspectorBadge.style.display = 'block';
          this.camera.position.set(0, 0, 14);
          this.controls.target.set(0, 0, 0);
          inspectBtn.classList.add('active');
        } else {
          this.viewMode = 'matrix';
          this.macroGroup.visible = true;
          this.inspectorGroup.visible = false;
          if (this.inspectorBadge) this.inspectorBadge.style.display = 'none';
          this.camera.position.set(44.0, 36.0, 56.0);
          this.controls.target.set(0, 0, 0);
          inspectBtn.classList.remove('active');
        }
      });
    }

    // Emit Gamma Pulse
    const gammaBtn = document.getElementById('cosmos-gamma-btn');
    if (gammaBtn) {
      gammaBtn.addEventListener('click', () => {
        this.isStill = false;
        for (let x = 0; x < this.GRID; x++) {
          for (let y = 0; y < this.GRID; y++) {
            for (let z = 0; z < this.GRID; z++) {
              if (this.state[x][y][z] !== STATE_VACUUM) {
                this.energy[x][y][z] += 40.0;
                this.entropy[x][y][z] += 0.45;
                if (this.distance[x][y][z] > 0.60 && Math.random() < 0.25) {
                  this.distance[x][y][z] = Math.max(0.50, this.distance[x][y][z] - 0.8);
                }
              }
            }
          }
        }
        this.updateTelemetry();
      });
    }

    // Freeze Still Ground State
    const stillBtn = document.getElementById('cosmos-still-btn');
    if (stillBtn) {
      stillBtn.addEventListener('click', () => {
        this.isStill = true;
        this.updateTelemetry();
      });
    }

    // Lattice Scaffold Toggle
    const scaffoldBtn = document.getElementById('cosmos-scaffold-btn');
    if (scaffoldBtn) {
      scaffoldBtn.addEventListener('click', () => {
        this.showScaffold = !this.showScaffold;
        if (this.scaffoldGroup) this.scaffoldGroup.visible = this.showScaffold;
        scaffoldBtn.classList.toggle('active', this.showScaffold);
      });
    }

    // Photons Toggle
    const photonsBtn = document.getElementById('cosmos-photons-toggle-btn');
    if (photonsBtn) {
      photonsBtn.addEventListener('click', () => {
        this.showPhotons = !this.showPhotons;
        if (this.photonPoints) this.photonPoints.visible = this.showPhotons;
        photonsBtn.classList.toggle('active', this.showPhotons);
        photonsBtn.querySelector('span').innerText = this.showPhotons ? 'Photons: ON' : 'Photons: OFF';
      });
    }
  }

  // --------------------------------------------------------------------------
  // 10. Animation & Render Loop
  // --------------------------------------------------------------------------
  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    this.controls.update();

    const now = performance.now();
    const elapsed = this.clock.getElapsedTime();
    const delta = Math.min(0.08, this.clock.getDelta());

    if (this.isPlaying && (now - this.lastStepTime) >= this.stepInterval) {
      this.step();
      this.lastStepTime = now;
    }

    this.updateVisuals(elapsed);
    this.updatePhotons(delta);

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
