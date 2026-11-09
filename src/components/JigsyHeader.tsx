import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Utensils,
  Building2,
  Bike,
  ShieldCheck,
  FileText,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Leaf,
  Droplet,
  HeartHandshake,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Megaphone,
  Home,
} from 'lucide-react';

export const JigsyHeader: React.FC = () => {
  const {
    role,
    setRole,
    currentView,
    setCurrentView,
    navigateToRole,
    metrics,
    soundEnabled,
    toggleSound,
    setPaperModalOpen,
    setProofModalOpen,
    setDemoModalOpen,
    resetAllData,
    simulateFullLifecycle,
    isSimulating,
    simulationStep,
  } = useApp();

  // Alternates subtitle between Sanskrit motto and English tagline every 3 seconds
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIndex(prev => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const roleConfigs: {
    id: UserRole;
    label: string;
    shortLabel: string;
    sublabel: string;
    icon: React.ReactNode;
    color: string;
    activeBorder: string;
    activeBg: string;
  }[] = [
    {
      id: 'provider',
      label: 'Food Provider',
      shortLabel: 'Provider',
      sublabel: 'Hostels, Banquets, Restaurants',
      icon: <Utensils className="w-3.5 h-3.5" />,
      color: 'text-amber-400',
      activeBorder: 'border-amber-500',
      activeBg: 'bg-amber-500/10 text-amber-300',
    },
    {
      id: 'receiver',
      label: 'Food Receiver',
      shortLabel: 'Receiver',
      sublabel: 'NGOs, Shelters & Kitchens',
      icon: <Building2 className="w-3.5 h-3.5" />,
      color: 'text-blue-400',
      activeBorder: 'border-blue-500',
      activeBg: 'bg-blue-500/10 text-blue-300',
    },
    {
      id: 'volunteer',
      label: 'Community Volunteer',
      shortLabel: 'Volunteer',
      sublabel: 'Decentralized Last-Mile Logistics',
      icon: <Bike className="w-3.5 h-3.5" />,
      color: 'text-emerald-400',
      activeBorder: 'border-emerald-500',
      activeBg: 'bg-emerald-500/10 text-emerald-300',
    },
    {
      id: 'admin',
      label: 'Administrator',
      shortLabel: 'Admin',
      sublabel: 'Circular Ledger & Transparency',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'text-purple-400',
      activeBorder: 'border-purple-500',
      activeBg: 'bg-purple-500/10 text-purple-300',
    },
  ];

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="w-full">
      {/* 1. Single Right-to-Left Moving Marquee Ticker (Both notices in ONE row) - Moves up with scroll */}
      <div className="w-full bg-[#1b72c9] text-white overflow-hidden py-1.5 border-b border-blue-400/40 text-xs shadow-sm">
        <div className="animate-marquee flex items-center gap-12 font-medium tracking-wide">
          {/* Notice 1: Academic & Dissertation */}
          <div className="flex items-center gap-2 text-amber-200 shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>Academic Notice:</strong> This web platform is an active research prototype and is <strong>not live for public deployment</strong>. This development is a part of the <strong>M.Tech dissertation of Mr. Jigyasu Vatsa</strong>, partially supported by <strong>JIGSY INDIA</strong>.
            </span>
          </div>

          <span className="text-blue-300 font-bold shrink-0">✦✦✦</span>

          {/* Notice 2: Corporate Services */}
          <div className="flex items-center gap-2 text-white shrink-0">
            <Megaphone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>JIGSY INDIA:</strong> Contact us for Software as a service, IT services, mass hirings, campus recruit, digital outreach, web development... (Email: <a href="mailto:jigsy25@gmail.com" className="underline font-bold text-amber-200">jigsy25@gmail.com</a> | Phone: <span className="font-mono text-amber-200">+91 94314 00022</span>)
            </span>
          </div>

          <span className="text-blue-300 font-bold shrink-0">✦✦✦</span>

          {/* Repeat for seamless loop */}
          <div className="flex items-center gap-2 text-amber-200 shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>Academic Notice:</strong> This web platform is an active research prototype and is <strong>not live for public deployment</strong>. This development is a part of the <strong>M.Tech dissertation of Mr. Jigyasu Vatsa</strong>, partially supported by <strong>JIGSY INDIA</strong>.
            </span>
          </div>

          <span className="text-blue-300 font-bold shrink-0">✦✦✦</span>

          <div className="flex items-center gap-2 text-white shrink-0">
            <Megaphone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>JIGSY INDIA:</strong> Contact us for Software as a service, IT services, mass hirings, campus recruit, digital outreach, web development... (Email: <a href="mailto:jigsy25@gmail.com" className="underline font-bold text-amber-200">jigsy25@gmail.com</a> | Phone: <span className="font-mono text-amber-200">+91 94314 00022</span>)
            </span>
          </div>
        </div>
      </div>

      {/* 2. JIGSY Corporate Header Banner - Moves up with scroll naturally */}
      <div className="w-full bg-gradient-to-r from-[#074737] via-[#0d342c] via-[#3a133a] to-[#0e273b] px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: JIGSY Emblem Logo */}
          <a
            href="https://jigsy.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 group"
            title="Jigyasu Integrated Global Services Private Limited"
          >
            <img
              src="/assets/aistudio/image_28536762.png"
              alt="JIGSY Logo"
              className="h-11 sm:h-16 w-auto object-contain drop-shadow-md transition-transform group-hover:scale-105"
            />
          </a>

          {/* Center: Corporate Title & 3-Second Alternating Subtitles */}
          <div className="text-center flex-1 px-1 sm:px-3">
            <h1 className="text-[13px] xs:text-sm sm:text-xl md:text-2xl font-serif font-black tracking-wider uppercase text-[#f5a623] leading-tight drop-shadow-md font-['Times_New_Roman',serif]">
              JIGYASU INTEGRATED GLOBAL SERVICES PRIVATE LIMITED
            </h1>

            {/* Alternating Subtitle: 3-Second Transition */}
            <div className="h-5 sm:h-6 mt-0.5 sm:mt-1 flex items-center justify-center overflow-hidden">
              <div
                key={subtitleIndex}
                className="text-[11px] sm:text-sm font-semibold tracking-wide transition-all duration-500 animate-in fade-in slide-in-from-bottom-1 font-sans text-white/90 drop-shadow"
              >
                {subtitleIndex === 0 ? (
                  <span className="text-emerald-300 font-medium">जिज्ञासु ईक्षण ग्रंथि समृद्धि युक्ति</span>
                ) : (
                  <span className="text-amber-200 tracking-widest font-mono text-[10px] sm:text-xs">
                    JIGYASU INTEGRATED GLOBAL SERVICES with YOU
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Make In India Emblem Logo */}
          <div className="flex-shrink-0">
            <img
              src="/assets/aistudio/image_7e48c122.png"
              alt="Make In India"
              className="h-11 sm:h-16 w-auto object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* 3. STICKY TOP-0 COMMAND BAR: Navigation + Metrics + Role Switcher (Condensed into fewer rows!) */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        {/* Row 1: Brand Navigation & Verified Live Metrics */}
        <div className="w-full bg-white text-slate-900 border-b border-slate-200 px-3 sm:px-6 py-1.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            {/* Brand Title & Project Tag */}
            <div className="flex items-center gap-2.5">
              <a
                href="#top"
                onClick={handleHomeClick}
                className="font-serif font-black text-base sm:text-lg tracking-wider text-slate-950 hover:text-rose-700 transition-colors"
              >
                JIGSY INDIA
              </a>
              <span className="hidden sm:inline-block h-3.5 w-px bg-slate-300" />
              <span className="hidden md:inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Zero Waste Food Management
              </span>
            </div>

            {/* Nav Links: Home, Services, Contact (scrolls down), About Developer */}
            <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-700 flex-nowrap shrink-0">
              <a
                href="#top"
                onClick={handleHomeClick}
                className={`transition-colors cursor-pointer font-bold ${
                  currentView === 'home'
                    ? 'text-rose-700 underline decoration-2 underline-offset-4'
                    : 'text-slate-950 hover:text-rose-700'
                }`}
                title="Home Overview: Advantages, Article Contents & Role Gateway"
              >
                Home
              </a>

              {/* Nexus (Self-contained hover dropdown) */}
              <div className="relative group py-2">
                {/* Trigger */}
                <div className="flex items-center gap-1 cursor-pointer select-none text-slate-700 hover:text-rose-700 transition-colors">
                  <span>Nexus</span>
                  <svg
                    className="w-3 h-3 opacity-60 transition-transform group-hover:rotate-180"
                     viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                <div className="hidden group-hover:block absolute left-0 top-full pt-1 w-72 z-50 text-left whitespace-normal select-none">
                  <div className="rounded-xl shadow-2xl p-2.5 border border-slate-800 bg-slate-900 text-slate-200 flex flex-col w-full whitespace-normal">
                    <a
                      href="https://zerowfm.jigsy.in/"
                      className="w-full block text-left px-3 py-1.5 rounded-lg text-xs font-bold whitespace-normal transition-colors hover:bg-slate-800 hover:text-white"
                    >
                      Zero Waste Food Management
                    </a>

                    <div className="border-t my-1 w-full border-slate-800" />

                    <a
                      href="https://aifm.jigsy.in/"
                      className="w-full block text-left px-3 py-1.5 rounded-lg text-[11px] whitespace-normal transition-colors hover:bg-slate-800 hover:text-white"
                    >
                      &bull; AI-Assisted Food Management
                    </a>

                    <a
                      href="https://ctfm.jigsy.in/"
                      className="w-full block text-left px-3 py-1.5 rounded-lg text-[11px] whitespace-normal transition-colors hover:bg-slate-800 hover:text-white"
                    >
                      &bull; Cyber Trusted Food Management
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://jigsy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-700 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="hover:text-rose-700 transition-colors cursor-pointer"
              >
                Contact
              </a>
              <a
                href="https://jigyasu.jigsy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-rose-700 hover:text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md font-bold transition-all"
                title="About Lead Developer Mr. Jigyasu Vatsa"
              >
                <span>About Developer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Compact Verified Impact Metrics Pill */}
            <div className="hidden xl:flex items-center gap-3 text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg font-mono">
              <div className="flex items-center gap-1 text-slate-700">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>Meals:</span>
                <strong className="text-slate-950">{metrics.totalMealsServed.toLocaleString()}</strong>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-700">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>CO₂e:</span>
                <strong className="text-emerald-700">{metrics.co2EmissionsSavedKg.toLocaleString()} kg</strong>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-700">
                <Droplet className="w-3.5 h-3.5 text-blue-600" />
                <span>Water:</span>
                <strong className="text-blue-700">{(metrics.waterSavedLiters / 1000).toFixed(1)}k L</strong>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-700">
                <span>Diversion:</span>
                <strong className="text-amber-600">{metrics.landfillDiversionRatePercent}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Streamlined Operations Bar (Role Switcher + Engineering Note + Action Controls) - Strictly Single Row */}
        <div className="w-full bg-slate-900/95 px-2 sm:px-4 lg:px-6 py-1.5 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2 text-xs flex-nowrap overflow-hidden">
            {/* Role Switcher Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 flex-nowrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-0.5 shrink-0 hidden sm:inline">
                ROLES:
              </span>
              {roleConfigs.map(item => {
                const isActive = currentView === 'operations' && role === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateToRole(item.id)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                      isActive
                        ? `${item.activeBg} ${item.activeBorder} shadow font-semibold`
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className={item.color}>{item.icon}</span>
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="xl:hidden">{item.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Engineer attribution & Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 flex-nowrap">
              <span className="text-[11px] text-slate-400 shrink-0 hidden 2xl:inline">
                Engineered by <strong className="text-slate-200">Mr. Jigyasu Vatsa</strong>
              </span>

              <button
                onClick={() => setProofModalOpen(true)}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/80 transition-all font-medium text-[11px] sm:text-xs shrink-0 cursor-pointer"
                title="View Institutional Records, Participating Persons & Audit Baseline Proof"
              >
                <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />
                <span className="hidden lg:inline">Proof Dossier</span>
                <span className="lg:hidden">Proof</span>
              </button>

              <button
                onClick={() => setPaperModalOpen(true)}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500 transition-all font-medium text-[11px] sm:text-xs shrink-0 cursor-pointer"
                title="View Research Paper Overview & Citations"
              >
                <FileText className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="hidden lg:inline">Research Paper</span>
                <span className="lg:hidden">Paper</span>
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow transition-all text-[11px] sm:text-xs shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                <span className="hidden md:inline">Walkthrough Guide</span>
                <span className="md:hidden">Guide</span>
              </button>

              <button
                disabled={isSimulating}
                onClick={() => simulateFullLifecycle()}
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md border font-medium text-[11px] sm:text-xs transition-all shrink-0 cursor-pointer ${
                  isSimulating
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Runs an automated live 5-step end-to-end closed loop test"
              >
                <Play className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="hidden sm:inline">{isSimulating ? 'Simulating...' : '1-Click Test'}</span>
                <span className="sm:hidden">{isSimulating ? 'Test...' : 'Test'}</span>
              </button>

              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 shrink-0 cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Reset all demonstration data back to fresh Madhubani seed data?')) {
                    resetAllData();
                  }
                }}
                title="Reset Sample Data"
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Simulation Live Status Banner (if active) */}
        {isSimulating && (
          <div className="bg-amber-950/95 border-b border-amber-600/50 px-4 py-1.5 text-center text-xs text-amber-200 font-medium animate-pulse flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{simulationStep}</span>
          </div>
        )}
      </header>
    </div>
  );
};
