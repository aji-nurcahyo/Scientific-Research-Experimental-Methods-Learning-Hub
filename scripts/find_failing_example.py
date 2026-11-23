import json

with open("reports/python_runtime_regression.json", "r", encoding="utf-8") as f:
    results = json.load(f)

for r in results:
    if not r.get("output_matched", True) or not r.get("execution_passed", True):
        print(f"Lesson: {r.get('lesson_id')}")
        print(f"Syntax valid: {r.get('syntax_valid')}")
        print(f"Execution passed: {r.get('execution_passed')}")
        print(f"Output matched: {r.get('output_matched')}")
        print("Expected Output:")
        print(r.get("expected_output", ""))
        print("Actual Output:")
        print(r.get("actual_output", ""))
        print("-" * 50)
