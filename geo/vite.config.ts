/**
 * Vite Configuration
 */

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, type Plugin } from "vite";

const NOBLE_CIPHERS = "@noble/ciphers";

/**
 * Custom plugin to ensure the import of `@noble/ciphers` resolve to the
 * version specified in `better-auth`.
 *
 * The two versions of `@noble/ciphers` are installed side by side.
 * - v1 is at the top level, so drizzle, dotenvx, etc. resolve it
 * - v2 is nested under `better-auth`
 *
 * Both `better-auth` and `@dotenvx/dotenvx` depend on `@noble/ciphers`,
 * but they require different major versions. The bundler would normally
 * flatten dependencies, causing `better-auth` to break when it tries to
 * import v2 APIs from the top-level v1. This plugin intercepts imports
 * of `@noble/ciphers` and resolves them to the version specified in
 * `better-auth`.
 *
 * `better-auth` requires `@noble/ciphers` v2
 * (it imports `managedNonce` from `@noble/ciphers/utils.js`)
 *
 * `@dotenvx/dotenvx` > `eciesjs` > `@ecies/ciphers` chain requires v1
 * (it imports `@noble/ciphers/utils` with no extension)
 *
 * Currently it help resolve
 * - Clean `npm install [--legacy-peer-deps]`
 * - Clean `npm run build`
 * - Clean `npm run drizzle:[command]`
 *
 * @returns Vite plugin resolving `@noble/ciphers` to `better-auth` version
 */
function nobleCiphersBetterAuth(): Plugin {
  return {
    name: "noble-ciphers-better-auth",
    enforce: "pre",
    async resolveId(source) {
      if (source !== NOBLE_CIPHERS && !source.startsWith(`${NOBLE_CIPHERS}/`)) {
        return null;
      }
      const betterAuth = await this.resolve("better-auth", undefined, {
        skipSelf: true,
      });
      if (!betterAuth) return null;
      return this.resolve(source, betterAuth.id, { skipSelf: true });
    },
  };
}

export default defineConfig({
  define: {
    // Inject npm package name during build time.
    // Note: Need to "declare" global variable to TypeScript.
    // __PACKAGE_NAME__: process.env.npm_package_name ?? "",
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    nobleCiphersBetterAuth(),
    // TanStack
    tanstackStart(),
    // tailwindcss
    tailwindcss(),
    // Nitro
    nitro(),
    // Vite React
    // Note: React's Vite plugin must come after Start's Vite plugin.
    viteReact(),
  ],
  server: {
    port: 3000,
  },
})
