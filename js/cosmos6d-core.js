/* The 6D cosmos: the structure and its behaviour, nothing else.
   Structure. Six layers; each holds a triad of vertices and a triad of midpoints, a midpoint being a vertex moved by -1/2
   (halved and turned half a turn), each layer the one before turned by -1. Bridges join every vertex of a layer to
   every midpoint of the next, and every midpoint to every vertex of the next. Where two bridges cross, they meet: the
   two strands at 1/2 of a gap, a strand with itself at 1/3 and 2/3.
   Six scales. Scale 1 is the structure; every node of scale s is the whole structure within, which is scale s + 1, down
   to scale 6: 36^6 = 2,176,782,336 vertices. A vertex is named by its six digits, one node of the structure at each scale.
   Behaviour. Each vertex holds a pair, its phase and its current (the rate of its phase). Every bridge and every meeting
   at every scale pulls toward the coherence of the triad, (1 + 2 cos d)/3; what one end gains the other loses, so the
   total current and the energy are kept, and the step runs the same backwards as forwards.
   Every pull at scale s depends only on differences between vertices that differ in their scale-s digit, and the current
   put in at one scale depends only on that digit. So the cosmos stays exactly a sum over the scales: the phase of a vertex
   is psi_1(d_1) + ... + psi_6(d_6), and the 2,176,782,336 vertices are carried, without loss, by six structures of 36:
   216 phases and 216 currents. The current is put in once; nothing is touched afterwards. */

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

export function makeCosmos() {
  const n = unit.n, S = SCALES, tri = unit.triads, triN = unit.triadNbr, W = unit.W, Mn = W.length;
  const psi = new Float64Array(S * n), p = new Float64Array(S * n), F = new Float64Array(S * n);
  const light = new Float64Array(S * Mn);                                  // what each meeting exchanges, the same in every copy
  const sr = new Float64Array(tri.length), sm = new Float64Array(tri.length);
  const c = { psi, p, light, putIn: 0, S, n, Mn };

  // the pull on one scale's structure: bridges pass each triad's summed phasor; meetings pull the two crossing lines
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
  function pull() { for (let s = 0; s < S; s++) pullScale(s); }

  c.step = function (dt, times = 1) {
    for (let r = 0; r < times; r++) {
      for (let i = 0; i < S * n; i++) p[i] += 0.5 * dt * F[i];
      for (let i = 0; i < S * n; i++) psi[i] += dt * p[i];
      pull();
      for (let i = 0; i < S * n; i++) p[i] += 0.5 * dt * F[i];
    }
  };
  // put the current into one layer at one scale: every vertex whose digit at that scale lies in that layer
  c.put = function (scale, layer, I) {
    for (let d = 6 * layer; d < 6 * layer + 6; d++) p[scale * n + d] += I;
    c.putIn += I * 6 * COPIES;
  };
  c.reset = function () { psi.fill(0); p.fill(0); c.putIn = 0; pull(); };

  const P = s => { let a = 0; for (let d = 0; d < n; d++) a += p[s * n + d]; return a; };
  c.current = () => { let a = 0; for (let s = 0; s < S; s++) a += P(s); return a * COPIES; };
  c.energy = function () {
    let kin = 0, cross = 0, pot = 0; const Ps = [];
    for (let s = 0; s < S; s++) { Ps.push(P(s)); for (let d = 0; d < n; d++) kin += p[s * n + d] ** 2; }
    for (let s = 0; s < S; s++) for (let t = 0; t < S; t++) if (s !== t) cross += Ps[s] * Ps[t];
    for (let s = 0; s < S; s++) {
      const o = s * n;
      for (const [a0, a1] of unit.lines) pot -= Math.cos(psi[o + a1] - psi[o + a0]);
      for (let g = 0; g < Mn; g++) { const w = W[g]; let x = 0; for (let q = 0; q < 4; q++) x += w[q][1] * psi[o + w[q][0]]; pot -= Math.cos(x); }
    }
    return 0.5 * (kin * COPIES + cross * COPIES / N36) + pot * COPIES;
  };
  // the sum of e^(i psi) over one scale's structure: what a node passes outward of that scale, in every copy
  c.scaleSum = function (s) {
    let re = 0, im = 0;
    for (let d = 0; d < n; d++) { re += Math.cos(psi[s * n + d]); im += Math.sin(psi[s * n + d]); }
    return [re, im];
  };
  // the current crossing each gap of one scale's structure, upward, in each copy
  c.gapCurrents = function (s) {
    const out = new Float64Array(5), o = s * n;
    for (const [a0, a1] of unit.lines) out[unit.layer[a0]] += Math.sin(psi[o + a0] - psi[o + a1]);
    return out;
  };

  pull();
  return c;
}
