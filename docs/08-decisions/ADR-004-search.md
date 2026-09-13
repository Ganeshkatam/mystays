# ADR-004: PostgreSQL Search First

## Status
Accepted

## Context
The MVP requires location-aware and filtered listing discovery, but introducing a dedicated search cluster creates operational cost.

## Decision
Start with PostgreSQL/PostGIS-backed discovery. Treat search as a derived capability. Introduce OpenSearch only when measured relevance, scale, faceting, or query complexity justifies it.

OpenSearch supports geo-point/geo-shape queries and advanced search capabilities, making it a viable later-stage read/search system. citeturn0search4turn0search17

## Consequences
Lower MVP complexity and strong transactional consistency. Search may eventually require a separate read model for scale and relevance.

## Revisit Conditions
Revisit when query latency, indexing throughput, relevance requirements, or dataset size becomes a measurable bottleneck.