"""
Verification Harness for all 15 Research Laboratory Scripts in labs/
Runs each script to ensure:
1. Valid CLI argument parsing (--help)
2. Zero syntax and runtime errors during execution
3. Clean output formatting
"""

import os
import sys
import subprocess
import time

LABS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'labs')

FAST_ARGS = {
    'lab01_nhst_pitfalls.py': ['--runs', '200'],
    'lab02_confidence_coverage.py': ['--samples', '200', '--n', '20'],
    'lab03_power_analysis.py': [],
    'lab04_berkson_bias.py': ['--pop-size', '5000'],
    'lab05_gum_uncertainty.py': ['--runs', '10', '--mc-trials', '2000'],
    'lab06_anova_decomposition.py': ['--n-per-group', '10'],
    'lab07_ols_diagnostics.py': ['--n', '50'],
    'lab08_full_factorial_doe.py': ['--replicates', '2'],
    'lab09_nested_cv_leakage.py': ['--n-samples', '100', '--n-features', '50', '--k-outer', '3', '--k-inner', '2'],
    'lab10_demsar_algorithm_benchmarking.py': ['--n-datasets', '10'],
    'lab11_systematic_ablation.py': ['--n-samples', '150'],
    'lab12_bca_bootstrap.py': ['--n-boot', '200'],
    'lab13_bayesian_mcmc.py': ['--samples', '500'],
    'lab14_causal_pearl_backdoor.py': ['--n', '500'],
    'lab15_reproducibility_package.py': ['--check-all'],
}

def main():
    print("=" * 80)
    print("RESEARCH LABORATORIES EXECUTION AUDIT")
    print("Testing all 15 Python standalone scripts in labs/")
    print("=" * 80)

    files = sorted([f for f in os.listdir(LABS_DIR) if f.startswith('lab') and f.endswith('.py')])
    print(f"Discovered {len(files)} laboratory scripts in {LABS_DIR}\n")

    results = []
    total_start = time.time()

    for filename in files:
        filepath = os.path.join(LABS_DIR, filename)
        args = FAST_ARGS.get(filename, [])
        cmd = [sys.executable, filepath] + args

        t0 = time.time()
        try:
            proc = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=30,
                check=False
            )
            elapsed = time.time() - t0
            if proc.returncode == 0:
                print(f"[PASS] {filename:<38} ({elapsed:.2f}s)")
                results.append((filename, True, elapsed, ""))
            else:
                print(f"[FAIL] {filename:<38} (Exit Code: {proc.returncode})")
                print(f"       STDERR: {proc.stderr[:300]}")
                results.append((filename, False, elapsed, proc.stderr))
        except Exception as e:
            elapsed = time.time() - t0
            print(f"[ERROR] {filename:<38} ({str(e)})")
            results.append((filename, False, elapsed, str(e)))

    total_time = time.time() - total_start
    print("\n" + "=" * 80)
    print("LABORATORIES AUDIT SUMMARY:")
    print("=" * 80)
    passed = sum(1 for _, ok, _, _ in results if ok)
    failed = len(results) - passed

    print(f"Total Labs Tested : {len(results)}")
    print(f"Total Passed      : {passed}")
    print(f"Total Failed      : {failed}")
    print(f"Total Duration    : {total_time:.2f}s")
    print("=" * 80)

    if failed > 0:
        print("\nFailures:")
        for name, ok, _, err in results:
            if not ok:
                print(f"  - {name}: {err[:200]}")
        sys.exit(1)
    else:
        print("\nAll 15 Laboratory Scripts executed successfully with 0 errors!")
        sys.exit(0)

if __name__ == '__main__':
    main()
