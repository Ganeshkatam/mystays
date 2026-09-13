import type { FastifyInstance } from 'fastify';
import { addListingMedia } from '@mystays/application';
import { createDatabaseClient, ListingMediaRepository } from '@mystays/database';
import { authenticate, getBearerToken } from '../../auth.js';

interface Params { id:string; mediaId:string; }
interface Body { objectKey:string; mediaType:'image'|'video'; sortOrder?:number; }

export async function registerListingMediaRoutes(app:FastifyInstance):Promise<void>{
  app.post<{Params:{id:string};Body:Body}>('/api/v1/listings/:id/media',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request),b=request.body;
    if(!token)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    if(!b?.objectKey||!['image','video'].includes(b.mediaType)||!Number.isInteger(b.sortOrder??0)||Number(b.sortOrder??0)<0)return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'Listing media input is invalid.'},meta:{requestId}});
    try{
      const data=await addListingMedia(new ListingMediaRepository(createDatabaseClient(process.env,token)),{listingId:request.params.id,objectKey:b.objectKey,mediaType:b.mediaType,sortOrder:b.sortOrder??0});
      return reply.code(201).send({data,error:null,meta:{requestId}});
    }catch(e){if(e instanceof Error&&e.message==='INVALID_LISTING_MEDIA')return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'Listing media input is invalid.'},meta:{requestId}});throw e;}
  });
  app.get<{Params:{id:string}}>('/api/v1/listings/:id/media',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request);
    if(!token)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    const data=await new ListingMediaRepository(createDatabaseClient(process.env,token)).listByListing(request.params.id);
    return reply.send({data,error:null,meta:{requestId}});
  });
  app.delete<{Params:Params}>('/api/v1/listings/:id/media/:mediaId',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request);
    if(!token)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    const data=await new ListingMediaRepository(createDatabaseClient(process.env,token)).delete(request.params.mediaId);
    if(!data)return reply.code(404).send({data:null,error:{code:'NOT_FOUND',message:'Listing media was not found.'},meta:{requestId}});
    return reply.send({data,error:null,meta:{requestId}});
  });
}
