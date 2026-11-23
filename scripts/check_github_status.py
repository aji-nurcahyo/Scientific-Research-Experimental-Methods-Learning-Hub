"""
Check GitHub Actions deployment and live GitHub Pages status.
"""
import urllib.request
import json
import time

API_URL = "https://api.github.com/repos/aji-nurcahyo/Scientific-Research-Experimental-Methods-Learning-Hub/actions/runs"
PAGES_URL = "https://aji-nurcahyo.github.io/Scientific-Research-Experimental-Methods-Learning-Hub/"

def check_actions():
    req = urllib.request.Request(API_URL, headers={"User-Agent": "Antigravity-Release-Checker"})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            runs = data.get("workflow_runs", [])
            if not runs:
                print("No workflow runs found yet.")
                return None
            latest = runs[0]
            print(f"Workflow: {latest.get('name')}")
            print(f"Status  : {latest.get('status')}")
            print(f"Outcome : {latest.get('conclusion')}")
            print(f"URL     : {latest.get('html_url')}")
            return latest
    except Exception as e:
        print(f"GitHub API query info: {e}")
        return None

def check_pages():
    req = urllib.request.Request(PAGES_URL, headers={"User-Agent": "Antigravity-Release-Checker"})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            code = response.getcode()
            content = response.read(1000).decode('utf-8', errors='ignore')
            print(f"HTTP Status: {code}")
            if "Scientific Research & Experimental Methods" in content:
                print("Live Page Content: VERIFIED (Expected title/meta present!)")
                return True
            else:
                print(f"Page returned {code}, preview:\n{content[:200]}")
                return code == 200
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}")
        return False
    except Exception as e:
        print(f"Connection check info: {e}")
        return False

def main():
    print("=" * 80)
    print("CHECKING GITHUB ACTIONS & LIVE RELEASE")
    print("=" * 80)
    print("\n1. Querying GitHub Actions Workflow Runs:")
    check_actions()
    print("\n2. Querying Live GitHub Pages URL:")
    check_pages()

if __name__ == '__main__':
    main()
