import React, { useState } from 'react';
import {
  HardHat,
  GraduationCap,
  Building,
  Factory,
  Check,
  Shield,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

interface IndustriesSectionProps {
  onSelectIndustryDemo: (industry: 'construction' | 'college') => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustryDemo }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<'construction' | 'college' | 'hospital' | 'factory'>('construction');

  const industriesData = {
    construction: {
      title: 'Construction & Infrastructure Sites',
      badge: 'Primary Demo Sector 1',
      description: 'Heavy civil works, viaducts, metro rail, and high-rise developments where physical safety, high-altitude harness compliance, and heat exhaustion are critical everyday priorities.',
      roles: ['Scaffolding Specialist', 'Tower Crane Operator', 'Reinforcement Mason', 'Site Electrician'],
      hazards: ['Missing Toe-boards at Height', 'Damaged Power Feeders in Sump', 'Excavator Blind Spot Proximity'],
      payRules: 'Daily wage with 1.5x overtime rate, plus high-altitude risk allowance of ₹1,500/month.',
      fatigueRule: 'Mandatory rotation after 8 hours of continuous heavy machinery operation; max 11h daily shift.',
      activeWorkers: '1,420 registered operatives',
      color: 'forest'
    },
    college: {
      title: 'Colleges & Educational Campuses',
      badge: 'Primary Demo Sector 2',
      description: 'Sprawling higher education campuses employing hundreds of sanitation staff, overnight security officers, electricians, and laboratory technicians handling toxic chemicals.',
      roles: ['Sanitation Lead', 'Campus Security Officer', 'Lab Safety Technician', 'HVAC Maintenance'],
      hazards: ['Chemical Fume Trap Leaks in Organic Labs', 'Dark Pathways with Blown Ballasts', 'Broken Stair Railings'],
      payRules: 'Monthly fixed base + weekend campus event allowance, with transparent PF/ESI statutory contributions.',
      fatigueRule: 'Minimum 8 hours compulsory turnaround rest between night campus patrol and morning events.',
      activeWorkers: '680 facility staff members',
      color: 'emerald'
    },
    hospital: {
      title: 'Hospitals & Healthcare Facilities',
      badge: 'Extensible Sector 3',
      description: '24/7 patient care support environments requiring strict bio-waste management, pathogen protection, and uninterrupted shift continuity.',
      roles: ['Bio-Waste Handler', 'Patient Transport Porter', 'Floor Sanitization Tech', 'Sterilization Assistant'],
      hazards: ['Needlestick & Sharp Discard Exposure', 'Autoclave Pressure Valve Leak', 'Slippery Ward Corridors'],
      payRules: 'Base rate + infection hazard differential + night-shift duty bonus.',
      fatigueRule: 'Strict 10-hour maximum shift in high-dependency units to prevent medical fatigue errors.',
      activeWorkers: '840 healthcare aides',
      color: 'blue'
    },
    factory: {
      title: 'Manufacturing & Industrial Floor Lines',
      badge: 'Extensible Sector 4',
      description: 'High-speed assembly plants, stamping lines, and warehouses balancing high output with repetitive strain and machinery pinch-point safeguards.',
      roles: ['Assembly Line Operator', 'Pneumatics Technician', 'Forklift Driver', 'Quality Inspector'],
      hazards: ['Conveyor Belt Pinch Point Shield Missing', 'Forklift Reversing Beeper Failure', 'Excessive Ambient Decibels'],
      payRules: 'Piece-rate and hourly bonus structure with automated overtime threshold triggers.',
      fatigueRule: 'Scheduled 15-minute ergonomic stretch breaks every 3 hours of continuous assembly.',
      activeWorkers: '2,150 assembly operators',
      color: 'amber'
    }
  };

  const current = industriesData[selectedIndustry];

  return (
    <section id="industries" className="py-24 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-forest-700 uppercase tracking-widest bg-forest-100/70 px-3 py-1 rounded-full">
            Universal Adaptability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Proven Across High-Intensity Work Environments
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            dead.croco adapts its configurable safety checklists, pay models, and fatigue rules to the specific operational realities of distinct industries.
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-12">
          <button
            onClick={() => setSelectedIndustry('construction')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition ${
              selectedIndustry === 'construction'
                ? 'bg-forest-900 text-white border-forest-900 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
            }`}
          >
            <HardHat className="w-4 h-4 text-emerald-400" />
            <span>Construction Sites</span>
          </button>

          <button
            onClick={() => setSelectedIndustry('college')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition ${
              selectedIndustry === 'college'
                ? 'bg-forest-900 text-white border-forest-900 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Colleges & Universities</span>
          </button>

          <button
            onClick={() => setSelectedIndustry('hospital')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition ${
              selectedIndustry === 'hospital'
                ? 'bg-forest-900 text-white border-forest-900 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
            }`}
          >
            <Building className="w-4 h-4 text-emerald-400" />
            <span>Hospitals & Healthcare</span>
          </button>

          <button
            onClick={() => setSelectedIndustry('factory')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition ${
              selectedIndustry === 'factory'
                ? 'bg-forest-900 text-white border-forest-900 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
            }`}
          >
            <Factory className="w-4 h-4 text-emerald-400" />
            <span>Manufacturing Plants</span>
          </button>
        </div>

        {/* Detailed Industry Showcase Card */}
        <div className="mt-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Context & Config */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-forest-900 font-bold text-xs">
                  {current.badge}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500">{current.activeWorkers}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {current.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {current.description}
              </p>

              {/* Roles */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Sample Worker Roles Configured
                </h4>
                <div className="flex flex-wrap gap-2">
                  {current.roles.map((r, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-200/70"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hazards Monitored */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Pre-configured Hazard Categories
                </h4>
                <div className="space-y-2">
                  {current.hazards.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-[10px]">
                        !
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Rule Engine & Test Button */}
            <div className="lg:col-span-5 bg-[#F2F8F3] rounded-2xl p-6 border border-emerald-200/80 space-y-5">
              <h4 className="text-xs font-extrabold text-forest-900 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Sector Policy & Pay Rules</span>
              </h4>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-sm">
                  <span className="font-bold text-slate-900 block mb-1">Transparent Pay Formulation:</span>
                  <p className="text-slate-600 leading-relaxed">{current.payRules}</p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-sm">
                  <span className="font-bold text-slate-900 block mb-1">Fatigue & Rest Safeguard:</span>
                  <p className="text-slate-600 leading-relaxed">{current.fatigueRule}</p>
                </div>
              </div>

              {(selectedIndustry === 'construction' || selectedIndustry === 'college') && (
                <button
                  onClick={() => onSelectIndustryDemo(selectedIndustry)}
                  className="w-full py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
                >
                  <span>Launch {selectedIndustry === 'construction' ? 'Metro Construction' : 'SRM College'} Demo</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
