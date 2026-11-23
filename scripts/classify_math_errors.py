import json

with open("reports/math_integrity_audit.json", "r", encoding="utf-8") as f:
    d = json.load(f)

print(f"Total broken: {len(d['brokenEquations'])}")
canonical_broken = []
slide_broken = []

for b in d['brokenEquations']:
    if "Slide" in b['location']:
        slide_broken.append(b)
    else:
        canonical_broken.append(b)

print(f"Broken in canonical lessons: {len(canonical_broken)}")
print(f"Broken in generated slides:  {len(slide_broken)}")

print("\n--- CANONICAL LESSON BROKEN EQUATIONS ---")
for b in canonical_broken:
    print(f"[{b['location']}]")
    print(f"  Error: {b['error']}")
    print(f"  Snippet: {b['equation'][:100]}")

print(f"\n--- SLIDE BROKEN EQUATIONS SUMMARY ({len(slide_broken)} total) ---")
slide_err_types = {}
for b in slide_broken:
    err = b['error'].split(':')[0]
    slide_err_types[err] = slide_err_types.get(err, 0) + 1
for k, v in slide_err_types.items():
    print(f"  {k}: {v}")
