import Fastify from 'fastify';
import { randomUUID } from 'node:crypto';
const app=Fastify({logger:true,genReqId:()=>randomUUID()});
app.get('/api/v1/health',async(_request,reply)=>reply.send({data:{status:'ok'},error:null,meta:{requestId:String(_request.id)}}));
app.setErrorHandler(async(error,_request,reply)=>{app.log.error(error);return reply.code(500).send({data:null,error:{code:'INTERNAL_ERROR',message:'An unexpected server error occurred.'},meta:{requestId:String(_request.id)}});});
if(import.meta.url===`file://${process.argv[1]}`){const port=Number(process.env.PORT??'3001');await app.listen({host:'0.0.0.0',port});}
export { app };