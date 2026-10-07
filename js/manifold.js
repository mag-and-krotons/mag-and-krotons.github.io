import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================================
// 36-NODE SIMPLICIAL COMPLEX: 6D FLUID MANIFOLD SIMULATION
// ============================================================================

class FluidManifoldSimulation {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.isPlaying = true;
    this.currentMode = 'fluid'; // 'fluid' | 'geodesic' | 'vortex'
    this.speedMultiplier = 1.0;
    this.waveAmplitude = 1.0;
    this.twistMultiplier = 1.0;
    this.particlesVisible = true;
    this.ribbonsVisible = true;

    // Topology Parameters
    this.R_BASE = 6.4;
    this.Y_SEP = 4.4;
    this.LAYERS = 6;
    this.SPLINE_SAMPLES = 30;
    this.PARTICLE_COUNT = 240;

    // Mouse fluid wake
    this.mouse = new THREE.Vector2(-999, -999);
    this.mouseImpulse = 0;
    this.mouseLayerTarget = 2.5;

    this.initScene();
    this.initTopology();
    this.initControls();
    this.initUI();
    this.initObserver();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070B14, 0.012);

    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || 650;

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.defaultCamPos = new THREE.Vector3(22, 18, 36);
    this.camera.position.copy(this.defaultCamPos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    this.canvasEl = this.renderer.domElement;
    this.canvasEl.id = 'manifold-three-canvas';
    this.container.appendChild(this.canvasEl);

    this.controls = new OrbitControls(this.camera, this.canvasEl);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.8;
    this.controls.maxDistance = 120;
    this.controls.minDistance = 8;

    // Lights
    this.scene.add(new THREE.AmbientLight(0x0f172a, 2.2));
    const pl1 = new THREE.PointLight(0x60a5fa, 4, 120);
    pl1.position.set(25, 35, 25);
    this.scene.add(pl1);

    const pl2 = new THREE.PointLight(0xf59e0b, 3.5, 120);
    pl2.position.set(-25, -30, -25);
    this.scene.add(pl2);

    const dl = new THREE.DirectionalLight(0xffffff, 1.2);
    dl.position.set(0, 40, 20);
    this.scene.add(dl);

    // Stars / Ambient quantum dust
    const sGeo = new THREE.BufferGeometry();
    const sCount = 1400;
    const sPos = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount * 3; i++) sPos[i] = (Math.random() - 0.5) * 160;
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    const sMat = new THREE.PointsMaterial({ size: 0.18, color: 0x475569, transparent: true, opacity: 0.65 });
    this.scene.add(new THREE.Points(sGeo, sMat));

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    this.clock = new THREE.Clock();
  }

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

  initTopology() {
    const texSapphire = this.createGlowTexture('rgba(59, 130, 246, 0.95)');
    const texAmber = this.createGlowTexture('rgba(245, 158, 11, 0.9)');

    // 1. Node Meshes & Halos
    const vertGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const midGeo = new THREE.SphereGeometry(0.32, 28, 28);

    this.matVert = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.75,
      roughness: 0.08,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08
    });

    this.matMid = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1
    });

    this.vertMeshes = [];
    this.midMeshes = [];
    this.haloMeshes = [];

    for (let l = 0; l < this.LAYERS; l++) {
      const vRow = [];
      const mRow = [];
      for (let j = 0; j < 3; j++) {
        const vm = new THREE.Mesh(vertGeo, this.matVert);
        this.mainGroup.add(vm);
        vRow.push(vm);

        const vHalo = new THREE.Sprite(new THREE.SpriteMaterial({
          map: texSapphire, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending
        }));
        vHalo.scale.set(1.9, 1.9, 1);
        this.mainGroup.add(vHalo);
        this.haloMeshes.push({ halo: vHalo, target: vm });

        const mm = new THREE.Mesh(midGeo, this.matMid);
        this.mainGroup.add(mm);
        mRow.push(mm);

        const mHalo = new THREE.Sprite(new THREE.SpriteMaterial({
          map: texAmber, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending
        }));
        mHalo.scale.set(1.45, 1.45, 1);
        this.mainGroup.add(mHalo);
        this.haloMeshes.push({ halo: mHalo, target: mm });
      }
      this.vertMeshes.push(vRow);
      this.midMeshes.push(mRow);
    }

    // 2. Dynamic Streamlines (90 cross connections)
    this.streamLines = [];
    this.streamMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });

    for (let l = 0; l < this.LAYERS - 1; l++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          const g1 = new THREE.BufferGeometry();
          g1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.SPLINE_SAMPLES * 3), 3));
          const l1 = new THREE.Line(g1, this.streamMat);
          this.mainGroup.add(l1);
          this.streamLines.push({ line: l1, from: { l, type: 'v', idx: j }, to: { l: l+1, type: 'm', idx: k } });

          const g2 = new THREE.BufferGeometry();
          g2.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.SPLINE_SAMPLES * 3), 3));
          const l2 = new THREE.Line(g2, this.streamMat);
          this.mainGroup.add(l2);
          this.streamLines.push({ line: l2, from: { l: l+1, type: 'v', idx: j }, to: { l, type: 'm', idx: k } });
        }
      }
    }

    // 3. 6 Fluid Closed Rings
    this.ringLines = [];
    this.ringMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    for (let l = 0; l < this.LAYERS; l++) {
      const rGeo = new THREE.BufferGeometry();
      const R_SAMPLES = 60;
      rGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(R_SAMPLES * 3), 3));
      const rl = new THREE.Line(rGeo, this.ringMat);
      this.mainGroup.add(rl);
      this.ringLines.push({ line: rl, layer: l, samples: R_SAMPLES });
    }

    // 4. Organic Fluid Ribbons (Ruled Surfaces between adjacent layer loops)
    this.RIBBON_SEGS = 36;
    this.ribbonMeshes = [];
    this.ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1e1b4b,
      roughness: 0.12,
      metalness: 0.15,
      transmission: 0.8,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    for (let l = 0; l < this.LAYERS - 1; l++) {
      const geo = new THREE.BufferGeometry();
      const vertexCount = (this.RIBBON_SEGS + 1) * 2;
      const positions = new Float32Array(vertexCount * 3);
      const indices = [];

      for (let s = 0; s < this.RIBBON_SEGS; s++) {
        const top1 = s * 2;
        const bot1 = s * 2 + 1;
        const top2 = (s + 1) * 2;
        const bot2 = (s + 1) * 2 + 1;
        indices.push(top1, bot1, top2);
        indices.push(top2, bot1, bot2);
      }

      geo.setIndex(indices);
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const rMesh = new THREE.Mesh(geo, this.ribbonMat);
      this.mainGroup.add(rMesh);
      this.ribbonMeshes.push({ mesh: rMesh, l1: l, l2: l + 1, segs: this.RIBBON_SEGS });
    }

    // 5. Fluid Advection Particles
    const pPos = new Float32Array(this.PARTICLE_COUNT * 3);
    this.pData = [];
    for (let p = 0; p < this.PARTICLE_COUNT; p++) {
      const sIdx = Math.floor(Math.random() * this.streamLines.length);
      const u = Math.random();
      const spd = 0.2 + Math.random() * 0.35;
      this.pData.push({ sIdx, u, spd });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    this.pMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    this.particleSys = new THREE.Points(pGeo, this.pMat);
    this.mainGroup.add(this.particleSys);
  }

  computeFluidState(t) {
    const layerData = [];
    const layerCurves = [];

    // Decay mouse fluid impulse
    this.mouseImpulse *= 0.96;

    for (let i = 0; i < this.LAYERS; i++) {
      const isInv = (i % 2 !== 0);
      const y0 = (i - (this.LAYERS - 1) / 2) * this.Y_SEP;

      // Longitudinal peristaltic fluid surge
      const yWave = (Math.sin(t * 1.1 - i * 0.65) * 0.65 + Math.cos(t * 0.5 + i) * 0.2) * this.waveAmplitude;

      // Local mouse perturbation
      const distToMouseLayer = Math.abs(i - this.mouseLayerTarget);
      const mouseDisplacement = Math.exp(-distToMouseLayer * 1.5) * this.mouseImpulse * 1.2;

      const y = y0 + yWave + mouseDisplacement;

      // Radial fluid bulge / breathing
      const rFactor = 1.0 + Math.sin(t * 1.3 + i * 0.85) * 0.16 * this.waveAmplitude;
      const r = this.R_BASE * rFactor;

      // Torsional swirl (differential vortex shear)
      const shear = (Math.sin(t * 0.7 + i * 0.95) * 0.32 + (i * 0.04)) * this.twistMultiplier;
      const baseAngles = isInv ? [-Math.PI/2, Math.PI/6, 5*Math.PI/6] : [Math.PI/2, 7*Math.PI/6, 11*Math.PI/6];

      const verts = [];
      for (let j = 0; j < 3; j++) {
        const theta = baseAngles[j] + shear;
        const rip = Math.sin(3 * theta + t * 2.2) * 0.18 * this.waveAmplitude;
        verts.push(new THREE.Vector3(
          Math.cos(theta) * (r + rip),
          y + Math.cos(2 * theta + t * 1.6) * 0.25 * this.waveAmplitude,
          Math.sin(theta) * (r + rip)
        ));
      }

      // Exact L/2 dynamic midpoints
      const mids = [
        new THREE.Vector3().addVectors(verts[1], verts[2]).multiplyScalar(0.5),
        new THREE.Vector3().addVectors(verts[2], verts[0]).multiplyScalar(0.5),
        new THREE.Vector3().addVectors(verts[0], verts[1]).multiplyScalar(0.5)
      ];

      // Subtle meniscus fluid puff
      for (let m = 0; m < 3; m++) {
        const norm = new THREE.Vector3(mids[m].x, 0, mids[m].z).normalize();
        mids[m].addScaledVector(norm, Math.sin(t * 1.8 + i + m) * 0.22 * this.waveAmplitude);
      }

      layerData.push({ verts, mids, y });

      const loopPts = [
        verts[0], mids[2],
        verts[1], mids[0],
        verts[2], mids[1]
      ];
      layerCurves.push(new THREE.CatmullRomCurve3(loopPts, true));

      for (let j = 0; j < 3; j++) {
        this.vertMeshes[i][j].position.copy(verts[j]);
        this.midMeshes[i][j].position.copy(mids[j]);
      }
    }

    // Update halo positions
    for (let h = 0; h < this.haloMeshes.length; h++) {
      this.haloMeshes[h].halo.position.copy(this.haloMeshes[h].target.position);
    }

    return { layerData, layerCurves };
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    this.controls.update();

    if (this.isPlaying) {
      const delta = this.clock.getDelta();
      this.elapsed = (this.elapsed || 0) + delta * this.speedMultiplier;
    }

    const t = this.elapsed || 0;
    const { layerData, layerCurves } = this.computeFluidState(t);

    // 1. Update 90 Streamlines with organic fluid bowing
    this.splines = [];
    for (let s = 0; s < this.streamLines.length; s++) {
      const item = this.streamLines[s];
      const pFrom = item.from.type === 'v' ? layerData[item.from.l].verts[item.from.idx] : layerData[item.from.l].mids[item.from.idx];
      const pTo = item.to.type === 'v' ? layerData[item.to.l].verts[item.to.idx] : layerData[item.to.l].mids[item.to.idx];

      const midP = new THREE.Vector3().addVectors(pFrom, pTo).multiplyScalar(0.5);
      const tan = new THREE.Vector3().subVectors(pTo, pFrom);
      const norm = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
      const bow = (Math.sin(t * 1.6 + s * 0.08) * 0.45 + 0.65) * this.waveAmplitude;
      midP.addScaledVector(norm, bow);

      const curve = new THREE.CatmullRomCurve3([pFrom, midP, pTo]);
      this.splines.push(curve);

      const pts = curve.getPoints(this.SPLINE_SAMPLES - 1);
      const posAttr = item.line.geometry.attributes.position;
      for (let p = 0; p < pts.length; p++) {
        posAttr.setXYZ(p, pts[p].x, pts[p].y, pts[p].z);
      }
      posAttr.needsUpdate = true;
    }

    // 2. Update Ring closed loops
    for (let r = 0; r < this.ringLines.length; r++) {
      const rl = this.ringLines[r];
      const curve = layerCurves[rl.layer];
      const pts = curve.getPoints(rl.samples - 1);
      const posAttr = rl.line.geometry.attributes.position;
      for (let p = 0; p < pts.length; p++) {
        posAttr.setXYZ(p, pts[p].x, pts[p].y, pts[p].z);
      }
      posAttr.needsUpdate = true;
    }

    // 3. Update Organic Fluid Ribbons
    if (this.ribbonsVisible) {
      for (let rb = 0; rb < this.ribbonMeshes.length; rb++) {
        const rItem = this.ribbonMeshes[rb];
        const c1 = layerCurves[rItem.l1];
        const c2 = layerCurves[rItem.l2];
        const segs = rItem.segs;
        const posAttr = rItem.mesh.geometry.attributes.position;

        for (let s = 0; s <= segs; s++) {
          const u = s / segs;
          const p1 = c1.getPoint(u);
          const p2 = c2.getPoint(u);
          posAttr.setXYZ(s * 2, p1.x, p1.y, p1.z);
          posAttr.setXYZ(s * 2 + 1, p2.x, p2.y, p2.z);
        }
        posAttr.needsUpdate = true;
        rItem.mesh.geometry.computeVertexNormals();
      }
    }

    // 4. Update Fluid Flow Particles
    if (this.particlesVisible) {
      const pPosAttr = this.particleSys.geometry.attributes.position;
      for (let p = 0; p < this.PARTICLE_COUNT; p++) {
        const pd = this.pData[p];
        pd.u = (pd.u + pd.spd * 0.01 * this.speedMultiplier) % 1.0;
        const sp = this.splines[pd.sIdx];
        if (sp) {
          const pt = sp.getPoint(pd.u);
          pPosAttr.setXYZ(p, pt.x, pt.y, pt.z);
        }
      }
      pPosAttr.needsUpdate = true;
    }

    // Gentle floating
    this.mainGroup.position.y = Math.sin(t * 0.4) * 0.5;
    this.mainGroup.rotation.y = t * 0.04;

    this.renderer.render(this.scene, this.camera);
  }

  setMode(mode) {
    this.currentMode = mode;
    if (mode === 'fluid') {
      this.ribbonMat.opacity = 0.16;
      this.streamMat.opacity = 0.32;
      this.particleSys.visible = true;
      this.particlesVisible = true;
      this.ribbonsVisible = true;
      this.controls.autoRotateSpeed = 0.8;
    } else if (mode === 'geodesic') {
      this.ribbonMat.opacity = 0.04;
      this.streamMat.opacity = 0.55;
      this.particleSys.visible = false;
      this.particlesVisible = false;
      this.ribbonsVisible = false;
      this.controls.autoRotateSpeed = 0.4;
    } else if (mode === 'vortex') {
      this.ribbonMat.opacity = 0.24;
      this.streamMat.opacity = 0.45;
      this.particleSys.visible = true;
      this.particlesVisible = true;
      this.ribbonsVisible = true;
      this.controls.autoRotateSpeed = 1.4;
    }
  }

  setCameraPreset(preset) {
    if (preset === 'perspective') {
      this.camera.position.set(22, 18, 36);
      this.controls.target.set(0, 0, 0);
    } else if (preset === 'top') {
      this.camera.position.set(0, 48, 0.1);
      this.controls.target.set(0, 0, 0);
    } else if (preset === 'side') {
      this.camera.position.set(45, 0, 0);
      this.controls.target.set(0, 0, 0);
    }
    this.controls.update();
  }

  initControls() {
    // Mouse fluid agitation
    this.canvasEl.addEventListener('pointermove', (e) => {
      const rect = this.canvasEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.mouse.set(x, y);

      // Map y to layer target (0 to 5)
      this.mouseLayerTarget = (y * 0.5 + 0.5) * (this.LAYERS - 1);
      this.mouseImpulse = Math.min(this.mouseImpulse + 0.3, 1.5);
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
    // Mode buttons
    const modeBtns = document.querySelectorAll('[data-manifold-mode]');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setMode(btn.getAttribute('data-manifold-mode'));
      });
    });

    // Preset buttons
    const presetBtns = document.querySelectorAll('[data-manifold-view]');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setCameraPreset(btn.getAttribute('data-manifold-view'));
      });
    });

    // Sliders
    const speedSlider = document.getElementById('manifold-speed-slider');
    const speedBadge = document.getElementById('manifold-speed-badge');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.speedMultiplier = parseFloat(e.target.value);
        if (speedBadge) speedBadge.innerText = `${this.speedMultiplier.toFixed(1)}x`;
      });
    }

    const waveSlider = document.getElementById('manifold-wave-slider');
    const waveBadge = document.getElementById('manifold-wave-badge');
    if (waveSlider) {
      waveSlider.addEventListener('input', (e) => {
        this.waveAmplitude = parseFloat(e.target.value);
        if (waveBadge) waveBadge.innerText = `${this.waveAmplitude.toFixed(1)}x`;
      });
    }

    const twistSlider = document.getElementById('manifold-twist-slider');
    const twistBadge = document.getElementById('manifold-twist-badge');
    if (twistSlider) {
      twistSlider.addEventListener('input', (e) => {
        this.twistMultiplier = parseFloat(e.target.value);
        if (twistBadge) twistBadge.innerText = `${this.twistMultiplier.toFixed(1)}x`;
      });
    }

    // Play/Pause
    const playPauseBtn = document.getElementById('manifold-play-btn');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playPauseBtn.innerHTML = this.isPlaying
          ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause'
          : '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume';
      });
    }

    // Reset Camera
    const resetBtn = document.getElementById('manifold-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.setCameraPreset('perspective');
        presetBtns.forEach(b => b.classList.remove('active'));
        const pBtn = document.querySelector('[data-manifold-view="perspective"]');
        if (pBtn) pBtn.classList.add('active');
      });
    }

    // Fullscreen Toggle
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
