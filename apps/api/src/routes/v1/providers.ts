import type { FastifyInstance } from "fastify";
import { createProvider } from "@mystays/application";
import { createDatabaseClient, ProviderRepository } from "@mystays/database";
import { authenticate, getBearerToken } from "../../auth.js";

interface CreateProviderBody {
  providerType: string;
}

export async function registerProviderRoutes(
  app: FastifyInstance,
): Promise<void> {
  app.post<{ Body: CreateProviderBody }>(
    "/api/v1/providers",
    { preHandler: async (request, reply) => authenticate(request, reply) },
    async (request, reply) => {
      const requestId = String(request.id);
      const userId = request.userId;
      if (!userId || !request.body?.providerType?.trim()) {
        return reply.code(422).send({
          data: null,
          error: {
            code: "VALIDATION_FAILED",
            message: "Provider type is required.",
          },
          meta: { requestId },
        });
      }
      const token = getBearerToken(request);
      if (!token)
        return reply.code(401).send({
          data: null,
          error: {
            code: "AUTHENTICATION_REQUIRED",
            message: "Authentication is required.",
          },
          meta: { requestId },
        });
      const db = createDatabaseClient(process.env, token);
      const data = await createProvider(
        new ProviderRepository(db),
        userId,
        request.body.providerType.trim(),
      );
      return reply.code(201).send({ data, error: null, meta: { requestId } });
    },
  );

  app.get(
    "/api/v1/providers/me",
    { preHandler: async (request, reply) => authenticate(request, reply) },
    async (request, reply) => {
      const requestId = String(request.id);
      const userId = request.userId;
      const token = getBearerToken(request);
      if (!userId || !token)
        return reply.code(401).send({
          data: null,
          error: {
            code: "AUTHENTICATION_REQUIRED",
            message: "Authentication is required.",
          },
          meta: { requestId },
        });
      const db = createDatabaseClient(process.env, token);
      const data = await new ProviderRepository(db).getOwn(userId);
      return reply.send({ data, error: null, meta: { requestId } });
    },
  );
}
