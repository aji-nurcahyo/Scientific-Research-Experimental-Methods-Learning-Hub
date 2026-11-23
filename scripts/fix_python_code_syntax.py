import json
import ast
import re
from pathlib import Path

lessons_dir = Path("src/lessons")

def fix_code(code_str):
    if not code_str:
        return code_str
    
    # 1. Fix print("\n...") or print(f"\n...") split across lines
    # Pattern: print(f?"\n\w... or print(" followed by newline
    code_str = re.sub(r'print\(f?"\s*\n\s*', 'print(f"\\n', code_str)
    code_str = re.sub(r'print\(f?"([^"]*?)\s*\n\s*"\)', r'print(f"\1\\n")', code_str)
    
    # 2. Fix multiline double-quoted strings assigned to variables (e.g. data_eksperimen_asli = "...\n...")
    # by converting them to triple quotes if they contain newlines
    def fix_multiline_assignment(match):
        var_name = match.group(1)
        prefix = match.group(2) # b or '' or f
        content = match.group(3)
        return f'{var_name} = {prefix}"""{content}"""'
    
    code_str = re.sub(r'(\w+)\s*=\s*(b|f)?"([^"\n]*\n[^"]*)"', fix_multiline_assignment, code_str)
    
    # 3. Fix specific known patterns
    # print(teks_json[:350] + "\n  ...\n}") -> triple quotes or clean
    code_str = code_str.replace('print(teks_json[:350] + "\n  ...\n}")', 'print(teks_json[:350] + "\\n  ...\\n}")')
    code_str = code_str.replace('print(json.dumps(doc, indent=2)[:400] + "\n  ... [TRUNCATED] ...\n}")', 'print(json.dumps(doc, indent=2)[:400] + "\\n  ... [TRUNCATED] ...\\n}")')
    
    code_str = code_str.replace('data_eksperimen_asli = "TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.301"', 'data_eksperimen_asli = """TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.301"""')
    code_str = code_str.replace('data_eksperimen_rusak = "TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.302"', 'data_eksperimen_rusak = """TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.302"""')
    
    # 4. If ast still fails, try line-by-line fix for broken print statements
    try:
        ast.parse(code_str)
        return code_str
    except SyntaxError:
        pass

    lines = code_str.split("\n")
    fixed_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Check if line has unmatched quote in print
        if (line.strip().startswith('print("') or line.strip().startswith('print(f"')) and line.count('"') % 2 == 1:
            if i + 1 < len(lines):
                next_line = lines[i+1]
                # Merge with \n
                merged = line.rstrip() + "\\n" + next_line.lstrip()
                fixed_lines.append(merged)
                i += 2
                continue
        elif line.strip().endswith("'") and i + 1 < len(lines) and lines[i+1].strip() == '")':
            # e.g. print(f"..."\n")
            line_clean = line.rstrip()[:-1] + "\\n\")"
            fixed_lines.append(line_clean)
            i += 2
            continue
        elif line.strip().endswith('"') and i + 1 < len(lines) and lines[i+1].strip() == '")':
            line_clean = line.rstrip()[:-1] + '\\n")'
            fixed_lines.append(line_clean)
            i += 2
            continue
        fixed_lines.append(line)
        i += 1

    candidate = "\n".join(fixed_lines)
    try:
        ast.parse(candidate)
        return candidate
    except SyntaxError:
        return code_str

total_fixed = 0

for f in sorted(lessons_dir.glob("ch*.ts")):
    content = f.read_text(encoding="utf-8")
    start = content.find('{', content.find('export const'))
    end = content.rfind('}') + 1
    data = json.loads(content[start:end])
    modified = False

    for lid, lesson in data.items():
        py_impl = lesson.get("pythonImplementation") or {}
        code = py_impl.get("code")
        if code:
            try:
                ast.parse(code)
            except SyntaxError:
                fixed = fix_code(code)
                try:
                    ast.parse(fixed)
                    py_impl["code"] = fixed
                    modified = True
                    total_fixed += 1
                    print(f"  [FIXED] {lid} in {f.name}")
                except SyntaxError as e2:
                    print(f"  [STILL FAILING] {lid} in {f.name}: {e2}")

    if modified:
        export_key = re.search(r"export const (\w+):", content).group(1)
        ts_content = f"import {{ Lesson }} from '../types/curriculum';\n\nexport const {export_key}: Record<string, Partial<Lesson>> = {json.dumps(data, indent=2)};\n"
        ts_content = ts_content.replace("—", " - ").replace("–", "-")
        f.write_text(ts_content, encoding="utf-8")

print(f"\nTotal Python code snippets fixed: {total_fixed}")
