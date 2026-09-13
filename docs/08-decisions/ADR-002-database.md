# ADR-002: PostgreSQL as Transactional Database

## Status
Accepted

## Context
Accommodation inventory, listings, availability, favorites, inquiries, and moderation require relational integrity and transactions.

## Decision
Use PostgreSQL as the authoritative transactional database. Use PostGIS capabilities for geospatial data where required.

## Alternatives
- Document database: rejected for MVP because relational constraints and transaction-heavy workflows dominate.
- Separate database per domain: rejected until operational scale requires it.

## Consequences
Strong consistency and mature indexing/constraint capabilities with a clear future scaling path.

## Revisit Conditions
Revisit only if measured workload or a new domain demonstrates a compelling need for a specialized datastore.