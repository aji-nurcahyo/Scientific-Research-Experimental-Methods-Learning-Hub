import React, { useState } from 'react';
import { RESEARCH_TEMPLATES } from '../data/templatesData';
import { ResearchTemplate } from '../types/curriculum';
import { FileText, Copy, CheckCircle2, AlertTriangle, BookMarked, Download } from 'lucide-react';

export const TemplatesView: React.FC = () => {
  const [selectedCycle, setSelectedCycle] = useState<'all' | 'planning' | 'design-data' | 'analysis-evaluation' | 'reporting-publication'>('all');
  const [activeTemplate, setActiveTemplate] = useState<ResearchTemplate>(RESEARCH_TEMPLATES[0]);
  const [copied, setCopied] = useState(false);

  const filteredTemplates = selectedCycle === 'all'
    ? RESEARCH_TEMPLATES
    : RESEARCH_TEMPLATES.filter((t) => t.cycle === selectedCycle);

  const generateMarkdown = () => {
    let md = `# ${activeTemplate.id}: ${activeTemplate.title}\n\n`;
    md += `> **Tujuan:** ${activeTemplate.purpose}\n`;
    md += `> **Target Pengguna:** ${activeTemplate.targetUser}\n`;
    md += `> **Kapan Digunakan:** ${activeTemplate.whenUsed}\n\n`;
    md += `## 1. Panduan Pengisian\n`;
    activeTemplate.instructions.forEach((ins, i) => {
      md += `${i + 1}. ${ins}\n`;
    });
    md += `\n## 2. Struktur Isian Terstandarisasi\n`;
    activeTemplate.structureFields.forEach((field) => {
      md += `### ${field.fieldName} ${field.required ? '[WAJIB]' : '[OPSIONAL]'}\n`;
      md += `*Deskripsi:* ${field.description}\n\n[Tuliskan konten data di sini]\n\n`;
    });
    md += `## 3. Contoh Kasus Nyata Bidang Rekayasa\n`;
    md += `${activeTemplate.realisticExample}\n\n`;
    md += `## 4. Kesalahan Umum yang Wajib Dihindari\n`;
    activeTemplate.commonMistakes.forEach((m) => {
      md += `- ${m}\n`;
    });
    md += `\n## 5. Referensi Metodologis\n`;
    md += `${activeTemplate.methodologicalReference}\n`;
    return md;
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeTemplate.id.toLowerCase()}_${activeTemplate.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f3d59', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
          <FileText size={18} />
          Standardized Research Templates
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          16 Instrumen &amp; Template Riset Terstandarisasi
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>
          Template baku yang memandu pelaksanaan riset mulai dari inisiasi proposal, protokol kalibrasi sensor, pencatatan logbook forensik, evaluasi benchmark, hingga tanggapan ulasan reviewer.
        </p>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Semua Template (16)' },
            { id: 'planning', label: '1. Research Planning' },
            { id: 'design-data', label: '2. Design & Protocols' },
            { id: 'analysis-evaluation', label: '3. Analysis & Evaluation' },
            { id: 'reporting-publication', label: '4. Publication & Peer Review' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`btn ${selectedCycle === tab.id ? 'btn-primary' : ''}`}
              onClick={() => setSelectedCycle(tab.id as any)}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Grid: Templates List on Left, Active Template Preview on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(380px, 1.8fr)', gap: '1.5rem' }}>
        {/* Template List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filteredTemplates.map((tmpl) => {
            const isSelected = activeTemplate.id === tmpl.id;

            return (
              <div
                key={tmpl.id}
                onClick={() => setActiveTemplate(tmpl)}
                style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: isSelected ? '#e8f0f6' : '#ffffff',
                  border: `1px solid ${isSelected ? '#0f3d59' : '#e5e7eb'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${isSelected ? '#0f3d59' : '#cbd5e1'}`,
                  transition: 'background-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#0f3d59' }}>
                    {tmpl.id}
                  </span>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#6b7280' }}>
                    {tmpl.cycle.replace('-', ' ')}
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0f172a' }}>
                  {tmpl.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Template Detail & Preview */}
        <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ backgroundColor: '#0f3d59', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 700 }}>
              {activeTemplate.id}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-primary"
                onClick={handleCopyMarkdown}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                {copied ? 'Format Tersalin!' : 'Salin Format'}
              </button>
              <button
                className="btn"
                onClick={handleDownloadMarkdown}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                title="Unduh file template Markdown ke komputer"
              >
                <Download size={14} />
                Unduh (.md)
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: '1.45rem', margin: '0.4rem 0 1rem', border: 'none', padding: 0 }}>
            {activeTemplate.title}
          </h2>

          <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            <strong>Tujuan Instrumen:</strong> {activeTemplate.purpose}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
              <strong>Target Pengguna:</strong>
              <div style={{ color: '#4b5563', marginTop: '0.2rem' }}>{activeTemplate.targetUser}</div>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
              <strong>Kapan Digunakan:</strong>
              <div style={{ color: '#4b5563', marginTop: '0.2rem' }}>{activeTemplate.whenUsed}</div>
            </div>
          </div>

          {/* Structure Fields */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f3d59', marginBottom: '0.5rem' }}>
              Struktur Isian Standar:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {activeTemplate.structureFields.map((field, idx) => (
                <div key={idx} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#fdfdfd', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#111827' }}>
                    <span>{field.fieldName}</span>
                    {field.required && (
                      <span style={{ color: '#dc2626', fontSize: '0.72rem', fontWeight: 700 }}>[WAJIB]</span>
                    )}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                    {field.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Realistic Example */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1f2937', marginBottom: '0.4rem' }}>
              Contoh Kasus Nyata Bidang Rekayasa:
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.86rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.6 }}>
              {activeTemplate.realisticExample}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="academic-callout warning" style={{ margin: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#b45309', fontSize: '0.86rem', marginBottom: '0.3rem' }}>
              <AlertTriangle size={15} /> Kesalahan Umum yang Wajib Dihindari:
            </div>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.84rem', color: '#78350f', lineHeight: 1.6 }}>
              {activeTemplate.commonMistakes.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          {/* Methodological Reference */}
          <div style={{ fontSize: '0.82rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <BookMarked size={14} color="#0f3d59" />
            <strong>Referensi Metodologis:</strong> {activeTemplate.methodologicalReference}
          </div>
        </div>
      </div>
    </div>
  );
};

