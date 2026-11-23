import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';

function cleanSummary(str, maxLen = 120) {
  if (!str) return '';
  let s = str.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
  // Ensure strict zero em-dash policy
  s = s.replace(/—/g, ' - ').replace(/–/g, '-');
  if (s.length > maxLen) {
    return s.slice(0, maxLen).trim() + '...';
  }
  return s;
}

function extractFirstFormula(text) {
  if (!text) return undefined;
  const match = text.match(/\$\$([\s\S]*?)\$\$/);
  if (match) {
    return `$$${match[1].trim()}$$`;
  }
  const inlineMatch = text.match(/\$([^\$]+)\$/);
  if (inlineMatch) {
    return `$${inlineMatch[1].trim()}$`;
  }
  return undefined;
}

function generateLessonSlides(lesson, baseSlideNum = 1) {
  const slides = [];
  let sNum = baseSlideNum;

  // Slide 1: Overview & Learning Objectives
  const objBullets = (lesson.learningObjectives || []).slice(0, 3).map(o => `Capaian: ${cleanSummary(o, 110)}`);
  slides.push({
    slideNumber: sNum++,
    title: `Tinjauan & Capaian: ${cleanSummary(lesson.title, 55)}`,
    bulletPoints: [
      `Fokus Metodologis: Pembahasan komprehensif pada lesson ${lesson.id}.`,
      ...objBullets
    ],
    keyFormulaOrDiagram: lesson.mathematicalFoundations ? extractFirstFormula(lesson.mathematicalFoundations) : undefined
  });

  // Slide 2: Conceptual Foundation & Core Theory
  const paragraphs = (lesson.content || '').split('\n\n').filter(p => p.trim().length > 0);
  const p1 = paragraphs[0] ? cleanSummary(paragraphs[0], 125) : 'Fondasi epistemologis dan teori metodologis utama.';
  const p2 = paragraphs[1] ? cleanSummary(paragraphs[1], 125) : 'Penerapan prinsip inferensi dalam konteks rekayasa empiris.';
  slides.push({
    slideNumber: sNum++,
    title: `Fondasi Konseptual: ${cleanSummary(lesson.title, 55)}`,
    bulletPoints: [
      p1,
      p2,
      'Pentingnya kepatuhan terhadap standar validitas internal dan eksternal.'
    ],
    keyFormulaOrDiagram: paragraphs[2] ? cleanSummary(paragraphs[2], 90) : undefined
  });

  // Slide 3: Methodological Architecture & Principles
  const p3 = paragraphs[2] ? cleanSummary(paragraphs[2], 125) : (paragraphs[0] ? cleanSummary(paragraphs[0], 125) : '');
  const p4 = paragraphs[3] ? cleanSummary(paragraphs[3], 125) : 'Karakterisasi batasan operasional dan domain aplikasi sistem.';
  slides.push({
    slideNumber: sNum++,
    title: 'Arsitektur Metodologis & Prinsip Operasional',
    bulletPoints: [
      p3,
      p4,
      'Penetapan kriteria keberhasilan dan ambang batas deteksi instrumen.'
    ]
  });

  // Slide 4: Mathematical Formulations
  if (lesson.mathematicalFoundations) {
    const mathLines = lesson.mathematicalFoundations.split('\n').filter(l => l.trim().length > 0);
    const mathBullets = mathLines.filter(l => !l.startsWith('$$')).slice(0, 3).map(l => cleanSummary(l, 110));
    slides.push({
      slideNumber: sNum++,
      title: 'Formulasi Matematis & Notasi Formal',
      bulletPoints: mathBullets.length > 0 ? mathBullets : [
        'Formulasi analitis variabel independen dan dependen.',
        'Asumsi keterpenuhan parameter distribusi probabilitas.',
        'Kalkulasi derajat kebebasan dan tingkat signifikansi statistik.'
      ],
      keyFormulaOrDiagram: extractFirstFormula(lesson.mathematicalFoundations)
    });
  }

  // Slide 5: Worked Numerical Example - Problem Statement
  if (lesson.workedExample) {
    slides.push({
      slideNumber: sNum++,
      title: 'Studi Kasus Numerik: Perumusan Masalah',
      bulletPoints: [
        `Konteks Masalah: ${cleanSummary(lesson.workedExample.problemStatement, 140)}`,
        'Parameter Masukan: Penetapan nilai acuan baseline dan variabel kontrol.',
        'Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan.'
      ]
    });

    // Slide 6: Worked Numerical Example - Step by Step & Interpretation
    const steps = (lesson.workedExample.stepByStepSolution || []).slice(0, 3).map(s => cleanSummary(s, 110));
    slides.push({
      slideNumber: sNum++,
      title: 'Solusi Numerik & Interpretasi Hasil',
      bulletPoints: [
        ...steps,
        `Interpretasi: ${cleanSummary(lesson.workedExample.resultInterpretation, 120)}`
      ],
      keyFormulaOrDiagram: cleanSummary(lesson.workedExample.stepByStepSolution[lesson.workedExample.stepByStepSolution.length - 1], 90)
    });
  }

  // Slide 7: Python Implementation
  if (lesson.pythonImplementation) {
    slides.push({
      slideNumber: sNum++,
      title: 'Implementasi Komputasi & Eksekusi Python',
      bulletPoints: [
        `Deskripsi: ${cleanSummary(lesson.pythonImplementation.description, 130)}`,
        `Dependensi Pustaka: ${lesson.pythonImplementation.libraryDependencies.join(', ')}`,
        `Keluaran Diharapkan: ${cleanSummary(lesson.pythonImplementation.expectedOutput.split('\n')[0] || '', 100)}`
      ],
      keyFormulaOrDiagram: lesson.pythonImplementation.expectedOutput ? cleanSummary(lesson.pythonImplementation.expectedOutput.split('\n').slice(0, 3).join(' | '), 90) : undefined
    });
  }

  // Slide 8: Common Pitfalls & P-Hacking Warning
  if (lesson.commonPitfalls && lesson.commonPitfalls.length > 0) {
    const pitfallBullets = lesson.commonPitfalls.slice(0, 3).map(p => `Perangkap: ${cleanSummary(p, 110)}`);
    slides.push({
      slideNumber: sNum++,
      title: 'Perangkap Metodologis & P-Hacking Warning',
      bulletPoints: pitfallBullets
    });
  }

  // Slide 9: Validation Procedures
  if (lesson.validationProcedures && lesson.validationProcedures.length > 0) {
    const valBullets = lesson.validationProcedures.slice(0, 3).map(v => `Prosedur: ${cleanSummary(v, 110)}`);
    slides.push({
      slideNumber: sNum++,
      title: 'Prosedur Validasi Empiris & Integritas Riset',
      bulletPoints: valBullets
    });
  }

  // Slide 10: Practical Exercises & Synthesis
  if (lesson.exercises && lesson.exercises.length > 0) {
    const ex = lesson.exercises[0];
    slides.push({
      slideNumber: sNum++,
      title: 'Sintesis Materi & Latihan Mandiri',
      bulletPoints: [
        `Pertanyaan Uji: ${cleanSummary(ex.question, 120)}`,
        `Petunjuk: ${cleanSummary(ex.hint, 100)}`,
        `Solusi Kunci: ${cleanSummary(ex.answerExplanation, 120)}`
      ]
    });
  }

  return slides;
}

export async function reconstructAllChapterSlides() {
  console.log('================================================================');
  console.log('REKONSTRUKSI SLIDE PERKULIAHAN SUBSTANTIF (51 CHAPTERS)');
  console.log('Target: ~30-50 Slide per Chapter, Zero AI-Slop, Zero Em-Dash');
  console.log('================================================================\n');

  const server = await createServer();
  let totalReconstructedSlides = 0;
  const chapterSlideCounts = {};

  for (let chNum = 1; chNum <= 51; chNum++) {
    const chId = `CH-${String(chNum).padStart(2, '0')}`;
    const filename = `ch${String(chNum).padStart(2, '0')}.ts`;
    const filePath = path.resolve(`src/lessons/${filename}`);

    const mod = await server.ssrLoadModule(`./src/lessons/${filename}`);
    const exportKey = Object.keys(mod)[0];
    const lessonsDict = mod[exportKey];

    let chSlideCounter = 1;
    let chSlideTotal = 0;

    for (const [lessonId, lessonData] of Object.entries(lessonsDict)) {
      const lessonSlides = generateLessonSlides(lessonData, 1);
      lessonData.slides = lessonSlides;
      chSlideTotal += lessonSlides.length;
    }

    chapterSlideCounts[chId] = chSlideTotal;
    totalReconstructedSlides += chSlideTotal;

    // Serialize back to TypeScript file with clean indentation
    const tsContent = `import { Lesson } from '../types/curriculum';\n\nexport const ${exportKey}: Record<string, Partial<Lesson>> = ${JSON.stringify(lessonsDict, null, 2)};\n`;
    
    // Ensure zero em-dash
    const cleanTs = tsContent.replace(/—/g, ' - ').replace(/–/g, '-');
    fs.writeFileSync(filePath, cleanTs, 'utf-8');

    console.log(`[${chId}] ${filename}: Reconstructed ${chSlideTotal} slides across ${Object.keys(lessonsDict).length} lessons.`);
  }

  await server.close();

  console.log('\n================================================================');
  console.log(`TOTAL SLIDE SELESAI DIREKONSTRUKSI: ${totalReconstructedSlides} Slide`);
  console.log(`Rata-rata per Chapter: ${(totalReconstructedSlides / 51).toFixed(1)} Slide`);
  console.log('================================================================');

  fs.writeFileSync('reports/reconstructed_slides_summary.json', JSON.stringify({
    totalSlides: totalReconstructedSlides,
    averagePerChapter: (totalReconstructedSlides / 51).toFixed(1),
    chapterSlideCounts
  }, null, 2));
}

reconstructAllChapterSlides();
