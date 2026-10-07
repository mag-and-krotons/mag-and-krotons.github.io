/**
 * THE GAME OF COSMOS: 3D 36-VERTICE STRING & STRIP CELLULAR AUTOMATON
 * Authentically derived from Papers 02 & 11 (Abhijit Singh, 2026)
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export const STATE_VACUUM = 0;
export const STATE_ALIVE_36 = 1;
export const STATE_SUPERNOVA = 2;
export const STATE_BLACK_HOLE = 3;
export const STATE_FERMION = 4;
export const STATE_BARYON = 5;
export const STATE_HADRON = 6;
export const STATE_HYDROGEN = 7;
export const STATE_HELIUM = 8;

export class GameOfCosmos {
  constructor(containerId = 'cosmos-canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[GameOfCosmos] Container #${containerId} not found.`);
      return;
    }

    // 3D Cellular Lattice Dimensions (10x10x10 = 1000 sites)
    this.GRID = 10;
    this.LAYERS = 6;            // 6 layers x 6 vertices = 36 vertices per complex
    this.SPACING_X = 7.6;
    this.SPACING_Y = 8.6;
    this.SPACING_Z = 7.6;
    this.R_BASE = 2.40;

    // Viewport Mode: 'matrix' (macro 216 lattice) or 'inspector' (hero 36-vertice complex)
    this.viewMode = 'matrix';
    this.focusCoord = { x: 3, y: 3, z: 3 };

    // Cellular State & Continuous Field Tensors (6x6x6)
    this.state = this.createGrid3D(STATE_VACUUM);
    this.nextState = this.createGrid3D(STATE_VACUUM);
    this.distance = this.createGrid3D(4.40);       // Metric separation d in [0.50, 4.40]
    this.distanceVel = this.createGrid3D(0.0);    // d(dot)
    this.energy = this.createGrid3D(0.0);          // Local stress-energy density rho
    this.properTime = this.createGrid3D(0.0);      // Local emergent proper time tau
    this.entropy = this.createGrid3D(0.0);         // Irreversible entropy S_irr
    this.epRate = this.createGrid3D(0.0);          // EP = D(J || J^T)
    this.age = this.createGrid3D(0);
    this.blastRadius = this.createGrid3D(0.0);     // Supernova shockwave radius

    // Simulation Engine Controls
    this.generation = 0;
    this.cosmicTime = 0.0;                        // In Megayears (Myr)
    this.isPlaying = true;
    this.isStill = false;
    this.genSpeed = 2.5;                           // Generations per second
    this.stepInterval = 1000 / this.genSpeed;
    this.lastStepTime = performance.now();
    this.showScaffold = false;
    this.isVisible = true;
    this.currentRule = 'astrophysics';

    // Global Cosmological Telemetry
    this.activeUnits36 = 0;
    this.supernovaeActive = 0;
    this.supernovaeTotal = 0;
    this.blackHolesActive = 0;
    this.blackHolesTotal = 0;
    this.totalEntropy = 0.0;
    this.totalEPRate = 0.0;
    this.energyFlux = 0.0;

    // Null Geodesic Photon Stream & Light Pulling
    this.showPhotons = true;
    this.maxPhotons = 80;
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
    this.hoverCoord = null;
    this.animId = null;

    // Visual Mesh Assets
    this.mainGroup = null;
    this.scaffoldGroup = null;
    this.hoverReticle = null;
    this.unitVisuals = []; // 6x6x6 cache of procedural 36-vertice meshes
    this.photonPoints = null;

    // Initialize System
    this.initThree();
    this.initScaffold();
    this.initHoverReticle();
    this.initMatrixMeshes();
    this.initPhotonStream();
    this.initUI();
    this.loadPreset('genesis');
    this.animate();

    window.cosmosInstance = this;
    console.log('[GameOfCosmos] Perfected 36-Vertice String & Strip Cosmos v10 Initialized.');
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

  // --------------------------------------------------------------------------
  // 1. Three.js Scene Setup, Cinematic Space Lighting, Starfield & Bloom
  // --------------------------------------------------------------------------
  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020409);
    this.scene.fog = new THREE.FogExp2(0x020409, 0.005);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 800);
    this.camera.position.set(38.0, 32.0, 48.0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.40;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.maxDistance = 240;
    this.controls.minDistance = 3.5;

    // UnrealBloomPass Post-Processing Pipeline
    try {
      this.composer = new EffectComposer(this.renderer);
      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);
      this.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        1.55, // strength
        0.50, // radius
        0.14  // threshold
      );
      this.composer.addPass(this.bloomPass);
    } catch (err) {
      console.warn('[GameOfCosmos] UnrealBloomPass failed, falling back to standard WebGL render.', err);
      this.composer = null;
    }

    // Cinematic Lighting
    this.scene.add(new THREE.AmbientLight(0x0a1128, 2.5));

    const pl1 = new THREE.PointLight(0x38bdf8, 5.5, 180);
    pl1.position.set(45, 55, 45);
    this.scene.add(pl1);

    const pl2 = new THREE.PointLight(0xa855f7, 5.0, 180);
    pl2.position.set(-45, -45, -45);
    this.scene.add(pl2);

    const pl3 = new THREE.PointLight(0xf59e0b, 3.8, 140);
    pl3.position.set(0, 0, 0);
    this.scene.add(pl3);

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    this.initDeepStarfield();

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight || 600;
    if (width <= 0 || height <= 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    if (this.composer) {
      this.composer.setSize(width, height);
    }
  }

  initDeepStarfield() {
    const starCount = 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 85 + Math.random() * 160;

      starPos[i * 3]     = rad * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = rad * Math.cos(phi);
      starPos[i * 3 + 2] = rad * Math.sin(phi) * Math.sin(theta);

      const rVal = Math.random();
      if (rVal > 0.75) {
        starCol[i * 3] = 0.98; starCol[i * 3 + 1] = 0.75; starCol[i * 3 + 2] = 0.35;
      } else if (rVal > 0.45) {
        starCol[i * 3] = 0.35; starCol[i * 3 + 1] = 0.75; starCol[i * 3 + 2] = 0.98;
      } else {
        starCol[i * 3] = 0.85; starCol[i * 3 + 1] = 0.90; starCol[i * 3 + 2] = 1.00;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    this.scene.add(starPoints);
  }

  initScaffold() {
    this.scaffoldGroup = new THREE.Group();
    const G = this.GRID;
    const boxSizeX = (G - 1) * this.SPACING_X;
    const boxSizeY = (G - 1) * this.SPACING_Y;
    const boxSizeZ = (G - 1) * this.SPACING_Z;

    const boundBox = new THREE.Box3Helper(
      new THREE.Box3(
        new THREE.Vector3(-boxSizeX * 0.5 - 2, -boxSizeY * 0.5 - 2, -boxSizeZ * 0.5 - 2),
        new THREE.Vector3(boxSizeX * 0.5 + 2, boxSizeY * 0.5 + 2, boxSizeZ * 0.5 + 2)
      ),
      0x1e293b
    );
    boundBox.material.opacity = 0.35;
    boundBox.material.transparent = true;
    this.scaffoldGroup.add(boundBox);

    const gridHelper = new THREE.GridHelper(boxSizeX + 6, G, 0x334155, 0x0f172a);
    gridHelper.position.y = -boxSizeY * 0.5 - 2;
    this.scaffoldGroup.add(gridHelper);

    this.scaffoldGroup.visible = this.showScaffold;
    this.scene.add(this.scaffoldGroup);
  }

  initHoverReticle() {
    const geo = new THREE.BoxGeometry(this.SPACING_X * 0.85, this.SPACING_Y * 0.85, this.SPACING_Z * 0.85);
    const edges = new THREE.EdgesGeometry(geo);
    const mat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    this.hoverReticle = new THREE.LineSegments(edges, mat);
    this.hoverReticle.visible = false;
    this.scene.add(this.hoverReticle);
  }

  createCircularGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)');
    grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  // --------------------------------------------------------------------------
  // 2. Construction of Authentic 36-Vertice String & Strip Complex Visuals
  // --------------------------------------------------------------------------
  getCellCenter(x, y, z) {
    const G = this.GRID;
    return new THREE.Vector3(
      (x - (G - 1) * 0.5) * this.SPACING_X,
      (y - (G - 1) * 0.5) * this.SPACING_Y,
      (z - (G - 1) * 0.5) * this.SPACING_Z
    );
  }

  initMatrixMeshes() {
    this.unitVisuals = [];
    const G = this.GRID;

    for (let x = 0; x < G; x++) {
      this.unitVisuals[x] = [];
      for (let y = 0; y < G; y++) {
        this.unitVisuals[x][y] = [];
        for (let z = 0; z < G; z++) {
          this.unitVisuals[x][y][z] = { isBuilt: false, group: null };
        }
      }
    }
  }

  buildCellVisuals(x, y, z) {
    const center = this.getCellCenter(x, y, z);
    const group = new THREE.Group();
    group.position.copy(center);
    group.visible = false;

    // A. 5 Inter-Layer Continuous Ruled Ribbon Strip Sheets S(u, v)
    const outerRibbons = [];
    const uSegs = 36;
    const vSegs = 6;
    const vCount = (uSegs + 1) * (vSegs + 1);

    for (let l = 0; l < this.LAYERS - 1; l++) {
      const positions = new Float32Array(vCount * 3);
      const colors = new Float32Array(vCount * 3);
      const indices = [];

      for (let v = 0; v < vSegs; v++) {
        for (let u = 0; u < uSegs; u++) {
          const r1 = v * (uSegs + 1);
          const r2 = (v + 1) * (uSegs + 1);
          indices.push(r1 + u, r2 + u, r1 + u + 1);
          indices.push(r1 + u + 1, r2 + u, r2 + u + 1);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setIndex(indices);

      const mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.18,
        metalness: 0.65,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.82,
        blending: THREE.NormalBlending,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);
      outerRibbons.push({ mesh, geo, mat, positions, colors });
    }

    // B. 6 Closed Undulating String Loops (Connecting 6 vertices per layer = 36 vertices total)
    const stringLoops = [];
    for (let l = 0; l < this.LAYERS; l++) {
      const loopGeo = new THREE.BufferGeometry();
      const loopPos = new Float32Array(37 * 3);
      const loopCol = new Float32Array(37 * 3);
      loopGeo.setAttribute('position', new THREE.BufferAttribute(loopPos, 3));
      loopGeo.setAttribute('color', new THREE.BufferAttribute(loopCol, 3));

      const isGold = (l % 2 === 0);
      const baseCol = isGold ? new THREE.Color(0xf59e0b) : new THREE.Color(0x38bdf8);

      const loopMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        linewidth: 2.5,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });

      const lineLoop = new THREE.LineLoop(loopGeo, loopMat);
      group.add(lineLoop);
      stringLoops.push({ lineLoop, loopGeo, loopPos, loopCol, baseCol });
    }

    // C. K3,3 Bipartite Helicoid Ribbon Strips (Cross-Throat Worldsheets)
    const k33Group = new THREE.Group();
    const k33Strips = [];
    for (let c = 0; c < 18; c++) {
      const stripGeo = new THREE.BufferGeometry();
      const stripPos = new Float32Array(16 * 2 * 3);
      const stripCol = new Float32Array(16 * 2 * 3);
      const stripIndices = [];
      for (let i = 0; i < 15; i++) {
        const r1 = i * 2, r2 = (i + 1) * 2;
        stripIndices.push(r1, r2, r1 + 1);
        stripIndices.push(r1 + 1, r2, r2 + 1);
      }
      stripGeo.setAttribute('position', new THREE.BufferAttribute(stripPos, 3));
      stripGeo.setAttribute('color', new THREE.BufferAttribute(stripCol, 3));
      stripGeo.setIndex(stripIndices);

      const stripMat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const stripMesh = new THREE.Mesh(stripGeo, stripMat);
      k33Group.add(stripMesh);
      k33Strips.push({ mesh: stripMesh, geo: stripGeo, pos: stripPos, col: stripCol });
    }
    group.add(k33Group);

    // D. Relativistic Black Hole Singularity Elements (for d <= 0.52)
    // 1. Central Event Horizon Dark Shadow Sphere (rs = 0.85)
    const bhSphereGeo = new THREE.SphereGeometry(0.85, 28, 28);
    const bhSphereMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const bhSphere = new THREE.Mesh(bhSphereGeo, bhSphereMat);
    bhSphere.visible = false;
    group.add(bhSphere);

    // 2. Swirling Logarithmic Relativistic Accretion Disk (Spiral Ribbons)
    const accretionDiskGroup = new THREE.Group();
    accretionDiskGroup.visible = false;

    const diskArmCount = 2;
    const diskPtsPerArm = 32;
    for (let arm = 0; arm < diskArmCount; arm++) {
      const armGeo = new THREE.BufferGeometry();
      const armPos = new Float32Array(diskPtsPerArm * 2 * 3);
      const armCol = new Float32Array(diskPtsPerArm * 2 * 3);
      const armIndices = [];

      for (let i = 0; i < diskPtsPerArm - 1; i++) {
        const r1 = i * 2;
        const r2 = (i + 1) * 2;
        armIndices.push(r1, r2, r1 + 1);
        armIndices.push(r1 + 1, r2, r2 + 1);
      }
      armGeo.setAttribute('position', new THREE.BufferAttribute(armPos, 3));
      armGeo.setAttribute('color', new THREE.BufferAttribute(armCol, 3));
      armGeo.setIndex(armIndices);

      const armMat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.90,
        blending: THREE.AdditiveBlending
      });
      const armMesh = new THREE.Mesh(armGeo, armMat);
      accretionDiskGroup.add(armMesh);
    }
    group.add(accretionDiskGroup);

    // 3. Einstein Photon Sphere Ring (r = 1.5 rs = 1.28)
    const ringGeo = new THREE.RingGeometry(0.88, 1.48, 36);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending
    });
    const photonRing = new THREE.Mesh(ringGeo, ringMat);
    photonRing.rotation.x = Math.PI / 2;
    photonRing.visible = false;
    group.add(photonRing);

    // 4. Slender Collimated Relativistic Polar String Jets (shooting along +/- y)
    const jetGroup = new THREE.Group();
    jetGroup.visible = false;

    const jetGeo = new THREE.CylinderGeometry(0.05, 0.26, 7.5, 14, 1, true);
    const jetMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    const jetPlus = new THREE.Mesh(jetGeo, jetMat);
    jetPlus.position.y = 3.75;
    jetGroup.add(jetPlus);

    const jetMinus = new THREE.Mesh(jetGeo, jetMat);
    jetMinus.position.y = -3.75;
    jetMinus.rotation.x = Math.PI;
    jetGroup.add(jetMinus);

    group.add(jetGroup);

    // E. Supernova Volumetric Core-Collapse Shockwave Shell
    const snGroup = new THREE.Group();
    snGroup.visible = false;

    const snRing1Geo = new THREE.RingGeometry(0.8, 1.40, 36);
    const snRing1Mat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });
    const snRing1 = new THREE.Mesh(snRing1Geo, snRing1Mat);
    snRing1.rotation.x = Math.PI / 2;
    snGroup.add(snRing1);

    const snRing2Geo = new THREE.RingGeometry(0.8, 1.40, 36);
    const snRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });
    const snRing2 = new THREE.Mesh(snRing2Geo, snRing2Mat);
    snRing2.rotation.y = Math.PI / 2;
    snGroup.add(snRing2);

    const snRing3Geo = new THREE.RingGeometry(0.8, 1.40, 36);
    const snRing3Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });
    const snRing3 = new THREE.Mesh(snRing3Geo, snRing3Mat);
    snRing3.rotation.z = Math.PI / 4;
    snGroup.add(snRing3);

    group.add(snGroup);

    this.mainGroup.add(group);

    this.unitVisuals[x][y][z] = {
      isBuilt: true,
      group,
      outerRibbons,
      stringLoops,
      k33Strips,
      bhSphere,
      photonRing,
      accretionDiskGroup,
      jetGroup,
      snGroup,
      snRing1Mat,
      snRing2Mat,
      snRing3Mat
    };
  }

  // --------------------------------------------------------------------------
  // 3. Null Geodesic Photon Stream (Distributed Sparkling Light Pulling)
  // --------------------------------------------------------------------------
  initPhotonStream() {
    this.photons = [];
    this.photonsTrappedTotal = 0;
    const G = this.GRID;
    const boxSpan = (G - 1) * this.SPACING_X;

    for (let i = 0; i < this.maxPhotons; i++) {
      const ph = {
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * boxSpan * 1.6,
          (Math.random() - 0.5) * boxSpan * 0.9,
          (Math.random() - 0.5) * boxSpan * 0.9
        ),
        vel: new THREE.Vector3(12.0 + Math.random() * 4.0, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5),
        active: true,
        trapped: false,
        age: Math.random() * 5.0
      };
      this.photons.push(ph);
    }

    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(this.maxPhotons * 3);
    const pCol = new Float32Array(this.maxPhotons * 3);
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.90,
      map: this.createCircularGlowTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.photonPoints = new THREE.Points(pGeo, pMat);
    this.scene.add(this.photonPoints);
  }

  updatePhotons(delta) {
    if (!this.showPhotons) {
      if (this.photonPoints) this.photonPoints.visible = false;
      return;
    }
    if (this.photonPoints) this.photonPoints.visible = true;

    const G = this.GRID;
    const boxSpan = (G - 1) * this.SPACING_X;
    const rs = 0.85;

    // Find all active black hole singularities
    const blackHoles = [];
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.state[x][y][z] === STATE_BLACK_HOLE || this.distance[x][y][z] <= 0.52) {
            blackHoles.push(this.getCellCenter(x, y, z));
          }
        }
      }
    }

    const posAttr = this.photonPoints.geometry.attributes.position;
    const colAttr = this.photonPoints.geometry.attributes.color;

    for (let i = 0; i < this.maxPhotons; i++) {
      const ph = this.photons[i];

      if (!ph.active || ph.pos.x > boxSpan * 0.80 || Math.abs(ph.pos.y) > boxSpan * 0.90 || Math.abs(ph.pos.z) > boxSpan * 0.90) {
        ph.pos.set(
          -boxSpan * 0.75 - Math.random() * 8.0,
          (Math.random() - 0.5) * boxSpan * 0.85,
          (Math.random() - 0.5) * boxSpan * 0.85
        );
        ph.vel.set(13.5, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2);
        ph.active = true;
        ph.trapped = false;
        ph.age = 0;
      }

      // Gravitational light deflection toward Event Horizons
      if (blackHoles.length > 0) {
        for (const bhPos of blackHoles) {
          const rVec = new THREE.Vector3().subVectors(bhPos, ph.pos);
          const dist = rVec.length();

          if (dist < rs * 1.05) {
            ph.active = false;
            ph.trapped = true;
            this.photonsTrappedTotal++;
            break;
          }

          if (dist < 14.0) {
            const pullMag = (18.0 / (dist * dist)) * (1.0 + 3.0 * rs / dist);
            rVec.normalize().multiplyScalar(pullMag * delta);
            ph.vel.add(rVec);

            ph.vel.normalize().multiplyScalar(13.5);
          }
        }
      }

      ph.pos.addScaledVector(ph.vel, delta);
      ph.age += delta;

      posAttr.setXYZ(i, ph.pos.x, ph.pos.y, ph.pos.z);
      if (ph.trapped) {
        colAttr.setXYZ(i, 0, 0, 0);
      } else {
        colAttr.setXYZ(i, 0.40, 0.85, 1.0);
      }
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  }

  // --------------------------------------------------------------------------
  // 4. Mathematical Field Evolution Engine (Cellular Automaton + Relativistic ODE)
  // --------------------------------------------------------------------------
  step() {
    if (this.isStill) return;

    const G = this.GRID;
    let netFlux = 0.0;
    let count36 = 0, countSN = 0, countBH = 0;
    let sumEP = 0.0, sumEntropy = 0.0;

    // 1. Calculate 26-neighbor interaction tensor
    const nbrCount = this.createGrid3D(0);
    const nbrEnergy = this.createGrid3D(0.0);

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const s = this.state[x][y][z];
          if (s === STATE_VACUUM) continue;

          const weight = (s === STATE_ALIVE_36) ? 1 : 2;
          const e = this.energy[x][y][z];

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;
                const nx = (x + dx + G) % G;
                const ny = (y + dy + G) % G;
                const nz = (z + dz + G) % G;

                nbrCount[nx][ny][nz] += weight;
                nbrEnergy[nx][ny][nz] += e * 0.10;
              }
            }
          }
        }
      }
    }

    // 2. Cellular State Transitions & Astrophysical Condensation
    // Triad Harmonic Balance: S(3-6) / B(4-5)
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const cur = this.state[x][y][z];
          const n = nbrCount[x][y][z];
          let next = STATE_VACUUM;

          const curD = this.distance[x][y][z];

          if (cur === STATE_BLACK_HOLE) {
            // Enduring gravitational anchor
            next = STATE_BLACK_HOLE;
          }
          else if (cur === STATE_SUPERNOVA) {
            // Supernova remnant core: if metric reached 1/2 horizon point, collapses into black hole remnant!
            if (curD <= 0.60 && this.blackHolesActive < 3) {
              next = STATE_BLACK_HOLE;
              this.distance[x][y][z] = 0.50;
              this.blackHolesTotal++;
            } else if (n >= 3 && n <= 5) {
              // Disperses starburst gas seeding new active 36-vertice string complexes
              next = STATE_ALIVE_36;
              this.energy[x][y][z] = 28.0;
            } else {
              next = STATE_VACUUM;
            }
          }
          else if (cur === STATE_ALIVE_36 || cur >= STATE_FERMION) {
            // 1. SPONTANEOUS METRIC COLLAPSE TO BLACK HOLE:
            // When local metric contracts to d <= 0.60 under high core pressure (n >= 7),
            // forging an authentic Schwarzschild event horizon dynamically without manual placement!
            if (curD <= 0.60 && n >= 7 && this.blackHolesActive < 3) {
              next = STATE_BLACK_HOLE;
              this.distance[x][y][z] = 0.50;
              this.blackHolesTotal++;
            }
            // 2. CORE-COLLAPSE SUPERNOVA:
            // Overdense massive complex (n >= 7) detonates an expanding Sedov shockwave ribbon!
            else if (n >= 7 && Math.random() < 0.28) {
              next = STATE_SUPERNOVA;
              this.blastRadius[x][y][z] = 1.0;
              this.supernovaeTotal++;
            }
            // 3. CARTER BAYS S(4-6) HARMONIC BALANCE + PARTICLE EMERGENCE:
            else if (n >= 4 && n <= 6) {
              const elF = document.getElementById('cosmos-freq-input');
              const elS = document.getElementById('cosmos-entropy-input');
              const elPhi = document.getElementById('cosmos-phase-input');
              
              const f = elF ? parseFloat(elF.value) : 144.0;
              const S = elS ? parseFloat(elS.value) : 0.5;
              const phi = elPhi ? parseFloat(elPhi.value) : 1.0;
              
              const twist = Math.abs((f * S) * phi);
              
              if (twist > 1000000) {
                 next = STATE_HELIUM;
              } else if (twist >= 10000) {
                 next = STATE_HYDROGEN;
              } else if (twist >= 1000) {
                 next = STATE_HADRON;
              } else if (twist >= 100) {
                 next = STATE_BARYON;
              } else if (twist >= 10) {
                 next = STATE_FERMION;
              } else {
                 next = STATE_ALIVE_36;
              }
            }
            // 4. Underpopulation or extreme overpopulation void
            else {
              next = STATE_VACUUM;
            }
          }
          else if (cur === STATE_VACUUM) {
            // Vacuum condensation under Carter Bays B(4) or supernova shockwave or polar jet
            if (n === 4 || (n >= 3 && Math.random() < 0.16)) {
              next = STATE_ALIVE_36;
              this.energy[x][y][z] = 22.0;
            }
          }

          this.nextState[x][y][z] = next;
        }
      }
    }

    // 3. Relativistic Polar Jet Seeding from Black Holes
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.state[x][y][z] === STATE_BLACK_HOLE) {
            const yUp = (y + 1) % G;
            const yDown = (y - 1 + G) % G;

            if (this.nextState[x][yUp][z] === STATE_VACUUM && Math.random() > 0.40) {
              this.nextState[x][yUp][z] = STATE_ALIVE_36;
              this.energy[x][yUp][z] = 24.0;
              netFlux += 15.0;
            }
            if (this.nextState[x][yDown][z] === STATE_VACUUM && Math.random() > 0.40) {
              this.nextState[x][yDown][z] = STATE_ALIVE_36;
              this.energy[x][yDown][z] = 24.0;
              netFlux += 15.0;
            }
          }
        }
      }
    }

    // 4. Update Continuous Metric & Paper 02 Theorem 1.1 Entropy Fields
    const dt = 1.0;

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const nextS = this.nextState[x][y][z];
          let curD = this.distance[x][y][z];
          let velD = this.distanceVel[x][y][z];

          if (nextS === STATE_BLACK_HOLE) {
            curD = 0.50;
            velD = 0.0;
            this.energy[x][y][z] = 85.0;
            countBH++;
          }
          else if (nextS === STATE_SUPERNOVA) {
            curD = Math.max(0.55, curD - 0.45);
            this.energy[x][y][z] = 65.0;
            countSN++;
          }
          else if (nextS === STATE_ALIVE_36) {
            const nVal = nbrCount[x][y][z];
            if (nVal >= 6) {
              // High core density drives metric contraction towards the 1/2 horizon point
              curD = Math.max(0.50, curD - 0.35);
            } else {
              curD += (4.40 - curD) * 0.20;
            }
            velD *= 0.5;
            this.energy[x][y][z] = Math.max(12.0, this.energy[x][y][z] * 0.92);
            count36++;
          }
          else {
            curD += (4.40 - curD) * 0.35;
            velD = 0.0;
            this.energy[x][y][z] = Math.max(0.0, this.energy[x][y][z] - 1.5);
          }

          this.distance[x][y][z] = curD;
          this.distanceVel[x][y][z] = velD;
          this.state[x][y][z] = nextS;

          if (nextS !== STATE_VACUUM) {
            this.age[x][y][z]++;
            const rsEff = (curD <= 0.52) ? 0.85 : 0.85 * (4.40 - curD) / 3.90;
            const g00 = Math.max(0.01, 1.0 - rsEff / 1.5);
            this.properTime[x][y][z] += dt * Math.sqrt(g00);

            const curEP = 0.00686 + 0.045 * (this.energy[x][y][z] / 40.0) + 0.02 * (4.40 - curD);
            this.epRate[x][y][z] = curEP;
            this.entropy[x][y][z] += curEP * dt;

            sumEP += curEP;
            sumEntropy += this.entropy[x][y][z];
          } else {
            this.epRate[x][y][z] = 0.0;
          }
        }
      }
    }

    this.generation++;
    this.cosmicTime = this.generation * 1.0;
    this.activeUnits36 = count36;
    this.supernovaeActive = countSN;
    this.blackHolesActive = countBH;
    this.totalEntropy = sumEntropy;
    this.totalEPRate = sumEP;
    this.energyFlux = netFlux;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 5. Mesh Geometry Updates & Chiral String Undulations (Render Loop)
  // --------------------------------------------------------------------------
  updateVisuals(elapsed) {
    const G = this.GRID;
    const t = elapsed;
    const uSegs = 36;

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const uItem = this.unitVisuals[x][y][z];
          const st = this.state[x][y][z];

          if (st === STATE_VACUUM) {
            uItem.group.visible = false;
            continue;
          }

          uItem.group.visible = true;
          const curD = this.distance[x][y][z];
          const isBlackHole = (st === STATE_BLACK_HOLE || curD <= 0.52);
          const isSupernova = (st === STATE_SUPERNOVA);

          uItem.bhSphere.visible = isBlackHole;
          uItem.photonRing.visible = isBlackHole;
          uItem.accretionDiskGroup.visible = isBlackHole;
          uItem.jetGroup.visible = isBlackHole;
          uItem.snGroup.visible = isSupernova;

          if (isBlackHole) {
            uItem.photonRing.rotation.z = t * 2.5;
            uItem.jetGroup.rotation.y = t * 1.8;
            uItem.accretionDiskGroup.rotation.y = t * 3.2;

            const diskArms = uItem.accretionDiskGroup.children;
            const ptsPerArm = 32;
            for (let a = 0; a < diskArms.length; a++) {
              const armMesh = diskArms[a];
              const posA = armMesh.geometry.attributes.position;
              const colA = armMesh.geometry.attributes.color;
              const baseAngle = (a * Math.PI) + t * 4.0;

              for (let i = 0; i < ptsPerArm; i++) {
                const frac = i / (ptsPerArm - 1);
                const r = 0.90 + frac * 1.45;
                const theta = baseAngle + Math.log(r / 0.85) * 3.8;

                const innerX = r * Math.cos(theta);
                const innerZ = r * Math.sin(theta);
                const outerX = (r + 0.18) * Math.cos(theta + 0.12);
                const outerZ = (r + 0.18) * Math.sin(theta + 0.12);

                const idx1 = i * 2;
                const idx2 = i * 2 + 1;

                posA.setXYZ(idx1, innerX, 0, innerZ);
                posA.setXYZ(idx2, outerX, 0, outerZ);

                const doppler = Math.cos(theta);
                if (doppler > 0) {
                  colA.setXYZ(idx1, 0.22, 0.85, 1.0);
                  colA.setXYZ(idx2, 0.45, 0.95, 1.0);
                } else {
                  colA.setXYZ(idx1, 0.85, 0.22, 0.95);
                  colA.setXYZ(idx2, 0.65, 0.15, 0.80);
                }
              }
              posA.needsUpdate = true;
              colA.needsUpdate = true;
            }
          }

          if (isSupernova) {
            this.blastRadius[x][y][z] = Math.min(3.8, (this.blastRadius[x][y][z] || 1.0) + 0.08);
            const rB = this.blastRadius[x][y][z];
            uItem.snGroup.scale.set(rB, rB, rB);
            uItem.snGroup.rotation.y = t * 3.5;
            uItem.snGroup.rotation.x = t * 2.2;
            const opac = Math.max(0.1, 1.0 - rB / 4.2);
            uItem.snRing1Mat.opacity = opac;
            uItem.snRing2Mat.opacity = opac;
            uItem.snRing3Mat.opacity = opac;
          }

          // Compute 6-Layer Chiral Undulating String Geometry
          const heightScale = curD / 4.40;
          const layerHeights = [];
          const layerLoops = [];
          const layerVerts = [];
          const layerMids = [];

          for (let l = 0; l < this.LAYERS; l++) {
            const isInv = (l % 2 !== 0);
            const z0 = (l - 2.5) * (0.85 * heightScale);
            layerHeights.push(z0);

            const throat = (1.0 - 0.35 * Math.exp(- (z0 * z0) / (0.8 * heightScale * heightScale + 0.08)))
              * (isBlackHole ? 0.42 : 1.0);

            const wavePsi = Math.cos(t * 3.2 - l * 0.85);
            const rLayer = this.R_BASE * throat * (1.0 + (isBlackHole ? 0.08 : 0.22 * wavePsi));

            let phaseMultiplier = 1.0;
            if (st === STATE_HELIUM) phaseMultiplier = 8.0;
            else if (st === STATE_HYDROGEN) phaseMultiplier = 5.0;
            else if (st === STATE_HADRON) phaseMultiplier = 3.5;
            else if (st === STATE_BARYON) phaseMultiplier = 2.5;
            else if (st === STATE_FERMION) phaseMultiplier = 1.5;

            const chiralAngle = (isInv ? -1 : 1) * 0.35 * phaseMultiplier * Math.sin(t * 2.4 + l * 0.6);
            const baseTheta = isInv ? -Math.PI / 2 : Math.PI / 2;

            const loopPts = [];
            const vList = [];
            const mList = [];

            for (let j = 0; j < 3; j++) {
              const thetaV = baseTheta + j * (2 * Math.PI / 3) + chiralAngle;
              const vx = Math.cos(thetaV) * rLayer;
              const vz = Math.sin(thetaV) * rLayer;

              const thetaNext = baseTheta + ((j + 1) % 3) * (2 * Math.PI / 3) + chiralAngle;
              const nextVx = Math.cos(thetaNext) * rLayer;
              const nextVz = Math.sin(thetaNext) * rLayer;

              const mx = (vx + nextVx) * 0.5 * 1.15;
              const mz = (vz + nextVz) * 0.5 * 1.15;

              const ptV = new THREE.Vector3(vx, z0, vz);
              const ptM = new THREE.Vector3(mx, z0, mz);

              vList.push(ptV);
              mList.push(ptM);
              loopPts.push(ptV);
              loopPts.push(ptM);
            }

            layerVerts.push(vList);
            layerMids.push(mList);

            const curve = new THREE.CatmullRomCurve3(loopPts, true);
            const densePts = curve.getPoints(uSegs);
            layerLoops.push(densePts);

            // Update String Loop Line
            const sLoop = uItem.stringLoops[l];
            for (let p = 0; p <= uSegs; p++) {
              const pt = densePts[p % densePts.length];
              sLoop.loopPos[p * 3]     = pt.x;
              sLoop.loopPos[p * 3 + 1] = pt.y;
              sLoop.loopPos[p * 3 + 2] = pt.z;

              const phaseU = (p / uSegs + t * 0.8) % 1.0;
              const pulse = Math.sin(phaseU * Math.PI * 2) * 0.35 + 0.65;
              sLoop.loopCol[p * 3]     = sLoop.baseCol.r * pulse;
              sLoop.loopCol[p * 3 + 1] = sLoop.baseCol.g * pulse;
              sLoop.loopCol[p * 3 + 2] = sLoop.baseCol.b * pulse;
            }
            sLoop.loopGeo.attributes.position.needsUpdate = true;
            sLoop.loopGeo.attributes.color.needsUpdate = true;
          }

          // Update 5 Inter-Layer Ruled Ribbon Strip Sheets S(u, v)
          const vSegs = 6;
          for (let l = 0; l < this.LAYERS - 1; l++) {
            const rItem = uItem.outerRibbons[l];
            const pts1 = layerLoops[l];
            const pts2 = layerLoops[l + 1];
            let idx = 0;

            for (let v = 0; v <= vSegs; v++) {
              const vFrac = v / vSegs;
              for (let u = 0; u <= uSegs; u++) {
                const p1 = pts1[u % pts1.length];
                const p2 = pts2[u % pts2.length];

                const px = (1 - vFrac) * p1.x + vFrac * p2.x;
                const py = (1 - vFrac) * p1.y + vFrac * p2.y;
                const pz = (1 - vFrac) * p1.z + vFrac * p2.z;

                rItem.positions[idx * 3]     = px;
                rItem.positions[idx * 3 + 1] = py;
                rItem.positions[idx * 3 + 2] = pz;

                if (isBlackHole) {
                  rItem.colors[idx * 3]     = 0.70;
                  rItem.colors[idx * 3 + 1] = 0.25;
                  rItem.colors[idx * 3 + 2] = 0.98;
                } else if (isSupernova) {
                  rItem.colors[idx * 3]     = 0.98;
                  rItem.colors[idx * 3 + 1] = 0.35;
                  rItem.colors[idx * 3 + 2] = 0.22;
                } else if (st === STATE_HELIUM) {
                  rItem.colors[idx * 3]     = 1.0;
                  rItem.colors[idx * 3 + 1] = 0.85;
                  rItem.colors[idx * 3 + 2] = 0.2;
                } else if (st === STATE_HYDROGEN) {
                  rItem.colors[idx * 3]     = 0.2;
                  rItem.colors[idx * 3 + 1] = 0.4;
                  rItem.colors[idx * 3 + 2] = 1.0;
                } else if (st === STATE_HADRON) {
                  rItem.colors[idx * 3]     = 0.1;
                  rItem.colors[idx * 3 + 1] = 0.9;
                  rItem.colors[idx * 3 + 2] = 0.3;
                } else if (st === STATE_BARYON) {
                  rItem.colors[idx * 3]     = 0.9;
                  rItem.colors[idx * 3 + 1] = 0.1;
                  rItem.colors[idx * 3 + 2] = 0.6;
                } else if (st === STATE_FERMION) {
                  rItem.colors[idx * 3]     = 0.6;
                  rItem.colors[idx * 3 + 1] = 0.6;
                  rItem.colors[idx * 3 + 2] = 1.0;
                } else {
                  rItem.colors[idx * 3]     = 0.22 + 0.70 * (l / 5.0);
                  rItem.colors[idx * 3 + 1] = 0.74 + 0.15 * Math.sin(t * 2.0);
                  rItem.colors[idx * 3 + 2] = 0.98 - 0.75 * (l / 5.0);
                }
                idx++;
              }
            }

            rItem.geo.attributes.position.needsUpdate = true;
            rItem.geo.attributes.color.needsUpdate = true;
            rItem.geo.computeVertexNormals();
          }

          // Update K3,3 Cross-Throat Helicoid Ribbon Strips (Layer 2 <-> Layer 3)
          const lA = 2, lB = 3;
          let kIdx = 0;
          for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
              if (kIdx < uItem.k33Strips.length) {
                const pStart = layerVerts[lA][j];
                const pEnd = layerMids[lB][k];
                const sItem = uItem.k33Strips[kIdx];

                for (let step = 0; step < 16; step++) {
                  const sFrac = step / 15.0;
                  const bx = (1 - sFrac) * pStart.x + sFrac * pEnd.x;
                  const by = (1 - sFrac) * pStart.y + sFrac * pEnd.y;
                  const bz = (1 - sFrac) * pStart.z + sFrac * pEnd.z;

                  const i1 = step * 2;
                  const i2 = step * 2 + 1;
                  sItem.pos[i1 * 3]     = bx - 0.08;
                  sItem.pos[i1 * 3 + 1] = by;
                  sItem.pos[i1 * 3 + 2] = bz;

                  sItem.pos[i2 * 3]     = bx + 0.08;
                  sItem.pos[i2 * 3 + 1] = by;
                  sItem.pos[i2 * 3 + 2] = bz;

                  const pulse = Math.sin(sFrac * Math.PI + t * 3.0) * 0.4 + 0.6;
                  sItem.col[i1 * 3]     = 0.75 * pulse;
                  sItem.col[i1 * 3 + 1] = 0.45 * pulse;
                  sItem.col[i1 * 3 + 2] = 0.95 * pulse;

                  sItem.col[i2 * 3]     = 0.75 * pulse;
                  sItem.col[i2 * 3 + 1] = 0.45 * pulse;
                  sItem.col[i2 * 3 + 2] = 0.95 * pulse;
                }
                sItem.geo.attributes.position.needsUpdate = true;
                sItem.geo.attributes.color.needsUpdate = true;
                kIdx++;
              }
            }
          }
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // 6. Viewport Modes: Matrix Lattice vs. Hero Unit Spacetime Inspector
  // --------------------------------------------------------------------------
  setViewMode(mode, targetCoord = null) {
    this.viewMode = mode;
    if (targetCoord) {
      this.focusCoord = targetCoord;
    }

    if (mode === 'inspector') {
      const center = this.getCellCenter(this.focusCoord.x, this.focusCoord.y, this.focusCoord.z);
      this.controls.target.copy(center);
      this.camera.position.set(center.x + 8.0, center.y + 5.5, center.z + 9.5);
      this.controls.minDistance = 2.0;
      this.controls.maxDistance = 35.0;

      const btnToggle = document.getElementById('cosmos-inspect-toggle-btn');
      if (btnToggle) {
        btnToggle.classList.add('active');
        const span = btnToggle.querySelector('span');
        if (span) span.innerText = '🌌 View Cosmic Matrix';
      }
    } else {
      this.controls.target.set(0, 0, 0);
      this.camera.position.set(38.0, 32.0, 48.0);
      this.controls.minDistance = 8.0;
      this.controls.maxDistance = 240.0;

      const btnToggle = document.getElementById('cosmos-inspect-toggle-btn');
      if (btnToggle) {
        btnToggle.classList.remove('active');
        const span = btnToggle.querySelector('span');
        if (span) span.innerText = '🔍 Inspect Unit Cell';
      }
    }
    this.controls.update();
  }

  toggleViewMode() {
    if (this.viewMode === 'matrix') {
      let target = { x: 3, y: 3, z: 3 };
      const G = this.GRID;
      for (let x = 0; x < G; x++) {
        for (let y = 0; y < G; y++) {
          for (let z = 0; z < G; z++) {
            if (this.state[x][y][z] === STATE_BLACK_HOLE || this.state[x][y][z] === STATE_ALIVE_36) {
              target = { x, y, z };
              break;
            }
          }
        }
      }
      this.setViewMode('inspector', target);
    } else {
      this.setViewMode('matrix');
    }
  }

  // --------------------------------------------------------------------------
  // 7. Presets, Gamma Pulse Emission & Timeless Ground State Freezing
  // --------------------------------------------------------------------------
  clearGrid() {
    const G = this.GRID;
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          this.state[x][y][z] = STATE_VACUUM;
          this.distance[x][y][z] = 4.40;
          this.distanceVel[x][y][z] = 0.0;
          this.energy[x][y][z] = 0.0;
          this.properTime[x][y][z] = 0.0;
          this.entropy[x][y][z] = 0.0;
          this.epRate[x][y][z] = 0.0;
          this.age[x][y][z] = 0;
          this.blastRadius[x][y][z] = 0.0;
        }
      }
    }
    this.generation = 0;
    this.cosmicTime = 0.0;
    this.supernovaeActive = 0;
    this.blackHolesActive = 0;
    this.activeUnits36 = 0;
    this.totalEntropy = 0.0;
    this.totalEPRate = 0.0;
    this.energyFlux = 0.0;
    this.photonsTrappedTotal = 0;
    this.updateTelemetry();
  }

  freezeStillMatrix() {
    this.clearGrid();
    this.isStill = true;
    const btnStill = document.getElementById('cosmos-still-btn');
    if (btnStill) btnStill.classList.add('active');
    this.updateTelemetry();
  }

  emitGammaPulse(targetX = 3, targetY = 3, targetZ = 3) {
    this.isStill = false;
    const btnStill = document.getElementById('cosmos-still-btn');
    if (btnStill) btnStill.classList.remove('active');

    const x = Math.max(0, Math.min(this.GRID - 1, targetX));
    const y = Math.max(0, Math.min(this.GRID - 1, targetY));
    const z = Math.max(0, Math.min(this.GRID - 1, targetZ));

    // High energy gamma pulse triggers instantaneous time emergence, breaking detailed balance
    // and collapsing the local metric dynamically to d = 0.50 (Black Hole!)
    this.state[x][y][z] = STATE_BLACK_HOLE;
    this.distance[x][y][z] = 0.50;
    this.energy[x][y][z] = 95.0;
    this.properTime[x][y][z] = 1.0;
    this.epRate[x][y][z] = 0.85;
    this.entropy[x][y][z] = 0.45;

    // Seed surrounding triad cluster of active 36-vertice complexes
    const neighbors = [
      [x + 1, y, z], [x - 1, y, z],
      [x, y + 1, z], [x, y - 1, z],
      [x, y, z + 1], [x, y, z - 1]
    ];
    neighbors.forEach(([nx, ny, nz]) => {
      if (nx >= 0 && nx < this.GRID && ny >= 0 && ny < this.GRID && nz >= 0 && nz < this.GRID) {
        this.state[nx][ny][nz] = STATE_ALIVE_36;
        this.energy[nx][ny][nz] = 25.0;
        this.properTime[nx][ny][nz] = 0.5;
        this.epRate[nx][ny][nz] = 0.25;
        this.entropy[nx][ny][nz] = 0.15;
      }
    });

    this.blackHolesTotal++;
    this.updateTelemetry();
    console.log(`[GameOfCosmos] Gamma Pulse emitted at (${x}, ${y}, ${z}). Spontaneous Event Horizon forged!`);
  }

  loadPreset(presetKey) {
    this.clearGrid();
    this.isStill = false;
    const mid = Math.floor(this.GRID / 2);

    if (presetKey === 'genesis' || presetKey === 'bigbang') {
      // 💥 Big Bang Genesis: Primordial String Fluctuation (ZERO MANUAL BLACK HOLES!)
      // Symmetrical high-density primordial cluster in contracted curvature (d = 1.20)
      // Spontaneous gravitational collapse to d = 0.50 event horizon emerges dynamically!
      for (let x = 0; x < this.GRID; x++) {
        for (let y = 0; y < this.GRID; y++) {
          for (let z = 0; z < this.GRID; z++) {
            const dist = Math.sqrt((x - 2.5)**2 + (y - 2.5)**2 + (z - 2.5)**2);
            if (dist <= 1.55) {
              this.state[x][y][z] = STATE_ALIVE_36;
              this.distance[x][y][z] = 1.20; // High energy primordial curvature
              this.energy[x][y][z] = 38.0;
              this.properTime[x][y][z] = 0.5;
            } else {
              this.state[x][y][z] = STATE_VACUUM;
              this.distance[x][y][z] = 4.40;
              this.energy[x][y][z] = 0.0;
            }
          }
        }
      }
      this.blackHolesTotal = 0; // Starts with ZERO black holes - emerges from physics!
    }
    else if (presetKey === 'supernova') {
      // 🌟 Core-Collapse Supernova: Overdense cluster triggering Sedov-Taylor shockwave
      this.state[mid][mid][mid] = STATE_SUPERNOVA;
      this.blastRadius[mid][mid][mid] = 1.0;
      this.energy[mid][mid][mid] = 85.0;
      this.supernovaeTotal = 1;

      // Gas envelope
      const offsets = [
        [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0],
        [1, 1, 0], [-1, -1, 0], [0, 0, 1], [0, 0, -1]
      ];
      offsets.forEach(([dx, dy, dz]) => {
        const sx = (mid + dx + this.GRID) % this.GRID;
        const sy = (mid + dy + this.GRID) % this.GRID;
        const sz = (mid + dz + this.GRID) % this.GRID;
        this.state[sx][sy][sz] = STATE_ALIVE_36;
        this.energy[sx][sy][sz] = 22.0;
      });
    }
    else if (presetKey === 'blackhole') {
      // 🕳️ Black Hole & Polar Jets: Central Schwarzschild horizon (d = 0.50) with accretion & relativistic jets
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid][mid][mid] = 0.50;
      this.energy[mid][mid][mid] = 95.0;
      this.properTime[mid][mid][mid] = 3.5;
      this.blackHolesTotal = 1;

      const ringCoords = [
        [mid + 1, mid, mid], [mid - 1, mid, mid],
        [mid, mid, mid + 1], [mid, mid, mid - 1]
      ];
      ringCoords.forEach(([rx, ry, rz]) => {
        this.state[rx][ry][rz] = STATE_ALIVE_36;
        this.distance[rx][ry][rz] = 3.20;
        this.energy[rx][ry][rz] = 35.0;
      });
    }
    else if (presetKey === 'binary_merger') {
      // 🌀 Binary Black Hole Merger: Dual 36-vertice singularities inspiraling with quadrupole radiation
      this.state[mid - 1][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid - 1][mid][mid] = 0.50;
      this.energy[mid - 1][mid][mid] = 88.0;

      this.state[mid + 1][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid + 1][mid][mid] = 0.50;
      this.energy[mid + 1][mid][mid] = 88.0;

      this.state[mid][mid + 1][mid] = STATE_ALIVE_36;
      this.state[mid][mid - 1][mid] = STATE_ALIVE_36;
      this.state[mid][mid][mid + 1] = STATE_ALIVE_36;
      this.state[mid][mid][mid - 1] = STATE_ALIVE_36;
      this.blackHolesTotal = 2;
    }
    else if (presetKey === 'glider') {
      // 🚀 Autonomous Soliton Glider Packet: Gliding 36-vertice triad packet
      const gz = 1;
      const gliderShape = [
        [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
      ];
      gliderShape.forEach(([dx, dy]) => {
        const gx = 1 + dx;
        const gy = 1 + dy;
        this.state[gx][gy][gz] = STATE_ALIVE_36;
        this.energy[gx][gy][gz] = 24.0;
        this.properTime[gx][gy][gz] = 0.5;
      });
    }
    else if (presetKey === 'cosmic_web') {
      // 🌌 Large-Scale Cosmic Web: Filamentary network of 36-vertice string complexes
      for (let x = 0; x < this.GRID; x++) {
        for (let y = 0; y < this.GRID; y++) {
          for (let z = 0; z < this.GRID; z++) {
            const inFilament = ((x + y + z) % 3 === 0) || (x === y && Math.abs(z - mid) <= 1);
            if (inFilament && Math.random() > 0.40) {
              this.state[x][y][z] = STATE_ALIVE_36;
              this.energy[x][y][z] = 16.0 + Math.random() * 14.0;
              this.properTime[x][y][z] = Math.random() * 1.2;
            }
          }
        }
      }
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid][mid][mid] = 0.50;
      this.energy[mid][mid][mid] = 92.0;
      this.blackHolesTotal = 1;
    }

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 8. Telemetry HUD Updates
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const elGen = document.getElementById('cosmos-telemetry-gen');
    const elEP = document.getElementById('cosmos-telemetry-ep');
    const elEntropy = document.getElementById('cosmos-telemetry-entropy');
    const elUnits = document.getElementById('cosmos-telemetry-stars');
    const elSN = document.getElementById('cosmos-telemetry-sn');
    const elBH = document.getElementById('cosmos-telemetry-bh');
    const elFlux = document.getElementById('cosmos-telemetry-flux');
    const elPhotons = document.getElementById('cosmos-telemetry-photons');
    const elBadge = document.getElementById('cosmos-state-badge');

    if (elGen) {
      if (this.isStill) {
        elGen.innerText = '0.0 Myr (Timeless)';
      } else {
        elGen.innerText = `${this.cosmicTime.toFixed(1)} Myr (Gen ${this.generation})`;
      }
    }
    if (elEP) elEP.innerText = `${this.totalEPRate.toFixed(3)} bits/Myr`;
    if (elEntropy) elEntropy.innerText = `${this.totalEntropy.toFixed(2)} nats`;
    if (elUnits) elUnits.innerText = `${this.activeUnits36} Complexes`;
    if (elSN) elSN.innerText = `${this.supernovaeActive} Detonations`;
    if (elBH) elBH.innerText = `${this.blackHolesActive} Singularities`;
    if (elFlux) elFlux.innerText = `∇•J = ${this.energyFlux.toFixed(2)}`;
    if (elPhotons) elPhotons.innerText = `${this.photonsTrappedTotal} Rays Captured`;

    if (elBadge) {
      if (this.isStill) {
        elBadge.innerText = 'TIMELESS STILL REST (τ = 0, EP = 0)';
        elBadge.className = 'telemetry-badge badge-resonance';
      } else if (this.blackHolesActive >= 2) {
        elBadge.innerText = 'BINARY MERGER (QUADRUPOLE GW)';
        elBadge.className = 'telemetry-badge badge-triad';
      } else if (this.blackHolesActive >= 1) {
        elBadge.innerText = 'SCHWARZSCHILD HORIZON (d = 0.50) & JETS';
        elBadge.className = 'telemetry-badge badge-triad';
      } else if (this.supernovaeActive > 0) {
        elBadge.innerText = 'CORE-COLLAPSE SUPERNOVA BLAST';
        elBadge.className = 'telemetry-badge badge-resonance';
      } else if (this.activeUnits36 > 0) {
        elBadge.innerText = '36-VERTICE STRING SOLITON WEB';
        elBadge.className = 'telemetry-badge badge-resonance';
      } else {
        elBadge.innerText = 'QUANTUM VACUUM VOID';
        elBadge.className = 'telemetry-badge';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 9. UI Binding & 3D Interactive Raycasting
  // --------------------------------------------------------------------------
  initUI() {
    const chips = document.querySelectorAll('[data-cosmos-preset]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const pKey = chip.getAttribute('data-cosmos-preset');
        this.loadPreset(pKey);
      });
    });

    const speedSlider = document.getElementById('cosmos-speed-slider');
    const speedBadge = document.getElementById('cosmos-speed-badge');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.genSpeed = parseFloat(e.target.value);
        this.stepInterval = 1000 / this.genSpeed;
        if (speedBadge) speedBadge.innerText = `${this.genSpeed.toFixed(1)} gen/s`;
      });
    }

    const playBtn = document.getElementById('cosmos-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.classList.toggle('active', !this.isPlaying);
        const span = playBtn.querySelector('span');
        if (span) span.innerText = this.isPlaying ? 'Pause' : 'Play';
      });
    }

    const stepBtn = document.getElementById('cosmos-step-btn');
    if (stepBtn) {
      stepBtn.addEventListener('click', () => {
        this.step();
      });
    }

    const clearBtn = document.getElementById('cosmos-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearGrid();
      });
    }

    const stillBtn = document.getElementById('cosmos-still-btn');
    if (stillBtn) {
      stillBtn.addEventListener('click', () => {
        this.freezeStillMatrix();
      });
    }

    const gammaBtn = document.getElementById('cosmos-gamma-btn');
    if (gammaBtn) {
      gammaBtn.addEventListener('click', () => {
        this.emitGammaPulse(this.focusCoord.x, this.focusCoord.y, this.focusCoord.z);
      });
    }

    const scaffoldBtn = document.getElementById('cosmos-scaffold-btn');
    if (scaffoldBtn) {
      scaffoldBtn.addEventListener('click', () => {
        this.showScaffold = !this.showScaffold;
        if (this.scaffoldGroup) this.scaffoldGroup.visible = this.showScaffold;
        scaffoldBtn.classList.toggle('active', this.showScaffold);
      });
    }

    const resetBtn = document.getElementById('cosmos-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.setViewMode('matrix');
      });
    }

    const inspectBtn = document.getElementById('cosmos-inspect-toggle-btn');
    if (inspectBtn) {
      inspectBtn.addEventListener('click', () => {
        this.toggleViewMode();
      });
    }

    const photonBtn = document.getElementById('cosmos-photons-toggle-btn');
    if (photonBtn) {
      photonBtn.addEventListener('click', () => {
        this.showPhotons = !this.showPhotons;
        photonBtn.classList.toggle('active', this.showPhotons);
        const span = photonBtn.querySelector('span');
        if (span) span.innerText = this.showPhotons ? 'Photons: ON' : 'Photons: OFF';
      });
    }

    this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.container.addEventListener('click', (e) => this.onClick(e));
  }

  onMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    let closestCoord = null;
    let closestDist = Infinity;
    const G = this.GRID;

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const center = this.getCellCenter(x, y, z);
          const rayDist = this.raycaster.ray.distanceToPoint(center);
          if (rayDist < 3.2 && rayDist < closestDist) {
            closestDist = rayDist;
            closestCoord = { x, y, z };
          }
        }
      }
    }

    this.hoverCoord = closestCoord;
    if (this.hoverReticle) {
      if (closestCoord) {
        this.hoverReticle.position.copy(this.getCellCenter(closestCoord.x, closestCoord.y, closestCoord.z));
        this.hoverReticle.visible = true;
      } else {
        this.hoverReticle.visible = false;
      }
    }
  }

  onClick(e) {
    if (!this.hoverCoord) return;
    const { x, y, z } = this.hoverCoord;

    if (e.shiftKey) {
      this.emitGammaPulse(x, y, z);
      this.setViewMode('inspector', { x, y, z });
    } else {
      const cur = this.state[x][y][z];
      if (cur === STATE_VACUUM) {
        this.state[x][y][z] = STATE_ALIVE_36;
        this.energy[x][y][z] = 25.0;
        this.properTime[x][y][z] = 0.5;
      } else if (cur === STATE_ALIVE_36) {
        this.state[x][y][z] = STATE_BLACK_HOLE;
        this.distance[x][y][z] = 0.50;
      } else {
        this.state[x][y][z] = STATE_VACUUM;
        this.distance[x][y][z] = 4.40;
      }
      this.focusCoord = { x, y, z };
      this.updateTelemetry();
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

if (typeof window !== 'undefined') {
  const initCosmos = () => {
    const el = document.getElementById('cosmos-canvas-container');
    if (el && !window.cosmosInstance) {
      new GameOfCosmos('cosmos-canvas-container');
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCosmos);
  } else {
    setTimeout(initCosmos, 50);
  }
}