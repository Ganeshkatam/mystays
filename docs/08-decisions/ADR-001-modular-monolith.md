# ADR-001: Modular Monolith

## Status
Accepted

## Context
myStay needs strong domain boundaries without premature distributed-system complexity.

## Decision
Build the MVP as a modular monolith. Keep bounded contexts separated in code and data-access interfaces. Use asynchronous jobs/events where useful without creating independently deployed services.

## Alternatives
- Microservices from day one: rejected due to unnecessary operational and distributed consistency overhead.
- Unstructured monolith: rejected because it makes later evolution and ownership boundaries difficult.

## Consequences
### Positive
Lower operational overhead, simpler transactions, faster development, easier local development.
### Negative
Requires discipline to prevent module coupling.
### Security
Centralized authorization and transaction boundaries are easier to audit.
### Operational
One primary application deployment initially.
### Cost
Lower than multiple independently operated services.

## Revisit Conditions
Reconsider when measured traffic, deployment isolation, team ownership, or reliability requirements justify extraction.