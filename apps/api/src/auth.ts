import type { FastifyReply, FastifyRequest } from 'fastify';
import { createDatabaseClient } from '@mystays/database';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export function getBearerToken(request: FastifyRequest): string | null {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  return token.length > 0 ? token : null;
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<boolean> {
  const token = getBearerToken(request);
  if (!token) {
    await reply.code(401).send({ data: null, error: { code: 'AUTHENTICATION_REQUIRED', message: 'Authentication is required.' }, meta: { requestId: String(request.id) } });
    return false;
  }
  const db = createDatabaseClient(process.env, token);
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user) {
    await reply.code(401).send({ data: null, error: { code: 'AUTHENTICATION_REQUIRED', message: 'Authentication is required.' }, meta: { requestId: String(request.id) } });
    return false;
  }
  request.userId = data.user.id;
  return true;
}
