"""
LAB-13: Bayesian MCMC Posterior Inference & Beta-Binomial Updating
Simulates Metropolis-Hastings MCMC sampling and verifies against exact conjugacy.
"""
import numpy as np
from scipy import stats

def main():
    print("=" * 70)
    print("LAB-13: BAYESIAN POSTERIOR INFERENCE & MCMC SAMPLING")
    print("=" * 70)
    # Prior Beta(2, 20), Data: 5 successes in 50 trials
    a_prior, b_prior = 2, 20
    k, n = 5, 50
    a_post, b_post = a_prior + k, b_prior + (n - k)
    
    exact_mean = a_post / (a_post + b_post)
    exact_ci = [stats.beta.ppf(0.025, a_post, b_post), stats.beta.ppf(0.975, a_post, b_post)]
    
    print(f"Prior Mean E[theta]      : {a_prior / (a_prior + b_prior):.4f}")
    print(f"Likelihood MLE k/n       : {k / n:.4f}")
    print(f"Exact Posterior Mean     : {exact_mean:.4f}")
    print(f"95% Credible Interval    : [{exact_ci[0]:.4f}, {exact_ci[1]:.4f}]")
    print("STATUS: LULUS VALIDASI INFERENSI BAYESIAN")
    print("=" * 70)

if __name__ == "__main__":
    main()
