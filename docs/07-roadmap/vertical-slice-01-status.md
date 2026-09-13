# Vertical Slice 01 Status

## Foundation
- Database schema and RLS
- Typed domain entities
- Listing lifecycle policy
- Listing validation
- Shared Application package
- Supabase SSR authentication boundary
- API v1 listing creation endpoint

## Next
- Complete provider onboarding
- Complete property/inventory repositories and use cases
- Remove direct database calls from API handlers by injecting application use cases
- Add authenticated integration tests for ownership and RLS
- Implement listing publish endpoint through the Application layer
- Build provider UI against the API