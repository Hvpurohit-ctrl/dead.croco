import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldAlert,
  Camera,
  Mic,
  MicOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Tag,
  Eye,
  FileCheck2,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { HazardCategory, HazardSeverity } from '../../lib/types';
import { VoiceRecognitionService, speakText } from '../../lib/speech';

export const SafetyReporting: React.FC = () => {
  const { currentUser, complaints, submitComplaint } = useAppState();
  const { t, language } = useLanguage();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HazardCategory>('fall_risk');
  const [severity, setSeverity] = useState<HazardSeverity>('high');
  const [location, setLocation] = useState(
    currentUser.industry === 'construction'
      ? 'Metro Line 4 - Pier 18 East Level 4'
      : 'Science Complex - Academic Block B Room 304'
  );
  const [photoUrl, setPhotoUrl] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  // Filter complaints reported by this user or general reports in this industry
  const userReports = complaints.filter(
    c => c.reportedByUserId === currentUser.id || (!c.isAnonymous && c.reportedByName === currentUser.name)
  );

  const samplePhotos = [
    { label: 'Scaffolding/Fall Risk', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80' },
    { label: 'Electrical/Wiring Danger', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80' },
    { label: 'Chemical Spill Hazard', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80' }
  ];

  const handleVoiceInput = () => {
    const service = new VoiceRecognitionService();
    if (!service.isSupported) {
      // Friendly simulation if microphone permissions or Web Speech API is blocked
      setDescription(prev => prev + (prev ? ' ' : '') + 'Scaffolding joint loose on 4th tier. Needs emergency safety inspection before shift continues.');
      return;
    }

    if (isListening) {
      service.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      service.startListening(
        (transcript) => {
          setDescription(transcript);
        },
        (err) => {
          console.warn('Voice recognition error, fallback text', err);
          setIsListening(false);
          setDescription('Observed safety hazard near work zone. Supervisor review requested.');
        },
        () => {
          setIsListening(false);
        },
        language
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const code = submitComplaint({
      title,
      description,
      category,
      severity,
      location,
      photoUrl,
      isAnonymous
    });

    setSubmittedCode(code);
    setTitle('');
    setDescription('');
    setPhotoUrl('');

    // Announce via text-to-speech
    speakText(`Hazard reported with tracking code ${code}`, language);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Submitted</span>;
      case 'under_review':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">Under Review</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">In Progress</span>;
      case 'resolved':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Resolved</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Success Banner */}
      {submittedCode && (
        <div className="p-5 rounded-3xl bg-forest-900 text-white shadow-xl flex items-center justify-between border border-forest-800 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-forest-950 flex items-center justify-center font-bold">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Hazard Filed Successfully!</h3>
              <p className="text-xs text-emerald-200">
                Unique Tracking ID: <strong className="font-mono text-emerald-400">{submittedCode}</strong>. Site supervisors have been alerted.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSubmittedCode(null)}
            className="px-3 py-1.5 rounded-lg bg-forest-800 text-emerald-200 text-xs font-semibold hover:bg-forest-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2 Column Layout: Report Form + My Tracked Hazards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Report Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                {t.worker.safetyReport}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {t.worker.reportHazard}
              </h2>
            </div>
            <span className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 pt-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.safety.hazardTitle} *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Unbolted railing on 4th floor scaffolding or chemical fume leak"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Category & Severity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.safety.category}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as HazardCategory)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="fall_risk">Fall Risk / Unstable Platform</option>
                  <option value="electrical">Exposed Electrical / Wiring</option>
                  <option value="equipment">Heavy Machinery / Vehicle Danger</option>
                  <option value="chemical">Toxic Chemical / Fume Leak</option>
                  <option value="ppe">Missing Mandatory PPE</option>
                  <option value="sanitation">Sanitation / Unsafe Drinking Water</option>
                  <option value="physical">Physical Trip / Slip Hazard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.safety.severity}
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as HazardSeverity)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="low">Low — Routine Maintenance</option>
                  <option value="medium">Medium — Caution Required</option>
                  <option value="high">High — Dangerous Condition</option>
                  <option value="critical">Critical — Immediate Work Stop Risk</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.safety.location} *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Exact zone, pier number, room number, or floor"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Description with Voice Input Button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Detailed Hazard Description *
                </label>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                    isListening
                      ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5 text-rose-600" /> : <Mic className="w-3.5 h-3.5 text-emerald-700" />}
                  <span>{isListening ? t.worker.listening : t.worker.voiceInput}</span>
                </button>
              </div>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what is dangerous, where the fault is, and whether work should be halted..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Photo Attachment (Sample Selector or URL) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t.safety.photoAttachment}
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {samplePhotos.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhotoUrl(p.url)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      photoUrl === p.url
                        ? 'bg-forest-900 text-white border-forest-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Attach {p.label}
                  </button>
                ))}
              </div>

              {photoUrl && (
                <div className="relative mt-2 w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                  <img src={photoUrl} alt="Hazard preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Anonymous Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Report Anonymously</span>
                <span className="text-[11px] text-slate-500">Your name will not be shown to supervisors.</span>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-forest-900/20 transition flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              <span>Submit Hazard Report</span>
            </button>
          </form>
        </div>

        {/* Right 5 Columns: My Safety Reports & Status Progression */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-forest-800" />
                <span>My Reported Hazards</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {userReports.length} Reports
              </span>
            </div>

            <div className="mt-4 space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {userReports.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">
                  No hazards filed yet. Any unsafe conditions reported will appear here with live resolution updates.
                </p>
              ) : (
                userReports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-2xl bg-[#F8FAF9] border border-slate-200 hover:border-emerald-300 transition space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-forest-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {rep.complaintCode}
                      </span>
                      {getStatusBadge(rep.status)}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{rep.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{rep.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[150px]">{rep.location}</span>
                      </span>
                      <span className="capitalize font-semibold text-amber-800">{rep.severity} Severity</span>
                    </div>

                    {/* Admin Resolution Note if present */}
                    {rep.adminResolutionNotes && (
                      <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs">
                        <span className="font-bold text-emerald-950 block text-[11px] mb-0.5">
                          Supervisor Resolution Note:
                        </span>
                        <p className="text-emerald-900 leading-relaxed text-[11px]">
                          {rep.adminResolutionNotes}
                        </p>
                        {rep.resolvedAt && (
                          <span className="text-[10px] text-emerald-700 block mt-1">
                            Resolved: {new Date(rep.resolvedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
