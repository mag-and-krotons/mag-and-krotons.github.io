/* The 6D cosmos: the structure and its behaviour, nothing else.
   Structure. Six layers; each holds a triad of vertices and a triad of midpoints, a midpoint being a vertex moved by -1/2
   (halved and turned half a turn), each layer the one before turned by -1. Bridges join every vertex of a layer to
   every midpoint of the next, and every midpoint to every vertex of the next. Where two bridges cross, they meet: the
   two strands at 1/2 of a gap, a strand with itself at 1/3 and 2/3.
   Six scales. Scale 1 is the structure; every node of scale s is the whole structure within, which is scale s + 1, down
   to scale 6: 36^6 = 2,176,782,336 vertices. A vertex is named by its six digits, one node of the structure at each scale.
   Behaviour. Each node holds a pair, its phase and its current (the rate of its phase). Every bridge and every meeting
   pulls toward the coherence of the triad, (1 + 2 cos d)/3; what one end gains the other loses. The structure within is
   the same in every node of a scale, so six structures of 36, one per scale, carry the 2,176,782,336 vertices, and a
   vertex's phase is the sum of its nodes' phases down the scales. Nothing is put in: see makeCosmos below. */

export const MOVE = -0.5, SCALES = 6, N36 = 36;
export const VERTICES = N36 ** SCALES;                                    // 2,176,782,336
export const COPIES = N36 ** (SCALES - 1);                                // each scale's structure, once for every place in the others

export const unit = (() => {
  const L = 6, R = 1, Y = 0.62;
  const pos = [], layer = [], kind = [];
  for (let l = 0; l < L; l++) {
    const th0 = (l % 2 === 0 ? 1 : -1) * Math.PI / 2;
    for (let kd = 0; kd < 2; kd++) for (let j = 0; j < 3; j++) {
      const th = th0 + 2 * Math.PI * j / 3, s = kd === 0 ? R : MOVE * R;
      pos.push([s * Math.cos(th), (l - (L - 1) / 2) * Y, -s * Math.sin(th)]); layer.push(l); kind.push(kd);
    }
  }
  const n = pos.length, lines = [];
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++)
    if (layer[b] === layer[a] + 1 && kind[a] !== kind[b]) lines.push([a, b]);              // from a layer to the next
  const triads = [];
  for (let l = 0; l < L; l++) for (let kd = 0; kd < 2; kd++) triads.push([...Array(n).keys()].filter(d => layer[d] === l && kind[d] === kd));
  const triadNbr = triads.map(t => triads.map((u, j) => j).filter(j =>
    Math.abs(layer[triads[j][0]] - layer[t[0]]) === 1 && kind[triads[j][0]] !== kind[t[0]]));
  // where two bridges of one gap cross: both run between the same two heights, so they cross at one fraction t of each
  const sub = (u, v) => [u[0] - v[0], u[1] - v[1], u[2] - v[2]], dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const meetings = [];
  for (let x = 0; x < lines.length; x++) for (let y = x + 1; y < lines.length; y++) {
    const [a0, a1] = lines[x], [b0, b1] = lines[y];
    if (layer[a0] !== layer[b0]) continue;
    const d1 = sub(pos[a1], pos[a0]), d2 = sub(pos[b1], pos[b0]), r = sub(pos[a0], pos[b0]);
    const A = dot(d1, d1), B = dot(d1, d2), C = dot(d2, d2), Dd = dot(d1, r), E = dot(d2, r), den = A * C - B * B;
    if (Math.abs(den) < 1e-12) continue;
    const t = (B * E - C * Dd) / den, u = (A * E - B * Dd) / den;
    if (!(t > 1e-7 && t < 1 - 1e-7 && u > 1e-7 && u < 1 - 1e-7)) continue;
    const X = [pos[a0][0] + t * d1[0], pos[a0][1] + t * d1[1], pos[a0][2] + t * d1[2]];
    const Z = [pos[b0][0] + u * d2[0], pos[b0][1] + u * d2[1], pos[b0][2] + u * d2[2]];
    if (Math.hypot(X[0] - Z[0], X[1] - Z[1], X[2] - Z[2]) > 1e-9) continue;
    meetings.push({ a0, a1, b0, b1, t, pos: X });
  }
  const W = meetings.map(m => [[m.b0, 1 - m.t], [m.b1, m.t], [m.a0, -(1 - m.t)], [m.a1, -m.t]]);
  return { n, L, pos, layer, kind, lines, triads, triadNbr, meetings, W };
})();

// The six scales and their flow. Nothing is put in. Every node starts at the turn where it sits: a vertex at its angle,
// a midpoint half a turn on (it is -1/2 times its vertex), each layer -1 times the one before. The scale above, which
// holds the whole, is one heavy node turning at the lightning's rate; it is joined to every node of scale 1, and every
// node of each scale is joined to every node of the structure within it, so what crosses between scales is their sums
// and no scale sees more of another than its sum. The structure within scale 6 is the endless tree, never reached: it
// takes whatever arrives. So the current flows one way, from the scale above down through the six, and is never zero
// everywhere at once.
export const LIGHTNING = 7.0;                    // the current at which a layer turns by itself: between 7.0 and 7.5 (cosmos6d/current)
export const turns = unit.pos.map((u, d) => {
  const l = unit.layer[d], j = d % 3;
  return (l % 2 === 0 ? 1 : -1) * Math.PI / 2 + 2 * Math.PI * j / 3 + Math.PI * unit.kind[d];
});

export function makeCosmos() {
  const n = unit.n, S = SCALES, tri = unit.triads, triN = unit.triadNbr, W = unit.W, Mn = W.length;
  const psi = new Float64Array(S * n), p = new Float64Array(S * n), F = new Float64Array(S * n);
  const light = new Float64Array(S * Mn);                                  // what each meeting exchanges
  const sr = new Float64Array(tri.length), sm = new Float64Array(tri.length), Sre = new Float64Array(S), Sim = new Float64Array(S);
  const M0 = VERTICES;                                                     // the scale above holds every vertex
  const c = { psi, p, light, S, n, Mn, Phi: 0, P0: LIGHTNING * M0, M0, Ein: 0, Eout: 0 };
  let f0 = 0;

  function sums() {
    for (let s = 0; s < S; s++) {
      let re = 0, im = 0;
      for (let d = 0; d < n; d++) { re += Math.cos(psi[s * n + d]); im += Math.sin(psi[s * n + d]); }
      Sre[s] = re; Sim[s] = im;
    }
  }
  function pullScale(s) {
    const o = s * n;
    for (let t = 0; t < tri.length; t++) {
      let re = 0, im = 0;
      for (const d of tri[t]) { re += Math.cos(psi[o + d]); im += Math.sin(psi[o + d]); }
      sr[t] = re; sm[t] = im;
    }
    for (let d = 0; d < n; d++) F[o + d] = 0;
    for (let t = 0; t < tri.length; t++) {
      let re = 0, im = 0;
      for (const q of triN[t]) { re += sr[q]; im += sm[q]; }
      for (const d of tri[t]) F[o + d] += im * Math.cos(psi[o + d]) - re * Math.sin(psi[o + d]);
    }
    for (let g = 0; g < Mn; g++) {
      const w = W[g]; let x = 0;
      for (let q = 0; q < 4; q++) x += w[q][1] * psi[o + w[q][0]];
      const v = Math.sin(x);
      for (let q = 0; q < 4; q++) F[o + w[q][0]] -= w[q][1] * v;
      light[s * Mn + g] = v;
    }
  }
  function pull() {
    sums();
    for (let s = 0; s < S; s++) pullScale(s);
    // the scale above on scale 1, and scale 1 back on it
    const cr = Math.cos(c.Phi), ci = Math.sin(c.Phi);
    for (let d = 0; d < n; d++) F[d] += ci * Math.cos(psi[d]) - cr * Math.sin(psi[d]);
    f0 = Sim[0] * cr - Sre[0] * ci;
    // each scale and the structure within it, joined node to node: what crosses is their sums
    for (let s = 0; s < S - 1; s++) for (const [a, b] of [[s, s + 1], [s + 1, s]]) {
      const o = a * n;
      for (let d = 0; d < n; d++) F[o + d] += (Sim[b] * Math.cos(psi[o + d]) - Sre[b] * Math.sin(psi[o + d])) / n;
    }
  }

  c.step = function (dt, times = 1) {
    for (let r = 0; r < times; r++) {
      for (let i = 0; i < S * n; i++) p[i] += 0.5 * dt * F[i];
      c.P0 += 0.5 * dt * f0;
      let inn = 0; const cr = Math.cos(c.Phi), ci = Math.sin(c.Phi);
      for (let d = 0; d < n; d++) inn += (ci * Math.cos(psi[d]) - cr * Math.sin(psi[d])) * p[d];
      for (let i = 0; i < S * n; i++) psi[i] += dt * p[i];
      c.Phi += dt * c.P0 / M0;
      pull();
      for (let i = 0; i < S * n; i++) p[i] += 0.5 * dt * F[i];
      c.P0 += 0.5 * dt * f0;
      c.Ein += inn * dt;
      // the endless tree within scale 6 takes what arrives
      const o = (S - 1) * n;
      for (let d = 0; d < n; d++) { c.Eout += p[o + d] * p[o + d] * dt; p[o + d] -= dt * p[o + d]; }
    }
  };
  c.reset = function () {
    for (let s = 0; s < S; s++) for (let d = 0; d < n; d++) { psi[s * n + d] = turns[d]; p[s * n + d] = 0; }
    c.Phi = 0; c.P0 = LIGHTNING * M0; c.Ein = 0; c.Eout = 0; pull();
  };
  c.aboveRate = () => c.P0 / M0;

  const P = s => { let a = 0; for (let d = 0; d < n; d++) a += p[s * n + d]; return a; };
  c.current = () => { let a = 0; for (let s = 0; s < S; s++) a += P(s); return a * COPIES; };
  c.scaleCurrent = s => P(s) / n;
  c.energy = function () {                                                 // of the six scales, in one copy of each
    let e = 0;
    for (let i = 0; i < S * n; i++) e += 0.5 * p[i] * p[i];
    for (let s = 0; s < S; s++) {
      const o = s * n;
      for (const [a0, a1] of unit.lines) e -= Math.cos(psi[o + a1] - psi[o + a0]);
      for (let g = 0; g < Mn; g++) { const w = W[g]; let x = 0; for (let q = 0; q < 4; q++) x += w[q][1] * psi[o + w[q][0]]; e -= Math.cos(x); }
    }
    sums();
    e -= Sre[0] * Math.cos(c.Phi) + Sim[0] * Math.sin(c.Phi);
    for (let s = 0; s < S - 1; s++) e -= (Sre[s] * Sre[s + 1] + Sim[s] * Sim[s + 1]) / n;
    return e;
  };
  c.scaleSum = function (s) {
    let re = 0, im = 0;
    for (let d = 0; d < n; d++) { re += Math.cos(psi[s * n + d]); im += Math.sin(psi[s * n + d]); }
    return [re, im];
  };
  c.temperature = s => { const m = P(s) / n; let q = 0; for (let d = 0; d < n; d++) q += (p[s * n + d] - m) ** 2; return q / n; };
  c.gapCurrents = function (s) {
    const out = new Float64Array(5), o = s * n;
    for (const [a0, a1] of unit.lines) out[unit.layer[a0]] += Math.sin(psi[o + a0] - psi[o + a1]);
    return out;
  };

  c.reset();
  return c;
}
