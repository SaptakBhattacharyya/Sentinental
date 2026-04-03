# Sentinel — Defence Equipment Accountability & Asset Tracking

Sentinel is a digital-first, real-time solution for tracking military equipment and ensuring custody accountability. Designed for tactical efficiency, it features QR-based check-ins, AI-driven anomaly detection (powered by Groq), and a tamper-proof audit chain.

## 🚀 Key Features

- **Real-Time Dashboard**: Instant visibility into asset status and live activity feeds.
- **QR Operations**: Seamless check-in/out via mobile scanning.
- **AI intelligence**: Natural language queries and automated anomaly flagging (Rule-based + Groq LLM).
- **Audit-Ready**: Immutable event logging with SHA-256 cryptographic verification.
- **Offline Support**: Local caching and background sync for field operations.

## 🛠 Tech Stack

- **Frontend**: React Native (Expo SDK 54), NativeWind (Tailwind CSS).
- **Backend/DB**: Supabase (PostgreSQL, Realtime, Auth).
- **AI Engine**: Groq (Llama 3/Haiku) for NL query and readiness scoring.

---

## ⚙️ Setup Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/expo-go) app on your mobile device.
- A [Supabase](https://supabase.com/) project.

### 2. Database Setup
1. Log in to your Supabase Dashboard.
2. Open the **SQL Editor**.
3. Copy the contents of the `setup_supabase.sql` file (found in the root of this repo) and run it.
   - This creates all necessary tables (`equipment`, `events`, `anomalies`, etc.).
   - This enables **Row Level Security (RLS)** and **Realtime** subscriptions.

### 3. Environment Configuration
In the `sentinel/` directory, create a `.env` file and populate it with your credentials:

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Configuration
GROQ_API_KEY=your_groq_api_key
```

### 4. Installation & Run
Navigate to the mobile app directory and install dependencies:

```bash
cd sentinel
npm install
npx expo start
```

Scan the QR code in your terminal with the **Expo Go** app to launch the dashboard.

---

## 🔒 Security & RBAC
The system enforces strict Role-Based Access Control:
- **Soldier**: View own items, check-out personal kit.
- **Officer**: Manage zone equipment, view audit logs.
- **Commander**: Full tactical overview, anomaly resolution, and mission management.

---

## 📜 Repository Structure
- `/sentinel`: React Native Expo application source code.
- `/gandhinagar-uni-1`: Original HTML high-fidelity UI mocks.
- `prd.md`: Product Requirements Document.
- `setup_supabase.sql`: Database initialization script for Supabase.
