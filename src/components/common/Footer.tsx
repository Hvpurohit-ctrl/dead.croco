import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, HeartHandshake, Award, ExternalLink, RefreshCw } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { resetAllDemoData } = useAppState();

  return (
    <footer className="bg-forest-950 text-white border-t border-forest-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-forest-900/80">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 shadow-md">
                <img src="/logo.webp" alt="dead.croco logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  dead<span className="text-emerald-400">.croco</span>
                </span>
                <p className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase">
                  BE DEAD LIKE CROCO
                </p>
              </div>
            </div>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              Building fairer, safer, and more transparent workplaces for employee-intensive organisations across construction, colleges, hospitals, and factories.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  if (confirm('Reset all demo attendance, hazard reports, and shifts back to original sample data?')) {
                    resetAllDemoData();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-emerald-300 text-xs border border-forest-800 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Platform Modules</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li><a href="#features" className="hover:text-white transition">Smart Shift Tracking & QR Clock-In</a></li>
              <li><a href="#features" className="hover:text-white transition">Transparent Payslips & Overtime Audit</a></li>
              <li><a href="#features" className="hover:text-white transition">Hazard Reporting & Photo Verification</a></li>
              <li><a href="#features" className="hover:text-white transition">100% Anonymous Worker Feedback</a></li>
              <li><a href="#features" className="hover:text-white transition">Digital Portable Skill Passport</a></li>
              <li><a href="#features" className="hover:text-white transition">Rule-Based Fatigue Safeguards</a></li>
            </ul>
          </div>

          {/* Target Industries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Demonstrated Sectors</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Metro Rail & Civil Construction Sites</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Colleges & Educational Campus Maintenance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"></span>
                <span className="text-emerald-200/60">Hospitals & Round-the-Clock Sanitation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"></span>
                <span className="text-emerald-200/60">Manufacturing & Industrial Floor Lines</span>
              </li>
            </ul>
          </div>

          {/* UN SDG 8 Commitment & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>UN SDG 8 Alignment</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-forest-900/60 border border-forest-800 text-xs text-emerald-100/80 space-y-2">
              <p className="font-semibold text-white text-[11px]">
                Target 8.8: Protect labour rights and promote safe and secure working environments for all workers.
              </p>
              <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                Target 8.5: Achieve full and productive employment and decent work for all women and men with equal pay for work of equal value.
              </p>
            </div>
            <div className="text-[10px] text-emerald-300/60 border-l-2 border-emerald-500/40 pl-2 pt-1">
              <strong>Disclaimer:</strong> All operational figures, shift hours, and safety metrics on this website are sample demo data generated for evaluation and prototype testing.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/60 gap-4">
          <p>© 2026 dead.croco. All rights reserved. Platform Name: <strong>dead.croco</strong>.</p>
          <div className="flex items-center gap-4">
            <span>Prompt Wars 2026 × SRM ACM Student Chapter</span>
            <span>•</span>
            <span className="font-bold text-emerald-400">BE DEAD LIKE CROCO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
