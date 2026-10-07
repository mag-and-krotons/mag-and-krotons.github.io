import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================================
// THE GAME OF COSMOS: 3D K3,3 CELLULAR AUTOMATON
// Units of 3D Space: Complete Bipartite Graph K3,3 (6 Vertices, 9 Chords)
// Conway Emergence Dynamics on a Discrete 3D Cosmic Lattice
// ============================================================================

class GameOfCosmosSimulation {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.GRID = 7; // 7x7x7 = 343 K3,3 units in 3D space
    this.SPACING = 5.2; // Distance between K3,3 unit centers

    // Automaton State
    this.isPlaying = true;
    this.generation = 0;
    this.genSpeed = 3.0; // Generations per second
    this.lastStepTime = 0;
    this.birthsLastGen = 0;
    this.deathsLastGen = 0;

    // Rules: Conway 3D / Triad Flux
    // Survival: [2, 3], Birth: [3] in 6-neighbor face topology
    this.ruleMode = 'conway6'; // 'conway6' | 'bays4555' | 'triad_flux'
    this.survivalRules = [2, 3];
    this.birthRules = [3];
    this.neighborMode = 6; // 6 (von Neumann) or 26 (Moore)
    this.wrapAround = true;

    // Visual Settings
    this.showScaffold = false;
    this.autoRotate = true;
    this.pulseIntensity = 1.0;

    // Grid Arrays: [x][y][z]
    this.grid = this.create3DArray(this.GRID, 0);
    this.nextGrid = this.create3DArray(this.GRID, 0);
    this.energy = this.create3DArray(this.GRID, 0.0); // Smooth visual rendering
    this.age = this.create3DArray(this.GRID, 0);

    this.initScene();
    this.initGeometry();
    this.initControls();
    this.initUI();
    this.initObserver();

    // Start with the Cosmic Soliton or Big Bang preset
    this.loadPreset('bigbang');
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
  // 1. Scene, Camera, Lighting & Starfield
  // --------------------------------------------------------------------------
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050811, 0.008);

    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || 650;

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.defaultCamPos = new THREE.Vector3(38, 28, 44);
    this.camera.position.copy(this.defaultCamPos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;

    this.canvasEl = this.renderer.domElement;
    this.canvasEl.id = 'cosmos-three-canvas';
    this.container.appendChild(this.canvasEl);

    this.controls = new OrbitControls(this.camera, this.canvasEl);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = this.autoRotate;
    this.controls.autoRotateSpeed = 0.6;
    this.controls.maxDistance = 150;
    this.controls.minDistance = 8;

    // Atmospheric Cosmic Lighting
    this.scene.add(new THREE.AmbientLight(0x0b1329, 2.8));

    const pl1 = new THREE.PointLight(0x38bdf8, 4.0, 140);
    pl1.position.set(30, 40, 30);
    this.scene.add(pl1);

    const pl2 = new THREE.PointLight(0xf59e0b, 3.5, 140);
    pl2.position.set(-30, -35, -30);
    this.scene.add(pl2);

    const plCenter = new THREE.PointLight(0x818cf8, 2.5, 60);
    plCenter.position.set(0, 0, 0);
    this.scene.add(plCenter);

    // Deep Cosmic Starfield
    const sGeo = new THREE.BufferGeometry();
    const sCount = 2000;
    const sPos = new Float32Array(sCount * 3);
    const sCol = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 220;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 180;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 220;
      const isGold = Math.random() > 0.7;
      sCol[i * 3] = isGold ? 0.96 : 0.22;
      sCol[i * 3 + 1] = isGold ? 0.65 : 0.75;
      sCol[i * 3 + 2] = isGold ? 0.18 : 0.98;
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
    const sMat = new THREE.PointsMaterial({
      size: 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    this.scene.add(new THREE.Points(sGeo, sMat));

    // Outer Bounding Lattice Cage (The Spacetime Box)
    const boxSize = (this.GRID - 1) * this.SPACING + 3.0;
    const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const boxEdges = new THREE.EdgesGeometry(boxGeo);
    const boxMat = new THREE.LineBasicMaterial({
      color: 0x334155,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    this.scene.add(new THREE.LineSegments(boxEdges, boxMat));

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouseRay = new THREE.Vector2(-999, -999);
  }

  // --------------------------------------------------------------------------
  // 2. K3,3 Unit Cell Geometry (Instanced Spheres & Line Segments)
  // --------------------------------------------------------------------------
  initGeometry() {
    const totalUnits = this.GRID * this.GRID * this.GRID; // 343

    // K3,3 Local Geometry Definition:
    // Triad A (Top Triangle, height +0.85):
    this.localA = [
      new THREE.Vector3(0, 0.85, 1.15),
      new THREE.Vector3(-1.0, 0.85, -0.58),
      new THREE.Vector3(1.0, 0.85, -0.58)
    ];

    // Triad B (Bottom Inverted Triangle, height -0.85):
    this.localB = [
      new THREE.Vector3(0, -0.85, -1.15),
      new THREE.Vector3(-1.0, -0.85, 0.58),
      new THREE.Vector3(1.0, -0.85, 0.58)
    ];

    // 1. Instanced Mesh for Triad A (Sapphire)
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

    // 2. Instanced Mesh for Triad B (Amber)
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

    // 3. LineSegments for all 9 Bipartite Bonds per K3,3 unit
    // Total lines = totalUnits * 9 edges = 343 * 9 = 3087 lines = 6174 vertices
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
          // Subtly outline the center of each cell
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
  // 3. Automaton Rules & Step Engine (Conway B3/S23 & 3D Topologies)
  // --------------------------------------------------------------------------
  countNeighbors(x, y, z) {
    let count = 0;
    const G = this.GRID;

    if (this.neighborMode === 6) {
      // 6 Face Neighbors (Von Neumann in 3D)
      const deltas = [
        [-1, 0, 0], [1, 0, 0],
        [0, -1, 0], [0, 1, 0],
        [0, 0, -1], [0, 0, 1]
      ];
      for (let i = 0; i < 6; i++) {
        const dx = deltas[i][0];
        const dy = deltas[i][1];
        const dz = deltas[i][2];
        let nx = x + dx;
        let ny = y + dy;
        let nz = z + dz;
        if (this.wrapAround) {
          nx = (nx + G) % G;
          ny = (ny + G) % G;
          nz = (nz + G) % G;
          count += this.grid[nx][ny][nz];
        } else {
          if (nx >= 0 && nx < G && ny >= 0 && ny < G && nz >= 0 && nz < G) {
            count += this.grid[nx][ny][nz];
          }
        }
      }
    } else {
      // 26 Box Neighbors (Moore in 3D)
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (dx === 0 && dy === 0 && dz === 0) continue;
            let nx = x + dx;
            let ny = y + dy;
            let nz = z + dz;
            if (this.wrapAround) {
              nx = (nx + G) % G;
              ny = (ny + G) % G;
              nz = (nz + G) % G;
              count += this.grid[nx][ny][nz];
            } else {
              if (nx >= 0 && nx < G && ny >= 0 && ny < G && nz >= 0 && nz < G) {
                count += this.grid[nx][ny][nz];
              }
            }
          }
        }
      }
    }
    return count;
  }

  stepGeneration() {
    const G = this.GRID;
    let births = 0;
    let deaths = 0;

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const current = this.grid[x][y][z];
          const nbrs = this.countNeighbors(x, y, z);
          let next = 0;

          if (current === 1) {
            // Check Survival rule
            if (this.survivalRules.includes(nbrs)) {
              next = 1;
              this.age[x][y][z]++;
            } else {
              next = 0;
              deaths++;
              this.age[x][y][z] = 0;
            }
          } else {
            // Check Birth rule
            if (this.birthRules.includes(nbrs)) {
              next = 1;
              births++;
              this.age[x][y][z] = 1;
            } else {
              next = 0;
            }
          }
          this.nextGrid[x][y][z] = next;
        }
      }
    }

    // Swap buffers
    const temp = this.grid;
    this.grid = this.nextGrid;
    this.nextGrid = temp;

    this.generation++;
    this.birthsLastGen = births;
    this.deathsLastGen = deaths;
    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 4. Render & Spatial Mesh Update Loop
  // --------------------------------------------------------------------------
  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    this.controls.update();

    const delta = this.clock.getDelta();
    this.elapsed = (this.elapsed || 0) + delta;

    // Advance generation according to genSpeed
    if (this.isPlaying) {
      this.lastStepTime += delta;
      const stepInterval = 1.0 / Math.max(0.2, this.genSpeed);
      if (this.lastStepTime >= stepInterval) {
        this.stepGeneration();
        this.lastStepTime = 0;
      }
    }

    // Smoothly update 3D K3,3 units
    const G = this.GRID;
    const half = (G - 1) / 2;
    const dummy = new THREE.Object3D();
    const t = this.elapsed;

    const linePosAttr = this.bondsLines.geometry.attributes.position;
    const lineColAttr = this.bondsLines.geometry.attributes.color;
    let lineIdx = 0;

    let instanceIdxA = 0;
    let instanceIdxB = 0;

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          const targetState = this.grid[x][y][z];
          // Smoothly lerp visual energy: births bloom, deaths dissolve
          this.energy[x][y][z] += (targetState - this.energy[x][y][z]) * 0.22;
          const e = this.energy[x][y][z];

          const cx = (x - half) * this.SPACING;
          const cy = (y - half) * this.SPACING;
          const cz = (z - half) * this.SPACING;

          // Chiral gentle twist per K3,3 unit
          const unitTwist = Math.sin(t * 1.5 + x + y + z) * 0.15 * e;
          const cosTwist = Math.cos(unitTwist);
          const sinTwist = Math.sin(unitTwist);

          // Update Triad A instances (3 per unit)
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
            // Dynamic scale matching energy + subtle life breathing
            const sphereScale = e > 0.02
              ? (0.8 + 0.2 * Math.sin(t * 3.0 + a + x)) * e
              : (this.showScaffold ? 0.08 : 0.0001);
            dummy.scale.setScalar(sphereScale);
            dummy.updateMatrix();
            this.meshA.setMatrixAt(instanceIdxA++, dummy.matrix);
          }

          // Update Triad B instances (3 per unit)
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
              ? (0.8 + 0.2 * Math.cos(t * 3.0 + b + y)) * e
              : (this.showScaffold ? 0.08 : 0.0001);
            dummy.scale.setScalar(sphereScale);
            dummy.updateMatrix();
            this.meshB.setMatrixAt(instanceIdxB++, dummy.matrix);
          }

          // Update 9 Bipartite Bonds between Triad A and Triad B
          for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 3; b++) {
              const pA = worldA[a];
              const pB = worldB[b];

              const v1 = lineIdx * 2;
              const v2 = lineIdx * 2 + 1;

              linePosAttr.setXYZ(v1, pA.x, pA.y, pA.z);
              linePosAttr.setXYZ(v2, pB.x, pB.y, pB.z);

              // Animated energy pulse traveling along the bipartite chord
              const pulse = Math.sin(t * 4.0 + a * 2.0 + b * 1.5 + x + z);
              const bondLuminescence = Math.max(0.0, e * (0.6 + 0.4 * pulse));

              if (e > 0.02) {
                // Flowing cyan-to-amber bipartite bond
                lineColAttr.setXYZ(v1, 0.22 * bondLuminescence, 0.85 * bondLuminescence, 0.98 * bondLuminescence);
                lineColAttr.setXYZ(v2, 0.96 * bondLuminescence, 0.65 * bondLuminescence, 0.18 * bondLuminescence);
              } else if (this.showScaffold) {
                lineColAttr.setXYZ(v1, 0.15, 0.2, 0.3);
                lineColAttr.setXYZ(v2, 0.15, 0.2, 0.3);
              } else {
                lineColAttr.setXYZ(v1, 0, 0, 0);
                lineColAttr.setXYZ(v2, 0, 0, 0);
              }

              lineIdx++;
            }
          }
        }
      }
    }

    this.meshA.instanceMatrix.needsUpdate = true;
    this.meshB.instanceMatrix.needsUpdate = true;
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;

    // Gentle global float
    this.mainGroup.position.y = Math.sin(t * 0.4) * 0.5;

    this.renderer.render(this.scene, this.camera);
  }

  // --------------------------------------------------------------------------
  // 5. Presets & Emergent Configurations
  // --------------------------------------------------------------------------
  clearGrid() {
    const G = this.GRID;
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          this.grid[x][y][z] = 0;
          this.energy[x][y][z] = 0;
          this.age[x][y][z] = 0;
        }
      }
    }
    this.generation = 0;
    this.birthsLastGen = 0;
    this.deathsLastGen = 0;
    this.updateTelemetry();
  }

  loadPreset(presetKey) {
    this.clearGrid();
    const G = this.GRID;
    const mid = Math.floor(G / 2); // 3

    if (presetKey === 'bigbang') {
      // Cosmic Big Bang: dense core cluster of 7 K3,3 units in center
      // Expands into rich cosmological filaments and satellite galaxies
      this.grid[mid][mid][mid] = 1;
      this.grid[mid - 1][mid][mid] = 1;
      this.grid[mid + 1][mid][mid] = 1;
      this.grid[mid][mid - 1][mid] = 1;
      this.grid[mid][mid + 1][mid] = 1;
      this.grid[mid][mid][mid - 1] = 1;
      this.grid[mid][mid][mid + 1] = 1;

      this.neighborMode = 6;
      this.survivalRules = [2, 3];
      this.birthRules = [3];
    } else if (presetKey === 'soliton') {
      // 3D K3,3 Glider / Soliton: travels diagonally through 3D spacetime
      this.neighborMode = 26;
      this.survivalRules = [3, 4, 5];
      this.birthRules = [3, 4];
      const s = mid - 1;
      // 3D glider seed
      this.grid[s][s][s] = 1;
      this.grid[s + 1][s][s] = 1;
      this.grid[s][s + 1][s] = 1;
      this.grid[s + 1][s + 1][s + 1] = 1;
      this.grid[s][s][s + 1] = 1;
    } else if (presetKey === 'pulsar') {
      // Triad Pulsar: Period-3 breathing oscillator
      this.neighborMode = 6;
      this.survivalRules = [2, 3];
      this.birthRules = [3];
      // Cross blinker triad in 3 planes
      for (let d = -1; d <= 1; d++) {
        this.grid[mid + d][mid][mid] = 1;
        this.grid[mid][mid + d][mid + 1] = 1;
        this.grid[mid][mid + d][mid - 1] = 1;
      }
    } else if (presetKey === 'helix') {
      // Chiral Helical Filament: vertical column of rotating K3,3 units
      this.neighborMode = 6;
      this.survivalRules = [2, 3, 4];
      this.birthRules = [3];
      for (let y = 1; y < G - 1; y++) {
        const offX = Math.round(Math.sin((y / G) * Math.PI * 2) * 1.5);
        const offZ = Math.round(Math.cos((y / G) * Math.PI * 2) * 1.5);
        this.grid[mid + offX][y][mid + offZ] = 1;
      }
    } else if (presetKey === 'galaxy') {
      // Stable Hyper-Galaxy (Still Life): 8-cell octahedron in thermodynamic equilibrium
      this.neighborMode = 6;
      this.survivalRules = [2, 3];
      this.birthRules = [3];
      const offsets = [
        [1, 0, 0], [-1, 0, 0],
        [0, 1, 0], [0, -1, 0],
        [0, 0, 1], [0, 0, -1]
      ];
      offsets.forEach(off => {
        this.grid[mid + off[0]][mid + off[1]][mid + off[2]] = 1;
      });
    } else if (presetKey === 'random') {
      // Primordial Quantum Soup with 18% density
      const density = 0.18;
      for (let x = 0; x < G; x++) {
        for (let y = 0; y < G; y++) {
          for (let z = 0; z < G; z++) {
            this.grid[x][y][z] = Math.random() < density ? 1 : 0;
          }
        }
      }
    }

    // Set initial energy to 1 for live cells
    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.grid[x][y][z] === 1) this.energy[x][y][z] = 1.0;
        }
      }
    }

    this.updateTelemetry();
  }

  // --------------------------------------------------------------------------
  // 6. Live Telemetry & Spatial Entropy Calculator
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const G = this.GRID;
    const totalCells = G * G * G;
    let liveCount = 0;

    // Calculate live population and Shannon spatial distribution entropy
    const layerCounts = new Array(G).fill(0);

    for (let x = 0; x < G; x++) {
      for (let y = 0; y < G; y++) {
        for (let z = 0; z < G; z++) {
          if (this.grid[x][y][z] === 1) {
            liveCount++;
            layerCounts[y]++;
          }
        }
      }
    }

    // Shannon spatial entropy across vertical layers
    let spatialEntropy = 0;
    if (liveCount > 0) {
      for (let y = 0; y < G; y++) {
        if (layerCounts[y] > 0) {
          const p = layerCounts[y] / liveCount;
          spatialEntropy -= p * Math.log(p);
        }
      }
    }

    // DOM Updates
    const elGen = document.getElementById('cosmos-telemetry-gen');
    const elPop = document.getElementById('cosmos-telemetry-pop');
    const elBonds = document.getElementById('cosmos-telemetry-bonds');
    const elFlux = document.getElementById('cosmos-telemetry-flux');
    const elEntropy = document.getElementById('cosmos-telemetry-entropy');
    const elBadge = document.getElementById('cosmos-state-badge');

    if (elGen) elGen.innerText = `Gen ${this.generation}`;
    if (elPop) elPop.innerText = `${liveCount} / ${totalCells} (${((liveCount / totalCells) * 100).toFixed(1)}%)`;
    if (elBonds) elBonds.innerText = `${liveCount * 9} active bonds`;
    if (elFlux) elFlux.innerText = `+${this.birthsLastGen} / -${this.deathsLastGen}`;
    if (elEntropy) elEntropy.innerText = `${spatialEntropy.toFixed(3)} nats`;

    if (elBadge) {
      elBadge.className = 'telemetry-badge';
      if (liveCount === 0) {
        elBadge.classList.add('badge-wave');
        elBadge.innerText = 'COSMIC VOID (0 UNITS)';
      } else if (this.birthsLastGen === 0 && this.deathsLastGen === 0 && this.generation > 1) {
        elBadge.classList.add('badge-resonance');
        elBadge.innerText = 'STABLE EQUILIBRIUM';
      } else if (liveCount > totalCells * 0.35) {
        elBadge.classList.add('badge-turbulent');
        elBadge.innerText = 'STELLAR EXPANSION';
      } else {
        elBadge.classList.add('badge-triad');
        elBadge.innerText = 'ORGANIC EMERGENCE';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 7. Interactive Controls & UI Binding
  // --------------------------------------------------------------------------
  initControls() {
    // Mouse Raycasting to toggle K3,3 units in 3D!
    this.canvasEl.addEventListener('pointerdown', (e) => {
      // Only toggle on left-click without drag
      const rect = this.canvasEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.mouseRay.set(x, y);

      this.raycaster.setFromCamera(this.mouseRay, this.camera);
      // Raycast against the spheres
      const intersects = this.raycaster.intersectObjects([this.meshA, this.meshB]);
      if (intersects.length > 0) {
        const hit = intersects[0];
        const instanceId = hit.instanceId;
        if (instanceId !== undefined) {
          const unitIdx = Math.floor(instanceId / 3);
          const G = this.GRID;
          const uz = unitIdx % G;
          const uy = Math.floor(unitIdx / G) % G;
          const ux = Math.floor(unitIdx / (G * G));
          if (ux >= 0 && ux < G && uy >= 0 && uy < G && uz >= 0 && uz < G) {
            this.grid[ux][uy][uz] = this.grid[ux][uy][uz] === 1 ? 0 : 1;
            this.updateTelemetry();
          }
        }
      }
    });

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight || 650;
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
          ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> <span>Pause</span>'
          : '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> <span>Resume</span>';
      });
    }

    // 2. Step Generation
    const stepBtn = document.getElementById('cosmos-step-btn');
    if (stepBtn) {
      stepBtn.addEventListener('click', () => {
        this.stepGeneration();
      });
    }

    // 3. Clear Grid
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
        const mode = e.target.value;
        if (mode === 'conway6') {
          this.neighborMode = 6;
          this.survivalRules = [2, 3];
          this.birthRules = [3];
        } else if (mode === 'bays4555') {
          this.neighborMode = 26;
          this.survivalRules = [4, 5];
          this.birthRules = [5];
        } else if (mode === 'triad_flux') {
          this.neighborMode = 6;
          this.survivalRules = [2, 3, 4];
          this.birthRules = [3];
        }
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
