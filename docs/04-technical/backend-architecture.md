# Backend Architecture

## Layers
1. Transport/API
2. Application services/use cases
3. Domain model/policies
4. Infrastructure adapters

## Rules
- Controllers/route handlers validate transport input and delegate.
- Application services orchestrate use cases and transactions.
- Domain code contains invariants and state-transition rules.
- Infrastructure contains database, storage, search, email, and external-provider adapters.
- Domain code must not depend directly on framework-specific APIs.

## Mutation pattern
Request → authentication → authorization → validation → use case → transaction → domain events → response.

## Error contract
Every API error must contain a stable code, safe human message, request/correlation ID, and structured validation details where applicable. Never expose stack traces or secrets.

## Concurrency
Use database constraints and transactions as the final consistency boundary. Retry only operations designed to be idempotent.

## Background work
Move image processing, indexing, notifications, and other non-critical work out of request latency when practical. Failed jobs require retry limits, dead-letter handling, and observability.