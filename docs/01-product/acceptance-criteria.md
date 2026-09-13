# MVP Acceptance Criteria

## Discovery
- A seeker can search by location or keyword.
- Results can be filtered and sorted without losing pagination correctness.
- Every result exposes the minimum decision-making information: location, accommodation type, recurring price, availability signal, and listing freshness.
- Opening a result never grants access to provider-only information.

## Listing
- A provider cannot publish incomplete required data.
- A published listing has at least one valid inventory reference and availability state.
- A provider can pause a listing immediately.
- Archived listings are not returned as active discovery results.

## Favorites
- Adding a favorite is idempotent.
- Removing a favorite is idempotent.
- A user can access only their own favorites.

## Inquiry
- A seeker can submit an inquiry only for a published listing.
- The provider receives the inquiry only when authorized for that listing.
- Duplicate retries do not create unintended duplicate lead effects.
- Rate limits and abuse reporting are enforced.

## Moderation
- An admin can review reported listings.
- A moderated listing cannot remain publicly discoverable when policy requires removal/pause.
- Administrative actions are audited.

## Security
- Unauthorized users cannot access another user's private data by changing an identifier.
- Client-provided role/ownership fields are never trusted.
- Invalid input returns structured validation errors.
- Secrets, authentication tokens, and sensitive documents never appear in normal application logs.
