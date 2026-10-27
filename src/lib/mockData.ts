import {
  UserProfile,
  Shift,
  AttendanceRecord,
  Payslip,
  SafetyComplaint,
  AnonymousFeedback,
  SkillItem,
  WorkExperience,
  SystemNotification,
  FatigueAlert
} from './types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-worker-1',
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@deadcroco.work',
    phone: '+91 98450 23145',
    role: 'worker',
    industry: 'construction',
    department: 'Civil & Scaffolding',
    jobTitle: 'Senior Scaffolding Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinDate: '2024-03-15',
    hourlyRate: 85, // ₹85/hr
    baseSalary: 18000,
    emergencyContact: '+91 94432 11982 (Wife)',
    bloodGroup: 'O+'
  },
  {
    id: 'user-worker-2',
    name: 'Priya Selvam',
    email: 'priya.selvam@deadcroco.work',
    phone: '+91 97890 44512',
    role: 'worker',
    industry: 'college',
    department: 'Facilities & Hygiene',
    jobTitle: 'Campus Maintenance & Sanitation Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    joinDate: '2024-08-01',
    hourlyRate: 75, // ₹75/hr
    baseSalary: 16000,
    emergencyContact: '+91 98401 99281 (Brother)',
    bloodGroup: 'B+'
  },
  {
    id: 'user-worker-3',
    name: 'Joseph Daniel',
    email: 'joseph.d@deadcroco.work',
    phone: '+91 99401 77211',
    role: 'worker',
    industry: 'construction',
    department: 'Heavy Machinery',
    jobTitle: 'Excavator & Crane Operator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    joinDate: '2023-11-10',
    hourlyRate: 110,
    baseSalary: 24000,
    emergencyContact: '+91 99401 77299',
    bloodGroup: 'A+'
  },
  {
    id: 'user-worker-4',
    name: 'Sunita Devi',
    email: 'sunita.devi@deadcroco.work',
    phone: '+91 94123 66782',
    role: 'worker',
    industry: 'college',
    department: 'Campus Safety',
    jobTitle: 'Senior Security Officer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    joinDate: '2024-01-20',
    hourlyRate: 80,
    baseSalary: 17000,
    emergencyContact: '+91 94123 66700',
    bloodGroup: 'AB+'
  },
  {
    id: 'user-admin-1',
    name: 'Vikramaditya Singh',
    email: 'vikram.singh@deadcroco.work',
    phone: '+91 98112 00412',
    role: 'admin',
    industry: 'construction',
    department: 'Safety & Workforce Operations',
    jobTitle: 'Director of Workforce Wellbeing & Compliance',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    joinDate: '2022-06-01',
    hourlyRate: 250,
    baseSalary: 65000,
    emergencyContact: '+91 98112 00499',
    bloodGroup: 'O+'
  }
];

export const INITIAL_SHIFTS: Shift[] = [
  {
    id: 'shift-101',
    userId: 'user-worker-1',
    organizationId: 'org-metro-construction',
    industry: 'construction',
    title: 'Metro Pier 18 Scaffolding Assembly',
    date: '2026-10-27',
    startTime: '08:00',
    endTime: '17:00',
    expectedHours: 8,
    location: 'Metro Line 4 - Pier 18 East Gate',
    status: 'active',
    notes: 'Mandatory double-lanyard safety harness required.'
  },
  {
    id: 'shift-102',
    userId: 'user-worker-2',
    organizationId: 'org-srm-college',
    industry: 'college',
    title: 'Morning Campus Sanitization & Bio-Waste Protocol',
    date: '2026-10-27',
    startTime: '07:30',
    endTime: '16:00',
    expectedHours: 8,
    location: 'Science Complex - Academic Block B',
    status: 'active',
    notes: 'Safety eyewear and nitrile gloves required in chemistry labs.'
  },
  {
    id: 'shift-103',
    userId: 'user-worker-3',
    organizationId: 'org-metro-construction',
    industry: 'construction',
    title: 'Piling & Trench Excavation Shift',
    date: '2026-10-27',
    startTime: '07:00',
    endTime: '19:30', // Potential fatigue alert
    expectedHours: 12,
    location: 'Underground Tunnel Shaft 3',
    status: 'active',
    notes: 'Hydraulic checklist signoff mandatory.'
  },
  {
    id: 'shift-104',
    userId: 'user-worker-4',
    organizationId: 'org-srm-college',
    industry: 'college',
    title: 'Night Perimeter Security Watch',
    date: '2026-10-26',
    startTime: '21:00',
    endTime: '06:00',
    expectedHours: 9,
    location: 'University Hostels & North Gate',
    status: 'completed',
    notes: 'Hourly NFC patrol checkpoint check-ins.'
  },
  {
    id: 'shift-105',
    userId: 'user-worker-1',
    organizationId: 'org-metro-construction',
    industry: 'construction',
    title: 'Pier 19 Concrete Formwork Inspection',
    date: '2026-10-28',
    startTime: '08:00',
    endTime: '17:00',
    expectedHours: 8,
    location: 'Metro Line 4 - Pier 19 West',
    status: 'scheduled',
    notes: 'Ensure safety nets are secured prior to formwork removal.'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-today-1',
    shiftId: 'shift-101',
    userId: 'user-worker-1',
    date: '2026-10-27',
    checkInTime: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(), // 3.5 hours ago
    checkOutTime: undefined,
    totalHours: 3.5,
    regularHours: 3.5,
    overtimeHours: 0,
    status: 'active',
    locationName: 'Metro Line 4 - Pier 18 East Gate',
    notes: 'GPS Geo-verified check-in within 25m site radius.'
  },
  {
    id: 'att-today-2',
    shiftId: 'shift-102',
    userId: 'user-worker-2',
    date: '2026-10-27',
    checkInTime: new Date(Date.now() - 4.2 * 60 * 60 * 1000).toISOString(),
    checkOutTime: undefined,
    totalHours: 4.2,
    regularHours: 4.2,
    overtimeHours: 0,
    status: 'active',
    locationName: 'Science Complex - Academic Block B',
    notes: 'Bio-metric badge tap recorded.'
  },
  // Past historical records for Ramesh Kumar
  {
    id: 'att-past-1',
    shiftId: 'shift-past-101',
    userId: 'user-worker-1',
    date: '2026-10-26',
    checkInTime: '2026-10-26T08:00:00.000Z',
    checkOutTime: '2026-10-26T18:30:00.000Z',
    totalHours: 10.5,
    regularHours: 8,
    overtimeHours: 2.5,
    status: 'overtime',
    locationName: 'Metro Line 4 - Pier 18 East Gate',
    notes: 'Urgent deck reinforcement beam securing.'
  },
  {
    id: 'att-past-2',
    shiftId: 'shift-past-102',
    userId: 'user-worker-1',
    date: '2026-10-25',
    checkInTime: '2026-10-25T08:00:00.000Z',
    checkOutTime: '2026-10-25T19:00:00.000Z',
    totalHours: 11.0,
    regularHours: 8,
    overtimeHours: 3.0,
    status: 'overtime',
    locationName: 'Metro Line 4 - Pier 17 South',
    notes: 'Overtime authorized by Site Supervisor.'
  },
  {
    id: 'att-past-3',
    shiftId: 'shift-past-103',
    userId: 'user-worker-1',
    date: '2026-10-24',
    checkInTime: '2026-10-24T08:02:00.000Z',
    checkOutTime: '2026-10-24T16:58:00.000Z',
    totalHours: 8.0,
    regularHours: 8,
    overtimeHours: 0,
    status: 'completed',
    locationName: 'Metro Line 4 - Pier 17 South',
  },
  {
    id: 'att-past-4',
    shiftId: 'shift-past-104',
    userId: 'user-worker-1',
    date: '2026-10-23',
    checkInTime: '2026-10-23T07:55:00.000Z',
    checkOutTime: '2026-10-23T17:05:00.000Z',
    totalHours: 8.0,
    regularHours: 8,
    overtimeHours: 0,
    status: 'completed',
    locationName: 'Metro Line 4 - Central Depot',
  },
  {
    id: 'att-past-5',
    shiftId: 'shift-past-105',
    userId: 'user-worker-1',
    date: '2026-10-22',
    checkInTime: '2026-10-22T08:00:00.000Z',
    checkOutTime: '2026-10-22T18:00:00.000Z',
    totalHours: 10.0,
    regularHours: 8,
    overtimeHours: 2.0,
    status: 'overtime',
    locationName: 'Metro Line 4 - Pier 16',
  }
];

export const INITIAL_PAYSLIPS: Payslip[] = [
  {
    id: 'pay-2026-10-ramesh',
    userId: 'user-worker-1',
    userName: 'Ramesh Kumar',
    jobTitle: 'Senior Scaffolding Specialist',
    department: 'Civil & Scaffolding',
    industry: 'construction',
    monthYear: 'October 2026',
    baseRatePerHour: 85,
    regularHours: 176,
    regularPay: 14960,
    overtimeHours: 28,
    overtimeRatePerHour: 127.5, // 1.5x regular
    overtimePay: 3570,
    specialAllowances: 1500, // Site High Altitude Allowance
    grossSalary: 20030,
    deductions: {
      providentFund: 1795,
      esiHealthcare: 150,
      welfareCess: 50,
      advanceDeduction: 0
    },
    netSalary: 18035,
    status: 'paid',
    paymentDate: '2026-10-31',
    transactionRef: 'UPI-DC-9921448821'
  },
  {
    id: 'pay-2026-09-ramesh',
    userId: 'user-worker-1',
    userName: 'Ramesh Kumar',
    jobTitle: 'Senior Scaffolding Specialist',
    department: 'Civil & Scaffolding',
    industry: 'construction',
    monthYear: 'September 2026',
    baseRatePerHour: 85,
    regularHours: 184,
    regularPay: 15640,
    overtimeHours: 18,
    overtimeRatePerHour: 127.5,
    overtimePay: 2295,
    specialAllowances: 1200,
    grossSalary: 19135,
    deductions: {
      providentFund: 1715,
      esiHealthcare: 143,
      welfareCess: 50,
      advanceDeduction: 0
    },
    netSalary: 17227,
    status: 'paid',
    paymentDate: '2026-09-30',
    transactionRef: 'UPI-DC-8812039121'
  },
  {
    id: 'pay-2026-10-priya',
    userId: 'user-worker-2',
    userName: 'Priya Selvam',
    jobTitle: 'Campus Maintenance & Sanitation Lead',
    department: 'Facilities & Hygiene',
    industry: 'college',
    monthYear: 'October 2026',
    baseRatePerHour: 75,
    regularHours: 176,
    regularPay: 13200,
    overtimeHours: 14,
    overtimeRatePerHour: 112.5,
    overtimePay: 1575,
    specialAllowances: 1000, // Bio-Hazard Management Allowance
    grossSalary: 15775,
    deductions: {
      providentFund: 1419,
      esiHealthcare: 118,
      welfareCess: 40,
      advanceDeduction: 0
    },
    netSalary: 14198,
    status: 'paid',
    paymentDate: '2026-10-31',
    transactionRef: 'UPI-DC-9921782291'
  }
];

export const INITIAL_COMPLAINTS: SafetyComplaint[] = [
  {
    id: 'safe-comp-1',
    complaintCode: 'CR-SAFE-1042',
    reportedByUserId: 'user-worker-1',
    reportedByName: 'Ramesh Kumar',
    isAnonymous: false,
    industry: 'construction',
    title: 'Missing Safety Toe-Board on 4th Level Scaffolding',
    description: 'The scaffolding deck on Pier 18 East is missing side kick-plates / toe boards. Dropped tools could easily fall 15 meters onto active ground crew.',
    category: 'fall_risk',
    severity: 'high',
    location: 'Metro Line 4 - Pier 18 East Level 4',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80',
    status: 'in_progress',
    adminResolutionNotes: 'Site safety engineer notified. New aluminum toe-boards dispatched from warehouse for immediate retrofitting.',
    createdAt: '2026-10-26T09:15:00.000Z',
    updatedAt: '2026-10-26T11:45:00.000Z'
  },
  {
    id: 'safe-comp-2',
    complaintCode: 'CR-SAFE-1088',
    reportedByUserId: 'user-worker-3',
    reportedByName: 'Joseph Daniel',
    isAnonymous: false,
    industry: 'construction',
    title: 'Exposed High-Voltage Cable Submerged Near Sump Pump',
    description: 'Water accumulation in Trench Shaft 3 has reached the power feeder cable. Cable sheath appears damaged with insulation crack visible.',
    category: 'electrical',
    severity: 'critical',
    location: 'Underground Tunnel Shaft 3 - Substation Feed',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    status: 'under_review',
    createdAt: '2026-10-27T06:30:00.000Z',
    updatedAt: '2026-10-27T07:15:00.000Z'
  },
  {
    id: 'safe-comp-3',
    complaintCode: 'CR-SAFE-2104',
    reportedByUserId: 'user-worker-2',
    reportedByName: 'Priya Selvam',
    isAnonymous: false,
    industry: 'college',
    title: 'Chemical Fume Scrubber Leak in Chemistry Lab 304',
    description: 'Acidic chemical odors leaking into common hallway. Waste drainage trap under sink 4 is leaking ammonia solution onto flooring.',
    category: 'chemical',
    severity: 'high',
    location: 'Science Complex - Academic Block B, Room 304',
    photoUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    status: 'resolved',
    adminResolutionNotes: 'Lab evacuated immediately. Facility plumbing team replaced PVC trap with chemical-resistant Teflon seal. Air scrubbers tested safe at 14:00.',
    createdAt: '2026-10-24T10:00:00.000Z',
    updatedAt: '2026-10-25T14:30:00.000Z',
    resolvedAt: '2026-10-25T14:30:00.000Z'
  },
  {
    id: 'safe-comp-4',
    complaintCode: 'CR-SAFE-2190',
    reportedByUserId: 'user-worker-4',
    reportedByName: 'Anonymous Worker',
    isAnonymous: true,
    industry: 'college',
    title: 'Non-Functional High-Mast Floodlight near East Gate Pathway',
    description: 'The pathway between the library annex and east staff quarters is completely dark after 7:30 PM due to blown ballast.',
    category: 'physical',
    severity: 'medium',
    location: 'Campus Perimeter East - Staff Residence Lane',
    status: 'submitted',
    createdAt: '2026-10-27T04:45:00.000Z',
    updatedAt: '2026-10-27T04:45:00.000Z'
  }
];

export const INITIAL_ANONYMOUS_FEEDBACK: AnonymousFeedback[] = [
  {
    id: 'anon-feed-1',
    industry: 'construction',
    department: 'Civil & Scaffolding',
    category: 'facilities',
    sentiment: 'urgent',
    message: 'The drinking water tank near Pier 12 needs an insulated shade cover. By 1:00 PM the water gets scalding hot and workers cannot hydrate properly.',
    createdAt: '2026-10-26T13:20:00.000Z'
  },
  {
    id: 'anon-feed-2',
    industry: 'construction',
    department: 'General Site Works',
    category: 'workload',
    sentiment: 'neutral',
    message: 'Notice for mandatory weekend overtime should be announced at least 48 hours prior so public transport arrangements can be planned.',
    createdAt: '2026-10-25T16:40:00.000Z'
  },
  {
    id: 'anon-feed-3',
    industry: 'college',
    department: 'Facilities & Hygiene',
    category: 'safety',
    sentiment: 'urgent',
    message: 'Housekeeping staff sorting waste in the cafeteria disposal room need industrial puncture-proof gloves for handling broken glass containers.',
    createdAt: '2026-10-26T08:15:00.000Z'
  },
  {
    id: 'anon-feed-4',
    industry: 'college',
    department: 'Campus Security',
    category: 'management',
    sentiment: 'positive',
    message: 'The new digital shift roster on dead.croco has made shift handovers much clearer. Thanks for listening to our earlier suggestions.',
    createdAt: '2026-10-24T18:00:00.000Z'
  }
];

export const INITIAL_SKILLS: SkillItem[] = [
  // Ramesh Kumar skills
  {
    id: 'skill-1',
    userId: 'user-worker-1',
    title: 'Tubular Steel Scaffolding Assembly (Level 3)',
    category: 'Structural Safety',
    proficiency: 'Master',
    certifiedBy: 'National Skill Development Corporation (NSDC)',
    certificateId: 'NSDC-SCAF-2024-8891',
    issueDate: '2024-04-10',
    expiryDate: '2027-04-10',
    verified: true
  },
  {
    id: 'skill-2',
    userId: 'user-worker-1',
    title: 'Work at Heights & Fall Arrest Protocol (EN 361)',
    category: 'Occupational Safety',
    proficiency: 'Advanced',
    certifiedBy: 'L&T Construction Safety Institute',
    certificateId: 'LTI-HGT-9921',
    issueDate: '2024-05-18',
    expiryDate: '2026-05-18',
    verified: true
  },
  {
    id: 'skill-3',
    userId: 'user-worker-1',
    title: 'Industrial First Aid & CPR Responder',
    category: 'Emergency Response',
    proficiency: 'Intermediate',
    certifiedBy: 'Indian Red Cross Society',
    certificateId: 'IRCS-FA-10023',
    issueDate: '2025-01-12',
    expiryDate: '2028-01-12',
    verified: true
  },
  // Priya Selvam skills
  {
    id: 'skill-4',
    userId: 'user-worker-2',
    title: 'Bio-Hazardous Waste & Lab Sanitization Protocol',
    category: 'Bio-Safety',
    proficiency: 'Master',
    certifiedBy: 'State Infection Control Council',
    certificateId: 'SICC-BIO-4412',
    issueDate: '2024-09-05',
    expiryDate: '2027-09-05',
    verified: true
  },
  {
    id: 'skill-5',
    userId: 'user-worker-2',
    title: 'Chemical Neutralization & Spill Control (OSHA Standard)',
    category: 'Chemical Safety',
    proficiency: 'Advanced',
    certifiedBy: 'University Health & Safety Board',
    certificateId: 'UHSB-CHEM-2025',
    issueDate: '2025-02-14',
    verified: true
  }
];

export const INITIAL_EXPERIENCE: WorkExperience[] = [
  {
    id: 'exp-1',
    userId: 'user-worker-1',
    role: 'Scaffolding Lead Technician',
    organization: 'Metro Rail Phase 4 Project',
    duration: '2024 - Present (2 yrs 7 mos)',
    highlights: [
      'Supervised 18-member crew across elevated viaduct sections.',
      'Achieved 480 consecutive days without a lost-time injury (LTI).',
      'Certified 140+ temporary working platforms according to IS 3696.'
    ]
  },
  {
    id: 'exp-2',
    userId: 'user-worker-1',
    role: 'Junior Rigging & Formwork Assistant',
    organization: 'L&T Infrastructure Projects',
    duration: '2021 - 2024 (3 yrs)',
    highlights: [
      'Assisted assembly of modular climbing formwork systems.',
      'Conducted daily toolbox talks and harness safety checks.'
    ]
  },
  {
    id: 'exp-3',
    userId: 'user-worker-2',
    role: 'Senior Hygiene & Sanitation Officer',
    organization: 'SRM Institute of Science & Technology',
    duration: '2024 - Present (2 yrs 3 mos)',
    highlights: [
      'Pioneered zero-spill hazardous chemical protocol across 12 research labs.',
      'Led 24-member housekeeping shift with 98% hygiene audit score.'
    ]
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-worker-1',
    type: 'safety',
    title: 'Safety Update: CR-SAFE-1042',
    message: 'Supervisor Vikramaditya Singh has ordered replacement toe-boards for Pier 18 East.',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: 'safety'
  },
  {
    id: 'notif-2',
    userId: 'user-worker-1',
    type: 'payslip',
    title: 'October 2026 Payslip Ready',
    message: 'Your net earnings of ₹18,035 have been finalized and scheduled for disbursement.',
    timestamp: '1 day ago',
    read: true,
    actionUrl: 'payslips'
  },
  {
    id: 'notif-3',
    userId: 'user-worker-1',
    type: 'general',
    title: 'Heat Advisory & Hydration Break',
    message: 'Temperatures expected to touch 36°C. Mandatory 15-min shade & water break scheduled at 13:30.',
    timestamp: 'Today at 08:30 AM',
    read: false
  },
  {
    id: 'notif-4',
    userId: 'user-worker-2',
    type: 'safety',
    title: 'Hazard Resolved: CR-SAFE-2104',
    message: 'Chemical trap in Lab 304 successfully repaired and tested safe.',
    timestamp: 'Yesterday',
    read: true,
    actionUrl: 'safety'
  }
];

export const INITIAL_FATIGUE_ALERTS: FatigueAlert[] = [
  {
    id: 'fatigue-1',
    workerId: 'user-worker-3',
    workerName: 'Joseph Daniel',
    industry: 'construction',
    department: 'Heavy Machinery',
    severity: 'critical',
    ruleViolated: 'Rule #1: Shift Duration Exceeds 12 Hours (>12h limit)',
    details: 'Worker scheduled for 12.5 consecutive hours on heavy crane operations without required 90-minute operational rotation.',
    recommendedAction: 'Mandate immediate operator handover to relief operator at 15:30. Admin review required.',
    detectedAt: '2026-10-27T08:15:00.000Z',
    acknowledged: false
  },
  {
    id: 'fatigue-2',
    workerId: 'user-worker-1',
    workerName: 'Ramesh Kumar',
    industry: 'construction',
    department: 'Civil & Scaffolding',
    severity: 'moderate',
    ruleViolated: 'Rule #2: Excessive Cumulative Weekly Overtime (>16h weekly threshold)',
    details: 'Logged 28.5 hours of overtime over past 10 days. Consecutive late shifts recorded on Oct 25 and Oct 26.',
    recommendedAction: 'Restrict overtime scheduling for the next 48 hours. Ensure full 8-hour rest interval.',
    detectedAt: '2026-10-27T06:00:00.000Z',
    acknowledged: false
  },
  {
    id: 'fatigue-3',
    workerId: 'user-worker-4',
    workerName: 'Sunita Devi',
    industry: 'college',
    department: 'Campus Safety',
    severity: 'moderate',
    ruleViolated: 'Rule #3: Short Turnaround Interval (<8h rest between shifts)',
    details: 'Night shift ended at 06:00 on Oct 26; scheduled for emergency morning campus event watch at 13:00 (7h rest).',
    recommendedAction: 'Adjust shift start to 15:00 or reassign to reserve roster.',
    detectedAt: '2026-10-26T22:00:00.000Z',
    acknowledged: true
  }
];
