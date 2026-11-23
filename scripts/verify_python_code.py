"""
Automated Python Code Extraction, Syntax Validation & Test Execution Harness
For all 51 Chapters and 204 Lessons.
"""
import ast
import io
import re
import sys
import time
import traceback
from contextlib import redirect_stdout, redirect_stderr
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
LESSONS_DIR = BASE_DIR / "src" / "lessons"

def extract_code_blocks():
    """Extracts python code blocks from all ch*.ts files."""
    extracted = []
    
    for f in sorted(LESSONS_DIR.glob("ch*.ts")):
        content = f.read_text(encoding="utf-8")
        
        # Regex to find lessons and their code
        # Format 1: pythonImplementation: { ... code: `...`, expectedOutput: `...` }
        # Format 2: pythonCode: `...`
        lesson_blocks = re.split(r"'\d+\.\d+\.\d+':\s*\{", content)[1:]
        lesson_ids = re.findall(r"'(\d+\.\d+\.\d+)':\s*\{", content)
        
        for lid, block in zip(lesson_ids, lesson_blocks):
            # Extract code
            code_match = re.search(r"code:\s*`([\s\S]*?)`(?=,\s*(?:expectedOutput|libraryDependencies|explanation|commonPitfalls|\}))", block)
            if not code_match:
                code_match = re.search(r"pythonCode:\s*`([\s\S]*?)`", block)
            
            code = code_match.group(1) if code_match else None
            
            # Extract expected output if present
            exp_match = re.search(r"expectedOutput:\s*`([\s\S]*?)`", block)
            expected_out = exp_match.group(1).strip() if exp_match else None
            
            extracted.append({
                "file": f.name,
                "lesson_id": lid,
                "code": code,
                "expected_output": expected_out
            })
            
    return extracted

def main():
    print("=" * 80)
    print("SCIENTIFIC COMPUTATION VERIFICATION HARNESS")
    print("Validating Python code across all 51 chapters & 204 lessons")
    print("=" * 80)
    
    items = extract_code_blocks()
    print(f"Extracted {len(items)} lesson code entries.")
    
    syntax_passed = 0
    syntax_failed = 0
    exec_passed = 0
    exec_failed = 0
    no_code_count = 0
    
    failures = []
    
    for item in items:
        lid = item["lesson_id"]
        fn = item["file"]
        code = item["code"]
        
        if not code or not code.strip():
            no_code_count += 1
            continue
            
        # 1. AST Syntax Check
        try:
            tree = ast.parse(code)
            syntax_passed += 1
        except SyntaxError as e:
            syntax_failed += 1
            failures.append((lid, fn, "SYNTAX_ERROR", str(e)))
            continue
            
        # 2. Execution in isolated scope
        # Mock matplotlib.pyplot.show to prevent blocking GUI
        scope = {
            "__name__": "__main__",
        }
        
        # Intercept plotting functions if any
        intercept_code = """
import sys
try:
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    plt.show = lambda *args, **kwargs: None
except ImportError:
    pass
"""
        full_code = intercept_code + "\n" + code
        
        stdout_buf = io.StringIO()
        stderr_buf = io.StringIO()
        
        start_time = time.time()
        try:
            with redirect_stdout(stdout_buf), redirect_stderr(stderr_buf):
                exec(full_code, scope)
            elapsed = time.time() - start_time
            exec_passed += 1
        except Exception as e:
            exec_failed += 1
            err_msg = f"{type(e).__name__}: {str(e)}"
            failures.append((lid, fn, "RUNTIME_ERROR", err_msg))
            
    print("\n" + "=" * 80)
    print("VERIFICATION SUMMARY:")
    print("=" * 80)
    print(f"Total Lessons Processed  : {len(items)}")
    print(f"Lessons with Python Code : {len(items) - no_code_count}")
    print(f"Syntax Validation Passed : {syntax_passed} / {len(items) - no_code_count}")
    print(f"Syntax Validation Failed : {syntax_failed}")
    print(f"Execution Passed         : {exec_passed} / {len(items) - no_code_count}")
    print(f"Execution Failed         : {exec_failed}")
    
    if failures:
        print("\nFAILURES DETECTED:")
        for lid, fn, ftype, msg in failures:
            print(f"  [{lid}] in {fn}: {ftype} -> {msg[:80]}")
    else:
        print("\nALL PYTHON EXAMPLES EXECUTED SUCCESSFULLY WITH ZERO ERRORS!")
        
    print("=" * 80)

if __name__ == "__main__":
    main()
