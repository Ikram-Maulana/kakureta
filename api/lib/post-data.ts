import { Context } from "hono";

export const config = {
  runtime: "edge",
};

export async function postData(c: Context) {
  const umamiUrl = c.get("umamiUrl");
  const request = new Request(c.req.raw);
  request.headers.delete("cookie");

  let response = await fetch(`${umamiUrl}/api/send`, request);
  const js = await response.text();

  response = new Response(js);

  return response;
}
