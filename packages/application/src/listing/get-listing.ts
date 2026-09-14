import type { ListingDetailRepositoryPort } from "./ports";

export async function getListing(
  repo: ListingDetailRepositoryPort,
  id: string,
): Promise<unknown> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error("INVALID_LISTING_ID");
  const listing = await repo.getPublishedById(id);
  if (!listing) throw new Error("LISTING_NOT_FOUND");
  return listing;
}
