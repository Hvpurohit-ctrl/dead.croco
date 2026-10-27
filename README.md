# dead.croco — Workforce Management Platform

> **BE DEAD LIKE CROCO**  
> Fair Work. Safer Teams. Clearer Futures.  
> Aligned with **UN Sustainable Development Goal 8 (Decent Work and Economic Growth)**.

---

## 🐊 1. Brand Identity & Overview

**dead.croco** is a modern, responsive workforce management platform engineered for employee-intensive organisations. It addresses manual attendance discrepancies, opaque salary deductions, unreported workplace hazards, and unrecorded career histories across construction sites, educational institutions, hospitals, and factories.

- **Platform Name**: `dead.croco`
- **Official Tagline**: `BE DEAD LIKE CROCO`
- **Color Palette**: Forest Green (`#1E3F20`), Pale Green (`#EAF6EB`), White, and Black.
- **Logo**: Official crocodile badge preserved in `/public/logo.webp`.

---

## 🎯 2. Primary Hackathon Demonstrations

### Industry 1: Metro Rail & Civil Construction Sites
- **Operatives**: Scaffolding Specialists, Heavy Excavator Operators, Formwork Masons.
- **Hazards**: Missing toe-boards at 4th floor scaffolding, damaged power feeders in flooded sumps.
- **Pay Rules**: Base rate ₹85/hr + 1.5x statutory overtime rate + high-altitude safety allowance.
- **Fatigue Safeguards**: Rule #1 triggered for continuous shifts exceeding 12 hours.

### Industry 2: Colleges & University Campus Facilities (SRM Campus)
- **Operatives**: Sanitation Leads, Overnight Security Officers, Chemical Lab Technicians.
- **Hazards**: Chemical fume trap leaks in Organic Chemistry Lab 304, dimly lit hostel perimeter lanes.
- **Pay Rules**: Fixed monthly base with weekend allowance and transparent EPF/ESI statutory contributions.
- **Fatigue Safeguards**: Rule #2 triggered for turnaround rest intervals under 8 hours.

---

## 🛠️ 3. Technology Stack

- **Frontend**: React 18 with TypeScript
- **Bundler & Tooling**: Vite 6, Tailwind CSS
- **Icons**: Lucide React
- **Analytics & Visualizations**: Recharts (Attendance trends, Overtime distributions, Hazard categories, Resolution speed)
- **Database**: Supabase PostgreSQL with Row Level Security (RLS) policies
- **Storage / Fallback**: Reactive local persistence engine with realistic cross-sector datasets
- **Accessibility**: English, Hindi (हिन्दी), Tamil (தமிழ்), Web Speech API text-to-speech reader & voice recognition

---

## 🚀 4. Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Run

```bash
# Navigate to the project directory
cd C:\Users\harshvardhan\.gemini\antigravity\scratch\dead_croco

# Install dependencies (if not already installed)
npm install

# Start local development server
npm run dev
```

The app will be accessible at: `http://localhost:5173`

### Production Build & Verification

```bash
npm run build
npm run preview
```

---

## 🗄️ 5. Supabase Database Setup & RLS

A complete PostgreSQL migration script is available at:
`supabase/schema.sql`

### Tables Included
1. `profiles`: Worker and admin user profiles with role-based access.
2. `organizations`: Workplaces and sector assignments.
3. `shifts`: Scheduled shift rosters with start/end timestamps.
4. `attendance`: Check-in/check-out timestamps, regular and overtime hours.
5. `payslips`: Itemized base wages, 1.5x overtime, allowances, and statutory deductions.
6. `safety_complaints`: Crowdsourced hazard reports with photos, unique tracking IDs (`CR-SAFE-XXXX`), and resolution notes.
7. `anonymous_feedback`: Identity-decoupled feedback (strictly zero worker foreign keys).
8. `worker_skills`: Accredited certifications and digital skill passports.
9. `fatigue_alerts`: Rule-based operational fatigue alerts.

### Row Level Security (RLS)
- Workers can only view their own attendance, payslips, and skill records.
- Employers can only manage records belonging to their organization.
- Anonymous feedback records are strictly isolated and never expose author identities.

---

## 🧪 6. End-to-End Verification Workflows

1. **Worker Smart Shift Check-In/Out**:
   - Tap **Open Worker App** from the landing page.
   - Click **Check In Shift**; live timer starts running.
   - Click **Check Out Shift**; duration, standard hours, and overtime hours (1.5x) are calculated and saved to the attendance history.
2. **Admin Shift Creation & Assignment**:
   - Click **Admin Console** or switch to the Admin persona.
   - Go to **Worker Directory & Shifts** $\rightarrow$ **Create & Assign Shift**.
   - Select worker, date, hours, and save. The shift immediately appears on the worker's roster.
3. **Safety Incident Reporting & Resolution**:
   - In Worker View $\rightarrow$ **Safety Reporting**, enter hazard details, click **Attach Photo**, or use **Voice Input**.
   - Submit to receive a tracking ID (e.g., `CR-SAFE-1042`).
   - Switch to Admin Console $\rightarrow$ **Safety Console**, click **Update / Resolve**, attach resolution remarks, and save. The notes immediately reflect in the worker's dashboard.
4. **Transparent Payslip Breakdown**:
   - In Worker View $\rightarrow$ **Transparent Payslips**, review regular pay, 1.5x overtime earnings, and PF/ESI deductions.
   - Click **How Is This Calculated?** to see exact formulas.
   - Click **Print Payslip** for a printer-ready voucher.
5. **100% Anonymous Feedback**:
   - In Worker View $\rightarrow$ **100% Anonymous Feedback**, submit a note.
   - In Admin Console $\rightarrow$ **Anonymous Feedback Feed**, inspect the entry and verify zero worker identification.
6. **Digital Skill Passport**:
   - In Worker View $\rightarrow$ **Digital Skill Passport**, click **Add Certification**.
   - Click **Download / Print Passport** to generate the verified credential badge.

---

## 🌐 7. UN SDG 8 Alignment

- **Target 8.8 (Safe & Secure Working Environments)**: Real-time hazard triage and rule-based fatigue alerts prevent injuries before they occur.
- **Target 8.5 (Decent Work & Equal Pay)**: Transparent calculation formulas protect workers against wage theft and unrecorded overtime.
- **Target 8.6 (Youth & Trade Employment)**: Portable digital skill passports preserve trade certifications across different contractors.

*Disclaimer: All figures, names, and incident records are demo data generated for prototype evaluation.*
