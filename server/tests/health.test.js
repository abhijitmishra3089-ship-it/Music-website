import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("liveness endpoint returns ok", async () => {
  const response = await request(app).get("/api/v1/health/live");
  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
});
