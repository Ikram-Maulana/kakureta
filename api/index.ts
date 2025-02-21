import { Context, Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
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
const corsMiddleware = cors({
  origin: "*",
  allowMethods: ["GET", "HEAD", "POST", "OPTIONS"],
  maxAge: 86400,
  allowHeaders: ["Content-Type", "Allow", "x-umami-cache"],
});

app.use(async (c, next) => {
  const { UMAMI_URL } = env(c);
  c.set("umamiUrl", UMAMI_URL);
  c.set("endpointUrl", `/api/${scriptName}`);
  await next();
});

app.get("/", (c: Context) => {
  return welcome(c);
});

app.use(corsMiddleware).get(scriptName, (c: Context) => {
  return getScript(c);
});

app.use(corsMiddleware).post(scriptName, (c: Context) => {
  return postData(c);
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
