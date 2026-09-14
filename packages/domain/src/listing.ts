export type ListingStatus =
  "draft" | "review" | "published" | "paused" | "expired" | "archived";
export interface Listing {
  readonly id: string;
  readonly providerId: string;
  readonly propertyId: string;
  readonly inventoryId: string;
  readonly title: string;
  readonly description: string;
  readonly monthlyRent: number;
  readonly deposit: number;
  readonly status: ListingStatus;
  readonly availableFrom: string | null;
}
export function canPublishListing(
  listing: Pick<
    Listing,
    "title" | "description" | "monthlyRent" | "deposit" | "status"
  >,
): boolean {
  return (
    listing.status === "draft" &&
    listing.title.trim().length >= 10 &&
    listing.description.trim().length >= 20 &&
    listing.monthlyRent >= 0 &&
    listing.deposit >= 0
  );
}
export function canTransitionListing(
  from: ListingStatus,
  to: ListingStatus,
): boolean {
  const transitions: Record<ListingStatus, readonly ListingStatus[]> = {
    draft: ["review", "published", "archived"],
    review: ["published", "draft", "archived"],
    published: ["paused", "expired", "archived"],
    paused: ["published", "archived"],
    expired: ["archived"],
    archived: [],
  };
  return transitions[from].includes(to);
}
