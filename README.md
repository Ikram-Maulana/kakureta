# Kakureta 👁️

Kakureta is a simple and lightweight API to solve Umami Analytics issue with Anti-Adblockers. This project build with [Hono](https://hono.dev/) and [Vercel](https://vercel.com/) integration.

## Usage

1. **Fork and Clone**: Fork this repository and clone it to your local machine.
2. **Install Dependencies**: Run `bun install` to install all necessary dependencies.
3. **Configure Environment**: Add your Umami URL to the `.env` file:

   ```bash
   UMAMI_URL="your-umami-url"
   ```

4. **Customize Script Name**: If desired, change the `scriptName` variable in `api/index.ts` to your preferred value.

## Deploy from Vercel

Before deploying code to Vercel, you need to make `.env` file with the following content:

```bash
UMAMI_URL="your-umami-url"
```

Then, you should add the environment variable to Vercel with the following command:

```bash
vecel env add UMAMI_URL your-umami-url
```

After that, you can deploy the code to Vercel with the following command:

```bash
bun run deploy
```

## Connecting Your Project to This Worker

You can connect your project to this worker with the following code:

```typescript
...rest of the code
<script
  defer
  src="https://your-deployment-url/yourScriptName"
  data-website-id="your-website-id"
  data-host-url="your-deployment-url"
/>
...rest of the code
```

## Resources

- [Vitobotta](https://github.com/umami-software/umami/discussions/1026)
