/**
 * drizzle Seed Profile
 */

import * as profile from "../database/profile.server";

import profileList from "./data/profile.json";

async function seed() {
  await Promise.all(
    profileList.map(async (profileItem) => {
      return await profile.create({
        data: {
          firstName: profileItem.firstName,
          lastName: profileItem.lastName,
        },
      });
    })
  );
};

export { seed };
