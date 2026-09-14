import { createSupabaseServerClient } from "./supabase-server";

export interface DatabaseListing {
  id: string;
  title: string;
  description: string;
  monthly_rent: number;
  deposit: number;
  available_from?: string;
  published_at?: string;
  properties: {
    id: string;
    name: string;
    city: string;
    locality: string;
    property_type: string;
    address_line1?: string;
    state?: string;
  } | null;
  inventory: {
    id: string;
    label: string;
    inventory_type: string;
    furnishing: string;
    occupancy_capacity?: number;
  } | null;
  listing_media: {
    object_key: string;
    media_type: string;
    sort_order: number;
  }[];
}

export interface ListingCardData {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  image: string;
  meta: string;
  featured?: boolean;
}

const typeMap: Record<string, string> = {
  apartment: "Home",
  house: "Home",
  pg: "PG",
  co_living: "Shared room",
  hostel: "Shared room",
  other: "Stay",
};

export function formatListingCard(raw: DatabaseListing): ListingCardData {
  const property = raw.properties;
  const inventory = raw.inventory;
  const sortedMedia = (raw.listing_media || []).sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const firstImage = sortedMedia[0]?.object_key || "/images/home-apartment.jpg";
  const stayType = property?.property_type
    ? typeMap[property.property_type] || "Home"
    : "Home";

  return {
    id: raw.id,
    title: raw.title,
    location: property ? `${property.locality}, ${property.city}` : "Available",
    price: `₹${Number(raw.monthly_rent).toLocaleString("en-IN")}`,
    type: stayType,
    image: firstImage,
    meta: inventory
      ? `${inventory.label} · ${inventory.furnishing || "Furnished"}`
      : "Verified stay",
    featured: Number(raw.monthly_rent) >= 20000,
  };
}

export async function getPublishedListings(filters?: {
  q?: string;
  type?: string;
}): Promise<ListingCardData[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase
    .from("listings")
    .select(
      "id, title, description, monthly_rent, deposit, properties!inner(id, name, city, locality, property_type), inventory!inner(id, label, inventory_type, furnishing), listing_media(object_key, media_type, sort_order)",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (filters?.type) {
    if (filters.type === "home") {
      query = query.in("properties.property_type", ["apartment", "house"]);
    } else if (filters.type === "pg") {
      query = query.eq("properties.property_type", "pg");
    } else if (filters.type === "shared_room") {
      query = query.in("properties.property_type", ["co_living", "hostel"]);
    }
  }

  const { data, error } = await query;
  if (error || !data) return [];

  let results = (data as unknown as DatabaseListing[]).map(formatListingCard);

  if (filters?.q) {
    const term = filters.q.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term),
    );
  }

  return results;
}

export async function getPublishedListingById(
  id: string,
): Promise<DatabaseListing | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("listings")
    .select(
      "id, title, description, monthly_rent, deposit, available_from, published_at, properties(id, name, city, locality, property_type, address_line1, state), inventory(id, label, inventory_type, furnishing, occupancy_capacity), listing_media(object_key, media_type, sort_order)",
    )
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return data as unknown as DatabaseListing;
}
