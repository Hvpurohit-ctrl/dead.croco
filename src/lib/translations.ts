export type SupportedLanguage = 'en' | 'hi' | 'ta';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  nav: {
    home: string;
    features: string;
    industries: string;
    impact: string;
    workerDashboard: string;
    adminDashboard: string;
    demoPersona: string;
    language: string;
  };
  hero: {
    headline: string;
    description: string;
    getStarted: string;
    exploreFeatures: string;
    badgeSDG: string;
    activeWorkersDemo: string;
    safetyResolvedDemo: string;
  };
  worker: {
    shiftTracking: string;
    checkIn: string;
    checkOut: string;
    alreadyCheckedIn: string;
    shiftInProgress: string;
    shiftDuration: string;
    regularHours: string;
    overtimeHours: string;
    payslips: string;
    downloadPayslip: string;
    printPayslip: string;
    grossPay: string;
    netPay: string;
    deductions: string;
    safetyReport: string;
    reportHazard: string;
    anonymousFeedback: string;
    submitFeedback: string;
    skillPassport: string;
    notifications: string;
    voiceInput: string;
    speakNow: string;
    listening: string;
    readAloud: string;
  };
  safety: {
    hazardTitle: string;
    category: string;
    severity: string;
    location: string;
    photoAttachment: string;
    complaintId: string;
    status: string;
    submitted: string;
    underReview: string;
    inProgress: string;
    resolved: string;
    resolutionNotes: string;
    submitSuccess: string;
  };
  admin: {
    overview: string;
    totalWorkers: string;
    onShift: string;
    attendanceRate: string;
    overtimeTotal: string;
    openHazards: string;
    fatigueAlerts: string;
    workerManagement: string;
    createShift: string;
    assignWorker: string;
    safetyConsole: string;
    fatigueMonitor: string;
    workforceAnalytics: string;
    ruleWarningNote: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'dead.croco',
    tagline: 'BE DEAD LIKE CROCO',
    nav: {
      home: 'Home',
      features: 'Features',
      industries: 'Industries',
      impact: 'SDG 8 Impact',
      workerDashboard: 'Worker View',
      adminDashboard: 'Admin Console',
      demoPersona: 'Switch Role',
      language: 'Language',
    },
    hero: {
      headline: 'Fair Work. Safer Teams. Clearer Futures.',
      description: 'dead.croco empowers workers with transparent pay, safer workplaces, and a voice that matters, while helping employers create healthier and more productive teams.',
      getStarted: 'Open Worker App',
      exploreFeatures: 'Employer Console',
      badgeSDG: 'UN SDG 8 — Decent Work & Economic Growth',
      activeWorkersDemo: '2,480+ Shifts Logged Today',
      safetyResolvedDemo: '99.2% Hazards Resolved Before Injury',
    },
    worker: {
      shiftTracking: 'Smart Shift Tracking',
      checkIn: 'Check In Shift',
      checkOut: 'Check Out Shift',
      alreadyCheckedIn: 'Active Shift in Progress',
      shiftInProgress: 'Currently Clocked In',
      shiftDuration: 'Elapsed Time',
      regularHours: 'Standard Hours',
      overtimeHours: 'Overtime Hours',
      payslips: 'Transparent Payslips',
      downloadPayslip: 'Download Payslip',
      printPayslip: 'Print Payslip',
      grossPay: 'Gross Earnings',
      netPay: 'Net Salary (Take Home)',
      deductions: 'Statutory Deductions (PF/ESI)',
      safetyReport: 'Safety Reporting',
      reportHazard: 'Report Safety Hazard',
      anonymousFeedback: '100% Anonymous Feedback',
      submitFeedback: 'Submit Anonymous Note',
      skillPassport: 'Digital Skill Passport',
      notifications: 'Alerts & Messages',
      voiceInput: 'Voice Input',
      speakNow: 'Speak incident details',
      listening: 'Listening...',
      readAloud: 'Read Aloud',
    },
    safety: {
      hazardTitle: 'Hazard / Incident Title',
      category: 'Category',
      severity: 'Severity Level',
      location: 'Site Location',
      photoAttachment: 'Photo Attachment (Optional)',
      complaintId: 'Tracking ID',
      status: 'Current Status',
      submitted: 'Submitted',
      underReview: 'Under Review',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      resolutionNotes: 'Supervisor Resolution Notes',
      submitSuccess: 'Hazard reported successfully with ID',
    },
    admin: {
      overview: 'Workforce Operations Overview',
      totalWorkers: 'Registered Workers',
      onShift: 'Currently on Shift',
      attendanceRate: 'Daily Attendance',
      overtimeTotal: 'Total Overtime',
      openHazards: 'Open Safety Reports',
      fatigueAlerts: 'Fatigue Risk Warnings',
      workerManagement: 'Worker Directory & Shifts',
      createShift: 'Schedule New Shift',
      assignWorker: 'Assign Worker',
      safetyConsole: 'Safety Triage & Resolution',
      fatigueMonitor: 'Fatigue & Rest Rule Monitor',
      workforceAnalytics: 'Real-Time Workforce Analytics',
      ruleWarningNote: 'Note: Alerts are rule-based operational warnings (>12h shift, <8h rest), not medical diagnoses.',
    },
  },
  hi: {
    appName: 'dead.croco',
    tagline: 'BE DEAD LIKE CROCO',
    nav: {
      home: 'मुख्य पृष्ठ',
      features: 'सुविधाएं',
      industries: 'उद्योग',
      impact: 'एसडीजी 8 प्रभाव',
      workerDashboard: 'कर्मचारी डैशबोर्ड',
      adminDashboard: 'प्रबंधक कंसोल',
      demoPersona: 'भूमिका बदलें',
      language: 'भाषा',
    },
    hero: {
      headline: 'उचित काम। सुरक्षित टीमें। स्पष्ट भविष्य।',
      description: 'dead.croco श्रमिकों को पारदर्शी वेतन, सुरक्षित कार्यस्थल और एक मजबूत आवाज़ प्रदान करता है, जिससे नियोक्ता स्वस्थ और कुशल टीम बना सकें।',
      getStarted: 'श्रमिक ऐप खोलें',
      exploreFeatures: 'प्रबंधक कंसोल देखें',
      badgeSDG: 'संयुक्त राष्ट्र एसडीजी 8 — मर्यादित कार्य और आर्थिक वृद्धि',
      activeWorkersDemo: '2,480+ पारियां आज दर्ज',
      safetyResolvedDemo: '99.2% खतरों का त्वरित समाधान',
    },
    worker: {
      shiftTracking: 'स्मार्ट उपस्थिति ट्रैकिंग',
      checkIn: 'शिफ्ट शुरू करें (चेक-इन)',
      checkOut: 'शिफ्ट समाप्त करें (चेक-आउट)',
      alreadyCheckedIn: 'सक्रिय शिफ्ट चल रही है',
      shiftInProgress: 'वर्तमान में कार्यरत',
      shiftDuration: 'बीता हुआ समय',
      regularHours: 'सामान्य घंटे',
      overtimeHours: 'ओवरटाइम घंटे',
      payslips: 'पारदर्शी वेतन पर्ची',
      downloadPayslip: 'वेतन पर्ची डाउनलोड करें',
      printPayslip: 'प्रिंट करें',
      grossPay: 'कुल कमाई',
      netPay: 'हाथ में आने वाला वेतन (Net Pay)',
      deductions: 'कानूनी कटौतियां (PF/ESI)',
      safetyReport: 'कार्यस्थल सुरक्षा रिपोर्ट',
      reportHazard: 'खतरे की सूचना दें',
      anonymousFeedback: '100% गोपनीय सुझाव',
      submitFeedback: 'गोपनीय संदेश भेजें',
      skillPassport: 'डिजिटल कौशल पासपोर्ट',
      notifications: 'सूचनाएं एवं अलर्ट',
      voiceInput: 'आवाज से बोलें',
      speakNow: 'घटना के बारे में बोलें',
      listening: 'सुन रहा है...',
      readAloud: 'बोलकर सुनाएं',
    },
    safety: {
      hazardTitle: 'खतरे / घटना का शीर्षक',
      category: 'श्रेणी',
      severity: 'गंभीरता स्तर',
      location: 'स्थान / साइट',
      photoAttachment: 'तस्वीर संलग्न करें (वैकल्पिक)',
      complaintId: 'ट्रैकिंग कोड',
      status: 'स्थिति',
      submitted: 'दर्ज किया गया',
      underReview: 'समीक्षा में',
      inProgress: 'प्रगति पर',
      resolved: 'समाधान हो गया',
      resolutionNotes: 'सुपरवाइजर का समाधान विवरण',
      submitSuccess: 'खतरे की रिपोर्ट सफलतापूर्वक दर्ज की गई',
    },
    admin: {
      overview: 'कार्यबल संचालन समीक्षा',
      totalWorkers: 'कुल पंजीकृत श्रमिक',
      onShift: 'वर्तमान में ड्यूटी पर',
      attendanceRate: 'दैनिक उपस्थिति दर',
      overtimeTotal: 'कुल ओवरटाइम घंटे',
      openHazards: 'लंबित सुरक्षा शिकायतें',
      fatigueAlerts: 'थकान व अत्यधिक कार्य चेतावनी',
      workerManagement: 'श्रमिक सूची एवं शिफ्ट आवंटन',
      createShift: 'नई शिफ्ट बनाएं',
      assignWorker: 'श्रमिक को असाइन करें',
      safetyConsole: 'सुरक्षा समाधान कंसोल',
      fatigueMonitor: 'थकान एवं विश्राम नियम मॉनिटर',
      workforceAnalytics: 'रीयल-टाइम कार्यबल आंकड़े',
      ruleWarningNote: 'ध्यान दें: यह चेतावनी नियमों पर आधारित है (>12 घंटे शिफ्ट, <8 घंटे आराम), कोई मेडिकल निदान नहीं।',
    },
  },
  ta: {
    appName: 'dead.croco',
    tagline: 'BE DEAD LIKE CROCO',
    nav: {
      home: 'முகப்பு',
      features: 'அம்சங்கள்',
      industries: 'துறைகள்',
      impact: 'SDG 8 தாக்கம்',
      workerDashboard: 'பணியாளர் பக்கம்',
      adminDashboard: 'நிர்வாக மையம்',
      demoPersona: 'பயனர் மாற்றம்',
      language: 'மொழி',
    },
    hero: {
      headline: 'நியாயமான உழைப்பு. பாதுகாப்பான குழுக்கள். தெளிவான எதிர்காலம்.',
      description: 'dead.croco வெளிப்படையான ஊதியம், பாதுகாப்பான பணிச்சூழல் மற்றும் தொழிலாளர் உரிமைகளை வழங்கி சிறந்த நிறுவனங்களை உருவாக்க உதவுகிறது.',
      getStarted: 'பணியாளர் செயலியை திறக்க',
      exploreFeatures: 'நிர்வாக டாஷ்போர்டு',
      badgeSDG: 'ஐ.நா SDG 8 — கண்ணியமான வேலை மற்றும் பொருளாதார வளர்ச்சி',
      activeWorkersDemo: '2,480+ ஷிப்ட்டுகள் இன்று பதிவு',
      safetyResolvedDemo: '99.2% அபாயங்கள் உடனடியாக சரிசெய்யப்பட்டன',
    },
    worker: {
      shiftTracking: 'ஸ்மார்ட் ஷிப்ட் வருகைப்பதிவு',
      checkIn: 'ஷிப்ட் தொடங்கு (செக்-இன்)',
      checkOut: 'ஷிப்ட் முடி (செக்-அவுட்)',
      alreadyCheckedIn: 'தற்போது ஷிப்ட்டில் உள்ளீர்கள்',
      shiftInProgress: 'வேலை நேரம் ஓடுகிறது',
      shiftDuration: 'கடந்த நேரம்',
      regularHours: 'வழக்கமான நேரம்',
      overtimeHours: 'கூடுதல் நேரம் (OT)',
      payslips: 'வெளிப்படையான சம்பளச் சீட்டு',
      downloadPayslip: 'சம்பளச் சீட்டு பதிவிறக்கு',
      printPayslip: 'அச்சிடு',
      grossPay: 'மொத்த சம்பளம்',
      netPay: 'நிகர ஊதியம் (கையில் கிடைப்பது)',
      deductions: 'சட்டரீதியான பிடித்தங்கள் (PF/ESI)',
      safetyReport: 'பணி இடப் பாதுகாப்பு புகார்',
      reportHazard: 'பாதுகாப்பு அபாயத்தைப் புகாரளி',
      anonymousFeedback: '100% ரகசியக் கருத்துகள்',
      submitFeedback: 'ரகசியக் கருத்தை அனுப்பு',
      skillPassport: 'டிஜிட்டல் திறன் பாஸ்போர்ட்',
      notifications: 'அறிவிப்புகள் மற்றும் செய்திகள்',
      voiceInput: 'குரல் உள்ளீடு',
      speakNow: 'பேசி விவரங்களைப் பதிவு செய்',
      listening: 'கேட்கிறது...',
      readAloud: 'வாசித்துக் காட்டு',
    },
    safety: {
      hazardTitle: 'அபாயத்தின் தலைப்பு',
      category: 'பிரிவு',
      severity: 'தீவிரத் தன்மை',
      location: 'இடம் / தளம்',
      photoAttachment: 'புகைப்படம் இணைக்கவும் (விரும்பினால்)',
      complaintId: 'புகார் எண்',
      status: 'நிலை',
      submitted: 'பதிவு செய்யப்பட்டது',
      underReview: 'பரிசீலனையில்',
      inProgress: 'நடவடிக்கையில்',
      resolved: 'சரிசெய்யப்பட்டது',
      resolutionNotes: 'மேற்பார்வையாளர் தீர்வு குறிப்புகள்',
      submitSuccess: 'பாதுகாப்பு புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது',
    },
    admin: {
      overview: 'பணியாளர் நிர்வாக மேற்பார்வை',
      totalWorkers: 'பதிவு செய்யப்பட்ட தொழிலாளர்கள்',
      onShift: 'தற்போது பணியில் உள்ளோர்',
      attendanceRate: 'தினசரி வருகை விகிதம்',
      overtimeTotal: 'மொத்த ஓவர்-டைம் நேரம்',
      openHazards: 'தீர்க்கப்படாத பாதுகாப்பு புகார்கள்',
      fatigueAlerts: 'அதிக வேலைப் பளு எச்சரிக்கைகள்',
      workerManagement: 'தொழிலாளர் பட்டியல் & ஷிப்ட்',
      createShift: 'புதிய ஷிப்ட் உருவாக்கு',
      assignWorker: 'பணியாளரை நியமி',
      safetyConsole: 'பாதுகாப்பு தீர்வு மையம்',
      fatigueMonitor: 'களைப்பு மற்றும் ஓய்வு கண்காணிப்பு',
      workforceAnalytics: 'நிகழ்நேர புள்ளிவிவரங்கள்',
      ruleWarningNote: 'குறிப்பு: இது விதிமுறை எச்சரிக்கை மட்டுமே (>12 மணிநேர ஷிப்ட், <8 மணிநேர ஓய்வு), மருத்துவப் பரிசோதனை அல்ல.',
    },
  },
};
