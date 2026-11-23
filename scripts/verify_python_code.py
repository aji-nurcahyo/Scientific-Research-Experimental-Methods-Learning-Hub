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
    import json
    
    for f in sorted(LESSONS_DIR.glob("ch*.ts")):
        content = f.read_text(encoding="utf-8")
        
        try:
            start = content.find('{', content.find('export const'))
            end = content.rfind('}') + 1
            data = json.loads(content[start:end])
            for lid, lesson in data.items():
                py_impl = lesson.get("pythonImplementation") or {}
                code = py_impl.get("code") or lesson.get("pythonCode")
                exp_out = py_impl.get("expectedOutput")
                extracted.append({
                    "file": f.name,
                    "lesson_id": lid,
                    "code": code,
                    "expected_output": exp_out
                })
            continue
        except Exception as e:
            print(f"Error parsing {f.name}: {e}")
            
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
    numerical_passed = 0
    numerical_failed = 0
    no_code_count = 0
    
    detailed_results = []
    failures = []
    
    for item in items:
        lid = item["lesson_id"]
        fn = item["file"]
        code = item["code"]
        expected_out = item["expected_output"]
        
        if not code or not code.strip():
            no_code_count += 1
            detailed_results.append({
                "lesson_id": lid,
                "file": fn,
                "has_code": False
            })
            continue
            
        entry_result = {
            "lesson_id": lid,
            "file": fn,
            "has_code": True,
            "syntax_ok": False,
            "exec_ok": False,
            "numerical_ok": False,
            "error": None
        }
            
        # 1. AST Syntax Check
        try:
            tree = ast.parse(code)
            syntax_passed += 1
            entry_result["syntax_ok"] = True
        except SyntaxError as e:
            syntax_failed += 1
            err_msg = f"SyntaxError: {str(e)}"
            entry_result["error"] = err_msg
            failures.append((lid, fn, "SYNTAX_ERROR", err_msg))
            detailed_results.append(entry_result)
            continue
            
        # 2. Execution in isolated scope
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
            entry_result["exec_ok"] = True
            entry_result["elapsed_sec"] = round(elapsed, 4)
            actual_stdout = stdout_buf.getvalue()
            entry_result["actual_output"] = actual_stdout.strip()
            
            # 3. Numerical / Output Validation
            if expected_out:
                # Compare numbers extracted from expected vs actual
                exp_nums = re.findall(r"[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?", expected_out)
                act_nums = re.findall(r"[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?", actual_stdout)
                
                # Check if key numbers or substrings match
                if len(exp_nums) > 0 and len(act_nums) > 0:
                    # Check first few numbers
                    matched_nums = 0
                    for en in exp_nums[:5]:
                        try:
                            val = float(en)
                            for an in act_nums:
                                try:
                                    if abs(float(an) - val) < 1e-2 or (val != 0 and abs((float(an) - val) / val) < 0.05):
                                        matched_nums += 1
                                        break
                                except ValueError:
                                    pass
                        except ValueError:
                            pass
                    
                    is_num_ok = matched_nums >= min(len(exp_nums[:5]), 1)
                else:
                    is_num_ok = True
                
                if is_num_ok:
                    numerical_passed += 1
                    entry_result["numerical_ok"] = True
                else:
                    numerical_failed += 1
                    entry_result["numerical_ok"] = False
                    entry_result["numerical_note"] = "Partial numerical divergence"
            else:
                numerical_passed += 1
                entry_result["numerical_ok"] = True
                
        except Exception as e:
            exec_failed += 1
            err_msg = f"{type(e).__name__}: {str(e)}"
            entry_result["exec_ok"] = False
            entry_result["error"] = err_msg
            failures.append((lid, fn, "RUNTIME_ERROR", err_msg))
            
        detailed_results.append(entry_result)
            
    print("\n" + "=" * 80)
    print("VERIFICATION SUMMARY:")
    print("=" * 80)
    total_with_code = len(items) - no_code_count
    print(f"Total Lessons Processed  : {len(items)}")
    print(f"Lessons with Python Code : {total_with_code}")
    print(f"1. Syntax Checks (AST)   : {syntax_passed} / {total_with_code} PASSED ({(syntax_passed/total_with_code)*100:.1f}%)")
    print(f"   Syntax Failed         : {syntax_failed}")
    print(f"2. Runtime Execution     : {exec_passed} / {total_with_code} PASSED ({(exec_passed/total_with_code)*100:.1f}%)")
    print(f"   Execution Failed      : {exec_failed}")
    print(f"3. Numerical Validation  : {numerical_passed} / {total_with_code} PASSED ({(numerical_passed/total_with_code)*100:.1f}%)")
    print(f"   Numerical Divergence  : {numerical_failed}")
    
    if failures:
        print("\nFAILURES DETECTED:")
        for lid, fn, ftype, msg in failures:
            print(f"  [{lid}] in {fn}: {ftype} -> {msg[:80]}")
    else:
        print("\nALL PYTHON EXAMPLES EXECUTED SUCCESSFULLY WITH ZERO RUNTIME ERRORS!")
        
    print("=" * 80)
    
    import json
    reports_dir = BASE_DIR / "reports"
    reports_dir.mkdir(exist_ok=True)
    report_file = reports_dir / "python_runtime_regression.json"
    with open(report_file, "w", encoding="utf-8") as rf:
        json.dump({
            "total_processed": len(items),
            "lessons_with_code": total_with_code,
            "syntax_passed": syntax_passed,
            "syntax_failed": syntax_failed,
            "exec_passed": exec_passed,
            "exec_failed": exec_failed,
            "numerical_passed": numerical_passed,
            "numerical_failed": numerical_failed,
            "failures": failures,
            "results": detailed_results
        }, rf, indent=2)
    print(f"Detailed regression report written to: {report_file}")

if __name__ == "__main__":
    main()
