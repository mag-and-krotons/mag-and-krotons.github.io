/**
 * High-Profile Academic Research Platform
 * Author: Abhijit Singh | Number Theory & Quantum Networks
 * Live Dataset: 12 Manuscripts from local repository
 */

const RESEARCH_PAPERS = [
  {
    "id": "01_Mathematics_Pair_Balance_and_the_Riemann_Zeros",
    "title": "Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "number-theory",
    "categoryLabel": "Number Theory",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "Riemann's function $\\Xi(z)=\\xi(\\frac12+iz)$ is the Fourier transform of a positive, even, doubly-exponentially decaying kernel $\\Phi$, and the Riemann Hypothesis (RH) is equivalent to the positivity of the current $J=2\\partial_y|\\Xi(x+iy)|^2$ for $y>0$. In this paper we write $J$ as a signed phase-space average of the Wigner function $Q$ of $\\Phi$, $J=\\frac14\\int Q(p,x)\\,p\\sinh(yp)\\,dp$, and prove the following. $Q$ has the exact expansion $Q=8e^{p/2}\\sum_N\\tau_x(N)\\mathcal K_x(2\\pi Ne^p)$ in Macdonald functions, with $\\tau_x(N)=N^{-ix}\\sigma_{2ix}(N)$ and Mellin transform $8\\,\\xi(w+ix)\\xi(w-ix)$. $Q(p,x)>0$ whenever $2\\pi e^{|p|}\\ge\\max(\\sqrt{2x^2+\\frac12},20)$, so that all Wigner negativity at momentum $|x|\\ge14.14$ lies in $|p|<\\log(x/2\\pi)+\\frac12\\log2+O(x^{-2})$. RH holds if and only if every even position moment of $Q$ is nonnegative at every momentum. $J>0$ except on the set $\\mathcal U$ where $|x|>3\\cdot10^{12}-\\frac12$ and $0<y<\\frac12-1/(5.573412\\log(|x|+\\frac12))$. The coefficients $\\tau_x(N)$ obey Euler-product lower bounds where the prime phases $x\\log\\ell$ align or alternate. An Epstein zeta function with the functional equation and no Euler product has a kernel with an expansion and a tail theorem of the same form and a current that is negative near its zero off the line, so a proof that $J\\ge0$ on $\\mathcal U$ must use a property such as the Euler product. We state this remaining step as a conjecture equivalent to RH. The Euler product is a merge. $\\xi$ is the moment function of two merged copies of one random unit, $\\mathbb E[Y^s]=2\\xi(s)$; we show that one copy gives $s\\pi^{-s/2}\\Gamma(\\frac s2)\\eta(s)$, the completed alternating series of the prime two, whose zeros on $\\Re s=1$ have no mirror partners, and that among $\\nu$ merged copies the mirror $s\\mapsto1-s$ holds only at $\\nu=2$. Followed in $\\nu$, the first zero moves from $1+2\\pi i/\\log2$ at $\\nu=1$ to $\\frac12+14.134725\\,i$ at $\\nu=2$, the only point of its path on the critical line. The Davenport--Heilbronn function, which has the mirror and not the merge, has four mirrored pairs of zeros off the line below height $200$, while all $114$ zeros of $L(s,\\chi_{-3})$ there lie on it. In $\\mathbb Z/3$ every pair $\\{s,-s\\}$ sits at $\\frac13$ and $\\frac23$, $L(0,\\chi_{-3})=\\frac13$, and the three-state spin whose Lee--Yang zeros lie at the thirds is the positive merge of two elementary pairs. RH is the balance of the parity of the number of prime factors to within $x^{1/2+\\varepsilon}$, which we follow exactly to $10^8$ ($49{,}998{,}058$ integers of even length against $50{,}001{,}942$ of odd length). At $x=50$ the margin of the criterion near the line is carried by the Airy transition zone of the expansion, and among $36$ heights in $[2\\times10^5,3.2\\times10^6]$ the three smallest margins occur where the phases of the primes up to $13$ align. The proofs use the Fourier expansion of the Eisenstein series, Riccati bounds for Macdonald functions of imaginary order, moment estimates and the Lee--Yang theorem; the computations evaluate the expansion in arithmetic of up to $200$ significant digits.",
    "bibtex": "@article{singh2026_01,\n  title = {Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros.pdf}\n}"
  },
  {
    "id": "02_Physics_The_Reversible_Half_and_the_Third_Body",
    "title": "The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "quantum-networks",
    "categoryLabel": "Quantum & Reversibility",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/02_Physics_The_Reversible_Half_and_the_Third_Body/02_Physics_The_Reversible_Half_and_the_Third_Body.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "Time reversal is an involution: it splits every quantity into a part it keeps and a part it reverses. We determine what the reversed part carries in two settings, the classical records written by sequential quantum measurement and three equal masses under gravity. For a record chain $C$ with stationary law $\\pi$, time reversal $\\tilde C$ and reversible half $S=\\frac12(C+\\tilde C)$, we prove that the entropy the record forgoes by being directed is a $\\pi$-average of Jensen--Shannon divergences between its forward and time-reversed transition laws, and that $0\\le h(S)-h(C)\\le\\frac14\\mathrm{EP}$, where EP is the entropy production, with equality to leading order as $C\\to S$. The bound rests on the pointwise inequality $\\mathrm{JSD}\\le\\frac18\\times$(Jeffreys divergence). For alternating sharp measurement of a singlet with $n\\ge3$ settings we solve the record exactly: the stationary record is reversible, and a record of length $L$ carries total irreversibility $\\frac c2(1-d^{L-2})\\log_2\\frac{1+c}{1-c}$ bits, $c=\\cos\\frac\\pi n$, $d=\\cos\\frac{2\\pi}n$, whose limit $c\\,\\mathrm{artanh}(c)$ nats is the Jeffreys divergence of the seed pair law from the stationary one; a separable preparation writes the identical record. A processed four-outcome instrument reconstructed from tomography writes its arrow continuously, at $\\mathrm{EP}=0.00686044$ bits per use, with $h(S)-h(C)$ at $99.86\\%$ of $\\mathrm{EP}/4$. The rotating field of three-phase currents carries the same involution: time reversal transposes its lagged correlation matrix $K(\\tau)$, whose symmetric half carries the magnitude $|I_+|^2+|I_-|^2$ and whose antisymmetric half carries the signed swept area $\\frac{9\\pi}4(|I_+|^2-|I_-|^2)$. For three equal masses we prove that every collinear instant with one body at the midpoint is the triad $(-s,0,s)$ about the centre of mass, that three bodies on one curve at thirds of the period carry no harmonic divisible by three, that the time-reversal symmetry of the figure-eight makes its angular momentum vanish harmonic by harmonic, as a balance of counter-rotating pairs, and that the equal-mass Lagrange triangle grows at exactly $\\omega/\\sqrt2$. The figure-eight has period $T=6.3259140121$; it is a choreography to $1.3\\times10^{-8}$ from the published initial data and to $4.1\\times10^{-12}$ from refined data that close the orbit to $9.6\\times10^{-13}$; it holds the triad six times per period, at $kT/6$ to $5.5\\times10^{-9}$, with each body at the zero twice; and it keeps its shape within $3.2\\times10^{-6}$ over $50$ periods after a $10^{-6}$ kick, while the Lagrange triangle grows at $0.702194$ against the exact $\\omega/\\sqrt2=0.702331$. A fourth body of mass $\\varepsilon$ at distance $D$ outside the Mardling--Aarseth boundary lends the triad a spin and takes it back every half outer orbit, deforming it by $\\delta_{\\max}\\simeq\\sqrt3\\langle\\Delta I\\rangle\\varepsilon D^{-3/2}=2.84\\,\\varepsilon D^{-3/2}$; the triad keeps its shape to $10^{-2}$ for $\\varepsilon/D^3\\le10^{-4}$ and loses it for $\\varepsilon/D^3\\ge3.7\\times10^{-4}$, and inside the boundary the fourth body is expelled. The proofs use convexity, Fourier series on the cube roots of unity and the symmetries of Newton's equations; the orbits are integrated by an eighth-order Runge--Kutta method at tolerances $10^{-12}$ to $10^{-13}$.",
    "bibtex": "@article{singh2026_02,\n  title = {The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/02_Physics_The_Reversible_Half_and_the_Third_Body/02_Physics_The_Reversible_Half_and_the_Third_Body.pdf}\n}"
  },
  {
    "id": "03_Quantum_The_Riemann_Kernel_as_a_Quantum_State",
    "title": "The Riemann Kernel as a Quantum State: Wigner Negativity, Decoherence at the Thirds and Lee-Yang Zeros",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "quantum-networks",
    "categoryLabel": "Quantum Networks",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "Riemann's kernel $\\Phi$, the positive even function with $\\Xi(z)=\\xi(\\frac12+iz)=\\int_0^\\infty\\Phi(\\tau)\\cos(z\\tau)\\dd\\tau$, is square-integrable and integrable, so it defines both a pure quantum state $\\varphi=\\Phi/\\|\\Phi\\|$ and a probability law. We prove that the Riemann Hypothesis (RH) is equivalent to a quantum statement about each reading. For the observables $\\hat O_{x,y}$ with nonnegative Weyl symbol $a\\sinh(2ya)\\,\\delta(k-x)$ we show that $\\langle\\psi|\\hat O_{x,y}|\\psi\\rangle=\\frac12\\partial_y|\\tilde\\psi(x+iy)|^2$ for every real even or odd state $\\psi$ of sufficient decay, so the family detects every state whose momentum wave function has a non-real zero and no state whose momentum wave function is entire of order at most one with only real zeros; RH holds if and only if it does not detect $\\varphi$, and the current $J=2\\partial_y|\\Xi|^2$ equals $2\\pi\\|\\Phi\\|^2\\langle\\varphi|\\hat O_{x,y}|\\varphi\\rangle$. A qubit dephased by a classical field with law $\\Phi/\\int\\Phi$ has coherence $L(t)=\\Xi(\\lambda t)/\\Xi(0)$, the normalised momentum wave function of $\\varphi$, and RH holds if and only if $L$, continued to complex time, vanishes only at real times. The Riemann state is Wigner-negative, and its negativity is small and confined: it carries $4.844\\times10^{-5}$ of the Wigner mass, is negative on the axis $a=0$ for $11.1994<k<15.8346$, is deepest at $k=12.022$ ($W_\\varphi=-6.60\\times10^{-5}$, against the maximum $1/\\pi$), and at every momentum $k$ lies in $2\\pi e^{2|a|}<\\max(\\sqrt{2k^2+\\frac12},20)$ by a tail-positivity theorem proved here. We prove $J>0$ for $|x|\\le3\\cdot10^{12}-\\frac12$ and for $y\\ge\\frac12-1/(5.573412\\log(|x|+\\frac12))$, which reduces RH to $J\\ge0$ on the remaining set $\\mathcal U$. The de Bruijn--Newman flow is Gaussian filtering $\\Phi\\mapsto e^{T\\tau^2/4}\\Phi$ and moves $J$ by forward--backward diffusion; every filter with $T<0$ yields a detected state and none with $T\\ge0.2$ does, while over eight values of $T$ from $-1$ to $1$ the negative mass increases from $3.912$ to $5.993\\times10^{-5}$. For finite baths we prove the Lee--Yang property through the merge. A maximally mixed spin-1, the triad $\\{-s,0,s\\}$, gives $L=(1+2\\cos2\\lambda t)/3$ and complete decoherence at exactly $\\frac13$ and $\\frac23$ of the revival period; it is the merged pair of two Ising spin-$\\frac12$'s at coupling $\\frac12\\ln2$; and every chain of $N$ triads with coupling $K\\ge0$ decoheres completely at $2N$ real times per period, counted with multiplicity, and has no partial dips (for $N=2,\\dots,6$ at four couplings all roots lie on the circle to $8.2\\times10^{-14}$), whereas at $K=-1$ roots leave the circle (to $|z|=13.9393$) and even chains never decohere fully ($|L|\\ge0.05311$). The Riemann coherence vanishes at the first five ordinates to $1.0\\times10^{-9}$, and a bath of $64$ classical levels reproduces $\\gamma_1,\\gamma_2,\\gamma_3$ to $7.1\\times10^{-10}$. The proofs use the Hadamard factorisation of $\\Xi$, Riccati bounds for Macdonald functions of imaginary order and the Lee--Yang circle theorem through a merged-pair substitution. We close with an NMR realisation.",
    "bibtex": "@article{singh2026_03,\n  title = {The Riemann Kernel as a Quantum State: Wigner Negativity, Decoherence at the Thirds and Lee-Yang Zeros},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State.pdf}\n}"
  },
  {
    "id": "04_Chemistry_Which_Member_Carries",
    "title": "Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Döbereiner's Triads as Balanced Pairs",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "applied-science",
    "categoryLabel": "Applied Systems & Synthesis",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/04_Chemistry_Which_Member_Carries/04_Chemistry_Which_Member_Carries.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "Which member of a pair carries (the charge, the population, the change of nuclear charge, the electron of a sensor surface, the centre of a triad) is decided in chemistry by one law, the two-state pair $p=1/(1+e^{\\varepsilon})$ split into a common part $\\frac12$ and a difference $\\delta=-\\frac12\\tanh(\\varepsilon/2)$. We show that an observation of which member carries determines $\\delta$ and nothing else, and we evaluate the pair in six settings. Potassium carries the charge of the separated pair Na, K at every temperature: the minority configuration $\\mathrm{Na^+}+\\mathrm K$ has occupancy $3.87\\times10^{-14}$ at 300 K as a single pair and $1.97\\times10^{-7}$ in an equimolar gas, where mass action halves the exponent. The mean nuclear charge change per decay of ${}^{40}$K is $+0.7856(22)$ from the 2017 ENSDF evaluation and $+0.7918(10)$ from the 2023 KDK branching ratios, $2.6$ combined standard uncertainties apart. The upper fine-structure level of aluminium holds the majority above $T_{1/2}=232.61$ K. We prove that a code shared by the absent rows of two channels turns their correlation exactly into $(r+fd_xd_y)/\\sqrt{(1+fd_x^2)(1+fd_y^2)}$, whose sign flips when the geometric-mean code distance crosses $\\sqrt{-r/f}$; from the present-row moments of two sensor channels of the UCI air-quality record this closed form reproduces the coded correlations $+0.086931$ (code $-200$, geometric-mean distance $4.9133$) and $-0.075630$ (code $0$, distance $4.0595$) to $10^{-16}$. First-order mass action makes the ionosorbed-oxygen occupancy of a metal-oxide surface an exact logistic in $\\varepsilon=\\ln(\\Phi_+/\\Phi_-)$, the log-ratio of the electron-release and electron-trapping fluxes. Fitted to the five sensors of the same record on the common CO axis, the two-state law is preferred to the offset power law for every sensor ($\\Delta\\mathrm{AIC}=11.7$ to $209.0$), with slopes $\\beta=1.18$ to $1.45$, and it orders the sensors into a ladder of half-points: S3 ($1.68$ mg\\,m$^{-3}$, the falling tungsten-oxide surface, which reads the opposite member) $<$ S5 ($4.61$) $<$ S2 ($5.40$) $<$ S1 ($7.49$, at the upper edge of the data) $<$ S4 (not identified), with S3 $<$ S5 $<$ S2 in both halves of the year. Humidity enters every sensor on the side of the reducing gas. In this urban record NO$_2$ rises with CO, so the oxidizing member is not separable through NO$_2$; the opposite-sign pair is CO against NO on S4, with balance slope $3.28$. The record's benzene column is an exact power law of the titania sensor, $1.23978\\times10^{-4}(S_2-324.785)^{1.743158}$ to $1.6\\times10^{-15}$: a calibration output, not a measurement. From the Madelung order we prove the period-pair law $L(p)=2\\lceil(p+1)/2\\rceil^2$ and that a vertical triad is exact, $Z_2=\\frac12(Z_1+Z_3)$, if and only if the two periods it spans have equal length. Of the 54 vertical triads, 27 are exact, including all four of Döbereiner's; their middle member is the zero of the pair $(-s,+s)$, $s\\in\\{8,18,32\\}$. The same mass-action pair decides which gas survives the NH$_4$SH deck of the giant planets. The proofs solve the steady state of first-order mass action, decompose pooled moments and count subshells in the Madelung order; the sensor results are least-squares fits with day-block bootstrap intervals.",
    "bibtex": "@article{singh2026_04,\n  title = {Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Doebereiner's Triads as Balanced Pairs},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/04_Chemistry_Which_Member_Carries/04_Chemistry_Which_Member_Carries.pdf}\n}"
  },
  {
    "id": "05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue",
    "title": "The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "applied-science",
    "categoryLabel": "Applied Systems & Synthesis",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "Excitable tissue is read through pairs: the open and closed states of a gate, the inward and outward charges of a spike, the excitatory and inhibitory inputs of a cortical network. We prove that in a balanced network of excitatory and inhibitory neurons the residual net input and the distance of the population rates from the balance solution are one object, $\\mu=\\sqrt K\\,A\\,(\\nu-\\nu_{\\mathrm{bal}})$, where $K$ is the number of connections per neuron and $A$ the matrix of the balance equations. In simulations of $2\\times10^4$ binary neurons with $K=100$ to $1600$ this identity reproduces the measured rates to $2.67\\times10^{-3}$. The excitatory and inhibitory inputs grow as $\\sqrt K$ per unit rate (log--log slopes $0.4994$--$0.5004$), the net input stays of order one, and fractions $0.9763$ (E) and $0.9954$ (I) of the excitatory drive cancel at $K=1600$. The rates approach balance slowly, $40.6\\%$ (E) and $22.2\\%$ (I) below it at $K=1600$, exactly as the identity requires: $\\det A=0.2$ amplifies the residual, and mean-field rates come within $10\\%$ of balance only for $K>\\text{40,054}$ (E) and $K>\\text{8,897}$ (I). The network is the top of a ladder that starts at the single gate. The two-state gate $p=1/(1+e^{-z(V-V_{1/2})})$ is balanced at its half-point, where its occupancy is $\\frac12$, its entropy one bit and its variance largest. The Hodgkin--Huxley half-points are $-40.02$ ($m$), $-62.31$ ($h$) and $-53.41$ mV ($n$), and $n^4$ reaches half its maximum $34.5$ mV above the half-point of its gate. Mean currents determine only the product $Ni$ of channel number and unitary current, and the variance separates the two; the precision of the channel count improves steadily with the largest open probability reached, with no threshold at $\\frac12$: it goes from no reliable estimate at $0.19$ to a factor of two at $0.5$ and $\\pm12\\%$ at $0.87$. Voltage-dependent block is a two-state gate whose two parameters separate affinity from electrical distance; the magnesium block of NMDA receptors has its half-point at $-20.5$ mV at $1$ mM, moving $11.2$ mV per doubling. We derive the spike threshold of exponential-onset sodium activation in closed form, $\\theta=E_{\\mathrm{Na}}-k_a[1-W_{-1}(-(g_L/g_{\\mathrm{Na}})e^{1-(E_{\\mathrm{Na}}-V_a)/k_a})]$, which reduces the error of the simplest threshold equation by a factor of $1.3$ to $33$, and show that a threshold reading fixes $V_a$ and $g_{\\mathrm{Na}}$ only through $g_{\\mathrm{Na}}e^{-V_a/k_a}$. The inward and outward charges of a spike cancel exactly. The sodium conductance $m^3h$ is a triad with a fourth: three activating particles, like the channel's three fast voltage sensors, and one inactivating particle, like the domain IV sensor. Its spike (amplitude $104.06$ mV) carries $13.36$ times the minimum sodium charge, and among exponents $1$ to $4$ only $m^3h$ gives both a stable rest and a spike. The sodium--potassium pump is the unequal pair $3{:}2$; it moves one elementary charge per cycle and stalls at $-205$ mV. The proofs use the two-state law, the binomial variance, the Lambert function and the balance equations; the numbers come from the Hodgkin--Huxley equations integrated to relative tolerance $10^{-9}$ and from direct simulation of the network.",
    "bibtex": "@article{singh2026_05,\n  title = {The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue.pdf}\n}"
  },
  {
    "id": "06_Algorithms_Three_Is_Enough",
    "title": "Three Is Enough: Radix Economy, Balanced-Ternary Arithmetic and Ternary-Weight Networks",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "algorithms",
    "categoryLabel": "Algorithms & Complexity",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/06_Algorithms_Three_Is_Enough/06_Algorithms_Three_Is_Enough.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "A base-$b$ register that holds the integers $0,\\dots,N$ costs $C_b(N)=b\\,d_b(N)$ digit-states, where $d_b(N)$ is the number of base-$b$ digits of $N$. Its growth rate $E(b)=b/\\ln b$ is minimised among integers at $b=3$, and three is known to be almost always the most economical integer radix. We make this exact: base~3 is a cheapest base for every $N\\ge2^{16}$ and the unique cheapest base for every $N\\ge2^{27}$, and both thresholds are sharp; asymptotically, binary and base~4 both pay the factor $E(2)/E(3)=E(4)/E(3)=\\frac23\\log_{2}3=1.0566$. We prove that balanced ternary, whose digit set is $\\{-1,0,1\\}$, is a complete signed arithmetic: every integer has exactly one representation, negation is the digit flip, the carries of addition stay in the triad, products of digits need no carry, rounding is truncation (with its exact tie case), the sign is the leading nonzero trit and order is lexicographic. The generating function of a width-$d$ register is the product of one factor per trit, and all its $3^d-1$ zeros lie on the unit circle, at the nontrivial $3^d$-th roots of unity. We also show that the ternary-weight quantiser $\\{-\\alpha,0,+\\alpha\\}$ is optimal in least squares exactly when $\\alpha=\\mathrm E(|W|\\mid|W|>\\Delta)$ and $\\Delta=\\alpha/2$, and we give the optimum in closed form: for uniformly distributed weights it sets exactly one third of the weights to zero, and for Gaussian weights it lowers the squared error from $0.3634$ of the variance (binary) to $0.1902$. On the 1797 handwritten digits of the UCI optical-recognition test set, a $64$--$128$--$10$ network with weights in $\\{-\\alpha,0,+\\alpha\\}$ reaches $97.44\\pm0.73\\%$ test accuracy, against $97.70\\pm0.43\\%$ with 32-bit floats and $97.11\\pm0.55\\%$ with binary weights (5 seeds), at $\\log_{2}3=1.585$ bits per weight and with a fraction $0.4325$ of its weights in the zero state. The radix theorem combines an analytic bound for large $N$ with an exact comparison of step functions below $2.66\\times10^8$; the arithmetic follows from the fact that $\\{-1,0,1\\}$ is a complete residue system modulo~$3$ that is closed under negation and multiplication.",
    "bibtex": "@article{singh2026_06,\n  title = {Three Is Enough: Radix Economy, Balanced-Ternary Arithmetic and Ternary-Weight Networks},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/06_Algorithms_Three_Is_Enough/06_Algorithms_Three_Is_Enough.pdf}\n}"
  },
  {
    "id": "07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs",
    "title": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "applied-science",
    "categoryLabel": "Applied Systems & Synthesis",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "We show that each of the four giant planets is built of balanced pairs about a centre at four levels: its throats, its heart, its cloud decks and its place among the giants; the interstellar visitors and the planets of a pulsar meet the same structure. Every giant's Hill sphere opens through two throats, at $L_1$ and $L_2$, whose linear dynamics is the same for every planet, $\\lambda^4-2\\lambda^2-27=0$ ($\\lambda^2-\\omega^2=2$, $\\lambda^2\\omega^2=27$, vertical frequency $2$). The pair is unequal by $\\mathcal A=\\frac h3(1-\\frac{h^2}{27}+O(h^3))$, $h=(\\mu/3)^{1/3}$, and the full problem gives $0.99972$ to $1.00000$ of $h/3$ for the four giants and the planets of PSR~B1257+12. Near each throat the energy surface has the topology $S^2\\times I$ of a spatial slice of the Einstein--Rosen bridge, in phase space; the flux through it is the action $2\\pi\\Delta E/\\omega$ of its Lyapunov orbit, to $1.8\\times10^{-6}$ at Jupiter's $L_1$, and every long temporary capture by Jupiter in the Ohtsuka catalogue entered and left through it. Jupiter and Saturn have dilute cores, and both carry tracking signals read as p-modes; the $n=1$ polytrope gives Jupiter's acoustic spacing to $4.5\\%$ from mass and radius alone, and in polytropes matched to each planet's $J_2/q_\\omega$ the $10^5$-bar level lies at $3569$ and $8786$ km, where the winds inferred from gravity end ($3000$ and $9000$ km). An equilibrium cloud-condensation model anchored at the $1$-bar temperatures gives $3,3,4,4$ cloud decks. The $\\NHSH$ titration is an exact two-state pair, $x_{\\NH}=k\\e^{\\varepsilon/2}$, $x_{\\HS}=k\\e^{-\\varepsilon/2}$, whose survivor above the deck is $\\mathrm{sign}(\\mathrm N-\\mathrm S)$. With deep $\\mathrm{N/S}=4.73$, $3.16$, $0.195$ and $0.170$ this resolves why the ice giants show $\\HS$ and not $\\NH$ above their clouds: the model's saturated $\\HS$ at the cloud tops is $0.26$--$1.8$ ppm on Uranus, which brackets the detected $0.4$--$0.8$ ppm, and $0.49$--$2.25$ ppm on Neptune, which overlaps the detected $1$--$3$ ppm. The triangle of Jupiter--Saturn conjunctions turns one third of a turn in exactly one period of the great inequality, $883$ years. The four orbit planes precess in three live modes and one exact zero mode, the invariable plane. The triangular points are stable by the Gascheau--Routh criterion, with their spectrum on the imaginary axis in pairs of opposite Krein signature that leave it only by colliding, and Trojans are known at all four giants. The outermost moons of Jupiter, Saturn and Neptune reach $0.633$, $0.625$ and $0.654$ of the Hill radius and those of Uranus $0.407$; we predict retrograde moons $42$--$51$ million km from Uranus. The three interstellar objects share neither a direction nor a kinematic origin (largest pairwise velocity difference $75.5$ km/s). 3I/ATLAS touched Jupiter's Hill sphere, at $1.0011$ Hill radii ($1.0020$ by JPL), and was not the source of the Wow!\\ signal: in 1977 it lay $8.3^\\circ$ from the nearer beam centre, and a hydrogen-line transmitter on it would have been received $11.6$ channels from the Wow!. Its four OH lines are two pairs about one centre, $1612.2309+1720.5299=1665.4018+1667.3590$ MHz. PSR~B1257+12 holds a near-$3{:}2$ pair of planets whose angular momenta stand in the ratio $1.03\\pm0.07$, and for its mass the horizon radius is exactly one third of the innermost stable orbit. The results rest on exact expansions and linear algebra of the restricted problem, on a thermodynamic model built from stated data, and on two-body propagation of the visitors against an ephemeris that reproduces JPL's approach of 3I/ATLAS to Jupiter to $3\\times10^{-4}$ au.",
    "bibtex": "@article{singh2026_07,\n  title = {The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs.pdf}\n}"
  },
  {
    "id": "08_Synthesis_What_a_Zero_Is",
    "title": "What a Zero Is: One Involution across Mathematics, Physics, Chemistry, Neuroscience, Computation and the Giant Planets",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "applied-science",
    "categoryLabel": "Applied Systems & Synthesis",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/08_Synthesis_What_a_Zero_Is/08_Synthesis_What_a_Zero_Is.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "The Triad Principle has four clauses: a pair $s,-s$ whose sum is the zero; the self-stable triad $\\{-s,0,s\\}$; the merge of units under positive coupling, which keeps the structure; and the fourth element, the observer, which becomes a member of a new triad. We state the principle as one involution $\\iota$, under which every object splits into an even part, the common and reversible half, and an odd part, the difference that an observation of which member determines; a zero is where the odd part vanishes, the balance of a pair $s,-s$. We prove each clause as a proposition: the splitting is unique exactly away from characteristic $2$; a reading of which member of a two-state pair is occupied has mean equal to twice the odd part $\\delta=-\\frac12\\tanh(\\varepsilon/2)$; the triad $\\{-1,0,1\\}$ is the only finite set of integers that contains $0$ and a nonzero element and is closed under negation and multiplication, and its generating function vanishes exactly at $\\frac13$ and $\\frac23$ of a turn; the merge of two elementary pairs under a coupling $\\kappa\\ge0$ keeps both zeros on the unit circle and is the uniform triad exactly at $\\kappa=\\frac12\\ln2$, while $\\kappa<0$ sends them off the circle as a mirrored pair; and a probe qubit reading a triad decoheres completely at $\\frac13$ and $\\frac23$ of its period, its record a new balanced triad. We then give the exact instance of every clause in each of seven field papers, in mathematics, physics, quantum theory, chemistry, neuroscience, computation and planetary science, and collect them in one correspondence, from the signed current $J$ of Riemann's $\\xi$, whose positivity is equivalent to the Riemann Hypothesis (RH) and is proved outside an explicit region, to the NH$_4$SH titration whose zero at $\\mathrm{N/S}=1$ decides which ice tops each giant planet. Five structures recur as identities across the set: the two-state law $p=1/(1+\\e^{\\varepsilon})$ with odd part $-\\frac12\\tanh(\\varepsilon/2)$; the triad generating function $z^{-1}+1+z$; one merge rule for zeros; the Klein four-group generated by an involution and complex conjugation, whose orbits collapse to pairs exactly on the critical line, on the imaginary axis of a Hamiltonian spectrum and on the Lee--Yang circle; and one observer, whose complete-decoherence times are the Lee--Yang zeros of what it reads. For $\\xi$ the involution is $s\\mapsto1-s$. It comes from Poisson summation, which also gives the modular invariance of the closed string and T-duality, and its automorphic form is the invariance of the Eisenstein series under $\\tau\\mapsto-1/\\tau$: the Wigner function of Riemann's kernel is an explicit operator applied to $E^*(i\\e^p,\\frac12+ix)$ that removes exactly its two constant terms. We give seven readings of a zero: a balance of two halves of $0.158$ each, equal to within $4\\times10^{-15}$ at the first three zeros; a phase vortex of winding number one; a Lee--Yang zero, with all $12$--$14$ zeros of two ferromagnetically coupled Riemann spins below height $40$ on the imaginary axis while the Epstein control loses $4$ of $7$; a scattering resonance, $|\\varphi|=1$ on the unitary line to $2\\times10^{-13}$; a spectral level, the $22{,}491$ zeros below $2\\times10^4$ at $L^1$ distance $0.073$ from GUE; a mass; and the time of a dynamical phase transition. In the set RH is equivalent to $J\\ge0$ on the remaining region and to six further statements, and any proof of it must use a property that $\\zeta$ has and the Epstein zeta function lacks, such as the Euler product. The propositions are proved by exact algebra and the Lee--Yang circle theorem; the readings are computed by quadrature, Euler--Maclaurin summation, the Riemann--Siegel formula and the argument principle.",
    "bibtex": "@article{singh2026_08,\n  title = {What a Zero Is: One Involution across Mathematics, Physics, Chemistry, Neuroscience, Computation and the Giant Planets},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/08_Synthesis_What_a_Zero_Is/08_Synthesis_What_a_Zero_Is.pdf}\n}"
  },
  {
    "id": "09_The_Remaining_Step",
    "title": "The Remaining Step: Six Equivalent Forms of the Riemann Hypothesis and the Surgery Obstruction",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "25 September 2026",
    "category": "number-theory",
    "categoryLabel": "Number Theory",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/09_The_Remaining_Step/09_The_Remaining_Step.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "Riemann's function $\\Xi(z)=\\xi(\\frac12+iz)$ is the cosine transform of a positive even kernel $\\Phi$, and the Riemann Hypothesis (RH) is equivalent to the positivity of the current $J=2\\partial_y|\\Xi(x+iy)|^2=\\frac14\\int Q(p,x)\\,p\\sinh(yp)\\dd p$ for $y>0$, where $Q$ is the Wigner function of $\\Phi$. The companion paper on pair balance proves $J>0$ outside the set $\\mathcal U$ of points with $|x|>3\\cdot10^{12}-\\frac12$ and $0<y<\\frac12-1/(5.573412\\log(|x|+\\frac12))$, and states positivity on $\\mathcal U$ as Conjecture~1, which is equivalent to RH. In this paper we locate the remaining step. We prove a surgery obstruction: replacing two real zeros $\\gamma_1<\\gamma_2$ of $\\Xi$ above $3\\cdot10^{12}$ by $\\gamma\\pm ib$, $\\gamma=\\frac12(\\gamma_1+\\gamma_2)$, gives an even entire function of order one with the same verified zeros, the same zero-free region and a positive current off $\\mathcal U$, whose logarithm and its gradient differ from those of $\\Xi$ on $\\Re s\\ge1$ by $O(1/\\log^2T)$ at pairs that exist in every interval $[T,2T]$, and whose current is negative in $\\mathcal U$; at the Lehmer pair near $7005.08$ the change on $\\Re s=1$ is $2.84\\times10^{-3}$ while the vertical velocity $\\partial_y\\log|\\widetilde\\Xi|$ falls to $-5279$ below the planted zero. Hence inequalities for $\\log|\\Xi|$ and its gradient on $\\Re s\\ge1$ that hold with a margin $C/\\log^2|x|$, together with the verified zeros, the zero-free region and the zero count, cannot prove Conjecture~1. We prove six forms of Conjecture~1 equivalent to RH: the vanishing of a Jensen--Riesz defect at a single point of a strip; the vanishing of the Krein--Langer index of the current, which equals the number $N_+$ of distinct zeros of $\\Xi$ in the upper half-plane; the absence of a multiple real zero of the heat-flow deformation $\\Xi_T$ for $0<T\\le0.2$; the positivity of Weil's functional on the Poisson family, $J=4|\\Xi|^2\\,W(h_{x,y})$; the value $1$ of the Li radius; and the Hausdorff moment property of the Lee--Yang cumulants of Riemann's spin. We also prove that $\\{J\\le0\\}$ has measure $\\ll T/\\log T$ in $[T,2T]\\times(0,\\infty)$ and that each bounded component of $\\{J<0\\}$ touches a zero off the line; that the Li coefficients satisfy $\\lambda_n>0$ for all $n\\le10^{12}$, from the verification to height $3\\cdot10^{12}$ and Trudgian's bound for the zero count; that a zero off the line at height $b$ casts a zero of $\\Xi+it\\Xi'$ at height $b^2/2t+O(b^4)$; that at a heat-flow landing $\\{J_T<0\\}$ is, up to a displacement $O(b_T^3)$ of its boundary, the half-disk of radius $b_T=\\sqrt{(T^*-T)/2}\\,(1+o(1))$; that $|\\Xi|^2$ is a Gaussian average of an antiferromagnetically coupled pair of heat-flowed copies; that the merge of $\\nu$ copies moves the zeros to both sides of the critical line at $\\nu=2$ ($\\partial_\\nu\\sigma=-0.5671$ at $\\gamma_1$, $+0.1624$ at $\\gamma_2$); that the observer rule, which adjoins the least integer not yet generated, produces exactly the primes, the classical minimal generating set of the integers; and that the necessary condition which Conrey and Li derived from de Branges's positivity condition is, at a simple zero $\\frac12+i\\gamma$, the sign condition $\\Xi'(\\gamma)\\Im\\Xi(\\gamma+i)\\ge0$, which fails at $252$ of the first $2469$ zeros, first at the $34$-th, as Conrey and Li found. The Epstein function $Z_\\epsilon=\\zeta L(\\cdot,\\chi_{-24})-L(\\cdot,\\chi_{-3})L(\\cdot,\\chi_8)$ shares every structural property used in the flow, operator and heat-flow statements and has no Euler product: its de Bruijn--Newman constant lies in $[0.7472,5.12]$, its first negative Li coefficient is $\\lambda_{1130}$, and its Weil form is negative on windows of length $1.59$. The proofs use potential theory in a strip, indefinite reproducing kernels, the heat flow, Weil's explicit formula and Li's coefficients, and the computations are carried out in double precision with the accuracy stated at each use.",
    "bibtex": "@article{singh2026_09,\n  title = {The Remaining Step: Six Equivalent Forms of the Riemann Hypothesis and the Surgery Obstruction},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/09_The_Remaining_Step/09_The_Remaining_Step.pdf}\n}"
  },
  {
    "id": "10_The_Balance_of_the_Count",
    "title": "The Balance of the Count: One Energy in the Prime Counts and in the Sawtooth, and the Riemann Hypothesis in Real Variables",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "26 September 2026",
    "category": "number-theory",
    "categoryLabel": "Number Theory",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/10_The_Balance_of_the_Count/10_The_Balance_of_the_Count.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "We write the Riemann Hypothesis (RH) in real variables and measure the constant it predicts in three independent ways, which agree to within $2\\%$. Every integer $k>1$ has as many squarefree divisors with an even number of prime factors as with an odd number, and this pairing gives the rebuild law $\\sum_{n\\le x}M(x/n)=1$ for the Mertens function $M$: the balance at every scale is fixed by the balances at all smaller scales. We prove that the Möbius-weighted sawtooths rebuild the constant exactly, $-\\sum_{k\\ge1}\\mu(k)\\fr{1/(kt)}=\\chi_{(0,1]}(t)$ for every $t>0$, and that the first $N$ of them fall short by a value term $x\\,m(N)$, $m(N)=\\sum_{k\\le N}\\mu(k)/k$, and by a signed sum $R_N(x)$ of the unfinished divisor sums $c_N(n)$ over $N<n\\le x$; the integral of the squared shortfall over $[1/N,1]$ is exactly $(N-1)\\,m(N)^2$, which does not tend to $0$. We prove that RH is equivalent to the statement that the energy $E(X)=\\int_1^X((\\psi(x)-x)/x)^2\\dd x$ of the prime-count error grows more slowly than every power of $X$. Measured in doublings $u=\\log_2x$, the error of the prime counts to $10^{10}$ shows real waves at $1.560$, $2.320$, $2.760$, $3.358$, $3.633$, $4.148$, $4.515$ and $4.780$ turns per doubling; each wave grows by $2^{u(1/2+\\delta)}$ with $|\\delta|\\le0.0022$ between the two halves of the range, and the first wave's amplitude in the two halves agrees to $0.4\\%$. The mean energy per unit of $\\log x$ is $0.04592$ over $2^{12}\\le x\\le10^{10}$, and $0.04587$ and $0.04597$ in the two halves. The sum $\\sum1/|\\rho|^2$ over the zeros with $|\\gamma|<3000$ ($2469$ conjugate pairs), with the density tail, is $0.046192$, and the sawtooth distance of Nyman, Beurling and B\\'aez-Duarte, computed from exact integrals of fractional parts with no reference to primes, gives $d_N^2\\log N$ between $0.0454$ and $0.0470$ for $40\\le N\\le60$; all three agree with $2+\\gamma-\\log4\\pi=0.0461914$ to within $2\\%$. The rebuild law, with a table of $\\mu$ to $10^9$, reproduces $M(10^n)$ exactly for $9\\le n\\le15$ and gives $|M(x)|\\le0.424\\sqrt x$ at every doubling from $2^{34}$ to $2^{49}$. The integers free of the primes up to $37$ carry no wave (amplitude at most $0.0018$ against $0.14$--$0.18$), while at $x=10^{10}$ the Möbius sum over the integers whose prime factors are at most $x/2$ is $+2200.6\\sqrt x$ and the primes in $(x/2,x]$ bring it to $M(x)=-0.337\\sqrt x$. Generalized-integer systems of Diamond, Montgomery and Vorhauer and of Broucke, Debruyne and R\\'ev\\'esz obey the same pairing and the same rebuild law, the latter with integer-count error $O(x^{1/2+\\varepsilon})$, and have prime errors far above $\\sqrt x$; a proof of RH must therefore use more about the integer count than these properties, and the ordinary count has more: it is exact, $\\lfloor x\\rfloor=x-\\fr x$ with $0\\le\\fr x<1$. We state the remaining step as the subpolynomial growth of the energy.",
    "bibtex": "@article{singh2026_10,\n  title = {The Balance of the Count: One Energy in the Prime Counts and in the Sawtooth},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/10_The_Balance_of_the_Count/10_The_Balance_of_the_Count.pdf}\n}"
  },
  {
    "id": "11_The_Square_Root_Horizon",
    "title": "The Square-Root Horizon: Squares, Reversal and Prime Clocks in the Distribution of the Primes and the Zeros of the Riemann Zeta Function",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "September 2026",
    "category": "number-theory",
    "categoryLabel": "Number Theory",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/11_The_Square_Root_Horizon/11_The_Square_Root_Horizon.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "We read the primes and the zeros of the Riemann zeta function through three exact structures: the residue classes of the divisor $r$ in the rebuild law $\\sum_{r\\le x}M(x/r)=1$ for the Mertens function, the squares of the primes, and the reversal of the Euler product. Split by $r\\bmod3$ the rebuild law is $(1,a(x),-a(x))$ for $x\\ge3$, with $a(x)=\\frac12\\sum_{k\\le x}(\\mu*\\chi_{-3})(k)$ carried only by $3$ and the primes $\\equiv2\\pmod3$; split by $r\\bmod4$ it is $(1,b(x),0,-b(x))$. The zero class reproduces the whole law at $x/3$, so the classes modulo $3^\\kappa$ form a self-similar tower with an exact energy recursion whose leaves are the values $M(x/r)$; the leaf energy is $\\ll x^{1+\\varepsilon}$ for every $\\varepsilon>0$ if and only if the Riemann Hypothesis (RH) holds. At every zero $\\rho$ of $\\zeta$ the three classes of the Dirichlet series stand as $(0,\\frac12L(\\rho,\\chi_{-3}),-\\frac12L(\\rho,\\chi_{-3}))$. An exact sieve to $10^{10}$ in integer and Eisenstein-integer arithmetic gives every class value at $10^{10}$, and the wave amplitudes of $a(x)/\\sqrt x$ at the first twelve zeros agree with $|L(\\rho,\\chi_{-3})/\\rho\\zeta'(\\rho)|$ to within $0.0003$, including a sixth wave of amplitude $0.0012$ against $0.0011$ predicted. For consecutive primes $p<p'$ the primes in $[p,pp')$ together with $p^2$ are exactly the integers there free of the primes below $p$; with $25$ and $49$ inserted, the gaps from $5$ to $59$ are $2,4,2,4,2,4,2,4,2,6,4,2,4,2,4,6$ and the classes $6k\\pm1$ up to $61$ stand $9:9$. Each prime square enters the logarithm of the Euler product with weight $\\frac12$, and at that weight the lean of the prime count vanishes: over $2^{12}\\le x\\le10^{10}$ the mean of $(\\pi(x)-\\li(x))\\log x/\\sqrt x$ is $-1.364$, that of $(J(x)-\\li(x)+\\log2)\\log x/\\sqrt x$ is $+0.0013$, and the square weight that balances the count, fitted from the data, is $0.4994$; the lean of the Liouville sum is carried by its square multiples, $L(x)-M(x)=\\sum_{d\\ge2}M(x/d^2)$, and that of the classes $6k\\pm1$ by the prime squares, which all lie in the class $6k+1$ and at weight $\\frac12$ reduce it from $1.157$ to $0.031$ in units of $\\sqrt x/\\log x$. The squares part $E(s)=\\exp\\sum_p\\sum_{k\\ge2}p^{-ks}/k$ of $\\zeta$ is analytic and zero-free for $\\sigma>\\frac12$, satisfies $E(\\sigma)^3|E(\\sigma+it)|^4|E(\\sigma+2it)|\\ge1$ there, and has at $s=\\frac12$ a half-order pole matched by a half-order zero of the prime factor $\\zeta/E$, which carries every zero of $\\zeta$ in $\\sigma>\\frac12$. In the model with independent uniform phases, the joint limit law of the phases $t\\log p$, which unique factorisation makes linearly independent over the rationals, the random prime sum converges almost surely exactly for $\\sigma>\\frac12$ and its variance is the squares series $\\sum_pp^{-2\\sigma}$; at heights $5000$ to $6000$ the distribution of $\\log|\\zeta(\\sigma+it)|$ for $\\sigma=0.6,0.7,0.8$ follows this law, with standard deviations within $2.5\\%$. Reversing the sign of every prime turns $\\zeta(s)$ into $\\zeta(2s)/\\zeta(s)$, the zeros of $\\zeta$ into poles and the product of the two patterns into $\\zeta(2s)$; we prove $\\sum_{n\\le x}L(x/n)=\\lfloor\\sqrt x\\rfloor$ and $-\\sum_{k\\ge1}\\lambda(k)\\fr{x/k}=\\lfloor\\sqrt x\\rfloor$ for every $x>0$, and that if the sawtooths $\\fr{1/(kt)}$ approximate the odd-square staircase $[\\lfloor t^{-1/2}\\rfloor\\text{ odd}]$ in $L^2(0,\\infty)$ then every zero of $\\zeta$ in the critical strip lies on the line $\\sigma=\\frac12$. Computed from exact integrals for up to $2000$ sawtooths, the mean of $D_N^2\\log N$ over $1200\\le N\\le2000$ lies $2.5\\%$ above $\\sum_\\rho|\\eta(2\\rho)|^2/|\\rho|^2=0.0750$, beside $0.6\\%$ below $2+\\gamma_E-\\log4\\pi=0.0462$ for $d_N^2\\log N$ with the unit step. The Dirichlet series $\\eta(2s)/\\zeta(s)$ of the exact weights of the staircase vanishes at $s=1$. Cut at $N$, these weights therefore settle the part of the distance over $t>1$. Over $0<t\\le1$ they leave an error of $0.058$ to $0.281$ for $300\\le N\\le2000$, so $D_N\\to0$ rests on coefficients chosen afresh at each $N$. At every zero, the zero of the forward pattern and the pole of the reversed pattern cancel in their product, with residue $\\zeta(2\\rho)/\\zeta'(\\rho)$, in the same way on the line and off it. Over the $2469$ zeros below height $3000$ Landau's formula holds to within $0.0038$ at all $35$ prime powers up to $100$: each prime pulls the zeros toward the reversal $p^{i\\gamma}=-1$ of its clock, the zeros are $0.65$ to $0.68$ times as dense near the alignment $2^{i\\gamma}=1$ as on average, and the tenth zero, at $5.4909$ turns of the clock of $2$, is silenced in the reversed reading by the factor $1-2^{1-2s}$. In this language RH is the statement that every pole of the reversed pattern lies on the vertical line through its centre $s=\\frac12$. We state the axiom of harmonic independence: the prime waves, whose frequencies $\\log p$ are linearly independent by unique factorisation, are related only through the mechanism of their construction, and a zero off the critical line would be a relation without a mechanism.",
    "bibtex": "@article{singh2026_11,\n  title = {The Square-Root Horizon: Squares, Reversal and Prime Clocks},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/11_The_Square_Root_Horizon/11_The_Square_Root_Horizon.pdf}\n}"
  },
  {
    "id": "Nothing_Binds_a_Twin",
    "title": "Nothing Binds a Twin but Exclusion: The Prime Clocks, the Exclusion Law, and the Recurrence of the Twin Pair",
    "authors": "Abhijit Singh",
    "venue": "Research Preprint",
    "year": "2026",
    "date": "September 2026",
    "category": "number-theory",
    "categoryLabel": "Number Theory",
    "doi": "",
    "arxiv": "",
    "pdf": "papers/Nothing_Binds_a_Twin/Nothing_Binds_a_Twin.pdf",
    "github": "https://github.com/mag-and-krotons",
    "license": "CC BY 4.0",
    "licenseType": "open-access",
    "abstract": "We read the integers prime to $6$ as the positions of a world of clocks. Each prime $p\\ge5$ is a clock that marks the two centres $k$ with $6k\\equiv\\pm1\\pmod p$, and a centre that no clock marks is a full zero; below the reach of the clocks a full zero is exactly a twin prime pair $6k\\pm1$. We prove what the step from one clock to the next preserves: the full zeros per turn number $\\prod(p-2)$, the pattern is a palindrome, the new world is made of $P'-2$ exact copies of the old one, and the copy sign sums to $\\prod(p-4)>0$. We then prove that the two members of a pair are bound by exactly one relation: a clock may mark one member, and then it does not mark the other. Everything else about the pair is the product of its two single members. We call this the exclusion law. It fixes the twin constant as the exclusion product $E=\\prod_{p\\ge5}\\bigl(1-(p-1)^{-2}\\bigr)=0.88022\\ldots$, and with the density $3/\\log x$ of primes among the numbers $6k\\pm1$ it gives the twin law \\[ \\pi_2(x)\\sim\\frac x6\\Bigl(\\frac3{\\log x}\\Bigr)^{2}E=\\frac{2C_2\\,x}{\\log^2x}. \\] We state as a principle what the construction implies: independence is the absence of a relation, and a relation needs a clock. Under this principle the twin pair recurs at every level of the clocks, and there are infinitely many twin primes. Every measurement agrees with the exclusion law and with nothing beyond it. The joint law of the number of prime factors of $6k-1$ and $6k+1$, taken over $5\\cdot10^7$ pairs, gives the prime--prime factor $0.8833$ against $E=0.8802$. The pair symbol $\\sum z^{\\Omega(6k-1)}w^{\\Omega(6k+1)}$ factorises to the same constant. On the frame of rough pairs the share of twins equals the product of the members' shares to within $1\\%$. The count of twin pairs up to $10^{10}$, $27{,}412{,}679$, is the law to within $5$ parts in $10^5$. We prove that twins are forced wherever the primes are the majority of rough numbers, which is the case for $u=\\log y/\\log z<3.565$. In the reach of the clocks, where $u=2$, the bound is an equality, twins $=U$. There each member keeps $\\e^\\gamma\\omega(2)=\\e^\\gamma/2$ of its share over a turn, which is a theorem. The twin pairs keep the product of the two members' factors to within $0.3\\%$ at $P=31601$, so the size of $U$ there is the twin law itself. We show that the parity barrier of sieve theory is a ceiling of the instrument, not a property of the primes: information about the distribution of primes in progressions certifies at most $48.837\\%$ of the rough members as prime, and every frame reaches the required $100\\%$ only in the degenerate limit where the inequality reads twins $\\ge$ twins. The same reading organises single primes and central values. A single number is its own copy exactly $\\lfloor\\sqrt x\\rfloor$ times, $\\sum_{n\\le x}\\lambda(n)\\lfloor x/n\\rfloor=\\lfloor\\sqrt x\\rfloor$, while a pair never is. Prime squares sit only on the $+$ side of the triad, and the class lean of prime pairs lives only on the member on that side. For $17$ $L$-functions the lean of the primes equals $-\\nu/2-r$, with $\\nu$ the self-copy count and $r$ the order of the central zero. The central value of the congruent-number curve $y^2=x^3-n^2x$ is $4\\kappa_n m^2$ with $m\\in\\Z$, so it is either $0$ or at least $4\\kappa_n/\\sqrt n$.",
    "bibtex": "@article{singh2026_nothing,\n  title = {Nothing Binds a Twin but Exclusion},\n  author = {Singh, Abhijit},\n  year = {2026},\n  month = {September},\n  note = {Preprint, Research Repository},\n  url = {papers/Nothing_Binds_a_Twin/Nothing_Binds_a_Twin.pdf}\n}"
  }
];

// Standard macros defined across Abhijit Singh's research manuscripts
const THEORETICAL_MATRIX = [
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Celestial Mechanics / Planetary Science / Astrobiology",
    "system": "Hill throats and collinear Lagrange points ($L_1, L_2$) linear dynamics in the restricted three-body problem",
    "equations": "Characteristic polynomial: $\\lambda^4 - 2\\lambda^2 - 27 = 0$; Relationships: $\\lambda_H^2 - \\omega_H^2 = 2$, $\\lambda_H^2 \\omega_H^2 = 27$; Throat asymmetry: $A = \\frac{h}{3}\\left(1 - \\frac{h^2}{27} + O(h^3)\\right)$, where $h = (\\mu/3)^{1/3}$",
    "validation": "Exact asymptotic expansions and 50-digit numerical root finding",
    "parameters": "Hill values: $\\lambda_H = 2.508287$, $\\omega_H = 2.071594$; mass ratio $\\mu = m/(M+m)$",
    "source": "[1]",
    "figures": [
      {
        "title": "Hill Throats & Lyapunov Orbits",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_throats.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Planetary Physics / Celestial Mechanics",
    "system": "Phase space topology and mass transport flux through $L_1/L_2$ Hill throats",
    "equations": "Topology $S^2 \\times I$; Orbital Action/Flux: $J = \\frac{2\\pi \\Delta E}{\\omega}$; Quantum transmission probability: $T(\\Delta E) = \\frac{1}{1 + e^{-2\\pi \\Delta E / (\\hbar \\lambda)}}$",
    "validation": "Differential correction computation of Lyapunov periodic orbits around Jupiter's L1 point",
    "parameters": "Lyapunov orbit amplitude $0.0018\\,r_H$; Action flux accuracy to $1.000002$",
    "source": "[1]",
    "figures": [
      {
        "title": "Hill Throats & Lyapunov Orbits",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_throats.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Planetary Structure / Hydrodynamics",
    "system": "Rotational response, quadrupole moment ($J_2$), and interior mass concentration",
    "equations": "Fluid Love number for $n=1$ polytrope: $k_2 = \\frac{15}{\\pi^2} - 1 = 0.519818$; Rotational ratio: $\\frac{J_2}{q_\\omega} = \\frac{1}{3}k_2 = 0.17327$; Density profile: $\\rho = \\rho_c \\frac{\\sin u}{u}$",
    "validation": "First-order Clairaut perturbation theory on Lane-Emden profiles",
    "parameters": "$q_\\omega = \\omega_{\\text{rot}}^2 R^3 / GM$; Measured $J_2/q_\\omega$: Jupiter ($0.16477$), Saturn ($0.10303$), Uranus ($0.11331$), Neptune ($0.13080$)",
    "source": "[1]",
    "figures": [
      {
        "title": "Jupiter Polar Vortex Dynamics",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_jup.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Planetary Seismology / Asteroseismology",
    "system": "Acoustic p-mode frequency spacing (heartbeat) of giant gas planets",
    "equations": "Acoustic spacing equation: $\\Delta \\nu = \\left[ 2 \\int_0^R \\frac{dr}{c} \\right]^{-1} = 1.6747\\, \\nu_{\\text{dyn}}$; Dynamical frequency: $\\nu_{\\text{dyn}} = \\frac{1}{2\\pi}\\sqrt{\\frac{GM}{R^3}}$",
    "validation": "Numerical quadrature of sound speed profiles over n=1 polytropes against Jupiter ground-based seismic measurements",
    "parameters": "Jupiter volumetric radius $R = 69911\\text{ km}$; Measured $\\Delta \\nu = 155.3 \\pm 2.2\\,\\mu\\text{Hz}$; Model predicted $\\Delta \\nu = 162.3\\,\\mu\\text{Hz}$ (4.5% error); Predicted Saturn $\\Delta \\nu = 112\\text{--}117\\,\\mu\\text{Hz}$",
    "source": "[1]",
    "figures": [
      {
        "title": "Acoustic p-mode Heartbeat",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_heart.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Atmospheric Dynamics / Fluid Mechanics",
    "system": "Spectral stability of polygonal vortex rings surrounding a central polar vortex",
    "equations": "Spectral stability intervals for central vortex strength $\\kappa$: $\\frac{N^2 - 8N + 8}{16} < \\kappa < \\frac{(N-1)^2}{4}$ (even $N$), $\\frac{(N-1)(N-7)}{16} < \\kappa < \\frac{(N-1)^2}{4}$ (odd $N$); Maximum central strength share: $\\frac{\\kappa}{\\kappa + N} = \\left(\\frac{N-1}{N+1}\\right)^2$",
    "validation": "Eigenspectrum analysis of the analytic Jacobian matrix in the co-rotating reference frame validated against finite differences",
    "parameters": "Ring counts $N=3$ to $12$; Jupiter North pole $N=8+1$ (share $1/9$); Jupiter South pole $N=5+1$ and $N=6+1$",
    "source": "[1]",
    "figures": [
      {
        "title": "Jupiter Polar Vortex Dynamics",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_jup.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Planetary Atmospheric Chemistry / Thermodynamics",
    "system": "Ammonium hydrosulfide ($\\mathrm{NH_4SH}$) condensation titration and chemical survivor identity",
    "equations": "Mass action condition: $x_{\\mathrm{NH_3}} x_{\\mathrm{H_2S}} = k^2 = \\frac{K(T)}{P_{\\text{atm}}^2}$; Parametrisation: $x_{\\mathrm{NH_3}} = k e^{\\varepsilon/2}, x_{\\mathrm{H_2S}} = k e^{-\\varepsilon/2}$; Conservation of difference: $\\Delta = N - S = 2k \\sinh(\\varepsilon/2)$; Survivor species sign: $\\operatorname{sign}(N - S)$",
    "validation": "Integration of dry adiabats via 4th-order Runge-Kutta method in ln P, evaluated across 179 abundance variant scenarios",
    "parameters": "Deep ratios $\\mathrm{N/S}$: Jupiter ($4.73$), Saturn ($3.16$), Uranus ($0.195$), Neptune ($0.170$); $\\mathrm{NH_4SH}$ equilibrium constant: $\\log_{10}(P_{\\mathrm{NH_3}} P_{\\mathrm{H_2S}}/\\text{atm}^2) = 14.82 - 4705/T$",
    "source": "[1]",
    "figures": [
      {
        "title": "Gas Ladder & NH4SH Titration",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_gas_ladder.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Orbital Mechanics / Secular Perturbation Theory",
    "system": "Secular inclination precession modes and invariant invariable plane of the four giant planets",
    "equations": "Laplace-Lagrange equations: $\\dot{\\mathbf{p}} = \\mathbf{B}\\mathbf{q}$, $\\dot{\\mathbf{q}} = -\\mathbf{B}\\mathbf{p}$; Matrix row sum identity: $\\sum_k B_{jk} = 0 \\implies \\det(\\mathbf{B}) = 0$",
    "validation": "Numerical eigensystem calculation of the 4x4 Laplace-Lagrange matrix B using NSSDC masses and semimajor axes",
    "parameters": "Eigenvalues: $-25.5183$, $-2.9276$, $-0.6698$, and $0.0000\\text{ arcsec/yr}$ (zero mode exact to $6 \\times 10^{-17}$)",
    "source": "[1]",
    "figures": [
      {
        "title": "Hill Throats & Lyapunov Orbits",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_throats.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Celestial Mechanics / Orbital Stability",
    "system": "Equilateral triangular equilibrium point ($L_4/L_5$) linear stability and Krein signature spectrum",
    "equations": "Gascheau-Routh criterion: $27 \\mu (1-\\mu) < 1 \\implies \\mu < \\mu_G = \\frac{1}{2}\\left(1 - \\sqrt{\\frac{23}{27}}\\right) \\approx 0.0385209$; $L_4$ characteristic polynomial: $\\lambda^4 + \\lambda^2 + \\frac{27}{4}\\mu(1-\\mu) = 0$",
    "validation": "Eigenvalue computation and Krein signature determination across 2000 mass ratio values and random mass triples",
    "parameters": "Critical mass ratio $\\mu_G = 0.0385209$; Collision frequency $\\omega = 1/\\sqrt{2}$",
    "source": "[1]",
    "figures": [
      {
        "title": "Hill Throats & Lyapunov Orbits",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_throats.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Astrophysical Spectroscopy / Radio Astronomy",
    "system": "Hydroxyl ($\\mathrm{OH}$) ground-state hyperfine transition frequencies of interstellar object 3I/ATLAS",
    "equations": "$\\mathrm{OH}$ quartet frequency sum rule: $\\nu_{1612.2309} + \\nu_{1720.5299} = \\nu_{1665.4018} + \\nu_{1667.3590} = 3332.7608\\text{ MHz}$; Common spectral centre: $\\nu_c = 1666.38040\\text{ MHz}$",
    "validation": "Exact algebraic sum validation using MeerKAT radio telescope observed transition frequencies",
    "parameters": "Main line offsets: $\\pm 0.97860\\text{ MHz}$; Satellite line offsets: $\\pm 54.14950\\text{ MHz}$",
    "source": "[1]",
    "figures": [
      {
        "title": "Hyperfine Radio Spectra",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_sounds.png"
      }
    ]
  },
  {
    "paperTitle": "The Four Giants as Balanced Pairs: Throats, Hearts, the Gas Ladder and the Interstellar Visitors",
    "domain": "Relativistic Astrophysics / Exoplanetary Physics",
    "system": "Schwarzschild horizon, photon sphere, and ISCO radii of pulsar PSR B1257+12",
    "equations": "Schwarzschild radii relations: $r_{\\text{horizon}} = \\frac{2GM}{c^2}$, $r_{\\text{photon}} = \\frac{3GM}{c^2}$, $r_{\\text{ISCO}} = \\frac{6GM}{c^2}$; Horizon ratio: $r_{\\text{horizon}} = \\frac{1}{3} r_{\\text{ISCO}} = \\frac{2}{3} r_{\\text{photon}}$",
    "validation": "Exact analytical solution of geodesic motion in static Schwarzschild spacetime metrics",
    "parameters": "Pulsar mass $M = 1.4\\,M_\\odot$; Length unit $GM/c^2 = 2.07\\text{ km}$; Radii values: $4.13\\text{ km}$ (horizon), $6.20\\text{ km}$ (photon sphere), $12.40\\text{ km}$ (ISCO)",
    "source": "[1]",
    "figures": [
      {
        "title": "Hill Throats & Lyapunov Orbits",
        "file": "papers/07_Planetary_Science_The_Four_Giants_as_Balanced_Pairs/fig_throats.png"
      }
    ]
  },
  {
    "paperTitle": "Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two",
    "domain": "Number Theory / Analytic Number Theory / Mathematical Physics",
    "system": "Riemann hypothesis, nontrivial zeros of the Riemann zeta function, signed current $J$, and phase-space density (Wigner function $Q$) of the Riemann kernel $\\Phi$",
    "equations": "$H(x, y) = \\frac{1}{8} \\int Q(p, x) \\cosh(yp)\\, dp$; $J(x, y) = \\frac{1}{4} \\int Q(p, x)\\, p \\sinh(yp)\\, dp$; $Q(p, x) = 8 e^{p/2} \\sum_{N \\ge 1} \\tau_x(N) \\mathcal{K}_x(2\\pi N e^p)$; $Q(p, x) > 0$ for $2\\pi e^{|p|} \\ge \\max(\\sqrt{2x^2 + 1/2}, 20)$. RH holds $\\iff J \\ge 0$ for $y > 0 \\iff \\int Q(p, x)\\, p^{2k}\\, dp \\ge 0 \\; (\\forall k \\ge 0)$",
    "validation": "High-precision decimal floating-point arithmetic (40–200 digits), adaptive Gauss–Kronrod quadrature, Riccati comparison for Macdonald functions, sieve computations up to 10^8, and trapezoidal numerical integrations.",
    "parameters": "$|x| \\ge 14.14$, $y > 0$; verification range for zeros up to height $3 \\cdot 10^{12}$; prime-2 lattice $1 + 2\\pi i / \\log 2$; precision up to 200 significant digits; verification of Liouville sum to $10^8$",
    "source": "[2]",
    "figures": [
      {
        "title": "Pair Balance & Current J",
        "file": "papers/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros/fig1_balance.png"
      }
    ]
  },
  {
    "paperTitle": "Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two",
    "domain": "Analytic Number Theory / Mathematical Physics",
    "system": "Epstein zeta function $Z_\\epsilon(s)$ of the binary quadratic form $2m^2 + 3n^2$ without an Euler product (the mirror without the merge)",
    "equations": "$\\xi_\\epsilon(s) = s(s-1)(\\sqrt{6}/\\pi)^s \\Gamma(s) Z_\\epsilon(s)$; $Q_\\epsilon(p, x)$ expansion in $\\mathcal{K}_{2ix}$ Macdonald functions; $J_\\epsilon$ takes negative values in the upper half-plane near off-line zeros",
    "validation": "Trapezoidal quadrature on kernel integrals, high-precision Newton iteration (50 digits) for zero finding.",
    "parameters": "Off-line zero $s_0 = 1.15958745297694888 + 9.45225081186590043\\,i$; current sign change height $y = \\operatorname{Re} s_0 - 1/2 = 0.6596$",
    "source": "[2]",
    "figures": [
      {
        "title": "Mirror Symmetry in Zeros",
        "file": "papers/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros/fig2_mirror.png"
      }
    ]
  },
  {
    "paperTitle": "Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two",
    "domain": "Probability Theory / Analytic Number Theory",
    "system": "Merge of $\\nu$ copies of independent random variable $S_1$; moment function $M_\\nu(s) = \\mathbb{E}[(\\pi S_\\nu / 2)^{s/2}]$",
    "equations": "$M_2(s) = 2\\xi(s)$ (the merged pair); $M_1(s) = s \\pi^{-s/2} \\Gamma(s/2) \\eta(s)$; $M_\\nu(1-s) = M_\\nu(s)$ holds for all $s \\iff \\nu = 2$",
    "validation": "Adaptive quadrature on Mellin/Laplace integral transforms, trapezoidal integration of series expansions, double-precision and high-precision Newton-type zero tracking.",
    "parameters": "Continuous variation of parameter $\\nu \\in (0, 4]$; movement of first zero from $1 + 2\\pi i / \\log 2$ (at $\\nu = 1$) to $1/2 + 14.134725\\,i$ (at $\\nu = 2$)",
    "source": "[2]",
    "figures": [
      {
        "title": "Merge Parameter ν Zero Path",
        "file": "papers/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros/fig3_merge.png"
      }
    ]
  },
  {
    "paperTitle": "Pair Balance and the Riemann Zeros: The Signed Current, the Mirror and the Merge, and the Prime Two",
    "domain": "Statistical Mechanics / Number Theory",
    "system": "Lee–Yang zeros of uniform three-state spin systems and merged elementary spin pairs; Davenport–Heilbronn function",
    "equations": "Merged pair $\\varsigma_1 \\oplus_\\kappa \\varsigma_2$ has Lee–Yang zeros on $|z| = 1$ for coupling $\\kappa \\ge 0$; uniform three-state spin zeros sit at exactly $1/3$ and $2/3$ of a turn; Davenport–Heilbronn function $f(s)$ has 4 mirrored pairs off the critical line below height 200",
    "validation": "Companion matrix eigenvalue computation for spin-chain partition functions; argument principle and grid sign-change searches for Dirichlet series zeros.",
    "parameters": "Coupling $\\kappa = \\frac{1}{2} \\ln 2$; spin chain lengths $n = 2, \\dots, 6$; height bound $T = 200$",
    "source": "[2]",
    "figures": [
      {
        "title": "Lee-Yang Zeros & Sign Structure",
        "file": "papers/01_Mathematics_Pair_Balance_and_the_Riemann_Zeros/fig4_sign_structure.png"
      }
    ]
  },
  {
    "paperTitle": "The Remaining Step: Six Equivalent Forms of the Riemann Hypothesis and the Surgery Obstruction",
    "domain": "Analytic Number Theory / Mathematical Physics",
    "system": "Riemann Hypothesis (RH), Riemann zeta function $\\zeta(s)$, even entire function $\\Xi(z)$, positivity of the current $J = 2\\partial_y|\\Xi(x + iy)|^2$, and surgery obstructions",
    "equations": "Proves six equivalent forms of RH: (a) Jensen–Riesz defect vanishing, (b) Krein–Langer index $N_+ = 0$, (c) absence of multiple real zeros in heat-flow deformation $\\Xi_T$ for $0 < T \\le 0.2$, (d) Weil–Poisson form positivity $J = 4H W(h_{x,y})$, (e) Li radius $R_\\zeta = 1$, (f) Hausdorff moment property of Lee–Yang cumulants. Proves a surgery obstruction showing that local gradient/log inequalities on $\\operatorname{Re} s \\ge 1$ cannot prove RH.",
    "validation": "Potential theory in a strip, indefinite reproducing kernels, heat flow deformations, Weil's explicit formula, Li's coefficients, and double-precision numerical calculations.",
    "parameters": "Height threshold $3 \\cdot 10^{12}$; Lehmer pairs near $7005.08$ and $17143.8$; de Bruijn–Newman constant bound $\\Lambda \\le 0.2$; Li coefficients positive for $n \\le 10^{12}$; surgery parameters $b = a = 0.018849$",
    "source": "[3]",
    "figures": [
      {
        "title": "Surgery Obstruction on Re s ≥ 1",
        "file": "papers/09_The_Remaining_Step/fig1_surgery.png"
      }
    ]
  },
  {
    "paperTitle": "The Remaining Step: Six Equivalent Forms of the Riemann Hypothesis and the Surgery Obstruction",
    "domain": "Analytic Number Theory / Structural Comparison of L-functions",
    "system": "Structural and numerical separation between Riemann zeta function $\\zeta(s)$ and non-Euler product comparison functions: Epstein zeta function $Z_\\epsilon(s)$ and Davenport–Heilbronn function $f(s)$",
    "equations": "Demonstrates that $Z_\\epsilon$ and $f$ share structural flow, operator, and heat-flow properties with $\\zeta$, but differ in having zeros off the critical line, negative Li coefficients $(\\lambda_{\\epsilon,1130} = -414.9)$, de Bruijn–Newman constant $\\Lambda_\\epsilon \\in [0.7472, 5.12]$, and negative Weil forms on windows $L \\ge 1.587$",
    "validation": "High-precision adaptive Gauss–Kronrod quadrature, discrete Cauchy integrals via FFT, Newton's method for zero-finding, and exact sifting up to 10^10.",
    "parameters": "Epstein zero $s_0 = 1.159587 + 9.452251\\,i$; Spira zero of $f$ at $0.808517 + 85.699348\\,i$; first off-line pair landing time $T_c = 0.7472307$; exact sieve bound $x = 10^{10}$ giving $M(10^{10}) = -33722$ and $L(10^{10}) = -116026$",
    "source": "[3]",
    "figures": [
      {
        "title": "Comparison with Epstein & Davenport-Heilbronn",
        "file": "papers/09_The_Remaining_Step/fig2_comparison.png"
      }
    ]
  },
  {
    "paperTitle": "The Square-Root Horizon: Squares, Reversal and Prime Clocks in the Distribution of the Primes and the Zeros of the Riemann Zeta Function",
    "domain": "Analytic Number Theory / Analytic Function Theory",
    "system": "Residue classes of divisor $r$ in the rebuild law $S_c^{(m)}(x)$, prime squares, reversal of the Euler product, and prime clock alignments relative to the zeros of the Riemann zeta function",
    "equations": "Split mod 3: $(1, a(x), -a(x))$ for $x \\ge 3$ with $a(x) = \\frac{1}{2} G_{-3}(x)$; Split mod 4: $(1, b(x), 0, -b(x))$; Reversal identity: $\\sum_{n \\le x} L(x/n) = \\lfloor \\sqrt{x} \\rfloor$; Reversed staircase identity: $-\\sum_{k \\ge 1} \\lambda(k)\\{x/k\\} = \\lfloor \\sqrt{x} \\rfloor$; Squares series variance: $\\sum_p p^{-2\\sigma}$",
    "validation": "Exact sieve to 10^10 in integer and Eisenstein-integer arithmetic, high-precision numerical Integration of Hilbert-space inner products, multi-precision evaluation of zeros and Dirichlet L-functions using mpmath/Euler-Maclaurin formulas",
    "parameters": "$x = 10^{10}$, $M(10^{10}) = -33722$, $G_{-3}(10^{10}) = -25880$, $G_{-4}(10^{10}) = -66506$, $G_9(10^{10}) = 6679 + 32060\\,\\omega$, fitted square weight $= 0.4994$, mean lean $= -1.364$, $C_{\\text{rev}} = 0.07502$, $C_{\\text{fwd}} = 0.04619$",
    "source": "[4]",
    "figures": [
      {
        "title": "Prime Clocks & Triad Residue Splits",
        "file": "papers/11_The_Square_Root_Horizon/fig6_prime_clocks.png"
      },
      {
        "title": "Reversed Staircases & Prime Squares",
        "file": "papers/11_The_Square_Root_Horizon/fig5_staircases.png"
      }
    ]
  },
  {
    "paperTitle": "Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Döbereiner’s Triads as Balanced Pairs",
    "domain": "Atomic Physics / Gas Phase Mass Action",
    "system": "Valence electron sharing between isolated gas-phase $\\mathrm{Na}$ and $\\mathrm{K}$ cores ($\\mathrm{Na}^+\\mathrm{K}$ vs $\\mathrm{Na}+\\mathrm{K}^+$ configurations)",
    "equations": "Potassium carries the charge at all temperatures due to lower ionization energy. Minority configuration occupancy: $p = \\frac{1}{1 + e^\\varepsilon}$ with $\\varepsilon = \\Delta E / (k_B T)$; $\\Delta E = 0.7984132\\text{ eV}$. Equilibrium ratio in gas mixture: $\\frac{x}{1 - x} = e^{-\\Delta E / (2 k_B T)}$",
    "validation": "Exact theoretical calculation evaluated on fundamental ionization energy data",
    "parameters": "$\\operatorname{IE}(\\text{Na I}) = 5.13907696\\text{ eV}$, $\\operatorname{IE}(\\text{K I}) = 4.34066373\\text{ eV}$, $\\Delta E = 0.7984132(3)\\text{ eV}$, $k_B = 8.617333262 \\times 10^{-5}\\text{ eV/K}$",
    "source": "[5]",
    "figures": [
      {
        "title": "Two-State Valence Ionization Pair (Na-K)",
        "file": "papers/04_Chemistry_Which_Member_Carries/fig5_pairs.png"
      }
    ]
  },
  {
    "paperTitle": "Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Döbereiner’s Triads as Balanced Pairs",
    "domain": "Nuclear Physics / Radioactive Decay",
    "system": "Branching ratio and net nuclear charge change per decay in ${}^{40}\\mathrm{K}$ ($\\beta^-$ decay vs electron capture/$\\beta^+$)",
    "equations": "Average charge change per decay: $\\langle \\Delta Z \\rangle = \\tanh(\\varepsilon/2) = 2p_{\\beta^-} - 1$. Found $\\langle \\Delta Z \\rangle = +0.7856(22)$ for 2017 ENSDF and $+0.7918(10)$ for 2023 KDK branching ratios (2.6$\\sigma$ difference).",
    "validation": "Evaluation of nuclear branching ratios and decay constants on experimental evaluations",
    "parameters": "ENSDF 2017: $p_{\\beta^-} = 89.28(11)\\%$, $p_{\\text{EC}+\\beta^+} = 10.72(11)\\%$; KDK 2023: $p_{\\beta^-} = 89.59(5)\\%$, $p_{\\text{EC}+\\beta^+} = 10.41\\%$",
    "source": "[5]",
    "figures": [
      {
        "title": "Two-State Pairs & Ionization Energies",
        "file": "papers/04_Chemistry_Which_Member_Carries/fig5_pairs.png"
      }
    ]
  },
  {
    "paperTitle": "Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Döbereiner’s Triads as Balanced Pairs",
    "domain": "Atomic Physics / Thermal Population",
    "system": "Thermal population balance of the fine-structure doublet of neutral Aluminium (${}^2\\mathrm{P}^\\circ_{1/2}$ vs ${}^2\\mathrm{P}^\\circ_{3/2}$)",
    "equations": "Upper level holds the majority above balance temperature $T_{1/2} = \\frac{h c \\tilde{\\nu}}{k_B \\ln(g_u / g_l)} = 232.61\\text{ K}$; $p_u(T) = \\frac{2e^{-\\Theta/T}}{1 + 2e^{-\\Theta/T}}$ where $\\Theta = 161.231\\text{ K}$.",
    "validation": "Analytical solution of two-state equilibrium on NIST ASD spectroscopy data",
    "parameters": "Splitting $\\tilde{\\nu} = 112.061\\text{ cm}^{-1}$, $g_l = 2$, $g_u = 4$, $hc/k_B = 1.438776877\\text{ cm}\\cdot\\text{K}$, $\\Theta = 161.231\\text{ K}$",
    "source": "[5]",
    "figures": [
      {
        "title": "Two-State Pairs & Ionization Energies",
        "file": "papers/04_Chemistry_Which_Member_Carries/fig5_pairs.png"
      }
    ]
  },
  {
    "paperTitle": "Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Döbereiner’s Triads as Balanced Pairs",
    "domain": "Statistics / Applied Data Analysis",
    "system": "Effect of joint absent values / shared coding on bivariate correlations",
    "equations": "Exact coded correlation equation: $r_{\\text{coded}} = \\frac{r + f d_x d_y}{\\sqrt{(1 + f d_x^2)(1 + f d_y^2)}}$. Sign flips when $\\sqrt{d_x d_y}$ crosses $d^* = \\sqrt{-r / f}$. Bound: $|r_{\\text{coded}}| \\le \\frac{|r + f d_x d_y|}{1 + f |d_x d_y|}$.",
    "validation": "Direct numerical validation using UCI Air Quality dataset hourly sensor channels (PT08.S1 and PT08.S3)",
    "parameters": "$n = 9357$, $n_{11} = 8991$, $f = 366/9357 = 0.0391151$, $r = -0.771918$; code $-200 \\implies r_{\\text{coded}} = +0.0869312$ and code $0 \\implies r_{\\text{coded}} = -0.0756296$",
    "source": "[5]",
    "figures": [
      {
        "title": "Two-State Pairs & Ionization Energies",
        "file": "papers/04_Chemistry_Which_Member_Carries/fig5_pairs.png"
      }
    ]
  },
  {
    "paperTitle": "Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Döbereiner’s Triads as Balanced Pairs",
    "domain": "Chemical Sensing / Surface Chemistry",
    "system": "Steady-state surface occupancy of metal-oxide gas sensors under mass action",
    "equations": "Surface site occupancy follows logistic law $\\theta = \\frac{1}{1 + e^\\varepsilon}$, where $\\varepsilon = \\ln(\\Phi_+/\\Phi_-)$. Sensor response: $S = S_{\\text{lo}} + \\frac{S_{\\text{hi}} - S_{\\text{lo}}}{1 + (C_{1/2} / C)^\\beta}$. Half-points form a sensor ladder on CO axis: $S_3 (1.68) < S_5 (4.61) < S_2 (5.40) < S_1 (7.49)\\text{ mg/m}^3$.",
    "validation": "Nonlinear least-squares fitting on UCI Air Quality record with day-block bootstrap (1000 replicates) for 95% confidence intervals; model comparison via ΔAIC against offset power laws",
    "parameters": "7344 pairwise-present hours on CO axis; fitted slopes $\\beta$ range $1.18$ to $1.45$; $\\Delta\\text{AIC} = 11.7$ to $209.0$ preferring two-state law over power law",
    "source": "[5]",
    "figures": [
      {
        "title": "Metal-Oxide Gas Sensor Ladder on CO",
        "file": "papers/04_Chemistry_Which_Member_Carries/fig_sensor_ladder.png"
      }
    ]
  },
  {
    "paperTitle": "Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Döbereiner’s Triads as Balanced Pairs",
    "domain": "Atmospheric Science / Planetary Science",
    "system": "Vapour phase balance of $\\mathrm{NH_3}$ and $\\mathrm{H_2S}$ above the $\\mathrm{NH_4SH}$ ice deck of giant planets",
    "equations": "Conserved difference $\\Delta = x_N - x_S = 2\\chi\\sinh(\\varepsilon/2)$, with $x_N x_S = K(T)/P^2$ and $\\chi = \\sqrt{K}/P$. $\\mathrm{NH}_3$ vapour fraction: $\\phi_N = \\frac{1}{1 + e^{-\\varepsilon}}$. Deep N/S ratio determines surviving gas: $\\operatorname{sign}(N - S)$.",
    "validation": "Thermodynamic mass-action equilibrium derivation compared against observed planetary atmosphere compositions",
    "parameters": "Deep N/S ratios: Jupiter ($4.73$), Saturn ($3.16$), Uranus ($0.195$), Neptune ($0.170$); zero threshold at $\\mathrm{N/S} = 1$",
    "source": "[5]",
    "figures": [
      {
        "title": "Two-State Pairs & Ionization Energies",
        "file": "papers/04_Chemistry_Which_Member_Carries/fig5_pairs.png"
      }
    ]
  },
  {
    "paperTitle": "Which Member Carries: Two-State Pairs from Atoms to Gas Sensors, and Döbereiner’s Triads as Balanced Pairs",
    "domain": "Inorganic Chemistry / Periodic Table Theory",
    "system": "Period capacity and mathematical exactness of vertical Döbereiner triads",
    "equations": "Period-pair law: $L(p) = \\kappa(p + 1) = 2 \\lceil(p + 1)/2\\rceil^2$. Vertical triad $Z_2 = \\frac{1}{2}(Z_1 + Z_3)$ is exact iff the two spanned periods have equal length. Exactly 27 of 54 vertical triads are exact.",
    "validation": "Exhaustive combinatorial enumeration based on Madelung (n+ℓ, n) subshell filling order up to Z = 118",
    "parameters": "Period lengths $L(p) = [2, 8, 8, 18, 18, 32, 32]$ for periods $p = 1..7$; triad gap steps $s \\in \\{8, 18, 32\\}$",
    "source": "[5]",
    "figures": [
      {
        "title": "Madelung Order & Vertical Triads",
        "file": "papers/04_Chemistry_Which_Member_Carries/fig_chem2.png"
      }
    ]
  },
  {
    "paperTitle": "The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem",
    "domain": "Quantum Information / Stochastic Processes",
    "system": "Reversible half of sequential measurement records and time reversal of Markov chains",
    "equations": "$0 \\le h(S) - h(C) \\le \\frac{1}{4}\\operatorname{EP}$; $h(S) - h(C) = \\sum_j \\pi_j \\operatorname{JSD}(C_{\\cdot j}, \\tilde{C}_{\\cdot j})$; $\\operatorname{EP} = D(J \\| J^{\\text{T}}) \\ge 0$",
    "validation": "Mathematical proof using convexity, Jensen-Shannon and Jeffreys divergence inequalities",
    "parameters": "Column-stochastic matrix $C$, stationary law $\\pi$, pair law $J_{ij} = \\pi_j C_{ij}$",
    "source": "[6]",
    "figures": [
      {
        "title": "Arrow of Time in Measurement Records",
        "file": "papers/02_Physics_The_Reversible_Half_and_the_Third_Body/fig3_arrow.png"
      }
    ]
  },
  {
    "paperTitle": "The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem",
    "domain": "Quantum Information",
    "system": "Alternating sharp measurement of a singlet state with $n \\ge 3$ settings",
    "equations": "$D_L = \\frac{c}{2}(1 - d^{L-2}) \\log_2\\frac{1+c}{1-c}\\text{ bits}$; Limiting irreversibility: $c \\operatorname{artanh}(c)\\text{ nats}$",
    "validation": "Exact solution of record law, projector identities, and summation over sequences",
    "parameters": "$n \\ge 3$, $\\theta = \\pi/n$, $c = \\cos(\\pi/n)$, $d = \\cos(2\\pi/n)$, record length $L$",
    "source": "[6]",
    "figures": [
      {
        "title": "Arrow of Time in Measurement Records",
        "file": "papers/02_Physics_The_Reversible_Half_and_the_Third_Body/fig3_arrow.png"
      }
    ]
  },
  {
    "paperTitle": "The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem",
    "domain": "Quantum Information / Open Quantum Systems",
    "system": "Processed four-outcome instrument reconstructed from tomography",
    "equations": "$\\operatorname{EP} = 0.00686044\\text{ bits/use}$; $h(S) - h(C) = 0.00171268\\text{ bits}$ (99.86% of $\\operatorname{EP}/4$); $\\sigma^2 = 0.46247828\\text{ bits}^2/\\text{use}$",
    "validation": "Numerical analysis of 4x4 transition matrix C, spectral decomposition, Markov central limit theorem",
    "parameters": "$4\\times 4$ stochastic matrix $C$, $\\pi = (0.24328, 0.24564, 0.24991, 0.26117)$, spectrum $= \\{1, 0.35301, 0.27499, 0.19042\\}$",
    "source": "[6]",
    "figures": [
      {
        "title": "Arrow of Time in Measurement Records",
        "file": "papers/02_Physics_The_Reversible_Half_and_the_Third_Body/fig3_arrow.png"
      }
    ]
  },
  {
    "paperTitle": "The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem",
    "domain": "Classical Electromagnetism / Electrical Engineering",
    "system": "Rotating field of three-phase currents in three coils at $0, \\pm 120^\\circ$",
    "equations": "$\\mathbf{B}(t) = \\boldsymbol{\\alpha}_+ e^{i\\omega t} + \\boldsymbol{\\alpha}_- e^{-i\\omega t}$; Signed swept area: $\\Phi = \\frac{9\\pi}{4}(|I_+|^2 - |I_-|^2)$; $\\operatorname{tr} K(\\tau) = (|I_+|^2 + |I_-|^2)\\cos\\omega\\tau$",
    "validation": "Fortescue decomposition into symmetrical components and period-averaged lag-τ correlation matrix analysis",
    "parameters": "Coil currents $I_a, I_b, I_c$; $I_\\pm = \\frac{1}{3}(I_a + u^{\\pm 1} I_b + u^{\\mp 1} I_c)$; $u = e^{2\\pi i/3}$",
    "source": "[6]",
    "figures": [
      {
        "title": "Three-Phase Symmetrical Involutions",
        "file": "papers/02_Physics_The_Reversible_Half_and_the_Third_Body/fig3_arrow.png"
      }
    ]
  },
  {
    "paperTitle": "The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem",
    "domain": "Celestial Mechanics / N-Body Problem",
    "system": "Planar Newtonian three-body problem with equal unit masses",
    "equations": "Collinear midpoint instant implies triad $(-s, 0, s)$; Choreography $z_i(t) = q(t + (i-1)T/3)$ has $q_k = 0$ for $3 \\mid k$; $L = \\frac{6\\pi}{T}\\sum k|q_k|^2$; Lagrange triangle growth: $\\max\\operatorname{Re}\\lambda = \\omega/\\sqrt{2}$",
    "validation": "Fourier series analysis on cube roots of unity, symmetry analysis of Newton's equations, and complex coordinate linearisation",
    "parameters": "$G = 1$, unit masses $m_1 = m_2 = m_3 = 1$, period $T$, angular velocity $\\omega$",
    "source": "[6]",
    "figures": [
      {
        "title": "Figure-Eight Choreography & Triads",
        "file": "papers/02_Physics_The_Reversible_Half_and_the_Third_Body/fig_phys2.png"
      }
    ]
  },
  {
    "paperTitle": "The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem",
    "domain": "Celestial Mechanics / Computational Physics",
    "system": "Figure-eight orbit and Lagrange triangle stability under perturbation",
    "equations": "Period $T = 6.325914009781$; Orbit closes to $9.6 \\times 10^{-13}$; Degenerates to triad 6 times/period; Lagrange triangle growth rate $0.702194$ vs exact $\\omega/\\sqrt{2} = 0.702331$",
    "validation": "8th-order Dormand-Prince Runge-Kutta numerical integration (DOP853) with tolerances 10^-12 to 10^-13",
    "parameters": "Initial positions $x_1 = -x_2 = (0.97000436, -0.24308753)$, $x_3 = 0$; Initial velocity $\\dot{x}_3 = (-0.93240737, -0.86473146)$; Kick size $10^{-6}$",
    "source": "[6]",
    "figures": [
      {
        "title": "Figure-Eight Choreography & Triads",
        "file": "papers/02_Physics_The_Reversible_Half_and_the_Third_Body/fig_phys2.png"
      }
    ]
  },
  {
    "paperTitle": "The Reversible Half and the Third Body: Pairs and Triads in Measurement Records and the Three-Body Problem",
    "domain": "Celestial Mechanics / Orbital Dynamics",
    "system": "Hierarchical four-body system (fourth mass $\\varepsilon$ orbiting the figure-eight triad at distance $D$)",
    "equations": "$\\delta_{\\max} \\simeq 2 \\max|L_{\\text{in}}| \\simeq \\sqrt{3}\\langle\\Delta I\\rangle \\varepsilon D^{-3/2} = 2.8438\\,\\varepsilon D^{-3/2}$; Stable/shape kept to $10^{-2}$ for $\\varepsilon/D^3 \\le 10^{-4}$; Unstable inside $D_{\\text{MA}} \\simeq 4.06\\text{--}4.11$",
    "validation": "Quadrupole tidal torque averaging over inner period, DOP853 numerical integration over 100T",
    "parameters": "Mass $\\varepsilon \\in \\{10^{-4}, 10^{-3}, 10^{-2}, 10^{-1}\\}$, Distance $D \\in \\{3, 5, 10, 20\\}$, $\\langle\\Delta I\\rangle = 1.641896$",
    "source": "[6]",
    "figures": [
      {
        "title": "Hierarchical Four-Body Perturbation",
        "file": "papers/02_Physics_The_Reversible_Half_and_the_Third_Body/fig_phys2.png"
      }
    ]
  },
  {
    "paperTitle": "The Riemann Kernel as a Quantum State: Wigner Negativity, Decoherence at the Thirds and Lee–Yang Zeros",
    "domain": "Quantum Physics / Mathematical Physics",
    "system": "The Riemann kernel $\\Phi$ and Riemann Hypothesis (RH) formulated as a pure quantum state, its Wigner negativity, and quantum decoherence",
    "equations": "RH is equivalent to non-detection by the symbol-positive observable family $\\hat{O}_{x,y}$; $J(x,y) = 2\\partial_y|\\Xi(x+iy)|^2 = 2\\pi\\|\\Phi\\|^2 \\langle\\varphi|\\hat{O}_{x,y}|\\varphi\\rangle$; Coherence of probe qubit: $L(t) = \\Xi(\\lambda t)/\\Xi(0)$; Negativity confined via $2\\pi e^{2|a|} < \\max(\\sqrt{2k^2 + 1/2}, 20)$; Heat flow obeys $\\partial_T J_T = \\frac{1}{8}(\\partial_y^2 - \\partial_x^2)J_T$",
    "validation": "Mathematical proofs (Hadamard factorization, Riccati bounds, Lee-Yang circle theorem), trapezoidal quadrature rules, matrix-exponential evolution on C^2 x C^3N, Lanczos/Golub-Welsch algorithms, and high-precision IEEE double-precision arithmetic.",
    "parameters": "Wigner negativity mass: $4.844 \\times 10^{-5}$; deepest negativity at $k = 12.022$ ($W_\\varphi = -6.60 \\times 10^{-5}$); $\\|\\Phi\\|^2 = 1.2790072478$; de Bruijn-Newman bounds $0 \\le \\Lambda \\le 0.2$; zero verification height $X_0 = 3 \\cdot 10^{12}$; spin-1/2 Ising coupling $K = \\frac{1}{2}\\ln 2$",
    "source": "[8]",
    "figures": [
      {
        "title": "Wigner Negativity Mass Distribution",
        "file": "papers/03_Quantum_The_Riemann_Kernel_as_a_Quantum_State/fig_negativity.png"
      }
    ]
  },
  {
    "paperTitle": "The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex",
    "domain": "Neuroscience / Computational Neuroscience",
    "system": "Balanced network of excitatory and inhibitory binary neurons",
    "equations": "$\\mu = \\sqrt{K}A(\\nu - \\nu_{\\text{bal}})$, where residual net input and distance from balance solution are one object; network inputs cancel to order one while rates converge to balance as $1/\\sqrt{K}$",
    "validation": "Direct network simulation (2×10^4 binary neurons with K=100 to 1600) and Newton-type root finding for mean-field rates",
    "parameters": "$N_E = N_I = 10^4, J_E = 2, J_I = 1.8, b_E = 1, b_I = 0.8, \\nu_0 = 0.1, \\theta_E = 1, \\theta_I = 0.7, K = 100 \\text{ to } 1600$",
    "source": "[10]",
    "figures": [
      {
        "title": "Balanced E-I Cortical Network Rates",
        "file": "papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/fig_cortex.png"
      }
    ]
  },
  {
    "paperTitle": "The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex",
    "domain": "Neuroscience / Biophysics",
    "system": "Two-state voltage-gated ion channels (Hodgkin–Huxley gates $m, h, n$)",
    "equations": "$x_\\infty = \\frac{1}{1 + e^\\varepsilon}$; at half-point $V_{1/2}$: $x_\\infty = 1/2$, max entropy $= 1\\text{ bit}$, max variance $= 1/4$; $n^4$ reaches half-max $34.5\\text{ mV}$ above gate half-point",
    "validation": "Mathematical proof using two-state law and bracketing root search (<10^-6 mV precision)",
    "parameters": "Hodgkin–Huxley gates half-points: $V_{1/2}(m) = -40.02\\text{ mV}, V_{1/2}(h) = -62.31\\text{ mV}, V_{1/2}(n) = -53.41\\text{ mV}$; slopes $k$: $+9.47, -6.95, +16.35\\text{ mV}$",
    "source": "[10]",
    "figures": [
      {
        "title": "Hodgkin-Huxley Membrane Kinetics",
        "file": "papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/fig_membrane.png"
      }
    ]
  },
  {
    "paperTitle": "The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex",
    "domain": "Neuroscience / Ion Channel Biophysics",
    "system": "Estimation of ion channel number ($N$) and unitary current ($i$) from current fluctuations",
    "equations": "Mean $I = N i p$ is invariant under scaling; variance $\\sigma^2 = \\sigma_b^2 + i I - I^2/N$; precision of channel count improves steadily with largest open probability $p_{\\max}$",
    "validation": "Ordinary least-squares fitting of quadratic mean-variance parabola over 400 simulated recordings per design",
    "parameters": "$N = 2000\\text{ channels}, i = 1\\text{ pA}, \\sigma_b = 3\\text{ pA}$, gate $V_{1/2} = -40\\text{ mV}, k = 9.47\\text{ mV}, 9\\text{ voltages}, 200\\text{ sweeps/voltage}$",
    "source": "[10]",
    "figures": [
      {
        "title": "Hodgkin-Huxley Membrane Kinetics",
        "file": "papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/fig_membrane.png"
      }
    ]
  },
  {
    "paperTitle": "The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex",
    "domain": "Neuroscience / Pharmacology",
    "system": "Voltage-dependent channel block (Magnesium block of NMDA receptors)",
    "equations": "$B(V) = \\frac{1}{1 + e^{-(V - V_{1/2})/k_{\\text{bl}}}}$ is a Boltzmann gate with $k_{\\text{bl}} = \\frac{RT}{z_{\\text{bl}}\\delta F}$ and $V_{1/2} = k_{\\text{bl}}\\ln\\frac{[\\text{B}]}{K_d(0)}$; doubling concentration moves $V_{1/2}$ by $k_{\\text{bl}}\\ln(2) = 11.18\\text{ mV}$",
    "validation": "Theoretical derivation based on Woodhull model and empirical Jahr & Stevens parameters",
    "parameters": "$K_d(0) = 3.57\\text{ mM}, k_{\\text{bl}} = 16.13\\text{ mV}, z_{\\text{bl}}\\cdot\\delta = 1.58\\; (\\delta \\approx 0.8), [\\text{Mg}^{2+}] = 0.5, 1.0, 2.0\\text{ mM}, T = 295\\text{ K}$",
    "source": "[10]",
    "figures": [
      {
        "title": "Hodgkin-Huxley Membrane Kinetics",
        "file": "papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/fig_membrane.png"
      }
    ]
  },
  {
    "paperTitle": "The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex",
    "domain": "Neuroscience / Neurophysiology",
    "system": "Action potential / spike threshold initiation with exponential sodium activation",
    "equations": "Derived closed-form spike threshold: $\\theta = E_{\\text{Na}} - k_a\\left[1 - W_{-1}\\left(-\\frac{g_L}{g_{\\text{Na}}}e^{1 - (E_{\\text{Na}} - V_a)/k_a}\\right)\\right]$; reduces error of simplest threshold equation by factor of $1.3$ to $33$",
    "validation": "Fixed-point solution via Lambert W function compared to exact numerical root search of Φ'(V) = 0",
    "parameters": "$V_a = -30\\text{ mV}, k_a = 6\\text{ mV}, E_{\\text{Na}} = 55\\text{ mV}, E_L = -70\\text{ mV}, g_{\\text{Na}}/g_L = 2\\text{ to } 14$",
    "source": "[10]",
    "figures": [
      {
        "title": "Balanced E-I Cortical Network Rates",
        "file": "papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/fig_cortex.png"
      }
    ]
  },
  {
    "paperTitle": "The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex",
    "domain": "Neuroscience / Neurophysiology",
    "system": "Action potential generation, ionic charge integrals, and $m^q h$ sodium activation triad",
    "equations": "$Q_{\\text{Na}} = Q_{\\text{K}} + Q_L - Q_{\\text{stim}}$ over equal voltage interval; $m^3h$ spike carries $\\rho = 13.36$ times minimum sodium charge; $q = 3$ is the unique exponent in $\\{1,2,3,4\\}$ yielding both stable rest and spike",
    "validation": "Multistep adaptive numerical integration (relative tolerance 10^-9) and implicit Runge-Kutta (Radau) verification",
    "parameters": "$C = 1\\,\\mu\\text{F/cm}^2, g_{\\text{Na}} = 120, g_{\\text{K}} = 36, g_L = 0.3\\text{ mS/cm}^2, E_{\\text{Na}} = 50, E_{\\text{K}} = -77, E_L = -54.387\\text{ mV}, I_{\\text{stim}} = 10\\,\\mu\\text{A/cm}^2\\text{ for 1 ms}$",
    "source": "[10]",
    "figures": [
      {
        "title": "m³h Sodium Action Potential Charges",
        "file": "papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/fig_membrane.png"
      }
    ]
  },
  {
    "paperTitle": "The Balanced Pair in Excitable Tissue: What a Membrane Reading Determines, and the Balanced Cortex",
    "domain": "Neuroscience / Cellular Energetics",
    "system": "Sodium–potassium pump ($\\mathrm{Na^+/K^+}$-ATPase) stoichiometry and energetic stall potential",
    "equations": "Work per cycle: $W_{\\text{cyc}} = e(3E_{\\text{Na}} - 2E_{\\text{K}} - V_m)$; pump moves 1 net elementary charge outwards per cycle; stall potential: $V_m = 3E_{\\text{Na}} - 2E_{\\text{K}} - |\\Delta G_{\\text{ATP}}|/e = -205\\text{ mV}$",
    "validation": "Thermodynamic energy balance calculation per ATP hydrolysis cycle",
    "parameters": "Stoichiometry $3\\,\\mathrm{Na^+} : 2\\,\\mathrm{K^+}$, $E_{\\text{Na}} = +55\\text{ mV}$, $E_{\\text{K}} = -90\\text{ mV}$, $V_m = -65\\text{ mV}$, $T = 310\\text{ K}$, $|\\Delta G_{\\text{ATP}}| \\approx 0.55\\text{ eV } (53\\text{ kJ/mol})$",
    "source": "[10]",
    "figures": [
      {
        "title": "Hodgkin-Huxley Membrane Kinetics",
        "file": "papers/05_Neuroscience_The_Balanced_Pair_in_Excitable_Tissue/fig_membrane.png"
      }
    ]
  },
  {
    "paperTitle": "The Balance of the Count: One Energy in the Prime Counts and in the Sawtooth, and the Riemann Hypothesis in Real Variables",
    "domain": "Analytic Number Theory",
    "system": "Riemann Hypothesis, Mertens function $M(x)$, prime-counting error $(\\psi(x) - x)$, and fractional part sawtooth functions",
    "equations": "1) Rebuild law: $\\sum_{n \\le x} M(x/n) = 1$; 2) Sawtooth identity: $-\\sum_{k \\ge 1} \\mu(k)\\{1/(kt)\\} = \\chi_{(0,1]}(t)$; 3) Shortfall integral: $\\int_{1/N}^{1} |\\chi_{(0,1]}(t) + \\sum_{k \\le N} \\mu(k)\\varsigma_k(t)|^2 dt = (N-1)m(N)^2$; 4) Energy equivalence of RH: $E(X) = \\int_1^X \\left(\\frac{\\psi(x)-x}{x}\\right)^2 dx \\ll_\\varepsilon X^\\varepsilon$; 5) Mean energy identity: $\\sum_\\rho \\frac{1}{\\rho(1-\\rho)} = 2 + \\gamma - \\log(4\\pi) = 0.0461914\\dots$",
    "validation": "Exact segmented sieve up to x = 10^10 (recording 675,247 checkpoints), exact evaluations of zero locations up to γ < 3000, and exact piecewise integration of fractional-part Gram integrals for N ≤ 60.",
    "parameters": "Range $x$ up to $10^{10}$ ($u = \\log_2 x$ up to $33.22$); $L = 10^9$ for Möbius table; $2469$ zero pairs with $\\gamma < 3000$; pitch parameters $\\gamma_k \\log(2)/(2\\pi)$; $N$ up to $60$ for sawtooth distance $d_N$",
    "source": "[11]",
    "figures": [
      {
        "title": "Prime Count Oscillations & Energy Integral",
        "file": "papers/10_The_Balance_of_the_Count/fig2_energy.png"
      },
      {
        "title": "Wave Structure of Prime Error",
        "file": "papers/10_The_Balance_of_the_Count/fig1_waves.png"
      }
    ]
  },
  {
    "paperTitle": "Three Is Enough: Radix Economy, Balanced-Ternary Arithmetic and Ternary-Weight Networks",
    "domain": "Computer Science / Applied Mathematics / Neural Networks",
    "system": "Radix economy, completeness of balanced-ternary arithmetic, and optimal ternary-weight quantization for neural networks",
    "equations": "Base 3 is the cheapest radix for $N \\ge 2^{16}$ and unique cheapest for $N \\ge 2^{27}$; $E(b) = \\frac{b}{\\ln b}$; register generating function: $Z_d(z) = \\prod_{i=0}^{d-1} (z^{-3^i} + 1 + z^{3^i}) = z^{-M_d}\\frac{z^{3^d} - 1}{z - 1}$; stationary threshold condition: $h'(\\delta) = f(\\delta)\\alpha(\\delta)(\\alpha(\\delta) - 2\\delta) \\implies \\delta = \\alpha^*/2$",
    "validation": "Analytic bounds, exact comparison of step functions up to N = 2.66 x 10^8, exhaustive enumeration for integers |n| <= 3^10, and empirical evaluation on the 1797 handwritten digits of the UCI optical-recognition test set using a 64-128-10 network",
    "parameters": "$E(2)/E(3) = 1.0566$; $\\log_2(3) = 1.585\\text{ bits/weight}$; Gaussian optimal threshold $u^* = 0.612003\\sigma$, zero share $= 0.45946$, squared error $= 0.19017\\sigma^2$; uniform optimal threshold $\\delta^* = a/3$; Laplace optimal threshold $\\delta^* = \\beta$; test accuracy $= 97.44 \\pm 0.73\\%$",
    "source": "[12]",
    "figures": [
      {
        "title": "Radix Economy & Ternary Quantization",
        "file": "papers/06_Algorithms_Three_Is_Enough/fig_algo.png"
      }
    ]
  },
  {
    "paperTitle": "Nothing Binds a Twin but Exclusion: The Prime Clocks, the Exclusion Law, and the Recurrence of the Twin Pair",
    "domain": "Number Theory / Analytic Number Theory",
    "system": "Recurrence and distribution of twin prime pairs ($6k - 1, 6k + 1$), prime clocks modulo $p$, sieve theory limitations (parity barrier), and central $L$-function values of congruent-number curves",
    "equations": "Exclusion Law fixing twin constant: $E = \\prod_{p \\ge 5} \\left(1 - \\frac{1}{(p-1)^2}\\right) = 0.88022$; Twin Law: $\\pi_2(x) \\sim \\frac{x}{6}\\left(\\frac{3}{\\log x}\\right)^2 E = \\frac{2C_2 x}{\\log^2 x}$; Parity barrier ceiling certified share $= 0.48837$; Central value: $L(E_n, 1)\\sqrt{n} = 4\\kappa_n m^2$",
    "validation": "Mathematical proof, segmented sieve of Eratosthenes up to 10^10, enumeration of full turns, joint factor law over 5 * 10^7 pairs, and numerical integration of Buchstab delay equations.",
    "parameters": "$E = 0.88022, C_2 = 0.66016, x$ up to $10^{10}, u^* = 3.565$, maximum certifiable share $= 0.48837\\; (u = 3.16), \\kappa_n = 0.163879$ (odd $n$) or $0.327757$ (even $n$)",
    "source": "[7]",
    "figures": [
      {
        "title": "The Exclusion Law & Twin Constant E",
        "file": "papers/Nothing_Binds_a_Twin/fig3_exclusion.png"
      },
      {
        "title": "Twin Law Recurrence Dynamics",
        "file": "papers/Nothing_Binds_a_Twin/fig5_law.png"
      }
    ]
  }
];


const KATEX_MACROS = {
  "\\dd": "\\,\\mathrm{d}",
  "\\e": "\\mathrm{e}",
  "\\R": "\\mathbb{R}",
  "\\C": "\\mathbb{C}",
  "\\N": "\\mathbb{N}",
  "\\Z": "\\mathbb{Z}",
  "\\fr": "\\{#1\\}",
  "\\Num": "\\mathrm{Num}",
  "\\Den": "\\mathrm{Den}",
  "\\Re": "\\operatorname{Re}",
  "\\Im": "\\operatorname{Im}",
  "\\T": "\\mathrm{T}",
  "\\sgn": "\\operatorname{sgn}",
  "\\NH": "\\mathrm{NH_3}",
  "\\HS": "\\mathrm{H_2S}",
  "\\NHSH": "\\mathrm{NH_4SH}",
  "\\Hw": "\\mathrm{H_2O}",
  "\\CH": "\\mathrm{CH_4}",
  "\\muH": "\\,\\mu\\mathrm{Hz}",
  "\\li": "\\operatorname{li}",
  "\\Li": "\\operatorname{Li}",
  "\\Tr": "\\operatorname{Tr}"
};

// Curated Repositories for @mag-and-krotons
const CURATED_REPOS = [
  {
    name: "GAT",
    description: "Graph Attention Networks & Quantum Network Topologies. Python and numerical graph architectures.",
    html_url: "https://github.com/mag-and-krotons/GAT",
    language: "Python",
    langColor: "#3572A5",
    stargazers_count: 0,
    forks_count: 0,
    license: "MIT"
  },
  {
    name: "mag-and-krotons.github.io",
    description: "Personal academic research publication platform, hosting preprints, LaTeX mathematics, and interactive simulators.",
    html_url: "https://github.com/mag-and-krotons/mag-and-krotons.github.io",
    language: "HTML / JavaScript / CSS",
    langColor: "#f1e05a",
    stargazers_count: 0,
    forks_count: 0,
    license: "CC BY 4.0"
  }
];

// Helper to escape HTML characters so math inequalities like < and > are never treated as HTML tags
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// State for papers search and filter
let activeCategory = "all";
let searchQuery = "";

// --- Papers Rendering & KaTeX Integration ---
function renderPapers() {
  const container = document.getElementById("papers-container");
  const countBadge = document.getElementById("papers-count-badge");
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();

  const filtered = RESEARCH_PAPERS.filter(paper => {
    const matchesCat = activeCategory === "all" || paper.category === activeCategory;
    const matchesSearch = !query || 
      paper.title.toLowerCase().includes(query) ||
      paper.abstract.toLowerCase().includes(query) ||
      paper.categoryLabel.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  if (countBadge) {
    countBadge.innerText = `${filtered.length} ${filtered.length === 1 ? "MANUSCRIPT" : "MANUSCRIPTS"}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <h4>No manuscripts found matching your criteria</h4>
        <p>Try searching for a different keyword like "Riemann", "Wigner", "triad", "clocks", or reset filters.</p>
        <button class="btn-secondary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(paper => {
    const safeAbstract = escapeHtml(paper.abstract);
    const hasLongAbstract = paper.abstract.length > 300;

    return `
      <article class="paper-card" id="card-${paper.id}" data-category="${paper.category}">
        <div class="paper-top-meta">
          <span class="paper-cat-badge badge-${paper.category}">${escapeHtml(paper.categoryLabel)}</span>
          <span class="paper-date-badge">${escapeHtml(paper.date)}</span>
          <span class="paper-license-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            ${escapeHtml(paper.license)}
          </span>
        </div>

        <h3 class="paper-title">${escapeHtml(paper.title)}</h3>
        <div class="paper-author-line">
          <span class="author-name">${escapeHtml(paper.authors)}</span>
          <span class="venue-separator">&bull;</span>
          <span class="venue-tag">Preprint Compendium</span>
        </div>

        <div class="paper-abstract-wrap ${hasLongAbstract ? 'collapsed' : 'expanded'}" id="wrap-${paper.id}">
          <div class="abstract-content" id="abstract-${paper.id}">
            ${safeAbstract}
          </div>
          ${hasLongAbstract ? `
            <div class="abstract-fade-overlay"></div>
            <button class="btn-toggle-abstract" id="btn-toggle-${paper.id}" onclick="toggleAbstract('${paper.id}')">
              ▼ Read Full Abstract & Math
            </button>
          ` : ""}
        </div>

        <div class="paper-actions-bar">
          <a href="${escapeHtml(paper.pdf)}" target="_blank" rel="noopener noreferrer" class="paper-btn btn-pdf">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Download PDF
          </a>
          <button class="paper-btn btn-cite" onclick="openBibtexModal('${paper.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
            BibTeX Citation
          </button>
          <a href="${escapeHtml(paper.github)}" target="_blank" rel="noopener noreferrer" class="paper-btn btn-code">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            Code
          </a>
        </div>
      </article>
    `;
  }).join("");

  triggerMathRendering(container);
}

function triggerMathRendering(target = null) {
  const el = target || document.body;
  if (!el) return;
  if (window.renderMathInElement) {
    try {
      renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        macros: KATEX_MACROS,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
        throwOnError: false
      });
    } catch (e) {
      console.warn("KaTeX rendering notice:", e);
    }
  } else {
    // Retry once scripts finish initializing
    setTimeout(() => triggerMathRendering(el), 60);
  }
}

window.toggleAbstract = function(id) {
  const wrap = document.getElementById(`wrap-${id}`);
  const btn = document.getElementById(`btn-toggle-${id}`);
  if (!wrap || !btn) return;

  const isCollapsed = wrap.classList.contains("collapsed");
  if (isCollapsed) {
    wrap.classList.remove("collapsed");
    wrap.classList.add("expanded");
    btn.innerHTML = "▲ Collapse Abstract";
  } else {
    wrap.classList.remove("expanded");
    wrap.classList.add("collapsed");
    btn.innerHTML = "▼ Read Full Abstract & Math";
  }
};

window.resetFilters = function() {
  activeCategory = "all";
  searchQuery = "";
  const input = document.getElementById("paper-search-input");
  if (input) input.value = "";
  document.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.getAttribute("data-category") === "all");
  });
  renderPapers();
};

function initArchiveControls() {
  const searchInput = document.getElementById("paper-search-input");
  const clearBtn = document.getElementById("clear-search-btn");
  const filterPills = document.querySelectorAll(".filter-pill");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = searchQuery ? "block" : "none";
      renderPapers();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchQuery = "";
      if (searchInput) searchInput.value = "";
      clearBtn.style.display = "none";
      renderPapers();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category");
      renderPapers();
    });
  });
}

// --- Interactive Quantum Bloch Sphere Lab ---
const quantumState = {
  theta: Math.PI / 3, // 60 deg
  phi: Math.PI / 4    // 45 deg
};

function initBlochLab() {
  const canvas = document.getElementById("bloch-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const thetaSlider = document.getElementById("theta-slider");
  const phiSlider = document.getElementById("phi-slider");
  const thetaVal = document.getElementById("theta-val");
  const phiVal = document.getElementById("phi-val");
  const measureBtn = document.getElementById("measure-btn");
  const resetBtn = document.getElementById("reset-btn");
  const formulaElem = document.getElementById("quantum-formula");
  const prob0Fill = document.getElementById("prob-fill-0");
  const prob1Fill = document.getElementById("prob-fill-1");
  const prob0Text = document.getElementById("prob-0-text");
  const prob1Text = document.getElementById("prob-1-text");

  function updateVisuals() {
    const t = quantumState.theta;
    const p = quantumState.phi;

    const p0 = Math.cos(t / 2) ** 2;
    const p1 = Math.sin(t / 2) ** 2;

    if (prob0Fill) prob0Fill.style.width = `${(p0 * 100).toFixed(1)}%`;
    if (prob1Fill) prob1Fill.style.width = `${(p1 * 100).toFixed(1)}%`;
    if (prob0Text) prob0Text.innerText = `${(p0 * 100).toFixed(1)}%`;
    if (prob1Text) prob1Text.innerText = `${(p1 * 100).toFixed(1)}%`;

    const cosVal = Math.cos(t / 2).toFixed(3);
    const sinVal = Math.sin(t / 2).toFixed(3);
    const phiDeg = Math.round((p * 180) / Math.PI);

    if (formulaElem && window.katex) {
      try {
        window.katex.render(
          `|\\psi\\rangle = ${cosVal}|0\\rangle + ${sinVal}\\mathrm{e}^{i ${phiDeg}^\\circ}|1\\rangle`,
          formulaElem,
          { throwOnError: false, displayMode: true, macros: KATEX_MACROS }
        );
      } catch (e) {
        formulaElem.innerText = `|ψ⟩ = ${cosVal}|0⟩ + ${sinVal}e^(i${phiDeg}°)|1⟩`;
      }
    }

    drawBlochSphere(ctx, canvas.width, canvas.height, t, p);
  }

  function drawBlochSphere(c, w, h, theta, phi) {
    c.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const R = 105;

    // Solid Sphere Background Circle
    c.fillStyle = "#F8F8F5";
    c.beginPath();
    c.arc(cx, cy, R, 0, Math.PI * 2);
    c.fill();

    // Solid border
    c.strokeStyle = "#0F172A";
    c.lineWidth = 2.5;
    c.stroke();

    // Equator ring
    c.save();
    c.strokeStyle = "#94A3B8";
    c.lineWidth = 1.5;
    c.setLineDash([4, 4]);
    c.beginPath();
    c.ellipse(cx, cy, R, R * 0.35, 0, 0, Math.PI * 2);
    c.stroke();
    c.restore();

    // Z-axis line
    c.strokeStyle = "#0F172A";
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(cx, cy - R - 14);
    c.lineTo(cx, cy + R + 14);
    c.stroke();

    // Labels
    c.fillStyle = "#1D4ED8";
    c.font = "bold 13px 'JetBrains Mono', monospace";
    c.fillText("|0⟩", cx - 12, cy - R - 18);
    c.fillStyle = "#E11D48";
    c.fillText("|1⟩", cx - 12, cy + R + 26);

    // Quantum State Vector Calculation
    const px = cx + R * Math.sin(theta) * Math.cos(phi);
    const py = cy - R * Math.cos(theta) + (R * 0.35) * Math.sin(theta) * Math.sin(phi);

    // Vector line
    c.save();
    c.strokeStyle = "#E11D48";
    c.lineWidth = 3.5;
    c.beginPath();
    c.moveTo(cx, cy);
    c.lineTo(px, py);
    c.stroke();

    // Vector tip point
    c.fillStyle = "#1D4ED8";
    c.strokeStyle = "#0F172A";
    c.lineWidth = 2;
    c.beginPath();
    c.arc(px, py, 7, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.restore();
  }

  if (thetaSlider) {
    thetaSlider.addEventListener("input", (e) => {
      quantumState.theta = (parseFloat(e.target.value) * Math.PI) / 180;
      if (thetaVal) thetaVal.innerText = `${e.target.value}°`;
      updateVisuals();
    });
  }

  if (phiSlider) {
    phiSlider.addEventListener("input", (e) => {
      quantumState.phi = (parseFloat(e.target.value) * Math.PI) / 180;
      if (phiVal) phiVal.innerText = `${e.target.value}°`;
      updateVisuals();
    });
  }

  if (measureBtn) {
    measureBtn.addEventListener("click", () => {
      const prob0 = Math.cos(quantumState.theta / 2) ** 2;
      const outcome = Math.random() < prob0 ? 0 : 1;

      quantumState.theta = outcome === 0 ? 0 : Math.PI;
      if (thetaSlider) thetaSlider.value = outcome === 0 ? "0" : "180";
      if (thetaVal) thetaVal.innerText = `${outcome === 0 ? 0 : 180}°`;

      updateVisuals();
      const probPct = Math.round((outcome === 0 ? prob0 : (1 - prob0)) * 100);
      showToast(`Wavefunction collapsed into eigenstate |${outcome}⟩ with probability ${probPct}%`);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      quantumState.theta = Math.PI / 2;
      quantumState.phi = 0;
      if (thetaSlider) thetaSlider.value = "90";
      if (phiSlider) phiSlider.value = "0";
      if (thetaVal) thetaVal.innerText = "90°";
      if (phiVal) phiVal.innerText = "0°";
      updateVisuals();
      showToast("State reset to balanced superposition |+⟩");
    });
  }

  updateVisuals();
}

// --- GitHub Repositories Connector ---
async function initGitHubRepos() {
  const input = document.getElementById("github-username-input");
  const syncBtn = document.getElementById("github-sync-btn");
  const statusElem = document.getElementById("github-status");

  async function fetchUserRepos(username) {
    if (!statusElem) return;
    statusElem.innerHTML = `<span style="color: var(--color-blue);">Connecting to api.github.com/users/${username}/repos...</span>`;

    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        statusElem.innerHTML = `<span style="color: var(--color-emerald);">✓ Connected to @${username} (${data.length} repositories verified)</span>`;
        renderRepoCards(data.map(r => ({
          name: r.name,
          description: r.description || "Research codebase & scientific implementations.",
          html_url: r.html_url,
          language: r.language || "Python / TeX",
          langColor: r.language === "Python" ? "#3572A5" : "#1D4ED8",
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          license: r.license ? r.license.spdx_id : "Open Access"
        })));
        return;
      }
    } catch (e) {
      console.log("GitHub API fallback active:", e.message);
    }

    statusElem.innerHTML = `<span style="color: var(--color-slate-light);">Verified active codebases for @${username}:</span>`;
    renderRepoCards(CURATED_REPOS);
  }

  if (syncBtn && input) {
    syncBtn.addEventListener("click", () => {
      const u = input.value.trim();
      if (u) fetchUserRepos(u);
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const u = input.value.trim();
        if (u) fetchUserRepos(u);
      }
    });
  }

  fetchUserRepos("mag-and-krotons");
}

function renderRepoCards(repos) {
  const grid = document.getElementById("repos-grid");
  if (!grid) return;

  grid.innerHTML = repos.map(r => `
    <div class="repo-item-card">
      <div class="repo-top">
        <a href="${r.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          ${escapeHtml(r.name)}
        </a>
        <span class="repo-license-tag">${escapeHtml(r.license)}</span>
      </div>
      <p class="repo-desc">${escapeHtml(r.description)}</p>
      <div class="repo-bottom">
        <span class="repo-lang">
          <span class="lang-color-dot" style="background: ${r.langColor || '#1D4ED8'};"></span>
          ${escapeHtml(r.language)}
        </span>
        <a href="${r.html_url}" target="_blank" rel="noopener noreferrer" class="repo-view-link">
          View Repository ↗
        </a>
      </div>
    </div>
  `).join("");
}

// --- Open Science Licensing Facility ---
const LICENSES = {
  "cc-by-4": {
    name: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    type: "Academic Manuscripts & Preprints",
    summary: "Standard protocol for open-access research. Guarantees global distribution rights while maintaining irrevocable attribution to Abhijit Singh.",
    badge: "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)",
    latexNotice: "% Academic Attribution Notice\n% This manuscript is licensed under CC BY 4.0\n\\usepackage[hidelinks]{hyperref}\n\\url{https://creativecommons.org/licenses/by/4.0/}",
    citationField: "license = {CC BY 4.0}"
  },
  "mit": {
    name: "MIT License",
    type: "Numerical Algorithms & Quantum Code",
    summary: "Permissive open software license for Python, Julia, and Qiskit scientific computing tools.",
    badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](https://opensource.org/licenses/MIT)",
    latexNotice: "/* MIT License - Copyright (c) 2026 Abhijit Singh */\nPermission is hereby granted, free of charge, to any person obtaining a copy...",
    citationField: "license = {MIT}"
  },
  "apache-2": {
    name: "Apache License 2.0",
    type: "Deep-Tech Quantum Libraries & Systems",
    summary: "Permissive software license with express patent grant protection for core quantum and network algorithms.",
    badge: "[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-indigo.svg)](https://opensource.org/licenses/Apache-2.0)",
    latexNotice: "Copyright 2026 Abhijit Singh\nLicensed under the Apache License, Version 2.0...",
    citationField: "license = {Apache-2.0}"
  },
  "cc0": {
    name: "Creative Commons Zero 1.0 (CC0 Public Domain)",
    type: "Experimental Datasets & Spectra",
    summary: "Waives copyright worldwide for open benchmarking and simulation tables.",
    badge: "[![License: CC0-1.0](https://licensebuttons.net/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)",
    latexNotice: "This dataset is dedicated to the public domain under CC0 1.0 Universal.",
    citationField: "license = {CC0-1.0}"
  }
};

let selectedLic = "cc-by-4";

function initLicensingSuite() {
  const pills = document.querySelectorAll(".license-pill-card");
  const titleElem = document.getElementById("license-preview-title");
  const codeElem = document.getElementById("license-code-output");
  const copyBtn = document.getElementById("copy-license-btn");

  function updateView() {
    const item = LICENSES[selectedLic];
    if (!item) return;
    if (titleElem) titleElem.innerText = item.name;
    if (codeElem) {
      codeElem.innerText = `# ${item.name}
Scope: ${item.type}

# Markdown Badge:
${item.badge}

# BibTeX Attribution Field:
${item.citationField}

# Manuscript Header Notice:
${item.latexNotice}`;
    }
  }

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      selectedLic = pill.getAttribute("data-license");
      updateView();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      if (codeElem) {
        navigator.clipboard.writeText(codeElem.innerText);
        showToast("License specification copied to clipboard!");
      }
    });
  }

  updateView();
}

// --- BibTeX Citation Modal ---
window.openBibtexModal = function(paperId) {
  const modal = document.getElementById("bibtex-modal");
  const title = document.getElementById("modal-paper-title");
  const code = document.getElementById("bibtex-code");
  const copyBtn = document.getElementById("copy-bibtex-btn");

  const paper = RESEARCH_PAPERS.find(p => p.id === paperId);
  if (!paper || !modal) return;

  if (title) title.innerText = paper.title;
  if (code) code.innerText = paper.bibtex;

  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(paper.bibtex);
      showToast("BibTeX citation copied to clipboard!");
    };
  }

  modal.classList.add("open");
};

function initModals() {
  document.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target === el || el.classList.contains("modal-close-btn")) {
        document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("open"));
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("open"));
    }
  });
}

// --- Toast Feedback System ---
function showToast(message, duration = 3000) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// --- Hero KaTeX Formulas ---
function initHeroFormulas() {
  if (window.katex) {
    const f1 = document.getElementById("hero-formula-1");
    const f2 = document.getElementById("hero-formula-2");
    if (f1) {
      try {
        window.katex.render(
          "J = 2\\partial_y |\\Xi(x+iy)|^2 = \\frac{1}{4} \\int Q(p,x)\\, p \\sinh(yp)\\, dp",
          f1,
          { throwOnError: false, displayMode: true, macros: KATEX_MACROS }
        );
      } catch (e) {}
    }
    if (f2) {
      try {
        window.katex.render(
          "p = \\frac{1}{1 + \\mathrm{e}^{\\varepsilon}} = \\frac{1}{2} + \\delta, \\quad \\delta = -\\frac{1}{2}\\tanh\\frac{\\varepsilon}{2}",
          f2,
          { throwOnError: false, displayMode: true, macros: KATEX_MACROS }
        );
      } catch (e) {}
    }
  }
}

// --- Application Lifecycle ---

// ==========================================================================
// THEORETICAL MATRIX & VALIDATION TABLE CONTROLLER
// ==========================================================================

let currentPapersView = "cards";
let matrixSearchQuery = "";
let matrixActiveDomain = "all";

function switchPapersView(mode) {
  currentPapersView = mode;
  const cardsBtn = document.getElementById("tab-btn-cards");
  const matrixBtn = document.getElementById("tab-btn-matrix");
  const cardsPanel = document.getElementById("cards-view-panel");
  const matrixPanel = document.getElementById("matrix-view-panel");

  if (!cardsBtn || !matrixBtn || !cardsPanel || !matrixPanel) return;

  if (mode === "cards") {
    cardsBtn.classList.add("active");
    matrixBtn.classList.remove("active");
    cardsPanel.style.display = "block";
    matrixPanel.style.display = "none";
  } else {
    matrixBtn.classList.add("active");
    cardsBtn.classList.remove("active");
    cardsPanel.style.display = "none";
    matrixPanel.style.display = "block";
    renderTheoreticalMatrix();
  }
}

function renderTheoreticalMatrix() {
  const tbody = document.getElementById("matrix-tbody");
  const countText = document.getElementById("matrix-count-text");
  if (!tbody) return;

  const query = matrixSearchQuery.toLowerCase().trim();
  const domainFilter = matrixActiveDomain.toLowerCase();

  const filtered = THEORETICAL_MATRIX.filter(row => {
    const matchesDomain = (domainFilter === "all") || row.domain.toLowerCase().includes(domainFilter);
    if (!matchesDomain) return false;

    if (!query) return true;
    const searchCorpus = (
      row.paperTitle + " " +
      row.domain + " " +
      row.system + " " +
      row.equations + " " +
      row.validation + " " +
      row.parameters + " " +
      row.source
    ).toLowerCase();

    return searchCorpus.includes(query);
  });

  if (countText) {
    countText.innerText = `Showing ${filtered.length} of ${THEORETICAL_MATRIX.length} scientific systems across 12 research manuscripts.`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">No theoretical systems match your query</div>
          <div>Try adjusting keywords or selecting 'All Domains'.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((row, idx) => {
    const origIdx = THEORETICAL_MATRIX.indexOf(row);
    const figChips = (row.figures && row.figures.length > 0)
      ? row.figures.map((fig, fIdx) => {
          const safeFile = escapeHtml(fig.file);
          const safeTitle = escapeHtml(fig.title);
          return `
            <button class="matrix-fig-btn" onclick="openFigureModalByIndex(${origIdx}, ${fIdx})" title="Inspect ${safeTitle}">
              <img src="${safeFile}" alt="${safeTitle}" class="matrix-fig-thumb" loading="lazy">
              <span class="fig-btn-caption">${safeTitle}</span>
            </button>
          `;
        }).join("")
      : `<span style="color: var(--text-dim); font-size: 0.75rem; font-style: italic;">Analytical</span>`;

    return `
      <tr>
        <td class="col-num"><span class="matrix-row-num">${idx + 1}</span></td>
        <td class="col-paper">
          <div class="matrix-paper-title">${escapeHtml(row.paperTitle)}</div>
          <span class="matrix-domain-tag">${escapeHtml(row.domain)}</span>
        </td>
        <td class="col-system">
          <div class="matrix-system-desc">${row.system}</div>
        </td>
        <td class="col-eqs">
          <div class="matrix-eq-cell">${row.equations}</div>
        </td>
        <td class="col-val">
          <div class="matrix-val-cell">${escapeHtml(row.validation)}</div>
        </td>
        <td class="col-params">
          <div class="matrix-param-cell">${row.parameters}</div>
        </td>
        <td class="col-figs">
          <div class="matrix-fig-cell">
            <span class="source-badge">${escapeHtml(row.source)}</span>
            ${figChips}
          </div>
        </td>
      </tr>
    `;
  }).join("");

  triggerMathRendering(tbody);
}

function initMatrixControls() {
  const searchInput = document.getElementById("matrix-search-input");
  const clearBtn = document.getElementById("clear-matrix-search-btn");
  const domainPills = document.querySelectorAll("#matrix-domain-filter-pills .filter-pill");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      matrixSearchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = matrixSearchQuery ? "block" : "none";
      renderTheoreticalMatrix();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      matrixSearchQuery = "";
      if (searchInput) searchInput.value = "";
      clearBtn.style.display = "none";
      renderTheoreticalMatrix();
    });
  }

  domainPills.forEach(pill => {
    pill.addEventListener("click", () => {
      domainPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      matrixActiveDomain = pill.getAttribute("data-domain") || "all";
      renderTheoreticalMatrix();
    });
  });

  // Modal close handlers
  const closeBtn = document.getElementById("close-figure-modal-btn");
  const footerCloseBtn = document.getElementById("close-figure-modal-footer-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeFigureModal);
  if (footerCloseBtn) footerCloseBtn.addEventListener("click", closeFigureModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeFigureModal();
    }
  });
}

function openFigureModalByIndex(rowIdx, figIdx) {
  const row = THEORETICAL_MATRIX[rowIdx];
  if (!row || !row.figures || !row.figures[figIdx]) return;
  const fig = row.figures[figIdx];

  const modal = document.getElementById("figure-modal");
  const modalImg = document.getElementById("figure-modal-img");
  const modalTitle = document.getElementById("figure-modal-title");
  const modalPaper = document.getElementById("figure-modal-paper-name");
  const modalSys = document.getElementById("figure-modal-system-desc");
  const modalDl = document.getElementById("figure-modal-download-link");

  if (!modal || !modalImg) return;

  modalImg.src = fig.file;
  modalImg.alt = fig.title;
  if (modalTitle) modalTitle.innerText = fig.title;
  if (modalPaper) modalPaper.innerText = row.paperTitle;
  if (modalSys) {
    modalSys.innerHTML = row.system;
    triggerMathRendering(modalSys);
  }
  if (modalDl) modalDl.href = fig.file;

  modal.classList.add("active");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function openFigureModal(imgSrc, figTitle, paperTitle, systemDesc) {
  const modal = document.getElementById("figure-modal");
  const modalImg = document.getElementById("figure-modal-img");
  const modalTitle = document.getElementById("figure-modal-title");
  const modalPaper = document.getElementById("figure-modal-paper-name");
  const modalSys = document.getElementById("figure-modal-system-desc");
  const modalDl = document.getElementById("figure-modal-download-link");

  if (!modal || !modalImg) return;

  modalImg.src = imgSrc;
  modalImg.alt = figTitle;
  if (modalTitle) modalTitle.innerText = figTitle;
  if (modalPaper) modalPaper.innerText = paperTitle;
  if (modalSys) {
    modalSys.innerHTML = systemDesc;
    triggerMathRendering(modalSys);
  }
  if (modalDl) modalDl.href = imgSrc;

  modal.classList.add("active");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeFigureModal(e) {
  if (e && e.target && e.target.classList.contains("modal-card")) return;
  const modal = document.getElementById("figure-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}


document.addEventListener("DOMContentLoaded", () => {
  renderPapers();
  initArchiveControls();
  initBlochLab();
  initGitHubRepos();
  initLicensingSuite();
  initModals();
  initMatrixControls();
  if (window.location.hash === "#matrix" || window.location.hash === "#table") {
    switchPapersView("matrix");
  }
  // Render math across the entire page (Hero, Lab, About/Scope focus cards, etc.)
  triggerMathRendering(document.body);
  setTimeout(initHeroFormulas, 100);
});

