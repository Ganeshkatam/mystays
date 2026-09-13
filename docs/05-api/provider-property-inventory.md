# Provider, Property and Inventory API

All mutations require authentication. Ownership is derived from the authenticated identity and enforced again by PostgreSQL RLS.

## Provider
`POST /api/v1/providers` creates the authenticated user's provider profile. `GET /api/v1/providers/me` reads it.

## Property
`POST /api/v1/properties` creates a property owned by the authenticated provider. `GET /api/v1/properties` lists only the authenticated provider's properties.

## Inventory
`POST /api/v1/properties/:id/inventory` adds a room/unit/bed to an owned property.

Inventory supports hierarchical accommodation: Property -> Room/Unit -> Bed. A listing references the sellable inventory node rather than assuming every listing represents the whole property.