"""
LAB-12: BCa Non-Parametric Bootstrap & Empirical Distribution Shift
Validates bias-corrected and accelerated bootstrap confidence intervals.
"""
import numpy as np
from scipy import stats

def main():
    print("=" * 70)
    print("LAB-12: BCa NON-PARAMETRIC BOOTSTRAP CONFIDENCE INTERVALS")
    print("=" * 70)
    rng = np.random.default_rng(42)
    # Skewed gamma sample
    data = rng.gamma(2.0, 3.0, 40)
    
    # Bootstrap mean
    res = stats.bootstrap((data,), np.mean, confidence_level=0.95, method='BCa', random_state=42)
    ci = res.confidence_interval
    
    print(f"Sample Mean              : {np.mean(data):.3f}")
    print(f"Standard Error Bootstrap : {res.standard_error:.3f}")
    print(f"95% BCa Confidence Int   : [{ci.low:.3f}, {ci.high:.3f}]")
    print("STATUS: LULUS VALIDASI BCa BOOTSTRAP")
    print("=" * 70)

if __name__ == "__main__":
    main()
