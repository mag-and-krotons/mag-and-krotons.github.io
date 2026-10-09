/* Game of Cosmos — two games, each run only on rules taken from a paper.
   World of clocks:  Singh, "Nothing Binds a Twin but Exclusion" (2026).
   Triad spins:      Singh, "The Medial Antiprism" (2026), section "The Axis as Time".
   Every number shown is counted or computed here, as the game runs. */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  if (!$("clocks-canvas")) return;

  /* ---------- shared ---------- */
  function tokens() {
    const cs = getComputedStyle(document.documentElement);
    const v = n => (cs.getPropertyValue(n) || "").trim() || "#888";
    return { accent: v("--accent"), muted: v("--muted"), surface: v("--surface"), surface2: v("--surface-2"),
      line: v("--line"), lineStrong: v("--line-strong"), ink: v("--ink"), ink2: v("--ink-2"), ok: v("--ok"), neg: v("--neg"),
      a: v("--strand-a"), b: v("--strand-b"), vertex: v("--vertex"), mid: v("--midpoint") };
  }
  let T = tokens();
  const math = el => { if (window.triggerMathRendering) window.triggerMathRendering(el); };
  const fmtInt = n => n.toLocaleString("en-GB");

  function fitCanvas(canvas) {
    const stage = canvas.parentElement;
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function isPanelVisible(el) {
    const panel = el.closest(".tab-panel"), mode = el.closest(".cosmos-mode");
    return (!panel || panel.classList.contains("active")) && (!mode || mode.classList.contains("active"));
  }

  /* =====================================================================
     1. WORLD OF CLOCKS
     A centre k carries the pair (6k-1, 6k+1). The clock p >= 5 marks k when
     p | 6k-1 (k = r_p mod p, the lower member) or p | 6k+1 (k = -r_p, the upper),
     where r_p = 6^{-1} mod p. A centre no clock marks is a full zero.
     ===================================================================== */
  const CLOCK_PRIMES = [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  const WINDOW = 360;
  const clock = { n: 1, view: "window", colours: true, twins: false, playing: null };

  const inv6 = p => { for (let r = 1; r < p; r++) if ((6 * r) % p === 1) return r; return 0; };
  const R = {}; CLOCK_PRIMES.forEach(p => (R[p] = inv6(p)));
  const isPrime = n => { if (n < 2) return false; if (n % 2 === 0) return n === 2; if (n % 3 === 0) return n === 3; for (let i = 5; i * i <= n; i += 6) if (n % i === 0 || n % (i + 2) === 0) return false; return true; };

  function clockColour(i) {
    // calm, distinct hues for the clocks, in the order they are added
    const hues = [212, 28, 152, 330, 262, 188, 48, 0, 104, 290, 230, 12, 170];
    const dark = document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    return `hsl(${hues[i % hues.length]} ${dark ? 45 : 50}% ${dark ? 42 : 72}%)`;
  }

  // which clock (index) marks the lower / upper member of centre k; -1 if none
  function marks(k, clocks) {
    let lo = -1, up = -1;
    for (let i = 0; i < clocks.length; i++) {
      const p = clocks[i], r = ((k % p) + p) % p;
      if (lo < 0 && r === R[p]) lo = i;
      if (up < 0 && r === p - R[p]) up = i;
    }
    return [lo, up];
  }

  function clocksNow() { return CLOCK_PRIMES.slice(0, clock.n); }

  function reachOf(clocks) {
    const P = clocks[clocks.length - 1], Pn = CLOCK_PRIMES[clocks.length] || nextPrime(P);
    // centres with 6k-1 > P and 6k+1 < P'^2
    const kmin = Math.floor((P + 1) / 6) + 1, kmax = Math.ceil((Pn * Pn - 1) / 6) - 1;
    return { P, Pn, kmin, kmax };
  }
  function nextPrime(n) { let m = n + 1; while (!isPrime(m)) m++; return m; }

  function drawClocks() {
    const canvas = $("clocks-canvas");
    if (!isPanelVisible(canvas)) return;
    const fit = fitCanvas(canvas); if (!fit) return;
    const { ctx, w, h } = fit;
    const clocks = clocksNow(), reach = reachOf(clocks);
    ctx.clearRect(0, 0, w, h);
    const legendH = canvas.closest(".viewport").querySelector(".legend").offsetParent && getComputedStyle(canvas.closest(".viewport").querySelector(".legend")).position === "absolute" ? 44 : 0;
    const top = 34, left = 14, availW = w - 28, availH = h - top - 14 - legendH;

    if (clock.view === "window") {
      const N = WINDOW;
      let cols = 24;
      while (cols < 60 && Math.floor(availW / cols) * Math.ceil(N / cols) > availH) cols += 1;
      const cell = Math.max(6, Math.min(Math.floor(availW / cols), Math.floor(availH / Math.ceil(N / cols))));
      const ox = left + Math.floor((availW - cols * cell) / 2);
      geom = { mode: "window", cols, cell, ox, oy: top, N };
      for (let k = 1; k <= N; k++) {
        const c = (k - 1) % cols, r = Math.floor((k - 1) / cols);
        const x = ox + c * cell, y = top + r * cell, s = cell - 2, half = s / 2;
        const [lo, up] = marks(k, clocks);
        if (lo < 0 && up < 0) {
          const inReach = k >= reach.kmin && k <= reach.kmax;
          ctx.fillStyle = (k * 6 - 1 <= reach.P) ? T.surface2 : (inReach ? T.accent : T.muted);
          ctx.fillRect(x, y, s, s);
        } else {
          ctx.fillStyle = lo >= 0 ? (clock.colours ? clockColour(lo) : T.lineStrong) : T.surface;
          ctx.fillRect(x, y, half, s);
          ctx.fillStyle = up >= 0 ? (clock.colours ? clockColour(up) : T.lineStrong) : T.surface;
          ctx.fillRect(x + half, y, s - half, s);
          ctx.strokeStyle = T.line; ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1);
        }
        if (clock.twins && isPrime(6 * k - 1) && isPrime(6 * k + 1)) {
          ctx.fillStyle = T.ink;
          ctx.beginPath(); ctx.arc(x + s / 2, y + s / 2, Math.max(1.6, s * 0.13), 0, 2 * Math.PI); ctx.fill();
        }
      }
    } else {
      const Q = clocks.reduce((a, p) => a * p, 1);
      if (Q > 400000) {
        geom = null;
        ctx.fillStyle = T.ink2; ctx.font = "14px Inter, system-ui, sans-serif";
        ctx.fillText(`One turn at level ${reach.P} has ${fmtInt(Q)} centres: too many to draw.`, left, top + 20);
        ctx.fillText("Remove clocks to see a whole turn.", left, top + 42);
        return;
      }
      let cols = Math.ceil(Math.sqrt(Q * availW / availH));
      let cell = Math.max(0.5, Math.min(availW / cols, availH / Math.ceil(Q / cols)));
      const rows = Math.ceil(Q / cols);
      const ox = left + (availW - cols * cell) / 2;
      geom = { mode: "turn", cols, cell, ox, oy: top, N: Q };
      ctx.fillStyle = T.surface2;
      ctx.fillRect(ox, top, cols * cell, rows * cell);
      for (let k = 0; k < Q; k++) {
        const [lo, up] = marks(k, clocks);
        if (lo >= 0 || up >= 0) continue;
        ctx.fillStyle = T.accent;
        const c = k % cols, r = Math.floor(k / cols);
        ctx.fillRect(ox + c * cell, top + r * cell, Math.max(cell, 1), Math.max(cell, 1));
      }
    }
  }
  let geom = null;

  function centreAt(px, py) {
    if (!geom) return null;
    const c = Math.floor((px - geom.ox) / geom.cell), r = Math.floor((py - geom.oy) / geom.cell);
    if (c < 0 || c >= geom.cols || r < 0) return null;
    const k = (geom.mode === "window" ? 1 : 0) + r * geom.cols + c;
    return k <= geom.N - (geom.mode === "window" ? 0 : 1) ? k : null;
  }

  function factorText(n, clocks) {
    const hit = clocks.filter(p => n % p === 0);
    return hit.length ? `${fmtInt(n)}, marked by ${hit.join(" and ")}` : `${fmtInt(n)}, unmarked`;
  }

  function hoverClocks(e) {
    const canvas = $("clocks-canvas"), rect = canvas.getBoundingClientRect();
    const k = centreAt(e.clientX - rect.left, e.clientY - rect.top);
    const out = $("clocks-hover");
    if (k == null) { out.textContent = "Point at a cell to read it"; return; }
    const clocks = clocksNow(), reach = reachOf(clocks);
    const [lo, up] = marks(k, clocks);
    let verdict = "";
    if (lo < 0 && up < 0) {
      const tw = isPrime(6 * k - 1) && isPrime(6 * k + 1);
      if (6 * k - 1 <= reach.P) verdict = " · below the clocks";
      else if (k <= reach.kmax) verdict = " · in the reach: a twin prime pair";
      else verdict = tw ? " · beyond the reach; a twin prime pair" : " · beyond the reach; not a twin pair";
    }
    out.textContent = `k = ${k}: ${factorText(6 * k - 1, clocks)}; ${factorText(6 * k + 1, clocks)}${verdict}`;
  }

  /* exact counts for the facts panel */
  const countCache = new Map();
  function turnCounts(clocks) {
    const key = clocks.join(",");
    if (countCache.has(key)) return countCache.get(key);
    const Q = clocks.reduce((a, p) => a * p, 1);
    let res = { Q, enumerated: false };
    if (Q <= 1.2e7) {
      const zero = new Uint8Array(Q);
      const byJ = new Array(clocks.length + 1).fill(0);
      let full = 0, sign = 0, palindrome = true;
      // number of clocks marking each centre, by residues (fast: walk each clock's two classes)
      const hits = new Uint8Array(Q);
      clocks.forEach(p => {
        for (let k = R[p]; k < Q; k += p) hits[k]++;
        for (let k = p - R[p]; k < Q; k += p) hits[k]++;
      });
      for (let k = 0; k < Q; k++) {
        const j = hits[k]; byJ[j]++; sign += (j % 2 ? -1 : 1);
        if (j === 0) { full++; zero[k] = 1; }
      }
      for (let k = 1; k < Q && palindrome; k++) if (zero[k] !== zero[Q - k]) palindrome = false;
      if (zero[0] !== 1) palindrome = palindrome && true;
      res = { Q, enumerated: true, full, byJ, sign, palindrome, zero };
    }
    countCache.set(key, res);
    return res;
  }

  function polyMarking(clocks) {
    let c = [1];
    clocks.forEach(p => {
      const n = new Array(c.length + 1).fill(0);
      c.forEach((v, i) => { n[i] += v * (p - 2); n[i + 1] += v * 2; });
      c = n;
    });
    return c;
  }

  function renderClockFacts() {
    const box = $("clocks-facts"); if (!box) return;
    const clocks = clocksNow(), reach = reachOf(clocks);
    const prod = clocks.reduce((a, p) => a * (p - 2), 1);
    const prod4 = clocks.reduce((a, p) => a * (p - 4), 1);
    const tc = turnCounts(clocks);
    const ok = b => b ? `<span class="ok">✓</span>` : `<span style="color:var(--neg)">✗</span>`;

    // the reach: unmarked centres there, and twin prime pairs there, counted separately
    let unmarked = 0, twins = 0;
    for (let k = reach.kmin; k <= reach.kmax; k++) {
      const [lo, up] = marks(k, clocks);
      if (lo < 0 && up < 0) unmarked++;
      if (isPrime(6 * k - 1) && isPrime(6 * k + 1)) twins++;
    }

    // copies: the next clock's classes
    let copiesText = "";
    const Pn = reach.Pn;
    if (tc.enumerated && tc.Q * Pn <= 1.2e7) {
      const next = clocks.concat([Pn]);
      const tn = turnCounts(next);
      const byClass = new Array(Pn).fill(0);
      for (let k = 0; k < tn.Q; k++) if (tn.zero[k]) byClass[k % Pn]++;
      const filled = byClass.filter(v => v > 0), empty = byClass.filter(v => v === 0).length;
      const allSame = filled.every(v => v === tc.full);
      copiesText = `Counted: of the $${Pn}$ classes of centres modulo $${Pn}$ at level $${Pn}$, $${filled.length}$ hold exactly $${fmtInt(tc.full)}$ full zeros each and $${empty}$ hold none ${ok(allSame && filled.length === Pn - 2 && empty === 2)}.`;
    } else {
      copiesText = `The next turn is too long to count here; the theorem gives $${Pn}-2=${Pn - 2}$ copies and $2$ empty classes.`;
    }

    const poly = polyMarking(clocks);
    const lawOK = tc.enumerated && poly.every((v, j) => v === tc.byJ[j]);
    const E = clocks.reduce((a, p) => a * (1 - 1 / ((p - 1) * (p - 1))), 1);

    box.innerHTML = `
      <div class="fact"><b>The clocks</b>
        Level $P=${reach.P}$: the clocks ${clocks.join(", ")}. Each clock $p$ marks two classes of centres, $k\\equiv r_p$ and $k\\equiv-r_p \\pmod p$ with $r_p=6^{-1}\\bmod p$: here ${clocks.map(p => `$r_{${p}}=${R[p]}$`).join(", ")}. The two marks differ, so a clock marks one member of a pair and then not the other.</div>
      <div class="fact"><b>Full zeros in a turn</b>
        The pattern repeats every $Q_P=${fmtInt(tc.Q)}$ centres. Theorem: each turn holds $\\prod(p-2)=${fmtInt(prod)}$ full zeros.
        ${tc.enumerated ? `Counted: $${fmtInt(tc.full)}$ ${ok(tc.full === prod)}. Palindrome $Z_P=-Z_P$ ${ok(tc.palindrome)}.` : "The turn is too long to count here."}</div>
      <div class="fact"><b>The step builds the world from copies</b>
        Adding the clock $${Pn}$ lifts each full zero to $${Pn}$ centres, of which the new clock marks exactly two. ${copiesText}</div>
      <div class="fact"><b>Marking law and copy sign</b>
        Centres marked by exactly $j$ clocks: the coefficients of $\\prod\\bigl((p-2)+2x\\bigr)$, that is ${poly.map(fmtInt).join(", ")}${tc.enumerated ? ` ${ok(lawOK)}` : ""}. The copy sign sums to $\\prod(p-4)=${fmtInt(prod4)}$${tc.enumerated ? ` ${ok(tc.sign === prod4)}` : ""}.</div>
      <div class="fact"><b>The reach</b>
        Centres with $6k-1>${reach.P}$ and $6k+1<${reach.Pn}^2$, that is $${reach.kmin}\\le k\\le${reach.kmax}$. There a full zero is exactly a twin prime pair. Unmarked: $${unmarked}$. Twin prime pairs, found by trial division: $${twins}$ ${ok(unmarked === twins)}.</div>
      <div class="fact"><b>The exclusion product</b>
        The share of full zeros against the product of the members' shares: $\\prod_{5\\le p\\le ${reach.P}}\\bigl(1-(p-1)^{-2}\\bigr)=${E.toFixed(6)}$. Over all clocks it tends to $E=0.880215\\ldots$, and $\\tfrac34E=C_2$, the twin constant.</div>`;
    math(box);
  }

  function renderChips() {
    const box = $("clock-chips"); if (!box) return;
    box.innerHTML = clocksNow().map((p, i) => `<span class="chip"><i style="background:${clockColour(i)}"></i>${p}</span>`).join("");
    $("clock-add").disabled = clock.n >= CLOCK_PRIMES.length;
    $("clock-remove").disabled = clock.n <= 1;
    const turnBtn = document.querySelector('#clock-view button[data-v="turn"]');
    const Q = clocksNow().reduce((a, p) => a * p, 1);
    if (turnBtn) turnBtn.title = Q > 400000 ? "Too many centres to draw at this level" : "";
  }

  function updateClocks() { renderChips(); drawClocks(); renderClockFacts(); }

  function initClocks() {
    $("clock-add").addEventListener("click", () => { if (clock.n < CLOCK_PRIMES.length) { clock.n++; updateClocks(); } });
    $("clock-remove").addEventListener("click", () => { if (clock.n > 1) { clock.n--; updateClocks(); } });
    $("clock-reset").addEventListener("click", () => { stopPlay(); clock.n = 1; updateClocks(); });
    $("clock-play").addEventListener("click", () => {
      if (clock.playing) { stopPlay(); return; }
      if (clock.n >= CLOCK_PRIMES.length) clock.n = 1;
      $("clock-play").textContent = "Stop";
      updateClocks();
      clock.playing = setInterval(() => {
        if (clock.n >= CLOCK_PRIMES.length) { stopPlay(); return; }
        clock.n++; updateClocks();
      }, 1400);
    });
    $("clock-view").addEventListener("click", e => {
      const b = e.target.closest("button[data-v]"); if (!b) return;
      $("clock-view").querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      clock.view = b.dataset.v;
      // in a whole turn every unmarked centre is drawn alike; the reach is read in the window
      $("leg-a").textContent = clock.view === "turn" ? "unmarked: a full zero (the turn reads the same backwards)" : "unmarked, in the reach: twin primes";
      $("leg-b-wrap").style.display = clock.view === "turn" ? "none" : "";
      drawClocks();
    });
    $("clock-colours").addEventListener("change", e => { clock.colours = e.target.checked; drawClocks(); });
    $("clock-twins").addEventListener("change", e => { clock.twins = e.target.checked; drawClocks(); });
    const canvas = $("clocks-canvas");
    canvas.addEventListener("mousemove", hoverClocks);
    canvas.addEventListener("click", hoverClocks);
    canvas.addEventListener("mouseleave", () => { $("clocks-hover").textContent = "Point at a cell to read it"; });
    new ResizeObserver(drawClocks).observe(canvas.parentElement);
    updateClocks();
  }
  function stopPlay() { if (clock.playing) clearInterval(clock.playing); clock.playing = null; $("clock-play").textContent = "Play"; }

  /* =====================================================================
     2. TRIAD SPINS ON A STRAND
     A spin s in {-1,0,1} on every node of a strand; every line couples its ends by e^{kappa s s'}.
     A bridge joins all three nodes of a level to all three of the next, so its weight is
     e^{kappa S S'} with S, S' the level sums, and T_kappa = (sqrt(m(S)m(S')) e^{kappa S S'}),
     m = (1,3,6,7,6,3,1).
     ===================================================================== */
  const SV = [-3, -2, -1, 0, 1, 2, 3], MULT = [1, 3, 6, 7, 6, 3, 1];
  const spin = { L: 8, kappa: 0.41, s: [], running: true, sweeps: 0, corr: null, corr0: 0, raf: 0, last: 0 };

  function randomSpins() { spin.s = Array.from({ length: spin.L }, () => [0, 1, 2].map(() => Math.floor(Math.random() * 3) - 1)); }
  const levelSum = l => spin.s[l][0] + spin.s[l][1] + spin.s[l][2];

  function sweep() {
    const L = spin.L, k = spin.kappa;
    for (let n = 0; n < 3 * L; n++) {
      const l = Math.floor(Math.random() * L), i = Math.floor(Math.random() * 3);
      const h = k * ((l > 0 ? levelSum(l - 1) : 0) + (l < L - 1 ? levelSum(l + 1) : 0));
      // heat bath: P(s) proportional to e^{s h}, s in {-1, 0, 1}
      const wm = Math.exp(-h), w0 = 1, wp = Math.exp(h), u = Math.random() * (wm + w0 + wp);
      spin.s[l][i] = u < wm ? -1 : (u < wm + w0 ? 0 : 1);
    }
    spin.sweeps++;
    const S = spin.s.map((_, l) => levelSum(l));
    for (let d = 0; d < L; d++) {
      let acc = 0;
      for (let l = 0; l + d < L; l++) acc += S[l] * S[l + d];
      spin.corr[d] += acc / (L - d);
    }
  }

  function resetCount() { spin.sweeps = 0; spin.corr = new Array(spin.L).fill(0); }

  /* exact: the open strand of L levels */
  function exactCorrelations(L, k) {
    const E = SV.map(a => SV.map(b => Math.exp(k * a * b)));
    const step = v => SV.map((_, j) => MULT[j] * SV.reduce((acc, _, i) => acc + v[i] * E[i][j], 0));
    const norm = v => { const s = v.reduce((a, b) => a + Math.abs(b), 0) || 1; return { v: v.map(x => x / s), s }; };
    // left vectors a_l (weight of levels 1..l with S_l = S), stored normalised with log scale
    const left = [], leftLog = [];
    let a = MULT.slice(), lg = 0;
    for (let l = 0; l < L; l++) {
      if (l > 0) a = step(a);
      const n = norm(a); a = n.v; lg += Math.log(n.s); left.push(a); leftLog.push(lg);
    }
    // right vectors b_l (weight of levels l+1..L given S_l = S)
    const right = new Array(L), rightLog = new Array(L);
    let b = SV.map(() => 1), rg = 0;
    right[L - 1] = b; rightLog[L - 1] = 0;
    for (let l = L - 2; l >= 0; l--) {
      b = SV.map((_, i) => SV.reduce((acc, _, j) => acc + E[i][j] * MULT[j] * b[j], 0));
      const n = norm(b); b = n.v; rg += Math.log(n.s); right[l] = b; rightLog[l] = rg;
    }
    const Zat = l => left[l].reduce((acc, x, i) => acc + x * right[l][i], 0);
    const C = new Array(L).fill(0);
    for (let d = 0; d < L; d++) {
      let acc = 0;
      for (let l = 0; l + d < L; l++) {
        // <S_l S_{l+d}> = sum a_l(S) S G(S -> S') S' b_{l+d}(S') / Z
        let v = left[l].map((x, i) => x * SV[i]), vlog = 0;
        for (let t = 0; t < d; t++) { v = step(v); const n = norm(v); v = n.v; vlog += Math.log(n.s); }
        const num = v.reduce((s2, x, j) => s2 + x * SV[j] * right[l + d][j], 0);
        // both numerator and Z carry the same left/right scales except the propagation logs
        const Zl = Zat(l + d);
        // Z at level l+d uses left[l+d] whose log scale is leftLog[l+d]; the numerator's is leftLog[l] + vlog
        acc += num / Zl * Math.exp(leftLog[l] + vlog - leftLog[l + d]);
      }
      C[d] = acc / (L - d);
    }
    return C;
  }

  /* eigenvalues of the symmetric 7x7 transfer matrix (Jacobi rotations) */
  function symEigen(A) {
    const n = A.length, a = A.map(r => r.slice());
    for (let sweepN = 0; sweepN < 100; sweepN++) {
      let off = 0;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += a[p][q] * a[p][q];
      if (off < 1e-26) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(a[p][q]) < 1e-300) continue;
        const th = (a[q][q] - a[p][p]) / (2 * a[p][q]);
        const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const akp = a[k][p], akq = a[k][q]; a[k][p] = c * akp - s * akq; a[k][q] = s * akp + c * akq; }
        for (let k = 0; k < n; k++) { const apk = a[p][k], aqk = a[q][k]; a[p][k] = c * apk - s * aqk; a[q][k] = s * apk + c * aqk; }
      }
    }
    return a.map((r, i) => r[i]);
  }
  function mass(k) {
    const Tm = SV.map((a, i) => SV.map((b, j) => Math.sqrt(MULT[i] * MULT[j]) * Math.exp(k * a * b)));
    const ev = symEigen(Tm).map(Math.abs).sort((x, y) => y - x);
    return { m: Math.log(ev[0] / ev[1]), l0: ev[0], l1: ev[1] };
  }

  /* Lee-Yang: zeros of z^{3L} Z_A(z; kappa), Z_A = sum prod m(S_l) z^{S_l} prod e^{kappa S_l S_{l+1}} */
  function partitionPoly(L, k) {
    const E = SV.map(a => SV.map(b => Math.exp(k * a * b)));
    let P = SV.map((s, i) => { const c = new Array(7).fill(0); c[s + 3] = MULT[i]; return c; });
    let scaleLog = 0;
    for (let l = 1; l < L; l++) {
      const len = P[0].length + 6;
      const nxt = SV.map((s, j) => {
        const acc = new Array(len).fill(0);
        for (let i = 0; i < 7; i++) for (let t = 0; t < P[i].length; t++) acc[t + s + 3] += P[i][t] * E[i][j] * MULT[j];
        return acc;
      });
      let mx = 0; nxt.forEach(c => c.forEach(x => { if (Math.abs(x) > mx) mx = Math.abs(x); }));
      P = nxt.map(c => c.map(x => x / mx)); scaleLog += Math.log(mx);
    }
    const tot = new Array(P[0].length).fill(0);
    P.forEach(c => c.forEach((x, t) => (tot[t] += x)));
    return tot; // tot[t] is the coefficient of z^t
  }

  // Aberth–Ehrlich iteration for all roots of sum c[t] z^t
  function polyRoots(c) {
    let n = c.length - 1;
    while (n > 0 && Math.abs(c[n]) < 1e-300) n--;
    const a = c.slice(0, n + 1);
    const ev = (z) => { // value and derivative by Horner, complex
      let pr = a[n], pi = 0, dr = 0, di = 0;
      for (let t = n - 1; t >= 0; t--) {
        const ndr = dr * z[0] - di * z[1] + pr, ndi = dr * z[1] + di * z[0] + pi;
        dr = ndr; di = ndi;
        const npr = pr * z[0] - pi * z[1] + a[t], npi = pr * z[1] + pi * z[0];
        pr = npr; pi = npi;
      }
      return [pr, pi, dr, di];
    };
    const rad = Math.pow(Math.abs(a[0] / a[n]), 1 / n) || 1;
    let z = Array.from({ length: n }, (_, i) => { const t = 2 * Math.PI * (i + 0.25) / n + 0.4; return [rad * Math.cos(t), rad * Math.sin(t)]; });
    for (let it = 0; it < 500; it++) {
      let moved = 0;
      for (let i = 0; i < n; i++) {
        const [pr, pi, dr, di] = ev(z[i]);
        const dd = dr * dr + di * di; if (dd === 0) continue;
        const qr = (pr * dr + pi * di) / dd, qi = (pi * dr - pr * di) / dd; // p/p'
        let sr = 0, si = 0;
        for (let j = 0; j < n; j++) if (j !== i) {
          const xr = z[i][0] - z[j][0], xi = z[i][1] - z[j][1], xx = xr * xr + xi * xi || 1e-300;
          sr += xr / xx; si += -xi / xx;
        }
        // w = q / (1 - q * s)
        const den_r = 1 - (qr * sr - qi * si), den_i = -(qr * si + qi * sr), dn = den_r * den_r + den_i * den_i || 1e-300;
        const wr = (qr * den_r + qi * den_i) / dn, wi = (qi * den_r - qr * den_i) / dn;
        z[i] = [z[i][0] - wr, z[i][1] - wi];
        moved = Math.max(moved, Math.hypot(wr, wi) / (1 + Math.hypot(z[i][0], z[i][1])));
      }
      if (moved < 1e-14) break;
    }
    return z;
  }

  /* For kappa >= 0 every zero lies on the unit circle (Newman's theorem). There Z(e^{i theta}) is real,
     so the zeros are found as sign changes of Z along the circle, evaluated through the transfer matrix,
     which stays accurate where the zeros crowd together. For kappa < 0 the zeros leave the circle;
     they are then well separated and found from the coefficients. */
  function zOnCircle(L, k, theta) {
    const E = SV.map(a => SV.map(b => Math.exp(k * a * b)));
    let vr = SV.map((s, i) => MULT[i] * Math.cos(s * theta)), vi = SV.map((s, i) => MULT[i] * Math.sin(s * theta));
    for (let l = 1; l < L; l++) {
      const nr = new Array(7), ni = new Array(7);
      for (let j = 0; j < 7; j++) {
        let ar = 0, ai = 0;
        for (let i = 0; i < 7; i++) { ar += vr[i] * E[i][j]; ai += vi[i] * E[i][j]; }
        const c = Math.cos(SV[j] * theta) * MULT[j], s = Math.sin(SV[j] * theta) * MULT[j];
        nr[j] = ar * c - ai * s; ni[j] = ar * s + ai * c;
      }
      let mx = 0; for (let j = 0; j < 7; j++) mx = Math.max(mx, Math.abs(nr[j]), Math.abs(ni[j]));
      vr = nr.map(x => x / mx); vi = ni.map(x => x / mx);
    }
    return vr.reduce((a, x) => a + x, 0);
  }
  function circleZeros(L, k) {
    const N = 4000 * L, angles = [];
    let t0 = 1e-9, f0 = zOnCircle(L, k, t0);
    for (let n = 1; n <= N; n++) {
      const t1 = Math.PI * n / N - (n === N ? 1e-9 : 0), f1 = zOnCircle(L, k, t1);
      if (f0 === 0) angles.push(t0);
      else if (f0 * f1 < 0) {
        let lo = t0, hi = t1, flo = f0;
        for (let it = 0; it < 60; it++) { const mid = (lo + hi) / 2, fm = zOnCircle(L, k, mid); if (flo * fm <= 0) hi = mid; else { lo = mid; flo = fm; } }
        angles.push((lo + hi) / 2);
      }
      t0 = t1; f0 = f1;
    }
    const zeros = [];
    angles.forEach(t => { zeros.push([Math.cos(t), Math.sin(t)]); zeros.push([Math.cos(t), -Math.sin(t)]); });
    return zeros;
  }

  let lyCache = { key: "", zeros: [] };
  function leeYang() {
    const neg = spin.kappa < 0;
    const L = neg ? Math.min(spin.L, 8) : spin.L, key = L + ":" + spin.kappa.toFixed(2);
    if (lyCache.key !== key) {
      const zeros = neg ? polyRoots(partitionPoly(L, spin.kappa)) : circleZeros(L, spin.kappa);
      lyCache = { key, L, neg, zeros, expected: 6 * L };
    }
    return lyCache;
  }

  function drawLeeYang() {
    const svg = $("ly-svg"); if (!svg) return;
    const ly = leeYang();
    const onCircle = ly.zeros.filter(z => Math.abs(Math.hypot(z[0], z[1]) - 1) < 1e-6).length;
    const maxMod = Math.max(...ly.zeros.map(z => Math.hypot(z[0], z[1])));
    const clip = r => Math.min(r, 1.55);
    let dots = "";
    const pts = (!ly.neg && spin.kappa === 0) ? [[-0.5, Math.sqrt(3) / 2], [-0.5, -Math.sqrt(3) / 2]] : ly.zeros;
    pts.forEach(z => {
      const r = Math.hypot(z[0], z[1]), on = Math.abs(r - 1) < 1e-6, f = clip(r) / r;
      dots += `<circle cx="${(z[0] * f).toFixed(4)}" cy="${(-z[1] * f).toFixed(4)}" r="0.045" fill="${on ? T.accent : T.neg}"/>`;
    });
    const third = a => `<line x1="0" y1="0" x2="${Math.cos(a).toFixed(4)}" y2="${(-Math.sin(a)).toFixed(4)}" stroke="${T.line}" stroke-width="0.012" stroke-dasharray="0.04 0.04"/>`;
    svg.innerHTML = `<circle cx="0" cy="0" r="1" fill="none" stroke="${T.lineStrong}" stroke-width="0.015"/>
      ${third(2 * Math.PI / 3)}${third(-2 * Math.PI / 3)}
      <line x1="-1.6" y1="0" x2="1.6" y2="0" stroke="${T.line}" stroke-width="0.01"/>${dots}`;
    const n = ly.expected;
    let text;
    if (ly.neg) {
      text = `The ${n} zeros of $z^{${3 * ly.L}}Z_A(z;\\kappa)$ for a strand of $${ly.L}$ levels${spin.L > 8 ? " (computed up to $8$ levels)" : ""}: <b>${onCircle}</b> on the unit circle; the largest modulus is $${maxMod.toFixed(maxMod < 10 ? 3 : 1)}$.`;
    } else if (ly.zeros.length === n) {
      text = `All <b>${n}</b> zeros of $z^{${3 * ly.L}}Z_A(z;\\kappa)$ for a strand of $${ly.L}$ levels found on the unit circle, as Newman's theorem requires for $\\kappa\\ge0$.`;
    } else if (spin.kappa === 0) {
      text = `At $\\kappa=0$, $Z_A=(z^{-1}+1+z)^{${3 * ly.L}}$: all ${n} zeros sit at one third and two thirds of a turn, ${3 * ly.L} at each.`;
    } else {
      text = `${ly.zeros.length} of the ${n} zeros resolved on the unit circle; the rest crowd too closely near the thirds to separate in double precision. The theorem places all of them on the circle for $\\kappa\\ge0$.`;
    }
    $("ly-note").innerHTML = text + ` Dashed: one third and two thirds of a turn, where every zero sits at $\\kappa=0$.`;
    math($("ly-note"));
  }

  function drawSpins() {
    const canvas = $("spins-canvas");
    if (!isPanelVisible(canvas)) return;
    const fit = fitCanvas(canvas); if (!fit) return;
    const { ctx, w, h } = fit;
    ctx.clearRect(0, 0, w, h);
    const L = spin.L;
    const legendAbs = getComputedStyle(canvas.closest(".viewport").querySelector(".legend")).position === "absolute";
    const bottomPad = legendAbs ? 52 : 14;
    const padX = 34, top = 34;
    const gx = (w - 2 * padX) / Math.max(1, L - 1);
    const nodesH = (h - top - bottomPad) * 0.52;
    const ny = i => top + nodesH * (0.12 + 0.38 * i);
    const xs = l => padX + gx * l;
    // lines of each bridge: every node joined to all three of the next level
    ctx.strokeStyle = T.line; ctx.lineWidth = 1;
    for (let l = 0; l < L - 1; l++) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      ctx.beginPath(); ctx.moveTo(xs(l), ny(i)); ctx.lineTo(xs(l + 1), ny(j)); ctx.stroke();
    }
    const r = Math.max(5, Math.min(11, gx * 0.16));
    for (let l = 0; l < L; l++) for (let i = 0; i < 3; i++) {
      const s = spin.s[l][i];
      ctx.beginPath(); ctx.arc(xs(l), ny(i), r, 0, 2 * Math.PI);
      if (s === 0) { ctx.fillStyle = T.surface; ctx.fill(); ctx.strokeStyle = T.muted; ctx.lineWidth = 1.5; ctx.stroke(); }
      else { ctx.fillStyle = s > 0 ? T.ok : T.neg; ctx.fill(); }
    }
    // level sums as bars about a zero line
    const barTop = top + nodesH + 18, barH = h - bottomPad - barTop;
    const zeroY = barTop + barH / 2, unit = barH / 7;
    ctx.strokeStyle = T.lineStrong; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padX - 16, zeroY + 0.5); ctx.lineTo(w - padX + 16, zeroY + 0.5); ctx.stroke();
    ctx.fillStyle = T.muted; ctx.font = "11px Inter, system-ui, sans-serif";
    ctx.fillText("S", 6, zeroY + 4);
    for (let l = 0; l < L; l++) {
      const S = levelSum(l), bw = Math.max(6, Math.min(22, gx * 0.32));
      ctx.fillStyle = T.accent;
      ctx.fillRect(xs(l) - bw / 2, S >= 0 ? zeroY - S * unit : zeroY, bw, Math.abs(S) * unit);
      ctx.fillStyle = T.ink2; ctx.textAlign = "center";
      ctx.fillText(String(S), xs(l), S >= 0 ? zeroY - S * unit - 4 : zeroY - S * unit + 12);
      ctx.textAlign = "start";
    }
  }

  let factsTimer = 0;
  function renderSpinFacts(force) {
    const box = $("spins-facts"); if (!box) return;
    const now = performance.now();
    if (!force && now - factsTimer < 700) return;
    factsTimer = now;
    const k = spin.kappa, ms = mass(k), L = spin.L;
    const exact = exactCorrelations(L, k);
    const meas = spin.corr.map(x => x / Math.max(1, spin.sweeps));
    const rows = exact.slice(0, Math.min(L, 7)).map((c, d) =>
      `<tr><td>$${d}$</td><td>${spin.sweeps ? meas[d].toFixed(3) : "–"}</td><td>${c.toFixed(3)}</td></tr>`).join("");
    const known = [[0.1, "1.5879"], [Math.log(1.5), "0.083717"], [Math.log(2), "3.84\\times10^{-4}"]];
    const xi = isFinite(ms.m) && ms.m > 0 ? (1 / ms.m) : Infinity;
    box.innerHTML = `
      <div class="fact"><b>The transfer along the axis</b>
        A bridge joins the three nodes of a level to all three of the next, so its weight is $e^{\\kappa SS'}$, with $S,S'$ the level sums. The transfer matrix is $7\\times7$, with $m(S)=(1,3,6,7,6,3,1)$. Inside a level the spins can rearrange freely as long as $S$ stays: the turning patterns are confined to their level.</div>
      <div class="fact"><b>The gap at this coupling</b>
        $\\kappa=${k.toFixed(2)}$: $\\lambda_0=${ms.l0.toPrecision(6)}$, $|\\lambda_1|=${ms.l1.toPrecision(6)}$, so the mass is $m(\\kappa)=\\log(\\lambda_0/|\\lambda_1|)=${isFinite(ms.m) ? ms.m.toPrecision(5) : "\\infty"}$${isFinite(xi) ? ` and order fades along the axis over about $${xi < 100 ? xi.toFixed(1) : xi.toExponential(1)}$ levels` : ""}. The paper gives $m(0.1)=1.5879$, $m(\\log\\tfrac32)=0.083717$ and $m(\\log2)=3.84\\times10^{-4}$: the gap closes only as $\\kappa\\to\\infty$.</div>
      <div class="fact"><b>Measured against exact</b>
        $\\langle S_\\ell S_{\\ell+d}\\rangle$ along a strand of $${L}$ levels, averaged over $\\ell$: measured over ${fmtInt(spin.sweeps)} sweeps, and exact from the transfer matrix.
        <div class="table-wrap"><table class="matrix-table" style="margin-top:6px"><thead><tr><th>$d$</th><th>measured</th><th>exact</th></tr></thead><tbody>${rows}</tbody></table></div></div>
      <div class="fact"><b>Zeros and the thirds</b>
        For every $\\kappa\\ge0$ the zeros of the strand in the fugacity lie on the unit circle (Newman's theorem: the uniform triad has transform $1+2\\cosh h$). At $\\kappa=0$ they all sit at one third and two thirds of a turn. For $\\kappa<0$ they leave the circle. A probe coupled to the total spin has coherence $Z(e^{-2i\\lambda t})/Z(1)$, so these zeros are the times at which it decoheres completely (the argument of the paper on Riemann's kernel as a quantum state).</div>`;
    math(box);
  }

  function spinLoop(t) {
    spin.raf = 0;
    const canvas = $("spins-canvas");
    if (!isPanelVisible(canvas) || !canvas.parentElement.clientWidth) return;
    if (spin.running) {
      const dt = spin.last ? Math.min(0.1, (t - spin.last) / 1000) : 0.016;
      const n = Math.max(1, Math.round(dt * 240));
      for (let i = 0; i < n; i++) sweep();
      spin.last = t;
    }
    drawSpins();
    renderSpinFacts(false);
    spin.raf = requestAnimationFrame(spinLoop);
  }
  function startSpins() { if (!spin.raf) { spin.last = 0; spin.raf = requestAnimationFrame(spinLoop); } }

  function initSpins() {
    const kap = $("spin-kappa"), lay = $("spin-layers");
    kap.addEventListener("input", () => { spin.kappa = parseFloat(kap.value); $("out-kappa").textContent = spin.kappa.toFixed(2); resetCount(); drawLeeYang(); renderSpinFacts(true); });
    lay.addEventListener("input", () => { spin.L = parseInt(lay.value, 10); $("out-spin-layers").textContent = String(spin.L); randomSpins(); resetCount(); drawLeeYang(); renderSpinFacts(true); drawSpins(); });
    $("spin-play").addEventListener("click", () => { spin.running = !spin.running; $("spin-play").textContent = spin.running ? "Pause" : "Run"; startSpins(); });
    $("spin-shake").addEventListener("click", () => { randomSpins(); resetCount(); drawSpins(); });
    $("spin-reset").addEventListener("click", () => { resetCount(); renderSpinFacts(true); });
    randomSpins(); resetCount();
    new ResizeObserver(() => { drawSpins(); }).observe($("spins-canvas").parentElement);
  }

  /* ---------- mode switch, visibility, theme ---------- */
  function setMode(m) {
    document.querySelectorAll("#cosmos-mode button").forEach(b => b.classList.toggle("active", b.dataset.v === m));
    document.querySelectorAll(".cosmos-mode").forEach(p => p.classList.toggle("active", p.dataset.mode === m));
    if (m === "clocks") { stopSpinsIfHidden(); requestAnimationFrame(updateClocks); }
    else { requestAnimationFrame(() => { drawLeeYang(); renderSpinFacts(true); startSpins(); }); }
  }
  function stopSpinsIfHidden() { if (spin.raf && !isPanelVisible($("spins-canvas"))) { cancelAnimationFrame(spin.raf); spin.raf = 0; } }

  function onShown() {
    const m = document.querySelector("#cosmos-mode button.active");
    if (!m) return;
    if (m.dataset.v === "clocks") updateClocks(); else { drawLeeYang(); renderSpinFacts(true); startSpins(); }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initClocks(); initSpins();
    $("cosmos-mode").addEventListener("click", e => { const b = e.target.closest("button[data-v]"); if (b) setMode(b.dataset.v); });
    document.addEventListener("tabchange", e => { if (e.detail && e.detail.group === "structure") { if (e.detail.name === "cosmos") requestAnimationFrame(onShown); else stopSpinsIfHidden(); } });
    const retheme = () => { T = tokens(); lyCache.key = ""; onShown(); renderChips(); };
    document.addEventListener("themechange", retheme);
    if (window.matchMedia) { const mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", retheme); }
    if (isPanelVisible($("clocks-canvas"))) onShown();
  });
})();
