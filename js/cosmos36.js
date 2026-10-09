/* Cosmos of 36 cells: the same rule at two scales.
   Inner scale: each cell is the 36-vertex, six-layer structure running Conway's rule (birth on 3, survival on 2 or 3).
   Outer scale: the same structure again, whose 36 nodes are the cells. A cell counts as one at the outer scale when its two
   halves (strands, 0.5 each) met at its horizon during the last epoch: 0.5 + 0.5 = 1. At the end of every epoch the outer
   rule acts on the cells: 3 live neighbouring cells fill a cell (all 36 of its nodes alive), 2 keep it running as it is,
   any other count clears it. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const $ = id => document.getElementById(id);
const host = $("cosmos36-view");
if (host) init();

function init() {
  const L = 6, node = (l, kind, j) => 6 * l + 3 * kind + j;
  const strandOf = i => { const l = Math.floor(i / 6), kind = Math.floor((i % 6) / 3); return (kind === 0) === (l % 2 === 0) ? 0 : 1; };
  function structure(R, Y) {
    const pos = [];
    for (let l = 0; l < L; l++) {
      const th0 = (l % 2 === 0 ? 1 : -1) * Math.PI / 2;
      for (let kind = 0; kind < 2; kind++) for (let j = 0; j < 3; j++) {
        const th = th0 + 2 * Math.PI * j / 3, s = kind === 0 ? R : -0.5 * R;
        pos.push(new THREE.Vector3(s * Math.cos(th), (l - (L - 1) / 2) * Y, -s * Math.sin(th)));
      }
    }
    return pos;
  }
  const lines = [], nbr = Array.from({ length: 36 }, () => []);
  for (let l = 0; l < L - 1; l++) for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++)
    for (const [a, b] of [[node(l, 0, i), node(l + 1, 1, k)], [node(l, 1, i), node(l + 1, 0, k)]]) { lines.push([a, b, strandOf(a), l]); nbr[a].push(b); nbr[b].push(a); }
  // the horizon: where a line of one strand meets a line of the other, at height 1/2 of a gap
  const unit = structure(1, 0.62);
  function meet(p, q) {
    const p0 = unit[p[0]], d1 = unit[p[1]].clone().sub(p0), q0 = unit[q[0]], d2 = unit[q[1]].clone().sub(q0), r = p0.clone().sub(q0);
    const a = d1.dot(d1), b = d1.dot(d2), c = d2.dot(d2), d = d1.dot(r), e = d2.dot(r), den = a * c - b * b;
    if (Math.abs(den) < 1e-12) return false;
    const t = (b * e - c * d) / den, u = (a * e - b * d) / den;
    if (t <= 1e-7 || t >= 1 - 1e-7 || u <= 1e-7 || u >= 1 - 1e-7) return false;
    return p0.clone().addScaledVector(d1, t).distanceTo(q0.clone().addScaledVector(d2, u)) < 1e-6;
  }
  const horizon = [];
  for (let x = 0; x < lines.length; x++) for (let y = x + 1; y < lines.length; y++)
    if (lines[x][3] === lines[y][3] && lines[x][2] !== lines[y][2] && meet(lines[x], lines[y])) horizon.push([lines[x][0], lines[x][1], lines[y][0], lines[y][1]]);

  /* ---------- the two scales ---------- */
  let S = Array.from({ length: 36 }, () => new Uint8Array(36));   // S[cell][node]
  let met = new Uint8Array(36), outerAlive = new Uint8Array(36);
  let tick = 0, epoch = 0, T = 14, running = false, last = 0, lastActs = null;
  const outerHist = [];
  function innerStep() {
    for (let c = 0; c < 36; c++) {
      const s = S[c], nx = new Uint8Array(36);
      for (let i = 0; i < 36; i++) { let n = 0; for (const j of nbr[i]) n += s[j]; nx[i] = (n === 3 || (s[i] && n === 2)) ? 1 : 0; }
      S[c] = nx;
      if (!met[c]) for (const h of horizon) if (nx[h[0]] && nx[h[1]] && nx[h[2]] && nx[h[3]]) { met[c] = 1; break; }
    }
    tick++;
    if (tick % T === 0) outerStep();
  }
  function outerStep() {
    outerAlive = met.slice();
    const acts = { filled: 0, kept: 0, cleared: 0 };
    const next = [];
    for (let c = 0; c < 36; c++) {
      let n = 0; for (const j of nbr[c]) n += outerAlive[j];
      if (n === 3) { next.push(new Uint8Array(36).fill(1)); acts.filled++; }
      else if (n === 2) { next.push(S[c]); acts.kept++; }
      else { next.push(new Uint8Array(36)); acts.cleared++; }
    }
    S = next; met = new Uint8Array(36); epoch++; lastActs = acts;
    outerHist.push(Array.from(outerAlive).join(""));
    if (outerHist.length > 200) outerHist.shift();
  }
  function seed(kind) {
    S = Array.from({ length: 36 }, () => new Uint8Array(36)); met = new Uint8Array(36); outerAlive = new Uint8Array(36);
    tick = 0; epoch = 0; lastActs = null; outerHist.length = 0;
    if (kind === "random") S.forEach(s => { for (let i = 0; i < 36; i++) s[i] = Math.random() < 0.5 ? 1 : 0; });
    if (kind === "triad") [0, 1, 2].forEach(j => S[node(0, 0, j)].fill(1));            // one full triad of cells: the bottom vertices of the outer structure
    paint();
  }

  /* ---------- what each cell's strands become (the full map of one strand, 2^18 states) ---------- */
  const strandTriads = [0, 1].map(s => Array.from({ length: L }, (_, l) => 6 * l + 3 * ((l % 2 === 0) === (s === 0) ? 0 : 1)));
  const N18 = 1 << 18, succ = new Int32Array(N18);
  const pc = v => (v & 1) + (v >> 1 & 1) + (v >> 2 & 1);
  for (let code = 0; code < N18; code++) {
    let out = 0;
    for (let t = 0; t < L; t++) {
      const n = (t > 0 ? pc(code >> 3 * (t - 1) & 7) : 0) + (t < L - 1 ? pc(code >> 3 * (t + 1) & 7) : 0), tri = code >> 3 * t & 7;
      out |= (n === 3 ? 7 : n === 2 ? tri : 0) << (3 * t);
    }
    succ[code] = out;
  }
  const encode = (s, k) => strandTriads[k].reduce((acc, b, t) => acc | ((s[b] | s[b + 1] << 1 | s[b + 2] << 2) << (3 * t)), 0);
  function fate(code) {
    const seen = new Map(); let x = code, k = 0;
    while (!seen.has(x)) { seen.set(x, k++); x = succ[x]; }
    const p = k - seen.get(x);
    return p === 1 ? (x === 0 ? "void" : "still") : p === 2 ? "blinker" : `wave${p}`;
  }

  /* ---------- drawing ---------- */
  let col = {};
  function readColours() {
    const cs = getComputedStyle(document.documentElement), v = n => (cs.getPropertyValue(n) || "").trim() || "#888";
    col = { a: v("--strand-a"), b: v("--strand-b"), vertex: v("--vertex"), mid: v("--midpoint"), line: v("--line"), lineStrong: v("--line-strong"), accent: v("--accent"), muted: v("--muted") };
  }
  readColours();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setClearColor(0x000000, 0);
  const stage = document.createElement("div"); stage.className = "stage"; stage.appendChild(renderer.domElement); host.prepend(stage);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(34, 1, 0.05, 200);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.enablePan = false; controls.enableZoom = false; controls.autoRotate = true; controls.autoRotateSpeed = 0.5;
  renderer.domElement.style.touchAction = "pan-y";
  const outerPos = structure(2.2, 1.25), cellScale = 0.2;
  const nodeWorld = []; for (let c = 0; c < 36; c++) for (let i = 0; i < 36; i++) nodeWorld.push(outerPos[c].clone().add(unit[i].clone().multiplyScalar(cellScale)));
  const inst = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), new THREE.MeshBasicMaterial(), 1296);
  const dummy = new THREE.Object3D(); scene.add(inst);
  const innerGeo = new THREE.BufferGeometry(), ip = new Float32Array(36 * lines.length * 6), ic = new Float32Array(36 * lines.length * 6);
  for (let c = 0; c < 36; c++) lines.forEach(([a, b], k) => { const A = nodeWorld[c * 36 + a], B = nodeWorld[c * 36 + b]; ip.set([A.x, A.y, A.z, B.x, B.y, B.z], (c * lines.length + k) * 6); });
  innerGeo.setAttribute("position", new THREE.BufferAttribute(ip, 3)); innerGeo.setAttribute("color", new THREE.BufferAttribute(ic, 3));
  scene.add(new THREE.LineSegments(innerGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.8 })));
  const outerGeo = new THREE.BufferGeometry(), op = new Float32Array(lines.length * 6), oc = new Float32Array(lines.length * 6);
  lines.forEach(([a, b], k) => op.set([outerPos[a].x, outerPos[a].y, outerPos[a].z, outerPos[b].x, outerPos[b].y, outerPos[b].z], k * 6));
  outerGeo.setAttribute("position", new THREE.BufferAttribute(op, 3)); outerGeo.setAttribute("color", new THREE.BufferAttribute(oc, 3));
  scene.add(new THREE.LineSegments(outerGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.55 })));
  const halo = outerPos.map(p => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 12), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.12, depthWrite: false })); m.position.copy(p); scene.add(m); return m; });
  const H = 5 * 1.25 + 0.6, rad = Math.sqrt((H / 2) ** 2 + 2.2 * 2.2) + 0.3;
  const C = c => new THREE.Color(c);

  function paint() {
    const cv = C(col.vertex), cm = C(col.mid), cd = C(col.lineStrong), ca = C(col.a), cb = C(col.b), cl = C(col.line), cacc = C(col.accent);
    for (let c = 0; c < 36; c++) for (let i = 0; i < 36; i++) {
      const on = S[c][i] === 1, k = c * 36 + i;
      dummy.position.copy(nodeWorld[k]); dummy.scale.setScalar(on ? 0.028 : 0.01); dummy.updateMatrix();
      inst.setMatrixAt(k, dummy.matrix); inst.setColorAt(k, on ? ((i % 6) < 3 ? cv : cm) : cd);
    }
    inst.instanceMatrix.needsUpdate = true; if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    for (let c = 0; c < 36; c++) lines.forEach(([a, b, s], k) => {
      const lit = S[c][a] && S[c][b], cc = lit ? (s === 0 ? ca : cb) : cl, o = (c * lines.length + k) * 6;
      ic[o] = ic[o + 3] = cc.r; ic[o + 1] = ic[o + 4] = cc.g; ic[o + 2] = ic[o + 5] = cc.b;
    });
    innerGeo.attributes.color.needsUpdate = true;
    lines.forEach(([a, b], k) => { const lit = outerAlive[a] && outerAlive[b], cc = lit ? cacc : cl, o = k * 6; oc[o] = oc[o + 3] = cc.r; oc[o + 1] = oc[o + 4] = cc.g; oc[o + 2] = oc[o + 5] = cc.b; });
    outerGeo.attributes.color.needsUpdate = true;
    halo.forEach((m, c) => { m.visible = outerAlive[c] === 1 || met[c] === 1; m.material.color.copy(cacc); m.material.opacity = outerAlive[c] ? 0.16 : 0.07; });
    paintFacts(); requestRender();
  }

  function outerPeriod() {
    const h = outerHist, n = h.length;
    for (let p = 1; p <= 14 && 2 * p <= n; p++) { let ok = true; for (let k = 0; k < p; k++) if (h[n - 1 - k] !== h[n - 1 - k - p]) { ok = false; break; } if (ok) return p; }
    return null;
  }
  function paintFacts() {
    const box = $("cosmos36-facts"); if (!box) return;
    const live = outerAlive.reduce((a, b) => a + b, 0);
    const triads = [0, 1].map(s => Array.from({ length: L }, (_, l) => { const b = 6 * l + 3 * ((l % 2 === 0) === (s === 0) ? 0 : 1); return outerAlive[b] + outerAlive[b + 1] + outerAlive[b + 2]; }));
    const census = { void: 0, still: 0, blinker: 0, wave: 0 };
    for (let c = 0; c < 36; c++) for (const k of [0, 1]) { const f = fate(encode(S[c], k)); census[f.startsWith("wave") ? "wave" : f]++; }
    const per = outerPeriod();
    box.innerHTML = `
      <div class="fact"><b>Epoch ${epoch} · inner generation ${tick}</b>${lastActs ? `Last epoch: ${lastActs.filled} cells filled, ${lastActs.kept} kept, ${lastActs.cleared} cleared.` : "Each epoch is " + T + " inner generations; then the outer rule acts on the cells."}<br><span class="muted">A cell is one at the outer scale when its two halves met at its horizon during the epoch.</span></div>
      <div class="fact"><b>The outer scale</b>Live cells: <span class="val">${live} of 36</span>.<br>Cell triads, strand A: <span class="val">${triads[0].join(" ")}</span>; strand B: <span class="val">${triads[1].join(" ")}</span>.${per ? `<br>The outer pattern repeats every <b>${per}</b> epoch${per > 1 ? "s" : ""}.` : ""}</div>
      <div class="fact"><b>Inside the cells</b>The 72 strands become: <span class="val">${census.wave}</span> waves, <span class="val">${census.still}</span> still forms, <span class="val">${census.blinker}</span> blinkers, <span class="val">${census.void}</span> empty.</div>`;
  }

  /* ---------- controls ---------- */
  $("cosmos36-seeds").addEventListener("click", e => { const b = e.target.closest("button[data-seed]"); if (b) seed(b.dataset.seed); });
  $("cosmos36-run").addEventListener("click", () => { running = !running; $("cosmos36-run").textContent = running ? "Pause" : "Run"; last = 0; requestRender(); });
  $("cosmos36-step").addEventListener("click", () => { running = false; $("cosmos36-run").textContent = "Run"; for (let k = 0; k < T; k++) innerStep(); paint(); });
  $("cosmos36-epoch").addEventListener("click", e => { const b = e.target.closest("button[data-v]"); if (!b) return; $("cosmos36-epoch").querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b)); T = parseInt(b.dataset.v, 10); seed("random"); });
  const sp = $("cosmos36-speed"); let speed = 8; sp.addEventListener("input", () => { speed = parseInt(sp.value, 10); $("out-cosmos36-speed").textContent = String(speed); });
  controls.addEventListener("change", () => requestRender());

  /* ---------- render only while visible ---------- */
  let visible = false, raf = 0, dirty = true, onScreen = false;
  function requestRender() { dirty = true; if (visible && !raf) raf = requestAnimationFrame(loop); }
  const sizeOK = () => stage.clientWidth > 0 && stage.clientHeight > 0;
  function fit() {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    const vf = THREE.MathUtils.degToRad(camera.fov), hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect), dist = rad / Math.sin(Math.min(vf, hf) / 2);
    const d = camera.position.lengthSq() > 0 ? camera.position.clone().normalize() : new THREE.Vector3(0.5, 0.35, 0.8).normalize();
    camera.position.copy(d.multiplyScalar(dist)); controls.target.set(0, 0, 0); controls.update(); dirty = true;
  }
  function loop(t) {
    raf = 0; if (!visible || !sizeOK()) return;
    if (running) { if (!last) last = t; if (t - last >= 1000 / speed) { last = t; innerStep(); paint(); } }
    const moved = controls.update();
    if (dirty || moved || controls.autoRotate) { renderer.render(scene, camera); dirty = false; }
    raf = requestAnimationFrame(loop);
  }
  function checkVisible() {
    const panel = host.closest(".tab-panel"), mode = host.closest(".cosmos-mode");
    const on = (!panel || panel.classList.contains("active")) && (!mode || mode.classList.contains("active")) && onScreen && sizeOK();
    if (on && !visible) { visible = true; fit(); requestRender(); } else if (!on) visible = false;
  }
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; checkVisible(); }, { rootMargin: "100px" }).observe(host);
  new ResizeObserver(() => { fit(); checkVisible(); }).observe(stage);
  for (const ev of ["tabchange", "cosmosmode"]) document.addEventListener(ev, () => setTimeout(checkVisible, 0));
  const retheme = () => { readColours(); paint(); };
  document.addEventListener("themechange", retheme);
  if (window.matchMedia) { const mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", retheme); }
  seed("random");
}
