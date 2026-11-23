import json

with open("reports/python_runtime_regression.json", "r", encoding="utf-8") as f:
    d = json.load(f)

for item in d["results"]:
    if not item.get("numerical_ok", True):
        print(f"Lesson: {item.get('lesson_id')} in {item.get('file')}")
        print(f"Numerical Note: {item.get('numerical_note')}")
        print("Actual Output:")
        print(item.get("actual_output"))
