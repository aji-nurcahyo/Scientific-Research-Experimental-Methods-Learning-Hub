import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function run() {
  console.log('================================================================');
  console.log('FULL 51 CHAPTER PPTX DECKS & SLIDES INTEGRITY AUDIT');
  console.log('Auditing all 51 chapters (2,035 slides) for PPTX export readiness');
  console.log('================================================================\n');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const pptxMod = await vite.ssrLoadModule('/src/utils/pptxExport.ts');
  const cleanFormulaForPPTX = pptxMod.cleanFormulaForPPTX;
  const cleanBulletText = pptxMod.cleanBulletText;

  let totalSlides = 0;
  let brokenMarkdownIssues = [];
  let brokenLatexIssues = [];
  let textOverflowIssues = [];
  const chapterStats = [];

  const rawPatterns = ['**', '```', '##'];
  const brokenLatexPatterns = ['$$', '\\text{', '\\frac{', '\\left', '\\right', '\\begin{', '\\end{'];

  for (let i = 1; i <= 51; i++) {
    const chNum = String(i).padStart(2, '0');
    const chFile = path.resolve(`src/lessons/ch${chNum}.ts`);
    if (!fs.existsSync(chFile)) continue;

    const mod = await vite.ssrLoadModule(`/src/lessons/ch${chNum}.ts`);
    const lessonsDict = mod[`CH${chNum}_LESSONS`] || Object.values(mod)[0] || {};

    let chSlides = 0;
    let chRawMd = 0;
    let chBrokenLatex = 0;
    let chOverflow = 0;

    for (const [lid, lesson] of Object.entries(lessonsDict)) {
      if (!lesson.slides) continue;
      for (const s of lesson.slides) {
        totalSlides++;
        chSlides++;

        // Audit bullets after cleaning
        const cleanedBullets = (s.bulletPoints || []).map(b => cleanBulletText(b));
        for (const b of cleanedBullets) {
          for (const p of rawPatterns) {
            if (b.includes(p)) {
              brokenMarkdownIssues.push({ chapter: `CH-${chNum}`, lesson: lid, slide: s.slideNumber, pattern: p, text: b });
              chRawMd++;
            }
          }
          for (const lp of brokenLatexPatterns) {
            if (b.includes(lp)) {
              brokenLatexIssues.push({ chapter: `CH-${chNum}`, lesson: lid, slide: s.slideNumber, pattern: lp, text: b });
              chBrokenLatex++;
            }
          }
          if (b.length > 280) {
            textOverflowIssues.push({ chapter: `CH-${chNum}`, lesson: lid, slide: s.slideNumber, len: b.length, text: b });
            chOverflow++;
          }
        }

        // Audit key formula / diagram after cleaning
        if (s.keyFormulaOrDiagram) {
          const cleanedFormula = cleanFormulaForPPTX(s.keyFormulaOrDiagram);
          for (const p of rawPatterns) {
            if (cleanedFormula.includes(p)) {
              brokenMarkdownIssues.push({ chapter: `CH-${chNum}`, lesson: lid, slide: s.slideNumber, pattern: p, text: cleanedFormula });
              chRawMd++;
            }
          }
          for (const lp of brokenLatexPatterns) {
            if (cleanedFormula.includes(lp)) {
              brokenLatexIssues.push({ chapter: `CH-${chNum}`, lesson: lid, slide: s.slideNumber, pattern: lp, text: cleanedFormula });
              chBrokenLatex++;
            }
          }
          if (cleanedFormula.length > 280) {
            textOverflowIssues.push({ chapter: `CH-${chNum}`, lesson: lid, slide: s.slideNumber, len: cleanedFormula.length, text: cleanedFormula });
            chOverflow++;
          }
        }
      }
    }

    chapterStats.push({
      chapter: `CH-${chNum}`,
      slides: chSlides,
      rawMd: chRawMd,
      brokenLatex: chBrokenLatex,
      overflow: chOverflow
    });
  }

  await vite.close();

  console.log(`Total Chapters Checked     : ${chapterStats.length}`);
  console.log(`Total Slides Audited       : ${totalSlides}`);
  console.log(`Raw Markdown Artifacts     : ${brokenMarkdownIssues.length}`);
  console.log(`Broken LaTeX Artifacts     : ${brokenLatexIssues.length}`);
  console.log(`Text Overflow (>280 chars) : ${textOverflowIssues.length}`);

  const summary = {
    totalChapters: chapterStats.length,
    totalSlides,
    rawMarkdownCount: brokenMarkdownIssues.length,
    brokenLatexCount: brokenLatexIssues.length,
    textOverflowCount: textOverflowIssues.length,
    brokenMarkdownIssues,
    brokenLatexIssues,
    textOverflowIssues,
    chapterStats
  };

  fs.writeFileSync('reports/all_51_decks_audit.json', JSON.stringify(summary, null, 2), 'utf-8');
  console.log('\nReport written to reports/all_51_decks_audit.json');
}

run().catch(console.error);
