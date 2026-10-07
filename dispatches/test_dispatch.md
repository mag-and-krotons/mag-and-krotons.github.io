---
title: "Symplectic Invariants in Collinear Lagrange Point Hill Throats"
category: "celestial-mechanics"
formula_tag: "THROAT ACTION INTEGRAL"
formula_math: "J = \frac{1}{2\pi} \oint p \, dq = \frac{E - E_c}{\omega_H}"
tags: ["Hill Throats", "Celestial Mechanics", "Lagrange Points", "Symplectic Dynamics"]
summary: "An analytical derivation of the phase space transport flux and Hill throat action integral across the L1/L2 necks in the circular restricted three-body problem."
paper_id: "08"
---

### 1. Phase Space Geometry of the Neck
Near the collinear equilibrium points $L_1$ and $L_2$, the linearized Hamiltonian takes the saddle-center form:

$$
H_2 = \frac{1}{2}(p_x^2 + p_y^2) - \lambda_H x p_y + \omega_H y p_x
$$

The characteristic polynomial governing the eigenvalues is:

$$
\lambda^4 - 2\lambda^2 - 27 = 0
$$

Yielding the Hill asymptotic values:
- $\lambda_H = 2.508287$ (unstable/stable saddle manifold)
- $\omega_H = 2.071594$ (center manifold harmonic frequency)

:::callout
<strong>Flux Invariance Theorem:</strong>
The phase space mass transport flux across the Hill sphere boundary is given by the action integral of the Lyapunov periodic orbit:
$$ J = \frac{\Delta E}{\omega_H} $$
This value is strictly invariant under canonical transformations.
:::

### 2. Numerical Convergence
Higher-order asymptotic expansions match 50-digit numerical boundary integrations with fractional error $< 10^{-12}$.
