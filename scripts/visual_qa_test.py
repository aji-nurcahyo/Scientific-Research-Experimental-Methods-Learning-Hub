import os
import sys
import time
import json
import re
from playwright.sync_api import sync_playwright

os.makedirs("reports/screenshots", exist_ok=True)

# Parse curriculumMeta to get lesson IDs for target chapters
with open("src/data/curriculumMeta.ts", "r", encoding="utf-8") as f:
    meta_text = f.read()

target_chapters = ["CH-01", "CH-16", "CH-24", "CH-38", "CH-51"]
chapter_lessons = {
    "CH-01": "1.1.1",
    "CH-16": "3.1.1",
    "CH-24": "4.1.1",
    "CH-38": "6.1.1",
    "CH-51": "7.4.4"
}
# Also dynamically check if curriculumMeta has other IDs
for ch in target_chapters:
    pos = meta_text.find(f'"{ch}":')
    if pos != -1:
        chunk = meta_text[pos:pos+1500]
        lessons = re.findall(r'"id":\s*"([0-9\.]+)"', chunk)
        if lessons:
            chapter_lessons[ch] = lessons[0]

print(f"Target Chapters and primary lessons: {chapter_lessons}")

viewports = {
    "desktop": {"width": 1920, "height": 1080},
    "tablet": {"width": 768, "height": 1024},
    "mobile": {"width": 375, "height": 667}
}

base_url = "http://localhost:5173/Scientific-Research-Experimental-Methods-Learning-Hub/"

qa_results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    for vp_name, vp_size in viewports.items():
        print(f"\n==========================================")
        print(f"TESTING VIEWPORT: {vp_name.upper()} ({vp_size['width']}x{vp_size['height']})")
        print(f"==========================================")
        
        context = browser.new_context(
            viewport=vp_size,
            device_scale_factor=1,
            is_mobile=(vp_name == "mobile"),
            has_touch=(vp_name in ["tablet", "mobile"])
        )
        page = context.new_page()
        
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        
        for ch, lesson_id in chapter_lessons.items():
            if not lesson_id:
                continue
                
            url = f"{base_url}#lesson-{lesson_id}"
            print(f"\nNavigating to {ch} (Lesson {lesson_id}) at {url}...")
            
            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(1000)  # Wait for lazy loading of chapter
            
            # Screenshot full page or viewport
            screenshot_path = f"reports/screenshots/{ch}_{lesson_id}_{vp_name}.png"
            page.screenshot(path=screenshot_path, full_page=False)
            
            # DOM inspection checks
            checks = page.evaluate("""() => {
                const article = document.querySelector('article.lesson-page') || document.body;
                
                // KaTeX elements
                const katexElements = document.querySelectorAll('.katex');
                const katexDisplayElements = document.querySelectorAll('.katex-display');
                const katexErrors = document.querySelectorAll('.katex-error');
                
                // Typography elements
                const italics = document.querySelectorAll('em, i');
                const bolds = document.querySelectorAll('strong, b');
                const lists = document.querySelectorAll('ul, ol');
                const listItems = document.querySelectorAll('li');
                const tables = document.querySelectorAll('table');
                const tableHeaders = document.querySelectorAll('th');
                const tableCells = document.querySelectorAll('td');
                const codeBlocks = document.querySelectorAll('pre code');
                const inlineCode = document.querySelectorAll('code:not(pre code)');
                
                // Check for horizontal overflow
                const bodyWidth = document.documentElement.clientWidth;
                const scrollWidth = document.documentElement.scrollWidth;
                const hasHorizontalScroll = scrollWidth > bodyWidth + 2;
                
                // Check for unparsed raw math delimiters in text nodes of prose
                const prose = document.querySelector('.academic-prose');
                let rawMathFound = false;
                if (prose) {
                    const text = prose.innerText;
                    // Check if $...$ or $$...$$ appear unrendered (excluding code blocks)
                    const matches = text.match(/\\$\\$[^\\$]+\\$\\$/g);
                    if (matches && matches.length > 0) {
                        rawMathFound = true;
                    }
                }
                
                return {
                    title: document.title,
                    katexCount: katexElements.length,
                    katexDisplayCount: katexDisplayElements.length,
                    katexErrorsCount: katexErrors.length,
                    italicCount: italics.length,
                    boldCount: bolds.length,
                    listCount: lists.length,
                    listItemCount: listItems.length,
                    tableCount: tables.length,
                    codeBlockCount: codeBlocks.length,
                    inlineCodeCount: inlineCode.length,
                    hasHorizontalScroll,
                    bodyWidth,
                    scrollWidth,
                    rawMathFound
                };
            }""")
            
            result_item = {
                "chapter": ch,
                "lesson": lesson_id,
                "viewport": vp_name,
                "screenshot": screenshot_path,
                "checks": checks,
                "console_errors": list(console_errors)
            }
            qa_results.append(result_item)
            
            status = "PASSED" if checks["katexErrorsCount"] == 0 and not checks["hasHorizontalScroll"] else "WARNING"
            print(f"  [{status}] {ch} {vp_name}: KaTeX={checks['katexCount']} (Display={checks['katexDisplayCount']}), Errors={checks['katexErrorsCount']}, Bold={checks['boldCount']}, Italic={checks['italicCount']}, Lists={checks['listCount']}, Tables={checks['tableCount']}, Code={checks['codeBlockCount']}, H-Scroll={checks['hasHorizontalScroll']}")
            if console_errors:
                print(f"  Console Errors ({len(console_errors)}): {console_errors[:2]}")
                
        context.close()
        
    browser.close()

with open("reports/visual_qa_report.json", "w", encoding="utf-8") as f:
    json.dump(qa_results, f, indent=2)

print("\nVisual QA completed. Results written to reports/visual_qa_report.json")
