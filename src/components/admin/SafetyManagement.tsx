import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  MapPin,
  ExternalLink,
  MessageSquare,
  X,
  FileCheck2
} from 'lucide-react';
import { HazardSeverity, HazardStatus, SafetyComplaint } from '../../lib/types';

export const SafetyManagement: React.FC = () => {
  const { complaints, updateComplaintStatus } = useAppState();

  const [severityFilter, setSeverityFilter] = useState<'all' | HazardSeverity>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | HazardStatus>('all');
  const [selectedComplaint, setSelectedComplaint] = useState<SafetyComplaint | null>(null);

  // Resolution modal state
  const [modalStatus, setModalStatus] = useState<HazardStatus>('in_progress');
  const [resolutionNotes, setResolutionNotes] = useState('');

  const filteredComplaints = complaints.filter(c => {
    const matchesSeverity = severityFilter === 'all' || c.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSeverity && matchesStatus;
  });

  const criticalCount = complaints.filter(c => c.status !== 'resolved' && (c.severity === 'critical' || c.severity === 'high')).length;

  const handleOpenActionModal = (complaint: SafetyComplaint) => {
    setSelectedComplaint(complaint);
    setModalStatus(complaint.status);
    setResolutionNotes(complaint.adminResolutionNotes || '');
  };

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    updateComplaintStatus(selectedComplaint.id, modalStatus, resolutionNotes);
    setSelectedComplaint(null);
  };

  return (
    <div className="space-y-6">
      {/* Critical Hazard Alert Banner if any exist */}
      {criticalCount > 0 && (
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-300 text-rose-950 flex items-start justify-between gap-4 shadow-sm animate-pulse">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-rose-900">
                Action Required: {criticalCount} High / Critical Hazard Reports Unresolved
              </h3>
              <p className="text-xs text-rose-800/90 mt-0.5 leading-relaxed">
                Site safety regulations require rapid triage within 2 hours. Review attached photos and dispatch remediation crews below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Workplace Risk Remediation
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Safety Hazard Triage Console
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('submitted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                statusFilter === 'submitted' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              New
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                statusFilter === 'in_progress' ? 'bg-white text-purple-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                statusFilter === 'resolved' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Resolved
            </button>
          </div>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical Only</option>
            <option value="high">High Only</option>
            <option value="medium">Medium Only</option>
            <option value="low">Low Only</option>
          </select>
        </div>
      </div>

      {/* Safety Complaints Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3">Tracking Code</th>
                <th className="pb-3">Hazard Details</th>
                <th className="pb-3">Location & Sector</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Reported By</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No hazard reports matching current filters.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 font-mono font-bold text-forest-900">
                      {c.complaintCode}
                    </td>

                    <td className="py-4 max-w-[260px]">
                      <p className="font-bold text-slate-900">{c.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{c.description}</p>
                      {c.photoUrl && (
                        <span className="text-[10px] text-emerald-700 font-semibold inline-flex items-center gap-1 mt-0.5">
                          Photo Attached
                        </span>
                      )}
                    </td>

                    <td className="py-4">
                      <span className="font-semibold text-slate-800 block truncate max-w-[180px]">{c.location}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">{c.industry}</span>
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          c.severity === 'critical'
                            ? 'bg-rose-100 text-rose-900 animate-pulse'
                            : c.severity === 'high'
                            ? 'bg-amber-100 text-amber-900'
                            : c.severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-900'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {c.severity}
                      </span>
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          c.status === 'submitted'
                            ? 'bg-blue-100 text-blue-800'
                            : c.status === 'under_review'
                            ? 'bg-amber-100 text-amber-900'
                            : c.status === 'in_progress'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4 text-xs text-slate-600">
                      {c.isAnonymous ? (
                        <span className="font-semibold text-slate-400 italic">Anonymous Worker</span>
                      ) : (
                        <span className="font-semibold text-slate-800">{c.reportedByName}</span>
                      )}
                    </td>

                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleOpenActionModal(c)}
                        className="px-3.5 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-sm transition"
                      >
                        Update / Resolve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action / Resolution Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {selectedComplaint.complaintCode}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Remediation & Resolution Action
                </h3>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">{selectedComplaint.title}</h4>
                <p className="text-slate-600 leading-relaxed">{selectedComplaint.description}</p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>Location: <strong>{selectedComplaint.location}</strong></span>
                  <span>Category: <strong>{selectedComplaint.category}</strong></span>
                </div>
              </div>

              {/* Photo Attachment View */}
              {selectedComplaint.photoUrl && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Attached Incident Photo</label>
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                    <img
                      src={selectedComplaint.photoUrl}
                      alt="Incident proof"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <form onSubmit={handleSaveResolution} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Update Status</label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as HazardStatus)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="submitted">Submitted (New)</option>
                    <option value="under_review">Under Review</option>
                    <option value="in_progress">In Progress (Crews Dispatched)</option>
                    <option value="resolved">Resolved (Hazard Fully Cleared)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Supervisor Resolution Notes * (Shown to worker)
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Document actions taken (e.g. Scaffolding kick-plates replaced and certified safe by site safety inspector)..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-forest-900 text-white font-bold text-xs sm:text-sm shadow-md transition hover:bg-forest-800"
                  >
                    Save & Broadcast Resolution
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
