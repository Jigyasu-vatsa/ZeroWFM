import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  X,
  ExternalLink,
  Copy,
  Check,
  Quote,
  Download,
} from 'lucide-react';

export const ResearchPaperModal: React.FC = () => {
  const { paperModalOpen, setPaperModalOpen, setProofModalOpen } = useApp();
  const [citationFormat, setCitationFormat] = useState<'ieee' | 'apa' | 'bibtex' | 'mla'>('ieee');
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!paperModalOpen) return null;

  const GOOGLE_DRIVE_PAPER_URL = "https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view";

  const citations: Record<string, string> = {
    ieee: `L. Gre and J. Vatsa, "Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution," in Proc. Int. Conf. on Green Technology and Interdisciplinary Sustainable Development (GTISD-2026), Sandip University, Madhubani, Apr. 2026, pp. 1-8. ISBN: 978-81-685333-9.`,
    apa: `Gre, L., & Vatsa, J. (2026). Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution. Proceedings of the International Conference on Green Technology and Interdisciplinary Sustainable Development (GTISD-2026), 1–8. ISBN: 978-81-685333-9.`,
    bibtex: `@inproceedings{vatsa2026zerowaste,
  author    = {Gre, Lushi and Vatsa, Jigyasu},
  title     = {Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution},
  booktitle = {Proceedings of the International Conference on Green Technology and Interdisciplinary Sustainable Development (GTISD-2026)},
  year      = {2026},
  isbn      = {978-81-685333-9},
  address   = {Sandip University, Madhubani, Bihar, India},
  url       = {https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view}
}`,
    mla: `Gre, Lushi, and Jigyasu Vatsa. "Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution." Proceedings of the International Conference on GTISD-2026, Sandip University, 2026, pp. 1-8.`,
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citations[citationFormat]);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  Academic Research Overview
                </span>
                <span className="text-xs text-slate-400 font-mono">ISBN: 978-81-685333-9</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Research Paper & Empirical Validation
              </h2>
            </div>
          </div>
          <button
            onClick={() => setPaperModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* Title & Authors */}
          <div className="text-center space-y-2 border-b border-slate-800 pb-4">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution
            </h1>
            <div className="text-xs text-emerald-400 font-semibold">
              LUSHI GRE¹ & MR. JIGYASU VATSA²
            </div>
            <div className="text-xs text-slate-400 space-y-0.5">
              <div>¹ B.Tech CSE, Sandip University, Madhubani</div>
              <div>² Teaching Assistant, SOCSE, Sandip University & Founder, JIGSY INDIA</div>
              <div className="text-amber-400 font-mono text-[11px] pt-1">
                Paper presented at International Conference on GTISD-2026 (April 10–11, 2026)
              </div>
            </div>

            {/* Google Drive Link Button */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href={GOOGLE_DRIVE_PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Open Full Manuscript (Google Drive)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view
              </span>
            </div>
          </div>

          {/* Abstract */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Abstract
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              Food waste and food insecurity remain interconnected challenges in developing economies such as India. Large volumes of edible food are discarded daily, while vulnerable populations face nutrition deficiencies. This paper presents Zero Waste Food Management, a web-based platform designed using circular economy principles to transform surplus food into a reusable societal resource. The system integrates food providers, receivers, community volunteers, and administrators into an auditable digital ecosystem. A standardized 5-point quality verification protocol ensures food safety prior to last-mile delivery, validating practical redistribution feasibility in semi-urban contexts.
            </p>
          </div>

          {/* Cite This Paper Interactive Section */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Quote className="w-4 h-4 text-emerald-400" />
                Cite This Paper
              </h3>

              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {(['ieee', 'apa', 'bibtex', 'mla'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setCitationFormat(fmt)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                      citationFormat === fmt
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap select-all leading-relaxed">
              {citations[citationFormat]}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-mono">
                Click to copy citation formatted in {citationFormat.toUpperCase()}
              </span>
              <button
                onClick={handleCopyCitation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer text-xs"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Verified Empirical Baseline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Verified Empirical Baseline Metrics
              </h3>
              <button
                onClick={() => {
                  setPaperModalOpen(false);
                  setProofModalOpen(true);
                }}
                className="text-xs text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
              >
                Show Institutional Proof & Records →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] text-slate-400">Meals Served</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">500</div>
                <div className="text-[9px] text-slate-500">Documented portions</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] text-slate-400">CO₂e Avoided</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">535 kg</div>
                <div className="text-[9px] text-slate-500">2.5 kg CO₂e / kg food</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] text-slate-400">Water Conserved</div>
                <div className="text-base font-bold text-blue-400 font-mono mt-0.5">224.7k L</div>
                <div className="text-[9px] text-slate-500">1,050 L / kg food</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] text-slate-400">Diversion Rate</div>
                <div className="text-base font-bold text-amber-300 font-mono mt-0.5">100%</div>
                <div className="text-[9px] text-slate-500">Zero landfill disposal</div>
              </div>
            </div>
          </div>

          {/* Core System Working */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verifiable Operational Flow
            </h4>
            <div className="space-y-1.5 text-slate-400">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>1. Provider Upload:</strong> Hostels and banquet caterers register batch details including safe expiry window and storage temperature.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>2. Receiver Claim:</strong> Registered shelters and orphanages claim available surplus within their practical reach.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>3. In-Person Quality Inspection:</strong> Assigned volunteer inspects sensory condition, aroma, container packaging, and safe temperature threshold (&gt;60°C or &lt;5°C).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>4. Handover Sign-off:</strong> Recipient confirms delivery with digital acknowledgment, updating the closed-loop circular metrics ledger.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400">
            Sandip University, SOCSE • Supported by JIGSY INDIA
          </div>
          <button
            onClick={() => setPaperModalOpen(false)}
            className="px-5 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
