export interface ListingRecord { readonly id:string; readonly status:string; readonly title:string; readonly description:string; readonly monthlyRent:number; readonly deposit:number; }
export interface ListingRepositoryPort {
  create(input:{provider_id:string;property_id:string;inventory_id:string;title:string;description:string;monthly_rent:number;deposit:number}):Promise<unknown>;
  publish(id:string):Promise<unknown>;
}
export interface ListingSearchRepositoryPort {
  search(filters:{city?:string;propertyType?:string;inventoryType?:string;minRent?:number;maxRent?:number;limit:number;offset:number}):Promise<unknown[]>;
}
