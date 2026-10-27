import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Clock,
  Receipt,
  ShieldAlert,
  MessageSquareOff,
  Award,
  Bell,
  HardHat,
  Volume2,
  ChevronRight,
  MapPin,
  Sparkles
} from 'lucide-react';
import { ShiftTracker } from './ShiftTracker';
import { TransparentPayslips } from './TransparentPayslips';
import { SafetyReporting } from './SafetyReporting';
import { AnonymousFeedback } from './AnonymousFeedback';
import { SkillPassport } from './SkillPassport';
import { NotificationsCenter } from './NotificationsCenter';
import { speakText, stopSpeaking } from '../../lib/speech';

export const WorkerDashboard: React.FC = () => {
  const { currentUser, activeAttendance, notifications } = useAppState();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'shift' | 'payslips' | 'safety' | 'feedback' | 'skills' | 'notifications'>('shift');

  const unreadNotifsCount = notifications.filter(n => n.userId === currentUser.id && !n.read).length;

  const handleReadAloud = () => {
    let textToSpeak = `Worker Dashboard for ${currentUser.name}. `;
    if (activeAttendance) {
      textToSpeak += `You have an active shift in progress at ${activeAttendance.locationName}. `;
    } else {
      textToSpeak += `You are currently clocked out. `;
    }
    textToSpeak += `Your base hourly rate is ₹${currentUser.hourlyRate} per hour. Overtime is paid at 1.5 times the base rate.`;
    speakText(textToSpeak, language);
  };

  const navTabs = [
    { id: 'shift', label: t.worker.shiftTracking, icon: Clock, badge: activeAttendance ? 'Active' : undefined },
    { id: 'payslips', label: t.worker.payslips, icon: Receipt },
    { id: 'safety', label: t.worker.safetyReport, icon: ShieldAlert },
    { id: 'feedback', label: t.worker.anonymousFeedback, icon: MessageSquareOff },
    { id: 'skills', label: t.worker.skillPassport, icon: Award },
    { id: 'notifications', label: t.worker.notifications, icon: Bell, badgeCount: unreadNotifsCount }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Worker Header Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-sm"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  activeAttendance ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                }`}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-forest-900 border border-emerald-200">
                  {currentUser.industry === 'construction' ? 'Metro Construction Site' : 'SRM College Facilities'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser.jobTitle} • {currentUser.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {/* Audio Reader */}
            <button
              onClick={handleReadAloud}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
              title="Read status aloud in selected language"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{t.worker.readAloud}</span>
            </button>

            {/* Quick Status Indicator */}
            <div className="px-3.5 py-2 rounded-xl bg-forest-900 text-white text-xs font-bold flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${activeAttendance ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`}
              />
              <span>{activeAttendance ? 'Shift Running' : 'Shift Inactive'}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {navTabs.map((tab) => {
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
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-400 text-forest-950 font-extrabold animate-pulse">
                    {tab.badge}
                  </span>
                )}
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-rose-500 text-white font-extrabold">
                    {tab.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab View Container */}
        <div className="pt-2">
          {activeTab === 'shift' && <ShiftTracker />}
          {activeTab === 'payslips' && <TransparentPayslips />}
          {activeTab === 'safety' && <SafetyReporting />}
          {activeTab === 'feedback' && <AnonymousFeedback />}
          {activeTab === 'skills' && <SkillPassport />}
          {activeTab === 'notifications' && (
            <NotificationsCenter onNavigateTab={(tab) => setActiveTab(tab as any)} />
          )}
        </div>
      </div>
    </div>
  );
};
