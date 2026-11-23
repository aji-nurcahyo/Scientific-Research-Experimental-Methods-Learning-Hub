import re
import json

def parse_learning_paths():
    with open('docs/LEARNING_PATHS.md', 'r', encoding='utf-8') as f:
        text = f.read()

    blocks = re.findall(r'###\s*(LP-\d{2}):\s*([^\n]+)\n(.*?)(?=\n###|\Z)', text, re.DOTALL)
    paths = []
    for lp_id, title, content in blocks:
        target = re.search(r'-\s*\*\*Target Audience:\*\*\s*([^\n]+)', content)
        entry = re.search(r'-\s*\*\*Entry Requirements:\*\*\s*([^\n]+)', content)
        comps = re.search(r'-\s*\*\*Required Competencies:\*\*\s*([^\n]+)', content)
        req_ch = re.search(r'-\s*\*\*Required Chapters:\*\*\s*([^\n]+)', content)
        opt_ch = re.search(r'-\s*\*\*Optional Chapters:\*\*\s*([^\n]+)', content)
        outcomes = re.search(r'-\s*\*\*Final Learning Outcomes:\*\*\s*([^\n]+)', content)
        deliverables = re.search(r'-\s*\*\*Assessable Deliverables:\*\*\s*([^\n]+)', content)

        # Practical assignments
        assign_block = re.search(r'-\s*\*\*Practical Assignments:\*\*\n(.*?)(?=-\s*\*\*|\Z)', content, re.DOTALL)
        assignments = []
        if assign_block:
            assignments = [a.strip() for a in re.findall(r'\d+\.\s*([^\n]+)', assign_block.group(1))]

        category = 'undergraduate' if 'LP-01' in lp_id else ('doctoral-publication' if lp_id in ['LP-08', 'LP-09', 'LP-10'] else 'advanced-engineering')

        paths.append({
            'id': lp_id,
            'title': title.strip(),
            'targetAudience': target.group(1).strip() if target else '',
            'category': category,
            'entryRequirements': entry.group(1).strip() if entry else '',
            'requiredCompetencies': re.findall(r'COMP-[A-Z]+-\d{2}', comps.group(1)) if comps else [],
            'requiredChapterIds': re.findall(r'CH-\d{2}', req_ch.group(1)) if req_ch else [],
            'optionalChapterIds': re.findall(r'CH-\d{2}', opt_ch.group(1)) if opt_ch else [],
            'practicalAssignments': assignments,
            'finalOutcomes': outcomes.group(1).strip() if outcomes else '',
            'assessableDeliverables': deliverables.group(1).strip() if deliverables else ''
        })

    with open('src/data/learningPathsData.ts', 'w', encoding='utf-8') as f:
        f.write("import { LearningPath } from '../types/curriculum';\n\n")
        f.write("export const LEARNING_PATHS: LearningPath[] = " + json.dumps(paths, indent=2, ensure_ascii=False) + ";\n")
    print(f"Generated {len(paths)} learning paths.")

def parse_laboratories():
    with open('docs/RESEARCH_LABORATORIES.md', 'r', encoding='utf-8') as f:
        text = f.read()

    blocks = re.findall(r'####\s*(LAB-\d{2}):\s*([^\n]+)\n(.*?)(?=\n####|\Z)', text, re.DOTALL)
    labs = []
    ch_mapping = {
        'LAB-01': 'CH-19', 'LAB-02': 'CH-20', 'LAB-03': 'CH-20', 'LAB-04': 'CH-08',
        'LAB-05': 'CH-11', 'LAB-06': 'CH-24', 'LAB-07': 'CH-29', 'LAB-08': 'CH-32',
        'LAB-09': 'CH-34', 'LAB-10': 'CH-35', 'LAB-11': 'CH-36', 'LAB-12': 'CH-38',
        'LAB-13': 'CH-41', 'LAB-14': 'CH-42', 'LAB-15': 'CH-46'
    }

    for lab_id, title, content in blocks:
        obj = re.search(r'1\.\s*\*\*Learning Objectives:\*\*\s*([^\n]+)', content)
        prereq = re.search(r'2\.\s*\*\*Prerequisites:\*\*\s*([^\n]+)', content)
        sci = re.search(r'3\.\s*\*\*Scientific Foundations:\*\*\s*([^\n]+)', content)
        math_f = re.search(r'4\.\s*\*\*Mathematical Foundations:\*\*\s*(.*?)(?=5\.|\Z)', content, re.DOTALL)
        data_inp = re.search(r'5\.\s*\*\*Dataset / Experimental Input:\*\*\s*([^\n]+)', content)
        py_plan = re.search(r'6\.\s*\*\*Python Implementation Plan:\*\*\s*(.*?)(?=7\.|\Z)', content, re.DOTALL)
        exp_res = re.search(r'7\.\s*\*\*Expected Results:\*\*\s*(.*?)(?=8\.|\Z)', content, re.DOTALL)
        val_crit = re.search(r'8\.\s*\*\*Validation Criteria:\*\*\s*([^\n]+)', content)
        num_tol = re.search(r'9\.\s*\*\*Numerical Tolerance:\*\*\s*([^\n]+)', content)
        err = re.search(r'10\.\s*\*\*Common Methodological Errors:\*\*\s*([^\n]+)', content)
        exer = re.search(r'11\.\s*\*\*Exercises:\*\*\s*(.*?)(?=12\.|\Z)', content, re.DOTALL)
        assess = re.search(r'12\.\s*\*\*Assessment:\*\*\s*([^\n]+)', content)
        repro = re.search(r'13\.\s*\*\*Reproducibility Instructions:\*\*\s*`([^`]+)`', content)

        labs.append({
            'id': lab_id,
            'title': title.strip(),
            'associatedChapterId': ch_mapping.get(lab_id, 'CH-01'),
            'learningObjectives': obj.group(1).strip() if obj else '',
            'prerequisites': re.findall(r'CH-\d{2}', prereq.group(1)) if prereq else [],
            'scientificFoundations': sci.group(1).strip() if sci else '',
            'mathematicalFoundations': math_f.group(1).strip() if math_f else '',
            'datasetInput': data_inp.group(1).strip() if data_inp else '',
            'pythonImplementation': py_plan.group(1).strip() if py_plan else '',
            'expectedResults': exp_res.group(1).strip() if exp_res else '',
            'validationCriteria': val_crit.group(1).strip() if val_crit else '',
            'numericalTolerance': num_tol.group(1).strip() if num_tol else '',
            'commonErrors': err.group(1).strip() if err else '',
            'exercises': exer.group(1).strip() if exer else '',
            'assessment': assess.group(1).strip() if assess else '',
            'reproducibilityCommand': repro.group(1).strip() if repro else f'python {lab_id.lower()}.py',
            'status': 'implemented'
        })

    with open('src/data/laboratoriesData.ts', 'w', encoding='utf-8') as f:
        f.write("import { Laboratory } from '../types/curriculum';\n\n")
        f.write("export const LABORATORIES: Laboratory[] = " + json.dumps(labs, indent=2, ensure_ascii=False) + ";\n")
    print(f"Generated {len(labs)} laboratories.")

def parse_templates():
    with open('docs/RESEARCH_TEMPLATES.md', 'r', encoding='utf-8') as f:
        text = f.read()

    blocks = re.findall(r'####\s*(TMPL-\d{2}):\s*([^\n]+)\n(.*?)(?=\n####|\Z)', text, re.DOTALL)
    tmpls = []
    
    for t_id, title, content in blocks:
        purpose = re.search(r'-\s*\*\*Tujuan:\*\*\s*([^\n]+)', content)
        target = re.search(r'-\s*\*\*Target Pengguna:\*\*\s*([^\n]+)', content)
        when = re.search(r'-\s*\*\*Kapan Digunakan:\*\*\s*([^\n]+)', content)
        example = re.search(r'-\s*\*\*Contoh Realistis:\*\*\s*([^\n]+)', content)
        mistakes = re.search(r'-\s*\*\*Common Mistakes:\*\*\s*([^\n]+)', content)
        ref = re.search(r'-\s*\*\*Referensi Metodologis:\*\*\s*([^\n]+)', content)
        
        # Determine cycle
        t_num = int(t_id.split('-')[1])
        if t_num <= 4:
            cycle = 'planning'
        elif t_num <= 8:
            cycle = 'design-data'
        elif t_num <= 12:
            cycle = 'analysis-evaluation'
        else:
            cycle = 'reporting-publication'

        tmpls.append({
            'id': t_id,
            'title': title.strip(),
            'cycle': cycle,
            'purpose': purpose.group(1).strip() if purpose else '',
            'targetUser': target.group(1).strip() if target else '',
            'whenUsed': when.group(1).strip() if when else '',
            'instructions': [
                "Unduh atau salin format template ini ke editor Markdown/LaTeX Anda.",
                "Isi setiap parameter wajib bertanda [WAJIB] sesuai data eksperimen Anda.",
                "Sertakan matriks bukti numerik dan lampiran sertifikat kalibrasi instrumen jika relevan.",
                "Lakukan peninjauan mandiri terhadap daftar Common Mistakes sebelum menyerahkan naskah."
            ],
            'structureFields': [
                {'fieldName': 'Project Title & Metadata', 'description': 'Identitas riset, peneliti, afiliasi ITERA, dan tanggal eksekusi.', 'required': True},
                {'fieldName': 'Methodological Specification', 'description': 'Rincian parameter teknis, instrumen, dan model matematika.', 'required': True},
                {'fieldName': 'Empirical Evidence Table', 'description': 'Matriks data observasi, pembacaan sensor, atau skor benchmark.', 'required': True},
                {'fieldName': 'Validation & Uncertainty Limits', 'description': 'Batas ketidakpastian pengukuran dan kriteria falsifikasi.', 'required': True}
            ],
            'realisticExample': example.group(1).strip() if example else '',
            'commonMistakes': [mistakes.group(1).strip() if mistakes else ''],
            'methodologicalReference': ref.group(1).strip() if ref else ''
        })

    with open('src/data/templatesData.ts', 'w', encoding='utf-8') as f:
        f.write("import { ResearchTemplate } from '../types/curriculum';\n\n")
        f.write("export const RESEARCH_TEMPLATES: ResearchTemplate[] = " + json.dumps(tmpls, indent=2, ensure_ascii=False) + ";\n")
    print(f"Generated {len(tmpls)} research templates.")

if __name__ == '__main__':
    parse_learning_paths()
    parse_laboratories()
    parse_templates()

