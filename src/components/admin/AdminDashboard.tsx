import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Users,
  ShieldAlert,
  Zap,
  BarChart3,
  MessageSquareOff,
  Building2,
  HardHat,
  GraduationCap,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { SummaryCards } from './SummaryCards';
import { WorkerManagement } from './WorkerManagement';
import { SafetyManagement } from './SafetyManagement';
import { FatigueMonitoring } from './FatigueMonitoring';
import { WorkforceAnalytics } from './WorkforceAnalytics';

export const AdminDashboard: React.FC = () => {
  const { currentUser, feedback, resetAllDemoData, complaints } = useAppState();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'workers' | 'safety' | 'fatigue' | 'analytics' | 'feedback'>('workers');

  const openComplaintsCount = complaints.filter(c => c.status !== 'resolved').length;

  const adminTabs = [
    { id: 'workers', label: t.admin.workerManagement, icon: Users },
    { id: 'safety', label: t.admin.safetyConsole, icon: ShieldAlert, badge: openComplaintsCount > 0 ? `${openComplaintsCount} Open` : undefined },
    { id: 'fatigue', label: t.admin.fatigueMonitor, icon: Zap },
    { id: 'analytics', label: t.admin.workforceAnalytics, icon: BarChart3 },
    { id: 'feedback', label: 'Anonymous Feedback Feed', icon: MessageSquareOff, badge: `${feedback.length} Notes` },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-forest-900 text-white flex items-center justify-center font-bold text-xl shadow-md border border-forest-800">
              <Building2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Operations & Workforce Governance Console
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-forest-900 text-emerald-300">
                  Supervisor View
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Director: {currentUser.name} • Cross-Sector Operations (Metro Rail 4B & SRM Campus)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => {
                if (confirm('Reset all demo attendance, hazard reports, and shifts back to original sample data?')) {
                  resetAllDemoData();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
              title="Reset all demo data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-forest-800" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* 6 Executive Summary KPI Cards */}
        <SummaryCards />

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 border transition shrink-0 ${
                  isActive
                    ? 'bg-forest-900 text-white border-forest-900 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${
                      tab.id === 'safety' && openComplaintsCount > 0
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="pt-2">
          {activeTab === 'workers' && <WorkerManagement />}
          {activeTab === 'safety' && <SafetyManagement />}
          {activeTab === 'fatigue' && <FatigueMonitoring />}
          {activeTab === 'analytics' && <WorkforceAnalytics />}
          {activeTab === 'feedback' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                    Privacy-Shielded Worker Feedback
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Anonymous Insights Stream
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Identity decoupled: No worker IDs, names, or contact info are exposed.
                  </p>
                </div>
                <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-forest-800 flex items-center justify-center">
                  <MessageSquareOff className="w-5 h-5" />
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-5 rounded-2xl bg-[#F8FAF9] border border-slate-200 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 uppercase">
                          {fb.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                            fb.sentiment === 'urgent'
                              ? 'bg-rose-100 text-rose-900'
                              : fb.sentiment === 'positive'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {fb.sentiment}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
                        &ldquo;{fb.message}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Area: <strong className="text-slate-600">{fb.department} ({fb.industry.toUpperCase()})</strong></span>
                      <span>Source: <strong className="text-emerald-700">100% Anonymous</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
