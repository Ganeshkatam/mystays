import type { FastifyInstance } from 'fastify';
import { createInventory } from '@mystays/application';
import { createDatabaseClient, InventoryRepository, PropertyRepository } from '@mystays/database';
import { authenticate, getBearerToken } from '../../auth.js';

interface Body { propertyId:string; inventoryType:string; parentInventoryId?:string; label:string; occupancyCapacity:number; furnishing?:string; }

export async function registerInventoryRoutes(app: FastifyInstance): Promise<void> {
  app.post<{Body:Body}>('/api/v1/inventory',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request);
    const b=request.body;
    if(!token)return reply.code(401).send({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required.'},meta:{requestId}});
    if(!b?.propertyId||!b?.inventoryType||!b?.label||!Number.isInteger(b.occupancyCapacity)||b.occupancyCapacity<1||b.occupancyCapacity>100)return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'Inventory input is invalid.'},meta:{requestId}});
    const db=createDatabaseClient(process.env,token);
    const data=await createInventory(new InventoryRepository(db),b);
    return reply.code(201).send({data,error:null,meta:{requestId}});
  });
  app.get<{Querystring:{propertyId:string}}>('/api/v1/inventory',{preHandler:async(r,p)=>authenticate(r,p)},async(request,reply)=>{
    const requestId=String(request.id),token=getBearerToken(request);
    if(!token||!request.query.propertyId)return reply.code(422).send({data:null,error:{code:'VALIDATION_FAILED',message:'propertyId is required.'},meta:{requestId}});
    const db=createDatabaseClient(process.env,token);
    const data=await new InventoryRepository(db).listOwn(request.query.propertyId);
    return reply.send({data,error:null,meta:{requestId}});
  });
}
