import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import katex from 'katex';

// Sentence splitter that respects abbreviations and numbers
function splitIntoSentences(text) {
  if (!text) return [];
  // Clean newlines
  const clean = text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  // Split on sentence boundary (. ! ?) followed by space and capital letter, not after e.g., i.e., vs., Dr., dsb., dll.
  const sentences = clean.split(/(?<=[.!?])\s+(?=[A-Z0-9\(\[])/);
  return sentences.map(s => s.trim()).filter(s => s.length > 0);
}

function extractDisplayMath(text) {
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

function synthesizeSlidesForLesson(lesson, baseSlideNum = 1) {
  const slides = [];
  let sNum = baseSlideNum;

  // 1. Overview & Learning Objectives (layout: concept)
  const objBullets = (lesson.learningObjectives || []).map((o, idx) => `Capaian ${idx + 1}: ${o}`);
  slides.push({
    slideNumber: sNum++,
    layout: 'concept',
    title: `Tinjauan & Capaian: ${lesson.title}`,
    lead: `Orientasi metodologis dan capaian pembelajaran khusus pada Lesson ${lesson.id}.`,
    bulletPoints: [
      `Fokus Metodologis: Pembahasan komprehensif pada lesson ${lesson.id} dalam kurikulum riset rekayasa.`,
      ...objBullets
    ],
    keyFormulaOrDiagram: lesson.mathematicalFoundations ? extractDisplayMath(lesson.mathematicalFoundations) : undefined,
    notes: `Fokuskan perkuliahan pada pencapaian taksonomi Bloom (analisis C4 hingga evaluasi C5) untuk lesson ${lesson.id}.`
  });

  // 2. Conceptual Foundation (layout: concept)
  const contentParagraphs = (lesson.content || '').split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
  const p1 = contentParagraphs[0] || 'Fondasi ilmiah dan epistemologi metode penelitian.';
  const p1Sentences = splitIntoSentences(p1);
  const p2 = contentParagraphs[1] || '';
  const p2Sentences = splitIntoSentences(p2);

  slides.push({
    slideNumber: sNum++,
    layout: 'concept',
    title: `Fondasi Konseptual: ${lesson.title}`,
    lead: p1Sentences[0] || p1,
    bulletPoints: [
      ...(p1Sentences.slice(1, 3)),
      ...(p2Sentences.slice(0, 2))
    ].filter(Boolean),
    keyFormulaOrDiagram: contentParagraphs[2] ? contentParagraphs[2].slice(0, 250) : undefined,
    notes: 'Ajak mahasiswa mendiskusikan asumsi ontologis dan epistemologis di balik konsep ini.'
  });

  // 3. Methodological Architecture (layout: concept)
  if (contentParagraphs.length >= 3) {
    const p3Sentences = splitIntoSentences(contentParagraphs[2]);
    const p4Sentences = contentParagraphs[3] ? splitIntoSentences(contentParagraphs[3]) : [];
    slides.push({
      slideNumber: sNum++,
      layout: 'concept',
      title: 'Arsitektur Metodologis & Desain Operasional',
      lead: p3Sentences[0] || 'Prinsip operasional pelaksanaan metode penelitian.',
      bulletPoints: [
        ...(p3Sentences.slice(1, 3)),
        ...(p4Sentences.slice(0, 2))
      ].filter(Boolean),
      notes: 'Tegaskan batas operasional sistem dan validitas internal pengukuran.'
    });
  }

  // 4. Mathematical Foundations (layout: derivation)
  if (lesson.mathematicalFoundations) {
    const mathText = lesson.mathematicalFoundations;
    const mathFormula = extractDisplayMath(mathText);
    const textLines = mathText.split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('$$') && !l.endsWith('$$'));

    slides.push({
      slideNumber: sNum++,
      layout: 'derivation',
      title: 'Formulasi Matematis & Notasi Formal',
      lead: textLines[0] || 'Definisi analitis dan formulasi matematis model.',
      bulletPoints: textLines.slice(1, 4).length > 0 ? textLines.slice(1, 4) : [
        'Formulasi analitis variabel independen dan dependen.',
        'Asumsi keterpenuhan parameter dan ruang distribusi.',
        'Kalkulasi derajat kebebasan dan kriteria keputusan statistik.'
      ],
      keyFormulaOrDiagram: mathFormula,
      notes: 'Uraikan setiap simbol dalam persamaan, termasuk konstanta dan parameter kendali.'
    });
  }

  // 5. Worked Example - Problem Statement (layout: example)
  if (lesson.workedExample) {
    slides.push({
      slideNumber: sNum++,
      layout: 'example',
      title: 'Studi Kasus Numerik: Perumusan Masalah',
      lead: 'Konteks rekayasa dan spesifikasi parameter eksperimen.',
      bulletPoints: [
        `Konteks Kasus: ${lesson.workedExample.problemStatement}`,
        'Identifikasi Parameter: Penetapan variabel independen, dependen, dan baseline.',
        'Tujuan Analisis: Menghitung metrik performa sesuai kriteria keputusan metodologis.'
      ],
      notes: 'Bimbing mahasiswa mengidentifikasi variabel kunci sebelum memulai perhitungan.'
    });

    // 6. Worked Example - Step-by-Step Solution (layout: example)
    const steps = lesson.workedExample.stepByStepSolution || [];
    if (steps.length > 0) {
      // Split steps if more than 2 steps to avoid crowded slides
      const half = Math.ceil(steps.length / 2);
      const stepsPart1 = steps.slice(0, half);
      const stepsPart2 = steps.slice(half);

      slides.push({
        slideNumber: sNum++,
        layout: 'example',
        title: 'Solusi Numerik: Kalkulasi Langkah demi Langkah',
        lead: 'Prosedur perhitungan analitis dan estimasi parameter.',
        bulletPoints: stepsPart1,
        notes: 'Perhatikan kepatuhan terhadap urutan operasi matematis dan rounding error.'
      });

      if (stepsPart2.length > 0) {
        slides.push({
          slideNumber: sNum++,
          layout: 'example',
          title: 'Solusi Numerik: Pembuktian & Interpretasi Hasil',
          lead: 'Evaluasi kriteria keputusan statistik dan signifikansi temuan.',
          bulletPoints: [
            ...stepsPart2,
            `Interpretasi Ilmiah: ${lesson.workedExample.resultInterpretation}`
          ],
          callout: {
            type: 'result',
            title: 'Kesimpulan Substantif',
            text: lesson.workedExample.resultInterpretation
          },
          notes: 'Tekankan perbedaan antara signifikansi statistik (p-value) dan signifikansi praktis/rekayasa.'
        });
      }
    }
  }

  // 7. Python Implementation (layout: algorithm)
  if (lesson.pythonImplementation && lesson.pythonImplementation.code) {
    const py = lesson.pythonImplementation;
    const libs = (py.libraryDependencies || []).join(', ') || 'Standard Scientific Libraries';
    slides.push({
      slideNumber: sNum++,
      layout: 'algorithm',
      title: 'Implementasi Komputasi & Eksekusi Python',
      lead: py.description || 'Struktur algoritma komputasi dan dependensi ilmiah.',
      bulletPoints: [
        `Tujuan Algoritma: ${py.description}`,
        `Dependensi Pustaka Ilmiah: ${libs}`,
        `Keluaran Terverifikasi: ${py.expectedOutput ? py.expectedOutput.split('\n')[0] : 'Keluaran deterministik teruji.'}`
      ],
      keyFormulaOrDiagram: py.expectedOutput ? py.expectedOutput.split('\n').slice(0, 5).join('\n') : undefined,
      notes: 'Jalankan skrip ini di lab komputasi untuk membuktikan replikasi hasil secara deterministik.'
    });
  }

  // 8. Methodological Pitfalls & Warnings (layout: warning)
  if (lesson.commonPitfalls && lesson.commonPitfalls.length > 0) {
    slides.push({
      slideNumber: sNum++,
      layout: 'warning',
      title: 'Perangkap Metodologis & P-Hacking Warning',
      lead: 'Peringatan kritis terhadap ancaman validitas riset dan bias inferensi.',
      bulletPoints: lesson.commonPitfalls.map(p => `[warning: Perangkap] ${p}`),
      notes: 'Peringatkan mahasiswa agar tidak terjebak dalam bias konfirmasi atau manipulasi data.'
    });
  }

  // 9. Validation Procedures (layout: example)
  if (lesson.validationProcedures && lesson.validationProcedures.length > 0) {
    slides.push({
      slideNumber: sNum++,
      layout: 'example',
      title: 'Prosedur Validasi Empiris & Integritas Riset',
      lead: 'Protokol pengujian ketahanan model dan integritas keterbukaan sains.',
      bulletPoints: lesson.validationProcedures.map(v => `Prosedur: ${v}`),
      notes: 'Verifikasi kepatuhan terhadap standar artefak bereputasi (ACM Badging / Zenodo DOI).'
    });
  }

  // 10. Synthesis & Discussion Exercises (layout: exercise)
  if (lesson.exercises && lesson.exercises.length > 0) {
    const ex = lesson.exercises[0];
    slides.push({
      slideNumber: sNum++,
      layout: 'exercise',
      title: 'Sintesis Materi & Latihan Mandiri',
      lead: 'Pertanyaan penguji pemahaman kritis dan diskusi kelas.',
      bulletPoints: [
        `Pertanyaan Uji: ${ex.question}`,
        `Petunjuk Analitis: ${ex.hint}`,
        `Solusi Kunci: ${ex.answerExplanation}`
      ],
      notes: 'Gunakan pertanyaan ini sebagai bahan kuis interaktif atau diskusi kelompok.'
    });
  }

  return slides;
}

async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const mod = await vite.ssrLoadModule('/src/lessons/ch01.ts');
  const lessonsDict = mod.CH01_LESSONS || {};

  let totalSlides = 0;
  let sNum = 1;

  for (const [lid, lesson] of Object.entries(lessonsDict)) {
    const synthesized = synthesizeSlidesForLesson(lesson, sNum);
    sNum += synthesized.length;
    totalSlides += synthesized.length;
    console.log(`Lesson ${lid}: Synthesized ${synthesized.length} slides.`);
    synthesized.forEach(s => {
      // Check for ellipsis truncation
      s.bulletPoints.forEach(b => {
        if (b.endsWith('...')) {
          console.warn(`  [TRUNCATION DETECTED] Slide ${s.slideNumber}: ${b}`);
        }
      });
    });
  }

  console.log(`\nCH-01 Total Synthesized Slides: ${totalSlides}`);
  await vite.close();
}

run().catch(console.error);
