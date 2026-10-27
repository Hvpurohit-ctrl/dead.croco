import React, { useState } from 'react';
import {
  HardHat,
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Receipt,
  Award,
  Users,
  Bell,
  BarChart3
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [roleMode, setRoleMode] = useState<'worker' | 'employer'>('worker');

  const workerSteps = [
    {
      num: '01',
      title: 'Clock In Seamlessly',
      description: 'Open the dead.croco mobile portal on any smartphone. Tap Check In at your site or campus checkpoint to start the real-time shift timer.',
      icon: Clock
    },
    {
      num: '02',
      title: 'Report Site Risks Without Fear',
      description: 'Notice an open floor hole or chemical leak? Take a photo, pick the hazard severity, and submit anonymously or signed with instant tracking code.',
      icon: ShieldCheck
    },
    {
      num: '03',
      title: 'Audit Every Rupee of Your Pay',
      description: 'View transparent payslips showing base hours, authorized overtime multiplied at 1.5x rate, and statutory PF/ESI deductions in your native tongue.',
      icon: Receipt
    },
    {
      num: '04',
      title: 'Carry Your Certified Skill Passport',
      description: 'Your completed safety courses, scaffold certificates, and verified work history stay in your permanent passport, printable anywhere.',
      icon: Award
    }
  ];

  const employerSteps = [
    {
      num: '01',
      title: 'Create & Assign Rosters',
      description: 'Schedule daily shifts across construction zones and university blocks. Assign specialized personnel with automated qualification checks.',
      icon: Users
    },
    {
      num: '02',
      title: 'Triage Hazards & Log Fixes',
      description: 'Incoming worker reports trigger instant alerts with photos. Review severity, dispatch remedial action, and log resolution notes back to workers.',
      icon: Bell
    },
    {
      num: '03',
      title: 'Prevent Accidents via Fatigue Rules',
      description: 'Automated policy engine detects dangerous schedules (>12h shifts, <8h rest between rotations) and prompts proactive supervisor schedule adjustments.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: 'Review Workforce Analytics',
      description: 'Interactive Recharts dashboards visualize daily attendance rates, overtime distributions, and hazard turnaround times across every department.',
      icon: BarChart3
    }
  ];

  const steps = roleMode === 'worker' ? workerSteps : employerSteps;

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-forest-700 uppercase tracking-widest bg-forest-50 px-3 py-1 rounded-full border border-forest-100">
            Dual Journey Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How dead.croco Unifies Teams
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Select a perspective below to see how our dual-interface architecture serves frontline workers and site administrators in harmony.
          </p>

          {/* Perspective Toggle */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-6">
            <button
              onClick={() => setRoleMode('worker')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                roleMode === 'worker'
                  ? 'bg-forest-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>Worker Journey</span>
            </button>
            <button
              onClick={() => setRoleMode('employer')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                roleMode === 'employer'
                  ? 'bg-forest-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Employer / Supervisor Journey</span>
            </button>
          </div>
        </div>

        {/* 4 Step Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="relative p-6 rounded-3xl bg-[#F8FAF9] border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-forest-800 font-mono">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-forest-800 shadow-sm group-hover:bg-forest-900 group-hover:text-emerald-400 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-6 mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Safe Workflow</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
