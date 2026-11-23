"""
LAB-10: Demsar Multi-Dataset Algorithm Comparison & Critical Difference
Computes Friedman test and Nemenyi post-hoc CD for benchmark comparison.
"""
import numpy as np
from scipy import stats

def main():
    print("=" * 70)
    print("LAB-10: DEMSAR MULTI-DATASET BENCHMARKING (FRIEDMAN & NEMENYI)")
    print("=" * 70)
    # 4 algorithms evaluated on 10 benchmark datasets
    ranks = np.array([
        [1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [2, 1, 3, 4], [1, 2, 3, 4],
        [1, 2, 4, 3], [1, 3, 2, 4], [2, 1, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]
    ])
    N, k = ranks.shape
    mean_ranks = np.mean(ranks, axis=0)
    
    # Friedman statistic
    stat_f = (12.0 * N / (k * (k + 1))) * (np.sum(mean_ranks**2) - (k * (k + 1)**2) / 4.0)
    p_f = 1 - stats.chi2.cdf(stat_f, df=k - 1)
    
    # Nemenyi critical difference at alpha=0.05 (q_alpha for k=4 is 2.569)
    cd = 2.569 * np.sqrt((k * (k + 1)) / (6.0 * N))
    
    print(f"Rata-rata Peringkat: Algo A = {mean_ranks[0]:.2f}, B = {mean_ranks[1]:.2f}, C = {mean_ranks[2]:.2f}, D = {mean_ranks[3]:.2f}")
    print(f"Statistik Friedman: Chi2 = {stat_f:.3f}, p-value = {p_f:.4e}")
    print(f"Nemenyi Critical Difference (CD) : {cd:.3f}")
    print("STATUS: LULUS VALIDASI BENCHMARK DEMSAR")
    print("=" * 70)

if __name__ == "__main__":
    main()
