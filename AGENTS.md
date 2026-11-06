<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` (Turbopack), `npm run build`, `npm run lint` (plain `eslint`, flat config). There is **no test runner, no test files, and no typecheck script** — don't invent one.
- Focused typecheck: `npx tsc --noEmit`. It depends on generated route types in `.next/types/` (see `tsconfig.json` `include`); on a clean checkout run `npm run build` or start `next dev` first, or global types like `LayoutProps<"/">` won't resolve.
- `next build` also runs the TypeScript check. Verified passing at HEAD: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Stack quirks

- Next 16.4.5 App Router, single package (no monorepo). App code lives in `src/app/`; alias `@/*` → `./src/*`.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — don't add manual memoization.
- Tailwind v4 is CSS-first: no `tailwind.config`; theme/tokens live in `src/app/globals.css` (`@theme`, CSS variables). CSS is processed by the `@tailwindcss/turbopack` loader rule in `next.config.ts` — don't remove it.
- shadcn style is `base-nova` (`components.json`): generated components use `@base-ui/react` primitives, **not Radix**. UI goes in `src/components/ui/`.
- `.env` is gitignored; `next build`/`next dev` load it automatically.

## Auth (better-auth + MongoDB)

- Wiring: server `src/lib/auth.ts`, client `src/lib/auth-client.ts`, catch-all handler `src/app/api/auth/[...all]/route.ts`.
- Requires a local MongoDB at the hardcoded URI `mongodb://localhost:27017/database` (not env-driven).
- `.env` sets `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. Google OAuth reads `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, which are **not set** — build warns "Social provider google is missing clientId or clientSecret".
- `src/lib/auth-client.ts` exports `signIn`/`signUp`/`useSession` from a second `createAuthClient()` that lacks `baseURL`; prefer `authClient.*` (or fix the duplicate) when the base URL matters.
