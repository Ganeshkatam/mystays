import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/v1/health", () => {
  it("returns a healthy API response with a request ID", async () => {
    const response = GET();

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body).toMatchObject({
      data: { status: "ok" },
      error: null,
    });
    expect(body.meta.requestId).toEqual(expect.any(String));
    expect(body.meta.requestId).toMatch(/^[0-9a-f-]{36}$/i);
  });
});
