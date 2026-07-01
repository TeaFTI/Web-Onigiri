/**
 * Better Auth Tables Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const betterauthUserTable = pgTable("betterauth_user", {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

const betterauthSessionTable = pgTable(
  "betterauth_session",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id").notNull()
      .references(() => betterauthUserTable.id, { onDelete: "cascade" }),
  },
  (table) => [index("betterauth_session_user_id_idx").on(table.userId)],
);

const betterauthAccountTable = pgTable(
  "betterauth_account",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id").notNull()
      .references(() => betterauthUserTable.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("betterauth_account_user_id_idx").on(table.userId)],
);

const betterauthVerificationTable = pgTable(
  "betterauth_verification",
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("betterauth_verification_identifier_idx").on(table.identifier),
  ],
);

const betterauthRelationList = defineRelations(
  {
    betterauthUserTable,
    betterauthSessionTable,
    betterauthAccountTable,
    betterauthVerificationTable,
  },
  (relation) => ({
    betterauthUserTable: {
      sessionList: relation.many.betterauthSessionTable(),
      accountList: relation.many.betterauthAccountTable(),
    },
    betterauthSessionTable: {
      user: relation.one.betterauthUserTable({
        from: relation.betterauthSessionTable.userId,
        to: relation.betterauthUserTable.id,
      }),
    },
    betterauthAccountTable: {
      user: relation.one.betterauthUserTable({
        from: relation.betterauthAccountTable.userId,
        to: relation.betterauthUserTable.id,
      }),
    },
  }),
);

export {
  betterauthAccountTable,
  betterauthRelationList,
  betterauthSessionTable,
  betterauthUserTable,
  betterauthVerificationTable
};

