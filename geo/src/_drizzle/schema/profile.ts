/**
 * Profile Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../../configuration/global";


const profileTable = pgTable(`${TABLE_PREFIX}profile`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  prefix: text("prefix"),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name"),
  suffix: text("suffix"),
  phoneticFirstName: text("phonetic_first_name"),
  phoneticMiddleName: text("phonetic_middle_name"),
  phoneticLastName: text("phonetic_last_name"),
  nickname: text("nickname"),
});

export type Profile = typeof profileTable.$inferSelect;
export type ProfileCreate = typeof profileTable.$inferInsert;
export type ProfileUpdate = Partial<ProfileCreate>;
export { profileTable };
