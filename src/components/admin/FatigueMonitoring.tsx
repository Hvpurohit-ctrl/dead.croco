import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Zap,
  AlertTriangle,
  Clock,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  Calendar,
  UserCheck
} from 'lucide-react';

export const FatigueMonitoring: React.FC = () => {
  const { fatigueAlerts, acknowledgeFatigueAlert } = useAppState();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Prominent Operational Disclaimer Box */}
      <div className="p-5 rounded-3xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-amber-950 flex items-center justify-center shrink-0">
          <HelpCircle className="w-5 h-5 text-white" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-extrabold text-amber-900">
            Rule-Based Operational Safeguards
          </h3>
          <p className="text-xs text-amber-800 leading-relaxed">
            {t.admin.ruleWarningNote} These alerts are triggered algorithmically by shift scheduling rules (e.g. shifts exceeding 12 continuous hours, insufficient turnaround rest under 8 hours, or 7 consecutive shift rotations) to prevent human error and ensure fair rest.
          </p>
        </div>
      </div>

      {/* Rules Legend Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-forest-800" />
          <span>Active Fatigue Safeguard Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-slate-200">
            <span className="font-bold text-forest-900 block mb-1">Rule #1: Max Daily Shift (&gt;12 hrs)</span>
            <p className="text-slate-600 leading-relaxed">
              Any shift exceeding 12 continuous hours requires mandatory relief operator rotation and admin authorization.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-slate-200">
            <span className="font-bold text-forest-900 block mb-1">Rule #2: Mandatory Turnaround (&lt;8 hrs rest)</span>
            <p className="text-slate-600 leading-relaxed">
              Less than 8 hours rest between back-to-back shifts triggers an automated schedule conflict warning.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-slate-200">
            <span className="font-bold text-forest-900 block mb-1">Rule #3: Consecutive Shift Streaks (7+ days)</span>
            <p className="text-slate-600 leading-relaxed">
              Working 7 consecutive days without a mandatory 24-hour restorative rest window requires schedule reallocation.
            </p>
          </div>
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <span>Flagged Workforce Fatigue Warnings ({fatigueAlerts.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Policy violation tracker</span>
        </div>

        <div className="space-y-4">
          {fatigueAlerts.map((fa) => (
            <div
              key={fa.id}
              className={`p-5 rounded-2xl border transition space-y-3 ${
                fa.severity === 'critical'
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      fa.severity === 'critical'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {fa.severity} Risk
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {fa.workerName} ({fa.department} • {fa.industry.toUpperCase()})
                  </h4>
                </div>

                <span className="text-xs font-semibold text-slate-500">
                  Detected: {new Date(fa.detectedAt).toLocaleDateString()}
                </span>
              </div>

              {/* Rule Violated */}
              <div className="p-3 bg-white/90 rounded-xl border border-slate-200/80 text-xs">
                <span className="font-bold text-slate-900 block text-xs mb-1">
                  {fa.ruleViolated}
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {fa.details}
                </p>
              </div>

              {/* Recommendation & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="text-xs text-slate-700">
                  <strong className="text-forest-900">Recommended Operational Action:</strong> {fa.recommendedAction}
                </div>

                <div className="shrink-0">
                  {fa.acknowledged ? (
                    <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold inline-flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Supervisor Reviewed
                    </span>
                  ) : (
                    <button
                      onClick={() => acknowledgeFatigueAlert(fa.id)}
                      className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-sm transition"
                    >
                      Acknowledge & Adjust Schedule
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
