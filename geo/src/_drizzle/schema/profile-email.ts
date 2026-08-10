/**
 * Profile Email Table Schema
 */

import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../../configuration/global";

import { emailTable } from "./email";
import { profileTable } from "./profile";

const profileEmailTable = pgTable(`${TABLE_PREFIX}profile_email`,
  {
    profileId: uuid("profile_id").notNull()
      .references(() => profileTable.id),
    emailId: uuid("email_id").notNull()
      .references(() => emailTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.profileId, table.emailId],
    })
  ],
);

export { profileEmailTable };
