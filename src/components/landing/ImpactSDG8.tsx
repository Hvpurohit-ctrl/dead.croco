import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';

export const ImpactSDG8: React.FC = () => {
  const pillars = [
    {
      target: 'SDG Target 8.8',
      title: 'Protect Labour Rights & Promote Safe Working Environments',
      description: 'By providing an accessible, photo-verified, multi-lingual hazard reporting interface with guaranteed anonymous whistleblowing, hazards are resolved before they cause lost-time injuries.',
      metricLabel: 'Sample Prototype Metric',
      metricValue: '99.2%',
      metricDetail: 'Hazards resolved prior to escalations (Demo Data)'
    },
    {
      target: 'SDG Target 8.5',
      title: 'Full, Productive & Decent Work with Equal Pay Transparency',
      description: 'Transparent pay calculation breakdowns demystify gross wages, overtime rates, and statutory deductions in English, Hindi, and Tamil, protecting workers against wage theft.',
      metricLabel: 'Sample Prototype Metric',
      metricValue: '100%',
      metricDetail: 'Transparent auditability on all logged hours (Demo Data)'
    },
    {
      target: 'SDG Target 8.6',
      title: 'Youth & Trade Employment Through Portable Skill Passports',
      description: 'Frontline workers build a permanent, verified digital identity of trade skills and safety certifications that travels with them across employers and contractors.',
      metricLabel: 'Sample Prototype Metric',
      metricValue: '3+ Trades',
      metricDetail: 'Average verified credentials per active worker (Demo Data)'
    }
  ];

  return (
    <section id="impact" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-forest-900 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-forest-800" />
            <span>Global Goal Commitment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            United Nations SDG 8: Decent Work & Economic Growth
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            dead.croco directly operationalizes UN Sustainable Development Goal 8, transforming paper pledges into daily digital safeguards for frontline laborers.
          </p>
        </div>

        {/* 3 Impact Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-7 bg-[#F8FAF9] border border-slate-200/90 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg transition"
            >
              <div>
                <span className="text-xs font-black tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-2.5 py-1 rounded-md">
                  {item.target}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200/60 bg-white p-4 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {item.metricLabel}
                </span>
                <div className="text-2xl font-black text-forest-900 mt-0.5 font-mono">
                  {item.metricValue}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {item.metricDetail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Explicit Demo Data Disclaimer Note */}
        <div className="mt-12 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center max-w-2xl mx-auto">
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Transparency Notice:</strong> In accordance with hackathon guidelines, all metrics, user names, shift durations, and safety incidents presented in this demonstration are realistic sample data modeled on Indian infrastructure and campus settings.
          </p>
        </div>
      </div>
    </section>
  );
};
