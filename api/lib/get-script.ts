import { Context } from "hono";

export const config = {
  runtime: "edge",
};

export async function getScript(c: Context) {
  const umamiUrl = c.get("umamiUrl");
  const endpointUrl = c.get("endpointUrl");
  let response = await fetch(`${umamiUrl}/script.js`);
  let js = await response.text();

  js = js.replace("/api/send", endpointUrl);
  response = new Response(js);

  return response;
}
