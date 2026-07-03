/**
 * User Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../../configuration/global";

import { profileTable } from "./profile";

const userTable = pgTable(`${TABLE_PREFIX}user`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  profileId: uuid("profile_id").references(() => profileTable.id),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  salt: text("salt").notNull(),
});

const userRelationList = defineRelations(
  { userTable, profileTable },
  (relation) => ({
    userTable: {
      profile: relation.one.profileTable({
        from: relation.userTable.profileId,
        to: relation.profileTable.id,
      }),
    },
  })
);

export type User = typeof userTable.$inferSelect;
export type UserBasic = Omit<User, "passwordHash" | "salt">;
export type UserCreate = typeof userTable.$inferInsert;
export { userRelationList, userTable };
