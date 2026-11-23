import re
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# 1. Read MASTER_CURRICULUM.md
curriculum_text = (BASE_DIR / "docs" / "MASTER_CURRICULUM.md").read_text(encoding="utf-8")
ch_master = re.findall(r"#### (CH-\d+):\s*(.+)", curriculum_text)
lessons_master = re.findall(r"- \*Lesson (\d+\.\d+\.\d+):\*\s*(.+)", curriculum_text)

# 2. Read curriculumMeta.ts
meta_text = (BASE_DIR / "src" / "data" / "curriculumMeta.ts").read_text(encoding="utf-8")
ch_meta_matches = re.findall(r"id:\s*'(CH-\d+)',\s*(?:sectionId:[^,]+,)?\s*levelId:\s*(\d+),\s*title:\s*'([^']+)'", meta_text)
lesson_meta_matches = re.findall(r"id:\s*'(\d+\.\d+\.\d+)',\s*chapterId:\s*'(CH-\d+)',\s*title:\s*'([^']+)'", meta_text)

# 3. Read lessons directory
lesson_files = sorted((BASE_DIR / "src" / "lessons").glob("ch*.ts"))
lessons_in_files = {}
for f in lesson_files:
    txt = f.read_text(encoding="utf-8")
    l_ids = re.findall(r"'(\d+\.\d+\.\d+)':\s*\{", txt)
    lessons_in_files[f.stem.upper()] = l_ids

print("=" * 80)
print("AUDIT BASELINE INVENTARIS:")
print("=" * 80)
print(f"MASTER_CURRICULUM.md : {len(ch_master)} Chapters, {len(lessons_master)} Lessons")
print(f"curriculumMeta.ts    : {len(ch_meta_matches)} Chapters, {len(lesson_meta_matches)} Lessons")
print(f"src/lessons/ (files) : {len(lesson_files)} Files, {sum(len(v) for v in lessons_in_files.values())} Total Lessons")

# Check historical phase0 v1
hist_files = list((BASE_DIR / "docs" / "historical" / "phase0_v1").glob("*.md"))
print(f"Historical files in phase0_v1: {len(hist_files)}")
for hf in hist_files:
    htxt = hf.read_text(encoding="utf-8")
    if "174" in htxt:
        print(f"Found '174' in historical file: {hf.name}")

# Check Chapter titles comparison
print("\n" + "=" * 80)
print("PERBANDINGAN JUDUL CHAPTER: MASTER CURRICULUM vs METADATA")
print("=" * 80)
meta_dict = {cid: title for cid, lvl, title in ch_meta_matches}
master_dict = {cid: title.strip() for cid, title in ch_master}

diffs = []
for cid, m_title in master_dict.items():
    meta_t = meta_dict.get(cid, "MISSING IN META")
    if m_title != meta_t:
        diffs.append((cid, m_title, meta_t))

print(f"Total Chapter dengan Judul Berbeda: {len(diffs)}")
for cid, m_title, meta_t in diffs:
    print(f"\n[{cid}]")
    print(f"  Master   : {m_title}")
    print(f"  Metadata : {meta_t}")
