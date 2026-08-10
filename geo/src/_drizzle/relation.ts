/**
 * Relation
 *
 * https://orm.drizzle.team/docs/relations-v1-v2
 */

import { defineRelations } from "drizzle-orm";

import { emailTable } from "./schema/email";
import { profileTable } from "./schema/profile";
import { profileEmailTable } from "./schema/profile-email";
import { userTable } from "./schema/user";

const relation = defineRelations(
  {
    emailTable,
    profileTable,
    profileEmailTable,
    userTable,
  },
  (r) => ({
    /* Email Table */
    emailTable: {
      profileList: r.many.profileTable()
    },
    /* Profile Table */
    profileTable: {
      emailList: r.many.emailTable({
        from: r.profileTable.id.through(r.profileEmailTable.profileId),
        to: r.emailTable.id.through(r.profileEmailTable.emailId),
      }),
      user: r.one.userTable(),
    },

    /* User Table */
    userTable: {
      profile: r.one.profileTable({
        from: r.userTable.profileId,
        to: r.profileTable.id,
      }),
    },
  }),
);

export { relation };
