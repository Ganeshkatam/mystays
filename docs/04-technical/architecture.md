# Technical Architecture

Use domain-driven design with explicit modules/bounded contexts. Prefer a modular monolith initially unless measurable scaling or ownership boundaries justify service extraction.

## Layers
- Presentation/API
- Application/use cases
- Domain
- Infrastructure

Cross-cutting concerns: authentication, authorization, validation, observability, audit, rate limiting, configuration, and error handling.