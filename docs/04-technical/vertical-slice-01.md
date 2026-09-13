# Vertical Slice 01

## Provider → Property → Inventory → Listing

### Delivered foundation
- Typed domain entities
- Listing lifecycle policy
- Listing input validation
- Initial provider/property/inventory/listing schema
- RLS ownership policies
- Provider property/listing route shells

### Remaining implementation
- Supabase client wiring
- Repository implementations
- Provider onboarding UI
- Property CRUD UI
- Inventory CRUD UI
- Listing creation/edit/publish UI
- Integration and E2E tests against a local Supabase instance

The remaining work is intentionally separated from the domain foundation so authorization and data rules are established before UI mutations.