export interface InquiryInput {
  listingId: string;
  renterId: string;
  message: string;
}

export async function createInquiry(
  repo: {
    create(input: {
      listing_id: string;
      renter_id: string;
      message: string;
    }): Promise<unknown>;
  },
  input: InquiryInput,
): Promise<unknown> {
  if (
    !/^[0-9a-f-]{36}$/i.test(input.listingId) ||
    !/^[0-9a-f-]{36}$/i.test(input.renterId) ||
    !input.message.trim() ||
    input.message.trim().length > 5000
  )
    throw new Error("INVALID_INQUIRY");
  return repo.create({
    listing_id: input.listingId,
    renter_id: input.renterId,
    message: input.message.trim(),
  });
}
