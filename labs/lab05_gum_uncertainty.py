"""
LAB-05: GUM Uncertainty Evaluation & Differential Error Propagation
Evaluates Taylor expansion linear uncertainty propagation vs Monte Carlo validation.
"""
import argparse
import numpy as np

def main():
    parser = argparse.ArgumentParser(description="LAB-05: GUM Uncertainty")
    parser.add_argument("--runs", type=int, default=30, help="Observed laboratory readings")
    parser.add_argument("--mc-trials", type=int, default=100000, help="Monte Carlo verification trials")
    args = parser.parse_args()

    print("=" * 70)
    print("LAB-05: GUM UNCERTAINTY BUDGET & ERROR PROPAGATION (JCGM 100:2008)")
    print("Model Pengukuran Daya Motor Listrik: P = V * I * cos(theta)")
    print("=" * 70)

    # Nilai nominal dan estimasi ketidakpastian baku
    v_mean, v_u = 220.0, 0.5   # Volt
    i_mean, i_u = 10.0, 0.08   # Ampere
    pf_mean, pf_u = 0.85, 0.01 # Power factor (cos theta)

    # 1. Metode Analitis GUM (Turunan Parsial Orde 1)
    p_mean = v_mean * i_mean * pf_mean

    c_v = i_mean * pf_mean       # dP/dV
    c_i = v_mean * pf_mean       # dP/dI
    c_pf = v_mean * i_mean       # dP/dPF

    var_p = (c_v * v_u)**2 + (c_i * i_u)**2 + (c_pf * pf_u)**2
    u_c = np.sqrt(var_p)
    u_expanded = 2.0 * u_c # k=2, 95% level of confidence

    print(f"\n[1] ANGGARAN KETIDAKPASTIAN GUM ANALITIS:")
    print(f"  * Daya Terukur Nominal (P)      : {p_mean:.2f} W")
    print(f"  * Komponen Sensitivitas V (u_V) : c_V * u = {c_v * v_u:.3f} W ({(c_v * v_u)**2 / var_p * 100:.1f}%)")
    print(f"  * Komponen Sensitivitas I (u_I) : c_I * u = {c_i * i_u:.3f} W ({(c_i * i_u)**2 / var_p * 100:.1f}%)")
    print(f"  * Komponen Sensitivitas PF      : c_PF* u = {c_pf * pf_u:.3f} W ({(c_pf * pf_u)**2 / var_p * 100:.1f}%)")
    print(f"  * Ketidakpastian Baku Gabungan  : u_c(P) = {u_c:.3f} W")
    print(f"  * Expanded Uncertainty (k=2)    : U_95   = {u_expanded:.3f} W ({u_expanded/p_mean*100:.2f}%)")

    # 2. Verifikasi Simulasi Monte Carlo
    rng = np.random.default_rng(42)
    v_sim = rng.normal(v_mean, v_u, args.mc_trials)
    i_sim = rng.normal(i_mean, i_u, args.mc_trials)
    pf_sim = rng.normal(pf_mean, pf_u, args.mc_trials)
    p_sim = v_sim * i_sim * pf_sim

    mc_mean = np.mean(p_sim)
    mc_std = np.std(p_sim, ddof=1)
    discrepancy_pct = abs(mc_std - u_c) / u_c * 100

    print(f"\n[2] VERIFIKASI MONTE CARLO ({args.mc_trials} ITERASI):")
    print(f"  * Rata-rata Daya MC            : {mc_mean:.2f} W")
    print(f"  * Standar Deviasi MC           : {mc_std:.3f} W")
    print(f"  * Deviasi GUM vs Monte Carlo   : {discrepancy_pct:.3f}% (Batas Toleransi < 2.00%)")

    if discrepancy_pct < 2.0:
        print("\nSTATUS: LULUS VALIDASI GUM METROLOGI INTERNASIONAL")
    else:
        print("\nSTATUS: GAGAL")
    print("=" * 70)

if __name__ == "__main__":
    main()
