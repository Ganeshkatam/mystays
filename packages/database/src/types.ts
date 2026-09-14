export interface ProviderRow {
  id: string;
  user_id: string;
  provider_type: string;
  verification_state: string;
  status: string;
}
export interface PropertyRow {
  id: string;
  provider_id: string;
  name: string;
  property_type: string;
  description: string;
  address_line1: string;
  address_line2: string | null;
  locality: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
  location: string | null;
}
export interface InventoryRow {
  id: string;
  property_id: string;
  inventory_type: string;
  parent_inventory_id: string | null;
  label: string;
  occupancy_capacity: number;
  furnishing: string | null;
  status: string;
}
export interface ListingRow {
  id: string;
  provider_id: string;
  property_id: string;
  inventory_id: string;
  title: string;
  description: string;
  monthly_rent: number;
  deposit: number;
  status: string;
  available_from: string | null;
  published_at: string | null;
  last_verified_at: string | null;
}
