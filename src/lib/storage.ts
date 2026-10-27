import {
  UserProfile,
  Shift,
  AttendanceRecord,
  Payslip,
  SafetyComplaint,
  AnonymousFeedback,
  SkillItem,
  SystemNotification,
  FatigueAlert
} from './types';
import {
  INITIAL_USERS,
  INITIAL_SHIFTS,
  INITIAL_ATTENDANCE,
  INITIAL_PAYSLIPS,
  INITIAL_COMPLAINTS,
  INITIAL_ANONYMOUS_FEEDBACK,
  INITIAL_SKILLS,
  INITIAL_NOTIFICATIONS,
  INITIAL_FATIGUE_ALERTS
} from './mockData';

const STORAGE_KEYS = {
  USERS: 'deadcroco_users',
  SHIFTS: 'deadcroco_shifts',
  ATTENDANCE: 'deadcroco_attendance',
  PAYSLIPS: 'deadcroco_payslips',
  COMPLAINTS: 'deadcroco_complaints',
  FEEDBACK: 'deadcroco_feedback',
  SKILLS: 'deadcroco_skills',
  NOTIFICATIONS: 'deadcroco_notifications',
  FATIGUE: 'deadcroco_fatigue',
  CURRENT_USER: 'deadcroco_current_user_id',
  ACTIVE_INDUSTRY: 'deadcroco_active_industry',
  LANGUAGE: 'deadcroco_selected_language'
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('deadcroco_state_change', { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

export const StorageService = {
  // Initialize storage if empty
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      saveToStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SHIFTS)) {
      saveToStorage(STORAGE_KEYS.SHIFTS, INITIAL_SHIFTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
      saveToStorage(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAYSLIPS)) {
      saveToStorage(STORAGE_KEYS.PAYSLIPS, INITIAL_PAYSLIPS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMPLAINTS)) {
      saveToStorage(STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
      saveToStorage(STORAGE_KEYS.FEEDBACK, INITIAL_ANONYMOUS_FEEDBACK);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
      saveToStorage(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FATIGUE)) {
      saveToStorage(STORAGE_KEYS.FATIGUE, INITIAL_FATIGUE_ALERTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, 'user-worker-1'); // Default to Ramesh
    }
  },

  resetAll() {
    saveToStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
    saveToStorage(STORAGE_KEYS.SHIFTS, INITIAL_SHIFTS);
    saveToStorage(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
    saveToStorage(STORAGE_KEYS.PAYSLIPS, INITIAL_PAYSLIPS);
    saveToStorage(STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
    saveToStorage(STORAGE_KEYS.FEEDBACK, INITIAL_ANONYMOUS_FEEDBACK);
    saveToStorage(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    saveToStorage(STORAGE_KEYS.FATIGUE, INITIAL_FATIGUE_ALERTS);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, 'user-worker-1');
  },

  // Users
  getUsers(): UserProfile[] {
    return getFromStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
  },
  getCurrentUserId(): string {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'user-worker-1';
  },
  setCurrentUserId(id: string) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, id);
    window.dispatchEvent(new CustomEvent('deadcroco_user_switched', { detail: { id } }));
  },

  // Shifts
  getShifts(): Shift[] {
    return getFromStorage(STORAGE_KEYS.SHIFTS, INITIAL_SHIFTS);
  },
  saveShifts(shifts: Shift[]) {
    saveToStorage(STORAGE_KEYS.SHIFTS, shifts);
  },
  addShift(shift: Shift) {
    const shifts = this.getShifts();
    shifts.unshift(shift);
    this.saveShifts(shifts);
  },

  // Attendance
  getAttendance(): AttendanceRecord[] {
    return getFromStorage(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  },
  saveAttendance(records: AttendanceRecord[]) {
    saveToStorage(STORAGE_KEYS.ATTENDANCE, records);
  },
  recordCheckIn(record: AttendanceRecord) {
    const list = this.getAttendance();
    list.unshift(record);
    this.saveAttendance(list);
  },
  recordCheckOut(id: string, checkOutTime: string, totalHours: number, regHours: number, otHours: number) {
    const list = this.getAttendance();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          checkOutTime,
          totalHours: Math.round(totalHours * 10) / 10,
          regularHours: Math.round(regHours * 10) / 10,
          overtimeHours: Math.round(otHours * 10) / 10,
          status: otHours > 0 ? ('overtime' as const) : ('completed' as const)
        };
      }
      return item;
    });
    this.saveAttendance(updated);
  },

  // Payslips
  getPayslips(): Payslip[] {
    return getFromStorage(STORAGE_KEYS.PAYSLIPS, INITIAL_PAYSLIPS);
  },
  savePayslips(payslips: Payslip[]) {
    saveToStorage(STORAGE_KEYS.PAYSLIPS, payslips);
  },

  // Safety Complaints
  getComplaints(): SafetyComplaint[] {
    return getFromStorage(STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  },
  saveComplaints(complaints: SafetyComplaint[]) {
    saveToStorage(STORAGE_KEYS.COMPLAINTS, complaints);
  },
  addComplaint(complaint: SafetyComplaint) {
    const complaints = this.getComplaints();
    complaints.unshift(complaint);
    this.saveComplaints(complaints);
  },
  updateComplaintStatus(id: string, status: SafetyComplaint['status'], resolutionNotes?: string) {
    const complaints = this.getComplaints();
    const updated = complaints.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status,
          adminResolutionNotes: resolutionNotes || c.adminResolutionNotes,
          updatedAt: new Date().toISOString(),
          resolvedAt: status === 'resolved' ? new Date().toISOString() : c.resolvedAt
        };
      }
      return c;
    });
    this.saveComplaints(updated);
  },

  // Anonymous Feedback
  getFeedback(): AnonymousFeedback[] {
    return getFromStorage(STORAGE_KEYS.FEEDBACK, INITIAL_ANONYMOUS_FEEDBACK);
  },
  addFeedback(item: AnonymousFeedback) {
    const feedback = this.getFeedback();
    feedback.unshift(item);
    saveToStorage(STORAGE_KEYS.FEEDBACK, feedback);
  },

  // Skills
  getSkills(): SkillItem[] {
    return getFromStorage(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
  },
  addSkill(skill: SkillItem) {
    const skills = this.getSkills();
    skills.unshift(skill);
    saveToStorage(STORAGE_KEYS.SKILLS, skills);
  },

  // Notifications
  getNotifications(): SystemNotification[] {
    return getFromStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },
  markNotificationRead(id: string) {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  // Fatigue Alerts
  getFatigueAlerts(): FatigueAlert[] {
    return getFromStorage(STORAGE_KEYS.FATIGUE, INITIAL_FATIGUE_ALERTS);
  },
  acknowledgeFatigueAlert(id: string) {
    const alerts = this.getFatigueAlerts();
    const updated = alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a);
    saveToStorage(STORAGE_KEYS.FATIGUE, updated);
  }
};
