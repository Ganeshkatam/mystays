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
}
