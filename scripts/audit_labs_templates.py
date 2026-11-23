import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Read laboratoriesData.ts
lab_txt = (BASE_DIR / "src" / "data" / "laboratoriesData.ts").read_text(encoding="utf-8")
cmds = re.findall(r'"reproducibilityCommand":\s*"([^"]+)"', lab_txt)
titles = re.findall(r'"title":\s*"([^"]+)"', lab_txt)

print("AUDIT LABORATORIES:")
print(f"Total labs found: {len(cmds)}")
for i, (t, c) in enumerate(zip(titles[:5], cmds[:5]), 1):
    print(f"  LAB-{i:02d}: {t}")
    print(f"    Command: {c}")

# Read templatesData.ts
tmpl_txt = (BASE_DIR / "src" / "data" / "templatesData.ts").read_text(encoding="utf-8")
t_ids = re.findall(r'"id":\s*"(TMPL-\d+)"', tmpl_txt)
t_titles = re.findall(r'"title":\s*"([^"]+)"', tmpl_txt)
print("\nAUDIT TEMPLATES:")
print(f"Total templates found: {len(t_ids)}")
for i, (tid, tt) in enumerate(zip(t_ids[:5], t_titles[:5]), 1):
    print(f"  {tid}: {tt}")

# Read learningPathsData.ts
lp_txt = (BASE_DIR / "src" / "data" / "learningPathsData.ts").read_text(encoding="utf-8")
lp_ids = re.findall(r'"id":\s*"(PATH-\d+)"', lp_txt)
print("\nAUDIT LEARNING PATHS:")
print(f"Total paths found: {len(lp_ids)}")
