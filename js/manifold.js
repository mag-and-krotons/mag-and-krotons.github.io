import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================================
// 36-NODE SIMPLICIAL COMPLEX: 6D FLUID MANIFOLD SIMULATION
// Wave Transmission Dynamics & Emergence Engine
// Parameters: Entropy (S), Frequency (f), Velocity (v), Distance (d),
//             Coupling (kappa), and Circulation Flow (Q).
// ============================================================================

class FluidManifoldSimulation {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.isPlaying = true;
    this.currentMode = 'fluid'; // 'fluid' | 'geodesic' | 'vortex'

    // Core Physical Parameters (with direct numerical entry & range sync)
    this.entropy = 0.20;       // S: 0.00 to 5.00 nats
    this.frequency = 1.00;     // f: 0.05 to 5.00 Hz (omega = 2*pi*f)
    this.velocity = 4.40;      // v: 0.50 to 20.00 units/s (transmission velocity)
    this.distance = 4.40;      // d: 1.50 to 8.00 units (inter-layer separation)
    this.coupling = 0.35;      // kappa: 0.00 to 2.00 (Lee-Yang merge parameter, 0.5*ln(2) ~ 0.347)
    this.flowRate = 1.00;      // Q: 0.10 to 3.00 flux (circulation / advection base)

    // Structural Geometry Constants
    this.R_BASE = 6.4;
    this.LAYERS = 6;
    this.SPLINE_SAMPLES = 48;
    this.PARTICLE_COUNT = 450;
    this.RIBBON_SEGS_U = 64;   // Angular perimeter resolution
    this.RIBBON_SEGS_V = 12;   // Inter-layer vertical resolution

    // Mouse wake / fluid agitation
    this.mouse = new THREE.Vector2(-999, -999);
    this.mouseImpulse = 0;
    this.mouseLayerTarget = 2.5;

    // Simulation Clock
    this.clock = new THREE.Clock();
    this.elapsed = 0;

    // Spacetime Geodesics & Photon Beam Simulation
    this.showPhotons = true;
    this.maxPhotons = 120;
    this.photons = [];
    this.photonsTrappedTotal = 0;

    this.initScene();
    this.initTopology();
    this.initControls();
    this.initUI();
    this.initObserver();
    this.updateTelemetry();
    if (window.triggerMathRendering) {
      window.triggerMathRendering(document.getElementById('manifold'));
    }
    this.animate();
  }

  // --------------------------------------------------------------------------
  // 1. Scene, Camera, Lighting & Atmosphere
  // --------------------------------------------------------------------------
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060913, 0.009);

    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || 650;

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.defaultCamPos = new THREE.Vector3(22, 18, 36);
    this.camera.position.copy(this.defaultCamPos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    this.canvasEl = this.renderer.domElement;
    this.canvasEl.id = 'manifold-three-canvas';
    this.container.appendChild(this.canvasEl);

    this.controls = new OrbitControls(this.camera, this.canvasEl);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.75;
    this.controls.maxDistance = 140;
    this.controls.minDistance = 6;

    // Complex Cinematic Lighting
    this.scene.add(new THREE.AmbientLight(0x0f172a, 2.4));

    this.plSapphire = new THREE.PointLight(0x38bdf8, 4.5, 130);
    this.plSapphire.position.set(28, 35, 28);
    this.scene.add(this.plSapphire);

    this.plAmber = new THREE.PointLight(0xf59e0b, 3.8, 130);
    this.plAmber.position.set(-28, -32, -28);
    this.scene.add(this.plAmber);

    this.plThroat = new THREE.PointLight(0x67e8f9, 3.0, 45);
    this.plThroat.position.set(0, 0, 0);
    this.scene.add(this.plThroat);

    const dl = new THREE.DirectionalLight(0xffffff, 1.4);
    dl.position.set(0, 45, 25);
    this.scene.add(dl);

    // Cosmic Quantum Particle Atmosphere
    const sGeo = new THREE.BufferGeometry();
    const sCount = 1800;
    const sPos = new Float32Array(sCount * 3);
    const sCol = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 180;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 140;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 180;
      const isAmber = Math.random() > 0.65;
      sCol[i * 3] = isAmber ? 0.95 : 0.22;
      sCol[i * 3 + 1] = isAmber ? 0.62 : 0.65;
      sCol[i * 3 + 2] = isAmber ? 0.15 : 0.95;
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
    const sMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.scene.add(new THREE.Points(sGeo, sMat));

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);
  }

  // --------------------------------------------------------------------------
  // 2. Glow Textures & Mathematical Asset Generators
  // --------------------------------------------------------------------------
  createGlowTexture(colorStr, innerStop = 0.35) {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, colorStr);
    grad.addColorStop(innerStop, colorStr);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  // --------------------------------------------------------------------------
  // 3. Topology & Simplicial Geometry Setup (36 Nodes, 90 Streams, 5 Ribbons)
  // --------------------------------------------------------------------------
  initTopology() {
    const texSapphire = this.createGlowTexture('rgba(56, 189, 248, 0.95)', 0.4);
    const texAmber = this.createGlowTexture('rgba(245, 158, 11, 0.92)', 0.4);

    // 1. 36 Nodes: 18 Primary Vertices (Sapphire) + 18 Midpoints (Amber)
    const vertGeo = new THREE.SphereGeometry(0.48, 32, 32);
    const midGeo = new THREE.SphereGeometry(0.36, 28, 28);

    this.matVert = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.85,
      roughness: 0.06,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    this.matMid = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.8,
      roughness: 0.08,
      metalness: 0.2,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08
    });

    this.vertMeshes = [];
    this.midMeshes = [];
    this.haloMeshes = [];
    this.orbitalRings = [];

    // Orbital ring geometry for vertices
    const ringGeo = new THREE.RingGeometry(0.68, 0.74, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    for (let l = 0; l < this.LAYERS; l++) {
      const vRow = [];
      const mRow = [];
      for (let j = 0; j < 3; j++) {
        // Primary Vertex Mesh
        const vm = new THREE.Mesh(vertGeo, this.matVert);
        this.mainGroup.add(vm);
        vRow.push(vm);

        // Orbital Phase Ring around primary vertex
        const orMesh = new THREE.Mesh(ringGeo, ringMat);
        orMesh.rotation.x = Math.PI / 2;
        this.mainGroup.add(orMesh);
        this.orbitalRings.push({ ring: orMesh, target: vm, layer: l, idx: j });

        // Sapphire Glow Halo
        const vHalo = new THREE.Sprite(new THREE.SpriteMaterial({
          map: texSapphire, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending
        }));
        vHalo.scale.set(2.4, 2.4, 1);
        this.mainGroup.add(vHalo);
        this.haloMeshes.push({ halo: vHalo, target: vm, baseScale: 2.4, color: 'sapphire' });

        // Midpoint Mesh (L/2 gate)
        const mm = new THREE.Mesh(midGeo, this.matMid);
        this.mainGroup.add(mm);
        mRow.push(mm);

        // Amber Glow Halo
        const mHalo = new THREE.Sprite(new THREE.SpriteMaterial({
          map: texAmber, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending
        }));
        mHalo.scale.set(1.85, 1.85, 1);
        this.mainGroup.add(mHalo);
        this.haloMeshes.push({ halo: mHalo, target: mm, baseScale: 1.85, color: 'amber' });
      }
      this.vertMeshes.push(vRow);
      this.midMeshes.push(mRow);
    }

    // 2. 90 Streamlines (Cross-Layer Geodesics with Traveling Packet Shaders)
    this.streamLines = [];
    for (let l = 0; l < this.LAYERS - 1; l++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          // Direction 1: Layer l vertex -> Layer l+1 midpoint
          const g1 = new THREE.BufferGeometry();
          const p1 = new Float32Array(this.SPLINE_SAMPLES * 3);
          const c1 = new Float32Array(this.SPLINE_SAMPLES * 3);
          g1.setAttribute('position', new THREE.BufferAttribute(p1, 3));
          g1.setAttribute('color', new THREE.BufferAttribute(c1, 3));
          const mat1 = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            linewidth: 1.5
          });
          const l1 = new THREE.Line(g1, mat1);
          this.mainGroup.add(l1);
          this.streamLines.push({
            line: l1,
            mat: mat1,
            from: { l, type: 'v', idx: j },
            to: { l: l + 1, type: 'm', idx: k },
            direction: 1
          });

          // Direction 2: Layer l+1 vertex -> Layer l midpoint
          const g2 = new THREE.BufferGeometry();
          const p2 = new Float32Array(this.SPLINE_SAMPLES * 3);
          const c2 = new Float32Array(this.SPLINE_SAMPLES * 3);
          g2.setAttribute('position', new THREE.BufferAttribute(p2, 3));
          g2.setAttribute('color', new THREE.BufferAttribute(c2, 3));
          const mat2 = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            linewidth: 1.5
          });
          const l2 = new THREE.Line(g2, mat2);
          this.mainGroup.add(l2);
          this.streamLines.push({
            line: l2,
            mat: mat2,
            from: { l: l + 1, type: 'v', idx: j },
            to: { l, type: 'm', idx: k },
            direction: -1
          });
        }
      }
    }

    // 3. 6 Horizontal Fluid Closed Loops (Layer Perimeter Rings)
    this.ringLines = [];
    for (let l = 0; l < this.LAYERS; l++) {
      const R_SAMPLES = 72;
      const rGeo = new THREE.BufferGeometry();
      rGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(R_SAMPLES * 3), 3));
      rGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(R_SAMPLES * 3), 3));
      const ringMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const rl = new THREE.Line(rGeo, ringMat);
      this.mainGroup.add(rl);
      this.ringLines.push({ line: rl, layer: l, samples: R_SAMPLES });
    }

    // 4. Luminous Volumetric Fluid Ribbons (5 Inter-layer Ruled Surface Meshes)
    this.ribbonMeshes = [];
    for (let l = 0; l < this.LAYERS - 1; l++) {
      const uSegs = this.RIBBON_SEGS_U;
      const vSegs = this.RIBBON_SEGS_V;
      const vertexCount = (uSegs + 1) * (vSegs + 1);
      const positions = new Float32Array(vertexCount * 3);
      const colors = new Float32Array(vertexCount * 3);
      const indices = [];

      for (let v = 0; v < vSegs; v++) {
        for (let u = 0; u < uSegs; u++) {
          const row1 = v * (uSegs + 1);
          const row2 = (v + 1) * (uSegs + 1);
          indices.push(row1 + u, row2 + u, row1 + u + 1);
          indices.push(row1 + u + 1, row2 + u, row2 + u + 1);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setIndex(indices);
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const rMat = new THREE.MeshPhysicalMaterial({
        vertexColors: true,
        roughness: 0.15,
        metalness: 0.1,
        transmission: 0.78,
        transparent: true,
        opacity: 0.38,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const rMesh = new THREE.Mesh(geo, rMat);
      this.mainGroup.add(rMesh);
      this.ribbonMeshes.push({
        mesh: rMesh,
        mat: rMat,
        l1: l,
        l2: l + 1,
        uSegs,
        vSegs
      });
    }

    // 5. Advection Quantum Quanta (Fluid Particles with Flux Acceleration)
    const pPos = new Float32Array(this.PARTICLE_COUNT * 3);
    const pCol = new Float32Array(this.PARTICLE_COUNT * 3);
    this.pData = [];

    for (let p = 0; p < this.PARTICLE_COUNT; p++) {
      const sIdx = Math.floor(Math.random() * this.streamLines.length);
      const u = Math.random();
      const spd = 0.4 + Math.random() * 0.6;
      // Per-particle entropy transverse drift coordinates
      const brownianX = 0;
      const brownianZ = 0;
      this.pData.push({ sIdx, u, spd, brownianX, brownianZ });
      pCol[p * 3] = 0.22;
      pCol[p * 3 + 1] = 0.85;
      pCol[p * 3 + 2] = 0.98;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pTex = this.createGlowTexture('rgba(255, 255, 255, 1)', 0.2);
    this.pMat = new THREE.PointsMaterial({
      size: 0.48,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleSys = new THREE.Points(pGeo, this.pMat);
    this.mainGroup.add(this.particleSys);

    // 6. Schwarzschild Event Horizon Throat Core & Accretion Photon Sphere
    this.initEventHorizon();

    // 7. Spacetime Photon Beam & Gravitational Lensing Stream
    this.initPhotonStream();
  }

  initEventHorizon() {
    this.eventHorizonGroup = new THREE.Group();
    this.eventHorizonGroup.position.set(0, 0, 0);

    // 1. Central Event Horizon Singularity Void (Schwarzschild Dark Throat Core)
    const sphereGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x010204,
      wireframe: false
    });
    this.horizonVoidSphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.eventHorizonGroup.add(this.horizonVoidSphere);

    // 2. Glowing Accretion Ring / Photon Sphere Plasma Disc (Horizontal Throat Plane)
    const ringGeo = new THREE.RingGeometry(0.75, 1.95, 64, 8);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.horizonAccretionRing = new THREE.Mesh(ringGeo, ringMat);
    this.eventHorizonGroup.add(this.horizonAccretionRing);

    // 3. Photon Sphere Wireframe Boundary Ring
    const torusGeo = new THREE.TorusGeometry(1.15, 0.035, 16, 64);
    torusGeo.rotateX(Math.PI / 2);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    this.horizonPhotonRing = new THREE.Mesh(torusGeo, torusMat);
    this.eventHorizonGroup.add(this.horizonPhotonRing);

    this.eventHorizonGroup.visible = false;
    this.mainGroup.add(this.eventHorizonGroup);
  }

  initPhotonStream() {
    this.photons = [];
    this.maxPhotons = 120;
    this.photonsTrappedTotal = 0;

    for (let p = 0; p < this.maxPhotons; p++) {
      const ph = {
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        history: [],
        trapped: false,
        color: new THREE.Color(0x38bdf8),
        alpha: 1.0,
        life: Math.random() * 3.0
      };
      this.respawnPhoton(ph);
      ph.pos.x = -26.0 + Math.random() * 52.0;
      this.photons.push(ph);
    }

    // Photon Heads Points System
    const ptPos = new Float32Array(this.maxPhotons * 3);
    const ptCol = new Float32Array(this.maxPhotons * 3);
    this.photonPointsGeo = new THREE.BufferGeometry();
    this.photonPointsGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
    this.photonPointsGeo.setAttribute('color', new THREE.BufferAttribute(ptCol, 3));

    const pTex = this.createGlowTexture('rgba(255, 255, 255, 1)', 0.25);
    this.photonPointsMat = new THREE.PointsMaterial({
      size: 0.75,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.photonPoints = new THREE.Points(this.photonPointsGeo, this.photonPointsMat);
    this.mainGroup.add(this.photonPoints);

    // Photon Geodesic Ray Trails (Lines System)
    this.MAX_TRAIL_VERTS = this.maxPhotons * 16;
    const lPos = new Float32Array(this.MAX_TRAIL_VERTS * 3);
    const lCol = new Float32Array(this.MAX_TRAIL_VERTS * 3);
    this.photonLinesGeo = new THREE.BufferGeometry();
    this.photonLinesGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
    this.photonLinesGeo.setAttribute('color', new THREE.BufferAttribute(lCol, 3));

    this.photonLinesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5,
      depthWrite: false
    });
    this.photonLines = new THREE.LineSegments(this.photonLinesGeo, this.photonLinesMat);
    this.mainGroup.add(this.photonLines);
  }

  respawnPhoton(ph) {
    const spreadY = 12.0;
    const spreadZ = 8.0;
    ph.pos.set(-26.0, (Math.random() - 0.5) * spreadY, (Math.random() - 0.5) * spreadZ);
    ph.vel.set(16.0, 0, 0);
    ph.history = [ph.pos.clone()];
    ph.trapped = false;
    ph.color.setRGB(0.22, 0.74, 0.97);
    ph.alpha = 1.0;
    ph.life = 0;
  }

  updatePhotons(delta, t, d) {
    if (!this.showPhotons) {
      if (this.photonPoints) this.photonPoints.visible = false;
      if (this.photonLines) this.photonLines.visible = false;
      if (this.eventHorizonGroup) this.eventHorizonGroup.visible = false;
      return;
    }
    if (this.photonPoints) this.photonPoints.visible = true;
    if (this.photonLines) this.photonLines.visible = true;

    // Critical 1/2 point collapse factor: d = 0.50 is the exact critical point
    const xi = Math.max(0.0, Math.min(1.0, 1.0 - (d - 0.50) / 1.5));
    const rHorizon = 0.75 * xi;
    const rPhotonSphere = 1.5 * rHorizon;
    const c = 16.0;

    // Update Event Horizon Group
    if (this.eventHorizonGroup) {
      const hScale = Math.max(0.001, xi * 1.6);
      this.eventHorizonGroup.scale.set(hScale, hScale, hScale);
      this.eventHorizonGroup.visible = (xi > 0.04);
      this.eventHorizonGroup.rotation.y = t * 1.5;
      if (this.horizonAccretionRing) {
        this.horizonAccretionRing.material.opacity = 0.5 + 0.4 * Math.sin(t * 4.0);
      }
    }

    // Effective gravitational lensing mass surges as d -> 0.50
    const M_eff = 2.0 + 88.0 * (xi * xi) * Math.pow(0.50 / Math.max(0.35, d), 2);

    const posAttr = this.photonPointsGeo.attributes.position;
    const colAttr = this.photonPointsGeo.attributes.color;
    const linePosAttr = this.photonLinesGeo.attributes.position;
    const lineColAttr = this.photonLinesGeo.attributes.color;
    let lineVertIdx = 0;

    const dt = Math.min(0.035, delta);

    for (let p = 0; p < this.maxPhotons; p++) {
      const ph = this.photons[p];
      ph.life += dt;

      if (ph.trapped) {
        // Redshift and spiral into singularity
        ph.pos.multiplyScalar(Math.max(0.0, 1.0 - dt * 6.0));
        ph.alpha -= dt * 3.5;
        if (ph.alpha <= 0) {
          this.respawnPhoton(ph);
        }
      } else {
        const r = ph.pos.length();

        // Check Event Horizon Crossing
        if (r <= rHorizon && xi > 0.12) {
          ph.trapped = true;
          this.photonsTrappedTotal++;
          ph.color.setRGB(0.98, 0.15, 0.05); // High-redshift dark crimson
        } else {
          // Geodesic metric acceleration towards center (0,0,0)
          const rCubed = Math.pow(r * r + 0.35, 1.5);
          const accMag = M_eff / rCubed;

          ph.vel.x -= ph.pos.x * accMag * dt;
          ph.vel.y -= ph.pos.y * accMag * dt;
          ph.vel.z -= ph.pos.z * accMag * dt;

          // Frame dragging from fluid circulation Q
          if (r < 7.0 && this.flowRate > 0.1) {
            const dragCoeff = (0.28 * this.flowRate) / (r * r + 0.5);
            ph.vel.z += ph.pos.x * dragCoeff * dt;
            ph.vel.x -= ph.pos.z * dragCoeff * dt;
          }

          // Maintain photon speed = c
          const curSpeed = ph.vel.length();
          if (curSpeed > 0.001) {
            ph.vel.multiplyScalar(c / curSpeed);
          }

          ph.pos.addScaledVector(ph.vel, dt);

          // Color transition based on gravitational field strength
          if (r < rPhotonSphere && xi > 0.18) {
            ph.color.setRGB(0.98, 0.65, 0.18); // Gold photon sphere lensing
          } else if (xi > 0.25 && r < 3.2) {
            ph.color.setRGB(0.35, 0.95, 0.75); // Lensing green-cyan
          } else {
            ph.color.setRGB(0.22, 0.74, 0.97); // Laser cyan
          }

          if (ph.pos.x > 26.0 || r > 35.0 || ph.life > 4.5) {
            this.respawnPhoton(ph);
          }
        }
      }

      ph.history.unshift(ph.pos.clone());
      if (ph.history.length > 7) ph.history.pop();

      posAttr.setXYZ(p, ph.pos.x, ph.pos.y, ph.pos.z);
      colAttr.setXYZ(p, ph.color.r * ph.alpha, ph.color.g * ph.alpha, ph.color.b * ph.alpha);

      for (let h = 0; h < ph.history.length - 1; h++) {
        if (lineVertIdx + 2 >= this.MAX_TRAIL_VERTS) break;
        const p1 = ph.history[h];
        const p2 = ph.history[h + 1];
        const segAlpha = (1.0 - h / ph.history.length) * ph.alpha * 0.75;

        linePosAttr.setXYZ(lineVertIdx, p1.x, p1.y, p1.z);
        lineColAttr.setXYZ(lineVertIdx, ph.color.r * segAlpha, ph.color.g * segAlpha, ph.color.b * segAlpha);
        lineVertIdx++;

        linePosAttr.setXYZ(lineVertIdx, p2.x, p2.y, p2.z);
        lineColAttr.setXYZ(lineVertIdx, ph.color.r * segAlpha, ph.color.g * segAlpha, ph.color.b * segAlpha);
        lineVertIdx++;
      }
    }

    // Zero out unused line vertices
    for (let i = lineVertIdx; i < this.MAX_TRAIL_VERTS; i++) {
      linePosAttr.setXYZ(i, 0, 0, 0);
      lineColAttr.setXYZ(i, 0, 0, 0);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
  }

  // --------------------------------------------------------------------------
  // 4. Mathematical Wave Transmission & Emergence State Solver
  // --------------------------------------------------------------------------
  computeWaveState(t) {
    // Fundamental Wave Quantities
    const f = Math.max(0.01, this.frequency);
    const v = Math.max(0.1, this.velocity);
    const d = Math.max(0.5, this.distance);
    const S = Math.max(0.0, this.entropy);
    const kappa = this.coupling;

    const omega = 2 * Math.PI * f;
    const lambda = v / f;
    const k = (2 * Math.PI) / lambda; // k = 2*pi*f / v
    const deltaPhi = k * d;            // Phase accumulation per layer distance d
    const totalHeight = (this.LAYERS - 1) * d;

    // Dissipation factor governed by entropy S and frequency f
    const dissipation = (0.075 * S * f) / (v + 0.2);

    const layerData = [];
    const layerCurves = [];

    // Decay mouse fluid impulse
    this.mouseImpulse *= 0.96;

    for (let i = 0; i < this.LAYERS; i++) {
      const isInv = (i % 2 !== 0);
      // Vertical coordinate along z / y-axis
      const z0 = (i - (this.LAYERS - 1) / 2) * d;

      // Forward traveling wave packet
      const phiFwd = omega * t - k * z0;
      // Reflected counter-propagating wave from boundary
      const phiBwd = omega * t + k * z0;

      // Attenuation envelope from entropy dissipation
      const attenFwd = Math.exp(-dissipation * Math.abs(z0));
      const attenBwd = Math.exp(-dissipation * (totalHeight - Math.abs(z0)));

      // Superposition: real standing wave emerges when k*d matches harmonics!
      const psiWave = Math.cos(phiFwd) * attenFwd + 0.85 * Math.cos(phiBwd) * attenBwd;

      // Local mouse perturbation
      const distToMouseLayer = Math.abs(i - this.mouseLayerTarget);
      const mouseDisplacement = Math.exp(-distToMouseLayer * 1.5) * this.mouseImpulse * 1.4;

      // Peristaltic vertical displacement
      const yWave = (psiWave * 0.42 * (v / 4.4) + Math.cos(omega * 0.5 * t + i) * 0.15) + mouseDisplacement;
      const y = z0 + yWave;

      // Constricted central throat nozzle profile (de Laval constriction at middle layers)
      // When structure collapses to the 1/2 point (d -> 0.50), throat contracts towards event horizon!
      const xi = Math.max(0.0, Math.min(1.0, 1.0 - (d - 0.50) / 1.5));
      const throatFactor = (1.0 - 0.32 * Math.exp(- (z0 * z0) / (1.8 * d * d + 0.1)))
        * (1.0 - 0.58 * xi * Math.exp(- (z0 * z0) / (0.35 * d * d + 0.05)));

      // Radial wave undulation + breathing
      const radialWave = 1.0 + psiWave * 0.22 * (1.0 / Math.max(0.18, throatFactor));
      const r = this.R_BASE * throatFactor * radialWave;

      // Torsional Chiral Vortex Shear (coupled across layers via kappa)
      const chiralSign = isInv ? -1 : 1;
      const chiralShear = chiralSign * kappa * Math.sin(omega * t - k * z0) * 0.45;
      const baseAngles = isInv ? [-Math.PI / 2, Math.PI / 6, 5 * Math.PI / 6] : [Math.PI / 2, 7 * Math.PI / 6, 11 * Math.PI / 6];

      // Multi-scale Entropy Phase Jitter (Kolmogorov turbulence when S is high)
      const entropyJitterTheta = Math.sqrt(S) * (
        0.35 * Math.sin(2.3 * t + i * 1.4) +
        0.18 * Math.cos(4.7 * t - i * 2.1) +
        0.09 * Math.sin(8.1 * t + 3 * i)
      );

      const entropyJitterR = Math.sqrt(S) * (
        0.28 * Math.sin(3.1 * t + i * 2.2) +
        0.12 * Math.cos(6.2 * t - i)
      );

      const verts = [];
      for (let j = 0; j < 3; j++) {
        const theta = baseAngles[j] + chiralShear + entropyJitterTheta;
        const totalR = Math.max(0.5, r + entropyJitterR);
        verts.push(new THREE.Vector3(
          Math.cos(theta) * totalR,
          y + Math.cos(3 * theta + omega * t) * 0.22 * Math.min(1.5, S + 0.2),
          Math.sin(theta) * totalR
        ));
      }

      // Exact L/2 dynamic midpoints
      const mids = [
        new THREE.Vector3().addVectors(verts[1], verts[2]).multiplyScalar(0.5),
        new THREE.Vector3().addVectors(verts[2], verts[0]).multiplyScalar(0.5),
        new THREE.Vector3().addVectors(verts[0], verts[1]).multiplyScalar(0.5)
      ];

      // Surface tension meniscus fluid puff
      for (let m = 0; m < 3; m++) {
        const norm = new THREE.Vector3(mids[m].x, 0, mids[m].z).normalize();
        mids[m].addScaledVector(norm, Math.sin(omega * t * 1.5 + i + m) * 0.24 * (1.0 + 0.3 * S));
      }

      layerData.push({ verts, mids, y, z0, psiWave, r, throatFactor });

      // Closed loop curve around the 6 nodes of the layer
      const loopPts = [
        verts[0], mids[2],
        verts[1], mids[0],
        verts[2], mids[1]
      ];
      layerCurves.push(new THREE.CatmullRomCurve3(loopPts, true, 'centripetal', 0.5));

      // Update Node 3D positions & dynamic scale matching wave antinodes
      const nodeScale = 1.0 + psiWave * 0.38;
      for (let j = 0; j < 3; j++) {
        this.vertMeshes[i][j].position.copy(verts[j]);
        this.vertMeshes[i][j].scale.setScalar(Math.max(0.4, nodeScale));

        this.midMeshes[i][j].position.copy(mids[j]);
        this.midMeshes[i][j].scale.setScalar(Math.max(0.4, 1.0 + psiWave * 0.28));
      }
    }

    // Update Halos & Orbital Rings
    for (let h = 0; h < this.haloMeshes.length; h++) {
      const item = this.haloMeshes[h];
      item.halo.position.copy(item.target.position);
      // Halo pulses with constructive wave antinodes
      const haloPulse = item.baseScale * Math.max(0.5, item.target.scale.x);
      item.halo.scale.set(haloPulse, haloPulse, 1);
    }

    // Rotate orbital quantum rings at angular frequency omega
    for (let o = 0; o < this.orbitalRings.length; o++) {
      const item = this.orbitalRings[o];
      item.ring.position.copy(item.target.position);
      item.ring.rotation.z = t * omega + item.layer * 0.5;
    }

    return { layerData, layerCurves, deltaPhi, lambda, k, omega, S };
  }

  // --------------------------------------------------------------------------
  // 5. Main Render Loop & Multi-Scale Visual Synthesis
  // --------------------------------------------------------------------------
  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    this.controls.update();

    const delta = this.clock.getDelta();
    if (this.isPlaying) {
      // Flow rate modulates time progression
      this.elapsed += delta * this.flowRate;
    }

    const t = this.elapsed;
    const { layerData, layerCurves, deltaPhi, lambda, k, omega, S } = this.computeWaveState(t);

    // Update Spacetime Photon Beam & Event Horizon Light Pulling
    this.updatePhotons(delta, t, this.distance);

    // 1. Update 90 Streamlines with Traveling Wave Packet Illumination
    this.splines = [];
    const vTransmission = this.velocity;
    const dSeparation = this.distance;

    for (let s = 0; s < this.streamLines.length; s++) {
      const item = this.streamLines[s];
      const pFrom = item.from.type === 'v'
        ? layerData[item.from.l].verts[item.from.idx]
        : layerData[item.from.l].mids[item.from.idx];
      const pTo = item.to.type === 'v'
        ? layerData[item.to.l].verts[item.to.idx]
        : layerData[item.to.l].mids[item.to.idx];

      const midP = new THREE.Vector3().addVectors(pFrom, pTo).multiplyScalar(0.5);
      const tan = new THREE.Vector3().subVectors(pTo, pFrom);
      const norm = new THREE.Vector3(-tan.z, 0, tan.x).normalize();

      // Fluid bow & vortex shedding
      const bowMagnitude = (Math.sin(omega * t * 1.2 + s * 0.1) * 0.45 + 0.65) * (1.0 + 0.25 * S);
      midP.addScaledVector(norm, bowMagnitude);

      // Transverse turbulence jitter
      if (S > 0.05) {
        midP.x += Math.sin(t * 3.5 + s) * 0.15 * Math.sqrt(S);
        midP.z += Math.cos(t * 3.2 + s * 1.5) * 0.15 * Math.sqrt(S);
      }

      const curve = new THREE.CatmullRomCurve3([pFrom, midP, pTo]);
      this.splines.push(curve);

      // Update positions along spline
      const pts = curve.getPoints(this.SPLINE_SAMPLES - 1);
      const posAttr = item.line.geometry.attributes.position;
      const colAttr = item.line.geometry.attributes.color;

      // Wave packet position traveling at velocity v
      const packetPhase = ((t * vTransmission / dSeparation) % 1.0 + 1.0) % 1.0;

      for (let p = 0; p < pts.length; p++) {
        posAttr.setXYZ(p, pts[p].x, pts[p].y, pts[p].z);

        // Traveling illumination pulse along the streamline
        const u = p / (this.SPLINE_SAMPLES - 1);
        let dist = Math.abs(u - packetPhase);
        if (dist > 0.5) dist = 1.0 - dist;

        const pulse = Math.exp(- (dist * dist) / 0.035);
        // Base color: electric sapphire / indigo, packet crest: brilliant cyan / white
        const rVal = 0.15 + pulse * 0.85;
        const gVal = 0.45 + pulse * 0.55;
        const bVal = 0.95 + pulse * 0.05;

        colAttr.setXYZ(p, rVal, gVal, bVal);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    // 2. Update 6 Horizontal Perimeter Fluid Rings
    for (let r = 0; r < this.ringLines.length; r++) {
      const rl = this.ringLines[r];
      const curve = layerCurves[rl.layer];
      const pts = curve.getPoints(rl.samples - 1);
      const posAttr = rl.line.geometry.attributes.position;
      const colAttr = rl.line.geometry.attributes.color;

      const layerPsi = layerData[rl.layer].psiWave;

      for (let p = 0; p < pts.length; p++) {
        posAttr.setXYZ(p, pts[p].x, pts[p].y, pts[p].z);

        // Wave crest illumination on closed rings
        const thetaP = (p / rl.samples) * Math.PI * 2;
        const waveP = Math.sin(3 * thetaP - omega * t);
        const intense = 0.5 + 0.5 * waveP * (0.6 + 0.4 * layerPsi);

        colAttr.setXYZ(p, 0.22 * intense, 0.85 * intense, 0.98 * intense);
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    // 3. Update Luminous Volumetric Fluid Ribbons (Ruled Surfaces with Dynamic Interference)
    for (let rb = 0; rb < this.ribbonMeshes.length; rb++) {
      const rItem = this.ribbonMeshes[rb];
      const c1 = layerCurves[rItem.l1];
      const c2 = layerCurves[rItem.l2];
      const uSegs = rItem.uSegs;
      const vSegs = rItem.vSegs;
      const posAttr = rItem.mesh.geometry.attributes.position;
      const colAttr = rItem.mesh.geometry.attributes.color;

      const z1 = layerData[rItem.l1].z0;
      const z2 = layerData[rItem.l2].z0;

      for (let v = 0; v <= vSegs; v++) {
        const wv = v / vSegs;
        const zInterp = z1 * (1 - wv) + z2 * wv;

        // Wave state at intermediate height
        const phi = omega * t - k * zInterp;
        const localPsi = Math.cos(phi) + 0.85 * Math.cos(omega * t + k * zInterp);

        for (let u = 0; u <= uSegs; u++) {
          const wu = u / uSegs;
          const p1 = c1.getPoint(wu);
          const p2 = c2.getPoint(wu);

          // Interpolated point on ruled surface
          const xBase = p1.x * (1 - wv) + p2.x * wv;
          const yBase = p1.y * (1 - wv) + p2.y * wv;
          const zBase = p1.z * (1 - wv) + p2.z * wv;

          // Outward radial normal vector
          const rLen = Math.sqrt(xBase * xBase + zBase * zBase) || 1.0;
          const nx = xBase / rLen;
          const nz = zBase / rLen;

          // Peristaltic wave ripple on surface
          const waveRipple = localPsi * 0.35 * Math.sin(Math.PI * wv);
          // Entropy turbulence ripple
          const entropyRipple = Math.sqrt(S) * 0.22 * Math.sin(6 * Math.PI * wu + 3.2 * t + wv * 4);

          const totalDisplacement = waveRipple + entropyRipple;
          const idx = v * (uSegs + 1) + u;

          posAttr.setXYZ(idx, xBase + nx * totalDisplacement, yBase, zBase + nz * totalDisplacement);

          // Dynamic Vertex Color Gradient:
          // Antinode crests: incandescent cyan / white
          // Nodes / troughs: deep midnight sapphire
          // Vorticity shear: warm amber highlights
          const crestAmp = (localPsi + 1.85) / 3.7; // mapped to [0, 1]
          const isAmberShear = Math.sin(3 * Math.PI * 2 * wu + t * 2) > 0.7;

          let cr, cg, cb;
          if (isAmberShear && S > 0.4) {
            cr = 0.95 * crestAmp;
            cg = 0.65 * crestAmp;
            cb = 0.15;
          } else {
            cr = 0.10 + 0.85 * crestAmp;
            cg = 0.35 + 0.65 * crestAmp;
            cb = 0.95;
          }

          colAttr.setXYZ(idx, cr, cg, cb);
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      rItem.mesh.geometry.computeVertexNormals();
    }

    // 4. Update Advection Fluid Quanta (Flux Continuity & Throat Acceleration)
    const pPosAttr = this.particleSys.geometry.attributes.position;
    const pColAttr = this.particleSys.geometry.attributes.color;

    for (let p = 0; p < this.PARTICLE_COUNT; p++) {
      const pd = this.pData[p];
      const sp = this.splines[pd.sIdx];

      if (sp) {
        // Evaluate particle height along spline to apply Bernoulli throat acceleration
        const testPt = sp.getPoint(pd.u);
        const zPt = testPt.y;
        // Incompressible continuity: particles accelerate in the constricted middle throat!
        const throatAreaRatio = Math.max(0.45, 1.0 - 0.32 * Math.exp(-(zPt * zPt) / (1.8 * dSeparation * dSeparation + 0.1)));
        const continuitySpeed = (1.0 / (throatAreaRatio * throatAreaRatio)) * (vTransmission / 4.4);

        // Advance particle along streamline
        pd.u = (pd.u + pd.spd * 0.008 * this.flowRate * continuitySpeed) % 1.0;

        // Brownian transverse diffusion scaled by entropy S
        if (S > 0.01) {
          pd.brownianX += (Math.random() - 0.5) * 0.08 * Math.sqrt(S);
          pd.brownianZ += (Math.random() - 0.5) * 0.08 * Math.sqrt(S);
          // Damping toward streamline center
          pd.brownianX *= 0.92;
          pd.brownianZ *= 0.92;
        } else {
          pd.brownianX = 0;
          pd.brownianZ = 0;
        }

        const pt = sp.getPoint(pd.u);
        pPosAttr.setXYZ(p, pt.x + pd.brownianX, pt.y, pt.z + pd.brownianZ);

        // Particle Color based on local velocity and entropy
        if (throatAreaRatio < 0.75) {
          // Hot white-cyan in the fast neck/throat
          pColAttr.setXYZ(p, 0.95, 0.98, 1.0);
        } else if (p % 4 === 0) {
          // L/2 amber quanta
          pColAttr.setXYZ(p, 0.98, 0.72, 0.18);
        } else {
          // Sapphire quanta
          pColAttr.setXYZ(p, 0.35, 0.85, 0.98);
        }
      }
    }

    pPosAttr.needsUpdate = true;
    pColAttr.needsUpdate = true;

    // Gentle global float
    this.mainGroup.position.y = Math.sin(t * 0.35) * 0.45;
    this.mainGroup.rotation.y = t * 0.035;

    this.renderer.render(this.scene, this.camera);
  }

  // --------------------------------------------------------------------------
  // 6. Real-time Telemetry & Shannon Entropy Calculator
  // --------------------------------------------------------------------------
  updateTelemetry() {
    const f = this.frequency;
    const v = this.velocity;
    const d = this.distance;
    const S = this.entropy;
    const kappa = this.coupling;

    const lambda = v / f;
    const k = (2 * Math.PI) / lambda;
    const deltaPhi = k * d;
    const ratio = (f * d) / v; // ratio = deltaPhi / (2*pi)

    // DOM Elements
    const elWavelength = document.getElementById('telemetry-wavelength');
    const elWavenumber = document.getElementById('telemetry-wavenumber');
    const elPhaseShift = document.getElementById('telemetry-phaseshift');
    const elBadge = document.getElementById('telemetry-state-badge');
    const elEntropy = document.getElementById('telemetry-entropy');

    if (elWavelength) elWavelength.innerText = `${lambda.toFixed(2)} u`;
    if (elWavenumber) elWavenumber.innerText = `${k.toFixed(2)} rad/u`;
    if (elPhaseShift) elPhaseShift.innerHTML = `${(deltaPhi / Math.PI).toFixed(2)} &pi; (${ratio.toFixed(2)} &lambda;)`;

    // Calculate simulated Shannon Entropy S_live across 6 layers
    let sLive = 0;
    const layerProbs = [];
    let probSum = 0;
    for (let l = 0; l < this.LAYERS; l++) {
      const z = (l - 2.5) * d;
      const energy = 1.0 + Math.pow(Math.cos(2 * Math.PI * f - k * z), 2) + 0.2 * S;
      layerProbs.push(energy);
      probSum += energy;
    }
    for (let l = 0; l < this.LAYERS; l++) {
      const p = layerProbs[l] / probSum;
      sLive -= p * Math.log(p);
    }
    sLive = sLive * (1.0 + 0.2 * S);
    if (elEntropy) elEntropy.innerText = `${sLive.toFixed(3)} nats`;

    // Determine Emergent Physics State
    if (elBadge) {
      elBadge.className = 'telemetry-badge';
      const roundInt = Math.round(ratio);
      const isHarmonic = Math.abs(ratio - roundInt) < 0.05;

      const roundThird = Math.round(ratio * 3);
      const isTriad = !isHarmonic && Math.abs(ratio * 3 - roundThird) < 0.08;

      if (d <= 0.55) {
        elBadge.className = 'telemetry-badge badge-horizon';
        elBadge.innerText = '🕳️ 1/2 EVENT HORIZON (PULLING LIGHT)';
      } else if (isHarmonic && S < 1.0) {
        elBadge.classList.add('badge-resonance');
        elBadge.innerText = `STANDING WAVE SOLITON (${roundInt}.00 λ)`;
      } else if (isTriad && S < 1.5) {
        elBadge.classList.add('badge-triad');
        elBadge.innerText = `TRIAD CHIRAL LOCK (${(roundThird / 3).toFixed(2)} λ)`;
      } else if (S >= 1.8) {
        elBadge.classList.add('badge-turbulent');
        elBadge.innerText = `TURBULENT CASCADE`;
      } else if (S < 0.05) {
        elBadge.classList.add('badge-resonance');
        elBadge.innerText = `CRYSTALLINE SUPERFLUID`;
      } else {
        elBadge.classList.add('badge-wave');
        elBadge.innerText = `PROPAGATING WAVE (${ratio.toFixed(2)} λ)`;
      }
    }

    // Horizon & Light Deflection Telemetry
    const elHorizon = document.getElementById('telemetry-horizon-state');
    const elLightPull = document.getElementById('telemetry-light-pull');

    const xi = Math.max(0.0, Math.min(1.0, 1.0 - (d - 0.50) / 1.5));
    if (elHorizon) {
      if (d <= 0.55) {
        elHorizon.innerText = '🕳️ 1/2 EVENT HORIZON FORMED';
        elHorizon.style.color = '#ef4444';
      } else if (d <= 1.20) {
        elHorizon.innerText = 'GRAVITATIONAL LENSING';
        elHorizon.style.color = '#f59e0b';
      } else {
        elHorizon.innerText = 'LAMINAR SUB-HORIZON';
        elHorizon.style.color = '#38bdf8';
      }
    }
    if (elLightPull) {
      if (d <= 0.55) {
        elLightPull.innerText = `PULLING LIGHT (${this.photonsTrappedTotal} SWALLOWED)`;
        elLightPull.style.color = '#ef4444';
      } else {
        const defAngle = (38.0 * xi).toFixed(1);
        elLightPull.innerText = `${defAngle}° DEFLECTION`;
        elLightPull.style.color = xi > 0.1 ? '#f59e0b' : '#94a3b8';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 7. Emergence Presets Handler
  // --------------------------------------------------------------------------
  applyPreset(presetKey) {
    if (presetKey === 'event_horizon') {
      // 1/2 Point Critical Collapse: forms event horizon and pulls passing light
      this.entropy = 0.45;
      this.frequency = 1.00;
      this.velocity = 4.40;
      this.distance = 0.50; // The 1/2 critical point!
      this.coupling = 1.20;
      this.flowRate = 2.00;
      this.showPhotons = true;
      this.setCameraPreset('side');
    } else if (presetKey === 'soliton') {
      // Harmonic resonance: lambda = d, pure standing wave soliton
      this.entropy = 0.00;
      this.frequency = 1.00;
      this.velocity = 4.40;
      this.distance = 4.40;
      this.coupling = 0.35;
      this.flowRate = 1.00;
    } else if (presetKey === 'triad') {
      // Triad resonance: fd/v = 1/3, unbroken C3 chiral vortex conduit
      this.entropy = 0.15;
      this.frequency = 1.00;
      this.velocity = 13.20;
      this.distance = 4.40;
      this.coupling = 0.35;
      this.flowRate = 1.20;
    } else if (presetKey === 'turbulent') {
      // High entropy dissipation, Kolmogorov cascade, ribbon flutter
      this.entropy = 3.50;
      this.frequency = 2.40;
      this.velocity = 6.00;
      this.distance = 4.40;
      this.coupling = 0.80;
      this.flowRate = 1.50;
    } else if (presetKey === 'throat') {
      // High velocity transmission jet compressed through narrow neck
      this.entropy = 0.05;
      this.frequency = 1.50;
      this.velocity = 16.00;
      this.distance = 2.60;
      this.coupling = 0.20;
      this.flowRate = 2.20;
    } else if (presetKey === 'superfluid') {
      // Crystalline frictionless superfluid, zero entropy
      this.entropy = 0.00;
      this.frequency = 0.60;
      this.velocity = 2.64;
      this.distance = 4.40;
      this.coupling = 0.50;
      this.flowRate = 0.80;
    }

    // Sync all numerical inputs & sliders
    this.syncControls();
    this.updateTelemetry();
  }

  // Synchronize both input types (number & slider) with internal state
  syncControls() {
    const pairs = [
      { idNum: 'manifold-entropy-input', idRange: 'manifold-entropy-slider', val: this.entropy, dec: 2 },
      { idNum: 'manifold-freq-input', idRange: 'manifold-freq-slider', val: this.frequency, dec: 2 },
      { idNum: 'manifold-vel-input', idRange: 'manifold-vel-slider', val: this.velocity, dec: 2 },
      { idNum: 'manifold-dist-input', idRange: 'manifold-dist-slider', val: this.distance, dec: 2 },
      { idNum: 'manifold-coupling-input', idRange: 'manifold-coupling-slider', val: this.coupling, dec: 2 },
      { idNum: 'manifold-flow-input', idRange: 'manifold-flow-slider', val: this.flowRate, dec: 2 }
    ];

    pairs.forEach(p => {
      const elNum = document.getElementById(p.idNum);
      const elRange = document.getElementById(p.idRange);
      if (elNum) elNum.value = p.val.toFixed(p.dec);
      if (elRange) elRange.value = p.val;
    });

    const photonBtn = document.getElementById('manifold-photons-btn');
    if (photonBtn) {
      photonBtn.classList.toggle('active', this.showPhotons);
      const span = photonBtn.querySelector('span');
      if (span) span.innerText = this.showPhotons ? 'Photons: ON' : 'Photons: OFF';
    }
  }

  // --------------------------------------------------------------------------
  // 8. View Presets & Display Modes
  // --------------------------------------------------------------------------
  setMode(mode) {
    this.currentMode = mode;
    if (mode === 'fluid') {
      this.ribbonMeshes.forEach(r => { r.mesh.visible = true; r.mat.opacity = 0.38; });
      this.streamLines.forEach(s => { s.line.visible = true; s.mat.opacity = 0.75; });
      this.particleSys.visible = true;
      this.controls.autoRotateSpeed = 0.75;
    } else if (mode === 'geodesic') {
      this.ribbonMeshes.forEach(r => { r.mesh.visible = false; });
      this.streamLines.forEach(s => { s.line.visible = true; s.mat.opacity = 0.95; });
      this.particleSys.visible = false;
      this.controls.autoRotateSpeed = 0.35;
    } else if (mode === 'vortex') {
      this.ribbonMeshes.forEach(r => { r.mesh.visible = true; r.mat.opacity = 0.55; });
      this.streamLines.forEach(s => { s.line.visible = true; s.mat.opacity = 0.85; });
      this.particleSys.visible = true;
      this.controls.autoRotateSpeed = 1.35;
    }
  }

  setCameraPreset(preset) {
    if (preset === 'perspective') {
      this.camera.position.set(22, 18, 36);
      this.controls.target.set(0, 0, 0);
    } else if (preset === 'top') {
      this.camera.position.set(0, 52, 0.1);
      this.controls.target.set(0, 0, 0);
    } else if (preset === 'side') {
      this.camera.position.set(48, 0, 0);
      this.controls.target.set(0, 0, 0);
    }
    this.controls.update();
  }

  // --------------------------------------------------------------------------
  // 9. Controls, UI Binding & Ergonomics
  // --------------------------------------------------------------------------
  initControls() {
    this.canvasEl.addEventListener('pointermove', (e) => {
      const rect = this.canvasEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.mouse.set(x, y);

      this.mouseLayerTarget = (y * 0.5 + 0.5) * (this.LAYERS - 1);
      this.mouseImpulse = Math.min(this.mouseImpulse + 0.35, 1.8);
    });

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
    // 1. Two-way binding for numerical inputs & range sliders (Fluid typing & wide physical bounds)
    const bindControl = (idNum, idRange, propName, minVal, maxVal, dec) => {
      const elNum = document.getElementById(idNum);
      const elRange = document.getElementById(idRange);

      if (elNum) {
        elNum.addEventListener('input', (e) => {
          const raw = e.target.value.trim();
          if (raw === '' || raw === '.' || raw === '-') return;
          let val = parseFloat(raw);
          if (isNaN(val)) return;
          this[propName] = val;
          if (elRange) elRange.value = Math.max(minVal, Math.min(maxVal, val));
          this.updateTelemetry();
        });
        elNum.addEventListener('change', (e) => {
          let val = parseFloat(e.target.value);
          if (isNaN(val)) val = minVal;
          val = Math.max(minVal, Math.min(maxVal, val));
          this[propName] = val;
          elNum.value = val.toFixed(dec);
          if (elRange) elRange.value = val;
          this.updateTelemetry();
        });
      }

      if (elRange) {
        elRange.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          this[propName] = val;
          if (elNum) elNum.value = val.toFixed(dec);
          this.updateTelemetry();
        });
      }
    };

    bindControl('manifold-entropy-input', 'manifold-entropy-slider', 'entropy', 0.00, 10.00, 2);
    bindControl('manifold-freq-input', 'manifold-freq-slider', 'frequency', 0.00, 50.00, 2);
    bindControl('manifold-vel-input', 'manifold-vel-slider', 'velocity', 0.10, 100.00, 2);
    bindControl('manifold-dist-input', 'manifold-dist-slider', 'distance', 0.50, 12.00, 2);
    bindControl('manifold-coupling-input', 'manifold-coupling-slider', 'coupling', 0.00, 5.00, 2);
    bindControl('manifold-flow-input', 'manifold-flow-slider', 'flowRate', 0.00, 10.00, 2);

    // 2. Emergence Presets Buttons
    const presetChips = document.querySelectorAll('.manifold-preset-chip');
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const pKey = chip.getAttribute('data-preset');
        this.applyPreset(pKey);
      });
    });

    // 3. Display Mode Pills
    const modeBtns = document.querySelectorAll('[data-manifold-mode]');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setMode(btn.getAttribute('data-manifold-mode'));
      });
    });

    // 4. View Angle Presets
    const viewBtns = document.querySelectorAll('[data-manifold-view]');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setCameraPreset(btn.getAttribute('data-manifold-view'));
      });
    });

    // 5. Play / Pause
    const playPauseBtn = document.getElementById('manifold-play-btn');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playPauseBtn.innerHTML = this.isPlaying
          ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> <span>Pause</span>'
          : '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> <span>Resume</span>';
      });
    }

    // 6. Reset Camera
    const resetBtn = document.getElementById('manifold-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.setCameraPreset('perspective');
        viewBtns.forEach(b => b.classList.remove('active'));
        const pBtn = document.querySelector('[data-manifold-view="perspective"]');
        if (pBtn) pBtn.classList.add('active');
      });
    }

    // 7. Fullscreen Toggle
    const fsBtn = document.getElementById('manifold-fullscreen-btn');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        const stage = document.getElementById('manifold-viewport-stage');
        if (!document.fullscreenElement) {
          if (stage.requestFullscreen) stage.requestFullscreen();
          else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }

    // 8. Photon Beam Toggle
    const photonBtn = document.getElementById('manifold-photons-btn');
    if (photonBtn) {
      photonBtn.addEventListener('click', () => {
        this.showPhotons = !this.showPhotons;
        photonBtn.classList.toggle('active', this.showPhotons);
        const span = photonBtn.querySelector('span');
        if (span) span.innerText = this.showPhotons ? 'Photons: ON' : 'Photons: OFF';
      });
    }
  }
}

// Auto-initialize when DOM is ready
function initManifoldSimulation() {
  if (document.getElementById('manifold-canvas-container') && !window.fluidManifoldInstance) {
    window.fluidManifoldInstance = new FluidManifoldSimulation('manifold-canvas-container');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initManifoldSimulation);
} else {
  initManifoldSimulation();
}
