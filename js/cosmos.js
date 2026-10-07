import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================================
// THE GAME OF COSMOS: ASTROPHYSICAL 3D K3,3 AUTOMATON
// Units of 3D Spacetime: Complete Bipartite Graph K3,3 (6 Vertices, 9 Chords)
// Relativistic Evolution: Primordial Singularity -> Cosmic Inflation ->
// Protostellar Condensation -> Chandrasekhar Core-Collapse Supernovae ->
// Schwarzschild Black Hole Emergence with Accretion Disks and Polar Jets.
// ============================================================================

export const STATE_VACUUM = 0;       // Quantum vacuum with zero-point fluctuations
export const STATE_INFLATION = 1;    // Primordial relativistic plasma (T > 10^9 K)
export const STATE_PROTOSTAR = 2;    // Jeans gravitational accretion envelope (T ~ 10^4 K)
export const STATE_STELLAR_CORE = 3; // Hydrostatic nuclear fusion star (10 - 45 M_sun)
export const STATE_SUPERNOVA = 4;    // Chandrasekhar core-collapse detonation (Sedov blast)
export const STATE_NEUTRON_STAR = 5; // Ultra-dense degenerate pulsar remnant
export const STATE_BLACK_HOLE = 6;   // Schwarzschild singularity (Event horizon, accretion disk, relativistic polar jets)

class GameOfCosmosSimulation {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.GRID = 7;      // 7x7x7 = 343 K3,3 unit cells in 3D spacetime
    this.SPACING = 5.2; // Spatial metric separation between K3,3 cells

    // Automaton State & Clock
    this.isPlaying = true;
    this.generation = 0;
    this.genSpeed = 3.0; // Generations per second
    this.lastStepTime = 0;

    // Relativistic Rule System
    this.ruleMode = 'astrophysics'; // 'astrophysics' | 'supernova_cascade' | 'blackhole_growth' | 'inflation' | 'bays4555'

    // Visual Flags
    this.showScaffold = false;
    this.autoRotate = true;

    // Cosmological Statistics
    this.activeStars = 0;
    this.supernovaeActive = 0;
    this.supernovaeTotal = 0;
    this.blackHolesActive = 0;
    this.blackHolesTotal = 0;
    this.energyFlux = 0.0;

    // 3D Grid State Arrays: [x][y][z]
    this.state = this.create3DArray(this.GRID, STATE_VACUUM);
    this.nextState = this.create3DArray(this.GRID, STATE_VACUUM);
    this.age = this.create3DArray(this.GRID, 0);
    this.mass = this.create3DArray(this.GRID, 0.0);
    this.energy = this.create3DArray(this.GRID, 0.0);
    this.blastRadius = this.create3DArray(this.GRID, 0.0);

    this.initScene();
    this.initGeometry();
    this.initCosmicAssets();
    this.initControls();
    this.initUI();
    this.initObserver();

    // Start with Big Bang Genesis Preset
    this.loadPreset('genesis');
    this.updateTelemetry();
    this.animate();
  }

  create3DArray(size, defaultVal) {
    const arr = [];
    for (let x = 0; x < size; x++) {
      const rowY = [];
      for (let y = 0; y < size; y++) {
        const rowZ = [];
        for (let z = 0; z < size; z++) {
          rowZ.push(defaultVal);
        }
        rowY.push(rowZ);
      }
      arr.push(rowY);
    }
    return arr;
  }

  // --------------------------------------------------------------------------
  // 1. Scene, Camera, Lighting & Deep Cosmic Atmosphere
  // --------------------------------------------------------------------------
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x040711, 0.0075);

    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || 650;

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.defaultCamPos = new THREE.Vector3(38, 28, 44);
    this.camera.position.copy(this.defaultCamPos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    this.canvasEl = this.renderer.domElement;
    this.canvasEl.id = 'cosmos-three-canvas';
    this.container.appendChild(this.canvasEl);

    this.controls = new OrbitControls(this.camera, this.canvasEl);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = this.autoRotate;
    this.controls.autoRotateSpeed = 0.65;
    this.controls.maxDistance = 160;
    this.controls.minDistance = 8;

    // Atmospheric Multi-Point Cinematic Lighting
    this.scene.add(new THREE.AmbientLight(0x0b1329, 2.6));

    const pl1 = new THREE.PointLight(0x38bdf8, 4.2, 150);
    pl1.position.set(32, 42, 32);
    this.scene.add(pl1);

    const pl2 = new THREE.PointLight(0xf59e0b, 3.8, 150);
    pl2.position.set(-32, -36, -32);
    this.scene.add(pl2);

    const plCenter = new THREE.PointLight(0xa855f7, 3.0, 70);
    plCenter.position.set(0, 0, 0);
    this.scene.add(plCenter);

    // Deep Cosmic Starfield (2400 background stars)
    const sGeo = new THREE.BufferGeometry();
    const sCount = 2400;
    const sPos = new Float32Array(sCount * 3);
    const sCol = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 240;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 240;
      const isGold = Math.random() > 0.65;
      sCol[i * 3] = isGold ? 0.96 : 0.25;
      sCol[i * 3 + 1] = isGold ? 0.68 : 0.78;
      sCol[i * 3 + 2] = isGold ? 0.18 : 0.98;
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
    const sMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending
    });
    this.scene.add(new THREE.Points(sGeo, sMat));

    // Outer Bounding Spacetime Metric Box
    const boxSize = (this.GRID - 1) * this.SPACING + 3.2;
    const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const boxEdges = new THREE.EdgesGeometry(boxGeo);
    const boxMat = new THREE.LineBasicMaterial({
      color: 0x334155,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    this.scene.add(new THREE.LineSegments(boxEdges, boxMat));

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    this.clock = new THREE.Clock();
  }

  // --------------------------------------------------------------------------
  // 2. K3,3 Simplicial Geometry Setup (343 Units x 6 Nodes x 9 Bipartite Chords)
  // --------------------------------------------------------------------------
  initGeometry() {
    const totalUnits = this.GRID * this.GRID * this.GRID; // 343

    // Local K3,3 Coordinates:
    // Triad A (Top plane, height +0.85):
    this.localA = [
      new THREE.Vector3(0, 0.85, 1.25),
      new THREE.Vector3(-1.08, 0.85, -0.62),
      new THREE.Vector3(1.08, 0.85, -0.62)
    ];

    // Triad B (Bottom plane, height -0.85):
    this.localB = [
      new THREE.Vector3(0, -0.85, -1.25),
      new THREE.Vector3(-1.08, -0.85, 0.62),
      new THREE.Vector3(1.08, -0.85, 0.62)
    ];

    // 1. Instanced Mesh for Triad A
    const sphereGeoA = new THREE.SphereGeometry(0.38, 20, 20);
    this.matSphereA = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.85,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0
    });
    this.meshA = new THREE.InstancedMesh(sphereGeoA, this.matSphereA, totalUnits * 3);
    this.meshA.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mainGroup.add(this.meshA);

    // 2. Instanced Mesh for Triad B
    const sphereGeoB = new THREE.SphereGeometry(0.34, 20, 20);
    this.matSphereB = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.8,
      roughness: 0.12,
      metalness: 0.2,
      clearcoat: 1.0
    });
    this.meshB = new THREE.InstancedMesh(sphereGeoB, this.matSphereB, totalUnits * 3);
    this.meshB.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mainGroup.add(this.meshB);

    // 3. LineSegments for all 9 Bipartite Bonds per K3,3 unit (343 * 9 = 3087 lines)
    const totalLines = totalUnits * 9;
    const linePositions = new Float32Array(totalLines * 2 * 3);
    const lineColors = new Float32Array(totalLines * 2 * 3);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    this.bondMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.bondsLines = new THREE.LineSegments(lineGeo, this.bondMat);
    this.mainGroup.add(this.bondsLines);

    // 4. Inactive Cosmic Lattice Scaffold
    const scafPositions = [];
    const half = (this.GRID - 1) / 2;
    for (let x = 0; x < this.GRID; x++) {
      for (let y = 0; y < this.GRID; y++) {
        for (let z = 0; z < this.GRID; z++) {
          const cx = (x - half) * this.SPACING;
          const cy = (y - half) * this.SPACING;
          const cz = (z - half) * this.SPACING;
          scafPositions.push(cx - 0.25, cy, cz, cx + 0.25, cy, cz);
          scafPositions.push(cx, cy - 0.25, cz, cx, cy + 0.25, cz);
          scafPositions.push(cx, cy, cz - 0.25, cx, cy, cz + 0.25);
        }
      }
    }
    const scafGeo = new THREE.BufferGeometry();
    scafGeo.setAttribute('position', new THREE.Float32BufferAttribute(scafPositions, 3));
    this.scafMat = new THREE.LineBasicMaterial({
      color: 0x475569,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    this.scaffoldMesh = new THREE.LineSegments(scafGeo, this.scafMat);
    this.scaffoldMesh.visible = this.showScaffold;
    this.mainGroup.add(this.scaffoldMesh);
  }

  // --------------------------------------------------------------------------
  // 3. Dedicated Astrophysical Assets (Supernovae, Black Holes, Stellar Cores)
  // --------------------------------------------------------------------------
  createGlowTexture(colorStr) {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, colorStr);
    grad.addColorStop(0.35, colorStr);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  initCosmicAssets() {
    this.starTex = this.createGlowTexture('rgba(255, 255, 255, 1)');
    this.haloTex = this.createGlowTexture('rgba(56, 189, 248, 0.95)');
    this.snTex = this.createGlowTexture('rgba(245, 158, 11, 0.95)');

    // 1. Supernova Blast Shells Pool (up to 16 concurrent detonations)
    this.MAX_SN = 16;
    this.snPool = [];
    const snGeo = new THREE.SphereGeometry(1.0, 32, 24);
    const snRingGeo = new THREE.RingGeometry(0.9, 1.35, 48);
    snRingGeo.rotateX(Math.PI / 2);

    for (let i = 0; i < this.MAX_SN; i++) {
      const g = new THREE.Group();
      const sMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(snGeo, sMat);
      g.add(mesh);

      const rMat = new THREE.MeshBasicMaterial({
        color: 0xf43f5e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(snRingGeo, rMat);
      g.add(ring);

      g.visible = false;
      this.mainGroup.add(g);
      this.snPool.push({ group: g, sphereMat: sMat, ringMat: rMat, mesh, ring, active: false, radius: 0, x: 0, y: 0, z: 0 });
    }

    // 2. Black Hole Singularities Pool (up to 12 concurrent black holes)
    this.MAX_BH = 12;
    this.bhPool = [];
    const bhShadowGeo = new THREE.SphereGeometry(0.85, 28, 28);
    const bhDiskGeo = new THREE.RingGeometry(0.95, 2.5, 64);
    bhDiskGeo.rotateX(Math.PI / 2);
    const bhPhotonGeo = new THREE.TorusGeometry(1.28, 0.035, 16, 64);
    bhPhotonGeo.rotateX(Math.PI / 2);

    // Relativistic Polar Jet Cylinders
    const jetGeoTop = new THREE.CylinderGeometry(0.06, 0.35, 4.5, 16);
    jetGeoTop.translate(0, 2.25, 0);
    const jetGeoBot = new THREE.CylinderGeometry(0.35, 0.06, 4.5, 16);
    jetGeoBot.translate(0, -2.25, 0);

    for (let i = 0; i < this.MAX_BH; i++) {
      const g = new THREE.Group();

      // Pitch-black central Schwarzschild horizon void
      const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const shadow = new THREE.Mesh(bhShadowGeo, shadowMat);
      g.add(shadow);

      // Incandescent Keplerian accretion disk
      const diskMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending
      });
      const disk = new THREE.Mesh(bhDiskGeo, diskMat);
      g.add(disk);

      // Photon sphere boundary
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const photonRing = new THREE.Mesh(bhPhotonGeo, photonMat);
      g.add(photonRing);

      // Collimated relativistic polar jets along +/- y
      const jetMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const topJet = new THREE.Mesh(jetGeoTop, jetMat);
      const botJet = new THREE.Mesh(jetGeoBot, jetMat);
      g.add(topJet);
      g.add(botJet);

      g.visible = false;
      this.mainGroup.add(g);
      this.bhPool.push({ group: g, disk, topJet, botJet, diskMat, jetMat, active: false, x: 0, y: 0, z: 0, mass: 10.0 });
    }

    // 3. Active Stellar Cores Pool (up to 48 stars)
    this.MAX_STARS = 48;
    this.starPool = [];
    const starGeo = new THREE.SphereGeometry(0.55, 20, 20);

    for (let i = 0; i < this.MAX_STARS; i++) {
      const sMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: 0x38bdf8,
        emissiveIntensity: 1.2,
        roughness: 0.1,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(starGeo, sMat);

      // Corona Sprite
      const cMat = new THREE.SpriteMaterial({
        map: this.haloTex,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const sprite = new THREE.Sprite(cMat);
      sprite.scale.set(2.4, 2.4, 1);
      mesh.add(sprite);

      mesh.visible = false;
      this.mainGroup.add(mesh);
      this.starPool.push({ mesh, sMat, sprite, cMat, active: false, x: 0, y: 0, z: 0 });
    }
  }

  // --------------------------------------------------------------------------
  // 4. Relativistic Cosmological Automaton Engine (Genesis & Stellar Lifecycle)
  // --------------------------------------------------------------------------
  countNeighbors(x, y, z) {
    const G = this.GRID;
    let nbrPlasma = 0;
    let nbrProtostar = 0;
    let nbrStars = 0;
    let nbrSupernovae = 0;
    let nbrBlackHoles = 0;
    let totalMass = 0;
    let activeNeighbors = 0;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue;
          let nx = x + dx;
          let ny = y + dy;
          let nz = z + dz;
          if (nx < 0 || nx >= G || ny < 0 || ny >= G || nz < 0 || nz >= G) continue;

          const st = this.state[nx][ny][nz];
          totalMass += this.mass[nx][ny][nz];
          if (st > STATE_VACUUM) activeNeighbors++;

          if (st === STATE_INFLATION) nbrPlasma++;
          else if (st === STATE_PROTOSTAR) nbrProtostar++;
          else if (st === STATE_STELLAR_CORE) nbrStars++;
          else if (st === STATE_SUPERNOVA) nbrSupernovae++;
          else if (st === STATE_BLACK_HOLE) nbrBlackHoles++;
        }
      }
    }

    return { nbrPlasma, nbrProtostar, nbrStars, nbrSupernovae, nbrBlackHoles, totalMass, activeNeighbors };
  }

  stepGeneration() {
    const G = this.GRID;
    let curStars = 0;
    let curSN = 0;
    let curBH = 0;
    let netFlux = 0.0;

    // First pass: Compute next states based on Relativistic Stellar Physics
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.state[x][y][z];
          const curAge = this.age[x][y][z];
          const curMass = this.mass[x][y][z];
          const { nbrPlasma, nbrProtostar, nbrStars, nbrSupernovae, nbrBlackHoles, totalMass, activeNeighbors } = this.countNeighbors(x, y, z);

          let next = st;
          let newMass = curMass;

          if (st === STATE_VACUUM) {
            // A. Supernova Blast Wave Trigger: Sedov shock compresses vacuum gas -> Jeans instability -> Protostar
            if (nbrSupernovae > 0) {
              next = STATE_PROTOSTAR;
              newMass = 14.0 + Math.random() * 26.0;
              netFlux += 1.5;
            }
            // B. Primordial Inflationary Condensation during early universe
            else if (nbrPlasma >= 3 && this.generation < 25) {
              next = STATE_PROTOSTAR;
              newMass = 18.0 + Math.random() * 22.0;
              netFlux += 1.2;
            }
            // C. Black Hole Accretion Ionization along polar jet line
            else if (nbrBlackHoles > 0 && Math.random() < 0.15) {
              next = STATE_INFLATION;
              newMass = 8.0;
              netFlux += 0.8;
            }
          }
          else if (st === STATE_INFLATION) {
            // Early inflationary expansion
            if (this.generation < 6 && activeNeighbors < 6) {
              next = STATE_INFLATION;
            } else if (curAge >= 2) {
              // Plasma cools below recombination temperature -> Protostars condense
              next = STATE_PROTOSTAR;
              newMass = 20.0 + Math.random() * 20.0;
            }
          }
          else if (st === STATE_PROTOSTAR) {
            // Accrete mass for 2 generations
            if (curAge >= 2) {
              // Thermonuclear fusion ignites in dense core -> Main-Sequence Star!
              next = STATE_STELLAR_CORE;
              newMass = Math.max(12.0, curMass + nbrProtostar * 2.0);
              netFlux += 2.0;
            } else {
              newMass += 1.5;
            }
          }
          else if (st === STATE_STELLAR_CORE) {
            // Massive Star Lifecycle: Burns fuel for lifetime tau
            // Star with higher mass has faster nuclear consumption!
            const tau = curMass > 30.0 ? 3 : (curMass > 20.0 ? 4 : 5);

            // Core-Collapse Trigger: exhausted fuel OR struck by neighboring supernova blast wave
            if (curAge >= tau || (nbrSupernovae >= 1 && Math.random() > 0.4)) {
              // Chandrasekhar Core Collapse Supernova Detonation!
              next = STATE_SUPERNOVA;
              this.supernovaeTotal++;
              netFlux += 5.0;
            } else {
              // Hydrostatic stability
              next = STATE_STELLAR_CORE;
            }
          }
          else if (st === STATE_SUPERNOVA) {
            // Detonation blast wave expands for 2 generations
            if (curAge >= 2) {
              // Remnant Collapse Criterion (Tolman-Oppenheimer-Volkoff limit):
              // If massive progenitor core (M >= 22 M_sun):
              // COLLAPSE PAST SCHWARZSCHILD RADIUS -> BLACK HOLE EMERGENCE!
              if (curMass >= 22.0 || this.blackHolesTotal === 0) {
                next = STATE_BLACK_HOLE;
                newMass = 10.0 + curMass * 0.45;
                this.blackHolesTotal++;
                netFlux += 8.0;
              } else {
                next = STATE_NEUTRON_STAR;
                newMass = 1.8;
              }
            } else {
              next = STATE_SUPERNOVA;
            }
          }
          else if (st === STATE_BLACK_HOLE) {
            // Permanent Singularity: Accretes matter from neighbors
            next = STATE_BLACK_HOLE;
            newMass += (nbrProtostar + nbrPlasma) * 1.5;

            // Check Binary Black Hole Coalescence
            if (nbrBlackHoles > 0) {
              // Coalesces with neighbor, emitting gravitational quadrupole radiation
              newMass += 15.0;
              netFlux += 10.0;
            }
          }
          else if (st === STATE_NEUTRON_STAR) {
            if (curAge >= 10) {
              next = STATE_VACUUM; // Radiative cooling / pulsar spin-down
            } else if (totalMass > 40.0) {
              // Accretion induced collapse to Black Hole
              next = STATE_BLACK_HOLE;
              this.blackHolesTotal++;
            }
          }

          this.nextState[x][y][z] = next;
          this.mass[x][y][z] = newMass;

          if (next === STATE_PROTOSTAR || next === STATE_STELLAR_CORE) curStars++;
          if (next === STATE_SUPERNOVA) curSN++;
          if (next === STATE_BLACK_HOLE) curBH++;
        }
      }
    }

    // Second pass: Update state buffer and ages
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
    this.activeStars = curStars;
    this.supernovaeActive = curSN;
    this.blackHolesActive = curBH;
    this.energyFlux = netFlux;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 5. Render & Spatial Mesh Update Loop
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
    const half = (G - 1) / 2;
    const dummy = new THREE.Object3D();

    let instanceIdxA = 0;
    let instanceIdxB = 0;
    let lineIdx = 0;
    const linePosAttr = this.bondsLines.geometry.attributes.position;
    const lineColAttr = this.bondsLines.geometry.attributes.color;

    // Reset Pools
    let snIdx = 0;
    let bhIdx = 0;
    let starIdx = 0;

    for (let i = 0; i < this.MAX_SN; i++) this.snPool[i].group.visible = false;
    for (let i = 0; i < this.MAX_BH; i++) this.bhPool[i].group.visible = false;
    for (let i = 0; i < this.MAX_STARS; i++) this.starPool[i].mesh.visible = false;

    // Update 3D K3,3 units and astrophysical objects
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.state[x][y][z];
          const m = this.mass[x][y][z];
          const targetE = st > STATE_VACUUM ? 1.0 : 0.0;
          this.energy[x][y][z] += (targetE - this.energy[x][y][z]) * 0.18;
          const e = this.energy[x][y][z];

          const cx = (x - half) * this.SPACING;
          const cy = (y - half) * this.SPACING;
          const cz = (z - half) * this.SPACING;

          // Chiral twist of the K3,3 unit
          const unitTwist = Math.sin(t * 1.5 + x + y + z) * 0.15 * e;
          const cosTwist = Math.cos(unitTwist);
          const sinTwist = Math.sin(unitTwist);

          // Update Triad A vertices (Top 3)
          const worldA = [];
          for (let a = 0; a < 3; a++) {
            const loc = this.localA[a];
            const rx = loc.x * cosTwist - loc.z * sinTwist;
            const rz = loc.x * sinTwist + loc.z * cosTwist;
            const wx = cx + rx;
            const wy = cy + loc.y;
            const wz = cz + rz;
            worldA.push(new THREE.Vector3(wx, wy, wz));

            dummy.position.set(wx, wy, wz);
            const sphereScale = e > 0.02
              ? (0.85 + 0.25 * Math.sin(t * 3.5 + a + x)) * e
              : (this.showScaffold ? 0.08 : 0.0001);
            dummy.scale.setScalar(sphereScale);
            dummy.updateMatrix();
            this.meshA.setMatrixAt(instanceIdxA++, dummy.matrix);
          }

          // Update Triad B vertices (Bottom 3)
          const worldB = [];
          for (let b = 0; b < 3; b++) {
            const loc = this.localB[b];
            const rx = loc.x * cosTwist - loc.z * sinTwist;
            const rz = loc.x * sinTwist + loc.z * cosTwist;
            const wx = cx + rx;
            const wy = cy + loc.y;
            const wz = cz + rz;
            worldB.push(new THREE.Vector3(wx, wy, wz));

            dummy.position.set(wx, wy, wz);
            const sphereScale = e > 0.02
              ? (0.85 + 0.25 * Math.cos(t * 3.5 + b + y)) * e
              : (this.showScaffold ? 0.08 : 0.0001);
            dummy.scale.setScalar(sphereScale);
            dummy.updateMatrix();
            this.meshB.setMatrixAt(instanceIdxB++, dummy.matrix);
          }

          // Update 9 Bipartite Bonds
          for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 3; b++) {
              const pA = worldA[a];
              const pB = worldB[b];
              const v1 = lineIdx * 2;
              const v2 = lineIdx * 2 + 1;

              linePosAttr.setXYZ(v1, pA.x, pA.y, pA.z);
              linePosAttr.setXYZ(v2, pB.x, pB.y, pB.z);

              if (e > 0.02) {
                // Color bond based on state
                let r1 = 0.22, g1 = 0.85, b1 = 0.98;
                let r2 = 0.96, g2 = 0.65, b2 = 0.18;

                if (st === STATE_SUPERNOVA) {
                  r1 = 0.98; g1 = 0.25; b1 = 0.35; // Intense blast rose
                  r2 = 0.98; g2 = 0.75; b2 = 0.15; // Blast gold
                } else if (st === STATE_BLACK_HOLE) {
                  r1 = 0.65; g1 = 0.15; b1 = 0.95; // Relativistic violet
                  r2 = 0.98; g2 = 0.12; b2 = 0.15; // Horizon crimson
                } else if (st === STATE_INFLATION) {
                  r1 = 0.98; g1 = 0.95; b1 = 0.55; // Primordial gold
                  r2 = 0.95; g2 = 0.65; b2 = 0.15;
                }

                const pulse = 0.65 + 0.35 * Math.sin(t * 4.5 + a * 2.0 + b * 1.5 + x);
                lineColAttr.setXYZ(v1, r1 * e * pulse, g1 * e * pulse, b1 * e * pulse);
                lineColAttr.setXYZ(v2, r2 * e * pulse, g2 * e * pulse, b2 * e * pulse);
              } else if (this.showScaffold) {
                lineColAttr.setXYZ(v1, 0.12, 0.16, 0.24);
                lineColAttr.setXYZ(v2, 0.12, 0.16, 0.24);
              } else {
                lineColAttr.setXYZ(v1, 0, 0, 0);
                lineColAttr.setXYZ(v2, 0, 0, 0);
              }

              lineIdx++;
            }
          }

          // Dedicated Astrophysical Renders:
          // A. Core-Collapse Supernova Shockwave
          if (st === STATE_SUPERNOVA && snIdx < this.MAX_SN) {
            const sn = this.snPool[snIdx++];
            sn.group.visible = true;
            sn.group.position.set(cx, cy, cz);
            // Dynamic Sedov blast expansion: R ~ t^0.4
            this.blastRadius[x][y][z] += 0.08;
            const r = Math.min(3.8, this.blastRadius[x][y][z]);
            sn.mesh.scale.setScalar(r);
            sn.ring.scale.setScalar(r * 1.15);
            sn.ring.rotation.z = t * 2.5;
            sn.sphereMat.opacity = Math.max(0.1, 0.95 - (r / 3.8) * 0.85);
            sn.ringMat.opacity = Math.max(0.1, 0.9 - (r / 3.8) * 0.8);
          }

          // B. Schwarzschild Black Hole with Accretion Disk & Relativistic Jets
          else if (st === STATE_BLACK_HOLE && bhIdx < this.MAX_BH) {
            const bh = this.bhPool[bhIdx++];
            bh.group.visible = true;
            bh.group.position.set(cx, cy, cz);
            // Swirling accretion disk
            bh.disk.rotation.z = t * 3.5;
            // Relativistic jet pulsing
            const jetPulse = 1.0 + 0.3 * Math.sin(t * 8.0 + x * 2.0);
            bh.topJet.scale.set(jetPulse, 1.0 + 0.15 * Math.sin(t * 5.0), jetPulse);
            bh.botJet.scale.set(jetPulse, 1.0 + 0.15 * Math.cos(t * 5.0), jetPulse);
          }

          // C. Radiant Stellar Core
          else if (st === STATE_STELLAR_CORE && starIdx < this.MAX_STARS) {
            const star = this.starPool[starIdx++];
            star.mesh.visible = true;
            star.mesh.position.set(cx, cy, cz);
            // Star color based on mass
            if (m > 30.0) {
              star.sMat.color.setRGB(0.65, 0.85, 1.0); // O-type Blue Supergiant
              star.sMat.emissive.setRGB(0.2, 0.5, 0.95);
            } else if (m > 20.0) {
              star.sMat.color.setRGB(1.0, 0.95, 0.7); // G-type Gold
              star.sMat.emissive.setRGB(0.9, 0.7, 0.2);
            } else {
              star.sMat.color.setRGB(1.0, 0.45, 0.3); // Red Giant
              star.sMat.emissive.setRGB(0.8, 0.15, 0.1);
            }
            const sPulse = 1.0 + 0.12 * Math.sin(t * 4.0 + x + y);
            star.mesh.scale.setScalar(sPulse);
            star.sprite.scale.set(2.4 * sPulse, 2.4 * sPulse, 1);
          }
        }
      }
    }

    this.meshA.instanceMatrix.needsUpdate = true;
    this.meshB.instanceMatrix.needsUpdate = true;
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;

    // Gentle cosmological float
    this.mainGroup.position.y = Math.sin(t * 0.35) * 0.45;

    this.renderer.render(this.scene, this.camera);
  }

  // --------------------------------------------------------------------------
  // 6. Cosmic Presets (Big Bang Genesis, Supernova, Black Hole, Merger, Web)
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
          this.blastRadius[x][y][z] = 0.0;
        }
      }
    }
    this.generation = 0;
    this.activeStars = 0;
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
    const mid = Math.floor(G / 2); // 3

    if (presetKey === 'genesis' || presetKey === 'bigbang') {
      // 1. BIG BANG GENESIS: Primordial High-Energy Singularity
      // Center cell is super-dense relativistic inflation plasma
      this.state[mid][mid][mid] = STATE_INFLATION;
      this.mass[mid][mid][mid] = 120.0;
      this.energy[mid][mid][mid] = 1.0;

      // Surrounding primordial fireball kernel
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (dx * dx + dy * dy + dz * dz <= 2) {
              this.state[mid + dx][mid + dy][mid + dz] = STATE_INFLATION;
              this.mass[mid + dx][mid + dy][mid + dz] = 45.0;
              this.energy[mid + dx][mid + dy][mid + dz] = 1.0;
            }
          }
        }
      }
      this.ruleMode = 'astrophysics';
    }
    else if (presetKey === 'supernova') {
      // 2. CORE-COLLAPSE SUPERNOVA DETONATION
      // Massive supergiant at center ready to detonate, surrounded by protostellar clouds
      this.state[mid][mid][mid] = STATE_SUPERNOVA;
      this.mass[mid][mid][mid] = 38.0;
      this.blastRadius[mid][mid][mid] = 0.6;
      this.supernovaeTotal++;

      // Surrounding stellar cluster & gas envelopes
      const offsets = [
        [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
        [1, 1, 0], [-1, -1, 0], [0, 1, 1], [0, -1, -1]
      ];
      offsets.forEach(([dx, dy, dz]) => {
        this.state[mid + dx][mid + dy][mid + dz] = (Math.random() > 0.5) ? STATE_STELLAR_CORE : STATE_PROTOSTAR;
        this.mass[mid + dx][mid + dy][mid + dz] = 18.0 + Math.random() * 15.0;
      });
      this.ruleMode = 'supernova_cascade';
    }
    else if (presetKey === 'blackhole') {
      // 3. SCHWARZSCHILD BLACK HOLE & RELATIVISTIC POLAR JETS
      // Central active galactic nucleus singularity with accretion disk & jets
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.mass[mid][mid][mid] = 85.0;
      this.blackHolesTotal++;

      // Orbiting accretion gas clouds in horizontal plane
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const d2 = dx * dx + dz * dz;
          if (d2 >= 2 && d2 <= 5) {
            this.state[mid + dx][mid][mid + dz] = STATE_PROTOSTAR;
            this.mass[mid + dx][mid][mid + dz] = 12.0;
          }
        }
      }
      this.ruleMode = 'blackhole_growth';
    }
    else if (presetKey === 'binary_merger') {
      // 4. BINARY BLACK HOLE INSPIRAL & COALESCENCE
      // Two massive black holes in mutual orbit
      this.state[mid - 1][mid][mid] = STATE_BLACK_HOLE;
      this.mass[mid - 1][mid][mid] = 42.0;

      this.state[mid + 1][mid][mid] = STATE_BLACK_HOLE;
      this.mass[mid + 1][mid][mid] = 38.0;

      this.blackHolesTotal = 2;

      // Surrounding circumbinary accretion torus
      for (let dy = -1; dy <= 1; dy++) {
        this.state[mid - 1][mid + dy][mid + 1] = STATE_PROTOSTAR;
        this.state[mid + 1][mid + dy][mid - 1] = STATE_PROTOSTAR;
      }
      this.ruleMode = 'astrophysics';
    }
    else if (presetKey === 'cosmic_web') {
      // 5. LARGE-SCALE COSMIC WEB FILAMENTS & GALACTIC SUPERCLUSTERS
      for (let x = 0; x < G; x++) {
        const offY = Math.round(Math.sin((x / G) * Math.PI * 2) * 1.5);
        const offZ = Math.round(Math.cos((x / G) * Math.PI * 2) * 1.5);
        this.state[x][mid + offY][mid + offZ] = (x % 2 === 0) ? STATE_STELLAR_CORE : STATE_PROTOSTAR;
        this.mass[x][mid + offY][mid + offZ] = 20.0;

        this.state[x][mid - offY][mid - offZ] = STATE_PROTOSTAR;
        this.mass[x][mid - offY][mid - offZ] = 15.0;
      }
      this.state[mid][mid][mid] = STATE_BLACK_HOLE;
      this.mass[mid][mid][mid] = 60.0;
      this.blackHolesTotal++;
      this.ruleMode = 'astrophysics';
    }

    // Immediately tally active units from preset
    let curStars = 0, curSN = 0, curBH = 0;
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const st = this.state[x][y][z];
          if (st === STATE_PROTOSTAR || st === STATE_STELLAR_CORE) curStars++;
          if (st === STATE_SUPERNOVA) curSN++;
          if (st === STATE_BLACK_HOLE) curBH++;
        }
      }
    }
    this.activeStars = curStars;
    this.supernovaeActive = curSN;
    this.blackHolesActive = curBH;

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 7. Live Cosmological Telemetry & Diagnostic Feedback
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const elGen = document.getElementById('cosmos-telemetry-gen');
    const elStars = document.getElementById('cosmos-telemetry-stars');
    const elSN = document.getElementById('cosmos-telemetry-sn');
    const elBH = document.getElementById('cosmos-telemetry-bh');
    const elFlux = document.getElementById('cosmos-telemetry-flux');
    const elBadge = document.getElementById('cosmos-state-badge');

    const myr = (this.generation * 12.5).toFixed(0);

    if (elGen) elGen.innerText = `Gen ${this.generation} (${myr} Myr)`;
    if (elStars) elStars.innerText = `${this.activeStars} Cores`;
    if (elSN) elSN.innerText = `${this.supernovaeTotal} Detonations`;
    if (elBH) elBH.innerText = `${this.blackHolesTotal} Singularities`;
    if (elFlux) elFlux.innerText = `∇•J = ${this.energyFlux.toFixed(2)}`;

    if (elBadge) {
      elBadge.className = 'telemetry-badge';
      if (this.supernovaeActive > 0) {
        elBadge.classList.add('badge-turbulent');
        elBadge.innerText = '🌟 SUPERNOVA DETONATION CASCADE';
      } else if (this.blackHolesActive > 0) {
        elBadge.classList.add('badge-horizon');
        elBadge.innerText = '🕳️ BLACK HOLE SINGULARITY DOMINANCE';
      } else if (this.activeStars > 15) {
        elBadge.classList.add('badge-triad');
        elBadge.innerText = '🌌 ACTIVE STELLAR EPOCH';
      } else if (this.generation === 0) {
        elBadge.classList.add('badge-resonance');
        elBadge.innerText = '⚡ PRIMORDIAL SINGULARITY';
      } else {
        elBadge.classList.add('badge-wave');
        elBadge.innerText = '💥 COSMIC INFLATION';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 8. User Interaction & UI Controls
  // --------------------------------------------------------------------------
  initControls() {
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight || 650;
    if (w <= 0 || h <= 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  initObserver() {
    this.isVisible = true;
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      this.observer.observe(this.container);
    }
  }

  initUI() {
    // 1. Play / Pause
    const playBtn = document.getElementById('cosmos-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.innerHTML = this.isPlaying
          ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> <span>Pause</span>'
          : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> <span>Resume</span>';
      });
    }

    // 2. Step Generation
    const stepBtn = document.getElementById('cosmos-step-btn');
    if (stepBtn) {
      stepBtn.addEventListener('click', () => {
        this.stepGeneration();
      });
    }

    // 3. Clear Spacetime Void
    const clearBtn = document.getElementById('cosmos-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearGrid();
      });
    }

    // 4. Presets Buttons
    const presetChips = document.querySelectorAll('.cosmos-preset-chip');
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const pKey = chip.getAttribute('data-cosmos-preset');
        this.loadPreset(pKey);
      });
    });

    // 5. Speed Slider
    const speedSlider = document.getElementById('cosmos-speed-slider');
    const speedBadge = document.getElementById('cosmos-speed-badge');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.genSpeed = parseFloat(e.target.value);
        if (speedBadge) speedBadge.innerText = `${this.genSpeed.toFixed(1)} gen/s`;
      });
    }

    // 6. Rule Mode Selector
    const ruleSelector = document.getElementById('cosmos-rule-select');
    if (ruleSelector) {
      ruleSelector.addEventListener('change', (e) => {
        this.ruleMode = e.target.value;
        this.updateTelemetry();
      });
    }

    // 7. Scaffold Toggle
    const scafBtn = document.getElementById('cosmos-scaffold-btn');
    if (scafBtn) {
      scafBtn.addEventListener('click', () => {
        this.showScaffold = !this.showScaffold;
        if (this.scaffoldMesh) this.scaffoldMesh.visible = this.showScaffold;
        scafBtn.classList.toggle('active', this.showScaffold);
      });
    }

    // 8. Reset Camera
    const resetBtn = document.getElementById('cosmos-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.camera.position.set(38, 28, 44);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
      });
    }
  }
}

// Auto-initialize when DOM is ready
function initCosmosSimulation() {
  if (document.getElementById('cosmos-canvas-container') && !window.cosmosInstance) {
    window.cosmosInstance = new GameOfCosmosSimulation('cosmos-canvas-container');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCosmosSimulation);
} else {
  initCosmosSimulation();
}
