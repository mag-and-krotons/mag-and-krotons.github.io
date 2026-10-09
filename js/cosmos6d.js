/* The 6D cosmos, shown: every node of the nested structure is a point in the space, bright while alive.
   The structure and its behaviour are in cosmos6d-core.js. This file only shows them and reads the bars off the state. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { makeCosmos, TRIAD, PAIR } from "./cosmos6d-core.js?v=20261009j";

const $ = id => document.getElementById(id);
const host = $("cosmos6d-view");
if (host) init();

function init() {
  const COL = { bg: 0x02030a, vertex: [0.0, 0.9, 1.0], mid: [1.0, 0.17, 0.84] };
  const fmt = v => v.toLocaleString("en-GB");

  /* ---------- space ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setClearColor(new THREE.Color(COL.bg).convertSRGBToLinear(), 1);   // the render target keeps it as given; the output pass encodes once
  const stage = document.createElement("div"); stage.className = "stage"; stage.appendChild(renderer.domElement); host.appendChild(stage);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, 0.0005, 400);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.07; controls.zoomToCursor = true;
  controls.minDistance = 0.005; controls.maxDistance = 60; controls.autoRotate = true; controls.autoRotateSpeed = 0.3;
  controls.addEventListener("start", () => { controls.autoRotate = false; });
  const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.8, 0.35, 0.15); composer.addPass(bloom); composer.addPass(new OutputPass());
  const dot = (() => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 32; const g = cv.getContext("2d");
    const gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.35, "rgba(255,255,255,0.55)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr; g.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(cv);
  })();

  let cos = null, points = null, colors = null, kindFine = null;
  let running = false, last = 0, speed = 4;
  const seen = new Map(); let repeat = null; const history = [];

  function build(k) {
    cos = makeCosmos(k);
    if (points) { scene.remove(points); points.geometry.dispose(); points.material.dispose(); }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(cos.positions(), 3));
    colors = new Float32Array(cos.N * 3); g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    kindFine = new Uint8Array(cos.N); for (let x = 0; x < cos.N; x++) kindFine[x] = cos.fineKind(x);
    points = new THREE.Points(g, new THREE.PointsMaterial({
      size: 0.155 * Math.pow(0.5, k - 1), map: dot, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
    }));
    scene.add(points);
  }
  function begin(seed) {
    cos.begin(seed); seen.clear(); repeat = null; history.length = 0; note(); paint();
  }
  function step() { cos.step(); note(); paint(); }
  function note() {
    const h = cos.key();
    if (!repeat && seen.has(h)) repeat = { since: seen.get(h), period: cos.gen - seen.get(h) };
    seen.set(h, cos.gen); if (seen.size > 2000) seen.delete(seen.keys().next().value);
    history.push(cos.alive / cos.N); if (history.length > 600) history.shift();
  }
  function paint() {
    const s = cos.state(), N = cos.N, dim = 0.06 / Math.pow(2, cos.k);
    for (let x = 0; x < N; x++) {
      const base = kindFine[x] ? COL.mid : COL.vertex, f = s[x] ? 1 : dim, o = x * 3;
      colors[o] = base[0] * f; colors[o + 1] = base[1] * f; colors[o + 2] = base[2] * f;
    }
    points.geometry.attributes.color.needsUpdate = true;
    bars(); requestRender();
  }

  /* ---------- the bars: read off the state as it emerges ---------- */
  const spark = $("cosmos6d-spark"), sg = spark.getContext("2d");
  function bars() {
    const L = cos.last, N = cos.N;
    $("cosmos6d-gen").textContent = fmt(cos.gen);
    $("cosmos6d-alive").textContent = `${fmt(cos.alive)} of ${fmt(N)} · ${(100 * cos.alive / N).toFixed(2)}%`;
    $("cosmos6d-act").textContent = L ? `${fmt(L.created)} created · ${fmt(L.kept)} kept · ${fmt(L.cleared)} cleared` : "–";
    $("cosmos6d-rep").textContent = repeat ? (repeat.period === 1 ? `still since generation ${fmt(repeat.since)}` : `every ${fmt(repeat.period)} since generation ${fmt(repeat.since)}`) : "not yet";
    const rows = cos.scales.map((sc, i) => {
      const tot = sc.strand.reduce((a, b) => a + b, 0);
      const st = tot ? sc.strand.map(v => (v / tot).toFixed(3)).join(" : ") : "–";
      return `<div><b>Scale ${i + 1}</b><span>${fmt(sc.still)} still</span><span>${fmt(sc.turning)} turning</span><span>${fmt(sc.empty)} empty</span><span>strands ${st}</span></div>`;
    });
    $("cosmos6d-scalebar").innerHTML = rows.join("");
    // alive share over the generations
    const w = spark.clientWidth, h = spark.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (spark.width !== Math.round(w * dpr)) { spark.width = Math.round(w * dpr); spark.height = Math.round(h * dpr); }
    sg.setTransform(dpr, 0, 0, dpr, 0, 0); sg.clearRect(0, 0, w, h);
    if (history.length > 1) {
      const top = Math.max(...history) || 1, n = history.length;
      sg.strokeStyle = "#7fdcff"; sg.lineWidth = 1; sg.beginPath();
      history.forEach((v, i) => { const X = (i / (n - 1)) * (w - 2) + 1, Y = h - 2 - (v / top) * (h - 4); i ? sg.lineTo(X, Y) : sg.moveTo(X, Y); });
      sg.stroke();
    }
  }

  /* ---------- controls ---------- */
  $("cosmos6d-seeds").addEventListener("click", e => { const b = e.target.closest("button[data-seed]"); if (b) begin(b.dataset.seed); });
  $("cosmos6d-scales").addEventListener("click", e => {
    const b = e.target.closest("button[data-k]"); if (!b) return;
    $("cosmos6d-scales").querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
    setRun(false); build(parseInt(b.dataset.k, 10)); begin("mean");
  });
  const runBtn = $("cosmos6d-run");
  function setRun(on) { running = on; runBtn.textContent = on ? "Pause" : "Run"; last = 0; requestRender(); }
  runBtn.addEventListener("click", () => setRun(!running));
  $("cosmos6d-step").addEventListener("click", () => { setRun(false); step(); });
  const sp = $("cosmos6d-speed");
  sp.addEventListener("input", () => { speed = parseInt(sp.value, 10); $("out-cosmos6d-speed").textContent = String(speed); });
  $("cosmos6d-whole").addEventListener("click", () => { home(); requestRender(); });
  $("cosmos6d-full").addEventListener("click", () => {
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
  function loop(t) {
    raf = 0; if (!visible || !sized()) return;
    if (running) { if (!last) last = t; if (t - last >= 1000 / speed) { last = t; step(); } }
    const moved = controls.update();
    if (dirty || moved) { composer.render(); dirty = false; }
    if (running || moved || controls.autoRotate) raf = requestAnimationFrame(loop);
  }
  function check() {
    const panel = host.closest(".tab-panel"), mode = host.closest(".cosmos-mode");
    const on = (!panel || panel.classList.contains("active")) && (!mode || mode.classList.contains("active")) && onScreen && sized();
    if (on && !visible) { visible = true; fit(); requestRender(); } else if (!on) visible = false;
  }
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; check(); }, { rootMargin: "100px" }).observe(host);
  new ResizeObserver(() => { fit(); check(); requestRender(); }).observe(stage);
  for (const ev of ["tabchange", "cosmosmode", "fullscreenchange"]) document.addEventListener(ev, () => setTimeout(() => { fit(); check(); requestRender(); }, 0));

  window.__cosmos6d = { get c() { return cos; }, step, begin, camera, controls, TRIAD, PAIR };
  home(); build(3); begin("mean");
}
