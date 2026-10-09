/* The 6D cosmos, seen. Nothing of the structure is drawn. Light comes only from the meetings of lines, as much as the
   current exchanged there. A node seen from far is one object holding all the light inside it; when the observer is near
   enough to resolve it, it opens into the structure within, and so on through the six scales. Colour is read from the
   observer's record of each place's rate: one turn of the colour wheel for each doubling above the cosmos's common rate,
   white at the common rate. The structure and its behaviour are in cosmos6d-core.js. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { makeCosmos, unit, SCALES, VERTICES, COPIES, MOVE } from "./cosmos6d-core.js?v=20261010g";

const $ = id => document.getElementById(id);
const host = $("cosmos6d-view");
if (host) init();

function init() {
  const BG = 0x02030a, DT = 0.01, n = unit.n, Mn = unit.meetings.length;
  const fmt = (v, d = 0) => v.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });
  // lightning, in the structure's own terms: the current at which a layer can no longer hand its current on and turns
  // by itself, between 7.0 and 7.5 (cosmos6d/current/inertial.py). Since the cosmos is a sum over its scales, the value
  // is the same at every scale. The default is the last value below it.
  const LIGHTNING = 7.0;

  /* ---------- space ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(new THREE.Color(BG).convertSRGBToLinear(), 1);   // the render target keeps it as given; the output pass encodes once
  const stage = document.createElement("div"); stage.className = "stage"; stage.appendChild(renderer.domElement); host.appendChild(stage);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, 0.00001, 400);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.07; controls.zoomToCursor = true;
  controls.minDistance = 0.00005; controls.maxDistance = 60;
  const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.9, 0.4, 0.05); composer.addPass(bloom); composer.addPass(new OutputPass());

  // points of light: each with its own size, so a whole node and a single meeting can be drawn side by side
  const MAXP = 300000;
  const P = new Float32Array(MAXP * 3), C = new Float32Array(MAXP * 3), Z = new Float32Array(MAXP);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(P, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute("color", new THREE.BufferAttribute(C, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute("size", new THREE.BufferAttribute(Z, 1).setUsage(THREE.DynamicDrawUsage));
  const mat = new THREE.ShaderMaterial({
    uniforms: { scale: { value: 300 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: "attribute float size; attribute vec3 color; varying vec3 vC; uniform float scale;" +
      "void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = max(1.0, size * scale / -mv.z); gl_Position = projectionMatrix * mv; }",
    fragmentShader: "varying vec3 vC; void main(){ vec2 q = gl_PointCoord - 0.5; float r2 = dot(q, q) * 4.0; if (r2 > 1.0) discard; gl_FragColor = vec4(vC, exp(-4.0 * r2)); }"
  });
  const points = new THREE.Points(geo, mat); points.frustumCulled = false; scene.add(points);

  /* ---------- the cosmos and its observer ---------- */
  const cos = makeCosmos();
  const rec = new Float64Array(SCALES * n);                                 // the observer's record of each place's rate
  const KEEP = 0.002;                                                       // each reading enters at 1/500: about 5 time units
  let running = false, perFrame = 20, steps = 0, samples = 0, putScale = -1;
  const RING = 1024, EVERY = 10, layerSeries = Array.from({ length: 6 }, () => new Float64Array(RING)), gapSeries = Array.from({ length: 5 }, () => new Float64Array(RING));
  function sample() {
    if (putScale < 0) return;
    const o = putScale * n, i = samples % RING, g = cos.gapCurrents(putScale);
    for (let l = 0; l < 6; l++) { let m = 0; for (let d = 6 * l; d < 6 * l + 6; d++) m += cos.p[o + d]; layerSeries[l][i] = m / 6; }
    for (let l = 0; l < 5; l++) gapSeries[l][i] = g[l];
    samples++;
  }
  function step() {
    for (let r = 0; r < perFrame; r++) {
      cos.step(DT);
      for (let i = 0; i < rec.length; i++) rec[i] += KEEP * (cos.p[i] - rec[i]);
      if (++steps % EVERY === 0) sample();
    }
  }

  /* ---------- what the observer sees, from the outside in ---------- */
  const OPEN = 48;                                                          // a node opens when its structure spans this many pixels
  const frustum = new THREE.Frustum(), M4 = new THREE.Matrix4(), sph = new THREE.Sphere(), V3 = new THREE.Vector3(), V2 = new THREE.Vector2();
  const scaleF = Array.from({ length: SCALES + 1 }, (_, v) => Math.pow(MOVE, v));
  function hueOf(rate, m, v) {
    if (!(v > 0) || !(m > 0)) return [v, v, v];
    const oct = Math.log2(Math.abs(rate) / m);
    if (!(oct > 0)) return [v, v, v];                                       // at the common rate or slower: white
    const h = oct - Math.floor(oct), s = Math.min(1, oct);
    const f = k => { const kk = (k + h * 6) % 6; return 1 - Math.max(0, Math.min(kk, 4 - kk, 1)); };
    return [v * (1 - s + s * f(5)), v * (1 - s + s * f(3)), v * (1 - s + s * f(1))];
  }
  let drawn = 0;
  function draw() {
    const h = renderer.getDrawingBufferSize(V2).y || 600, focal = (h / 2) / Math.tan(camera.fov * Math.PI / 360);
    mat.uniforms.scale.value = h / 2;
    camera.updateMatrixWorld(); M4.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); frustum.setFromProjectionMatrix(M4);
    const m = cos.putIn / VERTICES;                                         // the common rate: every vertex's share of the current
    // per scale: its meetings' light, the rate of its summed phasor, and the light inside a node of each depth
    const Ls = new Float64Array(SCALES), Rs = new Float64Array(SCALES);
    for (let s = 0; s < SCALES; s++) {
      for (let g = 0; g < Mn; g++) Ls[s] += Math.abs(cos.light[s * Mn + g]);
      const [re, im] = cos.scaleSum(s), q = re * re + im * im;
      if (q > 1e-6) { let a = 0; for (let d = 0; d < n; d++) a += rec[s * n + d] * (Math.cos(cos.psi[s * n + d]) * re + Math.sin(cos.psi[s * n + d]) * im); Rs[s] = a / q; }
    }
    const tail = new Float64Array(SCALES + 1), bright = new Float64Array(SCALES + 1);
    for (let v = SCALES - 1; v >= 0; v--) tail[v] = tail[v + 1] + Rs[v];
    for (let v = 0; v < SCALES; v++) {
      let T = 0, N = 0;
      for (let s = v; s < SCALES; s++) { T += 36 ** (s - v) * Ls[s]; N += 36 ** (s - v) * Mn; }
      bright[v] = Math.log1p(T) / Math.log1p(N);
    }
    let k = 0;
    const emit = (x, y, z, size, light, rate) => {
      if (k >= MAXP || !(light > 1e-4)) return;
      const c = hueOf(rate, m, light);
      P[k * 3] = x; P[k * 3 + 1] = y; P[k * 3 + 2] = z; C[k * 3] = c[0]; C[k * 3 + 1] = c[1]; C[k * 3 + 2] = c[2]; Z[k] = size; k++;
    };
    // breadth first: the cosmos itself is always open; every node after it opens only as far as it is resolved
    const queue = [[0, 0, 0, 0, 0, 1]]; let head = 0;                        // depth, x, y, z, rate so far, weight
    while (head < queue.length) {
      const [v, x, y, z, rb, w] = queue[head++];
      if (v >= SCALES) continue;                                            // a vertex of scale 6: its structure within is not run
      const f = scaleF[v], fa = Math.abs(f), r = 1.7 * fa;
      let open = 1;
      if (v > 0) {
        sph.center.set(x, y, z); sph.radius = r * 1.3;
        if (!frustum.intersectsSphere(sph)) continue;
        const dist = Math.max(1e-9, V3.set(x, y, z).distanceTo(camera.position));
        open = Math.max(0, Math.min(1, (r * focal / dist - OPEN) / OPEN));
        if (k + Mn + 1 > MAXP || queue.length > 60000) open = 0;
        if (open < 1) emit(x, y, z, 1.4 * fa, bright[v] * w * (1 - open), rb + tail[v]);
      }
      if (open <= 0) continue;
      const o = v * n;
      for (let g = 0; g < Mn; g++) {                                        // the meetings of the structure within
        const mt = unit.meetings[g], ends = (rec[o + mt.a0] + rec[o + mt.a1] + rec[o + mt.b0] + rec[o + mt.b1]) / 4;
        emit(x + f * mt.pos[0], y + fa * mt.pos[1], z + f * mt.pos[2], 0.2 * fa, Math.abs(cos.light[v * Mn + g]) * w * open, rb + ends + tail[v + 1]);
      }
      for (let d = 0; d < n; d++) {                                         // and its 36 nodes, each the structure within again
        const u = unit.pos[d];
        queue.push([v + 1, x + f * u[0], y + fa * u[1], z + f * u[2], rb + rec[o + d], w * open]);
      }
    }
    geo.setDrawRange(0, k);
    geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true; geo.attributes.size.needsUpdate = true;
    drawn = k;
  }

  /* ---------- the bars: what an observer inside could measure ---------- */
  function fft(re, im) {
    const N = re.length;
    for (let i = 1, j = 0; i < N; i++) { let b = N >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; } }
    for (let len = 2; len <= N; len <<= 1) {
      const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a);
      for (let i = 0; i < N; i += len) { let cr = 1, ci = 0; for (let j = 0; j < len / 2; j++) { const hh = len / 2, ur = re[i + j], ui = im[i + j], vr = re[i + j + hh] * cr - im[i + j + hh] * ci, vi = re[i + j + hh] * ci + im[i + j + hh] * cr; re[i + j] = ur + vr; im[i + j] = ui + vi; re[i + j + hh] = ur - vr; im[i + j + hh] = ui - vi; const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t; } }
    }
  }
  function strongest(series) {
    let N = 1; while (N * 2 <= Math.min(samples, RING)) N *= 2; if (N < 16) return null;
    const re = new Float64Array(N), im = new Float64Array(N); let mean = 0;
    for (let i = 0; i < N; i++) { re[i] = series[(samples - N + i) % RING]; mean += re[i]; } mean /= N;
    for (let i = 0; i < N; i++) re[i] = (re[i] - mean) * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1)));
    fft(re, im); let best = 1, bp = 0;
    for (let i = 1; i < N / 2; i++) { const q = re[i] * re[i] + im[i] * im[i]; if (q > bp) { bp = q; best = i; } }
    return bp > 0 ? 2 * Math.PI * best / (N * EVERY * DT) : 0;
  }
  let frames = 0;
  function bars() {
    $("c6-in").textContent = fmt(cos.putIn);
    $("c6-now").textContent = fmt(cos.current());
    $("c6-energy").textContent = fmt(cos.energy());
    let ex = 0; for (let i = 0; i < SCALES * Mn; i++) if (Math.abs(cos.light[i]) > 0.01) ex++;
    $("c6-meet").textContent = `${fmt(ex * COPIES)} of ${fmt(SCALES * Mn * COPIES)}`;
    $("c6-gaps-label").textContent = putScale >= 0 ? `Across the gaps of scale ${putScale + 1}` : "Across the gaps";
    $("c6-layers-label").textContent = putScale >= 0 ? `In each layer of scale ${putScale + 1}` : "In each layer";
    const nN = Math.min(samples, RING);
    $("c6-gaps").textContent = putScale >= 0 && nN > 1 ? gapSeries.map((g, i) => {
      let a = 0, q = 0; for (let t = 0; t < nN; t++) { a += g[t]; q += g[t] * g[t]; } a /= nN;
      return `${i + 1}|${i + 2}: ${fmt(a, 2)} · ${fmt(Math.sqrt(Math.max(0, q / nN - a * a)), 2)}`;
    }).join("   ") : "–";
    $("c6-layers").textContent = putScale >= 0 ? layerSeries.map((ser, l) => {
      let a = 0, q = 0; for (let d = 6 * l; d < 6 * l + 6; d++) { const x = cos.p[putScale * n + d]; a += x; q += x * x; } a /= 6;
      const f = strongest(ser);
      return `${l + 1}: ${f === null ? "–" : fmt(f, 2)} · ${fmt(q / 6 - a * a, 3)}`;
    }).join("   ") : "–";
    let tot = 0; const ks = new Float64Array(SCALES);
    for (let s = 0; s < SCALES; s++) { for (let d = 0; d < n; d++) ks[s] += cos.p[s * n + d] ** 2; tot += ks[s]; }
    $("c6-where").textContent = tot > 0 ? Array.from(ks).map((v, s) => `${s + 1}: ${(v / tot).toFixed(3)}`).join("   ") : "–";
  }

  /* ---------- controls ---------- */
  const put = $("c6-put"), runBtn = $("c6-run"), sc = $("c6-scale"), lay = $("c6-layer"), val = $("c6-value");
  put.addEventListener("click", () => {                                    // put in once, then never touched
    putScale = +sc.value - 1; cos.put(putScale, +lay.value - 1, +val.value);
    put.disabled = true; draw(); bars(); setRun(true);
  });
  function begin() {
    setRun(false); cos.reset(); rec.fill(0); steps = 0; samples = 0; putScale = -1; put.disabled = false;
    val.value = LIGHTNING; $("out-c6-value").textContent = LIGHTNING.toFixed(1); draw(); bars();
  }
  function setRun(on) { running = on; runBtn.textContent = on ? "Pause" : "Run"; requestRender(); }
  runBtn.addEventListener("click", () => setRun(!running));
  $("c6-again").addEventListener("click", begin);
  const sp = $("c6-speed"); sp.addEventListener("input", () => { perFrame = +sp.value; $("out-c6-speed").textContent = sp.value; });
  val.addEventListener("input", () => { $("out-c6-value").textContent = (+val.value).toFixed(1); });
  $("c6-whole").addEventListener("click", () => { home(); moved = true; requestRender(); });
  $("c6-full").addEventListener("click", () => {
    const f = $("cosmos6d-frame");
    if (document.fullscreenElement) document.exitFullscreen(); else if (f.requestFullscreen) f.requestFullscreen();
  });

  /* ---------- render only while it can be seen ---------- */
  let visible = false, onScreen = false, raf = 0, dirty = true, moved = true;
  controls.addEventListener("change", () => { moved = true; requestRender(); });
  const sized = () => stage.clientWidth > 0 && stage.clientHeight > 0;
  function requestRender() { dirty = true; if (visible && !raf) raf = requestAnimationFrame(loop); }
  function home() { camera.position.set(4.6, 2.2, 7.4); controls.target.set(0, 0, 0); controls.update(); }
  function fit() {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true; moved = true;
  }
  function loop() {
    raf = 0; if (!visible || !sized()) return;
    const turning = controls.update();
    if (running) { step(); frames++; if (frames % 10 === 0) bars(); }
    if (running || moved || turning) { draw(); moved = false; dirty = true; }
    if (dirty) { composer.render(); dirty = false; }
    if (running || turning) raf = requestAnimationFrame(loop);
  }
  function check() {
    const panel = host.closest(".tab-panel"), mode = host.closest(".cosmos-mode");
    const on = (!panel || panel.classList.contains("active")) && (!mode || mode.classList.contains("active")) && onScreen && sized();
    if (on && !visible) { visible = true; fit(); requestRender(); } else if (!on) visible = false;
  }
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; check(); }, { rootMargin: "100px" }).observe(host);
  new ResizeObserver(() => { fit(); check(); requestRender(); }).observe(stage);
  for (const ev of ["tabchange", "cosmosmode", "fullscreenchange"]) document.addEventListener(ev, () => setTimeout(() => { fit(); check(); requestRender(); }, 0));

  window.__cosmos6d = { c: cos, step, draw, bars, camera, controls, get drawn() { return drawn; }, get putScale() { return putScale; } };
  home(); begin();
}
