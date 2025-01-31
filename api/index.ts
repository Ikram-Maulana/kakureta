import { Context, Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/vercel";
import { getScript, postData, welcome } from "./lib";

interface Bindings {
  UMAMI_URL: string;
}

declare module "hono" {
  interface ContextVariableMap {
    endpointUrl: string;
    umamiUrl: string;
  }
}

export const config = {
  runtime: "edge",
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");
const scriptName = "kakureta"; // You can change this to whatever you want
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

app.use(async (c, next) => {
  const { UMAMI_URL } = env(c);
  c.set("umamiUrl", UMAMI_URL);
  c.set("endpointUrl", `/api/${scriptName}`);
  await next();
});

app.get("/", (c: Context) => {
  return welcome(c);
});

app
  .get(scriptName, (c: Context) => {
    return getScript(c, corsHeaders);
  })
  .post((c: Context) => {
    return postData(c, corsHeaders);
  });

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
