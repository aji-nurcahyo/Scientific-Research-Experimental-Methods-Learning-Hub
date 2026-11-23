import pptxgen from 'pptxgenjs';

export interface ExportableSlide {
  slideNumber: number;
  layout?: string;
  title: string;
  subtitle?: string;
  lead?: string;
  bulletPoints: string[];
  keyFormulaOrDiagram?: string;
  notes?: string;
}

export interface ChapterPresentationOptions {
  chapterId: string;
  chapterTitle: string;
  subtitle?: string;
  slides: ExportableSlide[];
}

export function cleanFormulaForPPTX(formula: string): string {
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

export function cleanBulletText(text: string): string {
  if (!text) return '';
  let res = text
    .replace(/\[(warning|perangkap|danger):\s*([^\]]+)\]/gi, '[PERINGATAN] $2')
    .replace(/\[(result|hasil|temuan):\s*([^\]]+)\]/gi, '[TEMUAN] $2')
    .replace(/\[(definition|definisi):\s*([^\]]+)\]/gi, '[DEFINISI] $2')
    .replace(/\[(concept|konsep):\s*([^\]]+)\]/gi, '[KONSEP] $2')
    .replace(/\[(note|catatan):\s*([^\]]+)\]/gi, '[CATATAN] $2')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\$([^\$]+)\$/g, (_, p1) => cleanFormulaForPPTX(p1))
    .replace(/—/g, ' - ')
    .replace(/–/g, '-');

  // Strip residual unclosed math or markdown
  res = cleanFormulaForPPTX(res);
  return res.trim();
}

/**
 * Generates and downloads an editable PowerPoint (.pptx) presentation deck
 * styled according to the ITERA Academic Design System.
 */
export async function exportChapterToPPTX(options: ChapterPresentationOptions): Promise<void> {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';

  // Define Colors
  const COLOR_PRIMARY = '0F3D59';    // Slate Blue
  const COLOR_SECONDARY = 'C59B27';  // Gold / Ochre
  const COLOR_TEXT_DARK = '1E293B';  // Charcoal Dark
  const COLOR_BG_LIGHT = 'F8FAFC';   // Subtle White-Gray
  const COLOR_BORDER = 'CBD5E1';     // Light Border

  // 1. Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: COLOR_PRIMARY };

  titleSlide.addText('INSTITUT TEKNOLOGI SUMATERA', {
    x: 0.8,
    y: 1.0,
    w: 8.4,
    h: 0.4,
    fontSize: 13,
    color: COLOR_SECONDARY,
    bold: true,
    fontFace: 'Arial',
  });

  titleSlide.addText('Scientific Research & Experimental Methods Learning Hub', {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 0.5,
    fontSize: 15,
    color: '94A3B8',
    fontFace: 'Arial',
  });

  titleSlide.addText(`${options.chapterId}: ${options.chapterTitle}`, {
    x: 0.8,
    y: 2.2,
    w: 8.4,
    h: 1.6,
    fontSize: 26,
    color: 'FFFFFF',
    bold: true,
    fontFace: 'Georgia',
    breakLine: true,
  });

  if (options.subtitle) {
    titleSlide.addText(options.subtitle, {
      x: 0.8,
      y: 4.0,
      w: 8.4,
      h: 0.6,
      fontSize: 14,
      color: 'E2E8F0',
      fontFace: 'Arial',
    });
  }

  titleSlide.addText(`Slide Deck Perkuliahan Lengkap • Total: ${options.slides.length} Slide`, {
    x: 0.8,
    y: 4.8,
    w: 8.4,
    h: 0.4,
    fontSize: 11,
    color: COLOR_SECONDARY,
    fontFace: 'Arial',
  });

  // 2. Content Slides
  for (const s of options.slides) {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    // Top Header Banner
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.9,
      fill: { color: COLOR_PRIMARY },
      line: { color: COLOR_PRIMARY },
    });

    // Chapter Tag
    slide.addText(`${options.chapterId} • Slide ${s.slideNumber} of ${options.slides.length}`, {
      x: 0.6,
      y: 0.15,
      w: 8.8,
      h: 0.25,
      fontSize: 10,
      color: COLOR_SECONDARY,
      bold: true,
      fontFace: 'Arial',
    });

    // Slide Title in Banner
    slide.addText(s.title, {
      x: 0.6,
      y: 0.4,
      w: 8.8,
      h: 0.4,
      fontSize: 16,
      color: 'FFFFFF',
      bold: true,
      fontFace: 'Georgia',
    });

    // Bullet Points
    const bulletY = 1.3;
    const hasFormula = !!s.keyFormulaOrDiagram;
    const bulletWidth = hasFormula ? 5.8 : 8.8;

    const formattedBullets = s.bulletPoints.map((pt) => ({
      text: cleanBulletText(pt),
      options: {
        fontSize: 13,
        color: COLOR_TEXT_DARK,
        breakLine: true,
        fontFace: 'Arial',
        bullet: true,
        paraSpaceAfter: 10,
      },
    }));

    slide.addText(formattedBullets, {
      x: 0.6,
      y: bulletY,
      w: bulletWidth,
      h: 3.8,
      valign: 'top',
    });

    // Key Formula or Callout Box (if present)
    if (s.keyFormulaOrDiagram) {
      slide.addShape(pptx.ShapeType.rect, {
        x: 6.6,
        y: 1.3,
        w: 2.8,
        h: 3.6,
        fill: { color: COLOR_BG_LIGHT },
        line: { color: COLOR_BORDER, width: 1 },
      });

      slide.addText('Formulasi / Rujukan Kunci:', {
        x: 6.8,
        y: 1.5,
        w: 2.4,
        h: 0.3,
        fontSize: 10,
        color: COLOR_PRIMARY,
        bold: true,
        fontFace: 'Arial',
      });

      const cleanFormula = cleanFormulaForPPTX(s.keyFormulaOrDiagram);

      slide.addText(cleanFormula, {
        x: 6.8,
        y: 1.9,
        w: 2.4,
        h: 2.8,
        fontSize: 11,
        color: '0F172A',
        fontFace: 'Courier New',
        valign: 'middle',
        align: 'center',
      });
    }

    // Speaker Notes
    if (s.notes) {
      slide.addNotes(s.notes);
    }

    // Bottom Footer
    slide.addText('Scientific Research Learning Hub • Institut Teknologi Sumatera', {
      x: 0.6,
      y: 5.2,
      w: 8.8,
      h: 0.3,
      fontSize: 9,
      color: '94A3B8',
      fontFace: 'Arial',
    });
  }

  // 3. Save File
  const filename = `${options.chapterId}_Presentation_Deck.pptx`;
  await pptx.writeFile({ fileName: filename });
}
