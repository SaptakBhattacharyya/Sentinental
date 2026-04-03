-- SENTINEL SUPABASE SQL SETUP SCRIPT
-- This script creates the required database schema as described in the PRD.
-- Execute this in your Supabase SQL Editor.

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE: zones
CREATE TABLE IF NOT EXISTS public.zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  lat FLOAT,
  lng FLOAT,
  radius_meters INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- TABLE: users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rank TEXT,
  role TEXT NOT NULL CHECK (role IN ('soldier', 'officer', 'commander', 'admin')),
  unit TEXT,
  zone_id UUID REFERENCES public.zones(id) ON DELETE SET NULL,
  email TEXT UNIQUE,
  phone TEXT,
  totp_secret TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- We also map Supabase Auth users to our public.users table automatically if needed, 
-- but this script creates the table manually.

-- TABLE: equipment
CREATE TABLE IF NOT EXISTS public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  serial_number TEXT UNIQUE,
  sensitivity TEXT CHECK (sensitivity IN ('standard', 'restricted', 'weapons-grade')),
  zone_id UUID REFERENCES public.zones(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('available', 'checked-out', 'maintenance', 'lost', 'retired')),
  custodian_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  purchase_date DATE,
  last_service DATE,
  wear_score FLOAT DEFAULT 0,
  usage_hours FLOAT DEFAULT 0,
  mission_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- TABLE: events (Audit Log)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID REFERENCES public.equipment(id) ON DELETE CASCADE,
  event_type TEXT CHECK (event_type IN ('check-out', 'check-in', 'transfer', 'scan', 'service', 'anomaly', 'zone-violation', 'tamper-attempt', 'unregistered-scan')),
  actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  recipient_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  zone_id UUID REFERENCES public.zones(id) ON DELETE SET NULL,
  location_lat FLOAT,
  location_lng FLOAT,
  notes TEXT,
  sha256_hash TEXT NOT NULL,
  prev_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- TABLE: missions
CREATE TABLE IF NOT EXISTS public.missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  commander_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  zone_id UUID REFERENCES public.zones(id) ON DELETE SET NULL,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('planning', 'active', 'completed', 'aborted')),
  kit_list JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- TABLE: assignments
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID REFERENCES public.equipment(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  mission_id UUID REFERENCES public.missions(id) ON DELETE SET NULL,
  checked_out_at TIMESTAMPTZ,
  due_back_at TIMESTAMPTZ,
  checked_in_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('active', 'returned', 'overdue', 'lost'))
);

-- TABLE: maintenance_records
CREATE TABLE IF NOT EXISTS public.maintenance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID REFERENCES public.equipment(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('scheduled', 'triggered', 'emergency')),
  performed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  description TEXT,
  parts_replaced TEXT,
  performed_at TIMESTAMPTZ,
  next_due_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- TABLE: anomalies
CREATE TABLE IF NOT EXISTS public.anomalies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID REFERENCES public.equipment(id) ON DELETE CASCADE,
  rule_triggered TEXT,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  auto_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anomalies ENABLE ROW LEVEL SECURITY;

-- Base Policies (For hackathon, making it openly accessible while authenticated)
CREATE POLICY "Allow authenticated read access" ON public.zones FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.equipment FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.missions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.assignments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.maintenance_records FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.anomalies FOR SELECT TO authenticated USING (true);

-- Events logic: APPEND-ONLY, NO UPDATE, NO DELETE
CREATE POLICY "Allow authenticated insert" ON public.events FOR INSERT TO authenticated USING (true);
CREATE POLICY "Deny update on events" ON public.events FOR UPDATE TO authenticated USING (false);
CREATE POLICY "Deny delete on events" ON public.events FOR DELETE TO authenticated USING (false);

-- Enable Realtime for specific tables so the app dashboard can update instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.equipment;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.anomalies;
