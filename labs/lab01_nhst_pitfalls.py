"""
LAB-01: NHST Pitfalls & P-Value Misconceptions
Validates uniform distribution of p-values under H0 and inflation under optional stopping.
"""
import argparse
import numpy as np
from scipy import stats

def main():
    parser = argparse.ArgumentParser(description="LAB-01: NHST Pitfalls & P-Value Misconceptions")
    parser.add_argument("--seed", type=int, default=42, help="Random seed")
    parser.add_argument("--runs", type=int, default=10000, help="Number of Monte Carlo trials")
    parser.add_argument("--output", type=str, default="", help="Optional output path")
    args = parser.parse_args()

    rng = np.random.default_rng(args.seed)
    n = 30
    
    print("=" * 70)
    print("LAB-01: NHST PITFALLS & P-VALUE MISCONCEPTIONS")
    print(f"Konfigurasi: {args.runs} iterasi, N={n} per kelompok, seed={args.seed}")
    print("=" * 70)

    # 1. Simulasi di bawah H0 (mu1 = mu2 = 0)
    p_vals_h0 = []
    for _ in range(args.runs):
        x1 = rng.normal(0, 1, n)
        x2 = rng.normal(0, 1, n)
        t_stat, p_val = stats.ttest_ind(x1, x2, equal_var=True)
        p_vals_h0.append(p_val)
    p_vals_h0 = np.array(p_vals_h0)

    # Uji Kolmogorov-Smirnov terhadap Uniform(0, 1)
    ks_stat, ks_p = stats.kstest(p_vals_h0, 'uniform')
    sig_h0 = np.mean(p_vals_h0 < 0.05)

    print("\n[1] EVALUASI SEBARAN P-VALUE DI BAWAH H0 BENAR:")
    print(f"  * Proporsi p < 0.05 (False Positive Rate) : {sig_h0 * 100:.2f}% (Teoretis: 5.00%)")
    print(f"  * Kolmogorov-Smirnov Test vs Uniform(0, 1): D = {ks_stat:.4f}, p-value = {ks_p:.4f}")
    if ks_p > 0.01:
        print("  * Status Validasi: TERVERIFIKASI SERAGAM (Uniformly Distributed under H0)")
    else:
        print("  * Status Validasi: Deviasi signifikan dari seragam")

    # 2. Simulasi Optional Stopping (Peeking Bias)
    # Peneliti memulai dengan n=10, jika p >= 0.05 menambah 1 data hingga n=50
    peeking_sig = 0
    peeking_trials = min(2000, args.runs)
    for _ in range(peeking_trials):
        x1 = list(rng.normal(0, 1, 10))
        x2 = list(rng.normal(0, 1, 10))
        found_sig = False
        for current_n in range(10, 51):
            t_stat, p_val = stats.ttest_ind(x1, x2)
            if p_val < 0.05:
                found_sig = True
                break
            x1.append(rng.normal(0, 1))
            x2.append(rng.normal(0, 1))
        if found_sig:
            peeking_sig += 1

    peeking_rate = peeking_sig / peeking_trials
    print("\n[2] DEMONSTRASI BAHAYA OPTIONAL STOPPING (PEEKING BIAS):")
    print(f"  * Taraf Signifikansi Nominal   : 5.00%")
    print(f"  * False Positive Rate Aktual   : {peeking_rate * 100:.2f}%")
    print(f"  * Faktor Inflasi Error Tipe I  : {peeking_rate / 0.05:.2f}x lipat!")
    print("=" * 70)

if __name__ == "__main__":
    main()
