import os
import sys
import time
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

os.makedirs("reports/screenshots/slides", exist_ok=True)

base_url = "http://localhost:5173/Scientific-Research-Experimental-Methods-Learning-Hub/"

test_targets = [
    {"ch": "CH-01", "lesson_id": "1.1.1", "name": "Scientific Foundations", "target_slide": 4},
    {"ch": "CH-16", "lesson_id": "3.1.1", "name": "Statistical Analysis", "target_slide": 2},
    {"ch": "CH-24", "lesson_id": "4.1.1", "name": "Regression Modeling", "target_slide": 2},
    {"ch": "CH-29", "lesson_id": "4.6.1", "name": "Factorial Design (DoE)", "target_slide": 2},
    {"ch": "CH-38", "lesson_id": "6.1.1", "name": "Advanced Computational Methods", "target_slide": 2},
    {"ch": "CH-51", "lesson_id": "7.7.1", "name": "Research Capstone", "target_slide": 2}
]

results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    
    console_errors = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

    for target in test_targets:
        ch = target["ch"]
        lid = target["lesson_id"]
        target_s = target.get("target_slide", 2)
        print(f"\n=======================================================")
        print(f"TESTING SLIDES VIEWER: {ch} (Lesson {lid}) - {target['name']}")
        print(f"=======================================================")

        url = f"{base_url}#lesson-{lid}"
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Locate and click "Buka Slide Perkuliahan" button
        slide_btn = page.locator("button:has-text('Buka Slide Perkuliahan')")
        btn_count = slide_btn.count()
        if btn_count == 0:
            print(f"  [ERROR] 'Buka Slide Perkuliahan' button not found for {ch}!")
            results.append({"chapter": ch, "lesson": lid, "status": "FAIL", "reason": "Button not found"})
            continue

        slide_btn.first.click()
        page.wait_for_timeout(800)

        # Check modal is visible
        modal = page.locator(".presentation-container")
        modal_visible = modal.is_visible()
        print(f"  Modal Opened: {modal_visible}")

        # Navigate to target slide
        for _ in range(target_s - 1):
            page.keyboard.press("ArrowRight")
            page.wait_for_timeout(300)

        # Verify current slide details
        current_title = page.locator(".slide-title").inner_text()
        print(f"  Target Slide {target_s} Title: {current_title}")

        # Take screenshot of Slide in Dark Mode
        dark_shot = f"reports/screenshots/slides/{ch}_slide{target_s}_dark.png"
        page.screenshot(path=dark_shot)

        # Toggle to light mode
        theme_btn = page.locator("button[title*='Tema'], button[title*='Mode']")
        if theme_btn.count() > 0:
            theme_btn.first.click()
            page.wait_for_timeout(400)
            light_shot = f"reports/screenshots/slides/{ch}_slide{target_s}_light.png"
            page.screenshot(path=light_shot)

        # Open speaker notes (press N)
        page.keyboard.press("KeyN")
        page.wait_for_timeout(300)
        notes_shot = f"reports/screenshots/slides/{ch}_slide{target_s}_notes.png"
        page.screenshot(path=notes_shot)

        # Check DOM contents inside PresentationViewer
        checks = page.evaluate("""() => {
            const viewer = document.querySelector('.presentation-container');
            if (!viewer) return null;

            const katexElements = viewer.querySelectorAll('.katex');
            const katexErrors = viewer.querySelectorAll('.katex-error');
            const semanticPills = viewer.querySelectorAll('.slide-semantic-pill');
            const bullets = viewer.querySelectorAll('.slide-list-item');
            const slideTitle = viewer.querySelector('.slide-title');
            const calloutBox = viewer.querySelector('.slide-callout-box');
            const notesDrawer = viewer.querySelector('.slide-notes-drawer');
            const rawMarkdown = viewer.innerText.includes('**') || viewer.innerText.includes('$$');

            return {
                title: slideTitle ? slideTitle.innerText : '',
                katexCount: katexElements.length,
                katexErrorsCount: katexErrors.length,
                semanticPillsCount: semanticPills.length,
                bulletsCount: bullets.length,
                hasCallout: !!calloutBox,
                hasNotesDrawer: !!notesDrawer,
                rawMarkdownDetected: rawMarkdown
            };
        }""")

        # Close notes
        page.keyboard.press("KeyN")
        page.wait_for_timeout(200)

        # Toggle theme back to dark
        if theme_btn.count() > 0:
            theme_btn.first.click()
            page.wait_for_timeout(200)

        # Close modal with Escape
        page.keyboard.press("Escape")
        page.wait_for_timeout(400)

        status = "PASSED" if checks and checks["katexErrorsCount"] == 0 and not checks["rawMarkdownDetected"] else "WARNING"
        print(f"  [{status}] KaTeX={checks['katexCount'] if checks else 0}, Errors={checks['katexErrorsCount'] if checks else 'N/A'}, Pills={checks['semanticPillsCount'] if checks else 0}, Bullets={checks['bulletsCount'] if checks else 0}, RawMarkdown={checks['rawMarkdownDetected'] if checks else 'N/A'}")

        results.append({
            "chapter": ch,
            "lesson": lid,
            "target_slide": target_s,
            "status": status,
            "checks": checks,
            "console_errors": list(console_errors)
        })

    browser.close()

with open("reports/slides_viewer_interactive_report.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\nSlides Viewer interactive test completed. Summary saved to reports/slides_viewer_interactive_report.json")
