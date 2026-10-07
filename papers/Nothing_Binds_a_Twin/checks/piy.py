import numpy as np, math
y = 31607 ** 2
K = y // 6 + 2
lo = np.ones(K, bool); up = np.ones(K, bool); lo[0] = up[0] = False
r = math.isqrt(y) + 1
sm = np.ones(r + 1, bool); sm[:2] = False
for i in range(2, int(r ** .5) + 1):
    if sm[i]: sm[i*i::i] = False
for p in np.nonzero(sm)[0]:
    p = int(p)
    if p < 5: continue
    inv = pow(6, -1, p); a, b = inv, (-inv) % p
    lo[a::p] = False; up[b::p] = False
    if 6*a - 1 == p: lo[a] = True
    if 6*b + 1 == p: up[b] = True
ks = np.arange(K)
n = int(np.count_nonzero(lo & (6*ks - 1 <= y))) + int(np.count_nonzero(up & (6*ks + 1 <= y))) + 2
eg = math.exp(0.5772156649015329)
f = n * math.log(y) / y
print("y", y, "pi(y)", n, "pi log y / y", f, "e^g/2 * that", eg / 2 * f)
