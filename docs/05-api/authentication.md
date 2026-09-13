# API Authentication

Web uses a server-side Supabase SSR client to read the authenticated session. API handlers call `auth.getUser()` and derive identity from the verified session rather than accepting a client-supplied user ID.

Mutation authorization is layered: authenticated identity -> provider ownership -> RLS. The service-role key is never used by browser code.

The same authentication contract can be consumed by future native mobile clients.