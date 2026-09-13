# Availability Domain

Availability is first-class and must prevent conflicting allocations.

States:
- Available
- Held
- Reserved
- Occupied
- Blocked
- Maintenance
- Unavailable

All allocation operations must be concurrency-safe and idempotent.
