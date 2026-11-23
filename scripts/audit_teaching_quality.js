import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const categories = {};
  let totalSlides = 0;
  let totalBullets = 0;
  let slidesWithFormulas = 0;
  const placeholderIssues = [];
  const chaptersSummary = [];

  for (let i = 1; i <= 51; i++) {
    const chNum = String(i).padStart(2, '0');
    const chFile = path.resolve(`src/lessons/ch${chNum}.ts`);
    if (!fs.existsSync(chFile)) continue;

    const mod = await vite.ssrLoadModule(`/src/lessons/ch${chNum}.ts`);
    const lessonsDict = mod[`CH${chNum}_LESSONS`] || Object.values(mod)[0] || {};

    let chSlideCount = 0;
    let chBulletCount = 0;
    let chFormulaCount = 0;

    for (const [lid, lesson] of Object.entries(lessonsDict)) {
      if (!lesson.slides) continue;
      for (const s of lesson.slides) {
        totalSlides++;
        chSlideCount++;
        const cat = s.title.split(':')[0].trim();
        categories[cat] = (categories[cat] || 0) + 1;

        if (s.keyFormulaOrDiagram && s.keyFormulaOrDiagram.trim()) {
          slidesWithFormulas++;
          chFormulaCount++;
        }

        const bullets = s.bulletPoints || [];
        totalBullets += bullets.length;
        chBulletCount += bullets.length;

        for (const b of bullets) {
          if (/\b(todo|tbd|lorem\s+ipsum|insert\s+here)\b/i.test(b)) {
            placeholderIssues.push({ chapter: `CH-${chNum}`, lesson: lid, slide: s.slideNumber, text: b });
          }
        }
      }
    }

    chaptersSummary.push({
      chapterId: `CH-${chNum}`,
      slideCount: chSlideCount,
      bulletCount: chBulletCount,
      formulaCount: chFormulaCount,
      avgBulletsPerSlide: chSlideCount > 0 ? (chBulletCount / chSlideCount).toFixed(2) : 0
    });
  }

  await vite.close();

  console.log('================================================================');
  console.log('TEACHING QUALITY & PEDAGOGICAL DEPTH AUDIT');
  console.log('================================================================');
  console.log(`Total Chapters Audited       : ${chaptersSummary.length}`);
  console.log(`Total Substantive Slides     : ${totalSlides}`);
  console.log(`Average Slides per Chapter   : ${(totalSlides / chaptersSummary.length).toFixed(1)}`);
  console.log(`Total Bullet Points          : ${totalBullets}`);
  console.log(`Average Bullets per Slide    : ${(totalBullets / totalSlides).toFixed(2)}`);
  console.log(`Slides with Formulas/Diagrams: ${slidesWithFormulas} (${((slidesWithFormulas / totalSlides) * 100).toFixed(1)}%)`);
  console.log(`Placeholder/Slop Issues      : ${placeholderIssues.length}`);

  console.log('\nPedagogical Functions Breakdown across All Slides:');
  for (const [cat, cnt] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
    console.log(`  - ${cat.padEnd(45)}: ${cnt} slides (${((cnt / totalSlides) * 100).toFixed(1)}%)`);
  }

  const auditReport = {
    totalChapters: chaptersSummary.length,
    totalSlides,
    avgSlidesPerChapter: Number((totalSlides / chaptersSummary.length).toFixed(1)),
    totalBullets,
    avgBulletsPerSlide: Number((totalBullets / totalSlides).toFixed(2)),
    slidesWithFormulas,
    formulaCoveragePct: Number(((slidesWithFormulas / totalSlides) * 100).toFixed(1)),
    placeholderIssues,
    pedagogicalDistribution: categories,
    chapters: chaptersSummary
  };

  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync('reports/teaching_quality_audit.json', JSON.stringify(auditReport, null, 2), 'utf-8');
  console.log('\nReport written to reports/teaching_quality_audit.json');
}

run().catch(console.error);
