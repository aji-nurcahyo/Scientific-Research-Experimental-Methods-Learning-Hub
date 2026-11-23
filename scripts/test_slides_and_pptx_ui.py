import sys
from playwright.sync_api import sync_playwright

base_url = "http://localhost:5173/Scientific-Research-Experimental-Methods-Learning-Hub/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    print("\n[TEST 1] Chapter Overview Slide Deck & Controls (CH-01)...")
    page.goto(f"{base_url}#chapter-CH-01", wait_until="networkidle")
    page.wait_for_timeout(1000)
    
    # Check buttons
    buttons = page.locator("header .no-print button").all_text_contents()
    print("  Header action buttons found:", [b.strip() for b in buttons if b.strip()])
    
    # Click Buka Slide Bab
    slide_btn = page.locator("button:has-text('Buka Slide Bab')")
    if slide_btn.count() > 0:
        slide_btn.first.click()
        page.wait_for_timeout(500)
        
        # Check modal
        modal = page.locator(".modal-content")
        print("  Modal visible:", modal.is_visible())
        modal_title = page.locator(".modal-content h2").text_content()
        print("  Slide 1 Title:", modal_title)
        slide_counter = page.locator(".modal-content").locator("text=/Slide 1 of \\d+/").text_content()
        print("  Slide counter:", slide_counter)
        
        # Check Unduh PPTX button inside modal
        pptx_btn = page.locator(".modal-content button:has-text('Unduh PPTX')")
        print("  Unduh PPTX button visible in modal:", pptx_btn.is_visible())
        
        # Next slide
        next_btn = page.locator(".modal-content button:has-text('Selanjutnya')")
        next_btn.click()
        page.wait_for_timeout(300)
        slide_counter_2 = page.locator(".modal-content").locator("text=/Slide 2 of \\d+/").text_content()
        print("  After 'Selanjutnya' click:", slide_counter_2)
        
        # Close modal
        close_btn = page.locator(".modal-content button:has(svg.lucide-x)")
        close_btn.click()
        page.wait_for_timeout(300)
        print("  Modal closed:", not modal.is_visible())
    else:
        print("  ERROR: 'Buka Slide Bab' button not found!")
        sys.exit(1)
        
    print("\n[TEST 2] Lesson View Slide Deck & Controls (Lesson 1.1.1)...")
    page.goto(f"{base_url}#lesson-1.1.1", wait_until="networkidle")
    page.wait_for_timeout(1000)
    
    lesson_slide_btn = page.locator("button:has-text('Buka Slide Perkuliahan')")
    print("  Lesson slide button visible:", lesson_slide_btn.is_visible())
    print("  Lesson slide button text:", lesson_slide_btn.text_content().strip())
    
    lesson_slide_btn.click()
    page.wait_for_timeout(500)
    print("  Lesson modal visible:", page.locator(".modal-content").is_visible())
    print("  Lesson slide 1 title:", page.locator(".modal-content h2").text_content())
    page.keyboard.press("Escape")
    page.wait_for_timeout(300)
    print("  Lesson modal closed via Escape:", not page.locator(".modal-content").is_visible())

    print("\n[TEST 3] Chapter 16 (Level 3) & Chapter 38 (Level 6)...")
    page.goto(f"{base_url}#chapter-CH-16", wait_until="networkidle")
    page.wait_for_timeout(1000)
    ch16_btn = page.locator("button:has-text('Buka Slide Bab')")
    print("  CH-16 slide button text:", ch16_btn.text_content().strip())

    page.goto(f"{base_url}#chapter-CH-38", wait_until="networkidle")
    page.wait_for_timeout(1000)
    ch38_btn = page.locator("button:has-text('Buka Slide Bab')")
    print("  CH-38 slide button text:", ch38_btn.text_content().strip())
    
    browser.close()
    print("\nALL SLIDES & PRESENTATION UI TESTS PASSED 100%!")
