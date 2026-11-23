import re
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# 1. Search for 174 everywhere
print("SEARCHING FOR '174' ACROSS REPOSITORY:")
print("-" * 60)
for p in BASE_DIR.rglob('*'):
    if p.is_file() and not any(part in p.parts for part in ['node_modules', '.git', 'dist', '.gemini']):
        try:
            txt = p.read_text(encoding='utf-8')
            if '174' in txt:
                matches = [line.strip() for line in txt.splitlines() if '174' in line]
                print(f"File: {p.relative_to(BASE_DIR)}")
                for m in matches[:5]:
                    print(f"  {m}")
        except Exception as e:
            pass

# 2. Extract chapters and titles from MASTER_CURRICULUM.md
curriculum_text = (BASE_DIR / "docs" / "MASTER_CURRICULUM.md").read_text(encoding="utf-8")
ch_master = re.findall(r"#### (CH-\d+):\s*(.+)", curriculum_text)
master_dict = {cid: title.strip() for cid, title in ch_master}

# Extract lessons per chapter in MASTER_CURRICULUM.md
master_lessons_per_ch = {}
current_ch = None
for line in curriculum_text.splitlines():
    m_ch = re.match(r"#### (CH-\d+):", line)
    if m_ch:
        current_ch = m_ch.group(1)
        master_lessons_per_ch[current_ch] = []
    m_les = re.match(r"\s*-\s*\*Lesson (\d+\.\d+\.\d+):\*\s*(.+)", line)
    if m_les and current_ch:
        master_lessons_per_ch[current_ch].append((m_les.group(1), m_les.group(2).strip()))

# 3. Extract from curriculumMeta.ts
meta_text = (BASE_DIR / "src" / "data" / "curriculumMeta.ts").read_text(encoding="utf-8")
# Extract JSON objects or regex
ch_meta_blocks = re.findall(r'"(CH-\d+)":\s*\{\s*"id":\s*"(CH-\d+)",\s*"levelId":\s*(\d+),\s*"title":\s*"([^"]+)"', meta_text)
meta_dict = {cid: title for cid, _, lvl, title in ch_meta_blocks}

meta_lessons_per_ch = {}
for cid in meta_dict.keys():
    # find block for this chapter
    pattern = rf'"{cid}":\s*\{{(?:(?!}}\,\s*"CH-).)*"lessons":\s*\[(.*?)\]\s*\}}'
    m = re.search(pattern, meta_text, re.DOTALL)
    if m:
        lessons_block = m.group(1)
        l_items = re.findall(r'"id":\s*"(\d+\.\d+\.\d+)",\s*"chapterId":\s*"CH-\d+",\s*"title":\s*"([^"]+)"', lessons_block)
        meta_lessons_per_ch[cid] = l_items
    else:
        meta_lessons_per_ch[cid] = []

# 4. Extract from src/lessons/
lesson_files = sorted((BASE_DIR / "src" / "lessons").glob("ch*.ts"))
lessons_content_dict = {}
lesson_titles_in_files = {}

for f in lesson_files:
    cid_num = int(f.stem.replace("ch", ""))
    cid = f"CH-{cid_num:02d}"
    txt = f.read_text(encoding="utf-8")
    l_entries = re.findall(r"'(\d+\.\d+\.\d+)':\s*\{\s*id:\s*'(\d+\.\d+\.\d+)',\s*chapterId:\s*'([^']+)',\s*title:\s*'([^']+)'", txt)
    lessons_content_dict[cid] = l_entries

print("\n" + "=" * 80)
print("CHAPTER TITLE RECONCILIATION TABLE (ALL 51 CHAPTERS):")
print("=" * 80)
print(f"{'Chapter':<7} | {'MASTER_CURRICULUM.md':<40} | {'curriculumMeta.ts':<40} | {'Match?'}")
print("-" * 95)

title_mismatches = []
for i in range(1, 52):
    cid = f"CH-{i:02d}"
    m_title = master_dict.get(cid, "NOT FOUND")
    meta_t = meta_dict.get(cid, "NOT FOUND")
    match_str = "MATCH" if m_title == meta_t else "MISMATCH"
    if match_str == "MISMATCH":
        title_mismatches.append((cid, m_title, meta_t))
    print(f"{cid:<7} | {m_title[:38]:<40} | {meta_t[:38]:<40} | {match_str}")

print("\n" + "=" * 80)
print(f"TITLE MISMATCH SUMMARY: {len(title_mismatches)} chapters differ")
print("=" * 80)
for cid, m_title, meta_t in title_mismatches:
    print(f"[{cid}]")
    print(f"  MASTER : {m_title}")
    print(f"  META   : {meta_t}")

print("\n" + "=" * 80)
print("LESSON COUNT PER CHAPTER RECONCILIATION:")
print("=" * 80)
print(f"{'Chapter':<7} | {'Master Count':<12} | {'Meta Count':<12} | {'Content File Count':<18} | {'Status'}")
print("-" * 65)

total_m_lessons = 0
total_meta_lessons = 0
total_file_lessons = 0

for i in range(1, 52):
    cid = f"CH-{i:02d}"
    m_cnt = len(master_lessons_per_ch.get(cid, []))
    meta_cnt = len(meta_lessons_per_ch.get(cid, []))
    file_cnt = len(lessons_content_dict.get(cid, []))
    
    total_m_lessons += m_cnt
    total_meta_lessons += meta_cnt
    total_file_lessons += file_cnt
    
    st = "OK" if (m_cnt == meta_cnt == file_cnt) else "DISCREPANCY"
    print(f"{cid:<7} | {m_cnt:<12} | {meta_cnt:<12} | {file_cnt:<18} | {st}")

print("-" * 65)
print(f"TOTAL   | {total_m_lessons:<12} | {total_meta_lessons:<12} | {total_file_lessons:<18}")
