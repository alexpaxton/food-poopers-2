# Code Style

- Use lowercase kebab-case for all folder names (e.g. `components/`, `lib/`)
- Use PascalCase for component filenames (e.g. `UserInfo.tsx`)
- All React components must be styled-components — no inline styles or CSS modules
- Prefer `'use client'` components unless server-side data fetching is explicitly needed
- Use `Float` for all decimal number fields in Prisma, `Int` for whole numbers
- Always run `npm run db:migrate` instructions after schema changes
- Within each React component file the styled-component definitions should be positioned below the React component definition
- React components should always use named exports instead of default exports unless a default export is required by a library or framework
- Define static constants using screaming snake case (e.g. `APP_WIDTH`)
- Imports at the top of each file should follow a specific order: libraries, utilities, shared components, local components, constants, types

# File structure

- All React components must be located within `src/components`
  - Shared components (a component referenced from multiple other components) must be located within `src/components/shared`
  - Organize non-shared components by their parent route name
- Utility functions (a function referenced from multiple other files) should be defined in `src/utils.ts`
- Global constants (constants referenced from multiple other files) should be defined in `src/constants.ts` using screaming snake caes (e.g. `APP_WIDTH`)
- Define shared typescript types (types referenced from multiple files) in `src/types.ts` and use PascalCase

# Context summary

## Stack
- **Next.js 15** (App Router) with **Turbopack** (`next dev --turbopack`)
- **TypeScript** with strict mode, path alias `@/*` → `./src/*`
- **Styled Components v6** with SSR registry at `src/lib/registry.tsx`
- **Prisma** ORM with **PostgreSQL** (`prisma/schema.prisma`)
- **Auth.js v5** (NextAuth beta) with Google OAuth and Prisma adapter
- Hosted on **Vercel**; Inter font loaded via `next/font/google`

## Auth
- Config: `src/auth.ts` — exports `{ handlers, signIn, signOut, auth }`
- API route: `src/app/api/auth/[...nextauth]/route.ts`
- Middleware: `middleware.ts` (re-exports `auth` as middleware, runs on all non-static routes)
- Session available client-side via `useSession()` from `next-auth/react`; `SessionProvider` wrapped in `src/lib/session-provider.tsx`

## Database models
- **User** — id, email, emailVerified, name, image, createdAt, updatedAt + Auth.js relations (accounts, sessions, poops)
- **Poop** — id, createdAt, color (String), spicy (Boolean), type (Int), latitude (Float), longitude (Float), weight (Float?), notes (String?), userId (FK → User)
- **Account**, **Session**, **VerificationToken** — managed by Auth.js Prisma adapter

## Key files
- `src/app/page.tsx` — root page, shows Google sign-in button (unauthenticated) or `UserInfo` (authenticated)
- `src/components/home/UserInfo.tsx` — displays user avatar, name, and sign-out button
- `src/lib/prisma.ts` — singleton Prisma client
- `src/lib/registry.tsx` — styled-components SSR flush registry
- `src/lib/session-provider.tsx` — `'use client'` wrapper for `SessionProvider`