# ADR-003: Supabase Auth and PostgreSQL RLS

## Status
Accepted

## Context
myStay needs secure authentication and resource-level authorization without building an identity platform from scratch.

## Decision
Use Supabase Auth initially and PostgreSQL Row Level Security as defense in depth for data access. Application-layer authorization remains mandatory for business rules.

## Consequences
Fast initial delivery and integrated identity/data access, with explicit responsibility to test RLS policies and server-side authorization together.

## Revisit Conditions
Revisit if identity requirements become substantially more complex or provider capabilities no longer meet security/compliance needs.