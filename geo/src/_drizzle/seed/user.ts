/**
 * Database Seed User
 */

import { type DrizzleClient } from "../client";
import { userTable } from "../schema/user";

import userList from "./data/user.json";

async function seed(drizzleClient: DrizzleClient) {
  await drizzleClient.insert(userTable).values(userList);
}

export default seed;
export { seed };
