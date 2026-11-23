"""
Generates src/data/labScriptsData.ts from verified Python scripts in labs/
Maps lab IDs (LAB-01 to LAB-15) to their full executable Python source code.
"""

import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LABS_DIR = os.path.join(BASE_DIR, 'labs')
OUT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'labScriptsData.ts')

def main():
    files = sorted([f for f in os.listdir(LABS_DIR) if f.startswith('lab') and f.endswith('.py')])
    print(f"Reading {len(files)} scripts from {LABS_DIR}...")

    lab_map = {}
    for filename in files:
        # extract ID e.g. 'lab01' -> 'LAB-01'
        prefix = filename.split('_')[0].upper() # 'LAB01'
        lab_id = f"LAB-{prefix[3:]}"
        filepath = os.path.join(LABS_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            code = f.read()
        lab_map[lab_id] = {
            'filename': filename,
            'code': code
        }

    ts_content = "/**\n * Source code mapping for all 15 Practical Research Laboratories.\n"
    ts_content += " * Automatically generated from verified labs/*.py scripts.\n */\n\n"
    ts_content += "export interface LabScriptInfo {\n"
    ts_content += "  filename: string;\n"
    ts_content += "  code: string;\n"
    ts_content += "}\n\n"
    ts_content += "export const LAB_SCRIPTS_MAP: Record<string, LabScriptInfo> = {\n"

    for lab_id, info in lab_map.items():
        escaped_code = json.dumps(info['code'])
        ts_content += f"  {json.dumps(lab_id)}: {{\n"
        ts_content += f"    filename: {json.dumps(info['filename'])},\n"
        ts_content += f"    code: {escaped_code}\n"
        ts_content += "  },\n"

    ts_content += "};\n"

    with open(OUT_FILE, 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print(f"Successfully generated {OUT_FILE} with {len(lab_map)} laboratory scripts!")

if __name__ == '__main__':
    main()
