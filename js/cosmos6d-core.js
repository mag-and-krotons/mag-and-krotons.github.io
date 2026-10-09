/* The 6D cosmos: the structure and its behaviour, nothing else.
   Structure. Six layers; each holds a triad of vertices and a triad of midpoints, a midpoint being a vertex moved by -1/2
   (halved and turned half a turn). Bridges join every vertex of a layer to every midpoint of the next, and every
   midpoint to every vertex of the next. Where two bridges cross, they meet: the two strands at 1/2 of a gap, a strand
   with itself at 1/3 and 2/3. Nested in itself, every node holds the whole structure again by the same move, so a node
   of the cosmos is a node at every level at once.
   Behaviour. Each node holds a pair, its phase and its current (the rate of its phase). Every bridge and every meeting
   pulls toward the coherence of the triad, (1 + 2 cos d)/3, and the pull changes the currents: what one end gains the
   other loses, so the total current is kept, and so is the energy. The step runs the same backwards as forwards, so
   there is no arrow of time in it and no clock: the only turning is the phases' own.
   The current is put in once; nothing is touched afterwards. */

export const MOVE = -0.5;

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
  // the phase difference of the two crossing lines at the meeting point, as weights on the four ends
  const W = meetings.map(m => [[m.b0, 1 - m.t], [m.b1, m.t], [m.a0, -(1 - m.t)], [m.a1, -m.t]]);
  return { n, L, pos, layer, kind, lines, triads, triadNbr, meetings, W };
})();

export function makeCosmos(k) {
  const n = unit.n, N = n ** k, stride = Array.from({ length: k }, (_, i) => n ** (k - 1 - i));
  const tri = unit.triads, triN = unit.triadNbr, W = unit.W, Mn = W.length, T = tri.length;
  const th = new Float64Array(N), p = new Float64Array(N), F = new Float64Array(N);
  const co = new Float64Array(N), si = new Float64Array(N), sr = new Float64Array(T), sm = new Float64Array(T);
  const meetN = k * Mn * (N / n), light = new Float32Array(meetN);       // what each meeting point exchanges
  const c = { k, N, stride, th, p, light, meetN, putIn: 0 };

  function pull() {
    F.fill(0);
    for (let x = 0; x < N; x++) { co[x] = Math.cos(th[x]); si[x] = Math.sin(th[x]); }
    let mi = 0;
    for (let i = 0; i < k; i++) {
      const s = stride[i], block = n * s;
      for (let hi = 0; hi < N; hi += block) for (let lo = 0; lo < s; lo++) {
        const b = hi + lo;
        for (let t = 0; t < T; t++) {                                     // each triad's summed phasor: all that crosses a bridge
          const m = tri[t]; let re = 0, im = 0;
          for (let q = 0; q < 3; q++) { const x = b + m[q] * s; re += co[x]; im += si[x]; }
          sr[t] = re; sm[t] = im;
        }
        for (let t = 0; t < T; t++) {
          const nb = triN[t]; let re = 0, im = 0;
          for (let q = 0; q < nb.length; q++) { re += sr[nb[q]]; im += sm[nb[q]]; }
          const m = tri[t];
          for (let q = 0; q < 3; q++) { const x = b + m[q] * s; F[x] += im * co[x] - re * si[x]; }
        }
        for (let g = 0; g < Mn; g++) {                                    // the meetings
          const w = W[g]; let d = 0;
          for (let q = 0; q < 4; q++) d += w[q][1] * th[b + w[q][0] * s];
          const v = Math.sin(d);
          for (let q = 0; q < 4; q++) F[b + w[q][0] * s] -= w[q][1] * v;
          light[mi++] = v;
        }
      }
    }
  }
  c.step = function (dt, times = 1) {
    for (let r = 0; r < times; r++) {
      for (let x = 0; x < N; x++) p[x] += 0.5 * dt * F[x];
      for (let x = 0; x < N; x++) th[x] += dt * p[x];
      pull();
      for (let x = 0; x < N; x++) p[x] += 0.5 * dt * F[x];
    }
  };
  c.put = function (nodes, I) { for (const x of nodes) { p[x] += I; c.putIn += I; } };
  c.current = () => { let s = 0; for (let x = 0; x < N; x++) s += p[x]; return s; };
  c.energy = function () {
    let e = 0;
    for (let x = 0; x < N; x++) e += 0.5 * p[x] * p[x];
    for (let i = 0; i < k; i++) {
      const s = stride[i], block = n * s;
      for (let hi = 0; hi < N; hi += block) for (let lo = 0; lo < s; lo++) {
        const b = hi + lo;
        for (const [a0, a1] of unit.lines) e -= Math.cos(th[b + a1 * s] - th[b + a0 * s]);
        for (let g = 0; g < Mn; g++) { const w = W[g]; let d = 0; for (let q = 0; q < 4; q++) d += w[q][1] * th[b + w[q][0] * s]; e -= Math.cos(d); }
      }
    }
    return e;
  };
  c.reset = function () { th.fill(0); p.fill(0); c.putIn = 0; pull(); };

  // the node at given digits (coarsest first), and the six nodes of one layer at one level, at one place in the others
  c.node = digits => digits.reduce((a, d, i) => a + d * stride[i], 0);
  c.layerAt = function (level, layer, place) {
    const out = [];
    for (let d = 6 * layer; d < 6 * layer + 6; d++) out.push(c.node(place.map((q, i) => (i === level ? d : q))));
    return out;
  };

  // where the meeting points are: the structure, then the structure again in each node by the move, level after level
  c.meetPositions = function () {
    const P = new Float32Array(meetN * 3); let mi = 0;
    const off = x => {
      let px = 0, py = 0, pz = 0, f = 1;
      for (let i = 0; i < k; i++) { const u = unit.pos[Math.floor(x / stride[i]) % n]; px += f * u[0]; py += Math.abs(f) * u[1]; pz += f * u[2]; f *= MOVE; }
      return [px, py, pz];
    };
    for (let i = 0; i < k; i++) {
      const s = stride[i], block = n * s, f = Math.pow(MOVE, i), u0 = unit.pos[0];
      for (let hi = 0; hi < N; hi += block) for (let lo = 0; lo < s; lo++) {
        const o = off(hi + lo);                                           // this level's digit is 0 here: take that node out
        const ox = o[0] - f * u0[0], oy = o[1] - Math.abs(f) * u0[1], oz = o[2] - f * u0[2];
        for (const m of unit.meetings) {
          P[mi * 3] = ox + f * m.pos[0]; P[mi * 3 + 1] = oy + Math.abs(f) * m.pos[1]; P[mi * 3 + 2] = oz + f * m.pos[2]; mi++;
        }
      }
    }
    return P;
  };
  // the four nodes whose currents meet at each meeting point
  c.meetEnds = function () {
    const E = new Uint32Array(meetN * 4); let mi = 0;
    for (let i = 0; i < k; i++) {
      const s = stride[i], block = n * s;
      for (let hi = 0; hi < N; hi += block) for (let lo = 0; lo < s; lo++) {
        const b = hi + lo;
        for (const m of unit.meetings) { E[mi * 4] = b + m.a0 * s; E[mi * 4 + 1] = b + m.a1 * s; E[mi * 4 + 2] = b + m.b0 * s; E[mi * 4 + 3] = b + m.b1 * s; mi++; }
      }
    }
    return E;
  };

  pull();
  return c;
}
