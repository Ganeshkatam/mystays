import type { FastifyInstance } from 'fastify';
import { createListing, publishListing } from '@mystays/application';
import { createDatabaseClient, ListingRepository } from '@mystays/database';
import { validateListingInput } from '@mystays/validation';
import { authenticate, getBearerToken } from '../../auth.js';

interface CreateListingBody { providerId:string; propertyId:string; inventoryId:string; title:string; description:string; monthlyRent:number; deposit:number; }
interface ListingParams { id:string; }

export async function registerListingRoutes(app: FastifyInstance): Promise<void> {
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
