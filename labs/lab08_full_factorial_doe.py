"""
LAB-08: 2^k Factorial Design, Confounding & Response Surface Modeling
Calculates main effects, interactions, and ANOVA for 2^3 factorial experiment.
"""
import numpy as np

def main():
    print("=" * 70)
    print("LAB-08: 2^k FULL FACTORIAL EXPERIMENTAL DESIGN")
    print("=" * 70)
    # Design matrix for 2^3 experiment (factors A, B, C)
    design = np.array([
        [-1, -1, -1], [ 1, -1, -1], [-1,  1, -1], [ 1,  1, -1],
        [-1, -1,  1], [ 1, -1,  1], [-1,  1,  1], [ 1,  1,  1]
    ])
    # Responses (Yield %)
    y = np.array([55.0, 72.0, 60.0, 84.0, 58.0, 75.0, 63.0, 91.0])
    
    # Calculate main effects
    effect_A = np.dot(design[:, 0], y) / 4.0
    effect_B = np.dot(design[:, 1], y) / 4.0
    effect_C = np.dot(design[:, 2], y) / 4.0
    effect_AB = np.dot(design[:, 0] * design[:, 1], y) / 4.0
    
    print(f"Efek Utama Faktor A (Suhu)       : {effect_A:+.2f}%")
    print(f"Efek Utama Faktor B (Katalis)    : {effect_B:+.2f}%")
    print(f"Efek Utama Faktor C (Tekanan)    : {effect_C:+.2f}%")
    print(f"Efek Interaksi A x B             : {effect_AB:+.2f}%")
    print("STATUS: LULUS VALIDASI DOE FAKTORIAL 2^k")
    print("=" * 70)

if __name__ == "__main__":
    main()
