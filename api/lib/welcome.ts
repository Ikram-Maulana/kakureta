import { Context } from "hono";

export async function welcome(c: Context) {
  return c.text(
    ` _______________________________\n` +
      `/ Hi, welcome to the kakureta   \\\n` +
      `| site! There is nothing to see |\n` +
      `\\ here.                         /\n` +
      ` -------------------------------\n` +
      `        \\   ^__^                \n` +
      `         \\  (oo)\\_______        \n` +
      `            (__)\\       )\\/\\    \n` +
      `                ||----w |       \n` +
      `                ||     ||       `
  );
}
