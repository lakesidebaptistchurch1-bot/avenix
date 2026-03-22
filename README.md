# 🏛️ Church Web App (Next.js + Supabase + Paystack)

## 📘 Project Overview
This is a full-stack church web application built with modern technologies to handle:
- User authentication (JWT sessions)
- Password reset system
- Donations via Paystack
- Supabase backend (PostgreSQL)
- Next.js App Router frontend

---

## 🧱 Tech Stack
- Frontend: Next.js 16
- Backend: Next.js API Routes
- Database: Supabase
- Auth: JWT (jose)
- Validation: Zod
- Payments: Paystack
- Deployment: Vercel

---

## 📁 Project Structure
```
src/
├── app/api/auth/
├── lib/
│   ├── env.ts
│   ├── supabase.ts
│   ├── security.ts
│   └── auth/
│       ├── session.ts
│       ├── secret.ts
│       └── password.ts
```

---

## ⚙️ Environment Variables
Create `.env.local`:

```
BASE_URL=http://localhost:3000
AUTH_SECRET=your_secret_key

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
```

---

## 🚀 Run Locally
```
yarn install
yarn dev
```

---

## 🔐 Auth System
- JWT stored in HTTP-only cookies
- Session handled in `session.ts`

---

## 🔑 Password Reset Flow
1. Request reset
2. Generate token
3. Store hashed token
4. Send reset link
5. Reset password

---

## 🗄️ Database Tables

### users
- id
- name
- email
- password_hash

### password_resets
- user_id
- token_hash
- expires_at

---

## 💳 Paystack Integration
- Initialize payment on frontend
- Verify payment on backend

---

## 🚀 Deployment (Vercel)
1. Push to GitHub
2. Import into Vercel
3. Add env variables
4. Deploy

---

## 🧑‍💻 Developer Guide
- Start with `env.ts`
- Then `supabase.ts`
- Then `session.ts`
- Then API routes

---

## 🛠️ Common Issues
- Missing env → app crash
- Fix with `.env.local` or Vercel env settings

---

## 📦 Production Checklist
- Env variables set
- No build errors
- Supabase connected
- Auth working

---

## 🚀 Future Improvements
- Email integration
- Admin dashboard
- Analytics
