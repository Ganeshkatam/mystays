# API Standards

## Naming
Use resource-oriented nouns and stable `/v1` versioning for application APIs.

## Required behavior
- Authentication and authorization on protected routes
- Strict request validation
- Bounded pagination
- Explicit filter/sort allowlists
- Idempotency for retry-sensitive mutations
- Rate limits on abuse-prone routes
- Request/correlation IDs

## Error shape
```json
{"error":{"code":"LISTING_NOT_PUBLISHED","message":"The listing is not currently available.","requestId":"...","details":{}}}
```

Never return internal exception messages, SQL, tokens, or stack traces.