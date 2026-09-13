import type { FastifyInstance } from 'fastify';
import { createListing, publishListing } from '@mystays/application';
import { createDatabaseClient, ListingRepository } from '@mystays/database';
import { validateListingInput } from '@mystays/validation';
import { authenticate, getBearerToken } from '../../auth.js';

interface CreateListingBody { providerId:string; propertyId:string; inventoryId:string; title:string; description:string; monthlyRent:number; deposit:number; }
interface ListingParams { id:string; }

export async function registerListingRoutes(app: FastifyInstance): Promise<void> {
  app.get<{Params:ListingParams}>('/api/v1/listings/:id',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request);
    if(!token)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    try {
      const {getListing}=await import('@mystays/application');
      const data=await getListing(new ListingRepository(createDatabaseClient(process.env,token)),request.params.id);
      return reply.send({data,error:null,meta:{requestId}});
    } catch(error) {
      if(error instanceof Error && error.message==='INVALID_LISTING_ID') return reply.code(400).send({data:null,error:{code:'INVALID_LISTING_ID',message:'Listing ID is invalid.'},meta:{requestId}});
      if(error instanceof Error && error.message==='LISTING_NOT_FOUND') return reply.code(404).send({data:null,error:{code:'NOT_FOUND',message:'Listing was not found.'},meta:{requestId}});
      throw error;
    }
  });

  app.get<{Querystring:{city?:string;propertyType?:string;inventoryType?:string;minRent?:string;maxRent?:string;limit?:string;offset?:string}}>('/api/v1/listings',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request);
    if(!token)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    const q=request.query;
    const limit=q.limit===undefined?20:Number(q.limit), offset=q.offset===undefined?0:Number(q.offset);
    const minRent=q.minRent===undefined?undefined:Number(q.minRent), maxRent=q.maxRent===undefined?undefined:Number(q.maxRent);
    if(!Number.isInteger(limit)||limit<1||limit>100||!Number.isInteger(offset)||offset<0||Number.isNaN(minRent)||Number.isNaN(maxRent)|| (minRent!==undefined&&minRent<0)||(maxRent!==undefined&&maxRent<0)||(minRent!==undefined&&maxRent!==undefined&&minRent>maxRent))
      return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'Search filters are invalid.'},meta:{requestId}});
    const db=createDatabaseClient(process.env,token);
    const data=await import('@mystays/application').then(({searchListings})=>searchListings(new ListingRepository(db),{city:q.city?.trim()||undefined,propertyType:q.propertyType?.trim()||undefined,inventoryType:q.inventoryType?.trim()||undefined,minRent,maxRent,limit,offset}));
    return reply.send({data,error:null,meta:{requestId}});
  });


  app.post<{Body:CreateListingBody}>('/api/v1/listings',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id), token=getBearerToken(request);
    if(!token)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    if(validateListingInput(request.body).length>0)return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'Listing input is invalid.'},meta:{requestId}});
    const db=createDatabaseClient(process.env,token);
    const data=await createListing(new ListingRepository(db),request.body);
    return reply.code(201).send({data,error:null,meta:{requestId}});
  });
  app.post<{Params:ListingParams}>('/api/v1/listings/:id/publish',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request);
    if(!token)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    const db=createDatabaseClient(process.env,token);
    const {data:listing,error}=await db.from('listings').select('id,status,title,description,monthly_rent,deposit').eq('id',request.params.id).single();
    if(error||!listing)return reply.code(404).send({data:null,error:{code:'NOT_FOUND',message:'Listing was not found.'},meta:{requestId}});
    const data=await publishListing(new ListingRepository(db),{status:String(listing.status),title:String(listing.title),description:String(listing.description),monthlyRent:Number(listing.monthly_rent),deposit:Number(listing.deposit)},request.params.id);
    return reply.send({data,error:null,meta:{requestId}});
  });
}
