import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Award,
  Plus,
  Printer,
  CheckCircle,
  QrCode,
  Calendar,
  Briefcase,
  ShieldCheck,
  Building,
  X
} from 'lucide-react';
import { SkillItem } from '../../lib/types';
import { INITIAL_EXPERIENCE } from '../../lib/mockData';

export const SkillPassport: React.FC = () => {
  const { currentUser, skills, addSkill } = useAppState();
  const { t } = useLanguage();

  const userSkills = skills.filter(s => s.userId === currentUser.id);
  const userExperience = INITIAL_EXPERIENCE.filter(e => e.userId === currentUser.id);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPassportCardModal, setShowPassportCardModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Safety & Compliance');
  const [proficiency, setProficiency] = useState<SkillItem['proficiency']>('Advanced');
  const [certifiedBy, setCertifiedBy] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !certifiedBy) return;

    addSkill({
      title,
      category,
      proficiency,
      certifiedBy,
      certificateId: certificateId || `NSDC-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate
    });

    setTitle('');
    setCertifiedBy('');
    setCertificateId('');
    setShowAddModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            {t.worker.skillPassport}
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Portable Worker Credentials
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Your lifelong record of safety certifications and verified job-site competencies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Certification</span>
          </button>

          <button
            onClick={() => setShowPassportCardModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-forest-900 border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>Download / Print Passport</span>
          </button>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-gradient-to-r from-forest-950 to-forest-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
          />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl font-extrabold text-white">{currentUser.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Worker Profile
              </span>
            </div>
            <p className="text-xs text-emerald-200 font-medium">
              {currentUser.jobTitle} • {currentUser.department} ({currentUser.industry.toUpperCase()})
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-emerald-100/70 pt-1">
              <span>Employee ID: <strong>CR-EMP-2024</strong></span>
              <span>Emergency: <strong>{currentUser.emergencyContact}</strong></span>
              <span>Blood Group: <strong>{currentUser.bloodGroup}</strong></span>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/15 text-center hidden md:block">
            <QrCode className="w-16 h-16 text-emerald-300 mx-auto" />
            <span className="text-[10px] text-emerald-200 uppercase font-mono block mt-1">Scan to Verify</span>
          </div>
        </div>
      </div>

      {/* Certifications & Skills Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-700" />
          <span>Accredited Safety & Trade Skills ({userSkills.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userSkills.map((sk) => (
            <div
              key={sk.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-emerald-300 transition space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {sk.category}
                  </span>
                  <span className="text-[11px] font-extrabold text-forest-900 bg-slate-100 px-2 py-0.5 rounded-md">
                    {sk.proficiency}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-2.5">
                  {sk.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Issued by: <span className="font-semibold">{sk.certifiedBy}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono text-[10px] text-slate-400">{sk.certificateId}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience Section */}
      {userExperience.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Briefcase className="w-5 h-5 text-forest-800" />
            <span>Verified Work Experience Record</span>
          </h3>

          <div className="space-y-4">
            {userExperience.map((exp) => (
              <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                  <span className="text-xs font-semibold text-slate-500">{exp.duration}</span>
                </div>
                <p className="text-xs font-semibold text-emerald-800">{exp.organization}</p>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside pt-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Skill or Safety License</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSkill} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Certification Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scaffolding Inspection Level 2 or CPR First Responder"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Proficiency</label>
                  <select
                    value={proficiency}
                    onChange={(e) => setProficiency(e.target.value as SkillItem['proficiency'])}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Master">Master</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date Issued</label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Certifying Authority *</label>
                <input
                  type="text"
                  required
                  value={certifiedBy}
                  onChange={(e) => setCertifiedBy(e.target.value)}
                  placeholder="e.g. National Skill Development Corp, Red Cross"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Certificate / License ID</label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g. NSDC-2026-9921"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-forest-900 text-white font-bold text-xs shadow-md mt-2"
              >
                Save to Skill Passport
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Printable Passport Badge Modal */}
      {showPassportCardModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl printable-area">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
              <span className="text-xs font-bold text-emerald-800 uppercase">Printable Digital Credential</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-forest-900 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Passport</span>
                </button>
                <button onClick={() => setShowPassportCardModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Passport Card Document */}
            <div className="pt-6 space-y-6">
              <div className="border-2 border-forest-900 rounded-3xl p-6 bg-emerald-50/20 relative">
                <div className="flex items-start justify-between border-b pb-4 border-forest-900/20">
                  <div className="flex items-center gap-3">
                    <img src="/logo.webp" alt="logo" className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-lg font-black text-forest-950">dead.croco</h3>
                      <p className="text-[9px] font-extrabold tracking-widest text-emerald-800 uppercase">
                        OFFICIAL SKILL PASSPORT • UN SDG 8
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500">UID: CR-SKILL-2026</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-900 block mt-0.5">
                      VERIFIED HOLDER
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <img src={currentUser.avatar} alt="worker" className="w-16 h-16 rounded-xl object-cover border border-forest-800" />
                  <div className="flex-1">
                    <h4 className="text-base font-extrabold text-slate-900">{currentUser.name}</h4>
                    <p className="text-xs font-semibold text-forest-900">{currentUser.jobTitle}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.department} • {currentUser.industry.toUpperCase()}</p>
                  </div>
                  <QrCode className="w-14 h-14 text-forest-900 shrink-0" />
                </div>

                <div className="border-t border-forest-900/20 pt-3">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Verified Competencies:</h5>
                  <div className="space-y-1 text-xs">
                    {userSkills.map((s, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] py-1 border-b border-slate-100 last:border-none">
                        <span className="font-semibold text-slate-800">{s.title}</span>
                        <span className="text-emerald-800 font-bold">{s.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-4 text-[9px] text-slate-400 border-t border-forest-900/10 mt-4">
                  Issued under dead.croco decent work governance. Valid nationwide across accredited contractors.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
