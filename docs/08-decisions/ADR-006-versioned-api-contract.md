# ADR-006: Versioned Shared API

## Status
Accepted

## Decision
Expose a versioned `/api/v1` HTTP contract shared by web and future mobile clients. Keep business logic in the Application tier and persistence behind repositories.

## Rationale
This prevents mobile from requiring a separate backend and prevents client-specific business logic duplication.

## Security
Authentication establishes identity; application authorization establishes ownership; PostgreSQL RLS enforces the final database boundary.