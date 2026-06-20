import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { usernameClient } from "better-auth/client/plugins";
import { username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { createClient } from "redis";

import { drizzleClient } from "../_drizzle/client";
import {
  betterauthAccountTable,
  betterauthSessionTable,
  betterauthUserTable,
  betterauthVerificationTable,
} from "../_drizzle/schema/better-auth";
import { REDIS_URI } from "../configuration/redis";

const betterAuthTablePrefix = process.env.BETTER_AUTH_TABLE_PREFIX
  ?? "betterauth_";
const betterAuthKeyPrefix = process.env.BETTER_AUTH_KEY_PREFIX
  ?? "better-auth:";

const redis = createClient({ url: REDIS_URI });
await redis.connect();

export const auth = betterAuth({
  // Database
  database: drizzleAdapter(drizzleClient, {
    provider: "pg",
    schema: {
      [`${betterAuthTablePrefix}user`]: betterauthUserTable,
      [`${betterAuthTablePrefix}session`]: betterauthSessionTable,
      [`${betterAuthTablePrefix}account`]: betterauthAccountTable,
      [`${betterAuthTablePrefix}verification`]: betterauthVerificationTable,
    },
  }),
  // Schema
  user: {
    modelName: `${betterAuthTablePrefix}user`,
  },
  session: {
    modelName: `${betterAuthTablePrefix}session`,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 Minute
    }
  },
  account: {
    modelName: `${betterAuthTablePrefix}account`,
  },
  verification: {
    modelName: `${betterAuthTablePrefix}verification`,
  },
  // Secondary Storage
  secondaryStorage: {
    keyPrefix: betterAuthKeyPrefix,
    get: async (key) => {
      return await redis.get(key);
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { EX: ttl });
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    }
  },
  // Authentication Method
  emailAndPassword: {
    enabled: true,
  },
  // Plugin
  plugins: [
    tanstackStartCookies(),
    username(),
    usernameClient(),
  ],
});
