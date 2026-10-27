-- ==============================================================================
-- dead.croco — Supabase PostgreSQL Database Schema
-- Brand Tagline: BE DEAD LIKE CROCO
-- Theme: UN SDG 8 (Decent Work and Economic Growth, Workplace Safety, Pay Transparency)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('worker', 'admin', 'supervisor');
CREATE TYPE industry_type AS ENUM ('construction', 'college', 'hospital', 'factory');
CREATE TYPE shift_status AS ENUM ('scheduled', 'active', 'completed', 'missed');
CREATE TYPE attendance_status AS ENUM ('active', 'completed', 'overtime', 'late');
CREATE TYPE hazard_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE hazard_category AS ENUM ('physical', 'equipment', 'chemical', 'ppe', 'electrical', 'fall_risk', 'sanitation', 'other');
CREATE TYPE hazard_status AS ENUM ('submitted', 'under_review', 'in_progress', 'resolved');
CREATE TYPE payslip_status AS ENUM ('pending', 'processing', 'paid');
CREATE TYPE skill_proficiency AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Master');

-- 3. ORGANIZATIONS & WORKPLACES
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    industry industry_type NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. USER PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role user_role DEFAULT 'worker' NOT NULL,
    industry industry_type NOT NULL,
    department VARCHAR(100) NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    hourly_rate NUMERIC(10, 2) DEFAULT 80.00 NOT NULL,
    base_salary NUMERIC(12, 2) DEFAULT 18000.00 NOT NULL,
    emergency_contact VARCHAR(100),
    blood_group VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SHIFTS
CREATE TABLE shifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    industry industry_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    shift_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    expected_hours NUMERIC(4, 2) DEFAULT 8.00 NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    status shift_status DEFAULT 'scheduled' NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ATTENDANCE & WORKING HOURS
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shift_id UUID REFERENCES shifts(id) ON DELETE SET NULL,
    worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    attendance_date DATE DEFAULT CURRENT_DATE NOT NULL,
    check_in_time TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out_time TIMESTAMP WITH TIME ZONE,
    total_hours NUMERIC(5, 2) DEFAULT 0.00,
    regular_hours NUMERIC(5, 2) DEFAULT 0.00,
    overtime_hours NUMERIC(5, 2) DEFAULT 0.00,
    status attendance_status DEFAULT 'active' NOT NULL,
    location_name VARCHAR(255),
    geo_coords JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TRANSPARENT PAYSLIPS
CREATE TABLE payslips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    month_year VARCHAR(50) NOT NULL,
    base_rate_per_hour NUMERIC(10, 2) NOT NULL,
    regular_hours NUMERIC(6, 2) NOT NULL,
    regular_pay NUMERIC(12, 2) NOT NULL,
    overtime_hours NUMERIC(6, 2) DEFAULT 0.00,
    overtime_rate_per_hour NUMERIC(10, 2) NOT NULL,
    overtime_pay NUMERIC(12, 2) DEFAULT 0.00,
    special_allowances NUMERIC(10, 2) DEFAULT 0.00,
    gross_salary NUMERIC(12, 2) NOT NULL,
    deduction_pf NUMERIC(10, 2) DEFAULT 0.00,
    deduction_esi NUMERIC(10, 2) DEFAULT 0.00,
    deduction_welfare NUMERIC(10, 2) DEFAULT 0.00,
    deduction_advance NUMERIC(10, 2) DEFAULT 0.00,
    net_salary NUMERIC(12, 2) NOT NULL,
    status payslip_status DEFAULT 'paid' NOT NULL,
    payment_date DATE,
    transaction_ref VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. SAFETY COMPLAINTS (HAZARD REPORTING)
CREATE TABLE safety_complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_code VARCHAR(50) UNIQUE NOT NULL,
    reported_by_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_anonymous BOOLEAN DEFAULT false NOT NULL,
    industry industry_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category hazard_category NOT NULL,
    severity hazard_severity DEFAULT 'medium' NOT NULL,
    location_details VARCHAR(255) NOT NULL,
    photo_url TEXT,
    status hazard_status DEFAULT 'submitted' NOT NULL,
    admin_resolution_notes TEXT,
    resolved_by_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. STRICTLY ANONYMOUS FEEDBACK
-- Note: Intentionally has NO foreign key to profiles, NO user_id, NO IP address column.
CREATE TABLE anonymous_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    industry industry_type NOT NULL,
    department VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    sentiment VARCHAR(20) DEFAULT 'neutral' NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. DIGITAL SKILL PASSPORTS
CREATE TABLE worker_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    proficiency skill_proficiency DEFAULT 'Intermediate' NOT NULL,
    certified_by VARCHAR(255) NOT NULL,
    certificate_id VARCHAR(100) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    verified BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. FATIGUE MONITORING ALERTS (RULE-BASED)
CREATE TABLE fatigue_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    severity VARCHAR(20) NOT NULL,
    rule_violated VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    recommended_action TEXT NOT NULL,
    acknowledged BOOLEAN DEFAULT false NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE anonymous_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE fatigue_alerts ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view own profile or admins in same org can view workers
CREATE POLICY \"Workers view own profile\" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY \"Admins view org profiles\" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles AS admin_user 
            WHERE admin_user.id = auth.uid() 
            AND admin_user.role = 'admin' 
            AND admin_user.organization_id = profiles.organization_id
        )
    );

-- Shifts: Workers can view their own shifts, Admins can view and insert
CREATE POLICY \"Workers view own shifts\" ON shifts
    FOR SELECT USING (auth.uid() = worker_id);

CREATE POLICY \"Admins manage shifts\" ON shifts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Attendance: Workers can insert and view own attendance, Admins can view all
CREATE POLICY \"Workers manage own attendance\" ON attendance
    FOR ALL USING (auth.uid() = worker_id);

CREATE POLICY \"Admins view all attendance\" ON attendance
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Payslips: Protected salary info. Worker sees only their own; Admin sees org
CREATE POLICY \"Workers view own payslip\" ON payslips
    FOR SELECT USING (auth.uid() = worker_id);

CREATE POLICY \"Admins manage payslips\" ON payslips
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Safety complaints: Anyone can report; workers see their submitted reports; admins see all
CREATE POLICY \"Anyone can report hazard\" ON safety_complaints
    FOR INSERT WITH CHECK (true);

CREATE POLICY \"Workers view reported hazards\" ON safety_complaints
    FOR SELECT USING (auth.uid() = reported_by_id OR is_anonymous = false);

CREATE POLICY \"Admins update hazard status\" ON safety_complaints
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Anonymous Feedback: Anyone can insert; Admins can read without any worker identity exposure
CREATE POLICY \"Anyone can submit anonymous feedback\" ON anonymous_feedback
    FOR INSERT WITH CHECK (true);

CREATE POLICY \"Admins read anonymous feedback\" ON anonymous_feedback
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );
