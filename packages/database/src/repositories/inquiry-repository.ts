import type { SupabaseClient } from '@supabase/supabase-js';
export class InquiryRepository {
 constructor(private readonly db:SupabaseClient){}
 async create(input:{listing_id:string;renter_id:string;message:string}){
  const {data,error}=await this.db.from('inquiries').insert(input).select('id,listing_id,renter_id,message,status,provider_response,created_at,updated_at').single();
  if(error||!data) throw new Error(error?.code==='23505'?'INQUIRY_ALREADY_EXISTS':'INQUIRY_CREATE_FAILED');
  return data;
 }
 async listForProvider(providerUserId:string){
  const {data,error}=await this.db.from('inquiries').select('id,listing_id,renter_id,message,status,provider_response,created_at,updated_at,listings!inner(id,title,provider_id,providers!inner(user_id))').eq('listings.providers.user_id',providerUserId).order('created_at',{ascending:false});
  if(error) throw new Error('INQUIRY_PROVIDER_LIST_FAILED'); return data??[];
 }
 async updateProviderStatus(id:string,providerUserId:string,status:'viewed'|'responded'|'closed',providerResponse?:string){
  if(providerResponse!==undefined&&providerResponse.trim().length>5000) throw new Error('INVALID_PROVIDER_RESPONSE');
  const payload={status,updated_at:new Date().toISOString(),...(providerResponse!==undefined?{provider_response:providerResponse.trim()}: {})};
  const {data,error}=await this.db.from('inquiries').update(payload).eq('id',id).select('id,listing_id,renter_id,message,status,provider_response,created_at,updated_at,listings!inner(provider_id,providers!inner(user_id))').single();
  if(error||!data) throw new Error('INQUIRY_UPDATE_FAILED'); return data;
 }
 async listMine(renterId:string){
  const {data,error}=await this.db.from('inquiries').select('id,listing_id,message,status,provider_response,created_at,updated_at,listings!inner(id,title,monthly_rent,deposit)').eq('renter_id',renterId).order('created_at',{ascending:false});
  if(error) throw new Error('INQUIRY_LIST_FAILED'); return data??[];
 }
}
