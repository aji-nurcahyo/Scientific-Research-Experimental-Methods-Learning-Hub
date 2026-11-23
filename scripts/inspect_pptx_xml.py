import zipfile
import xml.etree.ElementTree as ET
import glob
from pathlib import Path
import json

pptx_files = sorted(Path("reports/pptx").glob("*.pptx"))

audit_results = []

for pf in pptx_files:
    print(f"\n=======================================================")
    print(f"INSPECTING PPTX: {pf.name} ({pf.stat().st_size} bytes)")
    print(f"=======================================================")
    
    with zipfile.ZipFile(pf, 'r') as z:
        # 1. Inspect presentation.xml for layout & dimensions
        pres_xml = z.read('ppt/presentation.xml').decode('utf-8')
        pres_tree = ET.fromstring(pres_xml)
        
        # Check slide size
        ns = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'}
        sld_sz = pres_tree.find('.//p:sldSz', ns)
        cx = int(sld_sz.attrib.get('cx', 0)) if sld_sz is not None else 0
        cy = int(sld_sz.attrib.get('cy', 0)) if sld_sz is not None else 0
        ratio = cx / cy if cy != 0 else 0
        is_16_9 = abs(ratio - (16/9)) < 0.05
        
        # 2. Count slides
        slide_entries = [name for name in z.namelist() if name.startswith('ppt/slides/slide') and name.endswith('.xml')]
        # Sort by slide number
        slide_entries.sort(key=lambda x: int(''.join(filter(str.isdigit, x)) or 0))
        
        print(f"  Total Slides in package : {len(slide_entries)}")
        print(f"  Dimensions cx={cx}, cy={cy} (Ratio: {ratio:.3f}) -> 16:9 Widescreen: {is_16_9}")
        
        raw_markdown_found = []
        broken_latex_found = []
        text_overflow_warnings = []
        editable_text_runs = 0
        shapes_count = 0
        
        for idx, s_path in enumerate(slide_entries, 1):
            s_xml = z.read(s_path).decode('utf-8')
            s_tree = ET.fromstring(s_xml)
            
            # Count shapes
            shapes = s_tree.findall('.//{http://schemas.openxmlformats.org/presentationml/2006/main}sp')
            shapes_count += len(shapes)
            
            # Extract all text elements (<a:t>)
            t_elements = s_tree.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}t')
            editable_text_runs += len(t_elements)
            
            for t in t_elements:
                text_val = t.text or ""
                # Check for raw markdown artifacts
                if "**" in text_val or "```" in text_val or "##" in text_val:
                    raw_markdown_found.append((idx, text_val[:40]))
                if "$$" in text_val or "\\text{" in text_val or "\\frac{" in text_val:
                    broken_latex_found.append((idx, text_val[:40]))
                # Check for extreme text overflow (>300 chars in single text block)
                if len(text_val) > 280:
                    text_overflow_warnings.append((idx, len(text_val), text_val[:50]))
                    
        print(f"  Editable Text Runs (<a:t>) : {editable_text_runs}")
        print(f"  Geometric Shapes & Containers: {shapes_count}")
        print(f"  Raw Markdown Artifacts     : {len(raw_markdown_found)}")
        print(f"  Broken LaTeX Artifacts     : {len(broken_latex_found)}")
        print(f"  Text Overflow Warnings     : {len(text_overflow_warnings)}")
        
        audit_results.append({
            "file": pf.name,
            "size_bytes": pf.stat().st_size,
            "slide_count": len(slide_entries),
            "is_16_9": is_16_9,
            "editable_text_runs": editable_text_runs,
            "shapes_count": shapes_count,
            "raw_markdown_count": len(raw_markdown_found),
            "broken_latex_count": len(broken_latex_found),
            "text_overflow_count": len(text_overflow_warnings)
        })

with open("reports/pptx_rendering_verification.json", "w", encoding="utf-8") as f:
    json.dump(audit_results, f, indent=2)

print("\nPPTX Rendering Verification completed. Summary written to reports/pptx_rendering_verification.json")
