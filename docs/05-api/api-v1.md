# API v1 Contract

## Base path
`/api/v1`

The API is the shared backend contract for web and future mobile clients.

## Response envelope
Success: `{ data, error: null, meta: { requestId } }`.
Failure: `{ data: null, error: { code, message }, meta: { requestId } }`.

## Current endpoints
- `GET /api/v1/health`
- `POST /api/v1/listings`
- `POST /api/v1/listings/:id/publish`

## Security
Mutating endpoints require an authenticated user. Ownership is resolved from the authenticated identity; clients must not be trusted to assert ownership. Database RLS remains the final data-access boundary.

## Versioning
Breaking API changes require a new major version. Additive compatible changes remain within v1.
