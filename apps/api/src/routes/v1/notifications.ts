import type { FastifyInstance } from "fastify";
import {
  createDatabaseClient,
  NotificationRepository,
} from "@mystays/database";
import { authenticate, getBearerToken } from "../../auth.js";

export async function registerNotificationRoutes(
  app: FastifyInstance,
): Promise<void> {
  app.get(
    "/api/v1/notifications",
    { preHandler: async (r, p) => authenticate(r, p) },
    async (request, reply) => {
      const requestId = String(request.id),
        token = getBearerToken(request),
        userId = request.userId;
      if (!token || !userId)
        return reply.code(401).send({
          data: null,
          error: {
            code: "AUTHENTICATION_REQUIRED",
            message: "Authentication is required.",
          },
          meta: { requestId },
        });
      const data = await new NotificationRepository(
        createDatabaseClient(process.env, token),
      ).listMine(userId);
      return reply.send({ data, error: null, meta: { requestId } });
    },
  );
  app.patch<{ Params: { id: string } }>(
    "/api/v1/notifications/:id/read",
    { preHandler: async (r, p) => authenticate(r, p) },
    async (request, reply) => {
      const requestId = String(request.id),
        token = getBearerToken(request),
        userId = request.userId;
      if (!token || !userId)
        return reply.code(401).send({
          data: null,
          error: {
            code: "AUTHENTICATION_REQUIRED",
            message: "Authentication is required.",
          },
          meta: { requestId },
        });
      if (!/^[0-9a-f-]{36}$/i.test(request.params.id))
        return reply.code(400).send({
          data: null,
          error: {
            code: "INVALID_NOTIFICATION_ID",
            message: "Notification ID is invalid.",
          },
          meta: { requestId },
        });
      const data = await new NotificationRepository(
        createDatabaseClient(process.env, token),
      ).markRead(request.params.id, userId);
      if (!data)
        return reply.code(404).send({
          data: null,
          error: {
            code: "NOT_FOUND",
            message: "Notification was not found.",
          },
          meta: { requestId },
        });
      return reply.send({ data, error: null, meta: { requestId } });
    },
  );
}
