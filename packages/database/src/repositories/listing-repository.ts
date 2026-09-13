import type { SupabaseClient } from '@supabase/supabase-js';

interface ListingInput { provider_id:string; property_id:string; inventory_id:string; title:string; description:string; monthly_rent:number; deposit:number; }

export class ListingRepository {
  constructor(private readonly db:SupabaseClient){}
  async create(input:ListingInput){
    const {data,error}=await this.db.from('listings').insert(input).select('*').single();
    if(error) throw new Error('LISTING_CREATE_FAILED');
    return data;
  }
  async publish(id:string){
    const {data,error}=await this.db.from('listings').update({status:'published',published_at:new Date().toISOString()}).eq('id',id).eq('status','draft').select('*').single();
    if(error) throw new Error('LISTING_PUBLISH_FAILED');
    return data;
  }
  async getPublishedById(id:string){
    const {data,error}=await this.db.from('listings').select('id,title,description,monthly_rent,deposit,available_from,published_at,properties!inner(id,name,property_type,description,address_line1,address_line2,locality,city,state,postal_code,country_code,location),inventory!inner(id,inventory_type,label,occupancy_capacity,furnishing,status),listing_media(id,object_key,media_type,sort_order)').eq('id',id).eq('status','published').maybeSingle();
    if(error) throw new Error('LISTING_DETAIL_FAILED');
    return data ?? null;
  }
  async search(filters:{city?:string;propertyType?:string;inventoryType?:string;minRent?:number;maxRent?:number;limit:number;offset:number}){
    let query=this.db.from('listings').select('id,title,description,monthly_rent,deposit,available_from,published_at,properties!inner(id,name,property_type,locality,city,state,country_code),inventory!inner(id,inventory_type,label,occupancy_capacity,furnishing,status)').eq('status','published');
    if(filters.city) query=query.ilike('properties.city',filters.city);
    if(filters.propertyType) query=query.eq('properties.property_type',filters.propertyType);
    if(filters.inventoryType) query=query.eq('inventory.inventory_type',filters.inventoryType);
    if(filters.minRent!==undefined) query=query.gte('monthly_rent',filters.minRent);
    if(filters.maxRent!==undefined) query=query.lte('monthly_rent',filters.maxRent);
    const {data,error}=await query.order('published_at',{ascending:false}).range(filters.offset,filters.offset+filters.limit-1);
    if(error) throw new Error('LISTING_SEARCH_FAILED');
    return data ?? [];
  }
}
