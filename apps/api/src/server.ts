import Fastify from 'fastify';
import { randomUUID } from 'node:crypto';
import { registerListingRoutes } from './routes/v1/listings.js';
import { registerInventoryRoutes } from './routes/v1/inventory.js';
import { registerPropertyRoutes } from './routes/v1/properties.js';
import { registerProviderRoutes } from './routes/v1/providers.js';

const app = Fastify({ logger: true, genReqId: () => randomUUID() });

app.get('/api/v1/health', async (request, reply) =>
  reply.send({ data: { status: 'ok' }, error: null, meta: { requestId: String(request.id) } }),
);

await registerListingRoutes(app);
await registerInventoryRoutes(app);
await registerPropertyRoutes(app);
await registerProviderRoutes(app);

app.setErrorHandler(async (error, request, reply) => {
  app.log.error(error);
  return reply.code(500).send({
    data: null,
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected server error occurred.' },
    meta: { requestId: String(request.id) },
  });
});

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? '3001');
  await app.listen({ host: '0.0.0.0', port });
}

export { app };
