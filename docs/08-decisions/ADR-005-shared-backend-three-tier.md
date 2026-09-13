# ADR-005: Shared Backend with Three Tiers

## Status
Accepted

## Context
myStay needs web now and mobile clients later. Rebuilding backend logic per client would duplicate authorization, business rules, validation, and data access.

## Decision
Use three tiers: Presentation/API -> Application -> Data. The Application tier is client-independent and the API is the shared platform contract.

## Consequences
Web and mobile share authentication, business rules, authorization, validation, and persistence behavior. Client-specific UX remains independent.

## Deployment evolution
Initially the API can be colocated with the web application. As traffic or team boundaries grow, the API can be independently deployed without changing Application or Data contracts.

## Rejected alternative
A separate mobile backend would duplicate logic and create behavioral drift between clients.