import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  History,
  Timer,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const ShiftTracker: React.FC = () => {
  const { currentUser, activeAttendance, attendance, checkIn, checkOut, shifts } = useAppState();
  const { t } = useLanguage();

  const [locationName, setLocationName] = useState<string>(
    currentUser.industry === 'construction'
      ? 'Metro Line 4 - Pier 18 East Gate'
      : 'Science Complex - Academic Block B'
  );
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Filter attendance for current user
  const userAttendance = attendance.filter(a => a.userId === currentUser.id);

  // Live timer for active shift
  useEffect(() => {
    if (!activeAttendance) {
      setElapsedSeconds(0);
      return;
    }

    const checkInMs = new Date(activeAttendance.checkInTime).getTime();

    const updateTimer = () => {
      const nowMs = Date.now();
      const diffSec = Math.max(0, Math.floor((nowMs - checkInMs) / 1000));
      setElapsedSeconds(diffSec);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeAttendance]);

  const formatTimer = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
  };

  const handleCheckIn = () => {
    const result = checkIn(locationName);
    if (result.success) {
      setToastMsg({ text: result.message, type: 'success' });
    } else {
      setToastMsg({ text: result.message, type: 'error' });
    }
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleCheckOut = () => {
    const result = checkOut();
    if (result.success) {
      setToastMsg({ text: result.message, type: 'success' });
    } else {
      setToastMsg({ text: result.message, type: 'error' });
    }
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Calculate totals
  const totalCompletedHours = userAttendance
    .filter(a => a.checkOutTime)
    .reduce((acc, curr) => acc + (curr.totalHours || 0), 0);

  const totalOvertimeHours = userAttendance
    .filter(a => a.checkOutTime)
    .reduce((acc, curr) => acc + (curr.overtimeHours || 0), 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-lg transition-all animate-in fade-in slide-in-from-top-2 ${
            toastMsg.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border border-emerald-700'
              : 'bg-rose-900 text-rose-100 border border-rose-700'
          }`}
        >
          {toastMsg.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Main Check-In / Check-Out Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {t.worker.shiftTracking}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {activeAttendance ? t.worker.alreadyCheckedIn : 'Ready to Start Shift'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 pt-0.5">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Location: {activeAttendance?.locationName || locationName}</span>
            </p>
          </div>

          {/* Active Shift Live Timer or Idle Status */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-center sm:text-right min-w-[220px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {activeAttendance ? t.worker.shiftDuration : 'Shift Status'}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-forest-950 mt-1">
              {activeAttendance ? formatTimer(elapsedSeconds) : 'Clocked Out'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {activeAttendance
                ? `Started at ${new Date(activeAttendance.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Standard workday: 8 hrs (OT at 1.5x)'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Location input if not clocked in */}
          {!activeAttendance ? (
            <div className="w-full sm:max-w-md">
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Site / Building Checkpoint
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter site location or building name"
                />
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Double check-in protection is active. Overtime starts after 8 hours.</span>
            </div>
          )}

          {/* Big Touch-Friendly Action Button */}
          <div className="w-full sm:w-auto">
            {activeAttendance ? (
              <button
                onClick={handleCheckOut}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-lg shadow-rose-600/25 transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                <span>{t.worker.checkOut}</span>
              </button>
            ) : (
              <button
                onClick={handleCheckIn}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-extrabold text-base shadow-lg shadow-forest-900/25 transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>{t.worker.checkIn}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Shifts Recorded
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {userAttendance.length} Shifts
          </div>
          <p className="text-xs text-emerald-700 font-medium mt-1">
            100% geo-verified attendance
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Logged Working Hours
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {totalCompletedHours.toFixed(1)} hrs
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Rate: ₹{currentUser.hourlyRate}/hr base
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Overtime Logged (1.5x)
          </span>
          <div className="text-2xl font-black text-emerald-800 mt-1 font-mono">
            +{totalOvertimeHours.toFixed(1)} hrs
          </div>
          <p className="text-xs text-emerald-700 font-medium mt-1">
            Rate: ₹{(currentUser.hourlyRate * 1.5).toFixed(1)}/hr OT
          </p>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-forest-800" />
            <h3 className="text-lg font-bold text-slate-900">Attendance & Overtime Log</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">Past 30 Days</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3">Date</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Check-In</th>
                <th className="pb-3">Check-Out</th>
                <th className="pb-3">Total Hours</th>
                <th className="pb-3">Overtime</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userAttendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 font-bold text-slate-900">{rec.date}</td>
                  <td className="py-3.5 text-slate-600 max-w-[180px] truncate">{rec.locationName}</td>
                  <td className="py-3.5 text-slate-600 font-mono">
                    {new Date(rec.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3.5 text-slate-600 font-mono">
                    {rec.checkOutTime
                      ? new Date(rec.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : <span className="text-emerald-600 font-bold animate-pulse">In Progress</span>}
                  </td>
                  <td className="py-3.5 font-bold font-mono text-slate-900">
                    {rec.totalHours ? `${rec.totalHours} hrs` : '--'}
                  </td>
                  <td className="py-3.5 font-bold font-mono text-emerald-700">
                    {rec.overtimeHours > 0 ? `+${rec.overtimeHours} hrs` : '0.0 hrs'}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        rec.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                          : rec.status === 'overtime'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {rec.status === 'active' ? 'Active' : rec.status === 'overtime' ? 'OT Recorded' : 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
