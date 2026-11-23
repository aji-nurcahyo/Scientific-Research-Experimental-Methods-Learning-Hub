import pptxgen from 'pptxgenjs';
import fs from 'fs';

async function generateSamplePPTX() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';

  const COLOR_PRIMARY = '0F3D59';
  const COLOR_SECONDARY = 'C59B27';
  const COLOR_TEXT_DARK = '1E293B';
  const COLOR_BG_LIGHT = 'F8FAFC';
  const COLOR_BORDER = 'CBD5E1';

  // Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: COLOR_PRIMARY };

  titleSlide.addText('INSTITUT TEKNOLOGI SUMATERA', {
    x: 0.8, y: 1.0, w: 8.4, h: 0.4,
    fontSize: 13, color: COLOR_SECONDARY, bold: true, fontFace: 'Arial'
  });

  titleSlide.addText('Scientific Research & Experimental Methods Learning Hub', {
    x: 0.8, y: 1.5, w: 8.4, h: 0.5,
    fontSize: 15, color: '94A3B8', fontFace: 'Arial'
  });

  titleSlide.addText('CH-01: Epistemology, Scientific Reasoning & Demarcation', {
    x: 0.8, y: 2.2, w: 8.4, h: 1.6,
    fontSize: 26, color: 'FFFFFF', bold: true, fontFace: 'Georgia', breakLine: true
  });

  titleSlide.addText('Slide Deck Perkuliahan Lengkap • Verified PPTX Presentation', {
    x: 0.8, y: 4.8, w: 8.4, h: 0.4,
    fontSize: 11, color: COLOR_SECONDARY, fontFace: 'Arial'
  });

  // Sample Content Slide
  const slide2 = pptx.addSlide();
  slide2.background = { color: 'FFFFFF' };

  slide2.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.9,
    fill: { color: COLOR_PRIMARY }, line: { color: COLOR_PRIMARY }
  });

  slide2.addText('CH-01 • Slide 1 of 36', {
    x: 0.6, y: 0.15, w: 8.8, h: 0.25,
    fontSize: 10, color: COLOR_SECONDARY, bold: true, fontFace: 'Arial'
  });

  slide2.addText('Tiga Pilar Penalaran Ilmiah dalam Rekayasa', {
    x: 0.6, y: 0.4, w: 8.8, h: 0.4,
    fontSize: 16, color: 'FFFFFF', bold: true, fontFace: 'Georgia'
  });

  slide2.addText([
    { text: 'Deduksi: Menurunkan konsekuensi pasti dari prinsip universal dan hukum fisis.', options: { fontSize: 13, color: COLOR_TEXT_DARK, bullet: true, paraSpaceAfter: 10 } },
    { text: 'Induksi: Menggeneralisasikan pola dari serangkaian observasi empiris terbatas.', options: { fontSize: 13, color: COLOR_TEXT_DARK, bullet: true, paraSpaceAfter: 10 } },
    { text: 'Abduksi: Inferensi menuju hipotesis penjelasan terbaik atas anomali terobservasi.', options: { fontSize: 13, color: COLOR_TEXT_DARK, bullet: true, paraSpaceAfter: 10 } }
  ], {
    x: 0.6, y: 1.3, w: 5.8, h: 3.8, valign: 'top'
  });

  slide2.addShape(pptx.ShapeType.rect, {
    x: 6.6, y: 1.3, w: 2.8, h: 3.6,
    fill: { color: COLOR_BG_LIGHT }, line: { color: COLOR_BORDER, width: 1 }
  });

  slide2.addText('Alur Inferensi Ilmiah:', {
    x: 6.8, y: 1.5, w: 2.4, h: 0.3,
    fontSize: 10, color: COLOR_PRIMARY, bold: true, fontFace: 'Arial'
  });

  slide2.addText('Abduksi (Hipotesis)\n    |\n    v\nDeduksi (Prediksi)\n    |\n    v\nInduksi (Validasi)', {
    x: 6.8, y: 2.0, w: 2.4, h: 2.6,
    fontSize: 11, color: '0F172A', fontFace: 'Courier New', align: 'center', valign: 'middle'
  });

  const outPath = 'reports/CH-01_Presentation_Deck.pptx';
  await pptx.writeFile({ fileName: outPath });
  console.log(`Generated sample PPTX successfully: ${outPath} (${fs.statSync(outPath).size} bytes)`);
}

generateSamplePPTX();
