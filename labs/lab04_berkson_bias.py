"""
LAB-04: Sampling Bias & Selection Distortion (Berkson's Fallacy)
Demonstrates spurious negative correlation induced by collider conditioning.
"""
import argparse
import numpy as np
from scipy import stats

def main():
    parser = argparse.ArgumentParser(description="LAB-04: Berkson's Bias")
    parser.add_argument("--pop-size", type=int, default=100000, help="Population size")
    parser.add_argument("--seed", type=int, default=77, help="Random seed")
    args = parser.parse_args()

    rng = np.random.default_rng(args.seed)

    print("=" * 70)
    print("LAB-04: SAMPLING BIAS & SELECTION DISTORTION (BERKSON'S FALLACY)")
    print(f"Populasi: {args.pop_size} unit, Seed: {args.seed}")
    print("=" * 70)

    # Dua variabel acak independen sejati pada populasi
    x = rng.normal(0, 1, args.pop_size)
    y = rng.normal(0, 1, args.pop_size)

    r_pop, p_pop = stats.pearsonr(x, y)
    print(f"\n[1] PADA POPULASI LENGKAP (UNBIASED):")
    print(f"  * Korelasi Pearson (r) : {r_pop:+.4f}")
    print(f"  * Nilai p-value        : {p_pop:.4f} (Tidak Signifikan -> X & Y Independen Murni)")

    # Mekanisme seleksi berkson: Unit dipilih jika X + Y > ambang batas (Collider conditioning S=1)
    threshold = 0.5
    selection_prob = 1.0 / (1.0 + np.exp(-(2.0 * x + 2.0 * y - threshold)))
    selected_mask = rng.uniform(0, 1, args.pop_size) < selection_prob

    x_sel = x[selected_mask]
    y_sel = y[selected_mask]

    r_sel, p_sel = stats.pearsonr(x_sel, y_sel)
    print(f"\n[2] PADA SAMPEL TERPILIH (COLLIDER CONDITIONING S=1):")
    print(f"  * Jumlah Sampel Masuk : {len(x_sel)} / {args.pop_size} ({len(x_sel)/args.pop_size*100:.1f}%)")
    print(f"  * Korelasi Pearson (r): {r_sel:+.4f} (KORELASI SEMU NEGATIF KUAT!)")
    print(f"  * Nilai p-value       : {p_sel:.4e} (Sangat Signifikan Palsu!)")

    print("\nKESIMPULAN KAUSAL: Pengkondisian pada seleksi (collider) merusak independensi,")
    print("menciptakan artefak statistik semu yang menyesatkan para peneliti!")
    print("=" * 70)

if __name__ == "__main__":
    main()
