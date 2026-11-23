import os
import sys
import time
import urllib.request
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

os.makedirs("reports/pdf", exist_ok=True)

base_url = "http://localhost:5173/Scientific-Research-Experimental-Methods-Learning-Hub/"

def is_server_ready():
    try:
        with urllib.request.urlopen(base_url, timeout=3) as res:
            return res.status == 200
    except Exception:
        return False

if not is_server_ready():
    print("ERROR: Dev server is not running on port 5173.")
    sys.exit(1)

print("Dev server is ready and verified on port 5173.")

targets = [
    {
        "level": "Beginner (Epistemology & Logic)",
        "chapter": "CH-01",
        "lesson_id": "1.1.1",
        "title": "Logika Penalaran Ilmiah: Deduksi, Induksi, dan Abduksi",
        "filename": "Lesson_1.1.1_Scientific_Foundations.pdf"
    },
    {
        "level": "Statistical Analysis & Inference",
        "chapter": "CH-16",
        "lesson_id": "3.1.1",
        "title": "Uji t Dua Sampel Independen & Asumsi Homogenitas",
        "filename": "Lesson_3.1.1_Statistical_Inference.pdf"
    },
    {
        "level": "Advanced Mathematical Modeling",
        "chapter": "CH-24",
        "lesson_id": "4.1.1",
        "title": "Regresi Linear Berganda OLS & Matriks Kovarian",
        "filename": "Lesson_4.1.1_Regression_Modeling.pdf"
    },
    {
        "level": "Research Capstone & Open Science",
        "chapter": "CH-51",
        "lesson_id": "7.4.4",
        "title": "Paket Reproduktibilitas & Standar Artefak ACM",
        "filename": "Lesson_7.4.4_Research_Capstone.pdf"
    }
]

verification_results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    for t in targets:
        print(f"\n=======================================================")
        print(f"EXPORTING PDF: {t['level']} - Lesson {t['lesson_id']}")
        print(f"=======================================================")
        
        target_url = f"{base_url}#lesson-{t['lesson_id']}"
        page.goto(target_url, wait_until="networkidle")
        page.wait_for_timeout(1500)

        # Emulate print media
        page.emulate_media(media="print")

        # Check KaTeX rendering
        katex_rendered = page.locator(".katex").count()
        # Check code blocks
        code_blocks = page.locator("pre").count()
        # Check tables
        tables = page.locator("table").count()
        # Check callouts
        callouts = page.locator(".academic-callout, .formula-block, .bg-blue-50, .border-l-4").count()

        pdf_path = Path("reports/pdf") / t["filename"]
        page.pdf(
            path=str(pdf_path),
            format="A4",
            print_background=True,
            margin={
                "top": "20mm",
                "bottom": "20mm",
                "left": "15mm",
                "right": "15mm"
            }
        )

        file_size = pdf_path.stat().st_size
        print(f"  Generated PDF : {pdf_path.name}")
        print(f"  File Size     : {file_size:,} bytes")
        print(f"  KaTeX Formulations Found : {katex_rendered}")
        print(f"  Code Blocks Found        : {code_blocks}")
        print(f"  Tables Found             : {tables}")
        print(f"  Callouts/Cards Found     : {callouts}")

        verification_results.append({
            "level": t["level"],
            "lesson_id": t["lesson_id"],
            "title": t["title"],
            "filename": t["filename"],
            "size_bytes": file_size,
            "katex_count": katex_rendered,
            "code_blocks": code_blocks,
            "tables": tables,
            "callouts": callouts,
            "status": "PASS" if file_size > 10000 else "FAIL"
        })

    browser.close()

with open("reports/academic_pdf_verification.json", "w", encoding="utf-8") as f:
    json.dump(verification_results, f, indent=2)

print("\nAcademic PDF verification report saved to reports/academic_pdf_verification.json")
