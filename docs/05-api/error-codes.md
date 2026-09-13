# API Error Codes

- `INVALID_JSON` — malformed request body.
- `VALIDATION_FAILED` — request data fails schema/domain validation.
- `AUTHENTICATION_REQUIRED` — no valid authenticated identity.
- `FORBIDDEN` — authenticated identity lacks authorization.
- `NOT_FOUND` — resource does not exist or is intentionally hidden.
- `CONFLICT` — state transition or uniqueness conflict.
- `INTERNAL_ERROR` — unexpected server failure; never expose raw infrastructure errors.