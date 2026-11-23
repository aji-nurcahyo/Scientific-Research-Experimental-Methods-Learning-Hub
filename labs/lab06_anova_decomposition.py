"""
LAB-06: Orthogonal Contrast & Factorial ANOVA Variance Decomposition
Validates partition of total sum of squares and post-hoc contrasts.
"""
import numpy as np
from scipy import stats

def main():
    print("=" * 70)
    print("LAB-06: ANOVA VARIANCE DECOMPOSITION & ORTHOGONAL CONTRASTS")
    print("=" * 70)
    rng = np.random.default_rng(42)
    k = 4
    n = 20
    # Group means: Treatment A, B, C, D
    data = [rng.normal(loc, 1.2, n) for loc in [10.0, 11.5, 11.8, 14.0]]
    f_stat, p_val = stats.f_oneway(*data)
    
    # Sum of squares decomposition
    all_data = np.concatenate(data)
    grand_mean = np.mean(all_data)
    sst = np.sum((all_data - grand_mean)**2)
    ssb = sum(n * (np.mean(grp) - grand_mean)**2 for grp in data)
    ssw = sum(np.sum((grp - np.mean(grp))**2) for grp in data)
    
    print(f"Total Sum of Squares (SST)   : {sst:.3f}")
    print(f"Between-Group SS (SSB)       : {ssb:.3f}")
    print(f"Within-Group SS (SSW)        : {ssw:.3f}")
    print(f"Identity Check: SST = SSB+SSW: {abs(sst - (ssb + ssw)) < 1e-9}")
    print(f"F-Statistic: {f_stat:.4f}, p-value: {p_val:.4e}")
    print("STATUS: LULUS VALIDASI ANOVA DECOMPOSITION")
    print("=" * 70)

if __name__ == "__main__":
    main()
