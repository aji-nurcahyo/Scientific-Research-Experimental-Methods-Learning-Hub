import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Read MASTER_CURRICULUM.md
m_txt = (BASE_DIR / "docs" / "MASTER_CURRICULUM.md").read_text(encoding="utf-8")
meta_txt = (BASE_DIR / "src" / "data" / "curriculumMeta.ts").read_text(encoding="utf-8")

print("=" * 90)
print("INVESTIGASI CH-16 s.d. CH-31: TITLES & LESSON CONTENTS")
print("=" * 90)

for ch_num in range(16, 32):
    cid = f"CH-{ch_num:02d}"
    
    # 1. Title in MASTER_CURRICULUM.md
    m_ch_match = re.search(rf"#### {cid}:\s*(.+)", m_txt)
    m_title = m_ch_match.group(1).strip() if m_ch_match else "NOT FOUND"
    
    # 2. Title in curriculumMeta.ts
    meta_ch_match = re.search(rf'"{cid}":\s*\{{\s*"id":\s*"{cid}",\s*"levelId":\s*\d+,\s*"title":\s*"([^"]+)"', meta_txt)
    meta_title = meta_ch_match.group(1).strip() if meta_ch_match else "NOT FOUND"
    
    # 3. Read lesson file
    f_path = BASE_DIR / "src" / "lessons" / f"ch{ch_num:02d}.ts"
    if f_path.exists():
        f_txt = f_path.read_text(encoding="utf-8")
        f_lessons = re.findall(r"'(\d+\.\d+\.\d+)':\s*\{[^}}]*?title:\s*'([^']+)'", f_txt)
    else:
        f_lessons = []
        
    # 4. Master lessons
    # find section between #### CH-{ch_num} and #### CH-{ch_num+1}
    next_cid = f"CH-{ch_num+1:02d}" if ch_num < 51 else "LEVEL"
    pattern = rf"#### {cid}:.*?(?=#### CH-|\Z)"
    sec_match = re.search(pattern, m_txt, re.DOTALL)
    if sec_match:
        m_lessons = re.findall(r"-\s*\*Lesson (\d+\.\d+\.\d+):\*\s*(.+)", sec_match.group(0))
    else:
        m_lessons = []

    print(f"\n[{cid}]")
    print(f"  Master Title : {m_title}")
    print(f"  Meta Title   : {meta_title}")
    print(f"  Title Match? : {'YES' if m_title == meta_title else 'NO'}")
    
    print(f"  Lessons in Master ({len(m_lessons)}):")
    for lid, lt in m_lessons:
        print(f"    - {lid}: {lt}")
        
    print(f"  Lessons in File ({len(f_lessons)}):")
    for lid, lt in f_lessons:
        print(f"    - {lid}: {lt}")
        
    # Check if lesson titles match
    for (m_id, m_lt), (f_id, f_lt) in zip(m_lessons, f_lessons):
        if m_id != f_id:
            print(f"    [MISMATCH ID] Master {m_id} vs File {f_id}")
        # Clean markdown asterisks
        m_clean = m_lt.replace('*', '').strip()
        f_clean = f_lt.replace('*', '').strip()
        if m_clean != f_clean:
            print(f"    [MISMATCH TITLE for {m_id}]:")
            print(f"       Master: {m_clean}")
            print(f"       File  : {f_clean}")
