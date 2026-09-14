export interface ListingMediaInput {
  listingId: string;
  objectKey: string;
  mediaType: "image" | "video";
  sortOrder: number;
}

export async function addListingMedia(
  repo: {
    create(input: {
      listing_id: string;
      object_key: string;
      media_type: "image" | "video";
      sort_order: number;
    }): Promise<unknown>;
  },
  input: ListingMediaInput,
): Promise<unknown> {
  if (
    !/^[0-9a-f-]{36}$/i.test(input.listingId) ||
    !input.objectKey.trim() ||
    input.objectKey.length > 500 ||
    !["image", "video"].includes(input.mediaType) ||
    !Number.isInteger(input.sortOrder) ||
    input.sortOrder < 0
  )
    throw new Error("INVALID_LISTING_MEDIA");
  return repo.create({
    listing_id: input.listingId,
    object_key: input.objectKey.trim(),
    media_type: input.mediaType,
    sort_order: input.sortOrder,
  });
}
