/**
 * THE GAME OF COSMOS: 3D 36-VERTICE STRING & STRIP CELLULAR AUTOMATON
 *
 * Fundamental Spacetime Unit:
 *   The authentic 36-vertice simplicial complex (6 layers x 6 vertices = 36 vertices),
 *   synthesized purely as continuous ruled ribbon strip sheets S(u, v) and closed
 *   bounding strings—strictly NO point sphere nodes and NO wireframe stick lines.
 *
 * Geometric & String Topology:
 *   - 6 Closed Catmull-Rom string loops bounding the layer perimeters (36 vertices total).
 *   - 5 Outer continuous ruled ribbon strip sheets S_l(u, v) = (1 - v) C_l(u) + v C_{l+1}(u) + n * Delta.
 *   - 45 Internal bipartite helicoid ribbon strips spanning alternating triads A_{l, j} <-> B_{l+1, k} (9 per transition x 5 = 45).
 *   - Metric separation d \in [0.50, 4.40]: at d = 0.50, the complex crushes into the 1/2 Event Horizon throat!
 *
 * Relativistic Astrophysical Automaton:
 *   - STATE_VACUUM (0): Unexcited vacuum ground state (invisible, E = 0).
 *   - STATE_INFLATION (1): Primordial high-energy string plasma expanding superluminally.
 *   - STATE_PROTO_36 (2): Cooling string cloud coalescing below Hagedorn temperature (T < T_H).
 *   - STATE_36_STRUCTURE (3): Stable 36-Vertice String Complex Soliton in harmonic standing-wave resonance!
 *   - STATE_SUPERNOVA (4): Chandrasekhar core collapse (M > 55) emitting Sedov-Taylor shockwaves R(t) ~ t^{2/5}.
 *   - STATE_BLACK_HOLE (5): Schwarzschild string singularity collapsed to d = 0.50 with accretion disk & polar jets.
 *   - STATE_PULSAR (6): Highly magnetized rotating string neutron star emitting beacon beams.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Automaton Spacetime States
export const STATE_VACUUM = 0;
export const STATE_INFLATION = 1;
export const STATE_PROTO_36 = 2;
export const STATE_36_STRUCTURE = 3;
export const STATE_SUPERNOVA = 4;
export const STATE_BLACK_HOLE = 5;
export const STATE_PULSAR = 6;

export class GameOfCosmos {
  constructor(containerId = 'cosmos-canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[GameOfCosmos] Container #${containerId} not found.`);
      return;
    }

    // Spacetime Lattice Dimensions (3x3x3 = 27 Unit Complexes)
    this.GRID = 3;
    this.LAYERS = 6;            // 6 layers = 36 vertices total per unit
    this.SPACING_X = 9.2;
    this.SPACING_Y = 10.0;
    this.SPACING_Z = 9.2;

    // Unit Ribbon Resolution
    this.U_SEGS = 36;           // Perimeter subdivisions around closed loop
    this.V_SEGS = 6;            // Vertical subdivisions along inter-layer sheet
    this.R_BASE = 2.45;         // Base radius of 36-vertice complex

    // Cellular Automaton Grids
    this.state = this.createGrid3D(STATE_VACUUM);
    this.nextState = this.createGrid3D(STATE_VACUUM);
    this.age = this.createGrid3D(0);
    this.mass = this.createGrid3D(0.0);
    this.energy = this.createGrid3D(0.0);
    this.distance = this.createGrid3D(4.40);
    this.blastRadius = this.createGrid3D(0.0);

    // Simulation State
    this.generation = 0;
    this.isPlaying = true;
    this.genSpeed = 3.0;        // generations per second
    this.lastStepTime = performance.now();
    this.ruleMode = 'astrophysics';
    this.showScaffold = false;  // False by default: vacuum is empty space!
    this.isVisible = true;

    // Telemetry Metrics
    this.activeUnits36 = 0;
    this.supernovaeActive = 0;
    this.supernovaeTotal = 0;
    this.blackHolesActive = 0;
    this.blackHolesTotal = 0;
    this.energyFlux = 0.0;

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();
    this.animId = null;

    // Render Assets
    this.mainGroup = null;
    this.scaffoldGroup = null;
    this.unitMeshes = [];

    // Initialize System
    this.initThree();
    this.initScaffold();
    this.initMatrixUnits();
    this.initUI();
    this.loadPreset('genesis');
    this.animate();

    window.cosmosInstance = this;
    console.log('[GameOfCosmos] 3D 36-Vertice String & Strip Matrix initialized.');
  }

  createGrid3D(initVal) {
    const G = this.GRID;
    const grid = [];
    for (let x = 0; x < G; x++) {
      grid[x] = [];
      for (let y = 0; y < G; y++) {
        grid[x][y] = [];
        for (let z = 0; z < G; z++) {
          grid[x][y][z] = initVal;
        }
      }
    }
    return grid;
  }

  // --------------------------------------------------------------------------
  // 1. Three.js Initialization & Lighting
  // --------------------------------------------------------------------------
  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020408);
    this.scene.fog = new THREE.FogExp2(0x020408, 0.009);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 500);
    this.camera.position.set(22.0, 20.0, 32.0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.maxDistance = 120;
    this.controls.minDistance = 5;

    // Ambient and Directional Spacetime Lighting
    const ambLight = new THREE.AmbientLight(0x0f172a, 1.8);
    this.scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.2);
    dirLight1.position.set(30, 40, 30);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.8);
    dirLight2.position.set(-30, -20, -30);
    this.scene.add(dirLight2);

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    // Deep cosmic background dust
    this.initBackgroundStars();

    window.addEventListener('resize', () => this.onResize());
  }

  initBackgroundStars() {
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 70 + Math.random() * 80;

      starPos[i * 3]     = rad * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = rad * Math.cos(phi);
      starPos[i * 3 + 2] = rad * Math.sin(phi) * Math.sin(theta);

      const isWarm = Math.random() > 0.6;
      starCol[i * 3]     = isWarm ? 0.98 : 0.45;
      starCol[i * 3 + 1] = isWarm ? 0.85 : 0.75;
      starCol[i * 3 + 2] = isWarm ? 0.45 : 0.98;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    this.scene.add(starPoints);
  }

  // --------------------------------------------------------------------------
  // 2. 3D Spacetime Scaffold
  // --------------------------------------------------------------------------
  initScaffold() {
    this.scaffoldGroup = new THREE.Group();
    const boundBox = new THREE.Box3Helper(
      new THREE.Box3(
        new THREE.Vector3(-this.SPACING_X * 1.5, -this.SPACING_Y * 1.5, -this.SPACING_Z * 1.5),
        new THREE.Vector3(this.SPACING_X * 1.5, this.SPACING_Y * 1.5, this.SPACING_Z * 1.5)
      ),
      0x1e293b
    );
    boundBox.material.opacity = 0.25;
    boundBox.material.transparent = true;
    this.scaffoldGroup.add(boundBox);

    this.scaffoldGroup.visible = this.showScaffold;
    this.scene.add(this.scaffoldGroup);
  }

  // --------------------------------------------------------------------------
  // 3. Construction of 36-Vertice String & Ruled Ribbon Strip Complexes
  // --------------------------------------------------------------------------
  initMatrixUnits() {
    this.unitMeshes = [];

    for (let x = 0; x < this.GRID; x++) {
      for (let y = 0; y < this.GRID; y++) {
        for (let z = 0; z < this.GRID; z++) {
          const cx = (x - 1) * this.SPACING_X;
          const cy = (y - 1) * this.SPACING_Y;
          const cz = (z - 1) * this.SPACING_Z;

          const unitGroup = new THREE.Group();
          unitGroup.position.set(cx, cy, cz);

          // A. 5 Inter-Layer Continuous Ruled Ribbon Strip Sheets (External Hyper-Toroid Boundary)
          const outerRibbons = [];
          for (let l = 0; l < this.LAYERS - 1; l++) {
            const uSegs = this.U_SEGS;
            const vSegs = this.V_SEGS;
            const vertexCount = (uSegs + 1) * (vSegs + 1);
            const positions = new Float32Array(vertexCount * 3);
            const colors = new Float32Array(vertexCount * 3);
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
            geo.setIndex(indices);
            geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const mat = new THREE.MeshPhysicalMaterial({
              vertexColors: true,
              roughness: 0.12,
              metalness: 0.1,
              transmission: 0.70,
              transparent: true,
              opacity: 0.60,
              side: THREE.DoubleSide,
              blending: THREE.AdditiveBlending,
              depthWrite: false
            });

            const rMesh = new THREE.Mesh(geo, mat);
            unitGroup.add(rMesh);
            outerRibbons.push({ mesh: rMesh, mat, geo, l1: l, l2: l + 1 });
          }

          // B. 6 Closed Bounding String Loops along Layer Perimeters (36 Vertices Total)
          const stringLoops = [];
          const LOOP_SAMPLES = 48;
          for (let l = 0; l < this.LAYERS; l++) {
            const lPos = new Float32Array((LOOP_SAMPLES + 1) * 3);
            const lCol = new Float32Array((LOOP_SAMPLES + 1) * 3);
            const lGeo = new THREE.BufferGeometry();
            lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
            lGeo.setAttribute('color', new THREE.BufferAttribute(lCol, 3));

            const lMat = new THREE.LineBasicMaterial({
              vertexColors: true,
              transparent: true,
              opacity: 0.90,
              blending: THREE.AdditiveBlending,
              linewidth: 2.0
            });
            const loopLine = new THREE.Line(lGeo, lMat);
            unitGroup.add(loopLine);
            stringLoops.push({ line: loopLine, geo: lGeo, mat: lMat, layer: l });
          }

          // C. 45 Internal Bipartite Helical Ruled Ribbon Strips (Spanning Alternating Triads Across Throat)
          // 5 inter-layer transitions x 9 bipartite chords (3x3) = 45 ribbon strips
          const TOTAL_INTERNAL_STRIPS = (this.LAYERS - 1) * 9;
          const STRIP_STEPS = 4; // Subdivisions along each internal chord
          const intVertCount = TOTAL_INTERNAL_STRIPS * (STRIP_STEPS + 1) * 2;
          const intPositions = new Float32Array(intVertCount * 3);
          const intColors = new Float32Array(intVertCount * 3);
          const intIndices = [];

          for (let s = 0; s < TOTAL_INTERNAL_STRIPS; s++) {
            const baseV = s * (STRIP_STEPS + 1) * 2;
            for (let step = 0; step < STRIP_STEPS; step++) {
              const i0 = baseV + step * 2;
              const i1 = i0 + 1;
              const i2 = baseV + (step + 1) * 2;
              const i3 = i2 + 1;
              intIndices.push(i0, i2, i1);
              intIndices.push(i1, i2, i3);
            }
          }

          const intGeo = new THREE.BufferGeometry();
          intGeo.setIndex(intIndices);
          intGeo.setAttribute('position', new THREE.BufferAttribute(intPositions, 3));
          intGeo.setAttribute('color', new THREE.BufferAttribute(intColors, 3));

          const intMat = new THREE.MeshPhysicalMaterial({
            vertexColors: true,
            roughness: 0.15,
            transmission: 0.65,
            transparent: true,
            opacity: 0.50,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          });

          const intMesh = new THREE.Mesh(intGeo, intMat);
          unitGroup.add(intMesh);

          // D. Black Hole Singularity Sub-Group (1/2 Event Horizon at d = 0.50)
          const bhGroup = new THREE.Group();

          // Central Pitch-Black Schwarzschild Horizon Shadow Void
          const shadowGeo = new THREE.SphereGeometry(0.85, 28, 28);
          const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
          bhGroup.add(shadowMesh);

          // Incandescent Swirling String Accretion Disk (Keplerian Profile)
          const diskGeo = new THREE.RingGeometry(0.95, 2.6, 48);
          diskGeo.rotateX(Math.PI / 2);
          const diskMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.92,
            blending: THREE.AdditiveBlending
          });
          const diskMesh = new THREE.Mesh(diskGeo, diskMat);
          bhGroup.add(diskMesh);

          // Relativistic Polar String Jets (Collimated plasma beams along +/- y)
          const jetTopGeo = new THREE.CylinderGeometry(0.08, 0.40, 4.6, 16);
          jetTopGeo.translate(0, 2.3, 0);
          const jetBotGeo = new THREE.CylinderGeometry(0.40, 0.08, 4.6, 16);
          jetBotGeo.translate(0, -2.3, 0);
          const jetMat = new THREE.MeshBasicMaterial({
            color: 0xa855f7,
            transparent: true,
            opacity: 0.88,
            blending: THREE.AdditiveBlending
          });
          const jetTop = new THREE.Mesh(jetTopGeo, jetMat);
          const jetBot = new THREE.Mesh(jetBotGeo, jetMat);
          bhGroup.add(jetTop);
          bhGroup.add(jetBot);

          // Photon Sphere Torus Ring at r = 1.5 rs
          const torusGeo = new THREE.TorusGeometry(1.28, 0.04, 16, 48);
          torusGeo.rotateX(Math.PI / 2);
          const torusMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.90,
            blending: THREE.AdditiveBlending
          });
          const torusMesh = new THREE.Mesh(torusGeo, torusMat);
          bhGroup.add(torusMesh);

          bhGroup.visible = false;
          unitGroup.add(bhGroup);

          // E. Supernova Detonation Blast Shell Sub-Group
          const snGroup = new THREE.Group();
          const snBlastGeo = new THREE.SphereGeometry(1.0, 32, 24);
          const snBlastMat = new THREE.MeshBasicMaterial({
            color: 0xfbbf24,
            wireframe: true,
            transparent: true,
            opacity: 0.88,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          });
          const snBlastMesh = new THREE.Mesh(snBlastGeo, snBlastMat);
          snGroup.add(snBlastMesh);

          const snRingGeo = new THREE.RingGeometry(0.85, 1.45, 48);
          snRingGeo.rotateX(Math.PI / 2);
          const snRingMat = new THREE.MeshBasicMaterial({
            color: 0xf43f5e,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
          });
          const snRingMesh = new THREE.Mesh(snRingGeo, snRingMat);
          snGroup.add(snRingMesh);

          snGroup.visible = false;
          unitGroup.add(snGroup);

          unitGroup.visible = false; // Hidden when in vacuum
          this.mainGroup.add(unitGroup);

          this.unitMeshes.push({
            group: unitGroup,
            outerRibbons,
            stringLoops,
            intMesh,
            intGeo,
            bhGroup,
            bhDisk: diskMesh,
            bhJetTop: jetTop,
            bhJetBot: jetBot,
            snGroup,
            snBlastMesh,
            snRingMesh,
            x, y, z, cx, cy, cz
          });
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. Relativistic Cosmological Automaton Engine
  // --------------------------------------------------------------------------
  countNeighbors(x, y, z) {
    const G = this.GRID;
    let nbrPlasma = 0;
    let nbrProto = 0;
    let nbr36 = 0;
    let nbrSupernovae = 0;
    let nbrBlackHoles = 0;
    let totalMass = 0;
    let activeNbrs = 0;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          const nz = z + dz;
          if (nx < 0 || nx >= G || ny < 0 || ny >= G || nz < 0 || nz >= G) continue;

          const st = this.state[nx][ny][nz];
          totalMass += this.mass[nx][ny][nz];
          if (st > STATE_VACUUM) activeNbrs++;

          if (st === STATE_INFLATION) nbrPlasma++;
          else if (st === STATE_PROTO_36) nbrProto++;
          else if (st === STATE_36_STRUCTURE) nbr36++;
          else if (st === STATE_SUPERNOVA) nbrSupernovae++;
          else if (st === STATE_BLACK_HOLE) nbrBlackHoles++;
        }
      }
    }

    return { nbrPlasma, nbrProto, nbr36, nbrSupernovae, nbrBlackHoles, totalMass, activeNbrs };
  }

  stepGeneration() {
    const G = this.GRID;
    let cur36 = 0;
    let curSN = 0;
    let curBH = 0;
    let netFlux = 0.0;

    // First Pass: Relativistic State Evolution
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.state[x][y][z];
          const curAge = this.age[x][y][z];
          const curMass = this.mass[x][y][z];
          const { nbrPlasma, nbrProto, nbr36, nbrSupernovae, nbrBlackHoles, totalMass, activeNbrs } = this.countNeighbors(x, y, z);

          let next = st;
          let newMass = curMass;
          let newD = this.distance[x][y][z];

          if (st === STATE_VACUUM) {
            // A. Cosmic Inflation Spreading (Big Bang Early Epoch)
            if (this.generation < 6 && nbrPlasma >= 1) {
              next = STATE_INFLATION;
              newMass = 28.0 + Math.random() * 12.0;
              newD = 4.40;
              netFlux += 3.5;
            }
            // B. Supernova Sedov Blast Wave Trigger: Shockwave compresses vacuum strings into proto-36 clouds!
            else if (nbrSupernovae > 0) {
              next = STATE_PROTO_36;
              newMass = 22.0 + Math.random() * 14.0;
              newD = 4.40;
              netFlux += 2.5;
            }
            // C. Black Hole Polar Jet Ionization along vertical axis
            else if (nbrBlackHoles > 0 && Math.random() < 0.20) {
              next = STATE_PROTO_36;
              newMass = 18.0;
              newD = 4.40;
              netFlux += 1.8;
            }
          }
          else if (st === STATE_INFLATION) {
            // Inflationary expansion cooling below Hagedorn temperature
            if (this.generation < 3 && activeNbrs < 3) {
              next = STATE_INFLATION;
            } else if (curAge >= 2) {
              // String plasma condenses into proto-36 vertice complex
              next = STATE_PROTO_36;
              newMass = Math.max(curMass, 26.0 + Math.random() * 10.0);
              newD = 4.40;
            }
          }
          else if (st === STATE_PROTO_36) {
            // Accreting strings lock into coherent 36-vertice harmonic equilibrium
            if (curAge >= 2) {
              // FULL EMERGENCE: Locks into stable 36-vertice string/strip structure!
              next = STATE_36_STRUCTURE;
              newMass = Math.max(curMass, 22.0);
              newD = 4.40;
              netFlux += 2.8;
            } else {
              newMass += 1.5;
            }
          }
          else if (st === STATE_36_STRUCTURE) {
            // STABLE 36-VERTICE STRING COMPLEX: Resonant standing-wave soliton!
            // Highly stable! Radiates harmonic standing waves in equilibrium.
            // Chandrasekhar core collapse ONLY triggers if hyper-massive (curMass > 55.0):
            if (curMass > 55.0 && curAge >= 6) {
              // Hyper-massive core collapse supernova!
              next = STATE_SUPERNOVA;
              this.supernovaeTotal++;
              this.blastRadius[x][y][z] = 0.5;
              netFlux += 8.5;
            } else {
              // STABLE SOLITON: Persists indefinitely in harmonic equilibrium!
              next = STATE_36_STRUCTURE;
              // Sedov blast from neighbor compresses & excites, but does not destroy
              if (nbrSupernovae > 0) {
                newMass = Math.min(50.0, curMass + 3.0);
                netFlux += 4.0;
              } else if (nbrProto > 0) {
                newMass += 0.2;
              }
            }
          }
          else if (st === STATE_SUPERNOVA) {
            // Sedov-Taylor shockwave expands for 2 generations
            if (curAge >= 2) {
              // Core remnant collapses below Schwarzschild radius -> forms BLACK HOLE at d = 0.50!
              if (curMass >= 24.0 || this.blackHolesTotal === 0) {
                next = STATE_BLACK_HOLE;
                newMass = 18.0 + curMass * 0.4;
                newD = 0.50; // The 1/2 event horizon throat collapse!
                this.blackHolesTotal++;
                netFlux += 10.0;
              } else {
                next = STATE_PULSAR;
                newMass = 2.4;
              }
            } else {
              next = STATE_SUPERNOVA;
            }
          }
          else if (st === STATE_BLACK_HOLE) {
            // Permanent Singularity (d = 0.50): Accretes mass from surrounding string clouds
            next = STATE_BLACK_HOLE;
            newD = 0.50;
            newMass += (nbrProto + nbrPlasma) * 1.5;

            // Binary Black Hole Coalescence
            if (nbrBlackHoles > 0) {
              newMass += 15.0;
              netFlux += 14.0;
            }
          }
          else if (st === STATE_PULSAR) {
            if (curAge >= 10) {
              next = STATE_VACUUM;
            } else if (totalMass > 45.0) {
              // Accretion collapse to Black Hole
              next = STATE_BLACK_HOLE;
              newD = 0.50;
              this.blackHolesTotal++;
            }
          }

          this.nextState[x][y][z] = next;
          this.mass[x][y][z] = newMass;
          this.distance[x][y][z] = newD;

          // Count active 36-vertice complexes (both fully formed and emerging proto-complexes)
          if (next === STATE_36_STRUCTURE || next === STATE_PROTO_36) cur36++;
          if (next === STATE_SUPERNOVA) curSN++;
          if (next === STATE_BLACK_HOLE) curBH++;
        }
      }
    }

    // Second Pass: Buffer Swap and Metrics
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.nextState[x][y][z] === this.state[x][y][z]) {
            this.age[x][y][z]++;
          } else {
            this.state[x][y][z] = this.nextState[x][y][z];
            this.age[x][y][z] = 0;
            if (this.state[x][y][z] === STATE_SUPERNOVA) {
              this.blastRadius[x][y][z] = 0.5;
            }
          }
        }
      }
    }

    this.generation++;
    this.activeUnits36 = cur36;
    this.supernovaeActive = curSN;
    this.blackHolesActive = curBH;
    this.energyFlux = netFlux;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 5. Render Loop: Continuous Strings & Ruled Ribbon Sheets Synthesis
  // --------------------------------------------------------------------------
  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    this.controls.update();

    const now = performance.now();
    const dt = (now - this.lastStepTime) / 1000;
    const stepInterval = 1.0 / Math.max(0.1, this.genSpeed);

    if (this.isPlaying && dt >= stepInterval) {
      this.stepGeneration();
      this.lastStepTime = now;
    }

    const t = this.clock.getElapsedTime();
    const G = this.GRID;

    for (let i = 0; i < this.unitMeshes.length; i++) {
      const uItem = this.unitMeshes[i];
      const { x, y, z } = uItem;
      const st = this.state[x][y][z];
      const curD = this.distance[x][y][z];

      // Smooth energy transition: 0.0 in vacuum, 1.0 when active
      const targetE = st > STATE_VACUUM ? 1.0 : (this.showScaffold ? 0.05 : 0.0);
      this.energy[x][y][z] += (targetE - this.energy[x][y][z]) * 0.18;
      const e = this.energy[x][y][z];

      // Hide unit completely if vacuum
      if (e < 0.01) {
        uItem.group.visible = false;
        continue;
      }
      uItem.group.visible = true;

      // 1. Calculate 6 Layer Closed String Loops (36 Vertices Profile)
      const layerLoops = [];
      const layerHeights = [];
      const primaryTriads = []; // 3 primary vertices per layer
      const isBlackHole = (st === STATE_BLACK_HOLE);

      // In black hole state, metric separation d crushes to 0.50 (throat collapse)
      const dEff = isBlackHole ? 0.50 : curD;
      const heightScale = dEff / 4.40;

      for (let l = 0; l < this.LAYERS; l++) {
        const isInv = (l % 2 !== 0);
        const z0 = (l - 2.5) * (0.85 * heightScale);
        layerHeights.push(z0);

        // Constricted throat nozzle profile (de Laval profile)
        const throat = (1.0 - 0.32 * Math.exp(- (z0 * z0) / (0.8 * heightScale * heightScale + 0.05)))
          * (isBlackHole ? 0.45 : 1.0);

        // Peristaltic breathing wave
        const wavePsi = Math.cos(t * 3.5 - l * 0.8);
        const rLayer = this.R_BASE * throat * (1.0 + (isBlackHole ? 0.08 : 0.22 * wavePsi * e));

        // Torsional Chiral Twist
        const chiralAngle = (isInv ? -1 : 1) * 0.35 * Math.sin(t * 2.5 + l * 0.6) * e;
        const baseTheta = isInv ? -Math.PI / 2 : Math.PI / 2;

        // 3 Primary Vertices + 3 Midpoints = 6 Points per layer loop (36 Vertices across 6 layers)
        const loopPts = [];
        const triadPts = [];
        for (let j = 0; j < 3; j++) {
          const thetaV = baseTheta + j * (2 * Math.PI / 3) + chiralAngle;
          const vx = Math.cos(thetaV) * rLayer;
          const vz = Math.sin(thetaV) * rLayer;

          const thetaNext = baseTheta + ((j + 1) % 3) * (2 * Math.PI / 3) + chiralAngle;
          const nextVx = Math.cos(thetaNext) * rLayer;
          const nextVz = Math.sin(thetaNext) * rLayer;

          const mx = (vx + nextVx) * 0.5;
          const mz = (vz + nextVz) * 0.5;

          const ptPrimary = new THREE.Vector3(vx, z0, vz);
          triadPts.push(ptPrimary);
          loopPts.push(ptPrimary);
          loopPts.push(new THREE.Vector3(mx, z0, mz));
        }
        primaryTriads.push(triadPts);

        // CatmullRom closed string curve
        const curve = new THREE.CatmullRomCurve3(loopPts, true, 'centripetal', 0.5);
        layerLoops.push(curve);

        // Update Bounding String Loop Line
        const sLoop = uItem.stringLoops[l];
        const lPosAttr = sLoop.geo.attributes.position;
        const lColAttr = sLoop.geo.attributes.color;
        const SAMPLES = 48;
        const cPts = curve.getPoints(SAMPLES);

        for (let p = 0; p <= SAMPLES; p++) {
          const pt = cPts[p];
          lPosAttr.setXYZ(p, pt.x, pt.y, pt.z);

          // String color based on state
          let cr = 0.22, cg = 0.85, cb = 0.98;
          if (st === STATE_SUPERNOVA) {
            cr = 0.98; cg = 0.75; cb = 0.15;
          } else if (isBlackHole) {
            cr = 0.65; cg = 0.18; cb = 0.95;
          } else if (st === STATE_INFLATION) {
            cr = 0.98; cg = 0.95; cb = 0.45;
          }
          const pulse = 0.6 + 0.4 * Math.sin(t * 5.0 + p * 0.2 + l);
          lColAttr.setXYZ(p, cr * e * pulse, cg * e * pulse, cb * e * pulse);
        }
        lPosAttr.needsUpdate = true;
        lColAttr.needsUpdate = true;
      }

      // 2. Update 5 Outer Ruled Ribbon Strip Sheets
      for (let rb = 0; rb < uItem.outerRibbons.length; rb++) {
        const rItem = uItem.outerRibbons[rb];
        const c1 = layerLoops[rItem.l1];
        const c2 = layerLoops[rItem.l2];
        const posAttr = rItem.geo.attributes.position;
        const colAttr = rItem.geo.attributes.color;

        const z1 = layerHeights[rItem.l1];
        const z2 = layerHeights[rItem.l2];

        for (let v = 0; v <= this.V_SEGS; v++) {
          const wv = v / this.V_SEGS;
          const zInterp = z1 * (1 - wv) + z2 * wv;

          for (let u = 0; u <= this.U_SEGS; u++) {
            const wu = u / this.U_SEGS;
            const p1 = c1.getPoint(wu);
            const p2 = c2.getPoint(wu);

            // Interpolated point on ruled surface strip
            const xBase = p1.x * (1 - wv) + p2.x * wv;
            const yBase = zInterp;
            const zBase = p1.z * (1 - wv) + p2.z * wv;

            // Outward normal vector
            const rLen = Math.sqrt(xBase * xBase + zBase * zBase) || 1.0;
            const nx = xBase / rLen;
            const nz = zBase / rLen;

            // Peristaltic wave ripple along string strip
            const waveDisplacement = Math.sin(Math.PI * wv) * 0.25 * Math.sin(t * 4.0 - wu * Math.PI * 4) * e;

            const idx = v * (this.U_SEGS + 1) + u;
            posAttr.setXYZ(idx, xBase + nx * waveDisplacement, yBase, zBase + nz * waveDisplacement);

            // Dynamic Vertex Colors for Ruled Surface
            let cr = 0.15, cg = 0.65, cb = 0.95;
            if (st === STATE_SUPERNOVA) {
              cr = 0.98; cg = 0.35; cb = 0.25;
            } else if (isBlackHole) {
              cr = 0.55; cg = 0.12; cb = 0.85;
            } else if (st === STATE_INFLATION) {
              cr = 0.98; cg = 0.85; cb = 0.25;
            } else if (st === STATE_36_STRUCTURE) {
              const isAmber = Math.sin(wu * Math.PI * 6 + t * 2.0) > 0.65;
              if (isAmber) {
                cr = 0.96; cg = 0.65; cb = 0.18;
              } else {
                cr = 0.22; cg = 0.85; cb = 0.98;
              }
            }

            const alphaPulse = Math.max(0.05, e * (0.65 + 0.35 * Math.sin(t * 3.0 + wu * 6.0)));
            colAttr.setXYZ(idx, cr * alphaPulse, cg * alphaPulse, cb * alphaPulse);
          }
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
      }

      // 3. Update 45 Internal Bipartite Helical Ruled Ribbon Strips
      // Connecting alternating triads A_{l, j} <-> B_{l+1, k} across the throat
      const intPosAttr = uItem.intGeo.attributes.position;
      const intColAttr = uItem.intGeo.attributes.color;
      let stripIdx = 0;
      const STRIP_STEPS = 4;
      const RIBBON_W = 0.10;

      for (let l = 0; l < this.LAYERS - 1; l++) {
        const triadA = primaryTriads[l];
        const triadB = primaryTriads[l + 1];

        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            const ptA = triadA[j];
            const ptB = triadB[k];

            // Chord vector and transverse normal
            const dx = ptB.x - ptA.x;
            const dy = ptB.y - ptA.y;
            const dz = ptB.z - ptA.z;
            const chordLen = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1.0;

            // Transverse vector perpendicular to chord
            const wx = (-dz / chordLen) * RIBBON_W;
            const wy = 0.0;
            const wz = (dx / chordLen) * RIBBON_W;

            const baseV = stripIdx * (STRIP_STEPS + 1) * 2;

            for (let step = 0; step <= STRIP_STEPS; step++) {
              const s = step / STRIP_STEPS;
              const cx = ptA.x * (1 - s) + ptB.x * s;
              const cy = ptA.y * (1 - s) + ptB.y * s;
              const cz = ptA.z * (1 - s) + ptB.z * s;

              // Helical twist phase
              const twist = Math.cos(s * Math.PI + t * 3.0 + j + k);
              const vIdx1 = baseV + step * 2;
              const vIdx2 = vIdx1 + 1;

              intPosAttr.setXYZ(vIdx1, cx - wx * twist, cy, cz - wz * twist);
              intPosAttr.setXYZ(vIdx2, cx + wx * twist, cy, cz + wz * twist);

              // Colors for internal bipartite string strips
              let ir = 0.18, ig = 0.85, ib = 0.98;
              if (st === STATE_SUPERNOVA) {
                ir = 0.98; ig = 0.65; ib = 0.20;
              } else if (isBlackHole) {
                ir = 0.70; ig = 0.20; ib = 0.95;
              } else if (st === STATE_PROTO_36) {
                ir = 0.65; ig = 0.40; ib = 0.92;
              }

              const pulse = e * (0.50 + 0.50 * Math.sin(t * 4.0 + s * Math.PI));
              intColAttr.setXYZ(vIdx1, ir * pulse, ig * pulse, ib * pulse);
              intColAttr.setXYZ(vIdx2, ir * pulse, ig * pulse, ib * pulse);
            }

            stripIdx++;
          }
        }
      }
      intPosAttr.needsUpdate = true;
      intColAttr.needsUpdate = true;

      // 4. Black Hole Singularities (Accretion Disk + Polar Jets)
      if (isBlackHole) {
        uItem.bhGroup.visible = true;
        uItem.bhDisk.rotation.z = t * 3.5;
        const jetPulse = 1.0 + 0.25 * Math.sin(t * 8.0 + x);
        uItem.bhJetTop.scale.set(jetPulse, 1.0 + 0.15 * Math.sin(t * 5.0), jetPulse);
        uItem.bhJetBot.scale.set(jetPulse, 1.0 + 0.15 * Math.cos(t * 5.0), jetPulse);
      } else {
        uItem.bhGroup.visible = false;
      }

      // 5. Supernova Blast Wave Animation (Sedov Blast Expansion)
      if (st === STATE_SUPERNOVA) {
        uItem.snGroup.visible = true;
        this.blastRadius[x][y][z] += dt * 2.8;
        const rB = this.blastRadius[x][y][z];
        uItem.snBlastMesh.scale.set(rB, rB, rB);
        uItem.snRingMesh.scale.set(rB * 1.2, rB * 1.2, 1.0);
        uItem.snRingMesh.rotation.z = t * 2.5;
      } else {
        uItem.snGroup.visible = false;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  // --------------------------------------------------------------------------
  // 6. Cosmological Presets & Initialization
  // --------------------------------------------------------------------------
  clearGrid() {
    const G = this.GRID;
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          this.state[x][y][z] = STATE_VACUUM;
          this.nextState[x][y][z] = STATE_VACUUM;
          this.age[x][y][z] = 0;
          this.mass[x][y][z] = 0.0;
          this.energy[x][y][z] = 0.0;
          this.distance[x][y][z] = 4.40;
          this.blastRadius[x][y][z] = 0.0;
        }
      }
    }
    this.generation = 0;
    this.activeUnits36 = 0;
    this.supernovaeActive = 0;
    this.supernovaeTotal = 0;
    this.blackHolesActive = 0;
    this.blackHolesTotal = 0;
    this.energyFlux = 0.0;
    this.updateTelemetry();
  }

  loadPreset(presetKey) {
    this.clearGrid();
    const G = this.GRID;
    const mid = 1; // Center of 3x3x3 lattice

    if (presetKey === 'genesis' || presetKey === 'bigbang') {
      // 1. BIG BANG GENESIS: Primordial 36-Vertice String Singularity
      // High-mass central string inflaton seed; expands and condenses into a family of 36-vertice complexes!
      this.state[mid][mid][mid] = STATE_INFLATION;
      this.mass[mid][mid][mid] = 72.0; // Center is hyper-massive -> will detonate into central black hole
      this.energy[mid][mid][mid] = 1.0;
      this.ruleMode = 'astrophysics';
    }
    else if (presetKey === 'supernova') {
      // 2. CORE-COLLAPSE SUPERNOVA: Massive 36-vertice structure detonating
      this.state[mid][mid][mid] = STATE_SUPERNOVA;
      this.mass[mid][mid][mid] = 60.0;
      this.blastRadius[mid][mid][mid] = 0.6;
      this.supernovaeTotal++;

      // Neighboring stable 36-vertice string complexes
      this.state[mid + 1][mid][mid] = STATE_36_STRUCTURE;
      this.mass[mid + 1][mid][mid] = 30.0;
      this.state[mid - 1][mid][mid] = STATE_36_STRUCTURE;
      this.mass[mid - 1][mid][mid] = 28.0;
      this.state[mid][mid + 1][mid] = STATE_PROTO_36;
      this.mass[mid][mid + 1][mid] = 22.0;

      this.ruleMode = 'astrophysics';
    }
    else if (presetKey === 'blackhole') {
      // 3. SCHWARZSCHILD BLACK HOLE (d = 0.50) & RELATIVISTIC JETS
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.mass[mid][mid][mid] = 85.0;
      this.distance[mid][mid][mid] = 0.50; // Collapsed 1/2 event horizon!
      this.blackHolesTotal++;

      // Surrounding stable 36-vertice string complexes orbiting
      this.state[mid + 1][mid][mid] = STATE_36_STRUCTURE;
      this.mass[mid + 1][mid][mid] = 32.0;
      this.state[mid - 1][mid][mid] = STATE_36_STRUCTURE;
      this.mass[mid - 1][mid][mid] = 32.0;
      this.state[mid][mid][mid + 1] = STATE_36_STRUCTURE;
      this.mass[mid][mid][mid + 1] = 28.0;

      this.ruleMode = 'astrophysics';
    }
    else if (presetKey === 'binary_merger') {
      // 4. BINARY BLACK HOLE INSPIRAL & COALESCENCE
      this.state[mid - 1][mid][mid] = STATE_BLACK_HOLE;
      this.mass[mid - 1][mid][mid] = 45.0;
      this.distance[mid - 1][mid][mid] = 0.50;

      this.state[mid + 1][mid][mid] = STATE_BLACK_HOLE;
      this.mass[mid + 1][mid][mid] = 40.0;
      this.distance[mid + 1][mid][mid] = 0.50;

      // Orbiting 36-vertice string complexes
      this.state[mid][mid][mid + 1] = STATE_36_STRUCTURE;
      this.mass[mid][mid][mid + 1] = 26.0;

      this.blackHolesTotal = 2;
      this.ruleMode = 'astrophysics';
    }
    else if (presetKey === 'cosmic_web') {
      // 5. COSMIC WEB OF 36-VERTICE STRING MANIFOLDS
      for (let x = 0; x < G; x++) {
        for (let z = 0; z < G; z++) {
          if ((x + z) % 2 === 0) {
            this.state[x][mid][z] = STATE_36_STRUCTURE;
            this.mass[x][mid][z] = 30.0;
          }
        }
      }
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.mass[mid][mid][mid] = 80.0;
      this.distance[mid][mid][mid] = 0.50;
      this.blackHolesTotal++;
      this.ruleMode = 'astrophysics';
    }

    // Immediately tally active units from preset
    let cur36 = 0, curSN = 0, curBH = 0;
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.state[x][y][z];
          if (st === STATE_36_STRUCTURE || st === STATE_PROTO_36) cur36++;
          if (st === STATE_SUPERNOVA) curSN++;
          if (st === STATE_BLACK_HOLE) curBH++;
        }
      }
    }
    this.activeUnits36 = cur36;
    this.supernovaeActive = curSN;
    this.blackHolesActive = curBH;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 7. Live Cosmological Telemetry
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const elGen = document.getElementById('cosmos-telemetry-gen');
    const elUnits = document.getElementById('cosmos-telemetry-stars');
    const elSN = document.getElementById('cosmos-telemetry-sn');
    const elBH = document.getElementById('cosmos-telemetry-bh');
    const elFlux = document.getElementById('cosmos-telemetry-flux');
    const elBadge = document.getElementById('cosmos-state-badge');

    const myr = (this.generation * 12.5).toFixed(0);

    if (elGen) elGen.innerText = `Gen ${this.generation} (${myr} Myr)`;
    if (elUnits) elUnits.innerText = `${this.activeUnits36} Complexes`;
    if (elSN) elSN.innerText = `${this.supernovaeTotal} Detonations`;
    if (elBH) elBH.innerText = `${this.blackHolesTotal} Singularities`;
    if (elFlux) elFlux.innerText = `∇•J = ${this.energyFlux.toFixed(2)}`;

    if (elBadge) {
      elBadge.className = 'telemetry-badge';
      if (this.supernovaeActive > 0) {
        elBadge.classList.add('badge-turbulent');
        elBadge.innerText = '🌟 SUPERNOVA SEDOV BLAST CASCADE';
      } else if (this.blackHolesActive > 0) {
        elBadge.classList.add('badge-horizon');
        elBadge.innerText = '🕳️ BLACK HOLE STRING SINGULARITY (d = 0.50)';
      } else if (this.activeUnits36 > 0) {
        elBadge.classList.add('badge-triad');
        elBadge.innerText = '🌌 36-VERTICE STRING SOLITON EPOCH';
      } else if (this.generation === 0) {
        elBadge.classList.add('badge-resonance');
        elBadge.innerText = '⚡ PRIMORDIAL STRING SINGULARITY';
      } else {
        elBadge.classList.add('badge-standing');
        elBadge.innerText = '🌌 COSMIC EXPANSION';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 8. Interactive UI Controls & Event Listeners
  // --------------------------------------------------------------------------
  initUI() {
    const btnPlay = document.getElementById('cosmos-play-btn');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        btnPlay.innerText = this.isPlaying ? '⏸ Pause' : '▶ Play';
        btnPlay.classList.toggle('active', this.isPlaying);
      });
    }

    const btnStep = document.getElementById('cosmos-step-btn');
    if (btnStep) {
      btnStep.addEventListener('click', () => {
        this.stepGeneration();
      });
    }

    const btnClear = document.getElementById('cosmos-clear-btn');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        this.clearGrid();
      });
    }

    const btnReset = document.getElementById('cosmos-reset-btn');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.camera.position.set(22.0, 20.0, 32.0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
      });
    }

    const btnScaffold = document.getElementById('cosmos-scaffold-btn');
    if (btnScaffold) {
      btnScaffold.addEventListener('click', () => {
        this.showScaffold = !this.showScaffold;
        if (this.scaffoldGroup) this.scaffoldGroup.visible = this.showScaffold;
        btnScaffold.classList.toggle('active', this.showScaffold);
      });
    }

    const speedSlider = document.getElementById('cosmos-speed-slider');
    const speedBadge = document.getElementById('cosmos-speed-badge');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.genSpeed = parseFloat(e.target.value);
        if (speedBadge) speedBadge.innerText = `${this.genSpeed.toFixed(1)} gen/s`;
      });
    }

    const ruleSelect = document.getElementById('cosmos-rule-select');
    if (ruleSelect) {
      ruleSelect.addEventListener('change', (e) => {
        this.ruleMode = e.target.value;
      });
    }

    // Preset chips
    const presetChips = document.querySelectorAll('[data-cosmos-preset]');
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const pKey = chip.getAttribute('data-cosmos-preset');
        this.loadPreset(pKey);
      });
    });
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Auto-instantiate when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cosmosInstance = new GameOfCosmos('cosmos-canvas-container');
  });
} else {
  window.cosmosInstance = new GameOfCosmos('cosmos-canvas-container');
}
