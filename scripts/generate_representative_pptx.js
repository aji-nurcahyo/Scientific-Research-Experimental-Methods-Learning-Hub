import { createServer } from 'vite';
import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

const COLOR_PRIMARY = '0F3D59';    // ITERA Slate Blue
const COLOR_SECONDARY = 'C59B27';  // ITERA Ochre Gold
const COLOR_TEXT_DARK = '1E293B';  // Charcoal Dark
const COLOR_BG_LIGHT = 'F8FAFC';   // Subtle White-Gray
const COLOR_BORDER = 'CBD5E1';     // Light Border

function cleanFormulaForPPTX(formula) {
  if (!formula) return '';
  let res = formula
    .replace(/```[a-zA-Z]*/g, '')
    .replace(/```/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/`/g, '')
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/\\left\./g, '')
    .replace(/\\right\./g, '')
    .replace(/\\left/g, '')
    .replace(/\\right/g, '')
    .replace(/\\begin\{[a-zA-Z*]+\}/g, '')
    .replace(/\\end\{[a-zA-Z*]+\}/g, '')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\mathrm\{([^}]+)\}/g, '$1')
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')
    .replace(/\\mathbb\{([^}]+)\}/g, '$1')
    .replace(/\\tilde\{([^}]+)\}/g, '$1~')
    .replace(/\\hat\{([^}]+)\}/g, '$1^')
    .replace(/\\bar\{([^}]+)\}/g, '$1_avg')
    .replace(/\\widehat\{([^}]+)\}/g, '$1^')
    .replace(/\\partial/g, 'd')
    .replace(/\\implies/g, ' => ')
    .replace(/\\iff/g, ' <=> ')
    .replace(/\\times/g, ' × ')
    .replace(/\\le\b/g, ' <= ')
    .replace(/\\ge\b/g, ' >= ')
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\ne\b/g, ' != ')
    .replace(/\\pm/g, ' ± ')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\dots/g, '...')
    .replace(/\\alpha/g, 'alpha')
    .replace(/\\beta/g, 'beta')
    .replace(/\\gamma/g, 'gamma')
    .replace(/\\sigma/g, 'sigma')
    .replace(/\\mu/g, 'mu')
    .replace(/\\lambda/g, 'lambda')
    .replace(/\\epsilon/g, 'epsilon')
    .replace(/\\delta/g, 'delta')
    .replace(/\\Delta/g, 'Delta')
    .replace(/\\theta/g, 'theta')
    .replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, 'SUM($1..$2)')
    .replace(/\\sum/g, 'SUM');

  while (/\\frac\{([^{}]+)\}\{([^{}]+)\}/.test(res)) {
    res = res.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1 / $2)');
  }
  res = res.replace(/\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, '($1 / $2)');
  res = res.replace(/\\frac([a-zA-Z0-9_]+)/g, '$1');

  while (/\\sqrt\{([^{}]+)\}/.test(res)) {
    res = res.replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)');
  }

  res = res.replace(/\\\\/g, '\n').replace(/&/g, ' | ');
  res = res.replace(/\{([^}]+)\}/g, '$1');
  res = res.replace(/[\\{}]/g, '');

  if (res.length > 240) {
    res = res.substring(0, 237) + '...';
  }

  return res.trim();
}

function cleanBulletText(text) {
  if (!text) return '';
  let res = text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\$([^\$]+)\$/g, (m, p1) => cleanFormulaForPPTX(p1))
    .replace(/—/g, ' - ')
    .replace(/–/g, '-');

  // Strip residual unclosed math or markdown
  res = cleanFormulaForPPTX(res);
  return res.trim();
}

async function buildChapterPPTX(chapterId, chapterTitle, subtitle, lessonsDict, outputPath) {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';

  // Aggregate all slides across lessons
  let slideList = [];
  let sNum = 1;
  for (const [lid, lesson] of Object.entries(lessonsDict)) {
    if (lesson.slides && lesson.slides.length > 0) {
      for (const s of lesson.slides) {
        slideList.push({
          ...s,
          lessonId: lid,
          slideNumber: sNum++
        });
      }
    }
  }

  // 1. Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: COLOR_PRIMARY };

  titleSlide.addText('INSTITUT TEKNOLOGI SUMATERA (ITERA)', {
    x: 0.8, y: 0.9, w: 8.4, h: 0.4,
    fontSize: 13, color: COLOR_SECONDARY, bold: true, fontFace: 'Arial'
  });

  titleSlide.addText('Program Studi Rekayasa & Sains Komputasi • Learning Hub', {
    x: 0.8, y: 1.4, w: 8.4, h: 0.4,
    fontSize: 14, color: '94A3B8', fontFace: 'Arial'
  });

  titleSlide.addText(`${chapterId}: ${chapterTitle}`, {
    x: 0.8, y: 2.1, w: 8.4, h: 1.6,
    fontSize: 24, color: 'FFFFFF', bold: true, fontFace: 'Georgia', breakLine: true
  });

  if (subtitle) {
    titleSlide.addText(cleanBulletText(subtitle), {
      x: 0.8, y: 3.9, w: 8.4, h: 0.6,
      fontSize: 13, color: 'E2E8F0', fontFace: 'Arial'
    });
  }

  titleSlide.addText(`Slide Deck Perkuliahan Komprehensif • Total: ${slideList.length} Slide Terverifikasi`, {
    x: 0.8, y: 4.8, w: 8.4, h: 0.4,
    fontSize: 11, color: COLOR_SECONDARY, bold: true, fontFace: 'Arial'
  });

  // 2. Content Slides
  for (const s of slideList) {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    // Header Banner
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 10, h: 0.9,
      fill: { color: COLOR_PRIMARY }, line: { color: COLOR_PRIMARY }
    });

    // Tag
    slide.addText(`${chapterId} • Lesson ${s.lessonId} • Slide ${s.slideNumber} of ${slideList.length}`, {
      x: 0.6, y: 0.12, w: 8.8, h: 0.25,
      fontSize: 10, color: COLOR_SECONDARY, bold: true, fontFace: 'Arial'
    });

    // Title
    slide.addText(cleanBulletText(s.title), {
      x: 0.6, y: 0.38, w: 8.8, h: 0.42,
      fontSize: 16, color: 'FFFFFF', bold: true, fontFace: 'Georgia'
    });

    // Bullets
    const hasFormula = !!s.keyFormulaOrDiagram;
    const bulletWidth = hasFormula ? 5.8 : 8.8;

    const formattedBullets = (s.bulletPoints || []).map((pt) => ({
      text: cleanBulletText(pt),
      options: {
        fontSize: 12.5,
        color: COLOR_TEXT_DARK,
        breakLine: true,
        fontFace: 'Arial',
        bullet: true,
        paraSpaceAfter: 9
      }
    }));

    slide.addText(formattedBullets, {
      x: 0.6, y: 1.25, w: bulletWidth, h: 3.8, valign: 'top'
    });

    // Callout Box
    if (s.keyFormulaOrDiagram) {
      slide.addShape(pptx.ShapeType.rect, {
        x: 6.6, y: 1.25, w: 2.8, h: 3.7,
        fill: { color: COLOR_BG_LIGHT }, line: { color: COLOR_BORDER, width: 1 }
      });

      slide.addText('Rujukan / Formulasi Kunci:', {
        x: 6.8, y: 1.4, w: 2.4, h: 0.3,
        fontSize: 9.5, color: COLOR_PRIMARY, bold: true, fontFace: 'Arial'
      });

      const cleanFormula = cleanFormulaForPPTX(s.keyFormulaOrDiagram);
      slide.addText(cleanFormula, {
        x: 6.8, y: 1.8, w: 2.4, h: 3.0,
        fontSize: 10.5, color: '0F172A', fontFace: 'Courier New',
        valign: 'middle', align: 'center', breakLine: true
      });
    }

    // Footer
    slide.addText('Scientific Research Learning Hub • Institut Teknologi Sumatera', {
      x: 0.6, y: 5.22, w: 8.8, h: 0.3,
      fontSize: 8.5, color: '94A3B8', fontFace: 'Arial'
    });
  }

  await pptx.writeFile({ fileName: outputPath });
  const stat = fs.statSync(outputPath);
  return {
    chapterId,
    slideCount: slideList.length,
    fileSize: stat.size,
    outputPath
  };
}

async function run() {
  console.log('================================================================');
  console.log('POWERPOINT VERIFICATION & GENERATION HARNESS');
  console.log('Generating representative PPTX files for CH-01, 16, 24, 38, 51');
  console.log('================================================================\n');

  const outDir = path.resolve('reports/pptx');
  fs.mkdirSync(outDir, { recursive: true });

  const server = await createServer();

  const targetChapters = [
    { id: 'CH-01', title: 'Epistemology, Scientific Reasoning & Demarcation', subtitle: 'Logika penalaran ilmiah, falsifikasi Popperian, dan demarkasi sains.', file: 'ch01.ts', name: 'CH-01_Scientific_Foundations.pptx' },
    { id: 'CH-16', title: 'Exploratory Data Analysis & Descriptive Statistics', subtitle: 'Filosofi Tukey EDA, ukuran dispersi tahan outlier, dan diagnostik data.', file: 'ch16.ts', name: 'CH-16_Statistical_Analysis.pptx' },
    { id: 'CH-24', title: 'Linear Regression & General Linear Models', subtitle: 'Estimasi OLS, asumsi Gauss-Markov, diagnostik residual, dan multikolinearitas.', file: 'ch24.ts', name: 'CH-24_Regression_Modeling.pptx' },
    { id: 'CH-38', title: 'Generalized Additive Models (GAM) & Splines', subtitle: 'Basis splines, penalized likelihood smoothing, interpretasi efek parsial.', file: 'ch38.ts', name: 'CH-38_Advanced_Computational_Methods.pptx' },
    { id: 'CH-51', title: 'Research Capstone: End-to-End Methodological Defense', subtitle: 'Audit replikasi independen, defense simulasi, dan integritas riset kanonikal.', file: 'ch51.ts', name: 'CH-51_Research_Capstone.pptx' },
  ];

  const results = [];

  for (const target of targetChapters) {
    const mod = await server.ssrLoadModule(`./src/lessons/${target.file}`);
    const exportKey = Object.keys(mod)[0];
    const lessonsDict = mod[exportKey];

    const outPath = path.join(outDir, target.name);
    const res = await buildChapterPPTX(target.id, target.title, target.subtitle, lessonsDict, outPath);
    results.push(res);
    console.log(`[GENERATED] ${res.chapterId}: ${res.slideCount} slides | ${res.fileSize} bytes -> ${target.name}`);
  }

  await server.close();

  fs.writeFileSync('reports/pptx_generation_summary.json', JSON.stringify(results, null, 2));
  console.log('\nAll 5 representative PPTX decks generated successfully!');
}

run();
