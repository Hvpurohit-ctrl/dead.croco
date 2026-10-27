import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  MessageSquareOff,
  ShieldCheck,
  Send,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AnonymousFeedback as FeedbackType } from '../../lib/types';

export const AnonymousFeedback: React.FC = () => {
  const { currentUser, submitAnonymousFeedback } = useAppState();
  const { t } = useLanguage();

  const [category, setCategory] = useState<FeedbackType['category']>('facilities');
  const [department, setDepartment] = useState(currentUser.department);
  const [message, setMessage] = useState('');
  const [sentiment, setSentiment] = useState<FeedbackType['sentiment']>('neutral');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    submitAnonymousFeedback({
      department,
      category,
      message,
      sentiment
    });

    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Anonymity Shield Banner */}
      <div className="p-5 rounded-3xl bg-forest-900 text-white shadow-md flex items-start gap-4 border border-forest-800">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-forest-950 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>Identity Decoupling Guaranteed</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </h3>
          <p className="text-xs text-emerald-200/90 leading-relaxed">
            Your name, phone number, worker ID, and IP address are never recorded with this note. Site supervisors see only the department, category, and constructive text.
          </p>
        </div>
      </div>

      {/* Success Alert */}
      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Anonymous note submitted safely. It has been routed to the management review board.</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="pb-5 border-b border-slate-100">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            {t.worker.anonymousFeedback}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Speak Freely Without Retaliation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Help improve site conditions, canteen cleanliness, overtime notice periods, and supervisor conduct.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Feedback Focus Area
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FeedbackType['category'])}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="facilities">Facilities & Hygiene (Water, Rest Areas, Toilets)</option>
                <option value="workload">Workload & Overtime Notice Timing</option>
                <option value="safety">Safety Gear & Protection Protocols</option>
                <option value="management">Supervisor Conduct & Fair Treatment</option>
                <option value="fairness">Shift Allocation & Equality</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Work Area / Department (General)
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Scaffolding, Facilities, Sanitation"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Urgency / Tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSentiment('positive')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                  sentiment === 'positive'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Appreciation / Idea
              </button>
              <button
                type="button"
                onClick={() => setSentiment('neutral')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                  sentiment === 'neutral'
                    ? 'bg-slate-200 text-slate-900 border-slate-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                General Feedback
              </button>
              <button
                type="button"
                onClick={() => setSentiment('urgent')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                  sentiment === 'urgent'
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Urgent Problem
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Your Confidential Note *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain the situation in plain words. No names or identifying details will be attached..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-forest-900/20 transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span>{t.worker.submitFeedback}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
