# Project Structure

```text
src/
  app/                 # Next.js routes/pages
  modules/             # bounded contexts
    identity/
    property/
    listing/
    availability/
    discovery/
    inquiry/
    trust/
    notifications/
  shared/               # cross-cutting primitives only
  infrastructure/      # database, storage, external adapters
  lib/                  # framework integration
  tests/
```

Rules: modules own their use cases and domain rules; shared must not become a dumping ground; infrastructure dependencies enter through explicit interfaces.

## Three-tier dependency map

```text
apps/web (Presentation)
        |
        v
packages/application (Application)
        |
        v
packages/database (Data)
        |
        v
Supabase/PostgreSQL
```

`packages/domain` contains the business model used by the Application tier. Future mobile clients consume the same backend API rather than creating a second application tier.
