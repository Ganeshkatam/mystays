import type { FastifyInstance } from 'fastify';
import { createInquiry } from '@mystays/application';
import { createDatabaseClient, InquiryRepository } from '@mystays/database';
import { authenticate, getBearerToken } from '../../auth.js';

export async function registerInquiryRoutes(app:FastifyInstance):Promise<void>{
 app.post<{Params:{listingId:string};Body:{message:string}}>('/api/v1/listings/:listingId/inquiries',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
  const requestId=String(request.id),token=getBearerToken(request),renterId=request.userId,message=request.body?.message;
  if(!token||!renterId)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
  if(!message?.trim()||message.trim().length>5000)return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'Inquiry message is invalid.'},meta:{requestId}});
  try{const data=await createInquiry(new InquiryRepository(createDatabaseClient(process.env,token)),{listingId:request.params.listingId,renterId,message});return reply.code(201).send({data,error:null,meta:{requestId}});}
  catch(e){if(e instanceof Error&&e.message==='INVALID_INQUIRY')return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'Inquiry is invalid.'},meta:{requestId}});if(e instanceof Error&&e.message==='INQUIRY_ALREADY_EXISTS')return reply.code(409).send({data:null,error:{code:'INQUIRY_EXISTS',message:'You already submitted an inquiry for this listing.'},meta:{requestId}});throw e;}
 });
 app.get('/api/v1/inquiries/me',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
  const requestId=String(request.id),token=getBearerToken(request),renterId=request.userId;
  if(!token||!renterId)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
  const data=await new InquiryRepository(createDatabaseClient(process.env,token)).listMine(renterId);
  return reply.send({data,error:null,meta:{requestId}});
 });
}
