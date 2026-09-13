# myStay MVP Database Schema

## Design rule
Use a relational transactional database. Keep physical accommodation, market listings, and user interactions separate so future booking/tenancy features do not require rewriting the foundation.

## Core tables

### users
- id (UUID, PK)
- email/contact identifier (unique, normalized)
- auth provider metadata
- status
- created_at
- updated_at

### profiles
- id (UUID, PK)
- user_id (FK users, unique)
- display_name
- avatar/media reference
- preferences JSON/structured preference fields
- created_at
- updated_at

### providers
- id (UUID, PK)
- user_id (FK users)
- provider_type
- verification_status
- status
- created_at
- updated_at

### properties
- id (UUID, PK)
- provider_id (FK providers)
- name/title
- address fields
- latitude/longitude
- property_type
- description
- created_at
- updated_at

### units
- id (UUID, PK)
- property_id (FK properties)
- unit_type
- label
- floor
- furnishing
- status

### rooms
- id (UUID, PK)
- unit_id (nullable FK units)
- property_id (FK properties)
- room_type
- occupancy_capacity
- furnishing
- status

### beds
- id (UUID, PK)
- room_id (FK rooms)
- label
- status

### listings
- id (UUID, PK)
- provider_id (FK providers)
- property_id (FK properties)
- unit_id (nullable FK units)
- room_id (nullable FK rooms)
- bed_id (nullable FK beds)
- title
- description
- monthly_rent
- deposit
- one_time_charges
- status
- published_at
- expires_at
- last_verified_at
- created_at
- updated_at

### listing_media
- id (UUID, PK)
- listing_id (FK listings)
- object_key
- media_type
- sort_order
- moderation_status
- created_at

### amenities
- id (UUID, PK)
- name (unique)

### listing_amenities
- listing_id (FK listings)
- amenity_id (FK amenities)
- composite PK(listing_id, amenity_id)

### availability
- id (UUID, PK)
- listing_id (FK listings)
- state
- available_from
- available_until
- updated_at

### favorites
- user_id (FK users)
- listing_id (FK listings)
- created_at
- composite PK(user_id, listing_id)

### saved_searches
- id (UUID, PK)
- user_id (FK users)
- name
- query_definition JSON
- created_at
- updated_at

### inquiries
- id (UUID, PK)
- listing_id (FK listings)
- seeker_id (FK users)
- provider_id (FK providers)
- message
- status
- idempotency_key where applicable
- created_at
- updated_at

### reports
- id (UUID, PK)
- reporter_id (FK users)
- target_type
- target_id
- reason
- description
- status
- created_at
- resolved_at

### verification_records
- id (UUID, PK)
- subject_type
- subject_id
- verification_type
- state
- evidence_reference
- reviewed_by
- reviewed_at
- expires_at

### audit_events
- id (UUID, PK)
- actor_user_id (nullable FK users)
- action
- target_type
- target_id
- metadata JSON
- request_id
- created_at

## Constraints and indexes
- Unique normalized contact identifier.
- Composite unique favorite key.
- Foreign keys for all ownership relationships.
- Index listings by status, location strategy, provider, published_at, and freshness.
- Index availability by listing and state/date.
- Index inquiries by provider, seeker, listing, and created_at.
- Index audit events by target and created_at.
- Enforce non-negative monetary values at the database/application boundary.
- Use transactions for publication, availability changes, and other multi-record state transitions.

## Future extension
Booking, payments, agreements, tenancy, maintenance, and roommate matching must be added as separate bounded domains rather than overloaded into MVP tables.
