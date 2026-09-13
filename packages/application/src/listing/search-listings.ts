import type { ListingSearchRepositoryPort } from './ports';

export interface ListingSearchFilters {
  city?: string;
  propertyType?: string;
  inventoryType?: string;
  minRent?: number;
  maxRent?: number;
  limit: number;
  offset: number;
}

export async function searchListings(repo: ListingSearchRepositoryPort, filters: ListingSearchFilters): Promise<unknown[]> {
  if (filters.limit < 1 || filters.limit > 100 || filters.offset < 0) throw new Error('INVALID_PAGINATION');
  if (filters.minRent !== undefined && filters.minRent < 0) throw new Error('INVALID_MIN_RENT');
  if (filters.maxRent !== undefined && filters.maxRent < 0) throw new Error('INVALID_MAX_RENT');
  if (filters.minRent !== undefined && filters.maxRent !== undefined && filters.minRent > filters.maxRent) throw new Error('INVALID_RENT_RANGE');
  return repo.search(filters);
}
