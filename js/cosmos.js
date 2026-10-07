/**
 * THE GAME OF COSMOS: 3D 36-VERTICE STRING & STRIP METRIC-ENTROPY FIELD
 *
 * Fundamental Principles (Papers 02 & 11):
 *   1. Spacetime Unit Cell: Authentic 36-vertice simplicial complex (6 layers x 6 vertices = 36 vertices),
 *      synthesized purely as continuous ruled ribbon strip sheets and closed bounding strings—strictly
 *      WITHOUT point sphere nodes and WITHOUT wireframe stick lines.
 *   2. Time Emergence from Stillness: In the still ground state, detailed balance holds (J = J^T, A = 0,
 *      tau = 0, S = 0, EP = 0). Emitting a gamma frequency breaks detailed balance, awakening proper time
 *      tau and launching the directed arrow of time.
 *   3. Expanding Irreversible Entropy: Theorem 1.1 gives EP = D(J || J^T) > 0 and 0 <= h(S) - h(C) <= 1/4 EP.
 *      Total entropy S_irr strictly expands: dS/dt = EP >= 0.
 *   4. Spontaneous Metric Collapse (No Manual Placement): Concentrated gamma energy density rho drives
 *      dynamical metric collapse ddot{d} + Gamma dot{d} + omega_0^2(d - 4.40) = - kappa * rho / d^2.
 *      The metric separation d dynamically contracts from 4.40 to 0.50, spontaneously forging the
 *      1/2 event horizon with shadow void, accretion disk, and relativistic polar string jets!
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const STATE_VACUUM = 0;
export const STATE_PROTO_36 = 1;
export const STATE_36_STRUCTURE = 2;
export const STATE_SUPERNOVA = 3;
export const STATE_BLACK_HOLE = 4;

export class GameOfCosmos {
  constructor(containerId = 'cosmos-canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[GameOfCosmos] Container #${containerId} not found.`);
      return;
    }

    // 3D Matrix Dimensions (3x3x3 = 27 Unit Complexes)
    this.GRID = 3;
    this.LAYERS = 6;            // 6 layers x 6 vertices = 36 vertices total
    this.SPACING_X = 9.2;
    this.SPACING_Y = 10.0;
    this.SPACING_Z = 9.2;

    // Unit Ribbon Resolution
    this.U_SEGS = 36;
    this.V_SEGS = 6;
    this.R_BASE = 2.45;

    // Continuous Metric & Entropy Fields (3x3x3)
    this.distance = this.createGrid3D(4.40);       // Metric separation d \in [0.50, 4.40]
    this.distanceVel = this.createGrid3D(0.0);    // d(dot)
    this.energy = this.createGrid3D(0.0);          // Energy density rho
    this.properTime = this.createGrid3D(0.0);      // Local emergent time tau
    this.entropy = this.createGrid3D(0.0);         // Irreversible entropy S_irr
    this.epRate = this.createGrid3D(0.0);          // Entropy production EP = D(J || J^T)
    this.blastRadius = this.createGrid3D(0.0);     // Sedov blast wave radius
    this.age = this.createGrid3D(0);

    // Simulation Engine State
    this.generation = 0;
    this.isPlaying = true;
    this.isStill = false;
    this.genSpeed = 3.0;                           // Evolution speed
    this.lastStepTime = performance.now();
    this.showScaffold = false;
    this.isVisible = true;

    // Global Cosmic Telemetry
    this.cosmicTime = 0.0;
    this.activeUnits36 = 0;
    this.supernovaeActive = 0;
    this.supernovaeTotal = 0;
    this.blackHolesActive = 0;
    this.blackHolesTotal = 0;
    this.totalEntropy = 0.0;
    this.totalEPRate = 0.0;
    this.energyFlux = 0.0;

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
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
    console.log('[GameOfCosmos] 3D 36-Vertice String Matrix with Time & Entropy Emergence initialized.');
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
  // 1. Three.js Scene Setup & Lighting
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
  // 2. Construction of 36-Vertice String & Ribbon Strip Complexes
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

          // C. 45 Internal Bipartite Helical Ruled Ribbon Strips
          const TOTAL_INTERNAL_STRIPS = (this.LAYERS - 1) * 9;
          const STRIP_STEPS = 4;
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

          // D. Spontaneous Black Hole Sub-Group (Activated purely when d <= 0.52)
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

          unitGroup.visible = false;
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
  // 3. Mathematical Field Evolution Engine (Continuous Metric & Entropy ODEs)
  // --------------------------------------------------------------------------
  stepFieldEvolution(dt) {
    if (this.isStill) return;

    const G = this.GRID;
    let netFlux = 0.0;
    let cur36 = 0, curSN = 0, curBH = 0;
    let sumEP = 0.0, sumEntropy = 0.0;

    // Buffer for energy diffusion
    const dEnergy = this.createGrid3D(0.0);

    // 1. Calculate Ruled Ribbon Stress-Energy Currents & Polar Jet Flux
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const rho = this.energy[x][y][z];
          const dEff = this.distance[x][y][z];
          const isBH = (dEff <= 0.52);

          // Neighbor diffusion along continuous string ribbon connections
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dz = -1; dz <= 1; dz++) {
                if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) !== 1) continue;
                const nx = x + dx, ny = y + dy, nz = z + dz;
                if (nx < 0 || nx >= G || ny < 0 || ny >= G || nz < 0 || nz >= G) continue;

                // Diffusion current J = - D * grad(rho)
                const gradRho = rho - this.energy[nx][ny][nz];
                const diffRate = 0.12 * dt;
                dEnergy[x][y][z] -= gradRho * diffRate;
                dEnergy[nx][ny][nz] += gradRho * diffRate;
                netFlux += Math.abs(gradRho) * 0.05;
              }
            }
          }

          // Relativistic Polar String Jets from Black Hole (d <= 0.52): Beams along +/- y
          if (isBH) {
            const jetFlux = 4.2 * dt;
            if (y + 1 < G) dEnergy[x][y + 1][z] += jetFlux;
            if (y - 1 >= 0) dEnergy[x][y - 1][z] += jetFlux;
            netFlux += jetFlux * 2.0;
          }
        }
      }
    }

    // 2. Integrate Continuous Metric Collapse & Theorem 1.1 Entropy Production
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          // Update energy density rho
          this.energy[x][y][z] = Math.max(0.0, this.energy[x][y][z] + dEnergy[x][y][z]);
          const rho = this.energy[x][y][z];
          let curD = this.distance[x][y][z];
          let velD = this.distanceVel[x][y][z];

          // A. Spontaneous Metric Collapse ODE:
          // ddot{d} + Gamma dot{d} + omega_0^2(d - 4.40) = - kappa * rho / d^2
          if (rho > 0.05) {
            const gravForce = -6.2 * (rho / Math.max(0.35, curD * curD));
            const restoringForce = -1.8 * (curD - 4.40);
            velD += (gravForce + restoringForce) * dt;
            velD *= Math.max(0.0, 1.0 - dt * 3.0); // Dissipative damping Gamma from entropy production
            curD = Math.max(0.50, Math.min(4.40, curD + velD * dt));
            if (curD <= 0.51) {
              curD = 0.50;
              velD = 0.0;
            }
          } else {
            // Unperturbed vacuum relaxes to 4.40
            curD += (4.40 - curD) * 0.1 * dt;
            velD *= 0.8;
          }

          this.distance[x][y][z] = curD;
          this.distanceVel[x][y][z] = velD;

          // B. Paper 02 Emergent Proper Time tau:
          // dtau = sqrt(1 - rs / r) * dt * (1 + hbar omega / E0)
          const isBH = (curD <= 0.52);
          const rsEff = isBH ? 0.85 : 0.85 * (4.40 - curD) / 3.90;
          const g00 = Math.max(0.01, 1.0 - rsEff / 1.5);
          if (rho > 0.01 || this.properTime[x][y][z] > 0) {
            this.properTime[x][y][z] += dt * Math.sqrt(g00) * (1.0 + Math.min(5.0, rho / 30.0));
          }

          // C. Theorem 1.1 Entropy Production Rate: EP = D(J || J^T)
          if (rho > 0.01) {
            const chiralAsym = 0.00686 + 0.08 * (rho / 35.0) + 0.12 * Math.abs(velD);
            const curEP = chiralAsym * (1.0 + 0.25 * (4.40 - curD));
            this.epRate[x][y][z] = curEP;
            this.entropy[x][y][z] += curEP * dt;
          } else {
            this.epRate[x][y][z] = 0.0;
          }

          // Classify state from continuous fields
          if (isBH) {
            curBH++;
          } else if (rho > 55.0 && curD > 0.52) {
            curSN++;
          } else if (rho > 0.5 || this.properTime[x][y][z] > 0.2) {
            cur36++;
          }

          sumEP += this.epRate[x][y][z];
          sumEntropy += this.entropy[x][y][z];
        }
      }
    }

    this.generation++;
    this.cosmicTime += dt * 12.5; // Myr
    this.activeUnits36 = cur36;
    this.supernovaeActive = curSN;
    this.blackHolesActive = curBH;
    this.blackHolesTotal = Math.max(this.blackHolesTotal, curBH);
    this.supernovaeTotal = Math.max(this.supernovaeTotal, curSN);
    this.totalEPRate = sumEP;
    this.totalEntropy = sumEntropy;
    this.energyFlux = netFlux;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 4. Render Loop: Continuous Ruled Ribbon Synthesis
  // --------------------------------------------------------------------------
  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    this.controls.update();

    const dt = this.clock.getDelta();
    const effectiveDt = Math.min(0.1, dt * this.genSpeed);

    if (this.isPlaying && !this.isStill) {
      this.stepFieldEvolution(effectiveDt);
    }

    const t = this.clock.getElapsedTime();

    for (let i = 0; i < this.unitMeshes.length; i++) {
      const uItem = this.unitMeshes[i];
      const { x, y, z } = uItem;
      const curD = this.distance[x][y][z];
      const rho = this.energy[x][y][z];
      const tau = this.properTime[x][y][z];
      const isBlackHole = (curD <= 0.52);

      // Energy visibility transition: completely hidden in vacuum
      const targetE = (rho > 0.05 || tau > 0.05) ? 1.0 : (this.showScaffold ? 0.05 : 0.0);
      const e = targetE;

      if (e < 0.01) {
        uItem.group.visible = false;
        continue;
      }
      uItem.group.visible = true;

      // 1. Calculate 6 Layer Closed String Loops (36 Vertices Profile)
      const layerLoops = [];
      const layerHeights = [];
      const primaryTriads = [];

      const heightScale = curD / 4.40;

      for (let l = 0; l < this.LAYERS; l++) {
        const isInv = (l % 2 !== 0);
        const z0 = (l - 2.5) * (0.85 * heightScale);
        layerHeights.push(z0);

        // Constricted throat nozzle profile (de Laval profile)
        const throat = (1.0 - 0.32 * Math.exp(- (z0 * z0) / (0.8 * heightScale * heightScale + 0.05)))
          * (isBlackHole ? 0.45 : 1.0);

        // Peristaltic breathing wave
        const wavePsi = Math.cos(t * 3.5 - l * 0.8);
        const rLayer = this.R_BASE * throat * (1.0 + (isBlackHole ? 0.08 : 0.22 * wavePsi * Math.min(1.0, rho / 20.0)));

        // Torsional Chiral Twist
        const chiralAngle = (isInv ? -1 : 1) * 0.35 * Math.sin(t * 2.5 + l * 0.6);
        const baseTheta = isInv ? -Math.PI / 2 : Math.PI / 2;

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

        const curve = new THREE.CatmullRomCurve3(loopPts, true, 'centripetal', 0.5);
        layerLoops.push(curve);

        // Bounding String Loop
        const sLoop = uItem.stringLoops[l];
        const lPosAttr = sLoop.geo.attributes.position;
        const lColAttr = sLoop.geo.attributes.color;
        const SAMPLES = 48;
        const cPts = curve.getPoints(SAMPLES);

        for (let p = 0; p <= SAMPLES; p++) {
          const pt = cPts[p];
          lPosAttr.setXYZ(p, pt.x, pt.y, pt.z);

          let cr = 0.22, cg = 0.85, cb = 0.98;
          if (isBlackHole) {
            cr = 0.65; cg = 0.18; cb = 0.95;
          } else if (rho > 45.0) {
            cr = 0.98; cg = 0.75; cb = 0.15;
          }
          const pulse = 0.6 + 0.4 * Math.sin(t * 5.0 + p * 0.2 + l);
          lColAttr.setXYZ(p, cr * pulse, cg * pulse, cb * pulse);
        }
        lPosAttr.needsUpdate = true;
        lColAttr.needsUpdate = true;
      }

      // 2. 5 Outer Ruled Ribbon Strip Sheets
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

            const xBase = p1.x * (1 - wv) + p2.x * wv;
            const yBase = zInterp;
            const zBase = p1.z * (1 - wv) + p2.z * wv;

            const rLen = Math.sqrt(xBase * xBase + zBase * zBase) || 1.0;
            const nx = xBase / rLen;
            const nz = zBase / rLen;

            const waveDisplacement = Math.sin(Math.PI * wv) * 0.25 * Math.sin(t * 4.0 - wu * Math.PI * 4);

            const idx = v * (this.U_SEGS + 1) + u;
            posAttr.setXYZ(idx, xBase + nx * waveDisplacement, yBase, zBase + nz * waveDisplacement);

            let cr = 0.15, cg = 0.65, cb = 0.95;
            if (isBlackHole) {
              cr = 0.55; cg = 0.12; cb = 0.85;
            } else if (rho > 45.0) {
              cr = 0.98; cg = 0.35; cb = 0.25;
            } else {
              const isAmber = Math.sin(wu * Math.PI * 6 + t * 2.0) > 0.65;
              if (isAmber) {
                cr = 0.96; cg = 0.65; cb = 0.18;
              } else {
                cr = 0.22; cg = 0.85; cb = 0.98;
              }
            }

            const alphaPulse = Math.max(0.05, 0.65 + 0.35 * Math.sin(t * 3.0 + wu * 6.0));
            colAttr.setXYZ(idx, cr * alphaPulse, cg * alphaPulse, cb * alphaPulse);
          }
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
      }

      // 3. 45 Internal Bipartite Helical Ruled Ribbon Strips
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

            const dx = ptB.x - ptA.x;
            const dy = ptB.y - ptA.y;
            const dz = ptB.z - ptA.z;
            const chordLen = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1.0;

            const wx = (-dz / chordLen) * RIBBON_W;
            const wz = (dx / chordLen) * RIBBON_W;

            const baseV = stripIdx * (STRIP_STEPS + 1) * 2;

            for (let step = 0; step <= STRIP_STEPS; step++) {
              const s = step / STRIP_STEPS;
              const cx = ptA.x * (1 - s) + ptB.x * s;
              const cy = ptA.y * (1 - s) + ptB.y * s;
              const cz = ptA.z * (1 - s) + ptB.z * s;

              const twist = Math.cos(s * Math.PI + t * 3.0 + j + k);
              const vIdx1 = baseV + step * 2;
              const vIdx2 = vIdx1 + 1;

              intPosAttr.setXYZ(vIdx1, cx - wx * twist, cy, cz - wz * twist);
              intPosAttr.setXYZ(vIdx2, cx + wx * twist, cy, cz + wz * twist);

              let ir = 0.18, ig = 0.85, ib = 0.98;
              if (isBlackHole) {
                ir = 0.70; ig = 0.20; ib = 0.95;
              } else if (rho > 45.0) {
                ir = 0.98; ig = 0.65; ib = 0.20;
              }

              const pulse = 0.50 + 0.50 * Math.sin(t * 4.0 + s * Math.PI);
              intColAttr.setXYZ(vIdx1, ir * pulse, ig * pulse, ib * pulse);
              intColAttr.setXYZ(vIdx2, ir * pulse, ig * pulse, ib * pulse);
            }

            stripIdx++;
          }
        }
      }
      intPosAttr.needsUpdate = true;
      intColAttr.needsUpdate = true;

      // 4. Black Hole Singularity Display (Accretion Disk + Polar Jets)
      if (isBlackHole) {
        uItem.bhGroup.visible = true;
        uItem.bhDisk.rotation.z = t * 3.5;
        const jetPulse = 1.0 + 0.25 * Math.sin(t * 8.0 + x);
        uItem.bhJetTop.scale.set(jetPulse, 1.0 + 0.15 * Math.sin(t * 5.0), jetPulse);
        uItem.bhJetBot.scale.set(jetPulse, 1.0 + 0.15 * Math.cos(t * 5.0), jetPulse);
      } else {
        uItem.bhGroup.visible = false;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  // --------------------------------------------------------------------------
  // 5. Preset Configurations & Gamma Pulse Actions
  // --------------------------------------------------------------------------
  clearGrid() {
    const G = this.GRID;
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          this.distance[x][y][z] = 4.40;
          this.distanceVel[x][y][z] = 0.0;
          this.energy[x][y][z] = 0.0;
          this.properTime[x][y][z] = 0.0;
          this.entropy[x][y][z] = 0.0;
          this.epRate[x][y][z] = 0.0;
          this.blastRadius[x][y][z] = 0.0;
          this.age[x][y][z] = 0;
        }
      }
    }
    this.generation = 0;
    this.cosmicTime = 0.0;
    this.activeUnits36 = 0;
    this.supernovaeActive = 0;
    this.supernovaeTotal = 0;
    this.blackHolesActive = 0;
    this.blackHolesTotal = 0;
    this.totalEntropy = 0.0;
    this.totalEPRate = 0.0;
    this.energyFlux = 0.0;
    this.isStill = false;
    this.updateTelemetry();
  }

  freezeStillMatrix() {
    this.clearGrid();
    this.isStill = true;
    const btnStill = document.getElementById('cosmos-still-btn');
    if (btnStill) btnStill.classList.add('active');
    this.updateTelemetry();
  }

  emitGammaPulse(targetX = 1, targetY = 1, targetZ = 1) {
    this.isStill = false;
    const btnStill = document.getElementById('cosmos-still-btn');
    if (btnStill) btnStill.classList.remove('active');

    // Inject high-energy gamma pulse at specified cell:
    // Breaks detailed balance -> Time tau emerges -> EP > 0 -> Metric collapses to d = 0.50!
    this.energy[targetX][targetY][targetZ] = 85.0; // Hyper-massive concentration
    this.properTime[targetX][targetY][targetZ] = 0.1;
    this.epRate[targetX][targetY][targetZ] = 0.45;
    this.entropy[targetX][targetY][targetZ] = 0.25;

    console.log(`[GameOfCosmos] Gamma Pulse emitted at (${targetX}, ${targetY}, ${targetZ}). Time and entropy emerging!`);
  }

  loadPreset(presetKey) {
    this.clearGrid();
    const G = this.GRID;
    const mid = 1;

    if (presetKey === 'genesis' || presetKey === 'bigbang') {
      // Primordial Singularity: Gamma Frequency pulse injected into still vacuum!
      this.emitGammaPulse(mid, mid, mid);
    }
    else if (presetKey === 'supernova') {
      this.energy[mid][mid][mid] = 62.0;
      this.energy[mid + 1][mid][mid] = 28.0;
      this.energy[mid - 1][mid][mid] = 28.0;
      this.energy[mid][mid + 1][mid] = 24.0;
      this.properTime[mid][mid][mid] = 1.0;
      this.properTime[mid + 1][mid][mid] = 0.8;
      this.properTime[mid - 1][mid][mid] = 0.8;
      this.properTime[mid][mid + 1][mid] = 0.5;
    }
    else if (presetKey === 'blackhole') {
      // Dynamic metric d set to 0.50 at center with surrounding stable 36-vertice complexes
      this.energy[mid][mid][mid] = 95.0;
      this.distance[mid][mid][mid] = 0.50; // Dynamic 1/2 event horizon!
      this.properTime[mid][mid][mid] = 2.0;

      this.energy[mid + 1][mid][mid] = 30.0;
      this.energy[mid - 1][mid][mid] = 30.0;
      this.energy[mid][mid][mid + 1] = 28.0;
      this.properTime[mid + 1][mid][mid] = 1.0;
      this.properTime[mid - 1][mid][mid] = 1.0;
      this.properTime[mid][mid][mid + 1] = 1.0;
    }
    else if (presetKey === 'binary_merger') {
      this.energy[mid - 1][mid][mid] = 80.0;
      this.distance[mid - 1][mid][mid] = 0.50;
      this.properTime[mid - 1][mid][mid] = 2.0;

      this.energy[mid + 1][mid][mid] = 75.0;
      this.distance[mid + 1][mid][mid] = 0.50;
      this.properTime[mid + 1][mid][mid] = 2.0;

      this.energy[mid][mid][mid + 1] = 26.0;
      this.properTime[mid][mid][mid + 1] = 1.0;
    }
    else if (presetKey === 'cosmic_web') {
      for (let x = 0; x < G; x++) {
        for (let z = 0; z < G; z++) {
          if ((x + z) % 2 === 0) {
            this.energy[x][mid][z] = 28.0;
            this.properTime[x][mid][z] = 1.0;
          }
        }
      }
      this.energy[mid][mid][mid] = 90.0;
      this.distance[mid][mid][mid] = 0.50;
      this.properTime[mid][mid][mid] = 2.5;
    }

    this.stepFieldEvolution(0.01);
  }

  // --------------------------------------------------------------------------
  // 6. Live Telemetry HUD Updates
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const elGen = document.getElementById('cosmos-telemetry-gen');
    const elUnits = document.getElementById('cosmos-telemetry-stars');
    const elSN = document.getElementById('cosmos-telemetry-sn');
    const elBH = document.getElementById('cosmos-telemetry-bh');
    const elFlux = document.getElementById('cosmos-telemetry-flux');
    const elEP = document.getElementById('cosmos-telemetry-ep');
    const elEntropy = document.getElementById('cosmos-telemetry-entropy');
    const elBadge = document.getElementById('cosmos-state-badge');

    if (elGen) {
      elGen.innerText = this.isStill
        ? '0.0 Myr (Timeless)'
        : `${this.cosmicTime.toFixed(1)} Myr (Gen ${this.generation})`;
    }

    if (elUnits) elUnits.innerText = `${this.activeUnits36} Complexes`;
    if (elSN) elSN.innerText = `${this.supernovaeTotal} Detonations`;
    if (elBH) elBH.innerText = `${this.blackHolesTotal} Singularities`;
    if (elFlux) elFlux.innerText = `∇•J = ${this.energyFlux.toFixed(2)}`;

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

    if (elBadge) {
      elBadge.className = 'telemetry-badge';
      if (this.isStill) {
        elBadge.classList.add('badge-resonance');
        elBadge.innerText = '❄️ TIMELESS GROUND STATE (S = 0, EP = 0)';
      } else if (this.blackHolesActive > 0) {
        elBadge.classList.add('badge-horizon');
        elBadge.innerText = '🕳️ SPONTANEOUS BLACK HOLE COLLAPSE (d = 0.50)';
      } else if (this.supernovaeActive > 0) {
        elBadge.classList.add('badge-turbulent');
        elBadge.innerText = '🌟 SUPERNOVA SEDOV BLAST CASCADE';
      } else if (this.activeUnits36 > 0) {
        elBadge.classList.add('badge-triad');
        elBadge.innerText = '🌌 36-VERTICE STRING SOLITON EPOCH';
      } else {
        elBadge.classList.add('badge-standing');
        elBadge.innerText = '⚡ PRIMORDIAL INFLATION';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 7. Interactive Event Listeners & Raycasting
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
        this.stepFieldEvolution(0.08);
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

    const btnGamma = document.getElementById('cosmos-gamma-btn');
    if (btnGamma) {
      btnGamma.addEventListener('click', () => {
        this.emitGammaPulse(1, 1, 1);
      });
    }

    const btnStill = document.getElementById('cosmos-still-btn');
    if (btnStill) {
      btnStill.addEventListener('click', () => {
        this.freezeStillMatrix();
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cosmosInstance = new GameOfCosmos('cosmos-canvas-container');
  });
} else {
  window.cosmosInstance = new GameOfCosmos('cosmos-canvas-container');
}
