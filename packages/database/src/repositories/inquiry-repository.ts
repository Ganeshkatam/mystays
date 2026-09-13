import type { SupabaseClient } from '@supabase/supabase-js';
export class InquiryRepository {
 constructor(private readonly db:SupabaseClient){}
 async create(input:{listing_id:string;renter_id:string;message:string}){
  const {data,error}=await this.db.from('inquiries').insert(input).select('id,listing_id,renter_id,message,status,provider_response,created_at,updated_at').single();
  if(error||!data) throw new Error(error?.code==='23505'?'INQUIRY_ALREADY_EXISTS':'INQUIRY_CREATE_FAILED');
  return data;
 }
 async listMine(renterId:string){
  const {data,error}=await this.db.from('inquiries').select('id,listing_id,message,status,provider_response,created_at,updated_at,listings!inner(id,title,monthly_rent,deposit)').eq('renter_id',renterId).order('created_at',{ascending:false});
  if(error) throw new Error('INQUIRY_LIST_FAILED'); return data??[];
 }
}
