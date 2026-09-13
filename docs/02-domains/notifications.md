# Notifications Domain

Owns preferences, templates, routing, delivery state, and retries. Channels may include in-app, push, email, and appropriate messaging channels. Delivery must be idempotent and observable.

## Implemented API

- `GET /api/v1/notifications` lists the authenticated user's latest notifications.
- `PATCH /api/v1/notifications/:id/read` marks an owned notification as read.
- Supabase Realtime publishes notification inserts to subscribed clients.
- The web application exposes `/notifications` using the shared notification client and API.
- Future mobile clients consume the same backend contract and do not require a separate notification backend.
