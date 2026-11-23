import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import katex from 'katex';

async function auditMath() {
  console.log('================================================================');
  console.log('MATHEMATICAL EQUATION INTEGRITY AUDIT');
  console.log('Validating all LaTeX/KaTeX equations across 51 chapters & lessons');
  console.log('================================================================\n');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  let totalEquations = 0;
  let successfulEquations = 0;
  let brokenEquations = [];

  function testMath(rawMath, location, isDisplay = false) {
    if (!rawMath || !rawMath.trim()) return;
    totalEquations++;
    
    // Clean delimiters if passed
    let clean = rawMath.trim();
    if (clean.startsWith('$$') && clean.endsWith('$$') && clean.length >= 4) {
      clean = clean.slice(2, -2).trim();
      isDisplay = true;
    } else if (clean.startsWith('$') && clean.endsWith('$') && clean.length >= 2) {
      clean = clean.slice(1, -1).trim();
    } else if (clean.startsWith('\\[') && clean.endsWith('\\]') && clean.length >= 4) {
      clean = clean.slice(2, -2).trim();
      isDisplay = true;
    } else if (clean.startsWith('\\(') && clean.endsWith('\\)') && clean.length >= 4) {
      clean = clean.slice(2, -2).trim();
    }

    try {
      katex.renderToString(clean, {
        displayMode: isDisplay,
        throwOnError: true, // Strictly throw on error to catch invalid math!
        strict: 'warn'
      });
      successfulEquations++;
    } catch (err) {
      brokenEquations.push({
        location,
        equation: clean,
        error: err.message
      });
    }
  }

  function extractAndTest(text, location) {
    if (!text) return;

    // 1. Check for unclosed math delimiters
    const doubleDollarCount = (text.match(/\$\$/g) || []).length;
    if (doubleDollarCount % 2 !== 0) {
      brokenEquations.push({
        location,
        equation: text.slice(0, 100) + '...',
        error: 'Unclosed display math delimiter ($$)'
      });
    }

    // 2. Extract $$...$$
    const displayMatches = text.matchAll(/\$\$([\s\S]+?)\$\$/g);
    for (const m of displayMatches) {
      testMath(m[1], `${location} [display]`, true);
    }

    // 3. Extract $...$
    // Replace $$ with spaces first to not match inside display math
    const textWithoutDisplay = text.replace(/\$\$[\s\S]+?\$\$/g, '');
    const singleDollarCount = (textWithoutDisplay.match(/(?<!\\)\$/g) || []).length;
    if (singleDollarCount % 2 !== 0) {
      brokenEquations.push({
        location,
        equation: textWithoutDisplay.slice(0, 100) + '...',
        error: 'Unclosed inline math delimiter ($)'
      });
    }

    const inlineMatches = textWithoutDisplay.matchAll(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g);
    for (const m of inlineMatches) {
      testMath(m[1], `${location} [inline]`, false);
    }
  }

  for (let i = 1; i <= 51; i++) {
    const chNum = String(i).padStart(2, '0');
    const chFile = path.resolve(`src/lessons/ch${chNum}.ts`);
    if (!fs.existsSync(chFile)) continue;

    const mod = await vite.ssrLoadModule(`/src/lessons/ch${chNum}.ts`);
    const lessonsDict = mod[`CH${chNum}_LESSONS`] || Object.values(mod)[0] || {};

    for (const [lid, lesson] of Object.entries(lessonsDict)) {
      // 1. Test canonical lesson fields
      extractAndTest(lesson.mathematicalFoundations, `CH-${chNum} Lesson ${lid} mathematicalFoundations`);
      extractAndTest(lesson.content, `CH-${chNum} Lesson ${lid} content`);
      if (lesson.workedExample) {
        extractAndTest(lesson.workedExample.problemStatement, `CH-${chNum} Lesson ${lid} workedExample.problemStatement`);
        (lesson.workedExample.stepByStepSolution || []).forEach((step, sIdx) => {
          extractAndTest(step, `CH-${chNum} Lesson ${lid} workedExample.stepByStepSolution[${sIdx}]`);
        });
        extractAndTest(lesson.workedExample.resultInterpretation, `CH-${chNum} Lesson ${lid} workedExample.resultInterpretation`);
      }

      // 2. Test slide fields
      if (lesson.slides) {
        lesson.slides.forEach(s => {
          extractAndTest(s.title, `CH-${chNum} Lesson ${lid} Slide ${s.slideNumber} title`);
          (s.bulletPoints || []).forEach((b, bIdx) => {
            extractAndTest(b, `CH-${chNum} Lesson ${lid} Slide ${s.slideNumber} bullet[${bIdx}]`);
          });
          if (s.keyFormulaOrDiagram) {
            // Test if it's a math expression
            if (s.keyFormulaOrDiagram.includes('$') || s.keyFormulaOrDiagram.includes('\\')) {
              extractAndTest(s.keyFormulaOrDiagram, `CH-${chNum} Lesson ${lid} Slide ${s.slideNumber} keyFormulaOrDiagram`);
            }
          }
        });
      }
    }
  }

  await vite.close();

  console.log(`Total Equations Tested     : ${totalEquations}`);
  console.log(`Successfully Rendered      : ${successfulEquations} (${((successfulEquations / Math.max(1, totalEquations)) * 100).toFixed(1)}%)`);
  console.log(`Broken / Invalid Equations : ${brokenEquations.length}`);

  if (brokenEquations.length > 0) {
    console.log('\nSample Broken Equations:');
    brokenEquations.slice(0, 15).forEach(b => {
      console.log(`  [${b.location}]`);
      console.log(`    Error   : ${b.error}`);
      console.log(`    Equation: ${b.equation.replace(/\n/g, ' ').slice(0, 100)}`);
    });
  }

  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync('reports/math_integrity_audit.json', JSON.stringify({
    totalEquations,
    successfulEquations,
    brokenEquationsCount: brokenEquations.length,
    brokenEquations
  }, null, 2), 'utf-8');

  console.log('\nReport written to reports/math_integrity_audit.json');
}

auditMath().catch(console.error);
