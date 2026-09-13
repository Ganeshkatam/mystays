# System Architecture

## Architectural style
Modular monolith for the MVP.

## Logical components

Browser → Next.js application → Application/domain modules → PostgreSQL/Supabase
                                           ├→ Storage
                                           ├→ Search/read model
                                           └→ Notifications/events

## Domain modules
- Identity
- Property
- Listing
- Availability
- Discovery
- Inquiry
- Trust
- Moderation
- Favorites/Saved Search
- Notifications
- Analytics

Each module owns its business rules and persistence boundaries. Modules communicate through application interfaces/domain events rather than direct UI-to-database coupling.

## Authority rules
- PostgreSQL is authoritative for transactional state.
- Search indexes are derived/read models.
- Object storage is authoritative for binary media.
- Analytics is not an authorization source.

## Security boundary
The browser is untrusted. Authorization is enforced server-side and, where Supabase Data APIs are used, through PostgreSQL RLS. Supabase documents RLS as the mechanism for row-level access control. citeturn0search0turn0search6

## Evolution path
1. Modular monolith.
2. Introduce async jobs/events for expensive work.
3. Extract search when justified.
4. Extract other bounded contexts only after measured load, ownership, or deployment isolation requirements.

Do not introduce microservices merely for theoretical scale.