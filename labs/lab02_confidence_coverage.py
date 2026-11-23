"""
LAB-02: Frequentist Confidence Intervals & Coverage Probability Simulation
Validates exact long-run empirical coverage of 95% Student-t confidence intervals.
"""
import argparse
import numpy as np
from scipy import stats

def main():
    parser = argparse.ArgumentParser(description="LAB-02: Confidence Intervals Coverage")
    parser.add_argument("--seed", type=int, default=101, help="Random seed")
    parser.add_argument("--samples", type=int, default=10000, help="Number of simulated intervals")
    parser.add_argument("--n", type=int, default=30, help="Sample size per trial")
    args = parser.parse_args()

    rng = np.random.default_rng(args.seed)
    true_mu = 50.0
    true_sigma = 10.0
    alpha = 0.05

    print("=" * 70)
    print("LAB-02: FREQUENTIST CONFIDENCE INTERVAL COVERAGE PROBABILITY")
    print(f"Parameter: True Mu = {true_mu}, True Sigma = {true_sigma}, N = {args.n}, Trials = {args.samples}")
    print("=" * 70)

    covered = 0
    widths = []

    for _ in range(args.samples):
        sample = rng.normal(true_mu, true_sigma, args.n)
        m = np.mean(sample)
        s = np.std(sample, ddof=1)
        se = s / np.sqrt(args.n)
        t_crit = stats.t.ppf(1 - alpha / 2, df=args.n - 1)
        
        ci_lower = m - t_crit * se
        ci_upper = m + t_crit * se
        widths.append(ci_upper - ci_lower)

        if ci_lower <= true_mu <= ci_upper:
            covered += 1

    coverage_rate = covered / args.samples
    margin_error = 1.96 * np.sqrt((0.95 * 0.05) / args.samples)

    print(f"\nHASIL SIMULASI FREKUENSI:")
    print(f"  * Target Cakupan Nominal     : 95.00%")
    print(f"  * Cakupan Empiris Tercapai   : {coverage_rate * 100:.2f}% ({covered}/{args.samples})")
    print(f"  * Batas Toleransi Monte Carlo: [{95.0 - margin_error*100:.2f}%, {95.0 + margin_error*100:.2f}%]")
    print(f"  * Rata-rata Lebar Selang     : {np.mean(widths):.3f} +/- {np.std(widths):.3f}")

    if abs(coverage_rate - 0.95) <= margin_error:
        print("\nSTATUS: LULUS VALIDASI (Cakupan empiris berada dalam toleransi statistik)")
    else:
        print("\nSTATUS: GAGAL")
    print("=" * 70)

if __name__ == "__main__":
    main()
