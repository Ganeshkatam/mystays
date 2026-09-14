import Fastify from "fastify";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { registerListingRoutes } from "./routes/v1/listings.js";
import { registerInquiryRoutes } from "./routes/v1/inquiries.js";
import { registerListingMediaRoutes } from "./routes/v1/listing-media.js";
import { registerInventoryRoutes } from "./routes/v1/inventory.js";
import { registerPropertyRoutes } from "./routes/v1/properties.js";
import { registerProviderRoutes } from "./routes/v1/providers.js";
import { registerNotificationRoutes } from "./routes/v1/notifications.js";

const app = Fastify({
  logger: true,
  genReqId: () => randomUUID(),
  bodyLimit: 1048576,
});

app.addHook("onSend", async (_request, reply) => {
  reply.header("X-Content-Type-Options", "nosniff");
  reply.header("X-Frame-Options", "DENY");
  reply.header("Referrer-Policy", "strict-origin-when-cross-origin");
  reply.header(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
});

app.get("/api/v1/health", async (request, reply) =>
  reply.send({
    data: { status: "ok" },
    error: null,
    meta: { requestId: String(request.id) },
  }),
);

await registerListingRoutes(app);
await registerInquiryRoutes(app);
await registerListingMediaRoutes(app);
await registerInventoryRoutes(app);
await registerPropertyRoutes(app);
await registerProviderRoutes(app);
await registerNotificationRoutes(app);

app.setErrorHandler(async (error, request, reply) => {
  app.log.error(error);
  return reply.code(500).send({
    data: null,
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected server error occurred.",
    },
    meta: { requestId: String(request.id) },
  });
});

const entryFile = process.argv[1];
const isMainModule =
  Boolean(entryFile) &&
  (resolve(entryFile as string).toLowerCase() ===
    fileURLToPath(import.meta.url).toLowerCase() ||
    import.meta.url === `file://${entryFile}`);

if (isMainModule) {
  const port = Number(process.env.PORT ?? "3001");
  await app.listen({ host: "0.0.0.0", port });
}

export { app };
