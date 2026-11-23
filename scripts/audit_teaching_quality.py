import json
import re
from pathlib import Path

ch_files = sorted(Path('src/lessons').glob('ch*.ts'))
print(f"Total chapter files found: {len(ch_files)}")

total_slides = 0
slide_categories = {}
formula_count = 0
bullet_count = 0
placeholder_issues = []
chapters_summary = []

for ch in ch_files:
    text = ch.read_text(encoding='utf-8')
    # Match slides pattern
    slide_matches = re.finditer(
        r'\{\s*slideNumber:\s*(\d+),\s*title:\s*["\']([^"\']+)["\'],\s*bulletPoints:\s*\[(.*?)\](?:,\s*keyFormulaOrDiagram:\s*["\'](.*?)["\'])?\s*\}',
        text,
        re.DOTALL
    )
    
    ch_slides = 0
    ch_formulas = 0
    ch_bullets = 0
    
    for m in slide_matches:
        s_num = int(m.group(1))
        title = m.group(2)
        bullets_raw = m.group(3)
        key_f = m.group(4) or ""
        
        total_slides += 1
        ch_slides += 1
        
        # Categorize title
        cat = title.split(':')[0].strip()
        slide_categories[cat] = slide_categories.get(cat, 0) + 1
        
        if key_f.strip():
            formula_count += 1
            ch_formulas += 1
            
        # Extract individual string literals from bullets_raw
        bullets = re.findall(r'["\']((?:\\.|[^"\'])*)["\']', bullets_raw)
        bullet_count += len(bullets)
        ch_bullets += len(bullets)
        
        for b in bullets:
            b_lower = b.lower()
            if any(p in b_lower for p in ['lorem ipsum', 'todo', 'tbd', 'placeholder', 'insert here']):
                placeholder_issues.append((ch.name, title, b))
                
    chapters_summary.append({
        "chapter": ch.stem,
        "slides": ch_slides,
        "bullets": ch_bullets,
        "formulas": ch_formulas
    })

print(f"\n==================================================")
print(f"TEACHING QUALITY & SLIDE AUDIT SUMMARY")
print(f"==================================================")
print(f"Total Chapters Audited          : {len(ch_files)}")
print(f"Total Substantive Slides        : {total_slides}")
print(f"Average Slides per Chapter      : {total_slides / len(ch_files):.1f}")
print(f"Total Bullet Points             : {bullet_count}")
print(f"Average Bullets per Slide       : {bullet_count / total_slides:.2f}")
print(f"Slides with Formal Formulas     : {formula_count} ({formula_count / total_slides * 100:.1f}%)")
print(f"Placeholder / AI Slop Artifacts : {len(placeholder_issues)}")

print(f"\nPedagogical Functions Breakdown:")
for cat, count in sorted(slide_categories.items(), key=lambda x: -x[1]):
    print(f"  - {cat:40s}: {count} slides ({count/total_slides*100:.1f}%)")

audit_report = {
    "total_chapters": len(ch_files),
    "total_slides": total_slides,
    "avg_slides_per_chapter": round(total_slides / len(ch_files), 1),
    "total_bullets": bullet_count,
    "avg_bullets_per_slide": round(bullet_count / total_slides, 2),
    "formula_coverage_pct": round(formula_count / total_slides * 100, 1),
    "placeholder_issues_count": len(placeholder_issues),
    "pedagogical_functions": slide_categories,
    "chapters": chapters_summary
}

with open("reports/teaching_quality_audit.json", "w", encoding="utf-8") as f:
    json.dump(audit_report, f, indent=2)

print("\nAudit report saved to reports/teaching_quality_audit.json")
