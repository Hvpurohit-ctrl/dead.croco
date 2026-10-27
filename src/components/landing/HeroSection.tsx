import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import {
  HardHat,
  Building2,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Receipt,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onOpenWorker: () => void;
  onOpenAdmin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWorker, onOpenAdmin }) => {
  const { t } = useLanguage();
  const { activeAttendance, complaints, users } = useAppState();

  const openComplaintsCount = complaints.filter(c => c.status !== 'resolved').length;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#F2F8F3] via-white to-[#F8FAF9]">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/60 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline / SDG Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-forest-900 text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-forest-700 animate-pulse"></span>
              <span>{t.hero.badgeSDG}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Fair Work. <span className="text-forest-800 underline decoration-emerald-400 decoration-wavy decoration-2">Safer Teams.</span> Clearer Futures.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              <strong>dead.croco</strong> empowers workers with transparent pay, safer workplaces, and a voice that matters, while helping employers create healthier and more productive teams.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenWorker}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-forest-900/20 hover:shadow-forest-900/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
              >
                <HardHat className="w-5 h-5 text-emerald-400 group-hover:rotate-6 transition" />
                <span>{t.hero.getStarted}</span>
                <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={onOpenAdmin}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-forest-950 font-bold text-sm sm:text-base border-2 border-emerald-200 shadow-sm transition flex items-center justify-center gap-2.5"
              >
                <Building2 className="w-5 h-5 text-forest-700" />
                <span>{t.hero.exploreFeatures}</span>
              </button>
            </div>

            {/* Quick trust metrics (clearly labeled demo) */}
            <div className="pt-6 border-t border-emerald-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dual Cross-Sector Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Data Identity Leaks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>English • हिन्दी • தமிழ்</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visually Appealing Actual Workforce Dashboard Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-emerald-100 ring-1 ring-slate-900/5">
              {/* Header inside preview */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5 border border-emerald-300">
                    <img src="/logo.webp" alt="logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-forest-950 leading-none">dead.croco Live Hub</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Metro Construction & SRM Campus</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Demo Live
                </span>
              </div>

              {/* Dashboard Preview Cards */}
              <div className="space-y-3.5 pt-4">
                {/* Active Shift Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-forest-800 text-white shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-200" />
                      Active Shift Tracking
                    </span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">Clocked In</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black font-mono tracking-tight">03h : 42m : 18s</div>
                    <p className="text-[11px] text-emerald-100 mt-0.5">Metro Pier 18 East • Senior Scaffolding</p>
                  </div>
                </div>

                {/* 2 Mini KPI Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Transparent Pay */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                      <span>Est. Net Pay</span>
                      <Receipt className="w-3.5 h-3.5 text-forest-700" />
                    </div>
                    <div className="text-lg font-extrabold text-forest-950 mt-1 font-mono">₹18,035</div>
                    <p className="text-[10px] text-emerald-700 font-medium">+ ₹3,570 Overtime Audited</p>
                  </div>

                  {/* Open Hazards */}
                  <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                    <div className="flex items-center justify-between text-[11px] text-amber-800 font-semibold">
                      <span>Safety Triage</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div className="text-lg font-extrabold text-amber-950 mt-1 font-mono">
                      {openComplaintsCount} Active
                    </div>
                    <p className="text-[10px] text-amber-700 font-medium">1 Resolved Today</p>
                  </div>
                </div>

                {/* Live Worker Mini Card */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="worker avatar"
                      className="w-8 h-8 rounded-full object-cover border border-emerald-300"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Ramesh Kumar</p>
                      <p className="text-[10px] text-slate-500">Scaffolding Lead (ID: CR-9921)</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Verified Passport
                  </span>
                </div>

                {/* Floating pill badge */}
                <div className="pt-1 text-center">
                  <span className="text-[11px] text-slate-400 italic">
                    Sample live dashboard view • Click &apos;Open Worker App&apos; above to interact
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
