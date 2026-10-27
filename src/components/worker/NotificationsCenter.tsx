import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, CheckCheck, ShieldAlert, Clock, Receipt, Info } from 'lucide-react';

interface NotificationsCenterProps {
  onNavigateTab: (tab: 'shift' | 'payslips' | 'safety' | 'feedback' | 'skills') => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({ onNavigateTab }) => {
  const { currentUser, notifications, markNotificationRead } = useAppState();
  const { t } = useLanguage();

  const userNotifications = notifications.filter(
    n => n.userId === currentUser.id || n.userId === 'all'
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'safety':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'shift':
        return <Clock className="w-4 h-4 text-emerald-600" />;
      case 'payslip':
        return <Receipt className="w-4 h-4 text-forest-800" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            {t.worker.notifications}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Workplace Announcements & Updates
          </h2>
        </div>
        <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Bell className="w-5 h-5" />
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {userNotifications.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">
            You are all caught up! No active notifications.
          </p>
        ) : (
          userNotifications.map((n) => (
            <div
              key={n.id}
              className={`py-4 flex items-start gap-4 transition rounded-2xl px-3 ${
                !n.read ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                {getIcon(n.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {n.message}
                </p>

                <div className="flex items-center gap-4 mt-2">
                  {n.actionUrl && (
                    <button
                      onClick={() => onNavigateTab(n.actionUrl as any)}
                      className="text-[11px] font-bold text-forest-800 hover:underline"
                    >
                      View Details →
                    </button>
                  )}
                  {!n.read && (
                    <button
                      onClick={() => markNotificationRead(n.id)}
                      className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      <CheckCheck className="w-3 h-3" />
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
