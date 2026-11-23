import re
import json

def parse_curriculum():
    with open('docs/MASTER_CURRICULUM.md', 'r', encoding='utf-8') as f:
        mc = f.read()

    # Extract all chapters
    ch_pattern = re.compile(
        r'####\s*(CH-\d{2}):\s*([^\n]+)\n'
        r'-\s*\*\*Prerequisites:\*\*\s*([^\n]+)\n'
        r'-\s*\*\*Competency Mappings:\*\*\s*([^\n]+)\n'
        r'-\s*\*\*Mathematical Foundations:\*\*\s*(.*?)\n'
        r'-\s*\*\*Lessons:\*\*\n(.*?)(?=\n####|\n###|\n==|\Z)',
        re.DOTALL
    )

    matches = ch_pattern.findall(mc)
    print(f"Parsed chapters: {len(matches)}")
    
    chapters_data = []
    gateway_chapters = {'CH-06', 'CH-15', 'CH-20', 'CH-24', 'CH-29', 'CH-33', 'CH-48'}

    for ch_id, ch_title, prereqs, comps, math_found, lessons_block in matches:
        prereq_list = re.findall(r'CH-\d{2}', prereqs)
        comp_list = re.findall(r'COMP-[A-Z]+-\d{2}', comps)
        
        lesson_matches = re.findall(r'-\s*\*Lesson\s*(\d+\.\d+\.\d+):\*\s*([^\n]+)', lessons_block)
        lessons = []
        for l_id, l_title in lesson_matches:
            lessons.append({
                'id': l_id,
                'chapterId': ch_id,
                'title': l_title.strip(),
                'readingTimeMinutes': 15,
                'status': 'planned',
                'learningObjectives': [],
                'content': '',
                'commonPitfalls': [],
                'validationProcedures': [],
                'exercises': [],
                'references': []
            })
            
        # Determine level based on chapter number
        num = int(ch_id.split('-')[1])
        if num <= 7:
            lvl = 1
        elif num <= 15:
            lvl = 2
        elif num <= 23:
            lvl = 3
        elif num <= 31:
            lvl = 4
        elif num <= 37:
            lvl = 5
        elif num <= 44:
            lvl = 6
        else:
            lvl = 7

        chapters_data.append({
            'id': ch_id,
            'levelId': lvl,
            'title': ch_title.strip(),
            'subtitle': f"Modul Pembelajaran {ch_id}",
            'overview': f"Pembahasan komprehensif mengenai {ch_title.strip()} dalam kerangka metodologi riset ilmiah.",
            'prerequisites': prereq_list,
            'competencyMappings': comp_list,
            'status': 'planned',
            'gatewayMilestone': ch_id in gateway_chapters,
            'lessons': lessons
        })

    return chapters_data

if __name__ == '__main__':
    data = parse_curriculum()
    print(f"Total processed chapters: {len(data)}")
    with open('src/data/chapters_parsed.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Saved to src/data/chapters_parsed.json")

