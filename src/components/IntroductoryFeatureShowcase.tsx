import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  GitPullRequest,
  HeartHandshake,
  ShieldCheck,
  Utensils,
  Bike,
  Building2,
  Code2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Layers,
  ChevronRight,
  Share2,
} from 'lucide-react';

export const IntroductoryFeatureShowcase: React.FC = () => {
  const { setRole, setDemoModalOpen, setPaperModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'contribute' | 'developers'>('overview');
  const [showContributeModal, setShowContributeModal] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between h-full space-y-4">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
              Engineering Architecture
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              M.Tech Research & Dev
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Showcase
            </button>
            <button
              onClick={() => setActiveTab('contribute')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'contribute'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              How to Contribute
            </button>
            <button
              onClick={() => setActiveTab('developers')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'developers'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tech Stack
            </button>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Smart Food Redistribution & Circular Economy
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Engineered to eliminate edible food waste at the source and solve last-mile delivery across semi-urban ecosystems through a decentralized community network.
        </p>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-3.5 my-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Utensils className="w-3.5 h-3.5" />
                <span>Provider Inflow</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Hostel messes, banquet halls & caterers broadcast surplus with temperature & expiry window.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                <Building2 className="w-3.5 h-3.5" />
                <span>Receiver Allocation</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                NGOs, orphanages & shelters claim fresh meals within practical transit radius.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <Bike className="w-3.5 h-3.5" />
                <span>Volunteer Fleet</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Decentralized volunteers on EVs & bikes conduct 5-point quality check & deliver.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audit & Impact</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Quantifies avoided methane CO₂e, virtual water saved, and complete chain of custody.
              </p>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-emerald-950/40 via-slate-950/60 to-slate-950 border border-emerald-900/40 rounded-xl text-xs flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white">Academic Validation & Paper</div>
              <div className="text-[11px] text-slate-400">
                Presented by developers at the International Conference GTISD-2026.
              </div>
            </div>
            <button
              onClick={() => setPaperModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold shrink-0 cursor-pointer"
            >
              View Paper
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: How Someone Can Contribute */}
      {activeTab === 'contribute' && (
        <div className="space-y-2.5 my-auto text-xs">
          <div className="text-[11px] text-slate-400">
            Select your role to participate in the local circular economy:
          </div>

          <div className="space-y-2">
            {/* Action 1 */}
            <div
              onClick={() => setRole('provider')}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">1. As a Food Provider</div>
                  <div className="text-[11px] text-slate-400">
                    Register edible kitchen surplus before it becomes landfill waste.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            {/* Action 2 */}
            <div
              onClick={() => setRole('volunteer')}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <Bike className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">2. As a Community Volunteer</div>
                  <div className="text-[11px] text-slate-400">
                    Use your two-wheeler or bicycle to bridge last-mile delivery and safety inspect food.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            {/* Action 3 */}
            <div
              onClick={() => setRole('receiver')}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">3. As an NGO or Shelter</div>
                  <div className="text-[11px] text-slate-400">
                    Claim nutritious meals for children and senior residents.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Developers & Technical Architecture */}
      {activeTab === 'developers' && (
        <div className="space-y-3 my-auto text-xs">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Framework:</span>
              <span className="text-emerald-400 font-bold">React 19 + TypeScript + Tailwind CSS</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Hosting Target:</span>
              <span className="text-blue-400 font-bold">GitHub Pages Free Static SPA</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">State Persistence:</span>
              <span className="text-amber-400 font-bold">Local-First Storage Engine</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Math Formulation:</span>
              <span className="text-purple-400 font-bold">UNEP/FAO CO₂e Emission Factors</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed">
            Interested in adapting this platform for your district or university campus? You can clone the repository, customize the coordinate bounds in <code className="text-emerald-400">initialData.ts</code>, and deploy to your own GitHub Pages for free.
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
        <button
          onClick={() => setDemoModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Launch Interactive Demo Flow</span>
        </button>

        <a
          href="https://jigyasu.jigsy.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          title="About Lead Developer Mr. Jigyasu Vatsa"
        >
          <span>About Developer</span>
          <ExternalLink className="w-3 h-3 text-rose-400" />
        </a>
      </div>
    </div>
  );
};
