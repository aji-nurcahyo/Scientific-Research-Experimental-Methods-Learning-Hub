import json
import ast
from pathlib import Path

content = Path("src/lessons/ch07.ts").read_text(encoding="utf-8")
start = content.find('{', content.find('export const'))
end = content.rfind('}') + 1
data = json.loads(content[start:end])

code = data["1.7.4"]["pythonImplementation"]["code"]
code = code.replace(
    'data_eksperimen_asli = "TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.301"',
    'data_eksperimen_asli = """TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.301"""'
)
code = code.replace(
    'data_eksperimen_rusak = "TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.302"',
    'data_eksperimen_rusak = """TIMESTAMP,SENSOR_ID,VOLTAGE\n2026-11-23T05:00:00,S01,3.298\n2026-11-23T05:00:01,S01,3.302"""'
)

ast.parse(code)
print("AST parsed successfully for 1.7.4!")

data["1.7.4"]["pythonImplementation"]["code"] = code
ts_content = "import { Lesson } from '../types/curriculum';\n\nexport const CH07_LESSONS: Record<string, Partial<Lesson>> = " + json.dumps(data, indent=2) + ";\n"
Path("src/lessons/ch07.ts").write_text(ts_content, encoding="utf-8")
print("Saved ch07.ts successfully!")
