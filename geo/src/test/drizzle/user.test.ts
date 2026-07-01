/**
 * Drizzle User Test
 */

import {
  test as baseTest,
  describe
} from "vitest";

import * as user from "~/_drizzle/database/user.server";

/**
 * Automatic Fixture
 */
const test = baseTest.extend<{}>({

});

describe("Drizzle User Test", () => {
  console.info("Test Drizzle User");

  describe.concurrent("Retrieve", () => {
    test("Retrieve User", async () => {
      console.info("Test Retrieve User");

      const data = await user.retrieve();
      console.debug("User List:", data);
    });
  });
});
