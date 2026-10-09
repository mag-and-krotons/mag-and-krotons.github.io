/* The 6D cosmos: the structure and its behaviour, nothing else.
   The structure is six layers. Each layer holds a triad of vertices and a triad of midpoints, and a midpoint is a vertex
   moved by -1/2: halved and turned half a turn. Bridges join the vertices of a layer to the midpoints of the next layer,
   and its midpoints to the next layer's vertices, every node of one triad to every node of the other.
   Nested in itself, every node holds the whole structure again by the same move, so a node of the cosmos is a node at
   every scale at once.
   Behaviour: each triad passes its live count across its bridges. A node adds what it receives at every scale. It comes
   alive on exactly a triad, stays alive on a pair or a triad, and is clear at the next step otherwise. The triad and the
   pair are counted from the structure below, not written in. */

export const MOVE = -0.5;                                   // midpoint = MOVE x vertex
export const HALF = Math.abs(MOVE);

export const unit = (() => {
  const L = 6, R = 1, Y = 0.62;
  const pos = [], layer = [], kind = [];
  for (let l = 0; l < L; l++) {
    const th0 = (l % 2 === 0 ? 1 : -1) * Math.PI / 2;      // each layer turned half a turn from the last
    for (let kd = 0; kd < 2; kd++) for (let j = 0; j < 3; j++) {
      const th = th0 + 2 * Math.PI * j / 3, s = kd === 0 ? R : MOVE * R;
      pos.push([s * Math.cos(th), (l - (L - 1) / 2) * Y, -s * Math.sin(th)]); layer.push(l); kind.push(kd);
    }
  }
  const n = pos.length, nbr = Array.from({ length: n }, () => []);
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++)
    if (Math.abs(layer[a] - layer[b]) === 1 && kind[a] !== kind[b]) nbr[a].push(b);

  // triads: the nodes of one kind in one layer
  const triads = [];
  for (let l = 0; l < L; l++) for (let kd = 0; kd < 2; kd++) triads.push([...Array(n).keys()].filter(d => layer[d] === l && kind[d] === kd));
  const triadOf = new Int8Array(n); triads.forEach((t, i) => t.forEach(d => { triadOf[d] = i; }));
  // a bridge joins all of a triad to all of the next, so what a node receives is the sum of whole triads
  const triadNbr = triads.map(t => [...new Set(nbr[t[0]].map(d => triadOf[d]))]);
  triads.forEach((t, i) => t.forEach(d => {
    const got = new Set(nbr[d]), want = triadNbr[i].flatMap(j => triads[j]);
    if (got.size !== want.length || !want.every(x => got.has(x))) throw new Error("bridge not complete");
  }));

  // strands: the parts of the structure joined by bridges
  const strand = new Int8Array(n).fill(-1); let strands = 0;
  for (let s = 0; s < n; s++) if (strand[s] < 0) {
    const st = [s]; strand[s] = strands;
    while (st.length) { const x = st.pop(); for (const y of nbr[x]) if (strand[y] < 0) { strand[y] = strands; st.push(y); } }
    strands++;
  }
  const triadStrand = triads.map(t => strand[t[0]]);
  return { n, L, pos, layer, kind, nbr, triads, triadNbr, triadStrand, strand, strands };
})();

export const TRIAD = unit.triads[0].length;                 // 3
export const PAIR = unit.strands;                           // 2
export const LINES = unit.nbr.reduce((a, b) => a + b.length, 0) / 2;   // 90

export function makeCosmos(k) {
  const n = unit.n, N = n ** k, stride = Array.from({ length: k }, (_, i) => n ** (k - 1 - i));
  const T = unit.triads.length, tri = unit.triads, triN = unit.triadNbr, triS = unit.triadStrand;
  let cur = new Uint8Array(N), nxt = new Uint8Array(N);
  const cnt = new Uint8Array(N), sum = new Int32Array(T);
  const scales = Array.from({ length: k }, () => ({ still: 0, turning: 0, empty: 0, strand: new Array(unit.strands).fill(0) }));
  const c = { k, N, stride, gen: 0, alive: 0, scales, last: null };

  // every triad at every scale passes its count across its bridges; each node adds what it receives
  function scan() {
    cnt.fill(0);
    for (let i = 0; i < k; i++) {
      const s = stride[i], block = n * s, sc = scales[i];
      sc.still = sc.turning = sc.empty = 0; sc.strand.fill(0);
      for (let hi = 0; hi < N; hi += block) for (let lo = 0; lo < s; lo++) {
        const b = hi + lo;
        for (let t = 0; t < T; t++) {
          const m = tri[t]; let v = 0;
          for (let q = 0; q < m.length; q++) v += cur[b + m[q] * s];
          sum[t] = v;
          if (v === m.length) sc.still++; else if (v) sc.turning++; else sc.empty++;
          sc.strand[triS[t]] += v;
        }
        for (let t = 0; t < T; t++) {
          const nb = triN[t]; let r = 0;
          for (let q = 0; q < nb.length; q++) r += sum[nb[q]];
          if (r) { const m = tri[t]; for (let q = 0; q < m.length; q++) cnt[b + m[q] * s] += r; }
        }
      }
    }
    c.alive = scales[0].strand.reduce((a, b) => a + b, 0);
  }

  c.step = function () {
    let created = 0, kept = 0, cleared = 0;
    for (let x = 0; x < N; x++) {
      const a = cur[x], r = cnt[x], b = (r === TRIAD || (a === 1 && r === PAIR)) ? 1 : 0;
      nxt[x] = b;
      if (b) { if (a) kept++; else created++; } else if (a) cleared++;
    }
    [cur, nxt] = [nxt, cur]; c.gen++; c.last = { created, kept, cleared };
    scan();
  };

  c.begin = function (seed, rand = Math.random) {
    cur.fill(0); c.gen = 0; c.last = null;
    const fine = stride[k - 1];
    if (seed === "half") for (let x = 0; x < N; x++) cur[x] = rand() < HALF ? 1 : 0;
    if (seed === "mean") {                                                                // on average every node receives a triad
      const p = TRIAD / (k * 2 * LINES / n);
      for (let x = 0; x < N; x++) cur[x] = rand() < p ? 1 : 0;
    }
    if (seed === "triad") for (const d of tri[0]) cur[d * fine] = 1;                      // one triad, inside the first node of every scale above
    if (seed === "unit") for (let d = 0; d < n; d++) cur[d * fine] = 1;                   // one whole structure, the same way
    if (seed === "every") {                                                               // the first triad at every scale
      const rec = (i, x) => { if (i === k) { cur[x] = 1; return; } for (const d of tri[0]) rec(i + 1, x + d * stride[i]); };
      rec(0, 0);
    }
    scan();
  };

  c.state = () => cur;
  c.set = arr => { cur.set(arr); c.gen = 0; c.last = null; scan(); };
  c.hash = function () { let h = 2166136261 >>> 0; for (let x = 0; x < N; x++) if (cur[x]) h = Math.imul(h ^ x, 16777619) >>> 0; return h; };
  // a state's key for finding repeats: two independent 32-bit hashes and the count, so a false repeat is out of reach
  c.key = function () {
    let a = 2166136261 >>> 0, b = 0x9e3779b9;
    for (let x = 0; x < N; x++) if (cur[x]) { a = Math.imul(a ^ x, 16777619) >>> 0; b = Math.imul((b ^ Math.imul(x, 0x85ebca6b)) >>> 0, 0xc2b2ae35) >>> 0; b = (b ^ (b >>> 13)) >>> 0; }
    return `${c.alive}:${a}:${b}`;
  };

  // where each node sits: the structure, then the structure again in each node by the move, scale after scale
  c.positions = function () {
    const p = new Float32Array(N * 3);
    for (let x = 0; x < N; x++) {
      let px = 0, py = 0, pz = 0, f = 1;
      for (let i = 0; i < k; i++) {
        const u = unit.pos[Math.floor(x / stride[i]) % n];
        px += f * u[0]; py += Math.abs(f) * u[1]; pz += f * u[2]; f *= MOVE;
      }
      p[x * 3] = px; p[x * 3 + 1] = py; p[x * 3 + 2] = pz;
    }
    return p;
  };
  c.fineKind = x => unit.kind[x % n];

  scan();
  return c;
}
