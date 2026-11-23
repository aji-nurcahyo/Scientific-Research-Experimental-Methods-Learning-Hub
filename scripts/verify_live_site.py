"""
Live verification script for GitHub Pages deployment.
Tests critical assets, chunk loading, KaTeX, and 404 fallback.
"""
import urllib.request

BASE_URL = "https://aji-nurcahyo.github.io/Scientific-Research-Experimental-Methods-Learning-Hub"

ASSETS_TO_TEST = [
    ("", "Homepage HTML"),
    ("/404.html", "SPA 404 Fallback HTML"),
    ("/assets/index-C1_TibnC.js", "Main Entry JavaScript Bundle"),
    ("/assets/index-BGRFrWrc.css", "Global Academic CSS & Print Styles"),
    ("/assets/katex-Dc8nsIP1.js", "KaTeX Math Rendering Engine"),
    ("/assets/icons-CEdd8JoA.js", "Lucide Icons Bundle"),
    ("/assets/vendor-BdyxKZx9.js", "React & DOM Vendor Bundle"),
    ("/assets/ch01-Bbvx-YTU.js", "Level 1 Chunk (CH-01: Epistemology)"),
    ("/assets/ch27-BbcYu3-a.js", "Level 4 Chunk (CH-27: Mixed-Effects)"),
    ("/assets/ch51-B84HdY5Y.js", "Level 7 Chunk (CH-51: Capstone)"),
]

def main():
    print("=" * 80)
    print("LIVE WEBSITE VERIFICATION: GITHUB PAGES PUBLIC RELEASE")
    print(f"Target URL: {BASE_URL}/")
    print("=" * 80)

    all_passed = True

    for endpoint, label in ASSETS_TO_TEST:
        url = f"{BASE_URL}{endpoint}"
        req = urllib.request.Request(url, headers={"User-Agent": "Antigravity-Live-Verifier"})
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                code = resp.getcode()
                size = len(resp.read())
                if code == 200:
                    print(f"[PASS] {code} | {size:>8} bytes | {label:<35} | {endpoint}")
                else:
                    print(f"[FAIL] {code} | {label} | {url}")
                    all_passed = False
        except Exception as e:
            print(f"[ERROR] {label:<35} | {url} -> {e}")
            all_passed = False

    print("=" * 80)
    if all_passed:
        print("ALL CRITICAL PUBLIC ASSETS VERIFIED SUCCESSFULLY ON GITHUB PAGES (HTTP 200)!")
    else:
        print("SOME ASSETS FAILED TO LOAD.")

if __name__ == '__main__':
    main()
