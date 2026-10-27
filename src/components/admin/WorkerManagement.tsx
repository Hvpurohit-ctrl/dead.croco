import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import {
  Users,
  Search,
  Filter,
  Plus,
  Clock,
  MapPin,
  Calendar,
  X,
  CheckCircle,
  HardHat,
  GraduationCap
} from 'lucide-react';
import { IndustryType, Shift } from '../../lib/types';

export const WorkerManagement: React.FC = () => {
  const { users, shifts, attendance, createShift } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<'all' | IndustryType>('all');
  const [showShiftModal, setShowShiftModal] = useState(false);

  // New Shift Form State
  const [assignedWorkerId, setAssignedWorkerId] = useState(users[0]?.id || '');
  const [shiftTitle, setShiftTitle] = useState('');
  const [shiftDate, setShiftDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [expectedHours, setExpectedHours] = useState(8);
  const [location, setLocation] = useState('Metro Line 4 - Pier 19 West');
  const [notes, setNotes] = useState('Safety gear check mandatory before starting.');

  // Filtered workers list
  const filteredWorkers = users.filter((u) => {
    if (u.role !== 'worker') return false;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || u.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const handleCreateShift = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedUser = users.find(u => u.id === assignedWorkerId);
    if (!assignedUser || !shiftTitle) return;

    createShift({
      userId: assignedWorkerId,
      organizationId: assignedUser.industry === 'construction' ? 'org-metro-construction' : 'org-srm-college',
      industry: assignedUser.industry,
      title: shiftTitle,
      date: shiftDate,
      startTime,
      endTime,
      expectedHours,
      location,
      notes
    });

    setShiftTitle('');
    setShowShiftModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by worker name, role, or department..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Industry Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setIndustryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                industryFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              All Sectors
            </button>
            <button
              onClick={() => setIndustryFilter('construction')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                industryFilter === 'construction' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 text-emerald-700" />
              <span>Construction</span>
            </button>
            <button
              onClick={() => setIndustryFilter('college')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                industryFilter === 'college' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
              <span>Colleges</span>
            </button>
          </div>
        </div>

        {/* Schedule Shift Button */}
        <button
          onClick={() => setShowShiftModal(true)}
          className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition shrink-0"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Create & Assign Shift</span>
        </button>
      </div>

      {/* Workers Roster Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-forest-800" />
            <span>Worker Directory & Assignment Roster ({filteredWorkers.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Real-time status synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3">Worker Details</th>
                <th className="pb-3">Sector & Department</th>
                <th className="pb-3">Base Rate</th>
                <th className="pb-3">Current Shift Status</th>
                <th className="pb-3">Total Shifts</th>
                <th className="pb-3">Emergency Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWorkers.map((w) => {
                const isClockedIn = attendance.some(a => a.userId === w.id && a.status === 'active' && !a.checkOutTime);
                const userShiftCount = shifts.filter(s => s.userId === w.id).length;

                return (
                  <tr key={w.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={w.avatar}
                          alt={w.name}
                          className="w-9 h-9 rounded-full object-cover border border-emerald-300"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{w.name}</p>
                          <p className="text-[11px] text-slate-500">{w.jobTitle}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="font-semibold text-slate-800 block capitalize">{w.industry}</span>
                      <span className="text-[11px] text-slate-500">{w.department}</span>
                    </td>

                    <td className="py-4 font-mono font-bold text-slate-800">
                      ₹{w.hourlyRate}/hr
                      <span className="text-[10px] text-slate-400 block font-normal">(₹{(w.hourlyRate * 1.5).toFixed(0)}/hr OT)</span>
                    </td>

                    <td className="py-4">
                      {isClockedIn ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1.5 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          On Duty
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                          Off Shift
                        </span>
                      )}
                    </td>

                    <td className="py-4 font-mono font-bold text-slate-700">
                      {userShiftCount} scheduled
                    </td>

                    <td className="py-4 text-[11px] text-slate-600">
                      {w.emergencyContact || 'Verified on file'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Shift Modal */}
      {showShiftModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-forest-800" />
                <span>Schedule New Shift</span>
              </h3>
              <button onClick={() => setShowShiftModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShift} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign Worker *</label>
                <select
                  value={assignedWorkerId}
                  onChange={(e) => setAssignedWorkerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {users.filter(u => u.role === 'worker').map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.industry.toUpperCase()} • {w.jobTitle})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Shift Title *</label>
                <input
                  type="text"
                  required
                  value={shiftTitle}
                  onChange={(e) => setShiftTitle(e.target.value)}
                  placeholder="e.g. Scaffolding Deck Assembly or Night Security Patrol"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Shift Date</label>
                  <input
                    type="date"
                    value={shiftDate}
                    onChange={(e) => setShiftDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expected Hours</label>
                  <input
                    type="number"
                    min={1}
                    max={16}
                    value={expectedHours}
                    onChange={(e) => setExpectedHours(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Site / Campus Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Safety & Operational Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-forest-900 text-white font-bold text-xs sm:text-sm shadow-md transition hover:bg-forest-800"
                >
                  Confirm & Schedule Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
