import type { SupabaseClient } from "@supabase/supabase-js";

export class ListingMediaRepository {
  constructor(private readonly db: SupabaseClient) {}
  async create(input: {
    listing_id: string;
    object_key: string;
    media_type: "image" | "video";
    sort_order: number;
  }) {
    const { data, error } = await this.db
      .from("listing_media")
      .insert(input)
      .select(
        "id,listing_id,object_key,media_type,sort_order,moderation_state,created_at",
      )
      .single();
    if (error || !data) throw new Error("LISTING_MEDIA_CREATE_FAILED");
    return data;
  }
  async listByListing(listingId: string) {
    const { data, error } = await this.db
      .from("listing_media")
      .select(
        "id,listing_id,object_key,media_type,sort_order,moderation_state,created_at",
      )
      .eq("listing_id", listingId)
      .order("sort_order", { ascending: true });
    if (error) throw new Error("LISTING_MEDIA_LIST_FAILED");
    return data ?? [];
  }
  async delete(id: string) {
    const { data, error } = await this.db
      .from("listing_media")
      .delete()
      .eq("id", id)
      .select("id")
      .maybeSingle();
    if (error) throw new Error("LISTING_MEDIA_DELETE_FAILED");
    return data;
  }
}
