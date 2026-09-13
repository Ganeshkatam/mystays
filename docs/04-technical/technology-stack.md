# Technology Stack

## Decision
Use a TypeScript-first modular web application with Next.js for the web experience, a dedicated application layer, and Supabase-managed PostgreSQL/Auth/Storage for the initial platform foundation.

### Frontend
- Next.js 16.x, App Router
- React
- TypeScript with strict mode
- Accessible component system
- Server-rendered/public listing pages where beneficial; client components only where interaction requires them

### Backend/application layer
- TypeScript application modules
- Keep business rules outside UI components
- Use explicit domain/application/infrastructure boundaries
- Use Supabase server-side APIs for persistence/auth integration where appropriate
- Do not expose privileged database credentials to browsers

### Data
- PostgreSQL 18.x managed through Supabase
- PostGIS for authoritative geospatial data where required
- Relational constraints and transactions for marketplace state

### Authentication
- Supabase Auth initially, with server-side authorization and PostgreSQL RLS as defense in depth.

### Media
- Supabase Storage for listing/profile media, using separate access policies for public listing media and private documents.

### Search
- Phase 1: PostgreSQL/PostGIS search where sufficient.
- Introduce OpenSearch only when measured search complexity/scale justifies operational overhead.

### Deployment
- Web/application deployment on a managed platform.
- Supabase for database/auth/storage.
- CI/CD through GitHub Actions.

## Why this stack
It minimizes operational overhead while preserving a clean path to independent search infrastructure and service extraction later. Supabase currently provides full PostgreSQL, Auth, Storage, RLS, backups, and point-in-time recovery capabilities; PostgreSQL 18.6 is the current 18.x patch release as of August 2026. citeturn0search1turn0search0turn0search15

## Version policy
Pin exact production dependency versions through the lockfile and update promptly for security releases. Next.js publishes formal security releases, so dependency maintenance is mandatory rather than optional. citeturn0search16