# Three-Tier Architecture

## Goal
The backend is a shared platform for every client. Web and future mobile clients use the same versioned API and application capabilities; a second mobile backend is not created.

## Tiers
1. Presentation: client-facing HTTP/API and UI adapters.
2. Application: use cases, authorization orchestration, business workflows, DTO contracts, and domain policies.
3. Data: repositories and infrastructure adapters for PostgreSQL, PostGIS, Supabase Storage, and external providers.

The domain model is a core dependency of the Application tier, not a fourth deployed tier.

## Dependency direction
Presentation -> Application -> repository interfaces -> Data implementations.
Presentation must never directly mutate PostgreSQL/Supabase.

## Client independence
The API contract is the stable boundary. Future Android/iOS applications authenticate and call the same /api/v1 resources as web. Client-specific presentation code remains outside the Application tier.

## Current API boundary
The shared API is implemented in `apps/api`. Listing creation and publishing are served by:
- `POST /api/v1/listings`
- `POST /api/v1/listings/:id/publish`
- `GET /api/v1/health`

The web application's legacy listing API routes have been removed. Web UI code must call the shared API rather than introducing Next.js route handlers for domain operations.

## Deployment evolution
The API/application can initially run as an independent deployable. It can scale independently from the web client without rewriting business logic.
