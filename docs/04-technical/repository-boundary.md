# Repository Boundary

Repositories are infrastructure adapters, not authorization boundaries. Every request must establish the authenticated identity before invoking a use case. Repository queries remain ownership-aware, while PostgreSQL RLS provides the final data-access boundary.

Never expose the Supabase service-role key to browser code. Privileged operations run only in trusted server infrastructure with explicit authorization.

Repository/database failures are mapped to safe application errors; raw database errors must not reach clients.