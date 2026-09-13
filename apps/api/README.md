# myStay API

Dedicated shared backend for web and future mobile clients.

## Boundary
HTTP/API -> Application -> Repository -> Supabase/PostgreSQL.

The API is intentionally independent from `apps/web`. Business logic belongs in `packages/application` and persistence belongs in `packages/database`.

## Run
Set the Supabase environment variables required by the data/auth adapters, then run `npm run dev` from this package.