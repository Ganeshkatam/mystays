# Search Architecture

Transactional storage is authoritative. Pipeline: transactional changes → indexing events → search index → ranking → results. Support geo queries, facets, ranking, freshness, reindexing, schema migration, and observability. Validate authoritative availability before allocation.