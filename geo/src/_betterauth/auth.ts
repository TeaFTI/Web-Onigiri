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

const userTableName = `${betterAuthTablePrefix}user`;
const sessionTableName = `${betterAuthTablePrefix}session`;
const accountTableName = `${betterAuthTablePrefix}account`;
const verificationTableName = `${betterAuthTablePrefix}verification`;

const redis = createClient({ url: REDIS_URI });
await redis.connect();

export const auth = betterAuth({
  // Database
  database: drizzleAdapter(drizzleClient, {
    provider: "pg",
    schema: {
      [userTableName]: betterauthUserTable,
      [sessionTableName]: betterauthSessionTable,
      [accountTableName]: betterauthAccountTable,
      [verificationTableName]: betterauthVerificationTable,
    },
  }),
  // Schema
  user: {
    modelName: userTableName,
  },
  session: {
    modelName: sessionTableName,
    expiresIn: 60 * 60 * 24 * 7, // 7 Day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 1, // 1 Minute
    }
  },
  account: {
    modelName: accountTableName,
  },
  verification: {
    modelName: verificationTableName,
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
  // Advanced
  advanced: {
    database: {
      generateId: false,
    },
  },
});
