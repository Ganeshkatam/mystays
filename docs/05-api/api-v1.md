# API v1 Contract

## Base path
/api/v1

The API is the shared backend contract for web and future mobile clients.

## Response envelope
Success: { data, error: null, meta: { requestId } }.
Failure: { data: null, error: { code, message }, meta: { requestId } }.

## Listing endpoints
- GET /api/v1/health
- POST /api/v1/listings
- POST /api/v1/listings/:id/publish

## Request identity
Mutation handlers derive identity from the verified Supabase session. Client-supplied user IDs are not trusted.

## Ownership
Database RLS is the final authorization boundary. Application use cases contain business workflow rules; repositories contain persistence only.

## Versioning
Breaking API changes require a new major version. Additive compatible changes remain within v1.