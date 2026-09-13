# Frontend Architecture

## Structure
- Route/page layer
- Feature modules
- Shared UI components
- Client data/query layer
- Server-side application integration
- Validation schemas

## Principles
- Server rendering for public, SEO-sensitive listing discovery where useful.
- Client state only for genuinely interactive state.
- No business authorization decisions in the browser.
- Forms share canonical validation rules where possible.
- URL state is used for shareable discovery filters.
- Loading, empty, error, and unauthorized states are explicit.

## Accessibility
Target WCAG-aligned keyboard navigation, labels, focus management, semantic HTML, sufficient contrast, responsive layouts, and screen-reader compatibility.

## Performance
Optimize image delivery, route payloads, caching, server rendering, and client JavaScript. Avoid global client state when local/server state is sufficient.