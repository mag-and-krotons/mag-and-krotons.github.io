# Derivation 1 check: the mirror window of the clocks up to P (6k-1 > P, 6k+1 < P'^2).
# Count full zeros (= twin pairs there), lower/upper primes, against the turn share prod(1-2/p), prod(1-1/p).
import numpy as np, math, sys
X = int(float(sys.argv[1]))            # sieve limit for 6k+1
K = X // 6 + 2
lo = np.ones(K, bool); up = np.ones(K, bool)   # lo[k]: 6k-1 prime ; up[k]: 6k+1 prime
lo[0] = up[0] = False
r = int(math.isqrt(X)) + 1
small = np.ones(r + 1, bool); small[:2] = False
for i in range(2, int(r ** .5) + 1):
    if small[i]: small[i*i::i] = False
primes = [p for p in np.nonzero(small)[0] if p >= 5]
for p in primes:
    p = int(p); inv = pow(6, -1, p)           # 6k = 1 mod p  -> k = inv ; 6k = -1 -> k = p-inv
    a, b = inv % p, (-inv) % p                 # a: p | 6k-1 ; b: p | 6k+1
    s = a if a else p
    lo[s::p] = False; up[b if b else p::p] = False
    if (6*a - 1) == p: lo[a] = True            # restore p itself
    if (6*b + 1) == p: up[b] = True
# mark that p itself not counted false: handled above
allp = [int(q) for q in np.nonzero(small)[0]]
tw = lo & up
nxt = {allp[i]: allp[i+1] for i in range(len(allp)-1)}
out = []
prod2 = prod1 = 1.0
targets = [int(t) for t in sys.argv[2:]]
pi = 0
for P in allp:
    if P >= 5:
        prod2 *= 1 - 2 / P; prod1 *= 1 - 1 / P
    if P in targets:
        Pn = nxt[P]
        k0 = P // 6 + 1                        # 6k-1 > P
        while 6*k0 - 1 <= P: k0 += 1
        k1 = (Pn*Pn - 2) // 6                  # 6k+1 < P'^2
        while 6*k1 + 1 >= Pn*Pn: k1 -= 1
        n = k1 - k0 + 1
        U = int(np.count_nonzero(tw[k0:k1+1])); A = int(np.count_nonzero(lo[k0:k1+1])); B = int(np.count_nonzero(up[k0:k1+1]))
        mean2 = n * prod2; mean1 = n * prod1
        out.append((P, Pn, n, U, mean2, U/mean2, A/mean1, B/mean1, (U/mean2)/((A/mean1)*(B/mean1))))
eg = math.exp(0.5772156649015329)
print("e^g/2 =", eg/2, " e^2g/4 =", eg*eg/4)
print("P P' centres twins(U) turn-mean U/mean lower upper pair/(lower*upper)")
for o in out:
    print("%d %d %d %d %.2f %.4f %.4f %.4f %.4f" % o)
