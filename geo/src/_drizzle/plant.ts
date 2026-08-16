/**
 * Database Plant
 */

import { drizzleClient, pgClient } from "./client";

import * as chartOfAccountType from "./seed/chart-of-account-type";
import * as email from "./seed/email";
import * as profile from "./seed/profile";
import * as user from "./seed/user";

async function plant() {
  try {
    console.info("Planting Start");

    console.debug("Connecting to Database...");
    await pgClient.connect();
    console.debug("Connected to Database.");

    console.debug("Seeding Database...");

    await chartOfAccountType.seed(drizzleClient);
    console.debug("Seeding Chart of Account Type Complete.");

    await user.seed();
    console.debug("Seeding user Complete.");

    await profile.seed();
    console.debug("Seeding profile Complete.");

    await email.seed();
    console.debug("Seeding email Complete.");

    console.debug("Seeding Database Complete.");
  } catch (error) {
    console.error(`Error Seeding Database: ${error}`);
    process.exit(1);
  } finally {
    await pgClient.end();
    console.debug("Database Connection Closed.");
  }
}

// Make sure the function wait for the promise to complete
plant()
  .then(() => {
    console.info("Planting Finish");
    process.exit(0);
  })
  .catch((error) => {
    console.error(`Error Planting: ${error}`);
    process.exit(1);
  });
