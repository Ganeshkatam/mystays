# Domain Rules — Provider Property Listing

## Ownership
A provider may mutate only properties, inventory, and listings connected to that provider. Client-supplied provider ownership is never trusted.

## Listing publication
A listing must have valid required content, non-negative monetary values, an authorized provider, valid property/inventory references, and an acceptable lifecycle transition before publication.

## Lifecycle
Draft → Review/Published → Paused/Expired → Archived, with only explicitly allowed transitions.

## Consistency
Database foreign keys, constraints, transactions, application authorization, and RLS jointly enforce invariants. The application must not assume frontend controls are security boundaries.