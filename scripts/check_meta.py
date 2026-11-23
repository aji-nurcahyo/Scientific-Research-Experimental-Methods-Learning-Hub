import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
txt = (BASE_DIR / "src" / "data" / "curriculumMeta.ts").read_text(encoding="utf-8")
lesson_ids = re.findall(r'"id":\s*"(\d+\.\d+\.\d+)"', txt)
print(f"Total lesson IDs in curriculumMeta.ts: {len(lesson_ids)}")

# Group by chapter
from collections import Counter
ch_counts = Counter()
for ch_id in range(1, 52):
    cid = f"CH-{ch_id:02d}"
    # find chapter block
    pattern = rf'"{cid}":\s*\{{(.*?)\n  \}},?'
    m = re.search(pattern, txt, re.DOTALL)
    if m:
        l_in_ch = re.findall(r'"id":\s*"(\d+\.\d+\.\d+)"', m.group(1))
        ch_counts[cid] = len(l_in_ch)
    else:
        ch_counts[cid] = 0

print("Sample counts per chapter in curriculumMeta.ts:")
for cid, cnt in list(ch_counts.items())[:10]:
    print(f"  {cid}: {cnt} lessons")

print("Distinct lesson counts:", set(ch_counts.values()))
