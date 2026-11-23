"""
Pre-publication safety, secrets, and cleanliness audit script.
Scans all trackable files in the repository.
"""
import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

IGNORE_DIRS = {'.git', 'node_modules', 'dist', '__pycache__', '.pytest_cache'}
SENSITIVE_PATTERNS = [
    (r'(?i)api[_-]?key\s*[:=]\s*["\'][a-zA-Z0-9_\-]{16,}["\']', "Potential API Key"),
    (r'(?i)secret\s*[:=]\s*["\'][a-zA-Z0-9_\-]{16,}["\']', "Potential Secret"),
    (r'(?i)ghp_[a-zA-Z0-9]{36}', "GitHub Personal Access Token"),
    (r'(?i)sk-[a-zA-Z0-9]{20,}', "OpenAI/Claude API Key"),
    (r'(?i)AKIA[0-9A-Z]{16}', "AWS Access Key"),
]

def main():
    print("=" * 80)
    print("PRE-PUBLICATION SAFETY & CLEANLINESS AUDIT")
    print("=" * 80)

    issues = []
    large_files = []
    total_files = 0

    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for f in files:
            filepath = os.path.join(root, f)
            relpath = os.path.relpath(filepath, BASE_DIR)
            total_files += 1

            # Check file size (> 1.5MB)
            size_mb = os.path.getsize(filepath) / (1024 * 1024)
            if size_mb > 1.5 and not relpath.endswith('.lock'):
                large_files.append((relpath, size_mb))

            # Only check text files
            if any(relpath.endswith(ext) for ext in ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md', '.py', '.yml', '.yaml']):
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
                        content = fp.read()
                except Exception:
                    continue

                # Check secret patterns
                for pattern, desc in SENSITIVE_PATTERNS:
                    if re.search(pattern, content):
                        issues.append((relpath, desc))

                # Check em dash in source files
                if relpath.startswith(('src/', 'labs/')) and '—' in content:
                    issues.append((relpath, "Rule R-02 Violation: Em-dash ('—') detected"))

    print(f"Scanned {total_files} files across repository.\n")

    if large_files:
        print("Large Files (> 1.5 MB):")
        for p, s in large_files:
            print(f"  - {p} ({s:.2f} MB)")
    else:
        print("[PASS] No excessively large tracked files found.")

    if issues:
        print("\n[FAIL] Potential Security or Compliance Issues Found:")
        for p, d in issues:
            print(f"  - {p}: {d}")
        return False
    else:
        print("[PASS] No hardcoded API keys, tokens, or private credentials detected.")
        print("[PASS] Zero em-dashes detected in source and laboratory files.")
        print("\nSafety Audit PASSED: Ready for public release!")
        return True

if __name__ == '__main__':
    main()
