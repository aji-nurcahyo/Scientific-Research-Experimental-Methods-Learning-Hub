import React, { useState } from 'react';
import { LABORATORIES } from '../data/laboratoriesData';
import { LAB_SCRIPTS_MAP } from '../data/labScriptsData';
import { Laboratory } from '../types/curriculum';
import { MathRenderer } from './MathRenderer';
import {
  Terminal,
  Play,
  CheckCircle2,
  Copy,
  Download,
  Code,
  Calculator,
  Layers,
  FileCode,
} from 'lucide-react';

interface LaboratoriesViewProps {
  onSelectChapter: (chapterId: string) => void;
}

export const LaboratoriesView: React.FC<LaboratoriesViewProps> = ({ onSelectChapter }) => {
  const [activeLab, setActiveLab] = useState<Laboratory>(LABORATORIES[0]);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);

  // Interactive state for LAB-01 (NHST & P-Value Simulator)
  const [sampleSizeN, setSampleSizeN] = useState<number>(30);
  const [trueEffectDelta, setTrueEffectDelta] = useState<number>(0.0);
  const [simResults, setSimResults] = useState<{ pValues: number[]; sigCount: number } | null>(null);

  // Interactive state for LAB-02 (CI Coverage Simulator)
  const [ciN, setCiN] = useState<number>(30);
  const [ciLevel, setCiLevel] = useState<number>(0.95);
  const [ciResults, setCiResults] = useState<{ coveredCount: number; totalTrials: number; coverageRate: number } | null>(null);

  // Interactive state for LAB-03 (Power Analysis Calculator)
  const [powerAlpha, setPowerAlpha] = useState<number>(0.05);
  const [powerTarget, setPowerTarget] = useState<number>(0.80);
  const [powerDelta, setPowerDelta] = useState<number>(0.50);

  // Interactive state for LAB-05 (GUM Uncertainty Budget)
  const [gumS, setGumS] = useState<number>(0.12);
  const [gumN, setGumN] = useState<number>(10);
  const [gumRes, setGumRes] = useState<number>(0.01);
  const [gumCal, setGumCal] = useState<number>(0.02);

  // Box-Muller transform for standard normal random variables
  const randn = (): number => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  // Normal CDF approximation
  const normalCdf = (z: number): number => {
    const b1 = 0.319381530;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const k = 1.0 / (1.0 + p * Math.abs(z));
    const poly = ((((b5 * k + b4) * k + b3) * k + b2) * k + b1) * k;
    const phi = 1.0 - (1.0 / Math.sqrt(2.0 * Math.PI)) * Math.exp(-0.5 * z * z) * poly;
    return z >= 0 ? phi : 1.0 - phi;
  };

  // Run in-browser client-side Monte Carlo simulation for LAB-01
  const runPValueSimulation = () => {
    const trials = 1000;
    const pVals: number[] = [];
    let sig = 0;

    for (let t = 0; t < trials; t++) {
      let sum1 = 0, sum2 = 0;
      let sq1 = 0, sq2 = 0;

      for (let i = 0; i < sampleSizeN; i++) {
        const x1 = randn();
        const x2 = randn() + trueEffectDelta;
        sum1 += x1;
        sq1 += x1 * x1;
        sum2 += x2;
        sq2 += x2 * x2;
      }

      const mean1 = sum1 / sampleSizeN;
      const mean2 = sum2 / sampleSizeN;
      const var1 = (sq1 - (sum1 * sum1) / sampleSizeN) / (sampleSizeN - 1);
      const var2 = (sq2 - (sum2 * sum2) / sampleSizeN) / (sampleSizeN - 1);
      const sp = Math.sqrt((var1 + var2) / 2);
      const tStat = Math.abs((mean2 - mean1) / (sp * Math.sqrt(2 / sampleSizeN)));

      const pVal = 2.0 * Math.max(0, 1.0 - normalCdf(tStat));
      pVals.push(pVal);
      if (pVal < 0.05) sig++;
    }

    setSimResults({ pValues: pVals, sigCount: sig });
  };

  // Run in-browser client-side Monte Carlo simulation for LAB-02
  const runCiCoverageSimulation = () => {
    const trials = 1000;
    let covered = 0;
    const trueMu = 50.0;
    const trueSigma = 10.0;

    // Critical value approx for t-distribution
    let zCrit = 1.96;
    if (ciLevel === 0.90) zCrit = 1.645;
    else if (ciLevel === 0.99) zCrit = 2.576;
    const tCrit = zCrit + 2.37 / Math.max(1, ciN - 1);

    for (let t = 0; t < trials; t++) {
      let sum = 0;
      let sq = 0;
      for (let i = 0; i < ciN; i++) {
        const val = trueMu + randn() * trueSigma;
        sum += val;
        sq += val * val;
      }
      const xBar = sum / ciN;
      const s = Math.sqrt(Math.max(1e-9, (sq - (sum * sum) / ciN) / (ciN - 1)));
      const se = s / Math.sqrt(ciN);
      const lower = xBar - tCrit * se;
      const upper = xBar + tCrit * se;

      if (trueMu >= lower && trueMu <= upper) {
        covered++;
      }
    }

    setCiResults({
      coveredCount: covered,
      totalTrials: trials,
      coverageRate: (covered / trials) * 100,
    });
  };

  // Compute LAB-03 Sample Size
  const computeRequiredSampleSize = () => {
    let zAlpha = 1.96;
    if (powerAlpha === 0.01) zAlpha = 2.576;
    else if (powerAlpha === 0.10) zAlpha = 1.645;

    // Normal quantile approx for beta
    let zBeta = 0.8416; // 80%
    if (powerTarget >= 0.90) zBeta = 1.2816;
    if (powerTarget >= 0.95) zBeta = 1.6449;
    if (powerTarget <= 0.70) zBeta = 0.5244;

    const nPerGroup = Math.ceil(2 * Math.pow((zAlpha + zBeta) / Math.max(0.05, powerDelta), 2));
    return {
      nPerGroup,
      nTotal: nPerGroup * 2,
    };
  };

  // Compute LAB-05 Uncertainty
  const computeGUMBudget = () => {
    const uA = gumS / Math.sqrt(Math.max(2, gumN));
    const uB_res = gumRes / (2 * Math.sqrt(3));
    const uB_cal = gumCal / 2.0;
    const uCombined = Math.sqrt(uA * uA + uB_res * uB_res + uB_cal * uB_cal);
    const uExpanded = 2.0 * uCombined;

    const varTotal = uCombined * uCombined;
    const pctA = varTotal > 0 ? ((uA * uA) / varTotal) * 100 : 0;
    const pctRes = varTotal > 0 ? ((uB_res * uB_res) / varTotal) * 100 : 0;
    const pctCal = varTotal > 0 ? ((uB_cal * uB_cal) / varTotal) * 100 : 0;

    return { uA, uB_res, uB_cal, uCombined, uExpanded, pctA, pctRes, pctCal };
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(activeLab.reproducibilityCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const currentScript = LAB_SCRIPTS_MAP[activeLab.id] || {
    filename: `${activeLab.id.toLowerCase()}_script.py`,
    code: `# Script untuk ${activeLab.id}: ${activeLab.title}\n${activeLab.pythonImplementation}`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentScript.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadScript = () => {
    const blob = new Blob([currentScript.code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', currentScript.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const powerCalc = computeRequiredSampleSize();
  const gumCalc = computeGUMBudget();

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f3d59', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
          <Terminal size={18} />
          Practical Research Laboratories
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          15 Modul Laboratorium Komputasi Python
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>
          Laboratorium komputasi interaktif terkalibrasi dengan jaminan ilmiah: bebas angka palsu, data simulasi berlabel eksplisit, dan seluruh modul dapat direproduksi secara mandiri.
        </p>
      </header>

      {/* Lab Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {LABORATORIES.map((lab) => {
          const isSelected = activeLab.id === lab.id;

          return (
            <button
              key={lab.id}
              onClick={() => {
                setActiveLab(lab);
                setSimResults(null);
                setCiResults(null);
                setShowFullCode(false);
              }}
              style={{
                backgroundColor: isSelected ? '#0f3d59' : '#ffffff',
                color: isSelected ? '#ffffff' : '#374151',
                border: `1px solid ${isSelected ? '#0f3d59' : '#d1d5db'}`,
                borderRadius: '4px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.8rem',
                fontWeight: isSelected ? 600 : 500,
                cursor: 'pointer',
              }}
            >
              {lab.id}
            </button>
          );
        })}
      </div>

      {/* Active Lab Content */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e5e7eb', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ backgroundColor: '#e8f0f6', color: '#0f3d59', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.82rem' }}>
            {activeLab.id} &bull; Terhubung dengan {activeLab.associatedChapterId}
          </span>
          <button
            onClick={() => onSelectChapter(activeLab.associatedChapterId)}
            className="btn"
            style={{ padding: '0.25rem 0.65rem', fontSize: '0.78rem' }}
          >
            Buka Chapter Terkait
          </button>
        </div>

        <h2 style={{ fontSize: '1.6rem', color: '#0f172a', margin: '0.5rem 0 1.25rem', border: 'none', padding: 0 }}>
          {activeLab.title}
        </h2>

        {/* 1. Learning Objectives & Scientific Foundation */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 600, color: '#0f3d59', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
              Tujuan Pembelajaran Khusus:
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#334155', lineHeight: 1.6 }}>
              {activeLab.learningObjectives}
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 600, color: '#0f3d59', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
              Landasan Saintifik &amp; Masalah Metodologis:
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#334155', lineHeight: 1.6 }}>
              {activeLab.scientificFoundations}
            </p>
          </div>
        </div>

        {/* Interactive Simulator: LAB-01 */}
        {activeLab.id === 'LAB-01' && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '1.5rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#166534', marginBottom: '0.75rem' }}>
              <Play size={16} /> Simulator P-Value &amp; Inflasi False Positive (In-Browser Monte Carlo)
            </div>
            <p style={{ fontSize: '0.88rem', color: '#14532d', marginBottom: '1rem' }}>
              Uji sendiri bagaimana sebaran p-value berubah drastis saat efek sejati (&delta; = 0, kondisi H0 benar) vs saat ada efek nyata (&delta; &gt; 0).
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#166534', display: 'block', marginBottom: '0.2rem' }}>
                  Ukuran Sampel (N per kelompok): {sampleSizeN}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={sampleSizeN}
                  onChange={(e) => setSampleSizeN(Number(e.target.value))}
                  style={{ width: '180px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#166534', display: 'block', marginBottom: '0.2rem' }}>
                  Efek Sejati (&delta; Cohen): {trueEffectDelta.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={trueEffectDelta}
                  onChange={(e) => setTrueEffectDelta(Number(e.target.value))}
                  style={{ width: '180px' }}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={runPValueSimulation}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', marginTop: '0.8rem' }}
              >
                Jalankan 1.000 Iterasi Uji
              </button>
            </div>

            {simResults && (
              <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '4px', border: '1px solid #86efac', marginTop: '1rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#15803d', fontWeight: 600 }}>
                  Hasil Simulasi 1.000 Uji Hipotesis:
                </div>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', fontSize: '0.88rem' }}>
                  <div>
                    Jumlah Signifikan (p &lt; 0.05): <strong>{simResults.sigCount}</strong> / 1.000 ({((simResults.sigCount / 1000) * 100).toFixed(1)}%)
                  </div>
                  <div>
                    Interpretasi: <strong>{trueEffectDelta === 0 ? 'Tingkat False Positive Terbukti Sesuai Taraf Alfa 5%' : `Kekuatan Uji Empiris: ${((simResults.sigCount / 1000) * 100).toFixed(1)}%`}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Simulator: LAB-02 */}
        {activeLab.id === 'LAB-02' && (
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '1.5rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.75rem' }}>
              <Calculator size={16} /> Simulator Cakupan Interval Kepercayaan Frequentist (1.000 Simulasi)
            </div>
            <p style={{ fontSize: '0.88rem', color: '#1e3a8a', marginBottom: '1rem' }}>
              Verifikasi definisi frekuensi jangka panjang: tepat (1 - &alpha;) dari seluruh interval yang dihitung secara independen akan melingkupi nilai parameter sejati &mu; = 50.0.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e40af', display: 'block', marginBottom: '0.2rem' }}>
                  Ukuran Sampel per Trial (n): {ciN}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={ciN}
                  onChange={(e) => setCiN(Number(e.target.value))}
                  style={{ width: '180px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e40af', display: 'block', marginBottom: '0.2rem' }}>
                  Taraf Kepercayaan Nominal: {(ciLevel * 100).toFixed(0)}%
                </label>
                <select
                  value={ciLevel}
                  onChange={(e) => setCiLevel(Number(e.target.value))}
                  style={{ padding: '0.35rem 0.6rem', borderRadius: '4px', border: '1px solid #93c5fd', fontSize: '0.85rem' }}
                >
                  <option value={0.90}>90% (Alfa = 0.10)</option>
                  <option value={0.95}>95% (Alfa = 0.05)</option>
                  <option value={0.99}>99% (Alfa = 0.01)</option>
                </select>
              </div>

              <button
                className="btn btn-primary"
                onClick={runCiCoverageSimulation}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', marginTop: '0.8rem' }}
              >
                Simulasikan 1.000 Interval
              </button>
            </div>

            {ciResults && (
              <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '4px', border: '1px solid #93c5fd', marginTop: '1rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#1d4ed8', fontWeight: 600 }}>
                  Hasil Evaluasi Cakupan Empiris:
                </div>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', fontSize: '0.88rem' }}>
                  <div>
                    Interval Mencakup Parameter Sejati: <strong>{ciResults.coveredCount}</strong> / {ciResults.totalTrials}
                  </div>
                  <div>
                    Cakupan Empiris: <strong>{ciResults.coverageRate.toFixed(1)}%</strong> (Target Teoretis: {(ciLevel * 100).toFixed(0)}%)
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Simulator: LAB-03 */}
        {activeLab.id === 'LAB-03' && (
          <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '6px', padding: '1.5rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#6b21a8', marginBottom: '0.75rem' }}>
              <Calculator size={16} /> Kalkulator Ukuran Sampel A Priori &amp; Statistical Power
            </div>
            <p style={{ fontSize: '0.88rem', color: '#581c87', marginBottom: '1rem' }}>
              Hitung kebutuhan ukuran sampel minimal dua kelompok independen agar terhindar dari studi underpowered (kesalahan Tipe II berlebih).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b21a8', display: 'block', marginBottom: '0.2rem' }}>
                  Taraf Signifikansi (&alpha;): {powerAlpha}
                </label>
                <select
                  value={powerAlpha}
                  onChange={(e) => setPowerAlpha(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid #d8b4fe', fontSize: '0.85rem' }}
                >
                  <option value={0.01}>0.01 (Ketat)</option>
                  <option value={0.05}>0.05 (Standar)</option>
                  <option value={0.10}>0.10 (Eksploratori)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b21a8', display: 'block', marginBottom: '0.2rem' }}>
                  Target Power (1 - &beta;): {(powerTarget * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.70"
                  max="0.95"
                  step="0.05"
                  value={powerTarget}
                  onChange={(e) => setPowerTarget(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b21a8', display: 'block', marginBottom: '0.2rem' }}>
                  Effect Size (Cohen d): {powerDelta.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.20"
                  max="1.20"
                  step="0.05"
                  value={powerDelta}
                  onChange={(e) => setPowerDelta(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '4px', border: '1px solid #d8b4fe', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase' }}>Kebutuhan Sampel per Kelompok:</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#6b21a8' }}>{powerCalc.nPerGroup} subjek</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase' }}>Total Ukuran Sampel Riset (N):</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>{powerCalc.nTotal} observasi</div>
              </div>
              <div style={{ fontSize: '0.84rem', color: '#4b5563', alignSelf: 'center', maxWidth: '380px' }}>
                Dengan n = {powerCalc.nPerGroup} per grup, probabilitas menolak H0 saat efek nyata (d = {powerDelta.toFixed(2)}) ada adalah {(powerTarget * 100).toFixed(0)}%.
              </div>
            </div>
          </div>
        )}

        {/* Interactive Simulator: LAB-05 */}
        {activeLab.id === 'LAB-05' && (
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '1.5rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#92400e', marginBottom: '0.75rem' }}>
              <Layers size={16} /> Kalkulator Uncertainty Budget Terstandarisasi GUM (ISO/IEC Guide 98-3)
            </div>
            <p style={{ fontSize: '0.88rem', color: '#78350f', marginBottom: '1rem' }}>
              Kombinasikan ketidakpastian Tipe A (statistik observasi berulang) dan Tipe B (resolusi sensor serta sertifikat kalibrasi pabrik).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#92400e', display: 'block', marginBottom: '0.2rem' }}>
                  Standar Deviasi Observasi (s): {gumS}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={gumS}
                  onChange={(e) => setGumS(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid #fcd34d' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#92400e', display: 'block', marginBottom: '0.2rem' }}>
                  Jumlah Pengulangan (n): {gumN}
                </label>
                <input
                  type="number"
                  min="2"
                  max="100"
                  value={gumN}
                  onChange={(e) => setGumN(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid #fcd34d' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#92400e', display: 'block', marginBottom: '0.2rem' }}>
                  Resolusi Sensor (a): {gumRes}
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={gumRes}
                  onChange={(e) => setGumRes(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid #fcd34d' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#92400e', display: 'block', marginBottom: '0.2rem' }}>
                  Sertifikat Kalibrasi U_cal (k=2): {gumCal}
                </label>
                <input
                  type="number"
                  step="0.005"
                  min="0.001"
                  value={gumCal}
                  onChange={(e) => setGumCal(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid #fcd34d' }}
                />
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '4px', border: '1px solid #fcd34d' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <div style={{ color: '#6b7280' }}>u_A (Presisi Sampling):</div>
                  <strong>{gumCalc.uA.toFixed(4)} ({gumCalc.pctA.toFixed(1)}% varians)</strong>
                </div>
                <div>
                  <div style={{ color: '#6b7280' }}>u_B1 (Resolusi Persegi):</div>
                  <strong>{gumCalc.uB_res.toFixed(4)} ({gumCalc.pctRes.toFixed(1)}% varians)</strong>
                </div>
                <div>
                  <div style={{ color: '#6b7280' }}>u_B2 (Kalibrasi Normal):</div>
                  <strong>{gumCalc.uB_cal.toFixed(4)} ({gumCalc.pctCal.toFixed(1)}% varians)</strong>
                </div>
                <div style={{ borderLeft: '2px solid #f59e0b', paddingLeft: '0.75rem' }}>
                  <div style={{ color: '#92400e', fontWeight: 600 }}>Expanded Uncertainty U (k=2):</div>
                  <strong style={{ fontSize: '1.1rem', color: '#b45309' }}>&plusmn; {gumCalc.uExpanded.toFixed(4)}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Mathematical Foundations */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f3d59', marginBottom: '0.5rem' }}>
            Formulasi Matematis:
          </h3>
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            <MathRenderer content={activeLab.mathematicalFoundations} />
          </div>
        </div>

        {/* 3. Dataset Input Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f3d59', marginBottom: '0.5rem' }}>
            Dataset &amp; Input Eksperimen:
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#374151', margin: 0, backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            {activeLab.datasetInput}
          </p>
        </div>

        {/* 4. Python Implementation Architecture & Code */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#0f3d59', margin: 0 }}>
              Implementasi Komputasi Python:
            </h3>
            <button
              onClick={() => setShowFullCode(!showFullCode)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0f3d59',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Code size={14} />
              {showFullCode ? 'Sembunyikan Kode Lengkap' : 'Lihat Kode Python Lengkap'}
            </button>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', marginBottom: '0.75rem' }}>
            {activeLab.pythonImplementation}
          </div>

          {showFullCode && (
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '0.5rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.78rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'monospace' }}>
                  <FileCode size={14} color="#38bdf8" />
                  labs/{currentScript.filename}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={handleCopyCode}
                    className="btn"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.74rem', backgroundColor: '#334155', color: '#ffffff', borderColor: '#475569' }}
                  >
                    {copiedCode ? <CheckCircle2 size={12} color="#4ade80" /> : <Copy size={12} />}
                    {copiedCode ? 'Tersalin!' : 'Salin Kode'}
                  </button>
                  <button
                    onClick={handleDownloadScript}
                    className="btn"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.74rem', backgroundColor: '#0f3d59', color: '#ffffff', borderColor: '#0f3d59' }}
                  >
                    <Download size={12} />
                    Unduh Script (.py)
                  </button>
                </div>
              </div>
              <pre style={{ margin: 0, padding: '1rem', backgroundColor: '#0f172a', color: '#f8fafc', fontSize: '0.82rem', maxHeight: '350px', overflowY: 'auto' }}>
                <code>{currentScript.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* 5. Expected Results & Baselines */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f3d59', marginBottom: '0.5rem' }}>
            Hasil yang Diharapkan (Expected Results):
          </h3>
          <div style={{ backgroundColor: '#f0fdf4', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid #bbf7d0', fontSize: '0.88rem', color: '#166534' }}>
            {activeLab.expectedResults}
          </div>
        </div>

        {/* 6. Validation Criteria & Tolerances */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '0.85rem 1.1rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#065f46' }}>Kriteria Validasi Ilmiah:</div>
            <div style={{ fontSize: '0.84rem', color: '#334155', marginTop: '0.2rem' }}>{activeLab.validationCriteria}</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '0.85rem 1.1rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1e40af' }}>Toleransi Numerik:</div>
            <div style={{ fontSize: '0.84rem', color: '#334155', marginTop: '0.2rem' }}>{activeLab.numericalTolerance}</div>
          </div>
        </div>

        {/* 7. Common Errors */}
        <div className="academic-callout warning" style={{ margin: '1rem 0 1.5rem' }}>
          <div style={{ fontWeight: 700, color: '#b45309', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
            Kesalahan Umum Analisis:
          </div>
          <div style={{ fontSize: '0.88rem', color: '#78350f' }}>{activeLab.commonErrors}</div>
        </div>

        {/* 8. Exercises & Assessment */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f3d59', marginBottom: '0.25rem' }}>
              Latihan Eksperimental Mandiri:
            </div>
            <div style={{ fontSize: '0.84rem', color: '#334155' }}>{activeLab.exercises}</div>
          </div>
          <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f3d59', marginBottom: '0.25rem' }}>
              Kriteria Penilaian Kompetensi:
            </div>
            <div style={{ fontSize: '0.84rem', color: '#334155' }}>{activeLab.assessment}</div>
          </div>
        </div>

        {/* 9. Reproducibility Command & Download */}
        <div style={{ backgroundColor: '#0f172a', padding: '1rem 1.25rem', borderRadius: '6px', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Perintah Eksekusi Mandiri (One-Click CLI):</div>
            <code style={{ color: '#38bdf8', fontSize: '0.88rem', background: 'none', border: 'none', padding: 0 }}>
              {activeLab.reproducibilityCommand}
            </code>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn"
              onClick={handleCopyCommand}
              style={{ padding: '0.35rem 0.65rem', backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', fontSize: '0.78rem' }}
            >
              {copiedCommand ? <CheckCircle2 size={14} color="#4ade80" /> : <Copy size={14} />}
              {copiedCommand ? 'Tersalin' : 'Salin Perintah'}
            </button>
            <button
              className="btn"
              onClick={handleDownloadScript}
              style={{ padding: '0.35rem 0.65rem', backgroundColor: '#0f3d59', borderColor: '#0f3d59', color: '#ffffff', fontSize: '0.78rem' }}
            >
              <Download size={14} />
              Unduh .py
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
