import { serve } from "@hono/node-server";
import app from "./app.js";

console.log("Auth server running on http://localhost:4000");

serve({
  fetch: app.fetch,
  port: 4000,
});