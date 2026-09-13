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