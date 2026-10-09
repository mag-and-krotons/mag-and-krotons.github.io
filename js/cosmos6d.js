/* The 6D cosmos, seen. Nothing of the structure is drawn: no node, no line. Light comes only from the meeting points of
   lines, as much as the current exchanged there. The observer keeps a record of each place's rate; colour is read from
   it, one turn of the colour wheel for each doubling of the rate above the cosmos's common rate, and there is no colour
   where a place turns at the common rate. The structure and its behaviour are in cosmos6d-core.js. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { makeCosmos, unit } from "./cosmos6d-core.js?v=20261010b";

const $ = id => document.getElementById(id);
const host = $("cosmos6d-view");
if (host) init();

function init() {
  const BG = 0x02030a, DT = 0.01, fmt = (v, d = 0) => v.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

  /* ---------- space ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(new THREE.Color(BG).convertSRGBToLinear(), 1);   // the render target keeps it as given; the output pass encodes once
  const stage = document.createElement("div"); stage.className = "stage"; stage.appendChild(renderer.domElement); host.appendChild(stage);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, 0.0005, 400);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.07; controls.zoomToCursor = true;
  controls.minDistance = 0.005; controls.maxDistance = 60;
  const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.9, 0.4, 0.05); composer.addPass(bloom); composer.addPass(new OutputPass());
  const dot = (() => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 32; const g = cv.getContext("2d");
    const gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.35, "rgba(255,255,255,0.5)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr; g.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(cv);
  })();

  let cos = null, points = null, colors = null, ends = null, rec = null, running = false, perFrame = 4, frames = 0;
  // lightning, in the structure's own terms: the current at which a layer can no longer hand its current on and turns
  // by itself. Found by running the structure (cosmos6d/current/inertial.py): between 7.0 and 7.5 at one level and
  // between 9.0 and 9.5 at two, between 10 and 11 at three. The default is the last value below it, where the whole
  // cosmos takes the current.
  const LIGHTNING = { 1: 7.0, 2: 9.0, 3: 10.0 };

  function build(k) {
    cos = makeCosmos(k);
    if (points) { scene.remove(points); points.geometry.dispose(); points.material.dispose(); }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(cos.meetPositions(), 3));
    colors = new Float32Array(cos.meetN * 3); g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    ends = cos.meetEnds(); rec = new Float64Array(cos.N);
    points = new THREE.Points(g, new THREE.PointsMaterial({
      size: 0.12 * Math.pow(0.5, k - 1), map: dot, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
    }));
    scene.add(points);
    fillLevels(); val.value = LIGHTNING[k]; $("out-c6-value").textContent = LIGHTNING[k].toFixed(1); begin();
  }
  function begin() {
    setRun(false); cos.reset(); rec.fill(0); steps = 0; samples = 0; put.disabled = false; paint(); bars();
  }

  /* ---------- the observer: a record of each place's rate, read at every step ---------- */
  const KEEP = 0.002;                                                       // each reading enters the record at 1/500: a memory of about 5 time units
  function observe() { const p = cos.p; for (let x = 0; x < cos.N; x++) rec[x] += KEEP * (p[x] - rec[x]); }
  // and the propagation: every 10 steps it notes each layer's mean current and the current across each gap
  const RING = 1024, EVERY = 10, layerSeries = Array.from({ length: 6 }, () => new Float64Array(RING)), gapSeries = Array.from({ length: 5 }, () => new Float64Array(RING));
  let steps = 0, samples = 0;
  function sample() {
    const s = cos.stride[0], p = cos.p, m = new Float64Array(6);
    for (let x = 0; x < cos.N; x++) m[Math.floor(Math.floor(x / s) / 6)] += p[x];
    const g = cos.gapCurrents(), i = samples % RING;
    for (let l = 0; l < 6; l++) layerSeries[l][i] = m[l] / (6 * s);
    for (let l = 0; l < 5; l++) gapSeries[l][i] = g[l];
    samples++;
  }
  function step() { for (let r = 0; r < perFrame; r++) { cos.step(DT); observe(); if (++steps % EVERY === 0) sample(); } }
  function fft(re, im) {                                                  // radix-2, in place
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) { let b = n >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; } }
    for (let len = 2; len <= n; len <<= 1) {
      const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a);
      for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let j = 0; j < len / 2; j++) { const ur = re[i + j], ui = im[i + j], vr = re[i + j + len / 2] * cr - im[i + j + len / 2] * ci, vi = re[i + j + len / 2] * ci + im[i + j + len / 2] * cr; re[i + j] = ur + vr; im[i + j] = ui + vi; re[i + j + len / 2] = ur - vr; im[i + j + len / 2] = ui - vi; const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t; } }
    }
  }
  // the strongest frequency in a layer's mean current over the last samples (turns of the phase per unit of the step's time)
  function strongest(series) {
    let n = 1; while (n * 2 <= Math.min(samples, RING)) n *= 2; if (n < 16) return null;
    const re = new Float64Array(n), im = new Float64Array(n); let mean = 0;
    for (let i = 0; i < n; i++) { re[i] = series[(samples - n + i) % RING]; mean += re[i]; } mean /= n;
    for (let i = 0; i < n; i++) re[i] = (re[i] - mean) * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / (n - 1)));
    fft(re, im); let best = 1, bp = 0;
    for (let i = 1; i < n / 2; i++) { const q = re[i] * re[i] + im[i] * im[i]; if (q > bp) { bp = q; best = i; } }
    return bp > 0 ? 2 * Math.PI * best / (n * EVERY * DT) : 0;
  }

  function paint() {
    const L = cos.light, m = cos.putIn / cos.N;
    for (let i = 0; i < cos.meetN; i++) {
      const v = Math.min(1, Math.abs(L[i])), o = i * 3;
      let r = v, g = v, b = v;
      if (v > 0 && m > 0) {
        const e = ends.subarray(i * 4, i * 4 + 4), rate = Math.abs(rec[e[0]] + rec[e[1]] + rec[e[2]] + rec[e[3]]) / 4;
        const oct = Math.log2(rate / m);
        if (oct > 0) {                                                       // faster than the cosmos as a whole: a colour
          const h = oct - Math.floor(oct), s = Math.min(1, oct);
          const f = n => { const kk = (n + h * 6) % 6; return 1 - Math.max(0, Math.min(kk, 4 - kk, 1)); };
          r = v * (1 - s + s * f(5)); g = v * (1 - s + s * f(3)); b = v * (1 - s + s * f(1));
        }
      }
      colors[o] = r; colors[o + 1] = g; colors[o + 2] = b;
    }
    points.geometry.attributes.color.needsUpdate = true; requestRender();
  }

  /* ---------- the bars: what an observer inside could measure ---------- */
  function bars() {
    const N = cos.N, p = cos.p;
    $("c6-in").textContent = fmt(cos.putIn, 2);
    $("c6-now").textContent = fmt(cos.current(), 2);
    let ke = 0; for (let x = 0; x < N; x++) ke += 0.5 * p[x] * p[x];
    // current as it propagates: across each gap of the outermost level its one-way part and its alternating part,
    // and in each layer its strongest frequency and its temperature (the spread of its places' currents)
    const n = Math.min(samples, RING);
    if (n > 1) {
      $("c6-gaps").textContent = gapSeries.map((g, i) => {
        let m = 0, q = 0; for (let t = 0; t < n; t++) { m += g[t]; q += g[t] * g[t]; } m /= n;
        return `${i + 1}|${i + 2}: ${fmt(m, 2)} · ${fmt(Math.sqrt(Math.max(0, q / n - m * m)), 1)}`;
      }).join("   ");
    } else $("c6-gaps").textContent = "–";
    const sL = cos.stride[0], sum = new Float64Array(6), sq = new Float64Array(6);
    for (let x = 0; x < N; x++) { const l = Math.floor(Math.floor(x / sL) / 6); sum[l] += p[x]; sq[l] += p[x] * p[x]; }
    $("c6-layers").textContent = cos.putIn ? layerSeries.map((ser, l) => {
      const c = 6 * sL, m = sum[l] / c, T = sq[l] / c - m * m, f = strongest(ser);
      return `${l + 1}: ${f === null ? "–" : fmt(f, 2)} · ${fmt(T, 3)}`;
    }).join("   ") : "–";
    // where the motion is: by layer of the outermost level, and in the busiest hundredth of places
    const s = cos.stride[0], byLayer = new Array(6).fill(0), kin = new Float64Array(N);
    for (let x = 0; x < N; x++) { kin[x] = 0.5 * p[x] * p[x]; byLayer[Math.floor(Math.floor(x / s) / 6)] += kin[x]; }
    const sorted = Array.from(kin).sort((a, b) => b - a); let busy = 0; for (let i = 0; i < Math.max(1, Math.floor(N / 100)); i++) busy += sorted[i];
    $("c6-where").textContent = ke > 0 ? byLayer.map(v => (v / ke).toFixed(3)).join(" · ") + ` · busiest 1%: ${(busy / ke).toFixed(3)}` : "–";
    let lit = 0; for (let i = 0; i < cos.meetN; i++) if (Math.abs(cos.light[i]) > 0.01) lit++;
    $("c6-meet").textContent = `${fmt(lit)} of ${fmt(cos.meetN)}`;
    if (frames % 4 === 0) $("c6-energy").textContent = fmt(cos.energy(), 2);
  }

  /* ---------- controls ---------- */
  const put = $("c6-put"), runBtn = $("c6-run"), lev = $("c6-level"), lay = $("c6-layer"), val = $("c6-value");
  function fillLevels() {
    lev.innerHTML = Array.from({ length: cos.k }, (_, i) => `<option value="${i}">${i + 1}</option>`).join("");
  }
  put.addEventListener("click", () => {                                    // put in once, then never touched
    cos.put(nodesOfLayer(+lev.value, +lay.value - 1), +val.value);
    put.disabled = true; paint(); bars(); setRun(true);
  });
  // every node whose digit at this level lies in this layer: the whole layer at that scale
  function nodesOfLayer(level, layer) {
    const out = [], s = cos.stride[level];
    for (let x = 0; x < cos.N; x++) if (Math.floor(Math.floor(x / s) % 36 / 6) === layer) out.push(x);
    return out;
  }
  $("c6-scales").addEventListener("click", e => {
    const b = e.target.closest("button[data-k]"); if (!b) return;
    $("c6-scales").querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
    build(+b.dataset.k);
  });
  function setRun(on) { running = on; runBtn.textContent = on ? "Pause" : "Run"; requestRender(); }
  runBtn.addEventListener("click", () => setRun(!running));
  $("c6-again").addEventListener("click", begin);
  const sp = $("c6-speed"); sp.addEventListener("input", () => { perFrame = +sp.value; $("out-c6-speed").textContent = sp.value; });
  val.addEventListener("input", () => { $("out-c6-value").textContent = (+val.value).toFixed(1); });
  $("c6-whole").addEventListener("click", () => { home(); requestRender(); });
  $("c6-full").addEventListener("click", () => {
    const f = $("cosmos6d-frame");
    if (document.fullscreenElement) document.exitFullscreen(); else if (f.requestFullscreen) f.requestFullscreen();
  });
  controls.addEventListener("change", () => requestRender());

  /* ---------- render only while it can be seen ---------- */
  let visible = false, onScreen = false, raf = 0, dirty = true;
  const sized = () => stage.clientWidth > 0 && stage.clientHeight > 0;
  function requestRender() { dirty = true; if (visible && !raf) raf = requestAnimationFrame(loop); }
  function home() { camera.position.set(4.6, 2.2, 7.4); controls.target.set(0, 0, 0); controls.update(); }
  function fit() {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true;
  }
  function loop() {
    raf = 0; if (!visible || !sized()) return;
    if (running) { step(); paint(); frames++; if (frames % 10 === 0) bars(); }
    const moved = controls.update();
    if (dirty || moved) { composer.render(); dirty = false; }
    if (running || moved) raf = requestAnimationFrame(loop);
  }
  function check() {
    const panel = host.closest(".tab-panel"), mode = host.closest(".cosmos-mode");
    const on = (!panel || panel.classList.contains("active")) && (!mode || mode.classList.contains("active")) && onScreen && sized();
    if (on && !visible) { visible = true; fit(); requestRender(); } else if (!on) visible = false;
  }
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; check(); }, { rootMargin: "100px" }).observe(host);
  new ResizeObserver(() => { fit(); check(); requestRender(); }).observe(stage);
  for (const ev of ["tabchange", "cosmosmode", "fullscreenchange"]) document.addEventListener(ev, () => setTimeout(() => { fit(); check(); requestRender(); }, 0));

  window.__cosmos6d = { get c() { return cos; }, step, paint, bars, get colors() { return colors; }, get rec() { return rec; }, camera, controls, unit, nodesOfLayer };
  home(); build(2);
}
