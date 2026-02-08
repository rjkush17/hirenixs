# Hirenixs

Hirenixs is a Next.js 16 app for talent onboarding and hiring workflows.
It supports multi-provider authentication, OTP flows, role-based onboarding (`individual` and `organization`), and profile management backed by MongoDB.

## Features

- NextAuth-based authentication with:
  - Google OAuth
  - GitHub OAuth
  - Email/username + password credentials
  - OTP login
- Registration OTP verification by email
- Forgot-password and reset-password flow by email
- Role-based onboarding with guarded route flow:
  - `individual` profile onboarding
  - `organization` profile onboarding
- Profile APIs for role updates and avatar upload/delete
- MongoDB persistence with Mongoose models
- Zod validation for onboarding payloads

## Tech Stack

- Next.js 16 (App Router + Turbopack)
- React 19 + TypeScript
- NextAuth v5 beta
- MongoDB + Mongoose
- Redux Toolkit
- Tailwind CSS 4 + Radix UI
- Zod
- Nodemailer
- Cloudinary

## Project Structure

```txt
app/
  (public)/                # Public pages (home, theme preview)
  (app)/                   # Authenticated app routes (feed, onboarding, auth pages)
  (app)/api/               # API route handlers
components/                # Reusable UI and feature components
database/                  # MongoDB connection helper
lib/                       # Auth providers, validation, mailer, cloudinary, utils
middlewares/               # Onboarding route guard logic
models/                    # Mongoose models
store/                     # Redux store and slices
utils/                     # Utility functions and email templates
```

## Prerequisites

- Node.js 20+
- npm, pnpm, or yarn
- MongoDB instance (local or Atlas)
- Cloudinary account (for uploads)
- SMTP credentials (for OTP/reset emails)
- OAuth apps (Google and GitHub) if you want social login

## Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="mongodb://localhost:27017/hirenixs"
# Optional alternative URI if you use Atlas directly in code/config:
ALTAS_URL=""

AUTH_SECRET=""
BASE_URL="http://localhost:5500"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

EMAIL_ID=""
EMAIL_PASS=""
```

Notes:
- `DATABASE_URL` is required by the DB connector.
- `BASE_URL` is used for forgot/reset password links.
- Do not commit real secrets to git.

## Installation

```bash
npm install
```

or

```bash
pnpm install
```

or

```bash
yarn install
```

## Run Locally

Default dev server:

```bash
npm run dev
```

Custom app port (`5500`):

```bash
npm run app
```

Then open `http://localhost:3000` (or `http://localhost:5500` for `npm run app`).

## Available Scripts

- `npm run dev` - Start Next.js dev server with Turbopack
- `npm run app` - Start dev server on port `5500`
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Auth + Onboarding Flow

1. User registers or signs in (OAuth, credentials, or OTP).
2. Middleware checks session and onboarding completion.
3. If onboarding is incomplete, user is forced into onboarding routes.
4. Individual or organization onboarding data is validated with Zod and stored in MongoDB.
5. On successful onboarding, `onboardingVerified` is set and normal app routes unlock.

## API Endpoints (high level)

- `app/(app)/api/auth/*`:
  - registration + OTP verification
  - OTP login
  - forgot password
  - reset password
  - NextAuth handler
- `app/(app)/api/onboarding/*`:
  - individual onboarding submit
  - organization onboarding submit
- `app/(app)/api/profile/*`:
  - upload/delete profile image
  - update role

## Notes

- Route access is controlled by `proxy.ts` and `middlewares/onboarding.tsx`.
- Email features rely on valid SMTP credentials.
- Media upload features rely on valid Cloudinary credentials.
