import type { SupabaseClient } from '@supabase/supabase-js';

export interface InventoryRecord {
  id: string; property_id: string; inventory_type: string; parent_inventory_id: string | null;
  label: string; occupancy_capacity: number; furnishing: string | null; status: string;
}

export class InventoryRepository {
  constructor(private readonly db: SupabaseClient) {}
  async create(input: Record<string, unknown>): Promise<InventoryRecord> {
    const { data, error } = await this.db.from('inventory').insert(input).select('*').single();
    if (error || !data) throw new Error('INVENTORY_CREATE_FAILED');
    return data as InventoryRecord;
  }
  async listOwn(propertyId: string): Promise<InventoryRecord[]> {
    const { data, error } = await this.db.from('inventory').select('*').eq('property_id', propertyId).order('created_at', { ascending: false });
    if (error) throw new Error('INVENTORY_LIST_FAILED');
    return (data ?? []) as InventoryRecord[];
  }
}
