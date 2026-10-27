import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Shift,
  AttendanceRecord,
  Payslip,
  SafetyComplaint,
  AnonymousFeedback,
  SkillItem,
  SystemNotification,
  FatigueAlert,
  IndustryType,
  HazardCategory,
  HazardSeverity,
  HazardStatus
} from '../lib/types';
import { StorageService } from '../lib/storage';

interface AppStateContextType {
  currentUser: UserProfile;
  users: UserProfile[];
  shifts: Shift[];
  attendance: AttendanceRecord[];
  payslips: Payslip[];
  complaints: SafetyComplaint[];
  feedback: AnonymousFeedback[];
  skills: SkillItem[];
  notifications: SystemNotification[];
  fatigueAlerts: FatigueAlert[];
  activeAttendance: AttendanceRecord | null;
  activeIndustry: IndustryType;
  switchUser: (userId: string) => void;
  switchIndustry: (industry: IndustryType) => void;
  checkIn: (locationName: string) => { success: boolean; message: string };
  checkOut: () => { success: boolean; message: string };
  submitComplaint: (data: {
    title: string;
    description: string;
    category: HazardCategory;
    severity: HazardSeverity;
    location: string;
    photoUrl?: string;
    isAnonymous: boolean;
  }) => string;
  updateComplaintStatus: (id: string, status: HazardStatus, resolutionNotes?: string) => void;
  submitAnonymousFeedback: (data: {
    department: string;
    category: AnonymousFeedback['category'];
    message: string;
    sentiment?: AnonymousFeedback['sentiment'];
  }) => void;
  addSkill: (data: Omit<SkillItem, 'id' | 'userId' | 'verified'>) => void;
  createShift: (shiftData: Omit<Shift, 'id' | 'status'>) => void;
  acknowledgeFatigueAlert: (id: string) => void;
  markNotificationRead: (id: string) => void;
  resetAllDemoData: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize storage
  useEffect(() => {
    StorageService.init();
  }, []);

  const [users, setUsers] = useState<UserProfile[]>(() => StorageService.getUsers());
  const [currentUserId, setCurrentUserId] = useState<string>(() => StorageService.getCurrentUserId());
  const [shifts, setShifts] = useState<Shift[]>(() => StorageService.getShifts());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => StorageService.getAttendance());
  const [payslips, setPayslips] = useState<Payslip[]>(() => StorageService.getPayslips());
  const [complaints, setComplaints] = useState<SafetyComplaint[]>(() => StorageService.getComplaints());
  const [feedback, setFeedback] = useState<AnonymousFeedback[]>(() => StorageService.getFeedback());
  const [skills, setSkills] = useState<SkillItem[]>(() => StorageService.getSkills());
  const [notifications, setNotifications] = useState<SystemNotification[]>(() => StorageService.getNotifications());
  const [fatigueAlerts, setFatigueAlerts] = useState<FatigueAlert[]>(() => StorageService.getFatigueAlerts());

  const currentUser = users.find(u => u.id === currentUserId) || users[0];
  const [activeIndustry, setActiveIndustry] = useState<IndustryType>(currentUser.industry);

  // Sync state when custom events fire
  const refreshState = () => {
    setUsers(StorageService.getUsers());
    setShifts(StorageService.getShifts());
    setAttendance(StorageService.getAttendance());
    setPayslips(StorageService.getPayslips());
    setComplaints(StorageService.getComplaints());
    setFeedback(StorageService.getFeedback());
    setSkills(StorageService.getSkills());
    setNotifications(StorageService.getNotifications());
    setFatigueAlerts(StorageService.getFatigueAlerts());
  };

  useEffect(() => {
    const handleStateChange = () => refreshState();
    window.addEventListener('deadcroco_state_change', handleStateChange);
    return () => window.removeEventListener('deadcroco_state_change', handleStateChange);
  }, []);

  // Find if current worker is clocked in
  const activeAttendance = attendance.find(
    a => a.userId === currentUser.id && a.status === 'active' && !a.checkOutTime
  ) || null;

  const switchUser = (userId: string) => {
    StorageService.setCurrentUserId(userId);
    setCurrentUserId(userId);
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      setActiveIndustry(targetUser.industry);
    }
  };

  const switchIndustry = (industry: IndustryType) => {
    setActiveIndustry(industry);
  };

  // Check In
  const checkIn = (locationName: string): { success: boolean; message: string } => {
    if (activeAttendance) {
      return { success: false, message: 'You already have an active shift in progress!' };
    }

    const todayDate = new Date().toISOString().split('T')[0];
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      userId: currentUser.id,
      date: todayDate,
      checkInTime: new Date().toISOString(),
      totalHours: 0,
      regularHours: 0,
      overtimeHours: 0,
      status: 'active',
      locationName: locationName || `${currentUser.industry.toUpperCase()} Site Checkpoint 1`,
      notes: 'Mobile GPS Verified Check-in.'
    };

    StorageService.recordCheckIn(newRecord);
    refreshState();
    return { success: true, message: 'Shift checked in successfully!' };
  };

  // Check Out
  const checkOut = (): { success: boolean; message: string } => {
    if (!activeAttendance) {
      return { success: false, message: 'No active shift found to check out from.' };
    }

    const checkOutTime = new Date().toISOString();
    const startTime = new Date(activeAttendance.checkInTime).getTime();
    const endTime = new Date(checkOutTime).getTime();
    const durationHours = Math.max(0.1, (endTime - startTime) / (1000 * 60 * 60));

    const regHours = Math.min(8, durationHours);
    const otHours = Math.max(0, durationHours - 8);

    StorageService.recordCheckOut(activeAttendance.id, checkOutTime, durationHours, regHours, otHours);
    refreshState();
    return {
      success: true,
      message: `Shift ended! Total: ${durationHours.toFixed(1)} hrs (Standard: ${regHours.toFixed(1)} hrs, OT: ${otHours.toFixed(1)} hrs)`
    };
  };

  // Submit Safety Complaint
  const submitComplaint = (data: {
    title: string;
    description: string;
    category: HazardCategory;
    severity: HazardSeverity;
    location: string;
    photoUrl?: string;
    isAnonymous: boolean;
  }): string => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const complaintCode = `CR-SAFE-${randomCode}`;

    const newComplaint: SafetyComplaint = {
      id: `safe-${Date.now()}`,
      complaintCode,
      reportedByUserId: currentUser.id,
      reportedByName: data.isAnonymous ? 'Anonymous Reporter' : currentUser.name,
      isAnonymous: data.isAnonymous,
      industry: currentUser.industry,
      title: data.title,
      description: data.description,
      category: data.category,
      severity: data.severity,
      location: data.location,
      photoUrl: data.photoUrl || (data.category === 'fall_risk' 
        ? 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80' 
        : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'),
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    StorageService.addComplaint(newComplaint);
    refreshState();
    return complaintCode;
  };

  // Update Hazard Status (Admin)
  const updateComplaintStatus = (id: string, status: HazardStatus, resolutionNotes?: string) => {
    StorageService.updateComplaintStatus(id, status, resolutionNotes);
    refreshState();
  };

  // Anonymous Feedback (Strict identity decoupling)
  const submitAnonymousFeedback = (data: {
    department: string;
    category: AnonymousFeedback['category'];
    message: string;
    sentiment?: AnonymousFeedback['sentiment'];
  }) => {
    const feedbackItem: AnonymousFeedback = {
      id: `anon-${Date.now()}`,
      industry: currentUser.industry,
      department: data.department,
      category: data.category,
      sentiment: data.sentiment || 'neutral',
      message: data.message,
      createdAt: new Date().toISOString()
    };

    StorageService.addFeedback(feedbackItem);
    refreshState();
  };

  // Add Skill
  const addSkill = (data: Omit<SkillItem, 'id' | 'userId' | 'verified'>) => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      userId: currentUser.id,
      ...data,
      verified: true
    };
    StorageService.addSkill(newSkill);
    refreshState();
  };

  // Create Shift (Admin)
  const createShift = (shiftData: Omit<Shift, 'id' | 'status'>) => {
    const newShift: Shift = {
      id: `shift-${Date.now()}`,
      ...shiftData,
      status: 'scheduled'
    };
    StorageService.addShift(newShift);
    refreshState();
  };

  const acknowledgeFatigueAlert = (id: string) => {
    StorageService.acknowledgeFatigueAlert(id);
    refreshState();
  };

  const markNotificationRead = (id: string) => {
    StorageService.markNotificationRead(id);
    refreshState();
  };

  const resetAllDemoData = () => {
    StorageService.resetAll();
    refreshState();
  };

  return (
    <AppStateContext.Provider
      value={{
        currentUser,
        users,
        shifts,
        attendance,
        payslips,
        complaints,
        feedback,
        skills,
        notifications,
        fatigueAlerts,
        activeAttendance,
        activeIndustry,
        switchUser,
        switchIndustry,
        checkIn,
        checkOut,
        submitComplaint,
        updateComplaintStatus,
        submitAnonymousFeedback,
        addSkill,
        createShift,
        acknowledgeFatigueAlert,
        markNotificationRead,
        resetAllDemoData
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
