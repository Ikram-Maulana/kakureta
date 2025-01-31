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
5. **Update Vercel Configuration**: If you changed the `scriptName`, update the `rewrites` section in `vercel.json` to match the new script name.

## Deploy from Vercel

Before deploying code to Vercel, you need to make `.env` file with the following content:

```bash
UMAMI_URL="your-umami-url"
```

After that, you can deploy the code to Vercel with the following command:

```bash
bun run deploy
```

## Connecting Your Project to This Worker using Next.js

You can connect your project to this worker using Next.js with the following code:

```typescript
import Script from 'next/script'

...rest of the code
<Script
  defer
  src="/yourScriptName.js"
  data-website-id="your-website-id"
/>
...rest of the code
```

After that, you can modify the next.config.js to add the following code:

```javascript
..rest of the code
  async rewrites() {
    return [
      {
        source: "/yourScriptName.js",
        destination: "https://your-endpoint-name.vercel.app/yourScriptName",
      },
    ];
  },
  crossOrigin: "anonymous",
  skipTrailingSlashRedirect: true,
..rest of the code
```

## Resources

- [Vitobotta](https://github.com/umami-software/umami/discussions/1026)
