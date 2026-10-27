export type IndustryType = 'construction' | 'college' | 'hospital' | 'factory';
export type UserRole = 'worker' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  industry: IndustryType;
  department: string;
  jobTitle: string;
  avatar: string;
  joinDate: string;
  hourlyRate: number;
  baseSalary: number;
  emergencyContact?: string;
  bloodGroup?: string;
}

export interface Shift {
  id: string;
  userId: string;
  organizationId: string;
  industry: IndustryType;
  title: string;
  date: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  expectedHours: number;
  location: string;
  status: 'scheduled' | 'active' | 'completed' | 'missed';
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  shiftId?: string;
  userId: string;
  date: string;
  checkInTime: string; // ISO string
  checkOutTime?: string; // ISO string
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  status: 'active' | 'completed' | 'overtime';
  locationName: string;
  notes?: string;
}

export interface PayslipDeductions {
  providentFund: number;
  esiHealthcare: number;
  welfareCess: number;
  advanceDeduction: number;
}

export interface Payslip {
  id: string;
  userId: string;
  userName: string;
  jobTitle: string;
  department: string;
  industry: IndustryType;
  monthYear: string; // e.g. "October 2026"
  baseRatePerHour: number;
  regularHours: number;
  regularPay: number;
  overtimeHours: number;
  overtimeRatePerHour: number;
  overtimePay: number;
  specialAllowances: number;
  grossSalary: number;
  deductions: PayslipDeductions;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
  paymentDate: string;
  transactionRef: string;
}

export type HazardCategory = 
  | 'physical' 
  | 'equipment' 
  | 'chemical' 
  | 'ppe' 
  | 'electrical' 
  | 'fall_risk' 
  | 'sanitation'
  | 'other';

export type HazardSeverity = 'low' | 'medium' | 'high' | 'critical';
export type HazardStatus = 'submitted' | 'under_review' | 'in_progress' | 'resolved';

export interface SafetyComplaint {
  id: string;
  complaintCode: string; // e.g. "CR-SAFE-8912"
  reportedByUserId: string;
  reportedByName?: string; // Optional if not anonymous
  isAnonymous: boolean;
  industry: IndustryType;
  title: string;
  description: string;
  category: HazardCategory;
  severity: HazardSeverity;
  location: string;
  photoUrl?: string;
  status: HazardStatus;
  adminResolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface AnonymousFeedback {
  id: string;
  industry: IndustryType;
  department: string;
  category: 'management' | 'workload' | 'facilities' | 'fairness' | 'safety';
  sentiment: 'positive' | 'neutral' | 'urgent';
  message: string;
  createdAt: string;
  // Strictly NO userId or userName or IP is kept!
}

export interface SkillItem {
  id: string;
  userId: string;
  title: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  certifiedBy: string;
  certificateId: string;
  issueDate: string;
  expiryDate?: string;
  verified: boolean;
}

export interface WorkExperience {
  id: string;
  userId: string;
  role: string;
  organization: string;
  duration: string;
  highlights: string[];
}

export interface SystemNotification {
  id: string;
  userId: string;
  type: 'shift' | 'safety' | 'payslip' | 'fatigue' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface FatigueAlert {
  id: string;
  workerId: string;
  workerName: string;
  industry: IndustryType;
  department: string;
  severity: 'moderate' | 'critical';
  ruleViolated: string; // e.g. "Consecutive 14-hour shift detected", "Less than 7 hours rest between back-to-back shifts"
  details: string;
  recommendedAction: string;
  detectedAt: string;
  acknowledged: boolean;
}
