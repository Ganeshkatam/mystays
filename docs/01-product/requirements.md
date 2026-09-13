# myStay MVP Requirements

## Functional requirements

### Identity
- Users can register, authenticate, recover access, and manage profiles.
- Provider accounts require provider-role authorization before provider operations.
- Sensitive actions require re-authentication or equivalent protection where appropriate.

### Properties and inventory
- Providers can create a property with address/location metadata.
- A property can contain units, rooms, or beds depending on accommodation type.
- Inventory identifiers are stable and unique within the owning scope.
- Inventory cannot be published without required location, pricing, type, and availability information.

### Listings
- A listing references authoritative property/inventory records.
- A listing has lifecycle states: Draft, Review, Published, Paused, Expired/Occupied, Archived.
- Published listings must pass validation and moderation rules.
- Listing price must clearly distinguish recurring rent from one-time charges and deposits.
- Media must satisfy file-size/type/security constraints.

### Discovery
- Search supports text and geographic intent.
- Filters include budget, type, room/occupancy, furnishing, amenities, and move-in/availability criteria.
- Results are paginated and deterministically sortable.
- Search indexing may be eventually consistent; transactional state remains authoritative.

### Engagement
- Seekers can favorite listings and save searches.
- Seekers can submit inquiries against published listings.
- Providers can view and manage inquiries for their authorized listings.
- Inquiry abuse is rate-limited and reportable.

### Trust
- Users can report suspicious listings or behavior.
- Admins can review, pause, reject, or archive listings according to moderation policy.
- Verification status must include evidence/state and cannot be represented only by an unchecked boolean.

### Audit and analytics
- Security-sensitive and consequential actions generate audit events.
- Product events measure the discovery-to-inquiry funnel without unnecessary personal data.

## Non-functional requirements
- Server-side authorization on every protected resource.
- Strict input validation and bounded payloads.
- Idempotency for retryable mutations where duplicate effects would be harmful.
- Structured errors with stable machine-readable codes.
- Rate limits on authentication, inquiry, messaging/contact, and abuse-prone endpoints.
- Structured logs, metrics, health checks, and error tracking in production.
- Personal and verification data is access-controlled and retention-managed.
