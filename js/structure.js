/* The medial antiprism — interactive model.
   Construction (Singh, "The Medial Antiprism", 2026): layer i (i = 1..L) is a triangle at height y_i,
   turned by 180° against its neighbours; its side midpoints are −½ × its vertices. Every vertex is joined
   to every midpoint of the neighbouring layers. Strand A uses the vertices of odd layers and the midpoints
   of even layers; strand B the reverse. Every number shown is computed here from the geometry. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const $ = id => document.getElementById(id);
const host = $("structure-viewport");
if (host) init();

function init() {
  const R = 1;
  const state = { L: 6, mode: "side", f: 0.5, rho: 0.5, showA: true, showB: true, showTri: true, showCross: true, showPlanes: false, spin: true, pattern: "none" };

  /* ---------- colours from the page's tokens ---------- */
  let col = {};
  function readColours() {
    const cs = getComputedStyle(document.documentElement);
    const v = n => (cs.getPropertyValue(n) || "").trim() || "#888";
    col = { a: v("--strand-a"), b: v("--strand-b"), vertex: v("--vertex"), mid: v("--midpoint"), ink: v("--ink"), muted: v("--muted"), line: v("--line-strong"), accent: v("--accent"), ok: v("--ok"), neg: v("--neg"), surface: v("--surface") };
  }
  readColours();

  /* ---------- renderer ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  // the drawing area: fills the frame on wide screens, sits above the legend on narrow ones
  const stage = document.createElement("div");
  stage.className = "stage";
  stage.appendChild(renderer.domElement);
  host.prepend(stage);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 200);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotateSpeed = 0.9;
  controls.enablePan = false;
  controls.enableZoom = false;   // the page scrolls over the model; the camera is fitted to it
  renderer.domElement.style.touchAction = "pan-y";   // on phones a vertical swipe scrolls the page, a sideways drag turns the model

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const sun = new THREE.DirectionalLight(0xffffff, 0.9);
  sun.position.set(3, 5, 4);
  scene.add(sun);

  let group = new THREE.Group();
  scene.add(group);

  /* ---------- geometry ---------- */
  function gapHeight(L) { return Math.min(0.6, 3.2 / (L - 1)); }

  function build() {
    const L = state.L, Y = gapHeight(L);
    const layers = [];
    for (let i = 1; i <= L; i++) {
      const th = (i % 2 ? 1 : -1) * Math.PI / 2;
      const V = [0, 1, 2].map(j => [R * Math.cos(th + 2 * Math.PI * j / 3), R * Math.sin(th + 2 * Math.PI * j / 3)]);
      let M;
      if (state.mode === "side") {
        const f = state.f;
        M = [0, 1, 2].map(j => {
          const p = V[(j + 1) % 3], q = V[(j + 2) % 3];
          return [(1 - f) * p[0] + f * q[0], (1 - f) * p[1] + f * q[1]];
        });
      } else {
        M = V.map(p => [-state.rho * p[0], -state.rho * p[1]]);
      }
      const y = (i - (L + 1) / 2) * Y;
      // three.js: the axis is y; the layer plane is (x, z)
      layers.push({
        y,
        V: V.map(p => new THREE.Vector3(p[0], y, -p[1])),
        M: M.map(p => new THREE.Vector3(p[0], y, -p[1]))
      });
    }
    // strand A: vertices of odd layers (index 0, 2, …) and midpoints of even layers
    const gaps = [];
    for (let k = 0; k < L - 1; k++) {
      const lo = layers[k], hi = layers[k + 1];
      const VM = [], MV = [];
      lo.V.forEach(a => hi.M.forEach(b => VM.push([a, b])));
      lo.M.forEach(a => hi.V.forEach(b => MV.push([a, b])));
      gaps.push({ k, y0: lo.y, y1: hi.y, A: k % 2 === 0 ? VM : MV, B: k % 2 === 0 ? MV : VM });
    }
    return { layers, gaps, Y };
  }

  function meet(s, t) {
    const p0 = s[0], d1 = s[1].clone().sub(s[0]);
    const q0 = t[0], d2 = t[1].clone().sub(t[0]);
    const r = p0.clone().sub(q0);
    const a = d1.dot(d1), b = d1.dot(d2), c = d2.dot(d2), d = d1.dot(r), e = d2.dot(r);
    const den = a * c - b * b;
    if (Math.abs(den) < 1e-12) return null;
    const tt = (b * e - c * d) / den, uu = (a * e - b * d) / den;
    const eps = 1e-7;
    if (tt <= eps || tt >= 1 - eps || uu <= eps || uu >= 1 - eps) return null;
    const P = p0.clone().addScaledVector(d1, tt), Q = q0.clone().addScaledVector(d2, uu);
    return P.distanceTo(Q) < 1e-6 ? P : null;
  }

  function crossings(g) {
    const ab = [], aa = [], bb = [];
    g.A.forEach(s => g.B.forEach(t => { const P = meet(s, t); if (P) ab.push(P); }));
    for (let i = 0; i < g.A.length; i++) for (let j = i + 1; j < g.A.length; j++) { const P = meet(g.A[i], g.A[j]); if (P) aa.push(P); }
    for (let i = 0; i < g.B.length; i++) for (let j = i + 1; j < g.B.length; j++) { const P = meet(g.B[i], g.B[j]); if (P) bb.push(P); }
    return { ab, aa, bb };
  }

  /* ---------- drawing ---------- */
  const unitY = new THREE.Vector3(0, 1, 0);
  function tube(a, b, radius, mat) {
    const dir = b.clone().sub(a), len = dir.length();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 8, 1, true), mat);
    m.position.copy(a).addScaledVector(dir, 0.5);
    m.quaternion.setFromUnitVectors(unitY, dir.normalize());
    return m;
  }

  let model = null, cross = [], nodeMeshes = { A: [], B: [] }, halos = [];

  function disposeGroup(g) {
    g.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose());
    });
  }

  function rebuild() {
    readColours();
    scene.remove(group); disposeGroup(group);
    group = new THREE.Group(); scene.add(group);
    model = build();
    cross = model.gaps.map(crossings);
    nodeMeshes = { A: [], B: [] }; halos = [];

    const matA = new THREE.MeshLambertMaterial({ color: col.a });
    const matB = new THREE.MeshLambertMaterial({ color: col.b });
    const matV = new THREE.MeshLambertMaterial({ color: col.vertex });
    const matM = new THREE.MeshLambertMaterial({ color: col.mid });
    const nodeGeo = new THREE.SphereGeometry(0.045, 20, 14);

    if (state.showA || state.showB) {
      model.gaps.forEach(g => {
        if (state.showA) g.A.forEach(s => group.add(tube(s[0], s[1], 0.008, matA)));
        if (state.showB) g.B.forEach(s => group.add(tube(s[0], s[1], 0.008, matB)));
      });
    }

    model.layers.forEach((ly, k) => {
      const aUsesV = k % 2 === 0;
      ly.V.forEach(p => { const m = new THREE.Mesh(nodeGeo, matV); m.position.copy(p); group.add(m); (aUsesV ? nodeMeshes.A : nodeMeshes.B).push({ k, p }); });
      ly.M.forEach(p => { const m = new THREE.Mesh(nodeGeo, matM); m.position.copy(p); group.add(m); (aUsesV ? nodeMeshes.B : nodeMeshes.A).push({ k, p }); });
      if (state.showTri) {
        const tri = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ly.V), new THREE.LineBasicMaterial({ color: col.line }));
        group.add(tri);
      }
    });

    if (state.showCross) {
      const mAB = new THREE.MeshLambertMaterial({ color: col.ink });
      const mSelf = new THREE.MeshLambertMaterial({ color: col.muted });
      const gAB = new THREE.SphereGeometry(0.03, 16, 10), gSelf = new THREE.BoxGeometry(0.045, 0.045, 0.045);
      cross.forEach(c => {
        c.ab.forEach(P => { const m = new THREE.Mesh(gAB, mAB); m.position.copy(P); group.add(m); });
        c.aa.concat(c.bb).forEach(P => { const m = new THREE.Mesh(gSelf, mSelf); m.position.copy(P); group.add(m); });
      });
    }

    if (state.showPlanes) {
      // a light ring through every crossing height: the horizon (A meets B) in the accent colour,
      // the planes where a strand meets itself in grey
      const ringPts = [];
      for (let t = 0; t <= 96; t++) { const a = 2 * Math.PI * t / 96; ringPts.push(new THREE.Vector3(1.08 * R * Math.cos(a), 0, 1.08 * R * Math.sin(a))); }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      const discGeo = new THREE.CircleGeometry(1.08 * R, 64);
      const add = (y, colour, fillOpacity) => {
        const ring = new THREE.Line(ringGeo, new THREE.LineBasicMaterial({ color: colour, transparent: true, opacity: 0.7 }));
        ring.position.y = y; group.add(ring);
        const disc = new THREE.Mesh(discGeo, new THREE.MeshBasicMaterial({ color: colour, transparent: true, opacity: fillOpacity, side: THREE.DoubleSide, depthWrite: false }));
        disc.rotation.x = -Math.PI / 2; disc.position.y = y; group.add(disc);
      };
      const meetY = new Set(), selfY = new Set();
      cross.forEach(c => {
        c.ab.forEach(P => meetY.add(P.y.toFixed(5)));
        c.aa.concat(c.bb).forEach(P => selfY.add(P.y.toFixed(5)));
      });
      meetY.forEach(h => add(parseFloat(h), col.accent, 0.06));
      selfY.forEach(h => { if (!meetY.has(h)) add(parseFloat(h), col.muted, 0.025); });
    }

    // halos for the pattern demo, one per node of strand A
    const haloGeo = new THREE.SphereGeometry(1, 20, 14);
    nodeMeshes.A.forEach(n => {
      const m = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({ color: col.ok, transparent: true, opacity: 0.35, depthWrite: false }));
      m.position.copy(n.p); m.visible = false; group.add(m);
      halos.push({ k: n.k, mesh: m });
    });

    fitCamera();
    renderFacts();
    resetPattern();
    requestRender();
  }

  let camFitted = false;
  function fitCamera() {
    // keep the whole model in view for any frame shape: fit its bounding sphere
    const H = (state.L - 1) * model.Y;
    const r = Math.sqrt((H / 2) * (H / 2) + R * R) + 0.12;
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * camera.aspect);
    const dist = r / Math.sin(Math.min(vfov, hfov) / 2);
    let dir;
    if (!camFitted) {
      const el = THREE.MathUtils.degToRad(24), az = THREE.MathUtils.degToRad(32);
      dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
      camFitted = true;
    } else {
      dir = camera.position.clone().sub(controls.target).normalize();
    }
    controls.target.set(0, 0, 0);
    camera.position.copy(dir.multiplyScalar(dist));
    camera.updateProjectionMatrix();
    controls.update();
  }

  /* ---------- pattern passed down strand A ---------- */
  const PATTERNS = {
    still: [1, 1, 1],
    turning: [1, -0.5, -0.5],
    mixed: [1, 0, 0]
  };
  let patternValues = [], patternStep = 0, patternClock = 0;

  function resetPattern() {
    halos.forEach(h => (h.mesh.visible = false));
    patternValues = []; patternStep = 0; patternClock = 0;
    if (state.pattern === "none") { setPatternNote(); return; }
    let x = PATTERNS[state.pattern].slice();
    for (let k = 0; k < state.L; k++) {
      patternValues.push(x);
      const s = x[0] + x[1] + x[2];
      x = [s, s, s];        // J = I + C + C²: every node of the next layer receives the sum
    }
    setPatternNote();
  }

  function fmt(v) {
    if (Math.abs(v) < 1e-12) return "0";
    if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
    if (Math.abs(v * 2 - Math.round(v * 2)) < 1e-9) return (v < 0 ? "−" : "") + Math.abs(Math.round(v * 2)) + "/2";
    return v.toFixed(2);
  }

  function setPatternNote() {
    const el = $("pattern-note");
    if (!el) return;
    if (state.pattern === "none") {
      el.textContent = "Each bridge passes only the sum of a level: the still pattern survives, a turning pattern is erased at the first step.";
      return;
    }
    const rows = patternValues.slice(0, Math.min(4, patternValues.length)).map((x, k) => `${k === 0 ? "top layer" : "next"}: (${x.map(fmt).join(", ")})`);
    const say = {
      still: "The still pattern is kept and multiplied by 3 at every step.",
      turning: "The values sum to zero, so the next layer receives nothing: the turning pattern is erased in one step.",
      mixed: "One node lit is a still part plus two turning parts. The turning parts are erased and the still part, the average, goes on."
    }[state.pattern];
    el.textContent = say + " " + rows.join(" → ") + (patternValues.length > 4 ? " → …" : "") + " Green halo: a positive value; red halo: a negative one.";
  }

  function updateHalos(dt) {
    if (state.pattern === "none" || !halos.length) return;
    patternClock += dt;
    const per = 0.85, pause = 1.6;
    const total = state.L * per + pause;
    if (patternClock > total) patternClock -= total;
    const upto = Math.min(state.L - 1, Math.floor(patternClock / per));
    const byLayer = {};
    halos.forEach(h => { (byLayer[h.k] = byLayer[h.k] || []).push(h); });
    // strand A, layer k: index j of its three nodes follows the order built above
    for (let k = 0; k < state.L; k++) {
      const step = state.L - 1 - k;          // the pattern enters at the top layer
      const hs = byLayer[k] || [], vals = patternValues[step] || [0, 0, 0];
      const maxAbs = Math.max(...vals.map(Math.abs));
      hs.forEach((h, j) => {
        const v = vals[j];
        const on = step <= upto && Math.abs(v) > 1e-12;
        h.mesh.visible = on;
        if (on) {
          const s = 0.06 + 0.1 * Math.abs(v) / maxAbs;
          h.mesh.scale.setScalar(s);
          h.mesh.material.color.set(v > 0 ? col.ok : col.neg);
          h.mesh.material.opacity = step === upto ? 0.55 : 0.3;
        }
      });
    }
  }

  /* ---------- facts ---------- */
  const FRAC = [[1 / 3, "\\tfrac13"], [1 / 2, "\\tfrac12"], [2 / 3, "\\tfrac23"], [1 / 4, "\\tfrac14"], [3 / 4, "\\tfrac34"]];
  function niceFrac(x) {
    for (const [v, s] of FRAC) if (Math.abs(x - v) < 5e-5) return s;
    return x.toFixed(2);
  }
  function niceRadius(r) {
    const known = [[Math.sqrt(3) / 4, "\\tfrac{\\sqrt3}{4}R"], [1 / 3, "\\tfrac13R"], [2 / 3, "\\tfrac23R"], [1 / 2, "\\tfrac12R"], [1 / Math.sqrt(3), "\\tfrac{1}{\\sqrt3}R"], [Math.sqrt(3) / 2, "\\tfrac{\\sqrt3}{2}R"]];
    for (const [v, s] of known) if (Math.abs(r - v) < 5e-5) return s;
    return r.toFixed(3) + "R";
  }
  function summarise(points, g) {
    // heights as fractions of the gap, measured from the lower layer
    const by = new Map();
    points.forEach(P => {
      const h = (P.y - g.y0) / (g.y1 - g.y0);
      const key = h.toFixed(4);
      const e = by.get(key) || { h, n: 0, r: Math.hypot(P.x, P.z) };
      e.n++; by.set(key, e);
    });
    return Array.from(by.values()).sort((a, b) => a.h - b.h);
  }

  function renderFacts() {
    const box = $("structure-facts");
    if (!box) return;
    const L = state.L, g0 = model.gaps[0], c0 = cross[0];
    const ab = summarise(c0.ab, g0), aa = summarise(c0.aa, g0), bb = summarise(c0.bb, g0);
    const place = state.mode === "side"
      ? `midpoint nodes at fraction $f=${state.f.toFixed(2)}$ of their sides`
      : `midpoint nodes on their rays at radius $\\rho R$, $\\rho=${state.rho.toFixed(2)}$`;

    const listMeet = arr => arr.length ? arr.map(e => `${e.n} at height $${niceFrac(e.h)}$, radius $${niceRadius(e.r)}$`).join("; ") : "none";
    const abText = ab.length
      ? `${c0.ab.length} meetings: ${listMeet(ab)}.`
      : `None. The two strands pass each other without meeting.`;
    const selfText = (aa.length || bb.length)
      ? `Strand A: ${c0.aa.length ? listMeet(aa) : "none"}. Strand B: ${c0.bb.length ? listMeet(bb) : "none"}.`
      : "None. Neither strand crosses itself.";

    let placementNote = "";
    if (state.mode === "side") {
      placementNote = Math.abs(state.f - 0.5) < 1e-9
        ? "At the midpoints every meeting lies on one plane, the horizon at $\\tfrac12$."
        : `Moving the nodes to $f$ moves the meetings to $f$ and $1-f$. Only at $f=\\tfrac12$ do they come together on the horizon.`;
    } else {
      placementNote = "On the ray, the strands meet only at $\\rho=\\tfrac12$, $1$ and $2$; elsewhere they pass without meeting.";
    }

    const routes = Math.pow(3, L);
    const even = L % 2 === 0;

    box.innerHTML = `
      <div class="fact"><b>Nodes and lines</b>
        $${6 * L}$ nodes and $${18 * (L - 1)}$ lines in $${L - 1}$ gaps. Each gap holds two bridges of nine lines, one for each strand. The two strands share every layer and no line.</div>
      <div class="fact"><b>Where the two strands meet</b>
        In each gap, with ${place}: ${abText} <span class="muted">${placementNote}</span></div>
      <div class="fact"><b>Where a strand crosses itself</b>
        In the first gap: ${selfText} <span class="muted">In the next gap the two strands trade heights.</span></div>
      <div class="fact"><b>One step between layers</b>
        Every node is joined to all three nodes of the next layer, so a step passes only the sum: $J=I+C+C^2$, with eigenvalue $3$ on the still pattern and $0$ on the two turning patterns.</div>
      <div class="fact"><b>Routes along a strand</b>
        $3^{${L}}=${routes.toLocaleString("en-GB")}$ routes from top to bottom: $3$ keep their angle, $3$ always turn by $+120^\\circ$, $3$ by $-120^\\circ$, and $${(routes - 9).toLocaleString("en-GB")}$ are mixed.</div>
      <div class="fact"><b>A bridge as a graph</b>
        Each bridge is $K_{3,3}$, with adjacency spectrum $\\{3,0,0,0,0,-3\\}$. In its Ihara variable $s$ the still pattern sits at $s=1$ and the four turning states on $\\operatorname{Re}s=\\tfrac12$.</div>
      <div class="fact wide"><div class="ring-wrap">${ringSVG(L)}
        <div><b>Closing the stack into a ring</b>
        Join the last layer to the first. ${even
          ? `With $L=${L}$ even, the two strands stay two: each closes on itself after one circuit.`
          : `With $L=${L}$ odd, the two strands join into one, which returns to its start only after two circuits.`}
        <span class="muted">Change $L$ to see the other case.</span></div></div></div>`;
    if (window.triggerMathRendering) window.triggerMathRendering(box);
  }

  function ringSVG(L) {
    const cx = 75, cy = 75, rIn = 38, rOut = 62;
    const pos = (k, outer) => {
      const t = -Math.PI / 2 + 2 * Math.PI * k / L;
      const r = outer ? rOut : rIn;
      return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
    };
    // strand A: vertex (inner) at even k, midpoint (outer) at odd k; B the reverse
    const path = (startOuter, steps) => {
      const pts = [];
      for (let s = 0; s <= steps; s++) {
        const k = s % L;
        const outer = ((s % 2 === 0) === !startOuter) ? false : true;
        pts.push(pos(k, outer));
      }
      return pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
    };
    const even = L % 2 === 0;
    let lines;
    if (even) {
      lines = `<polyline points="${path(false, L)}" fill="none" stroke="${col.a}" stroke-width="1.8"/>` +
              `<polyline points="${path(true, L)}" fill="none" stroke="${col.b}" stroke-width="1.8"/>`;
    } else {
      lines = `<polyline points="${path(false, 2 * L)}" fill="none" stroke="${col.a}" stroke-width="1.8"/>`;
    }
    let dots = "";
    for (let k = 0; k < L; k++) {
      const [x1, y1] = pos(k, false), [x2, y2] = pos(k, true);
      dots += `<circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="3.2" fill="${col.vertex}"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="3.2" fill="${col.mid}"/>`;
    }
    return `<svg class="ring-svg" viewBox="0 0 150 150" role="img" aria-label="Ring of ${L} layers">${lines}${dots}</svg>`;
  }

  /* ---------- controls ---------- */
  const bindRange = (id, out, key, digits) => {
    const el = $(id), o = $(out);
    if (!el) return;
    el.addEventListener("input", () => {
      state[key] = digits ? parseFloat(el.value) : parseInt(el.value, 10);
      if (o) o.textContent = digits ? state[key].toFixed(digits) : String(state[key]);
      rebuild();
    });
  };
  bindRange("ctl-layers", "out-layers", "L", 0);
  bindRange("ctl-f", "out-f", "f", 2);
  bindRange("ctl-rho", "out-rho", "rho", 2);

  const seg = (id, key, after) => {
    const box = $(id);
    if (!box) return;
    box.addEventListener("click", e => {
      const b = e.target.closest("button[data-v]");
      if (!b) return;
      box.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      state[key] = b.dataset.v;
      if (after) after();
      rebuild();
    });
  };
  seg("ctl-placement", "mode", () => {
    $("row-f").style.display = state.mode === "side" ? "" : "none";
    $("row-rho").style.display = state.mode === "radial" ? "" : "none";
  });
  seg("ctl-pattern", "pattern");

  const check = (id, key) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("change", () => { state[key] = el.checked; if (key === "spin") { controls.autoRotate = el.checked; requestRender(); } else rebuild(); });
  };
  check("show-a", "showA"); check("show-b", "showB"); check("show-tri", "showTri");
  check("show-cross", "showCross"); check("show-planes", "showPlanes"); check("show-spin", "spin");

  const reset = $("ctl-reset");
  if (reset) reset.addEventListener("click", () => {
    state.mode = "side"; state.f = 0.5; state.rho = 0.5;
    $("ctl-f").value = 0.5; $("out-f").textContent = "0.50";
    $("ctl-rho").value = 0.5; $("out-rho").textContent = "0.50";
    $("ctl-placement").querySelectorAll("button").forEach(x => x.classList.toggle("active", x.dataset.v === "side"));
    $("row-f").style.display = ""; $("row-rho").style.display = "none";
    rebuild();
  });

  controls.autoRotate = state.spin;
  controls.addEventListener("change", requestRender);

  /* ---------- render only while visible ---------- */
  let visible = false, running = false, last = 0, needsRender = true;
  function requestRender() { needsRender = true; if (visible && !running) loop(); }

  function sizeOK() {
    const w = stage.clientWidth, h = stage.clientHeight;
    return w > 0 && h > 0;
  }
  function resize() {
    if (!sizeOK()) return;
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (model) fitCamera();
    requestRender();
  }

  function loop(t) {
    if (!visible || !sizeOK()) { running = false; return; }
    running = true;
    const now = (t || performance.now()) / 1000;
    const dt = last ? Math.min(0.1, now - last) : 0;
    last = now;
    const moving = controls.update();
    updateHalos(dt);
    if (needsRender || moving || state.spin || state.pattern !== "none") {
      renderer.render(scene, camera);
      needsRender = false;
    }
    requestAnimationFrame(loop);
  }

  function checkVisible() {
    const panel = host.closest(".tab-panel");
    const panelOn = !panel || panel.classList.contains("active");
    const nowVisible = panelOn && onScreen && sizeOK();
    if (nowVisible && !visible) { visible = true; last = 0; resize(); requestRender(); }
    else if (!nowVisible) { visible = false; }
  }

  let onScreen = false;
  new IntersectionObserver(entries => { onScreen = entries[0].isIntersecting; checkVisible(); }, { rootMargin: "100px" }).observe(host);
  new ResizeObserver(() => { resize(); checkVisible(); }).observe(stage);
  document.addEventListener("tabchange", () => setTimeout(checkVisible, 0));
  document.addEventListener("themechange", () => rebuild());
  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) mq.addEventListener("change", () => rebuild());
  }

  rebuild();
}
