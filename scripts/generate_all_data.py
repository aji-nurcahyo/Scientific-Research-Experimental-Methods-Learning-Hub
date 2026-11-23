import re
import json

def generate_typescript_files():
    # 1. Parse chapters
    with open('docs/MASTER_CURRICULUM.md', 'r', encoding='utf-8') as f:
        mc = f.read()

    ch_pattern = re.compile(
        r'####\s*(CH-\d{2}):\s*([^\n]+)\n'
        r'-\s*\*\*Prerequisites:\*\*\s*([^\n]+)\n'
        r'-\s*\*\*Competency Mappings:\*\*\s*([^\n]+)\n'
        r'-\s*\*\*Mathematical Foundations:\*\*\s*(.*?)\n'
        r'-\s*\*\*Lessons:\*\*\n(.*?)(?=\n####|\n###|\n==|\Z)',
        re.DOTALL
    )

    matches = ch_pattern.findall(mc)
    gateway_chapters = {'CH-06', 'CH-15', 'CH-20', 'CH-24', 'CH-29', 'CH-33', 'CH-48'}

    chapters_dict = {}
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

        chapters_dict[ch_id] = {
            'id': ch_id,
            'levelId': lvl,
            'title': ch_title.strip(),
            'subtitle': f"Modul Riset {ch_id}",
            'overview': f"Pembahasan komprehensif mengenai {ch_title.strip()} dalam metodologi riset ilmiah.",
            'prerequisites': prereq_list,
            'competencyMappings': comp_list,
            'status': 'planned',
            'gatewayMilestone': ch_id in gateway_chapters,
            'lessons': lessons
        }

    # Define the 7 levels and sections
    levels = [
        {
            'id': 1,
            'title': 'Level 1: Epistemology, Scientific Reasoning & Problem Formulation',
            'tagline': 'Membangun Fondasi Berpikir Ilmiah, Pencarian Bukti, dan Etika Riset',
            'description': 'Fondasi filosofis sains, penalaran deduktif-induktif, metode PRISMA, novelty claim, dan integritas akademik COPE.',
            'sections': [
                {
                    'id': 'SEC-1.1',
                    'levelId': 1,
                    'title': 'Section 1.1: Foundations of Scientific Inquiry',
                    'description': 'Logika epistemologi, falsifikasi Popperian, dan scoping masalah rekayasa.',
                    'chapterIds': ['CH-01', 'CH-02']
                },
                {
                    'id': 'SEC-1.2',
                    'levelId': 1,
                    'title': 'Section 1.2: Evidence Retrieval & Synthesis',
                    'description': 'Metode penelusuran sistematis PRISMA 2020 dan sintesis bibliometrik.',
                    'chapterIds': ['CH-03', 'CH-04']
                },
                {
                    'id': 'SEC-1.3',
                    'levelId': 1,
                    'title': 'Section 1.3: Novelty & Scientific Ethics',
                    'description': 'Formulasi kebaruan delta, kerangka DAG, dan etika kepengarangan.',
                    'chapterIds': ['CH-05', 'CH-06', 'CH-07']
                }
            ]
        },
        {
            'id': 2,
            'title': 'Level 2: Research Design, Measurement & Data Architecture',
            'tagline': 'Merancang Arsitektur Penelitian, Metrologi Fisik, Kalibrasi, dan Tata Kelola Data',
            'description': 'Taksonomi Campbell-Stanley, definisi operasional, teori sampling, metrologi GUM, dan manajemen data FAIR.',
            'sections': [
                {
                    'id': 'SEC-2.1',
                    'levelId': 2,
                    'title': 'Section 2.1: Experimental & Observational Architectures',
                    'description': 'Taksonomi desain riset dan teori representasional pengukuran.',
                    'chapterIds': ['CH-08', 'CH-09']
                },
                {
                    'id': 'SEC-2.2',
                    'levelId': 2,
                    'title': 'Section 2.2: Sampling, Metrology & Physical Data Collection',
                    'description': 'Teori sampling Cochran, kalibrasi sensor, anggaran GUM, dan reliabilitas instrumen.',
                    'chapterIds': ['CH-10', 'CH-11', 'CH-12']
                },
                {
                    'id': 'SEC-2.3',
                    'levelId': 2,
                    'title': 'Section 2.3: Experimental Setup & Data Governance',
                    'description': 'Pengacakan urutan uji, tata kelola data FAIR DVC, dan rekayasa proposal riset.',
                    'chapterIds': ['CH-13', 'CH-14', 'CH-15']
                }
            ]
        },
        {
            'id': 3,
            'title': 'Level 3: Statistical Foundations, Inference & Classical Analysis',
            'tagline': 'Eksplorasi Data, Teori Distribusi, Inferensi Statistik, dan Visualisasi Ilmiah',
            'description': 'EDA Tukey, CLT, uji hipotesis 5-langkah, effect size Cohen, koreksi FDR Benjamini-Hochberg, dan uji non-parametrik.',
            'sections': [
                {
                    'id': 'SEC-3.1',
                    'levelId': 3,
                    'title': 'Section 3.1: Data Exploration & Distributional Foundations',
                    'description': 'Eksplorasi data tahan outlier, distribusi probabilitas parametrik, dan MLE.',
                    'chapterIds': ['CH-16', 'CH-17', 'CH-18']
                },
                {
                    'id': 'SEC-3.2',
                    'levelId': 3,
                    'title': 'Section 3.2: Statistical Significance & Inference Mechanics',
                    'description': 'NHST, effect size, multiple testing FDR, uji non-parametrik, dan persepsi visual ilmiah.',
                    'chapterIds': ['CH-19', 'CH-20', 'CH-21', 'CH-22', 'CH-23']
                }
            ]
        },
        {
            'id': 4,
            'title': 'Level 4: Statistical Modeling & Design of Experiments (DoE)',
            'tagline': 'Pemodelan Regresi, GLM, ANOVA Multi-Arah, dan Desain Faktorial Montgomery',
            'description': 'Diagnostik OLS 4-panel, regresi logistik/Poisson, LMM, dan perancangan eksperimen faktorial $2^k$ serta $2^{k-p}$.',
            'sections': [
                {
                    'id': 'SEC-4.1',
                    'levelId': 4,
                    'title': 'Section 4.1: Linear & Generalized Linear Modeling',
                    'description': 'Regresi OLS, GLM keluarga eksponensial, ANOVA post-hoc, dan linear mixed-effects.',
                    'chapterIds': ['CH-24', 'CH-25', 'CH-26', 'CH-27']
                },
                {
                    'id': 'SEC-4.2',
                    'levelId': 4,
                    'title': 'Section 4.2: Formal Design of Experiments (DoE)',
                    'description': 'Aksioma Fisher, faktorial penuh $2^k$, fraksional $2^{k-p}$, dan Response Surface (RSM).',
                    'chapterIds': ['CH-28', 'CH-29', 'CH-30', 'CH-31']
                }
            ]
        },
        {
            'id': 5,
            'title': 'Level 5: Computational Validation, ML Rigor & Benchmarking',
            'tagline': 'Validasi Model Komputasi, Pencegahan Kebocoran Data, dan Studi Ablasi',
            'description': 'Forensik data leakage, benchmark multi-dataset Demšar, diagram CD, studi ablasi modular, dan stress-testing OOD.',
            'sections': [
                {
                    'id': 'SEC-5.1',
                    'levelId': 5,
                    'title': 'Section 5.1: Empirical Validation & Benchmarking',
                    'description': 'Pencegahan data leakage, seleksi baseline SOTA, uji Friedman Demšar, dan studi ablasi.',
                    'chapterIds': ['CH-32', 'CH-33', 'CH-34', 'CH-35']
                },
                {
                    'id': 'SEC-5.2',
                    'levelId': 5,
                    'title': 'Section 5.2: Sensitivity, Robustness & Generalizability',
                    'description': 'Uji ketahanan out-of-distribution dan evaluasi sebaran multi-seed.',
                    'chapterIds': ['CH-36', 'CH-37']
                }
            ]
        },
        {
            'id': 6,
            'title': 'Level 6: Advanced Inferential, Causal & Computational Methods',
            'tagline': 'Resampling Bootstrap, Inferensi Bayesian MCMC, UQ Conformal, dan Kausalitas Pearl',
            'description': 'Bootstrap BCa, sampling PyMC, aritmatika IEEE 754, UQ conformal prediction, indeks Sobol, dan graf kausal SCM.',
            'sections': [
                {
                    'id': 'SEC-6.1',
                    'levelId': 6,
                    'title': 'Section 6.1: Resampling, Bayesian & Numerical Methods',
                    'description': 'Bootstrap Efron, Bayesian MCMC, dan verifikasi kestabilan numerik IEEE 754.',
                    'chapterIds': ['CH-38', 'CH-39', 'CH-40']
                },
                {
                    'id': 'SEC-6.2',
                    'levelId': 6,
                    'title': 'Section 6.2: Uncertainty Quantification & Causal Science',
                    'description': 'Conformal prediction UQ, dekomposisi varians Sobol, kausalitas SCM Pearl, dan time-series.',
                    'chapterIds': ['CH-41', 'CH-42', 'CH-43', 'CH-44']
                }
            ]
        },
        {
            'id': 7,
            'title': 'Level 7: Research Software Engineering, Reproducibility & Publication',
            'tagline': 'Rekayasa Perangkat Lunak Riset, Kontainerisasi Docker, Penulisan IMRaD, dan Disertasi',
            'description': 'RSE unit test pytest, Docker 1-klik, silsilah data W3C PROV, penulisan Swales CARS, rebuttal review, dan Capstone riset.',
            'sections': [
                {
                    'id': 'SEC-7.1',
                    'levelId': 7,
                    'title': 'Section 7.1: Research Software Engineering & Reproducibility',
                    'description': 'Prinsip RSE modular, isolasi Docker & lockfiles, serta pelacakan silsilah data ELN.',
                    'chapterIds': ['CH-45', 'CH-46', 'CH-47']
                },
                {
                    'id': 'SEC-7.2',
                    'levelId': 7,
                    'title': 'Section 7.2: Scientific Communication & Scholarly Career',
                    'description': 'Penulisan IMRaD claims-evidence, navigasi peer-review, roadmap doktoral, dan Capstone proyek.',
                    'chapterIds': ['CH-48', 'CH-49', 'CH-50', 'CH-51']
                }
            ]
        }
    ]

    # Write src/data/curriculumMeta.ts
    with open('src/data/curriculumMeta.ts', 'w', encoding='utf-8') as f:
        f.write("import { Level, Chapter } from '../types/curriculum';\n\n")
        f.write("export const CHAPTERS_MAP: Record<string, Chapter> = " + json.dumps(chapters_dict, indent=2, ensure_ascii=False) + ";\n\n")
        
        # Populate chapters in levels
        levels_full = []
        for lvl in levels:
            lvl_copy = dict(lvl)
            sections_full = []
            for sec in lvl['sections']:
                sec_copy = dict(sec)
                sec_copy['chapters'] = [chapters_dict[cid] for cid in sec['chapterIds'] if cid in chapters_dict]
                sections_full.append(sec_copy)
            lvl_copy['sections'] = sections_full
            levels_full.append(lvl_copy)

        f.write("export const LEVELS: Level[] = " + json.dumps(levels_full, indent=2, ensure_ascii=False) + ";\n")
    
    print("Generated src/data/curriculumMeta.ts successfully!")

if __name__ == '__main__':
    generate_typescript_files()

