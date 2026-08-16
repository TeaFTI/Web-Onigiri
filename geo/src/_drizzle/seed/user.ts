/**
 * drizzle Seed User
 */

import { hashPassword } from "../../server/authentication/password";
import * as user from "../database/user.server";

import userList from "./data/user.json";

async function seed() {
  const borealisSalt = process.env.BOREALIS_SALT ?? "";

  await Promise.all(
    userList.map(async (userItem) => {
      const passwordHash = await hashPassword({
        password: userItem.password,
        salt: userItem.salt + borealisSalt,
      });

      return await user.create({
        data: {
          username: userItem.username,
          passwordHash: passwordHash,
          salt: userItem.salt,
        },
      });
    }),
  );
};

export { seed };
