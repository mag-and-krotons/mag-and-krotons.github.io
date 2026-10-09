/* 6D Life: Conway's rule on the 36 vertices and 90 lines of the six-layer structure.
   Layer l (0..5) is a triangle of 3 vertices V and its 3 side midpoints M = -1/2 x the vertices, turned through 180 degrees
   against its neighbours. Every vertex is joined to every midpoint of the neighbouring layers. Strand A: vertices of
   layers 0, 2, 4 and midpoints of 1, 3, 5; strand B the rest. The two strands share no line.
   Rule: a dead node with exactly 3 live neighbours comes alive; a live node with 2 or 3 stays; every other node is dead.
   All three nodes of a triad have the same six neighbours, so the rule sees only the counts of the neighbouring triads. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const $ = id => document.getElementById(id);
const host = $("life-view");
if (host) init();

function init() {
  const L = 6, R = 1, Y = 0.62;
  const node = (l, kind, j) => 6 * l + 3 * kind + j;
  const strandOf = i => { const l = Math.floor(i / 6), kind = Math.floor((i % 6) / 3); return (kind === 0) === (l % 2 === 0) ? 0 : 1; };

  /* ---------- the structure ---------- */
  const pos = [];
  for (let l = 0; l < L; l++) {
    const th0 = (l % 2 === 0 ? 1 : -1) * Math.PI / 2;
    for (let kind = 0; kind < 2; kind++) for (let j = 0; j < 3; j++) {
      const th = th0 + 2 * Math.PI * j / 3, s = kind === 0 ? R : -0.5 * R;
      pos.push(new THREE.Vector3(s * Math.cos(th), (l - (L - 1) / 2) * Y, -s * Math.sin(th)));
    }
  }
  const lines = [];                       // [a, b, strand, gap]
  const nbr = Array.from({ length: 36 }, () => []);
  for (let l = 0; l < L - 1; l++) for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) {
    for (const [a, b] of [[node(l, 0, i), node(l + 1, 1, k)], [node(l, 1, i), node(l + 1, 0, k)]]) {
      lines.push([a, b, strandOf(a), l]); nbr[a].push(b); nbr[b].push(a);
    }
  }
  // where lines meet inside a gap: the two strands at height 1/2, a strand with itself at 1/3 and 2/3
  function meet(p, q) {
    const p0 = pos[p[0]], d1 = pos[p[1]].clone().sub(p0), q0 = pos[q[0]], d2 = pos[q[1]].clone().sub(q0), r = p0.clone().sub(q0);
    const a = d1.dot(d1), b = d1.dot(d2), c = d2.dot(d2), d = d1.dot(r), e = d2.dot(r), den = a * c - b * b;
    if (Math.abs(den) < 1e-12) return null;
    const t = (b * e - c * d) / den, u = (a * e - b * d) / den;
    if (t <= 1e-7 || t >= 1 - 1e-7 || u <= 1e-7 || u >= 1 - 1e-7) return null;
    const P = p0.clone().addScaledVector(d1, t), Q = q0.clone().addScaledVector(d2, u);
    return P.distanceTo(Q) < 1e-6 ? P : null;
  }
  const horizon = [], selfMeet = [];
  for (let x = 0; x < lines.length; x++) for (let y = x + 1; y < lines.length; y++) {
    if (lines[x][3] !== lines[y][3]) continue;
    const P = meet(lines[x], lines[y]); if (!P) continue;
    (lines[x][2] !== lines[y][2] ? horizon : selfMeet).push({ a: lines[x], b: lines[y], p: P });
  }

  /* ---------- one strand as 18 bits: 6 triads along the strand, 3 bits each ---------- */
  const strandTriads = [0, 1].map(s => Array.from({ length: L }, (_, l) => 6 * l + 3 * ((l % 2 === 0) === (s === 0) ? 0 : 1)));
  const encode = (st, s) => strandTriads[s].reduce((acc, base, t) => acc | ((st[base] | st[base + 1] << 1 | st[base + 2] << 2) << (3 * t)), 0);
  const N18 = 1 << 18, succ = new Int32Array(N18), indeg = new Uint8Array(N18);
  const pc = v => (v & 1) + (v >> 1 & 1) + (v >> 2 & 1);
  for (let code = 0; code < N18; code++) {
    let out = 0;
    for (let t = 0; t < L; t++) {
      const n = (t > 0 ? pc(code >> 3 * (t - 1) & 7) : 0) + (t < L - 1 ? pc(code >> 3 * (t + 1) & 7) : 0);
      const tri = code >> 3 * t & 7;
      out |= (n === 3 ? 7 : n === 2 ? tri : 0) << (3 * t);
    }
    succ[code] = out; if (indeg[out] < 255) indeg[out]++;
  }
  function forecast(code) {
    const seen = new Map(); let x = code, k = 0;
    while (!seen.has(x)) { seen.set(x, k++); x = succ[x]; }
    const start = seen.get(x), period = k - start;
    let kind = period === 1 ? (x === 0 ? "void" : "still") : period === 2 ? "blinker" : "wave";
    return { steps: start, period, kind, noPast: indeg[code] === 0 };
  }

  /* ---------- the game ---------- */
  let alive = new Uint8Array(36), gen = 0, running = false, last = 0, acts = null;
  const history = [];
  function step() {
    const next = new Uint8Array(36);
    for (let i = 0; i < 36; i++) {
      let n = 0; for (const j of nbr[i]) n += alive[j];
      next[i] = (n === 3 || (alive[i] && n === 2)) ? 1 : 0;
    }
    // what the rule did to each triad: created (filled), kept, cleared
    acts = { created: 0, kept: 0, cleared: 0 };
    for (let l = 0; l < L; l++) for (let kind = 0; kind < 2; kind++) {
      const b = 6 * l + 3 * kind, before = alive[b] + alive[b + 1] + alive[b + 2], after = next[b] + next[b + 1] + next[b + 2];
      const same = alive[b] === next[b] && alive[b + 1] === next[b + 1] && alive[b + 2] === next[b + 2];
      if (after === 3 && before < 3) acts.created++; else if (before > 0 && same) acts.kept++; else if (before > 0 && after === 0) acts.cleared++;
    }
    alive = next; gen++; record(); paint();
  }
  function record() {
    history.push([0, 1].map(s => strandTriads[s].map(b => alive[b] + alive[b + 1] + alive[b + 2])));
    if (history.length > 400) history.shift();
  }
  function seed(kind) {
    alive = new Uint8Array(36); gen = 0; history.length = 0; acts = null;
    const rnd = () => (Math.random() < 0.5 ? 1 : 0);
    if (kind === "random") for (let i = 0; i < 36; i++) alive[i] = rnd();
    if (kind === "wave") { const b = strandTriads[0][0]; alive[b] = alive[b + 1] = alive[b + 2] = 1; }
    if (kind === "turning") alive[node(0, 0, 0)] = 1;
    if (kind === "forms") {
      const A = strandTriads[0], B = strandTriads[1];
      alive[A[0]] = alive[A[0] + 1] = 1; alive[A[1]] = alive[A[1] + 2] = 1;                  // the pair 2,2
      alive[B[2] + 1] = 1; alive[B[3]] = alive[B[3] + 1] = 1; alive[B[4] + 2] = 1;          // the binomial triad 1,2,1
    }
    if (kind === "mirror") for (let i = 0; i < 36; i++) {
      const l = Math.floor(i / 6); if (strandOf(i) !== 0) continue;
      alive[i] = rnd(); alive[6 * (L - 1 - l) + (i % 6)] = alive[i];                       // the central inversion swaps the strands
    }
    record(); paint();
  }

  /* ---------- drawing ---------- */
  let col = {};
  function readColours() {
    const cs = getComputedStyle(document.documentElement), v = n => (cs.getPropertyValue(n) || "").trim() || "#888";
    col = { a: v("--strand-a"), b: v("--strand-b"), vertex: v("--vertex"), mid: v("--midpoint"), line: v("--line"), lineStrong: v("--line-strong"),
            accent: v("--accent"), muted: v("--muted"), ink: v("--ink"), ink2: v("--ink-2"), surface: v("--surface"), surface2: v("--surface-2") };
  }
  readColours();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setClearColor(0x000000, 0);
  const stage = document.createElement("div"); stage.className = "stage"; stage.appendChild(renderer.domElement); host.prepend(stage);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(34, 1, 0.05, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.enablePan = false; controls.enableZoom = false; controls.autoRotate = true; controls.autoRotateSpeed = 0.6;
  renderer.domElement.style.touchAction = "pan-y";
  scene.add(new THREE.AmbientLight(0xffffff, 0.8)); const sun = new THREE.DirectionalLight(0xffffff, 0.8); sun.position.set(3, 5, 4); scene.add(sun);
  const H = (L - 1) * Y, rad = Math.sqrt((H / 2) ** 2 + R * R) + 0.15;
  const dir0 = new THREE.Vector3(Math.sin(0.55) * Math.cos(0.4), Math.sin(0.4), Math.cos(0.55) * Math.cos(0.4));

  const nodeGeo = new THREE.SphereGeometry(1, 20, 14);
  const nodeMeshes = pos.map((p, i) => { const m = new THREE.Mesh(nodeGeo, new THREE.MeshLambertMaterial()); m.position.copy(p); m.userData.i = i; scene.add(m); return m; });
  const lineGeo = new THREE.BufferGeometry();
  const lp = new Float32Array(lines.length * 6), lc = new Float32Array(lines.length * 6);
  lines.forEach(([a, b], k) => { lp.set([pos[a].x, pos[a].y, pos[a].z, pos[b].x, pos[b].y, pos[b].z], k * 6); });
  lineGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3)); lineGeo.setAttribute("color", new THREE.BufferAttribute(lc, 3));
  const lineMesh = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ vertexColors: true })); scene.add(lineMesh);
  const triGeo = [];
  for (let l = 0; l < L; l++) { const g = new THREE.BufferGeometry().setFromPoints([0, 1, 2].map(j => pos[node(l, 0, j)])); const t = new THREE.LineLoop(g, new THREE.LineBasicMaterial({ transparent: true, opacity: 0.35 })); scene.add(t); triGeo.push(t); }
  const hzGeo = new THREE.SphereGeometry(0.045, 14, 10), smGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);
  const hzMeshes = horizon.map(h => { const m = new THREE.Mesh(hzGeo, new THREE.MeshBasicMaterial()); m.position.copy(h.p); scene.add(m); return m; });
  const smMeshes = selfMeet.map(h => { const m = new THREE.Mesh(smGeo, new THREE.MeshBasicMaterial()); m.position.copy(h.p); scene.add(m); return m; });

  const C = c => new THREE.Color(c);
  const litLine = (a, b) => alive[a] === 1 && alive[b] === 1;
  function paint() {
    const cv = C(col.vertex), cm = C(col.mid), cd = C(col.lineStrong), ca = C(col.a), cb = C(col.b), cl = C(col.line);
    nodeMeshes.forEach((m, i) => {
      const on = alive[i] === 1, isV = (i % 6) < 3;
      m.material.color.copy(on ? (isV ? cv : cm) : cd); m.scale.setScalar(on ? 0.075 : 0.032);
    });
    lines.forEach(([a, b, s], k) => { const c = litLine(a, b) ? (s === 0 ? ca : cb) : cl; for (const o of [0, 3]) { lc[k * 6 + o] = c.r; lc[k * 6 + o + 1] = c.g; lc[k * 6 + o + 2] = c.b; } });
    lineGeo.attributes.color.needsUpdate = true;
    triGeo.forEach(t => t.material.color.copy(C(col.lineStrong)));
    let hz = 0, sm = 0;
    horizon.forEach((h, k) => { const on = litLine(h.a[0], h.a[1]) && litLine(h.b[0], h.b[1]); hz += on ? 1 : 0; hzMeshes[k].visible = on; hzMeshes[k].material.color.copy(C(col.accent)); hzMeshes[k].scale.setScalar(on ? 1.6 : 1); });
    selfMeet.forEach((h, k) => { const on = litLine(h.a[0], h.a[1]) && litLine(h.b[0], h.b[1]); sm += on ? 1 : 0; smMeshes[k].visible = on; smMeshes[k].material.color.copy(C(col.muted)); });
    paintFacts(hz, sm); paintStrip(); requestRender();
  }

  function paintStrip() {
    const cvs = $("life-strip"); if (!cvs || !cvs.clientWidth) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cvs.clientWidth, h = cvs.clientHeight;
    if (cvs.width !== Math.round(w * dpr)) { cvs.width = Math.round(w * dpr); cvs.height = Math.round(h * dpr); }
    const ctx = cvs.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
    const pad = 54, rowH = (h - 16) / 13, cell = Math.max(2, Math.min(10, (w - pad - 8) / Math.max(40, history.length)));
    const shown = history.slice(-Math.floor((w - pad - 8) / cell));
    ctx.font = "11px Inter, system-ui, sans-serif"; ctx.fillStyle = col.muted;
    ctx.fillText("strand A", 4, 8 + rowH * 3.3); ctx.fillText("strand B", 4, 8 + rowH * 10.3);
    shown.forEach((g, x) => {
      [0, 1].forEach(s => g[s].forEach((c, t) => {
        if (!c) return;
        const row = s === 0 ? 5 - t : 12 - t;                               // the top layer at the top of each band
        ctx.globalAlpha = c / 3; ctx.fillStyle = s === 0 ? col.a : col.b;
        ctx.fillRect(pad + x * cell, 8 + row * rowH, Math.max(1, cell - 0.5), rowH - 1);
      }));
    });
    ctx.globalAlpha = 1; ctx.strokeStyle = col.line; ctx.beginPath(); ctx.moveTo(pad, 8 + rowH * 6.5); ctx.lineTo(w - 4, 8 + rowH * 6.5); ctx.stroke();
    ctx.fillStyle = col.muted; ctx.textAlign = "right"; ctx.fillText("generations →", w - 6, h - 3); ctx.textAlign = "start";
  }

  const KIND = { void: "dies away", still: "settles into a still form", blinker: "settles into a blinker (period 2)", wave: "becomes a wave of full triads" };
  function paintFacts(hz, sm) {
    const box = $("life-facts"); if (!box) return;
    const f = [0, 1].map(s => forecast(encode(alive, s)));
    const counts = [0, 1].map(s => strandTriads[s].map(b => alive[b] + alive[b + 1] + alive[b + 2]));
    const strandFact = s => {
      const x = f[s], name = s === 0 ? "A" : "B";
      const where = x.steps === 0 ? (x.kind === "wave" ? `is on a wave of period ${x.period}` : x.kind === "void" ? "is empty" : `is ${KIND[x.kind].replace("settles into ", "")}`) :
        `${KIND[x.kind]}${x.kind === "wave" ? ` of period ${x.period}` : ""} in ${x.steps} step${x.steps > 1 ? "s" : ""}`;
      return `<div class="fact"><b>Strand ${name}</b>Triads from bottom to top: <span class="val">${counts[s].join(" ")}</span><br>This strand ${where}.${x.noPast ? " <span class=\"muted\">This state has no past: no earlier state leads to it.</span>" : ""}</div>`;
    };
    box.innerHTML = `
      <div class="fact"><b>Generation ${gen}</b>${acts ? `Last step: ${acts.created} triad${acts.created === 1 ? "" : "s"} filled, ${acts.kept} kept, ${acts.cleared} cleared.` : "Choose a beginning, or click nodes, then run."}<br><span class="muted">A neighbour count of 3 fills a whole triad; 2 keeps it as it is; anything else clears it.</span></div>
      ${strandFact(0)}${strandFact(1)}
      <div class="fact"><b>Where the strands meet</b>Horizon (height ½ of each gap): <span class="val">${hz} of ${horizon.length}</span> lit.<br>Where a strand meets itself (⅓ and ⅔): <span class="val">${sm} of ${selfMeet.length}</span> lit.<br><span class="muted">The strands share no line; they meet only here, when both carry a lit bridge across the same gap.</span></div>`;
  }

  /* ---------- controls ---------- */
  $("life-seeds").addEventListener("click", e => { const b = e.target.closest("button[data-seed]"); if (b) seed(b.dataset.seed); });
  $("life-run").addEventListener("click", () => { running = !running; $("life-run").textContent = running ? "Pause" : "Run"; last = 0; requestRender(); });
  $("life-step").addEventListener("click", () => { running = false; $("life-run").textContent = "Run"; step(); });
  const sp = $("life-speed"); let speed = 3; sp.addEventListener("input", () => { speed = parseInt(sp.value, 10); $("out-life-speed").textContent = String(speed); });
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(); let downAt = null;
  renderer.domElement.addEventListener("pointerdown", e => { downAt = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener("pointerup", e => {
    if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 5) return;
    const r = renderer.domElement.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects(nodeMeshes.map(m => { m.scale.setScalar(Math.max(m.scale.x, 0.07)); m.updateMatrixWorld(true); return m; }))[0];
    if (hit) { const i = hit.object.userData.i; alive[i] = alive[i] ? 0 : 1; if (gen === 0) history.length = 0; record(); }
    paint();
  });
  controls.addEventListener("change", () => requestRender());

  /* ---------- render only while visible ---------- */
  let visible = false, raf = 0, dirty = true, onScreen = false;
  function requestRender() { dirty = true; if (visible && !raf) raf = requestAnimationFrame(loop); }
  function sizeOK() { return stage.clientWidth > 0 && stage.clientHeight > 0; }
  function fit() {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    const vf = THREE.MathUtils.degToRad(camera.fov), hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
    const dist = rad / Math.sin(Math.min(vf, hf) / 2);
    const d = camera.position.lengthSq() > 0 ? camera.position.clone().normalize() : dir0.clone();
    camera.position.copy(d.multiplyScalar(dist)); controls.target.set(0, 0, 0); controls.update(); dirty = true;
  }
  function loop(t) {
    raf = 0; if (!visible || !sizeOK()) return;
    if (running) { if (!last) last = t; if (t - last >= 1000 / speed) { last = t; step(); } }
    const moved = controls.update();
    if (dirty || moved || controls.autoRotate) { renderer.render(scene, camera); dirty = false; }
    raf = requestAnimationFrame(loop);
  }
  function checkVisible() {
    const panel = host.closest(".tab-panel"), mode = host.closest(".cosmos-mode");
    const on = (!panel || panel.classList.contains("active")) && (!mode || mode.classList.contains("active")) && onScreen && sizeOK();
    if (on && !visible) { visible = true; fit(); paintStrip(); requestRender(); } else if (!on) visible = false;
  }
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; checkVisible(); }, { rootMargin: "100px" }).observe(host);
  new ResizeObserver(() => { fit(); checkVisible(); paintStrip(); }).observe(stage);
  for (const ev of ["tabchange", "cosmosmode"]) document.addEventListener(ev, () => setTimeout(checkVisible, 0));
  const retheme = () => { readColours(); paint(); };
  document.addEventListener("themechange", retheme);
  if (window.matchMedia) { const mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", retheme); }

  // the rule on triad counts must equal the rule on the 36 nodes: check once at load
  for (let k = 0; k < 2000; k++) {
    const st = new Uint8Array(36).map(() => (Math.random() < Math.random() ? 1 : 0));
    const save = alive; alive = st;
    const next = new Uint8Array(36);
    for (let i = 0; i < 36; i++) { let n = 0; for (const j of nbr[i]) n += st[j]; next[i] = (n === 3 || (st[i] && n === 2)) ? 1 : 0; }
    alive = save;
    for (const s of [0, 1]) if (encode(next, s) !== succ[encode(st, s)]) { console.warn("6D Life: count rule and node rule disagree"); k = 2000; break; }
  }
  seed("random");
}
