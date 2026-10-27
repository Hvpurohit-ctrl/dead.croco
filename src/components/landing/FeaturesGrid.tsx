import React, { useState } from 'react';
import {
  Clock,
  Receipt,
  ShieldAlert,
  MessageSquareOff,
  Award,
  Zap,
  ArrowRight,
  Check
} from 'lucide-react';

interface FeaturesGridProps {
  onOpenWorker: () => void;
  onOpenAdmin: () => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onOpenWorker, onOpenAdmin }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: 0,
      icon: Clock,
      title: 'Smart Shift Tracking',
      tagline: 'Precision Attendance & Overtime Auditing',
      description: 'Workers clock in and out with single-tap mobile verification. Active shift timers calculate exact working hours and automatically split standard from overtime hours, preventing accidental duplicates or missed records.',
      highlights: [
        'Live elapsed shift timer with seconds precision',
        'Automatic overtime threshold calculator (standard 8-hour day)',
        'GPS checkpoint & site radius validation',
        'Daily, weekly, and monthly attendance archives'
      ],
      badge: 'Worker & Admin Synced'
    },
    {
      id: 1,
      icon: Receipt,
      title: 'Transparent Payslips',
      tagline: 'Opaque Wages Replaced With Crystal Clarity',
      description: 'Every rupee earned is explained through understandable formulas. Displays base pay, hourly rates, overtime multipliers, and statutory deductions (PF, ESI, Welfare) with one-click printable salary receipts.',
      highlights: [
        'Detailed breakdown: Base Pay + 1.5x OT - Deductions',
        'Available in English, Hindi, and Tamil translations',
        'Printable and downloadable PDF-ready paystub layout',
        'Historical pay period archive for loan/banking proof'
      ],
      badge: 'Zero Hidden Cuts'
    },
    {
      id: 2,
      icon: ShieldAlert,
      title: 'Safety Hazard Reporting',
      tagline: 'Crowdsourced Site Safety With Unique Tracking IDs',
      description: 'Empowers any worker to photograph and flag dangerous scaffolding, chemical fumes, or frayed power cables. Generates a unique tracking ID and tracks resolution notes directly from site supervisors.',
      highlights: [
        'Camera photo upload preview for visual proof',
        'Category & severity triage (Low to Critical)',
        'Unique complaint code (e.g., CR-SAFE-1042)',
        'Status progression: Submitted -> In Progress -> Resolved'
      ],
      badge: 'UN SDG 8.8 Aligned'
    },
    {
      id: 3,
      icon: MessageSquareOff,
      title: '100% Anonymous Feedback',
      tagline: 'Honest Worker Voice Without Fear of Retaliation',
      description: 'Workers share frank insights on drinking water, workload, supervisor behavior, and facility safety. Architecture decouples all user identities and IP metadata so employers only see constructive truth.',
      highlights: [
        'Architecturally stripped of worker IDs and names',
        'Categorized by Facilities, Workload, Safety & Fairness',
        'Sentiment tagging for swift management prioritization',
        'Zero fear of adverse shift scheduling retribution'
      ],
      badge: 'True Identity Privacy'
    },
    {
      id: 4,
      icon: Award,
      title: 'Digital Skill Passport',
      tagline: 'Portable, Verified Career Credentials',
      description: 'Workers build a certified record of scaffold certifications, hazardous waste training, first-aid licenses, and past project achievements, unlocking higher pay on future assignments.',
      highlights: [
        'Accredited certifications (NSDC, Red Cross, Safety Boards)',
        'Verified digital badge with QR authenticity preview',
        'Printable / downloadable professional worker resume card',
        'Lifelong employment history preserved across employers'
      ],
      badge: 'Career Upward Mobility'
    },
    {
      id: 5,
      icon: Zap,
      title: 'Rule-Based Fatigue Safeguards',
      tagline: 'Proactive Alerting Before Accidents Occur',
      description: 'Automated policy engine monitors consecutive working hours, insufficient turnarounds (<8h rest), and excessive 7-day shift streaks, recommending immediate schedule revisions to administrators.',
      highlights: [
        'Flags shifts exceeding 12 consecutive hours',
        'Alerts for turnaround rest periods under 8 hours',
        'Rule-based operational warnings clearly disclosed',
        'Immediate relief operator handover recommendations'
      ],
      badge: 'Accident Prevention'
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/70 px-3 py-1 rounded-full">
            Engineered For Fair Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Features for Modern Workforce Health
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            dead.croco links workers on the ground to supervisors in the control room through transparent data, safe communication, and verifiable credentials.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="rounded-3xl p-7 bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-forest-900 text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-105 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-6">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-1 mb-3">
                    {feat.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {feat.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={onOpenWorker}
                    className="text-xs font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1 group-hover:translate-x-1 transition"
                  >
                    <span>Test In Worker View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onOpenAdmin}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    View Admin Side
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
