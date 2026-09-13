import type { FastifyInstance } from 'fastify';
import { createProperty } from '@mystays/application';
import { createDatabaseClient, PropertyRepository } from '@mystays/database';
import { authenticate, getBearerToken } from '../../auth.js';

interface Body { providerId:string; name:string; propertyType:string; description:string; addressLine1:string; locality:string; city:string; state:string; postalCode:string; countryCode:string; }

export async function registerPropertyRoutes(app: FastifyInstance): Promise<void> {
  app.post<{Body:Body}>('/api/v1/properties',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id), token=getBearerToken(request);
    if(!token) return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    const b=request.body;
    if(!b?.providerId||!b?.name||!b?.propertyType||!b?.addressLine1||!b?.locality||!b?.city||!b?.state||!b?.postalCode||!/^[A-Z]{2}$/.test(b.countryCode??'')) return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'Property input is invalid.'},meta:{requestId}});
    const db=createDatabaseClient(process.env,token);
    const data=await createProperty(new PropertyRepository(db),b);
    return reply.code(201).send({data,error:null,meta:{requestId}});
  });
  app.get('/api/v1/properties/me',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request),userId=request.userId;
    if(!token||!userId)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    const db=createDatabaseClient(process.env,token);
    const provider=await new (await import('@mystays/database')).ProviderRepository(db).getOwn(userId) as {id:string}|null;
    const data=provider?await new PropertyRepository(db).listOwn(provider.id):[];
    return reply.send({data,error:null,meta:{requestId}});
  });
}
