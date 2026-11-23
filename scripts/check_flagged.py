import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

patterns = ['**', '```', '##', '$$', r'\text{', r'\frac{']
for pf in sorted(Path('reports/pptx').glob('*.pptx')):
    with zipfile.ZipFile(pf, 'r') as z:
        for name in z.namelist():
            if name.startswith('ppt/slides/slide') and name.endswith('.xml'):
                xml_txt = z.read(name).decode('utf-8')
                tree = ET.fromstring(xml_txt)
                for t in tree.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}t'):
                    txt = t.text or ''
                    for p in patterns:
                        if p in txt:
                            print(f'[{pf.name} {name}] Pattern "{p}": {repr(txt)}')
                    if len(txt) > 280:
                        print(f'[{pf.name} {name}] OVERFLOW ({len(txt)} chars): {repr(txt)}')
