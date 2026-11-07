import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { GeoMapVisualizer } from './GeoMapVisualizer';
import { IntroductoryFeatureShowcase } from './IntroductoryFeatureShowcase';
import {
  Utensils,
  Building2,
  Bike,
  ShieldCheck,
  Leaf,
  Droplet,
  HeartHandshake,
  TrendingUp,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award,
  CheckCircle2,
  Globe2,
  Cpu,
  Layers,
  Scale,
  Play,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export const HomePageView: React.FC = () => {
  const {
    navigateToRole,
    setPaperModalOpen,
    setProofModalOpen,
    setDemoModalOpen,
    metrics,
    simulateFullLifecycle,
    isSimulating,
  } = useApp();

  const roleCards: {
    id: UserRole;
    title: string;
    targetAudience: string;
    description: string;
    badge: string;
    features: string[];
    btnText: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    bgHover: string;
    accentBtn: string;
  }[] = [
    {
      id: 'provider',
      title: 'Food Provider',
      targetAudience: 'Hostel Messes, Banquets, Restaurants & Caterers',
      description:
        'Register fresh surplus food immediately after meal services before it turns into waste. Set safe expiry windows, thermal thresholds, and dietary classifications.',
      badge: 'Surplus Originator',
      features: [
        'Instant surplus meal batch logging',
        'Storage temperature & packaging verification',
        'Automated real-time volunteer dispatch request',
      ],
      btnText: 'Enter Provider Workspace',
      icon: <Utensils className="w-5 h-5" />,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30 hover:border-amber-500/70',
      bgHover: 'group-hover:bg-amber-500/10',
      accentBtn: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    {
      id: 'receiver',
      title: 'Food Receiver',
      targetAudience: 'NGOs, Orphanages, Shelters & Community Kitchens',
      description:
        'Claim nutritious, hot meals within your immediate district radius. Post active meal requirements and track incoming volunteer delivery vectors.',
      badge: 'Nutrition Beneficiary',
      features: [
        'Live surplus food availability feed',
        '1-Click reservation & intake matching',
        'Digital receipt & feedback sign-off',
      ],
      btnText: 'Enter Receiver Workspace',
      icon: <Building2 className="w-5 h-5" />,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30 hover:border-blue-500/70',
      bgHover: 'group-hover:bg-blue-500/10',
      accentBtn: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    {
      id: 'volunteer',
      title: 'Community Volunteer',
      targetAudience: 'Two-Wheeler, Bicycle & E-Rickshaw Dispatchers',
      description:
        'Bridge the last-mile delivery gap. Perform on-site 5-point FSSAI food quality and thermal checks before transporting hot food safely to shelters.',
      badge: 'Decentralized Logistics',
      features: [
        'Geo-matched dispatch assignments',
        'Mandatory 5-point food safety checklist',
        'GPS-guided route execution & verified handover',
      ],
      btnText: 'Enter Volunteer Workspace',
      icon: <Bike className="w-5 h-5" />,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/70',
      bgHover: 'group-hover:bg-emerald-500/10',
      accentBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    {
      id: 'admin',
      title: 'Administrator',
      targetAudience: 'Campus Supervisors, Regulatory & Sustainability Audits',
      description:
        'Inspect immutable circular audit logs, verify chain of custody, monitor environmental carbon metrics, and export institutional proof dossiers.',
      badge: 'Governance & Audit',
      features: [
        'Total CO₂e and water impact aggregation',
        'Immutable timestamped audit logs',
        'Exportable institutional verification dossiers',
      ],
      btnText: 'Enter Administrator Workspace',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30 hover:border-purple-500/70',
      bgHover: 'group-hover:bg-purple-500/10',
      accentBtn: 'bg-purple-600 hover:bg-purple-500 text-white',
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Circular Economy Framework
            </span>
            <span className="text-[11px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 px-3 py-1 rounded-full font-bold">
              M.Tech Dissertation Research
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              Sandip University • Supported by JIGSY INDIA
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Zero Waste Food Management
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
            A web-based circular economy platform engineered by <strong className="text-white">Mr. Jigyasu Vatsa</strong> that transforms edible institutional and banquet surplus into a vital societal resource. By integrating food providers, recipient shelters, and decentralized volunteer dispatchers, the framework eliminates landfill disposal while fulfilling zero-hunger community needs.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateToRole('provider')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <span>Explore Role Workspaces</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setPaperModalOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Research Article & Citation</span>
            </button>

            <button
              onClick={() => setProofModalOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/80 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Institutional Proof Dossier</span>
            </button>

            <button
              disabled={isSimulating}
              onClick={() => simulateFullLifecycle()}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              title="Executes 5-step end-to-end simulated lifecycle"
            >
              <Play className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSimulating ? 'Simulating...' : '1-Click Flow Test'}</span>
            </button>
          </div>
        </div>

        {/* Impact Bar Card */}
        <div className="mt-8 pt-6 border-t border-slate-800/90 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Meals Served</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
              {metrics.totalMealsServed.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Verified documented portions</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>CO₂e Avoided</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
              {metrics.co2EmissionsSavedKg.toLocaleString()} kg
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">UNEP factor: 2.5 kg CO₂e / kg</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Droplet className="w-4 h-4 text-blue-400" />
              <span>Water Conserved</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-400 font-mono mt-1">
              {(metrics.waterSavedLiters / 1000).toFixed(1)}k L
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Virtual embedded agricultural water</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Diversion Rate</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-1">
              {metrics.landfillDiversionRatePercent}%
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Zero landfill disposal achieved</div>
          </div>
        </div>
      </section>

      {/* 2. LITERATURE REVIEW & SCIENTIFIC CALCULATION BASELINE */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header with academic literature review badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" />
                M.Tech Dissertation Literature Review & Scientific Formulation
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Peer-Reviewed Standard Multipliers
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Scientific Base: How Water Conserved & CO₂e Avoided Are Calculated
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              These environmental figures are not arbitrary estimates. As part of the literature review conducted for this M.Tech dissertation, our computational formulas adopt globally standardized life-cycle assessment (LCA) benchmarks from <strong>Prof. Arjen Hoekstra (Water Footprint Network)</strong>, the <strong>United Nations Environment Programme (UNEP)</strong>, the <strong>Food and Agriculture Organization (FAO)</strong>, and <strong>IPCC greenhouse gas guidelines</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setProofModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/80 font-bold text-xs shadow transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Audit Proof Dossier</span>
            </button>
          </div>
        </div>

        {/* Detailed 3-Column Literature Review Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Water Footprint Formulation */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Droplet className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60">
                  Hoekstra & WFN Standard
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">
                  1. Virtual Water Footprint (224.7k L)
                </h3>
                <div className="text-[11px] text-blue-400 font-mono mt-0.5">
                  214 kg × 1,050 L/kg = 224,700 Liters Conserved
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Pioneered by <strong>Prof. Arjen Hoekstra</strong> (creator of the Water Footprint concept and founder of the Water Footprint Network) and mapped by the FAO. Producing agricultural staples consumes vast embedded water:
              </p>

              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>• Raw Rice Irrigation:</span>
                  <span className="text-slate-200">~2,500 L / kg</span>
                </div>
                <div className="flex justify-between">
                  <span>• Wheat / Atta Grain:</span>
                  <span className="text-slate-200">~1,500 L / kg</span>
                </div>
                <div className="flex justify-between">
                  <span>• Pulses / Dal Crop:</span>
                  <span className="text-slate-200">~3,800 L / kg</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 text-emerald-400 font-semibold">
                  <span>Cooked Indian Thali Avg:</span>
                  <span>1,050 L / kg</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Rescuing 214 kg directly offsets the need for recipient shelters to cook 500 equivalent replacement meals, conserving 224,700 Liters of fresh agricultural water.
              </p>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Ref: Hoekstra & Mekonnen (WFN / UNESCO-IHE)
            </div>
          </div>

          {/* Card 2: CO2e & Methane Avoidance Formulation */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                  UNEP & FAO LCA Factor
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">
                  2. Methane & Carbon Mitigation (535 kg)
                </h3>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                  214 kg × 2.50 kg CO₂e/kg = 535 kg CO₂e Avoided
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                When cooked food is discarded in unmanaged municipal dump yards, it decomposes in an <strong>anaerobic (oxygen-deprived)</strong> environment, releasing potent <strong>Methane (CH₄)</strong>:
              </p>

              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>• Landfill Methane GWP₁₀₀:</span>
                  <span className="text-amber-400 font-bold">28× higher than CO₂</span>
                </div>
                <div className="flex justify-between">
                  <span>• Short-Term GWP₂₀:</span>
                  <span className="text-amber-400 font-bold">84× higher than CO₂</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 text-emerald-400 font-semibold">
                  <span>UNEP Diversion Factor:</span>
                  <span>2.50 kg CO₂e / kg</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Source: <em>UNEP Food Waste Index Report</em> & <em>FAO Food Wastage Footprint LCA</em>. Diverting 214 kg from landfill prevents 535 kg of greenhouse emissions from reaching the atmosphere.
              </p>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Ref: UNEP Food Waste Index & IPCC WG1 Assessment
            </div>
          </div>

          {/* Card 3: Mass & Portion Equivalency Formulation */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60">
                  Empirical Testbed Weighment
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">
                  3. Portion Equivalency (500 Meals)
                </h3>
                <div className="text-[11px] text-purple-400 font-mono mt-0.5">
                  214 kg ÷ 0.428 kg/meal = 500 Portions (100% Diverted)
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Derived from calibrated digital platform scale weighments across the <strong>Sandip University SOCSE campus testbed</strong> and partner dining kitchens:
              </p>

              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>• Measured Cooked Mass:</span>
                  <span className="text-slate-200">214.0 kg net</span>
                </div>
                <div className="flex justify-between">
                  <span>• Standard Thali Portion:</span>
                  <span className="text-slate-200">~428g (0.428 kg)</span>
                </div>
                <div className="flex justify-between">
                  <span>• Nutritious Portions:</span>
                  <span className="text-slate-200 font-bold">500 complete meals</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1 text-emerald-400 font-semibold">
                  <span>Landfill Diversion Rate:</span>
                  <span>100% (Zero Dumps)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Every logged batch was physically inspected via 5-point FSSAI safety checks and verified received by registered community shelters prior to food expiration.
              </p>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 font-mono">
              Ref: Sandip University Campus Testbed & FSSAI Standards
            </div>
          </div>
        </div>

        {/* Bottom Scientific Consensus Banner */}
        <div className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Academic Literature Synthesis:</strong> The calculation methodology synthesizes established peer-reviewed frameworks from <em>Hoekstra et al. (WFN)</em>, <em>UNEP LCA Index</em>, and <em>FAO Natural Resource Footprint Guidelines</em>.
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 shrink-0 self-start sm:self-auto bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            M.Tech Dissertation • Mr. Jigyasu Vatsa
          </span>
        </div>
      </section>

      {/* 3. ADVANTAGES OF ZERO WASTE FOOD MANAGEMENT */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
            Systemic Impact & Rationale
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Key Advantages of Zero Waste Food Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Why transforming linear surplus into a regenerative circular flow creates compounded environmental, humanitarian, and institutional value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Advantage 1 */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                1. Methane & Carbon Mitigation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When organic food is dumped into open municipal landfills, it decomposes anaerobically and produces methane (<strong className="text-emerald-300">CH₄</strong>)—a greenhouse gas 28x more potent than CO₂. Our platform diverts food at source, directly avoiding 2.5 kg CO₂e for every kilogram redistributed.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-emerald-400">
              Empirical Baseline: 535 kg CO₂e Saved
            </div>
          </div>

          {/* Advantage 2 */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                2. Embedded Water Footprint
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Discarding food also squanders the immense virtual water consumed in irrigation, fertilizer production, transport, and culinary preparation. In India, 1 kg of cooked meal embeds ~1,050 Liters of water. Saving 214 kg preserves 224,700 Liters of fresh water.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-blue-400">
              Empirical Baseline: 224.7k L Conserved
            </div>
          </div>

          {/* Advantage 3 */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                3. Social Nutrition Dignity
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Despite agricultural output, India faces persistent malnutrition in vulnerable demographics. This framework channels rich, freshly cooked meals directly to registered orphanages, old age care homes, and unhoused night shelters with dignity and zero delay.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-amber-400">
              Empirical Baseline: 500 Meals Served
            </div>
          </div>

          {/* Advantage 4 */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-purple-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                4. Verified FSSAI Food Safety
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlike informal donations that risk food poisoning, our workflow mandates a physical 5-point volunteer inspection: sensory aroma, thermal probe verification (&gt;60°C hot holding or &lt;5°C cold chain), safe container seals, and delivery within safe consumption windows.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-mono text-purple-400">
              5-Point Quality Safety Protocol
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESEARCH ARTICLE OVERVIEW */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
              Academic Publication Overview
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
              Article Contents & Research Methodology
            </h2>
            <div className="text-xs text-slate-400 mt-0.5">
              Presented at the International Conference GTISD-2026 • ISBN: 978-81-685333-9
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setPaperModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full Dossier & Cite</span>
            </button>
            <a
              href="https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all cursor-pointer"
            >
              <span>Google Drive Manuscript</span>
              <ExternalLink className="w-3 h-3 text-blue-400" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-300">
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-mono text-[10px]">1</span>
              <span>The Indian Food Waste Paradox</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              India wastes nearly 74 million tonnes of food annually across households and commercial caterers, while millions suffer nutritional deficiencies. The paper establishes why traditional centralized recycling fails in tier-2/3 regions and how agile web redistribution fills this void.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[10px]">2</span>
              <span>Decentralized Geo-Enabled Architecture</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Details the semi-urban spatial matching algorithm using coordinates in the Madhubani zone. By constraining matching to a 2–6 km volunteer travel radius, warm cooked food is delivered within safe microbial decay limits without cold storage vehicle overhead.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono text-[10px]">3</span>
              <span>Auditable Chain of Custody</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Every transaction from donor upload, volunteer thermal probe sign-off, to receiver digital signature is logged to an immutable ledger. This provides verifiable data for university sustainability certifications, corporate CSR audits, and regulatory inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BRIEF INTRO OF ROLES & INTERACTIVE WORKSPACE GATEWAY */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase bg-blue-500/10 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-bold">
            Interactive Operational Roles
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Role Workspaces & Operational Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Click on any role card below to transition directly into that active operational workspace and test live flows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {roleCards.map(c => (
            <div
              key={c.id}
              onClick={() => navigateToRole(c.id)}
              className={`group bg-slate-900 border ${c.borderColor} rounded-2xl p-5 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:scale-[1.02]`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-slate-950 ${c.color} border border-slate-800`}>
                    {c.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {c.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    {c.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {c.targetAudience}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {c.description}
                </p>

                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Core Capabilities:
                  </div>
                  {c.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all ${c.accentBtn}`}
                >
                  <span>{c.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. REGIONAL INFRASTRUCTURE (RADAR & FEATURE SHOWCASE) */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Regional Coordination Radar & Architecture Showcase
          </h2>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Madhubani Semi-Urban Grid Model
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Half: Geo-Enabled Coordination Radar */}
          <div className="w-full h-full min-h-[460px] flex flex-col">
            <GeoMapVisualizer />
          </div>

          {/* Right Half: Custom Introductory Feature Showcase */}
          <div className="w-full h-full min-h-[460px] flex flex-col">
            <IntroductoryFeatureShowcase />
          </div>
        </div>
      </section>

      {/* 7. EMPIRICAL BASELINE & INSTITUTIONAL EVIDENCE BANNER */}
      <section className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">
              Audit & Official Inquiries
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Sandip University Campus Testbed
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Need Institutional Records or Proof for the Baseline?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            All 500 meals, 535 kg CO₂e saved, and 224.7k L water conserved reflect the empirical baseline measured across the academic dining pilot and community shelter network. In strict compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act), all personal stakeholder names, phone numbers, and external facility references are pseudonymized in this public client. Inspect the verification protocol for inquiry procedures.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setProofModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Institutional Proof Dossier</span>
          </button>
        </div>
      </section>
    </div>
  );
};
