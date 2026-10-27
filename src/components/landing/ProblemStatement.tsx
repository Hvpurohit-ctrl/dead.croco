import React from 'react';
import {
  FileSpreadsheet,
  HelpCircle,
  AlertTriangle,
  History,
  ArrowRight
} from 'lucide-react';

export const ProblemStatement: React.FC = () => {
  const problems = [
    {
      icon: FileSpreadsheet,
      title: 'Manual & Paper-Based Registers',
      description: 'Physical muster rolls and informal WhatsApp groups lead to missing shift entries, clock-in disputes, and zero real-time visibility for management.',
      impact: 'Up to 14% of overtime hours go unlogged or contested every month.'
    },
    {
      icon: HelpCircle,
      title: 'Opaque Salary Breakdowns',
      description: 'Workers receive lump-sum wages with unclear deductions for PF/ESI, undocumented overtime rates, and no understandable payment slips in native tongues.',
      impact: 'Erodes worker trust and causes high unplanned attrition across job sites.'
    },
    {
      icon: AlertTriangle,
      title: 'Unreported Workplace Hazards',
      description: 'Subcontractors and daily wage earners hesitate to report unsafe scaffolding or toxic leaks due to fear of termination or supervisor retaliation.',
      impact: 'Preventable safety violations escalate until severe, costly injuries occur.'
    },
    {
      icon: History,
      title: 'Lost Career & Skill Records',
      description: 'Years of hard-earned experience on major sites are lost when contracts expire, forcing workers to start anew at entry-level wages on every new project.',
      impact: 'Prevents skilled tradespeople from progressing into supervisory roles.'
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            The Workforce Challenge
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Employee-Intensive Organizations Struggle Today
          </h3>
          <p className="text-base text-slate-600 leading-relaxed">
            From metro construction viaducts to university campuses, critical frontline workers still operate through paper logs, unrecorded overtime, and silent hazards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-6 bg-[#F8FAF9] border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-forest-800 shadow-sm group-hover:scale-110 transition">
                    <Icon className="w-6 h-6 text-forest-800" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mt-5 mb-2">
                    {prob.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {prob.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <p className="text-xs font-semibold text-forest-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                    <span className="font-bold">Consequence:</span> {prob.impact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
