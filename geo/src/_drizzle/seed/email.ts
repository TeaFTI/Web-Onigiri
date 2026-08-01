/**
 * drizzle Seed Email
 */

import * as email from "../database/email.server";

import emailList from "./data/email.json";

async function seed() {
  await Promise.all(
    emailList.map(async (emailItem) => {
      return email.create({
        data: {
          email: emailItem.email,
        },
      });
    }),
  );
};

export { seed };
