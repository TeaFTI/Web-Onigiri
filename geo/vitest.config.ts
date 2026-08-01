/**
 * Vitest Configuration
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    include: ["src/test/**/*.test.ts"],
    reporters: [
      // "default",
      "tree",
    ],
  },
});
