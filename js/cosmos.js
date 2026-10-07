/**
 * THE GAME OF COSMOS: 3D 36-VERTICE STRING & STRIP CELLULAR AUTOMATON
 *
 * Fundamental Principles (Papers 02 & 11):
 *   1. Spacetime Unit Cell: Authentic 36-vertice simplicial complex (6 layers x 6 vertices = 36 vertices),
 *      synthesized purely as continuous ruled ribbon strip sheets and closed bounding strings—strictly
 *      WITHOUT point sphere nodes and WITHOUT wireframe stick lines.
 *   2. Cellular Life & Triad Harmonic Balance: A 3D cellular automaton on a 6x6x6 lattice (216 sites).
 *      Active complexes survive under stable triad flux (3 <= N <= 6), dissipate in cold voids (N < 3),
 *      and undergo core-collapse supernovae when overdense (N >= 8). Vacuum condenses into new
 *      36-vertice complexes under resonant triad harmonic conditions (N in [4, 5]) or when seeded
 *      by relativistic polar jets.
 *   3. Time Emergence from Stillness (Theorem 1.1): In the still ground state, detailed balance holds
 *      (J = J^T, A = 0, tau = 0, S = 0, EP = 0). Emitting an ultra-high frequency gamma wave breaks
 *      detailed balance, awakening emergent proper time tau and driving strictly expanding irreversible
 *      entropy dS/dt = EP = D(J || J^T) > 0 with the universal bound 0 <= h(S) - h(C) <= 1/4 EP.
 *   4. Spontaneous Metric Collapse (d -> 0.50): High concentrated energy density drives non-linear
 *      metric collapse ddot{d} + Gamma dot{d} + omega_0^2(d - 4.40) = - kappa * rho / d^2.
 *      At d = 0.50, an authentic Schwarzschild Event Horizon emerges, with dark shadow void,
 *      swirling relativistic accretion disk, and collimated twin relativistic polar string jets!
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const STATE_VACUUM = 0;
export const STATE_ALIVE_36 = 1;
export const STATE_SUPERNOVA = 2;
export const STATE_BLACK_HOLE = 3;

export class GameOfCosmos {
  constructor(containerId = 'cosmos-canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[GameOfCosmos] Container #${containerId} not found.`);
      return;
    }

    // 3D Cellular Lattice Dimensions (6x6x6 = 216 sites)
    this.GRID = 6;
    this.LAYERS = 6;            // 6 layers x 6 vertices = 36 vertices per complex
    this.SPACING_X = 7.6;
    this.SPACING_Y = 8.6;
    this.SPACING_Z = 7.6;
    this.R_BASE = 2.30;

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

    // Three.js Systems
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
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

    // Initialize System
    this.initThree();
    this.initScaffold();
    this.initHoverReticle();
    this.initMatrixMeshes();
    this.initUI();
    this.loadPreset('genesis');
    this.animate();

    window.cosmosInstance = this;
    console.log('[GameOfCosmos] 6x6x6 36-Vertice String Cosmos Initialized.');
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
  // 1. Three.js Scene Setup, Cinematic Space Lighting & Starfield
  // --------------------------------------------------------------------------
  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x02040a);
    this.scene.fog = new THREE.FogExp2(0x02040a, 0.007);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 800);
    this.camera.position.set(38.0, 32.0, 48.0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.4;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.maxDistance = 220;
    this.controls.minDistance = 8;

    // Cinematic Space Lighting
    this.scene.add(new THREE.AmbientLight(0x0a1128, 2.5));

    const pl1 = new THREE.PointLight(0x38bdf8, 5.0, 160);
    pl1.position.set(40, 50, 40);
    this.scene.add(pl1);

    const pl2 = new THREE.PointLight(0xa855f7, 4.5, 160);
    pl2.position.set(-40, -40, -40);
    this.scene.add(pl2);

    const pl3 = new THREE.PointLight(0xf59e0b, 3.5, 120);
    pl3.position.set(0, 0, 0);
    this.scene.add(pl3);

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    this.initDeepStarfield();

    window.addEventListener('resize', () => this.onResize());
  }

  initDeepStarfield() {
    const starCount = 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 80 + Math.random() * 150;

      starPos[i * 3]     = rad * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = rad * Math.cos(phi);
      starPos[i * 3 + 2] = rad * Math.sin(phi) * Math.sin(theta);

      const rVal = Math.random();
      if (rVal > 0.75) {
        // Warm golden star
        starCol[i * 3] = 0.98; starCol[i * 3 + 1] = 0.75; starCol[i * 3 + 2] = 0.35;
      } else if (rVal > 0.45) {
        // Sapphire blue giant
        starCol[i * 3] = 0.35; starCol[i * 3 + 1] = 0.75; starCol[i * 3 + 2] = 0.98;
      } else {
        // Distant white dwarf
        starCol[i * 3] = 0.85; starCol[i * 3 + 1] = 0.90; starCol[i * 3 + 2] = 1.00;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.4,
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
          const center = this.getCellCenter(x, y, z);

          const group = new THREE.Group();
          group.position.copy(center);
          group.visible = false;

          // A. 5 Inter-Layer Continuous Ruled Ribbon Strips S(u, v) = (1-v) gamma_l(u) + v gamma_{l+1}(u)
          const outerRibbons = [];
          const uSegs = 32;
          const vSegs = 4;
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
              roughness: 0.25,
              metalness: 0.65,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.70,
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
            const loopPos = new Float32Array(33 * 3);
            const loopCol = new Float32Array(33 * 3);
            loopGeo.setAttribute('position', new THREE.BufferAttribute(loopPos, 3));
            loopGeo.setAttribute('color', new THREE.BufferAttribute(loopCol, 3));

            const isGold = (l % 2 === 0);
            const baseCol = isGold ? new THREE.Color(0xf59e0b) : new THREE.Color(0x38bdf8);

            const loopMat = new THREE.LineBasicMaterial({
              vertexColors: true,
              linewidth: 2.2,
              transparent: true,
              opacity: 0.95,
              blending: THREE.AdditiveBlending
            });

            const lineLoop = new THREE.LineLoop(loopGeo, loopMat);
            group.add(lineLoop);
            stringLoops.push({ lineLoop, loopGeo, loopPos, loopCol, baseCol });
          }

          // C. Relativistic Black Hole Singularity Elements (for d <= 0.52)
          // 1. Central Event Horizon Sphere
          const bhSphereGeo = new THREE.SphereGeometry(0.85, 24, 24);
          const bhSphereMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const bhSphere = new THREE.Mesh(bhSphereGeo, bhSphereMat);
          bhSphere.visible = false;
          group.add(bhSphere);

          // 2. Einstein Photon Sphere Ring (Accretion Lensing halo)
          const ringGeo = new THREE.RingGeometry(0.88, 1.45, 32);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.90,
            blending: THREE.AdditiveBlending
          });
          const photonRing = new THREE.Mesh(ringGeo, ringMat);
          photonRing.rotation.x = Math.PI / 2;
          photonRing.visible = false;
          group.add(photonRing);

          // 3. Slender Collimated Relativistic Polar String Jets (shooting along +/- y)
          const jetGroup = new THREE.Group();
          jetGroup.visible = false;

          // Slender, high-energy core
          const jetGeo = new THREE.CylinderGeometry(0.04, 0.22, 6.5, 12, 1, true);
          const jetMat = new THREE.MeshBasicMaterial({
            color: 0xa855f7,
            transparent: true,
            opacity: 0.90,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
          });

          const jetPlus = new THREE.Mesh(jetGeo, jetMat);
          jetPlus.position.y = 3.25;
          jetGroup.add(jetPlus);

          const jetMinus = new THREE.Mesh(jetGeo, jetMat);
          jetMinus.position.y = -3.25;
          jetMinus.rotation.x = Math.PI;
          jetGroup.add(jetMinus);

          group.add(jetGroup);

          // D. Supernova Core-Collapse Shockwave Shell (Luminous double ring corona)
          const snGroup = new THREE.Group();
          snGroup.visible = false;

          const snRing1Geo = new THREE.RingGeometry(0.8, 1.35, 32);
          const snRing1Mat = new THREE.MeshBasicMaterial({
            color: 0xf43f5e,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
          });
          const snRing1 = new THREE.Mesh(snRing1Geo, snRing1Mat);
          snRing1.rotation.x = Math.PI / 2;
          snGroup.add(snRing1);

          const snRing2Geo = new THREE.RingGeometry(0.8, 1.35, 32);
          const snRing2Mat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
          });
          const snRing2 = new THREE.Mesh(snRing2Geo, snRing2Mat);
          snRing2.rotation.y = Math.PI / 2;
          snGroup.add(snRing2);

          group.add(snGroup);

          this.mainGroup.add(group);

          this.unitVisuals[x][y][z] = {
            group,
            outerRibbons,
            stringLoops,
            bhSphere,
            photonRing,
            jetGroup,
            snGroup,
            snRing1Mat,
            snRing2Mat
          };
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // 3. Mathematical Field Evolution Engine (Cellular Automaton + Relativistic ODE)
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

          // Weight of neighbor cell:
          // Active 36-vertice = 1, Supernova = 2 (shock flux), Black Hole = 2 (gravitational mass)
          const weight = (s === STATE_ALIVE_36) ? 1 : 2;
          const e = this.energy[x][y][z];

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;
                // Periodic boundary wrapping across cosmic horizon
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

          if (cur === STATE_BLACK_HOLE) {
            // Black hole singularity is an enduring gravitational anchor
            next = STATE_BLACK_HOLE;
          }
          else if (cur === STATE_SUPERNOVA) {
            // Supernova shockwave dissipates after 1 generation, leaving space clear or seeded
            next = (n >= 3 && n <= 6) ? STATE_ALIVE_36 : STATE_VACUUM;
          }
          else if (cur === STATE_ALIVE_36) {
            if (n >= 8) {
              // Chandrasekhar / Jeans core collapse -> Supernova detonation!
              next = STATE_SUPERNOVA;
              this.blastRadius[x][y][z] = 1.0;
              this.supernovaeTotal++;
            } else if (n >= 3 && n <= 6) {
              // Stable 36-vertice topological soliton in harmonic equilibrium
              next = STATE_ALIVE_36;
            } else {
              // Underpopulation -> cold cosmic void dissipation
              next = STATE_VACUUM;
            }
          }
          else if (cur === STATE_VACUUM) {
            // Condensation from vacuum under resonant triad harmonic balance
            if (n >= 4 && n <= 5) {
              next = STATE_ALIVE_36;
            }
          }

          this.nextState[x][y][z] = next;
        }
      }
    }

    // 3. Relativistic Polar Jet Seeding from Black Holes
    // Collimated jets along +/- y pierce through space and awaken dormant cells
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.state[x][y][z] === STATE_BLACK_HOLE) {
            const yUp = (y + 1) % G;
            const yDown = (y - 1 + G) % G;

            if (this.nextState[x][yUp][z] === STATE_VACUUM && Math.random() > 0.40) {
              this.nextState[x][yUp][z] = STATE_ALIVE_36;
              this.energy[x][yUp][z] = 22.0;
              netFlux += 15.0;
            }
            if (this.nextState[x][yDown][z] === STATE_VACUUM && Math.random() > 0.40) {
              this.nextState[x][yDown][z] = STATE_ALIVE_36;
              this.energy[x][yDown][z] = 22.0;
              netFlux += 15.0;
            }
          }
        }
      }
    }

    // 4. Update Continuous Metric & Paper 02 Theorem 1.1 Entropy Fields
    const dt = 1.0; // 1 generation = 1.0 Myr proper time scale

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const nextS = this.nextState[x][y][z];
          let curD = this.distance[x][y][z];
          let velD = this.distanceVel[x][y][z];

          if (nextS === STATE_BLACK_HOLE) {
            // Continuous metric collapses dynamically to d = 0.50
            const targetD = 0.50;
            const gravPull = -6.8 / Math.max(0.25, curD * curD) - 2.8 * (curD - targetD);
            velD += gravPull * 0.15;
            velD *= 0.75;
            curD = Math.max(0.50, Math.min(4.40, curD + velD * 0.15));
            if (curD <= 0.52) {
              curD = 0.50;
              velD = 0.0;
            }
            this.energy[x][y][z] = 85.0;
            countBH++;
          }
          else if (nextS === STATE_SUPERNOVA) {
            curD = Math.max(0.85, curD - 0.45);
            this.energy[x][y][z] = 65.0;
            countSN++;
          }
          else if (nextS === STATE_ALIVE_36) {
            // Restores to unperturbed metric d = 4.40 with gentle breathing
            curD += (4.40 - curD) * 0.25;
            velD *= 0.5;
            this.energy[x][y][z] = Math.max(12.0, this.energy[x][y][z] * 0.92);
            count36++;
          }
          else {
            // Vacuum relaxes to 4.40
            curD += (4.40 - curD) * 0.4;
            velD = 0.0;
            this.energy[x][y][z] = Math.max(0.0, this.energy[x][y][z] - 1.5);
          }

          this.distance[x][y][z] = curD;
          this.distanceVel[x][y][z] = velD;
          this.state[x][y][z] = nextS;

          // B. Proper Time tau Emergence & Theorem 1.1 Irreversible Entropy Integration:
          if (nextS !== STATE_VACUUM) {
            this.age[x][y][z]++;
            const rsEff = (curD <= 0.52) ? 0.85 : 0.85 * (4.40 - curD) / 3.90;
            const g00 = Math.max(0.01, 1.0 - rsEff / 1.5);
            this.properTime[x][y][z] += dt * Math.sqrt(g00);

            // Entropy production rate EP = D(J || J^T)
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
  // 4. Mesh Geometry Updates & Chiral String Undulations (Render Loop)
  // --------------------------------------------------------------------------
  updateVisuals(elapsed) {
    const G = this.GRID;
    const t = elapsed;
    const uSegs = 32;

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

          // Configure state-specific elements
          uItem.bhSphere.visible = isBlackHole;
          uItem.photonRing.visible = isBlackHole;
          uItem.jetGroup.visible = isBlackHole;
          uItem.snGroup.visible = isSupernova;

          if (isBlackHole) {
            uItem.photonRing.rotation.z = t * 2.5;
            uItem.jetGroup.rotation.y = t * 1.8;
          }

          if (isSupernova) {
            this.blastRadius[x][y][z] = Math.min(3.5, (this.blastRadius[x][y][z] || 1.0) + 0.08);
            const rB = this.blastRadius[x][y][z];
            uItem.snGroup.scale.set(rB, rB, rB);
            uItem.snGroup.rotation.y = t * 3.5;
            uItem.snRing1Mat.opacity = Math.max(0.1, 1.0 - rB / 4.0);
            uItem.snRing2Mat.opacity = Math.max(0.1, 1.0 - rB / 4.0);
          }

          // Compute 6-Layer Chiral Undulating String Geometry
          const heightScale = curD / 4.40;
          const layerHeights = [];
          const layerLoops = [];

          for (let l = 0; l < this.LAYERS; l++) {
            const isInv = (l % 2 !== 0);
            const z0 = (l - 2.5) * (0.85 * heightScale);
            layerHeights.push(z0);

            // De Laval constricted throat nozzle profile
            const throat = (1.0 - 0.35 * Math.exp(- (z0 * z0) / (0.8 * heightScale * heightScale + 0.08)))
              * (isBlackHole ? 0.45 : 1.0);

            // Peristaltic breathing wave
            const wavePsi = Math.cos(t * 3.2 - l * 0.85);
            const rLayer = this.R_BASE * throat * (1.0 + (isBlackHole ? 0.08 : 0.22 * wavePsi));

            // Torsional Chiral Twist
            const chiralAngle = (isInv ? -1 : 1) * 0.35 * Math.sin(t * 2.4 + l * 0.6);
            const baseTheta = isInv ? -Math.PI / 2 : Math.PI / 2;

            const loopPts = [];
            for (let j = 0; j < 3; j++) {
              const thetaV = baseTheta + j * (2 * Math.PI / 3) + chiralAngle;
              const vx = Math.cos(thetaV) * rLayer;
              const vz = Math.sin(thetaV) * rLayer;

              const thetaNext = baseTheta + ((j + 1) % 3) * (2 * Math.PI / 3) + chiralAngle;
              const nextVx = Math.cos(thetaNext) * rLayer;
              const nextVz = Math.sin(thetaNext) * rLayer;

              // Midpoint vertex along hyperbolic arc
              const mx = (vx + nextVx) * 0.5 * 1.15;
              const mz = (vz + nextVz) * 0.5 * 1.15;

              loopPts.push(new THREE.Vector3(vx, z0, vz));
              loopPts.push(new THREE.Vector3(mx, z0, mz));
            }

            // Closed smooth spline curve for this layer
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
          const vSegs = 4;
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

                // Ruled interpolation
                const px = (1 - vFrac) * p1.x + vFrac * p2.x;
                const py = (1 - vFrac) * p1.y + vFrac * p2.y;
                const pz = (1 - vFrac) * p1.z + vFrac * p2.z;

                rItem.positions[idx * 3]     = px;
                rItem.positions[idx * 3 + 1] = py;
                rItem.positions[idx * 3 + 2] = pz;

                // Color gradient: sapphire to gold across layers
                if (isBlackHole) {
                  rItem.colors[idx * 3]     = 0.65;
                  rItem.colors[idx * 3 + 1] = 0.22;
                  rItem.colors[idx * 3 + 2] = 0.95;
                } else if (isSupernova) {
                  rItem.colors[idx * 3]     = 0.98;
                  rItem.colors[idx * 3 + 1] = 0.35;
                  rItem.colors[idx * 3 + 2] = 0.22;
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
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // 5. Presets, Gamma Pulse Emission & Timeless Ground State Freezing
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

    // Clamp coordinates to grid
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
      // 💥 Big Bang Genesis: Primordial Singularity with Collapsed Horizon d = 0.50 & Twin Polar Jets
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid][mid][mid] = 0.50;
      this.energy[mid][mid][mid] = 98.0;
      this.properTime[mid][mid][mid] = 2.0;

      // Primordial 36-vertice string condensations along triad axes
      this.state[mid + 1][mid][mid] = STATE_ALIVE_36;
      this.state[mid - 1][mid][mid] = STATE_ALIVE_36;
      this.state[mid][mid + 1][mid] = STATE_ALIVE_36;
      this.state[mid][mid - 1][mid] = STATE_ALIVE_36;
      this.state[mid][mid][mid + 1] = STATE_ALIVE_36;
      this.state[mid][mid][mid - 1] = STATE_ALIVE_36;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (Math.abs(dx) + Math.abs(dy) === 1) {
            const sx = mid + dx, sy = mid + dy;
            this.energy[sx][sy][mid] = 28.0;
            this.properTime[sx][sy][mid] = 0.8;
          }
        }
      }
    }
    else if (presetKey === 'glider') {
      // 🚀 Soliton Glider: Autonomous 36-vertice triad packet that glides across 3D cellular spacetime
      this.state[1][1][1] = STATE_ALIVE_36;
      this.state[2][1][1] = STATE_ALIVE_36;
      this.state[1][2][1] = STATE_ALIVE_36;
      this.state[2][2][2] = STATE_ALIVE_36;
      this.state[2][1][2] = STATE_ALIVE_36;

      for (let dx = 1; dx <= 2; dx++) {
        for (let dy = 1; dy <= 2; dy++) {
          for (let dz = 1; dz <= 2; dz++) {
            if (this.state[dx][dy][dz] === STATE_ALIVE_36) {
              this.energy[dx][dy][dz] = 20.0;
              this.properTime[dx][dy][dz] = 0.8;
            }
          }
        }
      }
    }
    else if (presetKey === 'supernova') {
      // 🌟 Core-Collapse Supernova: Center complex detonates expanding shockwave ribbons
      this.state[mid][mid][mid] = STATE_SUPERNOVA;
      this.energy[mid][mid][mid] = 85.0;
      this.blastRadius[mid][mid][mid] = 1.0;
      this.properTime[mid][mid][mid] = 1.5;

      this.state[mid + 1][mid][mid] = STATE_ALIVE_36;
      this.state[mid - 1][mid][mid] = STATE_ALIVE_36;
      this.state[mid][mid + 1][mid] = STATE_ALIVE_36;
      this.state[mid][mid - 1][mid] = STATE_ALIVE_36;
    }
    else if (presetKey === 'blackhole') {
      // 🕳️ Black Hole & Polar Jets: Central Schwarzschild Horizon (d = 0.50) with twin relativistic polar string jets
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid][mid][mid] = 0.50;
      this.energy[mid][mid][mid] = 95.0;
      this.properTime[mid][mid][mid] = 3.0;

      // Stable orbital string complexes
      this.state[mid + 1][mid][mid + 1] = STATE_ALIVE_36;
      this.state[mid - 1][mid][mid - 1] = STATE_ALIVE_36;
      this.state[mid + 1][mid][mid - 1] = STATE_ALIVE_36;
      this.state[mid - 1][mid][mid + 1] = STATE_ALIVE_36;
    }
    else if (presetKey === 'binary_merger') {
      // 🌀 Binary Black Hole Inspiral & Merger: Two orbiting event horizons
      this.state[mid - 1][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid - 1][mid][mid] = 0.50;
      this.energy[mid - 1][mid][mid] = 90.0;

      this.state[mid + 1][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid + 1][mid][mid] = 0.50;
      this.energy[mid + 1][mid][mid] = 90.0;

      this.state[mid][mid + 1][mid] = STATE_ALIVE_36;
      this.state[mid][mid - 1][mid] = STATE_ALIVE_36;
    }
    else if (presetKey === 'cosmic_web') {
      // 🌌 Cosmic Web & Galaxies: Filamentary structure with clusters and dark voids
      for (let x = 0; x < this.GRID; x++) {
        for (let y = 0; y < this.GRID; y++) {
          for (let z = 0; z < this.GRID; z++) {
            const val = Math.sin(x * 1.2) * Math.cos(y * 1.2) + Math.sin(z * 1.2);
            if (val > 0.85) {
              this.state[x][y][z] = STATE_ALIVE_36;
              this.energy[x][y][z] = 18.0 + Math.random() * 15.0;
              this.properTime[x][y][z] = 0.5;
            }
          }
        }
      }
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.distance[mid][mid][mid] = 0.50;
    }

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 6. Live HUD Telemetry & Paper 02 Theorem 1.1 Readouts
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const elGen = document.getElementById('cosmos-telemetry-gen');
    const elEP = document.getElementById('cosmos-telemetry-ep');
    const elEntropy = document.getElementById('cosmos-telemetry-entropy');
    const elUnits = document.getElementById('cosmos-telemetry-stars');
    const elSN = document.getElementById('cosmos-telemetry-sn');
    const elBH = document.getElementById('cosmos-telemetry-bh');
    const elFlux = document.getElementById('cosmos-telemetry-flux');
    const elBadge = document.getElementById('cosmos-state-badge');

    if (elGen) {
      elGen.innerText = this.isStill
        ? '0.0 Myr (Timeless)'
        : `${this.cosmicTime.toFixed(1)} Myr (Gen ${this.generation})`;
    }

    if (elEP) {
      elEP.innerText = this.isStill
        ? '0.00 bits/Myr'
        : `${this.totalEPRate.toFixed(2)} bits/Myr`;
    }

    if (elEntropy) {
      elEntropy.innerText = this.isStill
        ? '0.00 nats'
        : `${this.totalEntropy.toFixed(2)} nats`;
    }

    if (elUnits) {
      elUnits.innerText = `${this.activeUnits36} Complexes`;
    }

    if (elSN) {
      elSN.innerText = `${this.supernovaeActive} Detonations`;
    }

    if (elBH) {
      elBH.innerText = `${this.blackHolesActive} Singularities`;
    }

    if (elFlux) {
      elFlux.innerHTML = `&nabla;&bull;J = ${this.energyFlux.toFixed(2)}`;
    }

    if (elBadge) {
      elBadge.className = 'telemetry-badge';
      if (this.isStill) {
        elBadge.classList.add('badge-resonance');
        elBadge.innerText = '❄️ TIMELESS GROUND STATE (S = 0, EP = 0)';
      } else if (this.blackHolesActive >= 2) {
        elBadge.classList.add('badge-horizon');
        elBadge.innerText = '🌀 BINARY BLACK HOLE MERGER (d = 0.50)';
      } else if (this.blackHolesActive === 1) {
        elBadge.classList.add('badge-horizon');
        elBadge.innerText = '🕳️ SPONTANEOUS BLACK HOLE COLLAPSE (d = 0.50)';
      } else if (this.supernovaeActive > 0) {
        elBadge.classList.add('badge-turbulent');
        elBadge.innerText = `💥 CORE-COLLAPSE SUPERNOVA CASCADE (${this.supernovaeActive} active)`;
      } else if (this.activeUnits36 >= 25) {
        elBadge.classList.add('badge-triad');
        elBadge.innerText = '🌌 COSMIC WEB FILAMENTS & CLUSTERS';
      } else if (this.activeUnits36 > 0) {
        elBadge.classList.add('badge-wave');
        elBadge.innerText = '✨ 36-VERTICE STRING SOLITON EPOCH';
      } else {
        elBadge.classList.add('badge-resonance');
        elBadge.innerText = '🌌 PRISTINE COSMIC VACUUM';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 7. Interactive 3D Raycasting, Mouse Hover & Click-to-Inject Actions
  // --------------------------------------------------------------------------
  setupRaycaster() {
    this.renderer.domElement.addEventListener('pointermove', (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      // Find nearest lattice point
      let closestDist = Infinity;
      let closestCoord = null;
      const G = this.GRID;

      for (let x = 0; x < G; x++) {
        for (let y = 0; y < G; y++) {
          for (let z = 0; z < G; z++) {
            const center = this.getCellCenter(x, y, z);
            const ray = this.raycaster.ray;
            const dist = ray.distanceToPoint(center);
            if (dist < closestDist && dist < this.SPACING_X * 0.6) {
              closestDist = dist;
              closestCoord = { x, y, z, center };
            }
          }
        }
      }

      if (closestCoord) {
        this.hoverCoord = closestCoord;
        this.hoverReticle.position.copy(closestCoord.center);
        this.hoverReticle.visible = true;
      } else {
        this.hoverCoord = null;
        this.hoverReticle.visible = false;
      }
    });

    this.renderer.domElement.addEventListener('click', () => {
      if (this.hoverCoord) {
        const { x, y, z } = this.hoverCoord;
        if (this.state[x][y][z] === STATE_VACUUM) {
          // Spawn active 36-vertice string complex
          this.state[x][y][z] = STATE_ALIVE_36;
          this.energy[x][y][z] = 25.0;
          this.properTime[x][y][z] = 0.5;
        } else if (this.state[x][y][z] === STATE_ALIVE_36) {
          // Collapse to Black Hole!
          this.emitGammaPulse(x, y, z);
        } else {
          // Clear to vacuum
          this.state[x][y][z] = STATE_VACUUM;
        }
        this.updateTelemetry();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. UI Controls & Preset Binding
  // --------------------------------------------------------------------------
  initUI() {
    this.setupRaycaster();

    const btnGamma = document.getElementById('cosmos-gamma-btn');
    if (btnGamma) {
      btnGamma.addEventListener('click', () => {
        const mid = Math.floor(this.GRID / 2);
        this.emitGammaPulse(mid, mid, mid);
      });
    }

    const btnStill = document.getElementById('cosmos-still-btn');
    if (btnStill) {
      btnStill.addEventListener('click', () => {
        this.freezeStillMatrix();
      });
    }

    const btnScaffold = document.getElementById('cosmos-scaffold-btn');
    if (btnScaffold) {
      btnScaffold.addEventListener('click', () => {
        this.showScaffold = !this.showScaffold;
        btnScaffold.classList.toggle('active', this.showScaffold);
        if (this.scaffoldGroup) this.scaffoldGroup.visible = this.showScaffold;
      });
    }

    const btnPlay = document.getElementById('cosmos-play-btn');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        btnPlay.innerHTML = this.isPlaying
          ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> <span>Pause</span>'
          : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> <span>Resume</span>';
      });
    }

    const btnStep = document.getElementById('cosmos-step-btn');
    if (btnStep) {
      btnStep.addEventListener('click', () => {
        this.step();
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
        this.camera.position.set(38.0, 32.0, 48.0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
      });
    }

    const speedSlider = document.getElementById('cosmos-speed-slider');
    const speedBadge = document.getElementById('cosmos-speed-badge');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.genSpeed = parseFloat(e.target.value);
        this.stepInterval = 1000 / this.genSpeed;
        if (speedBadge) speedBadge.innerText = `${this.genSpeed.toFixed(1)} gen/s`;
      });
    }

    const presetChips = document.querySelectorAll('.cosmos-preset-chip');
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const pKey = chip.getAttribute('data-cosmos-preset');
        this.loadPreset(pKey);
      });
    });

    const ruleSelect = document.getElementById('cosmos-rule-select');
    if (ruleSelect) {
      ruleSelect.addEventListener('change', (e) => {
        this.currentRule = e.target.value;
      });
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight || 600;
    if (w <= 0 || h <= 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  // --------------------------------------------------------------------------
  // 9. Main Render Loop
  // --------------------------------------------------------------------------
  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    this.controls.update();
    const elapsed = this.clock.getElapsedTime();
    const now = performance.now();

    // Advance Cellular Automaton generation on timer
    if (this.isPlaying && !this.isStill) {
      if (now - this.lastStepTime >= this.stepInterval) {
        this.step();
        this.lastStepTime = now;
      }
    }

    // Update 36-vertice string loops, ruled ribbon strips, and relativistic jets
    this.updateVisuals(elapsed);

    // Gentle global float
    this.mainGroup.rotation.y = Math.sin(elapsed * 0.1) * 0.15;

    this.renderer.render(this.scene, this.camera);
  }
}

// Auto-initialize when DOM is ready
function initCosmosSimulation() {
  if (document.getElementById('cosmos-canvas-container') && !window.cosmosInstance) {
    window.cosmosInstance = new GameOfCosmos('cosmos-canvas-container');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCosmosSimulation);
} else {
  initCosmosSimulation();
}
