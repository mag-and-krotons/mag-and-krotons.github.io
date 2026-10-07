# Derivation 2 check. Gram matrix of sawtooths varsigma_k(t) = {1/(kt)} (Vasyunin), b_k = <f, varsigma_k> for the
# odd-square staircase f, then D_N^2 = eta(2) - b^T G^{-1} b (minimiser) and the error of the exact weights truncated:
# g_N = f + sum_{k<=N} w_k varsigma_k, w_k = lambda(k) - 2 lambda(k/4)[4|k]; its norm split at t = 1.
import numpy as np, math, sys
N = int(sys.argv[1])
gam = 0.5772156649015329
# Liouville
lam = np.ones(N + 1, np.int64); lam[0] = 0
om = np.zeros(N + 1, np.int64)
for p in range(2, N + 1):
    if all(p % q for q in range(2, int(p ** .5) + 1)):
        pk = p
        while pk <= N:
            om[pk::pk] += 1; pk *= p
lam[1:] = (-1) ** om[1:]
w = lam.astype(float).copy()
for k in range(4, N + 1, 4):
    w[k] -= 2 * lam[k // 4]
w[0] = 0
# V(h,k) for all k <= N, h mod k
V = {}
for k in range(2, N + 1):
    m = np.arange(1, k)
    cot = 1 / np.tan(np.pi * m / k)
    h = np.arange(k)[:, None]
    frac = ((h * m[None, :]) % k) / k
    V[k] = frac @ cot
def Vf(h, k):
    return 0.0 if k == 1 else V[k][h % k]
c0 = (math.log(2 * math.pi) - gam) / 2
G = np.empty((N, N))
for h in range(1, N + 1):
    for k in range(h, N + 1):
        d = math.gcd(h, k); h1, k1 = h // d, k // d
        v = (c0 * (1 / h1 + 1 / k1) + (k1 - h1) / (2 * h1 * k1) * math.log(h1 / k1)
             - math.pi / (2 * h1 * k1) * (Vf(h1, k1) + Vf(k1, h1))) / d
        G[h - 1, k - 1] = G[k - 1, h - 1] = v
# b_k = sum over odd n of Phi_k((n+1)^2) - Phi_k(n^2), Phi_k(y) = (log y - H(floor(y/k)))/k + floor(y/k)/y
def H(m):
    m = np.asarray(m, float)
    out = np.empty_like(m)
    small = m < 50
    ms = m[small].astype(int)
    tab = np.concatenate([[0.0], np.cumsum(1 / np.arange(1, 50))])
    out[small] = tab[ms]
    x = m[~small]
    out[~small] = np.log(x) + gam + 1 / (2 * x) - 1 / (12 * x * x) + 1 / (120 * x ** 4)
    return out
nmax = int(sys.argv[2]) if len(sys.argv) > 2 else 200000
n = np.arange(1, nmax + 1, 2, dtype=float)
lo2, hi2 = n * n, (n + 1) ** 2
b = np.empty(N)
for k in range(1, N + 1):
    def Phi(y):
        q = np.floor(y / k)
        return (np.log(y) - H(q)) / k + q / y
    b[k - 1] = np.sum(Phi(hi2) - Phi(lo2)) + 0.25 / (nmax + 1) ** 2   # tail: mean 1/2 of {u/k} on half the range
eta2 = math.pi ** 2 / 12
L = np.linalg.cholesky(G)
cond = np.linalg.cond(G)
res = {}
for M in [int(a) for a in sys.argv[3:]] or [N]:
    Lm = np.linalg.cholesky(G[:M, :M])
    y = np.linalg.solve(Lm, b[:M])
    DN2 = eta2 - y @ y
    ww = w[1:M + 1]
    E = eta2 + 2 * ww @ b[:M] + ww @ G[:M, :M] @ ww          # || f + sum w_k varsigma_k ||^2
    W = np.sum(ww / np.arange(1, M + 1))                     # part over t > 1 is W^2
    print(f"N={M} D_N^2={DN2:.6f} D_N^2logN={DN2*math.log(M):.5f}  exact-weights error^2={E:.6f} "
          f"(t>1: {W*W:.3e}, t<=1: {E-W*W:.6f})  sum_k<=N w_k/k={W:+.5f}")
print("cond(G) =", "%.3e" % cond, " check unit step b:", "skip")
