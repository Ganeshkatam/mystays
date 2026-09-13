# Testing Strategy

## Test pyramid
- Unit: domain invariants, validators, ranking policies, state transitions.
- Integration: database constraints, authorization, storage adapters, repositories.
- API: authentication, authorization, validation, idempotency, error contracts.
- End-to-end: critical seeker/provider journeys.

## Boundary tests
- Unauthorized resource access
- Cross-user/provider identifier changes
- Duplicate mutation retries
- Invalid monetary values
- Empty and maximum-length inputs
- Pagination boundaries
- Expired/unavailable listings
- Concurrent availability updates
- Malicious upload metadata

## CI gates
Type checking, linting, tests, security/dependency checks, and production build verification must pass before protected-branch merge.