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
import { hashPassword } from "~/server/authentication/password";

/**
 * Automatic Fixture
 */
const test = baseTest.extend<{}>({

});

describe("Drizzle User Test", () => {
  console.info("Test Drizzle User");

  const passwordSalt = "fe464db162ca7d501e3de3dd22cc534e";
  const borealisSalt = process.env.BOREALIS_SALT ?? "";

  describe.concurrent("Retrieve", () => {
    test("User Retrieve", async () => {
      console.info("Test Retrieve User");

      const retrieveData = await user.retrieve();

      // Validate Retrieve Type
      expect(retrieveData).toBeInstanceOf(Array);

      // Validate Retrieve Seed Data
      expect(retrieveData.length).toBeGreaterThanOrEqual(1);

      // Validate Retrieve Seed Data Content (Asymmetric Matcher)
      expect(retrieveData).toEqual(
        expect.arrayContaining(
          userList.map((item) => expect.objectContaining({
            username: item.username
          }))
        )
      );
    });
    test("User Retrieve Expand", async () => {
      console.info("Test Retrieve User Expand");

      const retrieveData = await user.retrieve({ expand: true });

      // Validate Retrieve Expand Type
      expect(retrieveData).toBeInstanceOf(Array);

      // Validate Retrieve Expand Seed Data
      expect(retrieveData.length).toBeGreaterThanOrEqual(1);

      // Validate Retrieve Relation Data
      for (const entry of retrieveData)
        expect(entry).toHaveProperty("profile");
    });
    test("User Retrieve By ID", async () => {
      console.info("Test Retrieve User By ID");

      const userData = {
        username: "createuser0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createData = await user.create({
        data: userData,
      });

      const retrieveData = await user.retrieveById({
        id: createData.id,
      });

      // Validate Retrieve By ID Type
      expect(retrieveData).toBeInstanceOf(Object);

      // Validate Retrieve By ID Data Content
      expect(retrieveData).toEqual(expect.objectContaining({
        id: createData.id,
        profileId: null,
        username: userData.username,
      }));
    });
  });
  describe.concurrent("Create", () => {
    test("Create User", async () => {
      console.info("Test Create User");

      const userData = {
        username: "createuser0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createData = await user.create({
        data: userData,
      });

      // Validate Create Type
      expect(createData).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createData).toEqual(expect.objectContaining({
        id: createData.id,
        profileId: null,
        username: userData.username,
      }));

      const deleteData = await user.deleteById({
        id: createData.id,
      });

      // Validate Delete Type
      expect(deleteData).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteData).toEqual(expect.objectContaining({
        id: createData.id,
        profileId: null,
        username: createData.username,
      }));
    });
  });
  describe.concurrent("Update", () => {
    test("Update User By ID", async () => {
      console.info("Test Update User By ID");

      const userData = {
        username: "createuser0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createData = await user.create({
        data: userData,
      });

      // Validate Create Type
      expect(createData).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createData).toEqual(expect.objectContaining({
        id: createData.id,
        profileId: null,
        username: userData.username,
      }));

      const updateData = await user.updateById({
        id: createData.id,
        data: {
          username: "updateuser0",
        },
      });

      // Validate Update Type
      expect(updateData).toBeInstanceOf(Object);

      // Validate Update Data Content
      expect(updateData).toEqual(expect.objectContaining({
        id: createData.id,
        profileId: null,
        username: "updateuser0",
      }));

      const deleteData = await user.deleteById({
        id: createData.id,
      });

      // Validate Delete Type
      expect(deleteData).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteData).toEqual(expect.objectContaining({
        id: createData.id,
        profileId: null,
        username: updateData?.username,
      }));
    });
  });
  describe.concurrent("Delete", () => {
    test("Delete User By ID", async () => {
      console.info("Test Delete User By ID");

      const userData = {
        username: "deleteuser0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createData = await user.create({
        data: userData,
      });

      // Validate Create Type
      expect(createData).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createData).toEqual(expect.objectContaining({
        id: createData.id,
        profileId: null,
        username: userData.username,
      }));

      const deleteData = await user.deleteById({
        id: createData.id,
      });

      // Validate Delete Type
      expect(deleteData).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteData).toEqual(expect.objectContaining({
        id: createData.id,
        profileId: null,
        username: createData.username,
      }));
    });
  });
});
