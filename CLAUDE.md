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