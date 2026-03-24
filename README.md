# Hirenixs

Hirenixs is a Next.js 16 App Router project for talent profiles, onboarding, and early-stage hiring workflows.

The codebase currently includes:

- A public marketing homepage
- Auth.js / NextAuth v5 beta authentication
- Email OTP registration verification
- Email OTP login
- Forgot-password and reset-password flows
- Role-based onboarding for `individual` and `organization` users
- Public profile pages by username
- Profile image upload/delete through Cloudinary

## Current Product State

This repository is partially complete. A few things are clearly implemented, and a few are still in progress:

- `/feed` exists but is currently a placeholder page
- Individual onboarding is implemented as a multi-step client flow backed by Redux state
- Organization onboarding is implemented as a single form
- `/profile/[username]` fetches profile data from the API, but the page currently renders only the header and the organization-style "about" card
- The organization onboarding form asks for employee range, but the current `CompanyProfile` schema does not persist that field
- There are no automated tests in the repository yet

## Feature Overview

### Authentication

- Credentials login with email or username + password
- OTP login with email or username
- Google OAuth
- GitHub OAuth
- Registration with email OTP verification before account creation
- Forgot-password email flow with tokenized reset link

### Onboarding

- Authenticated users without completed onboarding are forced into onboarding by [`proxy.ts`](/home/zatch/Projects/hirenixs/proxy.ts)
- Role selection is permanent once saved through the current API
- `individual` onboarding collects:
  - avatar
  - title
  - bio
  - education
  - experience
  - skills
  - social links
- `organization` onboarding collects:
  - avatar
  - organization name
  - description
  - industry type
  - website
  - city/state

### Profiles

- Public profile route: `/profile/[username]`
- Profile API aggregates user data from `User`, `UserProfile`, and `CompanyProfile`
- Owners can upload or remove their profile image

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Auth.js / `next-auth` v5 beta
- MongoDB + Mongoose
- Redux Toolkit
- Tailwind CSS 4
- shadcn/ui + Radix UI
- React Hook Form + Zod
- Nodemailer
- Cloudinary

## Directory Map

```txt
app/
  (public)/                    Public landing page
  (authPages)/auth/            Login, register, forgot password, reset password
  (app)/(main)/                Authenticated app pages with sidebar
  (app)/(noSidebar)/           Onboarding and utility pages without sidebar
  api/                         Route handlers

auth.ts                        Auth.js config and callbacks
proxy.ts                       Route protection + onboarding redirects
database/                      MongoDB connection helper
models/                        Mongoose schemas
lib/                           Auth providers, Zod schemas, Cloudinary, mailer, utils
components/                    UI and feature components
store/                         Redux store for onboarding flow state
hooks/                         Fetch helpers and onboarding redirect hook
utils/                         Email templates and small utilities
css/                           App and public styles
```

## Important Routes

### Public

- `/` marketing homepage
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/resetpassword`

### Authenticated

- `/feed`
- `/profile/[username]`
- `/onboarding/profiletype`
- `/onboarding/organization`
- `/onboarding/individual/profile`
- `/onboarding/individual/education`
- `/onboarding/individual/experience`
- `/onboarding/individual/skills`
- `/onboarding/individual/sociallinks`
- `/themepreview`

## API Overview

### Auth

- `POST /api/auth/registration`
- `POST /api/auth/verifyregistrationotp`
- `POST /api/auth/otplogin`
- `POST /api/auth/forgotpassword`
- `POST /api/auth/resetpassword`
- `GET|POST /api/auth/[...nextauth]`

### Onboarding

- `POST /api/onboarding/individual`
- `POST /api/onboarding/organization`

### Profile

- `GET /api/profile/[username]`
- `PATCH /api/profile/updateRole`
- `POST /api/profile/upload`
- `POST /api/profile/delete`

## Session and Routing Behavior

- Auth.js uses JWT sessions
- Session data is enriched with:
  - `userID`
  - `avatar`
  - `username`
  - `role`
  - `onboardingVerified`
  - `providerName`
- Visiting `/` while logged in redirects to `/feed`
- Visiting `/auth/*` while logged in redirects back into the app
- Visiting private routes while logged out redirects to `/`
- Users with incomplete onboarding are locked into the onboarding flow until completion

## Environment Variables

Create a local `.env` file and add the values below.

```bash
DATABASE_URL="mongodb://localhost:27017/hirenixs"

AUTH_SECRET=""
NEXTAUTH_URL="http://localhost:5500"
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

- `DATABASE_URL` is required at startup
- `BASE_URL` is used in forgot-password emails and must match the app URL users open in the browser
- `NEXTAUTH_URL` and `AUTH_SECRET` should be set for Auth.js even though they are not read directly in this repository's source files
- Google and GitHub env vars are required if you keep those OAuth providers enabled in [`auth.ts`](/home/zatch/Projects/hirenixs/auth.ts)
- Email credentials are required for registration OTP, login OTP, and password reset mail
- Cloudinary credentials are required for avatar upload/delete
- Do not commit real secrets

## Prerequisites

- Node.js 20+
- MongoDB
- A Gmail account or SMTP-compatible credentials usable with the current Nodemailer setup
- Cloudinary account
- Google and GitHub OAuth apps if you want social login enabled

## Install

Use one package manager consistently:

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

Default development server:

```bash
npm run dev
```

Custom port used throughout the app's current mail/reset configuration:

```bash
npm run app
```

Open:

- `http://localhost:3000` for `npm run dev`
- `http://localhost:5500` for `npm run app`

If you use port `3000`, update `BASE_URL` and `NEXTAUTH_URL` accordingly.

## Scripts

- `npm run dev` start the dev server with Turbopack
- `npm run app` start the dev server on port `5500`
- `npm run build` build the app
- `npm run start` start the production server
- `npm run lint` run ESLint

## Data Models

### `User`

- account identity
- auth provider details
- username
- role
- onboarding completion flag
- avatar
- password / reset token fields for credentials auth

### `UserProfile`

- individual profile title and bio
- skills
- education
- experience
- social links
- future-facing connection and saved job fields

### `CompanyProfile`

- organization description
- industry type
- city/state location
- website

## Known Gaps

- `feed` is still placeholder content
- profile rendering is incomplete relative to the data returned by the profile API
- organization employee range is collected in the form but not persisted by the current schema
- there is no automated test suite yet

