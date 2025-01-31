import { Context } from "hono";

export const config = {
  runtime: "edge",
};

export async function getScript(
  c: Context,
  corsHeaders: Record<string, string>
) {
  const umamiUrl = c.get("umamiUrl");
  const endpointUrl = c.get("endpointUrl");
  let response = await fetch(`${umamiUrl}/script.js`);
  let js = await response.text();

  js = js.replace("/api/send", endpointUrl);
  response = new Response(js, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      ...corsHeaders,
      "Access-Control-Allow-Headers":
        response.headers.get("Access-Control-Request-Headers") || "",
    },
  });

  return response;
}
