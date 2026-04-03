================================================================================
  PRODUCT REQUIREMENTS DOCUMENT (PRD)
  Project: SENTINEL — Defence Equipment Accountability & Asset Tracking System
  Hackathon: DefenceTech — Problem Statement 9
  Version: 1.1 (React Native Edition)
  Date: April 2026
================================================================================

TABLE OF CONTENTS
-----------------
  1.  Executive Summary
  2.  Problem Statement
  3.  Goals & Success Criteria
  4.  Tech Stack Decision
  5.  System Architecture Overview
  6.  Database Schema
  7.  Role & Permission Matrix
  8.  PHASE 1 — Core Functional Features (Build These First)
        F1.  Authentication & Role-Based Access Control
        F2.  Equipment Registry (Master Catalog)
        F3.  Check-In / Check-Out System
        F4.  Real-Time Dashboard
        F5.  Tamper-Proof Blockchain Audit Chain
        F6.  Asset Usage & Custody History
        F7.  Maintenance & Service Scheduling
  9.  PHASE 2 — High-Impact Demo Features (Build These Second)
        F8.  Live QR Scan + Instant Dashboard Update
        F9.  AI Anomaly Detection & Auto-Alert Feed
        F10. Predictive Maintenance Scoring (Wear Score Engine)
        F11. Voice Command Check-In / Check-Out
        F12. Offline-First App with Background Sync
        F13. Geo-Fence Zone Enforcement
        F14. Automated Overdue Escalation Workflow
        F15. Automated Daily Status Report via Email
  10. PHASE 3 — Differentiator / Add-On Features (Build If Time Permits)
        F16. Auto-Generated One-Click Compliance PDF
        F17. Biometric + OTP Dual-Factor for Sensitive Items
        F18. Mission-Mode Batch Assignment
        F19. NFC Tap-to-Transfer Custody
        F20. AI-Powered Natural Language Query
        F21. Live Equipment Heatmap on Base Map
        F22. Chain-of-Custody QR Receipt
        F23. AI Mission Readiness Score
        F24. Digital Twin — Equipment Lifecycle View
        F25. Commander War-Room Dashboard (TV Mode)
  11. Demo Day Script
  12. Build Timeline (48-Hour Hackathon Plan)
  13. Risk Register
  14. Appendix — API Contracts & Seed Data



================================================================================
1. EXECUTIVE SUMMARY
================================================================================

SENTINEL is a defence-grade, real-time equipment accountability and asset
tracking system built for the Indian defence hackathon problem statement PS-9.

The system digitises and automates every step of the equipment lifecycle:
procurement registration -> assignment -> check-out -> field use -> check-in ->
maintenance -> audit -> retirement. It enforces strict role-based access,
maintains an immutable tamper-proof audit chain, and surfaces intelligence
through AI anomaly detection, predictive maintenance, and natural language
queries — all accessible via a React Native mobile app (Android/iOS) with
an Expo-managed web export, backed by Supabase (PostgreSQL + Realtime +
Edge Functions).

The product is designed to be demo-able in under 5 minutes with zero
explanation — every feature has a visual "wow moment" that judges can
understand instantly.


================================================================================
2. PROBLEM STATEMENT (from PS-9)
================================================================================

Defence operations involve frequent movement and shared usage of sensitive
equipment across personnel, locations, and missions. Existing accountability
mechanisms often rely on manual logs or isolated digital systems that lack
real-time updates and auditability. This results in:

  - Unclear responsibility for equipment
  - Delayed detection of losses or misuse
  - Inefficient maintenance cycles
  - Poor audit compliance
  - No real-time visibility into asset status or location

SENTINEL addresses all of these with a single integrated platform.


================================================================================
3. GOALS & SUCCESS CRITERIA
================================================================================

PRIMARY GOALS
  G1. Every piece of equipment is tracked with a clear custodian at all times.
  G2. Every event (checkout, transfer, scan) is logged immutably and cannot be
      altered without detection.
  G3. Overdue or anomalous equipment triggers automated escalation — no human
      intervention required.
  G4. A commander can get a full operational picture of all assets in under
      10 seconds from any device.
  G5. The system works in low/no connectivity field environments.

HACKATHON SUCCESS CRITERIA
  - Judges can see a live QR scan update the dashboard in real time.
  - Judges can witness a tamper attempt fail visibly.
  - Judges can see an anomaly auto-flagged within seconds.
  - The system has real data (seeded) and behaves like a live deployment.
  - The demo runs without explanation — it is self-evident.


================================================================================
4. TECH STACK DECISION
================================================================================

FRONTEND + MOBILE
  Framework  : React Native (with Expo managed workflow)
  Language   : TypeScript
  Why        : Single codebase -> Android app + iOS app + Web (via Expo web)
               simultaneously. React Native has a massive ecosystem, strong
               community support, and JavaScript/TypeScript familiarity means
               faster development for most hackathon teams. Expo provides
               a managed workflow that handles native builds without needing
               Xcode or Android Studio during development.
  Key Packages:
    - expo-camera / react-native-vision-camera
                              : QR code scanning (camera integration)
    - @react-native-voice/voice OR expo-speech
                              : Voice command check-in/out
    - expo-notifications       : Push alerts for anomalies/overdue
    - @react-native-async-storage/async-storage + react-native-mmkv
                              : Local offline storage (key-value)
    - @react-native-community/netinfo
                              : Detect online/offline status
    - react-native-gifted-charts OR victory-native
                              : Risk heatmap, charts, wear score graphs
    - react-native-pdf OR expo-print
                              : Generate compliance PDFs in-app
    - react-native-nfc-manager : NFC tap-to-transfer (Android only)
    - react-native-maps        : Base map with live equipment overlays
    - expo-location            : GPS coordinates for geo-fence enforcement
    - @supabase/supabase-js    : Supabase SDK (works natively in RN)
    - react-native-qrcode-svg  : QR code generation for receipts
    - zustand OR redux-toolkit : State management
    - react-navigation (v6)    : Navigation stack and tab navigator
    - nativewind OR styled-components
                              : Styling (Tailwind-like or CSS-in-JS)

  NOTE ON EXPO vs BARE REACT NATIVE:
    Use Expo managed workflow for speed. It handles permissions (camera,
    location, NFC, microphone) via expo-modules without manual native
    configuration. If a package is not Expo-compatible, eject only that
    feature to a bare workflow or use an Expo dev client build.

  WEB EXPORT:
    Run: npx expo export --platform web
    Deploy the output to Vercel in 2 minutes.
    Judges can open the web version on their laptop while you demo
    the mobile app simultaneously — double the impression.
    NOTE: Camera QR scanning on web requires HTTPS (Vercel provides this).
    Some React Native packages have limited web support — use
    react-native-web polyfills or graceful fallbacks for web-only screens.

BACKEND + DATABASE + AUTH
  Platform  : Supabase
  Why over Firebase:
    Firebase uses Firestore (NoSQL) — poor fit for relational defence data.
    Equipment + audit + maintenance + roles are deeply relational.
    Supabase gives you:
      - PostgreSQL  : Full relational joins, perfect for audit chains & RBAC
      - Realtime    : Built-in WebSocket subscriptions (live dashboard updates)
      - Row Level Security (RLS) : SQL-based policies for RBAC
      - Edge Functions (Deno) : Serverless cron jobs, automation logic
      - Auth (JWT)  : Secure session management
  Cost      : Free tier — 500MB DB, 2GB bandwidth, Edge Functions included.
              More than enough for a 48-hour hackathon demo.

  SUPABASE JS SDK IN REACT NATIVE:
    Install: npm install @supabase/supabase-js
    Requires a custom storage adapter for the auth session because
    React Native does not have localStorage. Use AsyncStorage:

      import AsyncStorage from '@react-native-async-storage/async-storage';
      import { createClient } from '@supabase/supabase-js';

      export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      });

AUTOMATION LAYER
  Tool      : Supabase Edge Functions (Deno-based serverless)
  Jobs      :
    - pg_cron every 15 min  : Overdue escalation check
    - pg_cron at 06:00      : Daily email status report
    - DB trigger (PL/pgSQL) : Anomaly detection on every INSERT to events table
    - Webhook               : Push notification trigger

EMAIL
  Service   : Resend API (free tier, 3000 emails/month)
  Use       : Daily briefing PDF email, overdue escalation alerts

AI / NL QUERY
  API       : Claude Haiku (fastest, cheapest) or Gemini Flash (free tier)
  Use       : Translate natural language search queries to Supabase DB filters
  Pattern   : Send user text -> get back structured JSON filter -> apply to query

WEB DEPLOYMENT
  Platform  : Vercel (free tier)
  Command   : npx expo export --platform web -> deploy dist/ folder to Vercel
  Benefit   : Judges can open the web version on their laptop while you demo
              the mobile app simultaneously — double the impression.


================================================================================
5. SYSTEM ARCHITECTURE OVERVIEW
================================================================================

  [React Native App (iOS + Android) + Expo Web Build]
         |
         | HTTPS / WSS (Realtime)
         v
  [Supabase Platform]
    +-- PostgreSQL DB
    |     +-- users
    |     +-- equipment
    |     +-- events (audit log — immutable)
    |     +-- assignments
    |     +-- maintenance_records
    |     +-- zones
    |     +-- missions
    |     +-- anomalies
    +-- Auth (JWT)
    +-- Row Level Security (enforces RBAC at DB level)
    +-- Realtime Subscriptions (live dashboard)
    +-- Edge Functions
          +-- cron_overdue_escalation  (every 15 min)
          +-- cron_daily_briefing      (06:00 daily)
          +-- trigger_anomaly_detect   (on event INSERT)
          +-- nl_query_translate       (AI natural language)
          +-- send_email               (Resend API wrapper)

  [External APIs]
    +-- Claude Haiku / Gemini Flash  (NL query translation)
    +-- Resend                        (email delivery)


================================================================================
6. DATABASE SCHEMA
================================================================================

--- TABLE: users ---
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  name            TEXT NOT NULL
  rank            TEXT  (e.g. "Private", "Lieutenant", "Commander")
  role            TEXT NOT NULL  -- 'soldier','officer','commander','admin'
  unit            TEXT
  zone_id         UUID REFERENCES zones(id)
  email           TEXT UNIQUE
  phone           TEXT
  totp_secret     TEXT  -- for 2FA on sensitive items
  created_at      TIMESTAMPTZ DEFAULT now()

--- TABLE: zones ---
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  name            TEXT NOT NULL  (e.g. "Alpha Base", "Bravo Forward Post")
  lat             FLOAT
  lng             FLOAT
  radius_meters   INT
  created_at      TIMESTAMPTZ DEFAULT now()

--- TABLE: equipment ---
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  qr_code         TEXT UNIQUE NOT NULL
  name            TEXT NOT NULL  (e.g. "INSAS Rifle")
  category        TEXT  (e.g. "Weapon", "Communication", "Vehicle", "Medical")
  serial_number   TEXT UNIQUE
  sensitivity     TEXT  -- 'standard', 'restricted', 'weapons-grade'
  zone_id         UUID REFERENCES zones(id)  -- assigned zone
  status          TEXT  -- 'available','checked-out','maintenance','lost','retired'
  custodian_id    UUID REFERENCES users(id)  -- current holder
  purchase_date   DATE
  last_service    DATE
  wear_score      FLOAT DEFAULT 0  -- 0-100, computed field
  usage_hours     FLOAT DEFAULT 0
  mission_count   INT DEFAULT 0
  created_at      TIMESTAMPTZ DEFAULT now()
  updated_at      TIMESTAMPTZ DEFAULT now()

--- TABLE: events (APPEND-ONLY — never UPDATE or DELETE) ---
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  equipment_id    UUID REFERENCES equipment(id)
  event_type      TEXT  -- 'check-out','check-in','transfer','scan','service',
                        --  'anomaly','zone-violation','tamper-attempt'
  actor_id        UUID REFERENCES users(id)  -- who performed the action
  recipient_id    UUID REFERENCES users(id)  -- who received (for transfers)
  zone_id         UUID REFERENCES zones(id)
  location_lat    FLOAT
  location_lng    FLOAT
  notes           TEXT
  sha256_hash     TEXT NOT NULL  -- hash of (this_event + previous_hash)
  prev_hash       TEXT  -- previous event's hash (forms the chain)
  created_at      TIMESTAMPTZ DEFAULT now()

  NOTE: This table is the immutable audit log. Row Level Security must
        allow INSERT only — no UPDATE, no DELETE for any role.

--- TABLE: assignments ---
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  equipment_id    UUID REFERENCES equipment(id)
  user_id         UUID REFERENCES users(id)
  mission_id      UUID REFERENCES missions(id)
  checked_out_at  TIMESTAMPTZ
  due_back_at     TIMESTAMPTZ
  checked_in_at   TIMESTAMPTZ
  status          TEXT  -- 'active','returned','overdue','lost'

--- TABLE: maintenance_records ---
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  equipment_id    UUID REFERENCES equipment(id)
  type            TEXT  -- 'scheduled','triggered','emergency'
  performed_by    UUID REFERENCES users(id)
  description     TEXT
  parts_replaced  TEXT
  performed_at    TIMESTAMPTZ
  next_due_at     TIMESTAMPTZ
  created_at      TIMESTAMPTZ DEFAULT now()

--- TABLE: missions ---
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  name            TEXT NOT NULL  (e.g. "Operation Thunderbolt")
  commander_id    UUID REFERENCES users(id)
  zone_id         UUID REFERENCES zones(id)
  start_at        TIMESTAMPTZ
  end_at          TIMESTAMPTZ
  status          TEXT  -- 'planning','active','completed','aborted'
  kit_list        JSONB  -- [{category: "Weapon", qty: 5}, ...]
  created_at      TIMESTAMPTZ DEFAULT now()

--- TABLE: anomalies ---
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  equipment_id    UUID REFERENCES equipment(id)
  rule_triggered  TEXT  (e.g. "PAST_CURFEW", "DUAL_LOCATION", "FREQ_SPIKE")
  severity        TEXT  -- 'low','medium','high','critical'
  auto_resolved   BOOLEAN DEFAULT false
  resolved_by     UUID REFERENCES users(id)
  created_at      TIMESTAMPTZ DEFAULT now()


================================================================================
7. ROLE & PERMISSION MATRIX
================================================================================

  Action                        | Soldier | Officer | Commander | Admin
  ------------------------------|---------|---------|-----------|------
  View own checked-out items    |   YES   |   YES   |    YES    |  YES
  Check out personal kit        |   YES   |   YES   |    YES    |  YES
  Check out squad weapons       |   NO    |   YES   |    YES    |  YES
  Check out all equipment       |   NO    |   NO    |    YES    |  YES
  View zone equipment           |   NO    |  OWN    |    ALL    |  ALL
  View all equipment            |   NO    |   NO    |    YES    |  YES
  Create/edit maintenance order |   NO    |   YES   |    YES    |  YES
  Create mission                |   NO    |   YES   |    YES    |  YES
  Batch assign mission kit      |   NO    |   YES   |    YES    |  YES
  View anomaly feed             |   NO    |   YES   |    YES    |  YES
  Resolve anomaly               |   NO    |   YES   |    YES    |  YES
  View audit log                |   NO    |  OWN    |    ALL    |  ALL
  Export compliance PDF         |   NO    |   NO    |    YES    |  YES
  Manage users/roles            |   NO    |   NO    |    NO     |  YES
  View commander dashboard      |   NO    |   NO    |    YES    |  YES

  RBAC is enforced at two layers:
    Layer 1 — React Native UI hides/disables unauthorised UI elements
              based on role stored in the auth session context.
    Layer 2 — Supabase RLS policies block unauthorised DB queries even if the
              UI is bypassed. This is the true security layer.


================================================================================
8. PHASE 1 — CORE FUNCTIONAL FEATURES (BUILD THESE FIRST)
================================================================================

------------------------------------------------------------------------
F1. AUTHENTICATION & ROLE-BASED ACCESS CONTROL
------------------------------------------------------------------------

WHAT IT IS:
  Secure login system where every user has a role (Soldier, Officer,
  Commander, Admin) and can only see/do what their role permits.

WHY FIRST:
  Every other feature depends on knowing WHO is doing an action. Without
  auth, the audit chain is meaningless.

HOW IT WORKS:
  1. User opens the app and sees a login screen.
  2. Enters credentials (email + password).
  3. Supabase Auth validates and returns a JWT token.
  4. React Native app stores the JWT via the AsyncStorage-backed
     Supabase client (configured in Tech Stack section above).
     Do NOT use expo-secure-store for the session — AsyncStorage is
     sufficient and Supabase's SDK handles refresh automatically.
  5. Every Supabase query automatically includes the JWT in the header
     via the configured supabase client instance.
  6. Supabase RLS policies evaluate the JWT claims (role, user_id, zone_id)
     and allow/deny each query at the database level.

  ROLE CONTEXT IN REACT NATIVE:
    Create a React Context (AuthContext) that stores the current user
    object including their role and zone_id after login:

      const { data: { user } } = await supabase.auth.getUser();
      // Fetch profile from users table using user.id
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      // Store profile in AuthContext
      // Use profile.role throughout the app to conditionally render UI

  NAVIGATION GUARD:
    Use react-navigation's route guards. After login, push to the
    role-appropriate stack:
      soldier   -> SoldierStack (limited screens)
      officer   -> OfficerStack
      commander -> CommanderStack (full access)
      admin     -> AdminStack

IMPLEMENTATION NOTES:
  - RLS example for the events table (insert-only):
      CREATE POLICY "allow insert for authenticated"
      ON events FOR INSERT TO authenticated
      USING (true);

      CREATE POLICY "deny update"
      ON events FOR UPDATE TO authenticated
      USING (false);

      CREATE POLICY "deny delete"
      ON events FOR DELETE TO authenticated
      USING (false);

  - RLS example for equipment visibility by zone:
      CREATE POLICY "officer sees own zone"
      ON equipment FOR SELECT TO authenticated
      USING (
        zone_id = (SELECT zone_id FROM users WHERE id = auth.uid())
        OR (SELECT role FROM users WHERE id = auth.uid()) = 'commander'
        OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
      );

SEED DATA:
  Create 6 test users:
    - pvt_sharma@sentinel.in     role: soldier
    - lt_mehta@sentinel.in       role: officer
    - cdr_singh@sentinel.in      role: commander
    - admin@sentinel.in          role: admin
    - pvt_kumar@sentinel.in      role: soldier
    - lt_rao@sentinel.in         role: officer


------------------------------------------------------------------------
F2. EQUIPMENT REGISTRY (MASTER CATALOG)
------------------------------------------------------------------------

WHAT IT IS:
  A complete database of every piece of equipment with its full profile.
  This is the source of truth for all other features.

HOW IT WORKS:
  1. Admin registers equipment with: name, category, serial number,
     sensitivity level, assigned zone, purchase date.
  2. System auto-generates a unique QR code string and stores it.
  3. A QR code image can be rendered in-app and shared/printed using
     the react-native-qrcode-svg package and expo-print.
  4. Equipment status is maintained automatically as events are logged:
       - No active assignment  -> 'available'
       - Active checkout       -> 'checked-out'
       - Maintenance order     -> 'maintenance'
       - Escalated to T+12hr  -> 'potential-loss'

UI SCREENS:
  - Equipment List Screen: filterable by category, zone, status, custodian.
    Use a FlatList with filter chips at the top. Each row shows: QR
    thumbnail (react-native-qrcode-svg, small size), name, serial,
    status badge (colored View + Text), last event time.
  - Equipment Detail Screen: full profile, wear score gauge
    (react-native-gifted-charts CircularProgress or custom SVG),
    custody timeline (custom FlatList), maintenance history,
    anomaly flags, action buttons (check-out, transfer, flag for
    maintenance).
  - Add Equipment Screen: form using TextInput and Picker components
    (admin/officer only). Validate on submit before Supabase insert.

SEED DATA:
  Create at least 20 equipment items across categories:
    5 weapons (INSAS Rifle, Pistol, etc.) — sensitivity: weapons-grade
    5 comms (Radio set, Satellite phone) — sensitivity: restricted
    5 vehicles (Jeep, Motorcycle) — sensitivity: standard
    3 medical kits — sensitivity: standard
    2 optics (Binoculars, Night-vision) — sensitivity: restricted


------------------------------------------------------------------------
F3. CHECK-IN / CHECK-OUT SYSTEM
------------------------------------------------------------------------

WHAT IT IS:
  The core transactional function — scanning or selecting equipment to
  formally assign custody to a person and record the event immutably.

HOW IT WORKS:

  CHECK-OUT FLOW:
    1. Officer presses "Check-Out" button. Navigator pushes to
       CheckOutScreen.
    2. Camera opens via expo-camera or react-native-vision-camera
       with QR scanning enabled (or manual search TextInput fallback).
    3. System validates:
         a. Equipment is 'available' (not already checked out).
         b. Officer's role permits this equipment category.
         c. Equipment is in officer's assigned zone (geo-fence check).
         d. If sensitivity = 'weapons-grade': trigger 2FA (OTP modal).
    4. Officer selects recipient (soldier from FlatList dropdown) and
       due-back time (DateTimePicker).
    5. On confirm:
         a. Assignment record created in assignments table.
         b. Equipment status updated to 'checked-out', custodian_id set.
         c. Event record inserted to events table with SHA-256 hash.
         d. Supabase Realtime broadcasts the change via WebSocket.
         e. All subscribed clients update their dashboards instantly.
    6. A QR receipt is generated using react-native-qrcode-svg and
       saved to the custodian's local storage / profile.

  CHECK-IN FLOW:
    1. Officer or custodian opens Check-In screen. Camera activates.
    2. Scans QR code on equipment.
    3. System validates it is assigned to this person.
    4. On confirm:
         a. Assignment record closed (checked_in_at set, status='returned').
         b. Equipment status updated to 'available'.
         c. Event record inserted with SHA-256 hash.
         d. Wear score recalculated.
         e. If usage exceeded threshold -> maintenance work order auto-created.

  TRANSFER FLOW:
    1. Officer initiates transfer of item from Person A to Person B.
    2. Both parties visible on screen (searchable FlatList).
    3. Event type 'transfer' logged to events table.
    4. custodian_id updated on equipment row.
    5. Both users notified via expo-notifications push.

ERROR STATES TO HANDLE (show clearly to demo judges):
  - Equipment already checked out -> show current custodian and expected return
  - Role insufficient -> show "Access Denied" modal with required role
  - Zone mismatch -> show "Zone Violation" alert dialog
  - Item flagged for maintenance -> show warning, require override with reason


------------------------------------------------------------------------
F4. REAL-TIME DASHBOARD
------------------------------------------------------------------------

WHAT IT IS:
  A live command overview screen that updates instantly whenever any scan
  or event is logged anywhere in the system. No pull-to-refresh needed.

HOW IT WORKS:
  1. On component mount, subscribe to Supabase Realtime channel:

       const channel = supabase
         .channel('events-feed')
         .on('postgres_changes',
           { event: 'INSERT', schema: 'public', table: 'events' },
           (payload) => {
             // Update local state — e.g. dispatch to Zustand store
             handleNewEvent(payload.new);
           }
         )
         .subscribe();

       // Cleanup on unmount:
       return () => { supabase.removeChannel(channel); };

  2. State manager (Zustand) holds dashboard stats. On new event,
     update the relevant slice (counts, overdue list, activity feed).
  3. React Native re-renders only the affected components.
     Use React.memo and FlatList's extraData prop to control re-renders.
  4. Latency: typically < 200ms from scan to screen update.

DASHBOARD WIDGETS (prioritised by demo impact):
  1. Summary tiles (top row — horizontal ScrollView of cards):
       - Total equipment: X
       - Checked out now: X
       - Overdue: X (red badge if > 0)
       - Flagged anomalies: X (red badge)
       - In maintenance: X

  2. Live Activity Feed (FlatList, inverted=false, newest at top):
       Each item: [time] [event icon] [equipment name] [actor] [action]
       Animate new items in with LayoutAnimation or Reanimated.

  3. Equipment Status Breakdown (donut chart via victory-native or
     react-native-gifted-charts):
       Available / Checked-Out / Overdue / Maintenance / Lost

  4. Zone Status Grid (FlatList with numColumns=2):
       Shows count of available vs checked-out per zone.
       Color: green (all good), amber (some overdue), red (anomaly/loss).

  5. Overdue Items List (FlatList, sorted by most overdue first):
       Each row: equipment name, custodian, due time, time overdue.

ROLE-BASED VIEW:
  - Soldier sees: only their own assigned items (filter by auth user id).
  - Officer sees: all items in their zone.
  - Commander sees: all items across all zones, plus anomaly feed.

  Implement via conditional rendering based on AuthContext role:
    {role === 'commander' && <CommanderWidgets />}


------------------------------------------------------------------------
F5. TAMPER-PROOF BLOCKCHAIN AUDIT CHAIN
------------------------------------------------------------------------

WHAT IT IS:
  Every event in the system is cryptographically linked to the previous
  event. If anyone attempts to modify, delete, or insert a past record,
  the hash chain breaks — and the system detects it immediately.

HOW IT WORKS:

  HASHING IN REACT NATIVE:
    Use the 'crypto-js' npm package (pure JS, works in React Native):
      npm install crypto-js
      import CryptoJS from 'crypto-js';
      const hash = CryptoJS.SHA256(payloadString).toString();

  CHAIN CONSTRUCTION:
    When a new event is inserted:
      1. Fetch the hash of the most recent event for this equipment
         (or use '0000...0000' if this is the first event).
      2. Construct payload string:
           payload = event_id + equipment_id + event_type + actor_id +
                     created_at.toString() + prev_hash
      3. Compute: new_hash = SHA256(payload)
      4. Store both prev_hash and sha256_hash on the new event row.

  TAMPER DETECTION:
    To verify the chain for a given equipment item:
      1. Fetch all events for that item, ordered by created_at ASC.
      2. Starting from event 1, re-compute each hash using the same formula.
      3. Compare computed hash to stored hash.
      4. If any mismatch -> chain is broken -> tamper detected.

  DEMO MOMENT (Tamper Simulation Button):
    In the Audit Log screen, show a "Simulate Tamper" button (admin only).
    When pressed:
      - Directly update a past event's notes field in the DB.
      - Re-run chain verification.
      - The row where the tamper occurred renders with red background.
      - A banner View at the top: "CHAIN BREACH DETECTED AT EVENT #X"
    This is visually unmistakable for judges.

UI:
  - Audit Log screen: FlatList of events. Each row has equipment, event,
    actor, time, truncated hash (first 12 chars), and a green checkmark
    Icon or red X Icon (react-native-vector-icons or expo/vector-icons).
  - Tap any row to navigate to EventDetailScreen showing full hash.


------------------------------------------------------------------------
F6. ASSET USAGE & CUSTODY HISTORY
------------------------------------------------------------------------

WHAT IT IS:
  A complete timeline view of everything that has ever happened to a piece
  of equipment — from the moment it was registered to today.

HOW IT WORKS:
  - On Equipment Detail Screen, a vertical timeline is rendered.
  - Fetch all events from the events table filtered by equipment_id,
    ordered by created_at ASC.
  - Render with a custom FlatList where each item is a timeline node:
    a vertical line on the left, a coloured circle/icon, event details
    on the right. This is a common React Native custom component pattern
    — build it as a reusable <TimelineItem /> component.
  - Event types have distinct icons and colours (expo/vector-icons):
      check-out        : blue MaterialCommunityIcons 'arrow-right-circle'
      check-in         : green 'arrow-left-circle'
      transfer         : orange 'swap-horizontal'
      service          : grey 'wrench'
      anomaly          : red 'alert-circle'
      zone-violation   : purple 'map-marker-off'
  - Tapping a node navigates to EventDetailScreen with full hash.
  - Add filter chips above the FlatList to filter by event type or
    use a date range picker.

CUSTODY CHAIN DISPLAY:
  At the top of the equipment detail screen, a Text component:
  "CURRENT CUSTODIAN: Lt. Mehta (Zone Alpha) — checked out 3h 22m ago"
  Below: a horizontal ScrollView showing every past custodian as a chip.


------------------------------------------------------------------------
F7. MAINTENANCE & SERVICE SCHEDULING
------------------------------------------------------------------------

WHAT IT IS:
  Tracks the service history of every item and triggers automatic
  maintenance work orders based on usage thresholds.

HOW IT WORKS:

  SCHEDULED MAINTENANCE:
    When equipment is registered, a default maintenance interval is set
    (e.g. rifles: every 500 usage hours OR 90 days, whichever first).
    A background cron (pg_cron on Supabase) checks daily and creates a
    maintenance work order when either threshold is crossed.

  AUTO-TRIGGERED FROM CHECK-IN:
    When an item is checked in:
      - Recalculate wear score (see F10) on the client side.
      - If wear_score > 75: auto-create a maintenance work order via
        Supabase insert to maintenance_records table.
      - Equipment status set to 'maintenance', item unavailable until cleared.

  MAINTENANCE WORK ORDER SCREEN:
    A Card component per work order showing: item name, reason, assigned
    tech (Picker), due date (DateTimePicker), parts list (TextInput),
    estimated completion. Officer taps "Mark Complete" which:
      - Inserts a 'service' event to events table.
      - Resets wear_score to 0 and updates last_service date.
      - Sets equipment status back to 'available'.

  MAINTENANCE CALENDAR:
    Use a React Native calendar library (react-native-calendars) to show
    upcoming maintenance due dates. Color-coded dot markers:
    green (scheduled), amber (due soon), red (overdue).


================================================================================
9. PHASE 2 — HIGH-IMPACT DEMO FEATURES (BUILD THESE SECOND)
================================================================================

------------------------------------------------------------------------
F8. LIVE QR SCAN + INSTANT DASHBOARD UPDATE
------------------------------------------------------------------------

WHAT IT IS:
  The #1 demo feature. Opens camera, scans a QR sticker on any object,
  and the dashboard updates across ALL connected devices in under 1 second.
  Zero explanation needed — judges see it happen.

HOW IT WORKS:
  1. Officer presses "Scan" button in the tab bar.
  2. React Native camera opens via expo-camera or
     react-native-vision-camera (recommended for performance).
  3. QR code is decoded. The barcode scanner callbacks return the
     equipment ID string immediately.
  4. App calls Supabase to create a check-out or check-in event.
  5. Supabase Realtime broadcasts the change via WebSocket.
  6. Every other subscribed client (including the web dashboard)
     receives the event and updates state instantly.
  7. Total latency: < 500ms from scan to visible update.

  CAMERA PACKAGE CHOICE:
    expo-camera: easier setup, good enough for QR scanning.
    react-native-vision-camera (v3+): faster, supports frame processors,
    best scan performance. Requires bare workflow or expo dev client.
    Recommendation: use expo-camera for hackathon speed.

SETUP FOR DEMO:
  - Print QR stickers for 5-10 real objects in the room (pens, bottles,
    notebooks — label them as "Rifle INSAS-023", "Radio Set R-04", etc.)
  - Have a second device (laptop) showing the web dashboard.
  - Scan a sticker with the phone -> judge watches the laptop update live.
  - This is the single most impactful demo moment. Practice it.

TECHNICAL NOTES:
  - QR code string format: "SENTINEL:EQ:{equipment_id}"
    Example: "SENTINEL:EQ:3f2a9c14-..."
  - Supabase Realtime WebSocket round-trip: typically 100-300ms.
  - Total perceived latency for judge: < 500ms. Instantaneous in practice.


------------------------------------------------------------------------
F9. AI ANOMALY DETECTION & AUTO-ALERT FEED
------------------------------------------------------------------------

WHAT IT IS:
  A rule-based engine that monitors every event inserted into the system
  and automatically flags suspicious behaviour without any human trigger.
  A live "anomaly feed" shows new alerts in real time with a red badge.

WHY IT MATTERS:
  This demonstrates the system is not just passive record-keeping but
  active intelligence. Judges from a defence background understand
  immediately why automated threat detection matters.

ANOMALY RULES (implement all of these):

  Rule 1 — PAST_CURFEW:
    Triggered when: An item is still checked out after the due_back_at
    timestamp has passed.
    Severity: medium (escalates to high after T+4hr)
    Detection: pg_cron runs every 15 minutes. Query:
      SELECT * FROM assignments
      WHERE status = 'active' AND due_back_at < now()

  Rule 2 — DUAL_LOCATION:
    Triggered when: The same equipment_id is scanned at two different
    zones within a 10-minute window.
    Severity: critical (physically impossible — implies cloned QR or error)
    Detection: On every event INSERT, a DB trigger checks:
      SELECT zone_id FROM events
      WHERE equipment_id = NEW.equipment_id
        AND created_at > NOW() - interval '10 minutes'
        AND zone_id != NEW.zone_id
      LIMIT 1

  Rule 3 — FREQUENCY_SPIKE:
    Triggered when: An equipment item is scanned more than 10 times
    in a single hour (normal is < 3 scans/hour).
    Severity: medium
    Detection: DB trigger counts events in the last 60 minutes.

  Rule 4 — UNREGISTERED_SCAN:
    Triggered when: A QR code is scanned that does not match any
    equipment_id in the database.
    Severity: high (possible counterfeit or probe)
    Detection: In React Native — after scanning, query Supabase for the
    equipment ID. If no result found, log an 'unregistered-scan' event
    with the raw QR string in the notes field.

  Rule 5 — SENSITIVE_ITEM_OFF_ZONE:
    Triggered when: A weapons-grade item is scanned in a zone it is
    not assigned to.
    Severity: critical

  Rule 6 — LONG_CHECKOUT:
    Triggered when: A restricted or weapons-grade item has been
    checked out for more than 72 hours.
    Severity: high

ANOMALY FEED UI:
  - Tab bar badge (react-navigation TabBar badge prop) showing
    unresolved anomaly count in red.
  - AnomalyFeedScreen: FlatList where each item is an AnomalyCard:
    icon, severity badge (colored Text/View), rule name, equipment name,
    relative time (e.g. "3 minutes ago").
  - Tapping a card navigates to AnomalyDetailScreen with full details,
    equipment timeline, and action buttons: "Acknowledge", "Resolve",
    "Escalate to Commander".
  - New anomalies animate in via LayoutAnimation.Configure() called
    before state update, or use Reanimated's FadeIn entering animation.

  Subscribe in AnomalyFeedScreen:
    supabase.channel('anomalies')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'anomalies' },
        (payload) => prependAnomaly(payload.new)
      ).subscribe();

DEMO TRIGGER:
  "Trigger Demo Anomaly" button (admin only):
    1. Inserts a fake scan event for the same item in two zones.
    2. DB trigger creates the DUAL_LOCATION anomaly record.
    3. Realtime pushes it to the AnomalyFeed on all connected devices.
    4. Tab badge increments. expo-notifications local notification fires.


------------------------------------------------------------------------
F10. PREDICTIVE MAINTENANCE SCORING (WEAR SCORE ENGINE)
------------------------------------------------------------------------

WHAT IT IS:
  Each equipment item accumulates a numeric "wear score" from 0 to 100
  based on multiple usage signals. When the score exceeds a threshold,
  the system automatically creates a maintenance work order. A risk
  heatmap shows which assets are at highest risk.

WHY IT MATTERS:
  Shows the system is proactive, not reactive. Commanders see operational
  readiness risk before it becomes a field failure.

WEAR SCORE FORMULA:
  wear_score = (
    (usage_hours / max_hours_before_service * 40)  +  -- 40% weight
    (mission_count / max_missions_before_service * 25) +  -- 25% weight
    (days_since_last_service / service_interval_days * 25) +  -- 25% weight
    (environment_flag_score * 10)  -- 10% weight
  )
  Capped at 100. Rounded to 1 decimal.

  max_hours_before_service: defined per equipment category.
    Example defaults:
      Rifle: 500 hours, Radio: 1000 hours, Vehicle: 2000 hours

  environment_flag_score:
    0 = standard garrison use
    5 = field deployment (dusty, wet environment)
    10 = extreme environment (desert, jungle, maritime)

  days_since_last_service: (today - last_service date) in days

WEAR SCORE THRESHOLDS:
  0-40    : GREEN  — no action needed
  40-65   : AMBER  — schedule maintenance soon
  65-80   : ORANGE — create maintenance work order (non-blocking)
  80-100  : RED    — create maintenance work order + block check-out
  100     : CRITICAL — mark as unavailable until serviced

WHEN WEAR SCORE IS RECALCULATED:
  - On every check-in event: usage_hours += assignment duration
  - On every mission end: mission_count++
  - Daily via pg_cron: days_since_last_service updated on the server side

RISK HEATMAP UI:
  - A FlatList with numColumns=2 (grid layout) of EquipmentRiskCard
    components, each colored by wear score tier.
  - Sortable by wear score (highest first) via local state sort.
  - One-tap "Create Work Order" TouchableOpacity on each red/orange card.
  - A BarChart (react-native-gifted-charts) showing score distribution.


------------------------------------------------------------------------
F11. VOICE COMMAND CHECK-IN / CHECK-OUT
------------------------------------------------------------------------

WHAT IT IS:
  Officer says: "Check out Rifle AK-47-023 to Officer Raj" and the
  system parses the spoken command and executes the action — no typing,
  no scanning.

WHY IT MATTERS:
  Unmissable live demo moment. Demonstrates field-ready UX where hands
  may be occupied or gloved.

HOW IT WORKS IN REACT NATIVE:
  1. Officer taps the microphone button (FloatingActionButton).
  2. @react-native-voice/voice starts recording.
     (Requires microphone permission — request via expo-permissions or
     PermissionsAndroid on Android, Info.plist key on iOS.)
  3. On speech end, the transcript string is available in the
     onSpeechResults callback.
  4. COMMAND PARSER (rule-based, no AI needed):
       Parse the transcript string with regex patterns:
         /check\s*out\s+(.+?)\s+to\s+(.+)/i  -> checkout action
         /check\s*in\s+(.+)/i                 -> checkin action
         /transfer\s+(.+?)\s+to\s+(.+)/i      -> transfer action
         /status\s+of\s+(.+)/i               -> detail view
       Fuzzy match item name: compare against equipment names using
       Levenshtein distance (use the 'fastest-levenshtein' npm package).
       Fuzzy match person name: compare against users.name list.
  5. Show a confirmation Modal:
       "Check out INSAS Rifle (INSAS-023) to Lt. Rajesh Mehta — confirm?"
       Confirm / Cancel buttons.
  6. On confirm: execute same flow as F3 CheckOut.
  7. If parsing fails: show a Snackbar: "Could not understand. Try again."

  PACKAGE NOTE:
    @react-native-voice/voice requires a bare or Expo dev client build.
    Alternative: expo-av's Audio.Recording for raw audio, then use a
    lightweight on-device speech-to-text if available via platform APIs.
    For hackathon speed, test @react-native-voice/voice first.

DEMO SCRIPT:
  Say exactly: "Check out Radio Set R-04 to Officer Mehta"


------------------------------------------------------------------------
F12. OFFLINE-FIRST APP WITH BACKGROUND SYNC
------------------------------------------------------------------------

WHAT IT IS:
  The app works fully when WiFi or mobile data is unavailable. Scans
  and events are stored locally and automatically synced to the server
  the moment connectivity is restored.

HOW IT WORKS:

  LOCAL STORAGE — AsyncStorage + react-native-mmkv:
    Use MMKV for fast synchronous writes (scan events need to be stored
    immediately, not awaited). Store pending events as a JSON array
    under the key 'pending_events'.

    import { MMKV } from 'react-native-mmkv';
    const storage = new MMKV();

    // Store pending event:
    const pending = JSON.parse(storage.getString('pending_events') || '[]');
    pending.push(eventPayload);
    storage.set('pending_events', JSON.stringify(pending));

  CONNECTIVITY DETECTION — @react-native-community/netinfo:
    import NetInfo from '@react-native-community/netinfo';

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected) syncPendingEvents();
        else showOfflineBanner();
      });
      return unsubscribe;
    }, []);

  OFFLINE BANNER:
    A persistent View at the top of the screen (or bottom Sheet) that
    appears when isConnected = false:
    "OFFLINE — scans are being saved locally."
    Use a red background. Disappears when connected.

  SYNC PROCESS:
    async function syncPendingEvents() {
      const pending = JSON.parse(storage.getString('pending_events') || '[]');
      if (!pending.length) return;
      showToast('Syncing ' + pending.length + ' pending events...');
      const sorted = pending.sort((a, b) => a.created_at - b.created_at);
      for (const event of sorted) {
        const { error } = await supabase.from('events').insert(event);
        if (!error) removeFromPending(event.id);
      }
      showToast('All events synced. Chain verified.');
    }

  CONFLICT HANDLING:
    If an insert fails (e.g. equipment already checked in by another
    user while offline): keep the event in pending with a 'conflict'
    flag. Show a "Conflicts requiring review" list in Settings screen.

DEMO:
  1. Put phone in airplane mode. Show the "OFFLINE" banner.
  2. Scan 3 QR codes — they register locally. Counter shows "3 pending".
  3. Disable airplane mode.
  4. Watch "Syncing 3 pending events..." toast.
  5. Dashboard on the laptop updates with all 3 events.


------------------------------------------------------------------------
F13. GEO-FENCE ZONE ENFORCEMENT
------------------------------------------------------------------------

WHAT IT IS:
  Each base or outpost is a geo-fenced zone. Equipment assigned to Zone A
  cannot be checked in or out from Zone B's location. Crossing a zone
  boundary auto-raises a "location violation" alert.

HOW IT WORKS:
  1. Each zone: GPS coordinate (lat/lng) + radius_meters in zones table.
  2. On scan, get current GPS via expo-location:
       const { coords } = await Location.getCurrentPositionAsync({});
  3. Compute distance from scanner's location to item's assigned zone
     centre using the Haversine formula:

       function haversineDistance(lat1, lng1, lat2, lng2) {
         const R = 6371000; // Earth radius in metres
         const dLat = (lat2 - lat1) * Math.PI / 180;
         const dLng = (lng2 - lng1) * Math.PI / 180;
         const a = Math.sin(dLat/2)**2 +
                   Math.cos(lat1 * Math.PI/180) *
                   Math.cos(lat2 * Math.PI/180) *
                   Math.sin(dLng/2)**2;
         return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
       }

  4. If distance > zone.radius_meters AND sensitivity != 'standard':
       - Block the action.
       - Insert a 'zone-violation' event.
       - Insert a ZONE_VIOLATION anomaly record.
       - Show Alert.alert("Zone Violation", "This item is assigned to
         Zone Alpha. You are currently in Zone Bravo. Anomaly reported.")

  LOCATION PERMISSION:
    Request at app start via expo-location:
      await Location.requestForegroundPermissionsAsync();

DEMO SETUP:
  Simulate a zone violation by temporarily hardcoding a test GPS
  coordinate far from the demo room in a "Demo Geo-Fence Test" button,
  which overrides the real GPS for one scan.


------------------------------------------------------------------------
F14. AUTOMATED OVERDUE ESCALATION WORKFLOW
------------------------------------------------------------------------

WHAT IT IS:
  When equipment is not returned within its mission window, the system
  automatically escalates the issue up the chain of command at defined
  intervals — without any human intervention.

ESCALATION CHAIN:
  T+0    : Equipment becomes overdue (due_back_at has passed)
  T+1hr  : System notifies the custodian (push + anomaly flag)
  T+4hr  : System notifies the custodian's officer (push + email)
  T+12hr : System notifies zone commander (push + email) + marks
            equipment status as 'potential-loss'
  T+24hr : System notifies headquarters admin + creates a formal
            'potential-loss' incident record

HOW IT WORKS:
  - pg_cron function runs every 15 minutes on Supabase.
  - Queries active assignments where due_back_at < now().
  - For each: compute time_overdue = now() - due_back_at.
  - Apply escalation rules above.
  - Push notifications via Supabase Edge Function -> Expo Push API
    (use expo-server-sdk on the Edge Function side, expo-notifications
    on the React Native side for token registration).
  - Emails via Resend API.
  - Each escalation action logged as an 'escalation' event type.

  EXPO PUSH NOTIFICATION SETUP:
    On app start, register for push token:
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // Save token to users table: users.expo_push_token

    Edge Function sends to Expo Push API:
      POST https://exp.host/--/api/v2/push/send
      { to: user.expo_push_token, title: "SENTINEL Alert",
        body: "Rifle INSAS-023 is 4 hours overdue. Investigate." }

DEMO MOMENT:
  Create an assignment with due_back_at = 5 minutes ago.
  Show the escalation timeline card in the UI.
  Show the T+1hr notification as already fired (or simulate it via
  a "Simulate Escalation" button that fast-forwards the logic).


------------------------------------------------------------------------
F15. AUTOMATED DAILY STATUS REPORT VIA EMAIL
------------------------------------------------------------------------

WHAT IT IS:
  Every morning at 06:00 hours, the system automatically generates a
  structured briefing and emails it to all commanders. Commanders wake
  up with a full situational picture.

HOW IT WORKS:
  1. A Supabase Edge Function scheduled via pg_cron:
       SELECT cron.schedule('daily-briefing', '0 6 * * *',
         $$SELECT net.http_post(url:'https://.../functions/v1/daily-briefing', ...)$$);

  2. Edge Function queries:
       - All equipment with status != 'available'
       - All anomalies created in the last 24 hours
       - All overdue assignments
       - All maintenance work orders due this week

  3. Generates an HTML email with a structured table-based report.

  4. Sends via Resend API:
       POST https://api.resend.com/emails
       { from: "sentinel@yourapp.com",
         to: ["cdr_singh@sentinel.in"],
         subject: "SENTINEL Daily Briefing — 03 Apr 2026",
         html: "..." }

DEMO MOMENT:
  Show the judge a sample email in a browser tab (pre-loaded).
  It looks like a real military morning report. Operational value
  is self-evident.


================================================================================
10. PHASE 3 — DIFFERENTIATOR / ADD-ON FEATURES (BUILD IF TIME PERMITS)
================================================================================

------------------------------------------------------------------------
F16. AUTO-GENERATED ONE-CLICK COMPLIANCE PDF
------------------------------------------------------------------------

WHAT IT IS:
  A single button exports a full compliance audit report as a formatted
  PDF — the kind of document that would normally take 8 hours of manual
  paperwork per audit cycle.

CONTENTS OF THE PDF:
  Page 1 — Cover: Inspection report header, unit name, date, classification
  Page 2 — Equipment Inventory Summary: table of all items, status, custodian
  Page 3 — Chain-of-Custody Table: every event for every item in the period
  Page 4 — Anomaly Summary: all anomalies, severity, resolution status
  Page 5 — Maintenance Log: all services performed, next due dates
  Page 6 — Signature Block: digital signature placeholder for commander

IMPLEMENTATION IN REACT NATIVE:
  Option A (recommended): Generate an HTML string from the data and
  render to PDF using expo-print:
    import * as Print from 'expo-print';
    import * as Sharing from 'expo-sharing';

    const { uri } = await Print.printToFileAsync({ html: reportHtml });
    await Sharing.shareAsync(uri);

  Option B: Use react-native-pdf-lib or react-native-html-to-pdf for
  more control over styling.

  Build the reportHtml string from live Supabase data using template
  literals. Style it with inline CSS to look like an official form.

DEMO:
  Tap "Export Audit Report" -> PDF renders -> Share sheet appears.
  PDF looks like an actual defence inspection form. Judges are impressed.


------------------------------------------------------------------------
F17. BIOMETRIC + OTP DUAL-FACTOR FOR SENSITIVE ITEMS
------------------------------------------------------------------------

WHAT IT IS:
  Checking out a weapons-grade item requires two factors:
  (1) Role verification (RBAC) and (2) A time-based OTP (TOTP).
  This demonstrates defence-grade security beyond a login screen.

HOW IT WORKS:
  1. When a weapons-grade item is selected for checkout, a 6-digit OTP
     Modal appears.
  2. Officer enters the code from their authenticator app (or the
     SENTINEL in-app OTP screen if you build the TOTP generator).
  3. React Native app sends { user_id, token, equipment_id } to the
     Supabase Edge Function /functions/v1/verify-totp.
  4. Edge Function verifies server-side using a TOTP library
     (e.g. otpauth Deno module):
       - Fetch user's totp_secret from users table.
       - Verify the token against current 30-second window.
  5. If valid: checkout proceeds. If invalid: AccessDeniedScreen shown
     + tamper-attempt event logged.

  BIOMETRIC LAYER (bonus):
    Use expo-local-authentication for Face ID / fingerprint verification
    as the first factor before the OTP prompt:
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Verify identity for weapons checkout'
      });

DEMO:
  Show OTP updating every 30 seconds on screen. Enter code correctly
  -> access granted. Enter wrong code -> access denied banner.


------------------------------------------------------------------------
F18. MISSION-MODE BATCH ASSIGNMENT
------------------------------------------------------------------------

WHAT IT IS:
  A commander creates a mission ("Operation Thunderbolt") and assigns
  an entire kit list for all squad members in a single action — instead
  of dozens of individual check-outs.

HOW IT WORKS:
  1. Commander opens "New Mission" screen (Form with TextInput, Pickers).
  2. Enters mission name, zone, start/end times.
  3. Adds squad members (multi-select FlatList with checkboxes).
  4. Defines a kit list template (category + qty_per_person).
  5. On "Deploy Mission":
       - Query available equipment matching each category.
       - Use first-available logic to assign items to squad members.
       - Bulk insert all assignments and events in a single Supabase
         RPC (stored procedure) call to ensure atomicity.
       - All events logged in one transaction.
  6. On "End Mission": bulk check-in via the same RPC.

  SUPABASE RPC FOR BATCH ASSIGNMENT:
    Create a PostgreSQL function:
      CREATE OR REPLACE FUNCTION batch_assign_mission(mission_id uuid, ...)
      RETURNS void AS $$
      BEGIN
        -- Insert all assignments and events atomically
      END;
      $$ LANGUAGE plpgsql;

    Call from React Native:
      await supabase.rpc('batch_assign_mission', { mission_id, ... });

DEMO:
  "I'm deploying 5 soldiers with 10 items each in one tap."
  Tap "Deploy Mission." Watch 50 events appear in the activity feed.


------------------------------------------------------------------------
F19. NFC TAP-TO-TRANSFER CUSTODY
------------------------------------------------------------------------

WHAT IT IS:
  Two Android phones tap together to transfer custody of equipment —
  no QR scanner, no typing. The transfer is logged, both officers
  receive a push notification receipt.

HOW IT WORKS:
  Use react-native-nfc-manager:
    import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

    // Officer A writes NFC payload:
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const payload = Ndef.encodeMessage([
      Ndef.textRecord(JSON.stringify({ equipment_id, from_user_id, ts }))
    ]);
    await NfcManager.ndefHandler.writeNdefMessage(payload);

    // Officer B reads:
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    // Parse payload, show "Accept transfer?" Modal, log transfer event.

LIMITATION: Android only (NFC hardware required). Falls back to manual
transfer screen on iOS.
DEMO VALUE: Extremely futuristic for a hackathon. Show it if possible.


------------------------------------------------------------------------
F20. AI-POWERED NATURAL LANGUAGE QUERY
------------------------------------------------------------------------

WHAT IT IS:
  Type any natural language question in the search box and get instant
  filtered results — no SQL, no dropdown menus needed.

EXAMPLES:
  "Show me all weapons checked out more than 3 days ago"
  -> { category: 'Weapon', checked_out_since: '-3d' }

  "Which items in Zone Alpha are overdue?"
  -> { zone: 'Alpha', status: 'overdue' }

  "Equipment with wear score above 70"
  -> { wear_score_min: 70 }

HOW IT WORKS:
  1. User types in a TextInput (smart search bar) and submits.
  2. React Native app sends the query to a Supabase Edge Function.
  3. Edge Function calls Claude Haiku API with system prompt:
       "You are a filter translator for a military equipment database.
        Convert the user's query into a JSON filter object with fields:
        category, zone_id, status, wear_score_min, checked_out_since,
        last_service_before. Respond ONLY with valid JSON. No explanation."
  4. Parse JSON response.
  5. Apply filters to Supabase query with .eq(), .gte(), .lt() etc.
  6. Update the Equipment FlatList with results.

COST: Claude Haiku ~$0.0003 per query. 100 queries = $0.03.

DEMO MOMENT: Type a complex query live. Results appear in 1-2 seconds.


------------------------------------------------------------------------
F21. LIVE EQUIPMENT HEATMAP ON BASE MAP
------------------------------------------------------------------------

WHAT IT IS:
  A real-time dot-map showing where every piece of equipment is located
  across base zones right now. Colour-coded by status.

HOW IT WORKS:
  Use react-native-maps with MapView:
    <MapView style={{ flex: 1 }} initialRegion={...}>
      {equipment.map(item => (
        <Marker
          key={item.id}
          coordinate={{ latitude: item.lat, longitude: item.lng }}
          pinColor={statusToColor(item.status)}
          onPress={() => showItemCard(item)}
        />
      ))}
      {zones.map(zone => (
        <Circle
          key={zone.id}
          center={{ latitude: zone.lat, longitude: zone.lng }}
          radius={zone.radius_meters}
          strokeColor="rgba(27,67,50,0.5)"
          fillColor="rgba(27,67,50,0.1)"
        />
      ))}
    </MapView>

  Dot colours:
    Green  = available (at zone home)
    Yellow = checked out
    Red    = overdue or anomaly
    Grey   = in maintenance

  Supabase Realtime subscription updates marker positions live.

  NOTE: react-native-maps requires Google Maps API key on Android and
  Apple Maps entitlement on iOS. For hackathon, use Mapbox or set up
  a Google Maps API key (free tier sufficient).


------------------------------------------------------------------------
F22. CHAIN-OF-CUSTODY QR RECEIPT
------------------------------------------------------------------------

WHAT IT IS:
  Every check-out generates a QR receipt showing: item name, serial
  number, custodian, timestamp, and a QR code linking to the full
  audit record.

HOW IT WORKS:
  - After check-out, render a receipt Modal using react-native-qrcode-svg
    encoding the assignment ID URL:
      <QRCode value={"https://sentinel.app/receipt/" + assignmentId} />
  - Wrap in a styled View with the formatted receipt details.
  - Use expo-print to optionally render to PDF for sharing.
  - The URL points to a web-accessible read-only audit record page
    (built in the Expo web export).

DEFENCE RELEVANCE:
  Mirrors the DA-2062 hand-receipt form used in real military SOPs.
  Judges with defence background will recognise this immediately.


------------------------------------------------------------------------
F23. AI MISSION READINESS SCORE
------------------------------------------------------------------------

WHAT IT IS:
  Before a mission is deployed, the AI analyses all assigned equipment
  and outputs a 0-100 "Mission Readiness Score" with risk breakdown and
  a GO / NO-GO recommendation.

HOW IT WORKS:
  1. Commander taps "Run Readiness Assessment" on MissionDetailScreen.
  2. App collects: kit list, wear scores, last service dates, open
     anomaly flags, zone of operation.
  3. Sends to Supabase Edge Function, which calls Claude Haiku:
       "You are a military readiness analyst. Given equipment data: {data}
        Output JSON: { readiness_score: 0-100, go_nogo: 'GO'|'NO-GO'|
        'CONDITIONAL GO', risk_items: [{item, risk, recommendation}],
        summary: 'one line' }. Respond only with JSON."
  4. Display: large circular gauge (react-native-gifted-charts) colored
     green/amber/red based on score. FlatList of risk_items below.

OUTPUT EXAMPLE:
  Readiness Score: 74/100 — CONDITIONAL GO
  - INSAS Rifle INSAS-023: wear score 82. Service before deployment.
  - Radio Set R-04: calibration 95 days ago. Acceptable for short mission.


------------------------------------------------------------------------
F24. DIGITAL TWIN — EQUIPMENT LIFECYCLE VIEW
------------------------------------------------------------------------

WHAT IT IS:
  Each equipment item has a visual "life story" timeline from registration
  to today, showing every lifecycle stage with rich visuals.

HOW IT WORKS:
  - Enhanced version of F6 with richer visual design.
  - Custom vertical timeline component built with FlatList.
    Each TimelineNode: a left-side colored line segment, a circle with
    an icon, right-side card with event details.
  - Lifecycle stages mapped to distinct icons and gradient colors.
  - Stats header: total custody time, missions, repairs, estimated
    remaining service life (computed from wear score trajectory).
  - "Verify Chain" button at the top runs hash verification:
      All nodes flash briefly, then turn green (valid) or red (tampered).

DESIGN PRINCIPLE:
  Any judge should understand the complete history of an item in 10
  seconds without explanation.


------------------------------------------------------------------------
F25. COMMANDER WAR-ROOM DASHBOARD (TV MODE)
------------------------------------------------------------------------

WHAT IT IS:
  A read-only large-format display mode designed for a TV or projector
  in HQ. Updates in real time via Supabase Realtime.

HOW IT WORKS:
  - A separate web route accessible via the Expo web export:
    https://sentinel.vercel.app/warroom?token={read_only_token}
  - The token grants read-only access to summary data only.
  - Layout optimised for 1080p (16:9):
      Top: 4 zone status tiles (large text, color-coded)
      Middle: equipment summary metrics + donut chart
      Bottom: live anomaly ticker (animated horizontal scroll)
  - Auto-refreshes via Supabase Realtime subscription.
  - No login needed for this route (read-only token in URL).

  NOTE: This is built as part of the Expo web export, not the React
  Native mobile build. Use React Native Web compatible components
  (all standard RN components are web-compatible via react-native-web
  when using Expo).

DEMO:
  Open this URL on a second screen before the demo begins.
  It updates live as you scan QR codes and trigger anomalies on your
  phone. Judges see both the handheld app and the HQ dashboard
  simultaneously.


================================================================================
11. DEMO DAY SCRIPT (5 MINUTES)
================================================================================

[0:00 - 0:30] INTRO
  "SENTINEL is a defence equipment accountability system. I'm going to show
  you three things in the next 4 minutes: real-time tracking, tamper-proof
  security, and automated intelligence. Let's begin."

  [Show web dashboard on laptop. Show mobile app on phone.]

[0:30 - 1:30] THE LIVE SCAN (F8)
  "Every piece of equipment has a QR sticker. Watch what happens when I
  scan one."
  [Scan QR sticker with phone. Laptop dashboard updates in < 1 second.]
  "That just logged a check-out event, updated the dashboard, and started
  an immutable audit chain entry — in under half a second."

[1:30 - 2:30] THE TAMPER SIMULATION (F5)
  "Now let's try to tamper with that event."
  [Open Audit Log. Show green checkmarks. Press Simulate Tamper.]
  [Row turns red. CHAIN BREACH DETECTED banner appears.]
  "The system detected the tamper instantly. Nobody can alter past records
  without being caught."

[2:30 - 3:15] ANOMALY DETECTION (F9)
  "Let me show you what happens when someone misuses equipment."
  [Press Demo Anomaly button. DUAL_LOCATION anomaly appears in feed.]
  "The system automatically detected this item was scanned at two locations
  at the same time — impossible in real life. No human triggered this alert."

[3:15 - 3:45] VOICE COMMAND (F11)
  "And because field officers may not have free hands:"
  [Say "Check out Radio Set R-04 to Officer Mehta" into phone]
  [Show confirmation Modal appear]
  "Voice command, no typing."

[3:45 - 4:15] OFFLINE SYNC (F12) — optional if time permits
  [Enable airplane mode. Scan 2 items. Disable airplane mode.]
  "WiFi was off. Scans stored locally. Now — [WiFi on] — syncing."
  [Toast: "Syncing 2 pending events..."]

[4:15 - 5:00] CLOSE
  "In summary: real-time tracking, blockchain audit chain, AI anomaly
  detection, voice commands, and offline-first operation. SENTINEL treats
  equipment accountability not as paperwork but as intelligence."


================================================================================
12. BUILD TIMELINE (48-HOUR HACKATHON PLAN)
================================================================================

HOURS 0-4: SETUP
  - Supabase project created, all tables from schema created
  - RLS policies set for all tables
  - Expo project initialised: npx create-expo-app sentinel --template
    (use TypeScript template)
  - Install all packages from the Tech Stack section
  - Seed data script written and run (users, zones, equipment)
  - Supabase client configured with AsyncStorage adapter
  - Auth flow working (login screen -> JWT -> role-aware navigation)
  - react-navigation stack and tab navigators set up

HOURS 4-12: PHASE 1 CORE (F1-F7)
  - Equipment Registry screen (FlatList + detail screen)
  - Check-out flow (camera scan -> validate -> assign -> log event)
  - Check-in flow (scan -> close assignment -> log event)
  - Real-time dashboard (Supabase Realtime subscription + Zustand)
  - SHA-256 hash chain on every event INSERT (crypto-js)
  - Custody history timeline (custom FlatList timeline component)
  - Maintenance work order creation

HOURS 12-24: PHASE 2 HIGH-IMPACT (F8-F15)
  - QR scanner integration (expo-camera)
  - Tamper simulation + visual chain verification (red row highlight)
  - Anomaly detection DB triggers (Rules 1-4)
  - Anomaly feed FlatList with Realtime subscription
  - Wear score formula + risk heatmap grid
  - Geo-fence zone check on check-in (expo-location + Haversine)
  - Overdue escalation cron job (Supabase pg_cron + Edge Function)
  - Daily email report via Resend

HOURS 24-36: PHASE 2 DEMO FEATURES + POLISH
  - Voice command parser (@react-native-voice/voice + regex parser)
  - Offline-first with MMKV + NetInfo + sync toast
  - NL query Edge Function + Claude Haiku API integration
  - Web export: npx expo export --platform web -> deploy to Vercel
  - Tab bar badges for anomaly count
  - Push notifications via expo-notifications + Expo Push API

HOURS 36-44: PHASE 3 ADD-ONS (pick 2-3)
  - Compliance PDF export via expo-print
  - Mission batch assignment (Supabase RPC)
  - Commander war-room TV mode (web route)
  - AI readiness score

HOURS 44-48: DEMO PREP
  - Seed realistic data (timestamps, realistic event histories)
  - Print QR stickers for 8 physical objects
  - Set up second screen for web dashboard (Vercel URL)
  - Practice demo script 3 times
  - Test offline scenario on physical device
  - Test tamper simulation
  - Test QR scanning in the actual demo room lighting
  - Prepare backup (screenshots + recorded video) in case of tech failure


================================================================================
13. RISK REGISTER
================================================================================

Risk: Supabase Realtime not working in venue WiFi
Mitigation: Test day before. Have a manual pull-to-refresh fallback.

Risk: @react-native-voice/voice doesn't work on the demo device
Mitigation: Test on the specific demo device. Have manual check-out screen
ready. Voice is a bonus feature — demo can proceed without it.

Risk: expo-camera QR scan too slow or needs perfect lighting
Mitigation: Test scanner in the actual demo room lighting.
Have the manual serial number TextInput search as fallback.

Risk: NFC not available on the test devices
Mitigation: NFC feature is Phase 3 / bonus. Skip gracefully.

Risk: react-native-maps requires API key setup that delays build
Mitigation: Set up Google Maps API key in Hour 0-4 setup phase.
If blocked, use a static image placeholder for the map in the demo.

Risk: LLM API rate limit or latency during demo
Mitigation: Cache 3 pre-computed NL query results as demo fallback.
Use a local mock response if the API is unavailable.

Risk: Expo web export has broken layouts due to react-native-web
Mitigation: Test web export early (by Hour 24). Use only web-compatible
packages. Replace any broken web component with a web-specific fallback.

Risk: Internet unavailable at venue
Mitigation: Offline-first mode handles scans. Disable features requiring
Edge Functions in demo. Show cached/seeded data for email + AI features.

Risk: Team runs out of time
Mitigation: Strict phase prioritisation. Phase 1 + F8 + F5 + F9 must be
done by Hour 24. Everything else is bonus. Never sacrifice demo quality
for feature count.

Risk: Build fails on physical device (native module issue)
Mitigation: Use Expo Go for development where possible. For modules
requiring dev client (NFC, voice), test the dev client build early.
Always have a working Expo Go build as the demo fallback.


================================================================================
14. APPENDIX — API CONTRACTS & SEED DATA
================================================================================

SUPABASE EDGE FUNCTION: /functions/v1/nl-query
  Request:
    POST { query: "string" }
    Authorization: Bearer {user_jwt}
  Response:
    { filter: { status?: string, category?: string, zone_id?: string,
                wear_score_min?: number, ... },
      interpreted_as: "human-readable version of what was parsed" }

SUPABASE EDGE FUNCTION: /functions/v1/daily-briefing
  Triggered by pg_cron at 06:00.
  No request body.
  Queries DB, formats HTML email, calls Resend API.
  Response: { sent_to: ["email1", "email2"], timestamp: "..." }

SUPABASE EDGE FUNCTION: /functions/v1/verify-totp
  Request:
    POST { user_id: "uuid", token: "6-digit-string", equipment_id: "uuid" }
  Response:
    { valid: true/false, reason?: "expired|invalid|rate-limited" }

SUPABASE EDGE FUNCTION: /functions/v1/send-push
  Request:
    POST { expo_push_token: "ExponentPushToken[...]",
           title: "string", body: "string" }
  Action: POSTs to https://exp.host/--/api/v2/push/send
  Response: { status: "ok" | "error" }

SEED SCRIPT SUMMARY (run once via Supabase SQL editor):
  Users: 6 (as listed in F1)
  Zones: 3 (Alpha Base, Bravo Forward, Charlie Depot)
  Equipment: 20 items (as listed in F2)
  Events: 50 historical events spread across the last 30 days
  Assignments: 8 active (2 overdue), 12 completed
  Maintenance records: 5 (3 completed, 2 open)
  Anomalies: 3 historical (1 resolved, 2 open)

QR CODE FORMAT:
  Prefix: "SENTINEL:EQ:"
  Value : "SENTINEL:EQ:{equipment.id}"
  Example: "SENTINEL:EQ:3f2a9c14-7b3e-4d2a-9f1c-8e5a2b6d4c7f"
  Render in-app with react-native-qrcode-svg.
  Print via expo-print for physical stickers.

WEAR SCORE DEFAULT THRESHOLDS (store in a config table or constants file):
  Rifle           : max_hours=500, service_interval_days=90, max_missions=50
  Radio           : max_hours=1000, service_interval_days=180, max_missions=100
  Vehicle         : max_hours=2000, service_interval_days=365, max_missions=200
  Medical Kit     : max_hours=0, service_interval_days=180, max_missions=20
  Optical/Optics  : max_hours=500, service_interval_days=365, max_missions=100

COLOUR PALETTE FOR UI (React Native StyleSheet values):
  Primary / Military Green : '#1B4332'
  Accent / Alert Red       : '#D62839'
  Warning / Amber          : '#E9C46A'
  Safe / Available Green   : '#2D9D78'
  Inactive / Grey          : '#6B7280'
  Background (dark mode)   : '#111827'
  Surface (dark mode)      : '#1F2937'
  Border                   : '#374151'

  Apply globally via a theme constants file:
    // theme.ts
    export const Colors = {
      primary: '#1B4332',
      alert: '#D62839',
      warning: '#E9C46A',
      safe: '#2D9D78',
      inactive: '#6B7280',
      background: '#111827',
      surface: '#1F2937',
      border: '#374151',
    };

RECOMMENDED PROJECT STRUCTURE:
  sentinel/
  +-- app/
  |   +-- (auth)/
  |   |   +-- login.tsx
  |   +-- (tabs)/
  |   |   +-- dashboard.tsx
  |   |   +-- equipment.tsx
  |   |   +-- scan.tsx
  |   |   +-- anomalies.tsx
  |   |   +-- audit.tsx
  |   +-- equipment/[id].tsx
  |   +-- checkout.tsx
  |   +-- warroom.tsx         (web-only route)
  +-- components/
  |   +-- TimelineItem.tsx
  |   +-- EquipmentCard.tsx
  |   +-- AnomalyCard.tsx
  |   +-- WearScoreGauge.tsx
  |   +-- OfflineBanner.tsx
  +-- lib/
  |   +-- supabase.ts         (Supabase client with AsyncStorage)
  |   +-- crypto.ts           (SHA-256 chain utilities using crypto-js)
  |   +-- haversine.ts        (distance calculation)
  |   +-- commandParser.ts    (voice command regex parser)
  |   +-- wearScore.ts        (wear score computation)
  +-- store/
  |   +-- authStore.ts        (Zustand auth slice)
  |   +-- dashboardStore.ts   (Zustand dashboard slice)
  |   +-- pendingStore.ts     (Zustand offline pending events)
  +-- constants/
  |   +-- theme.ts
  |   +-- wearThresholds.ts
  +-- supabase/
      +-- functions/
      |   +-- nl-query/
      |   +-- daily-briefing/
      |   +-- verify-totp/
      |   +-- send-push/
      +-- migrations/
          +-- 001_initial_schema.sql
          +-- 002_rls_policies.sql
          +-- 003_triggers.sql
          +-- 004_seed_data.sql

================================================================================
END OF PRD — SENTINEL v1.1 (React Native Edition)
================================================================================
