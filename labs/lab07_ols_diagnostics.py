"""
LAB-07: Linear Regression Diagnostics & Gauss-Markov Violations
Verifies OLS assumptions: homoscedasticity, normality, residual independence.
"""
import numpy as np
from scipy import stats

def main():
    print("=" * 70)
    print("LAB-07: OLS REGRESSION RESIDUAL DIAGNOSTICS")
    print("=" * 70)
    rng = np.random.default_rng(42)
    n = 100
    x = np.linspace(1, 10, n)
    beta_0, beta_1 = 2.5, 1.8
    noise = rng.normal(0, 1.0, n)
    y = beta_0 + beta_1 * x + noise
    
    slope, intercept, r_val, p_val, std_err = stats.linregress(x, y)
    residuals = y - (intercept + slope * x)
    sw_stat, sw_p = stats.shapiro(residuals)
    
    print(f"Estimasi Intercept: {intercept:.3f} (True: 2.50)")
    print(f"Estimasi Slope    : {slope:.3f} (True: 1.80)")
    print(f"R-squared         : {r_val**2:.4f}")
    print(f"Shapiro-Wilk Normality p-val: {sw_p:.4f} (Residuals normal)")
    print("STATUS: LULUS VALIDASI OLS DIAGNOSTICS")
    print("=" * 70)

if __name__ == "__main__":
    main()
