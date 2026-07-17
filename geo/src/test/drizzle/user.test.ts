/**
 * Drizzle User Test
 */

import {
  test as baseTest,
  describe,
  expect
} from "vitest";

import * as user from "~/_drizzle/database/user.server";
import userList from "~/_drizzle/seed/data/user.json";

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

      // Validate Type
      expect(data).toBeInstanceOf(Array);

      // Validate Seed Data
      expect(data.length).toBeGreaterThanOrEqual(1);

      // Validate Seed Data Content (Asymmetric Matcher)
      expect(data).toEqual(
        expect.arrayContaining(
          userList.map((item) => expect.objectContaining({
            username: item.username
          }))
        )
      );
    });
    test("Retrieve User Expand", async () => {
      console.info("Test Retrieve User Expand");

      const data = await user.retrieve({ expand: true });

      // Validate Type
      expect(data).toBeInstanceOf(Array);

      // Validate Seed Data
      expect(data.length).toBeGreaterThanOrEqual(1);

      // Validate Relation Data
      for (const entry of data) expect(entry).toHaveProperty("profile");
    });
  });
});
