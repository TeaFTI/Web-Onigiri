/**
 * drizzle User Test
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

describe("drizzle User Test", () => {
  console.info("Test drizzle User");

  const passwordSalt = "fe464db162ca7d501e3de3dd22cc534e";
  const borealisSalt = process.env.BOREALIS_SALT ?? "";

  /**
   * Retrieve
   */
  describe.concurrent("Retrieve", () => {
    test("User Retrieve", async () => {
      console.info("Test Retrieve User");

      const retrieveUser = await user.retrieve();

      // Validate Retrieve Type
      expect(retrieveUser).toBeInstanceOf(Array);

      // Validate Retrieve Seed Data
      expect(retrieveUser.length).toBeGreaterThanOrEqual(1);

      // Validate Retrieve Seed Data Content (Asymmetric Matcher)
      expect(retrieveUser).toEqual(
        expect.arrayContaining(
          userList.map((item) => expect.objectContaining({
            username: item.username
          }))
        )
      );
    });
    test("User Retrieve Expand", async () => {
      console.info("Test Retrieve User Expand");

      const retrieveUser = await user.retrieve({ expand: true });

      // Validate Retrieve Expand Type
      expect(retrieveUser).toBeInstanceOf(Array);

      // Validate Retrieve Expand Seed Data
      expect(retrieveUser.length).toBeGreaterThanOrEqual(1);

      // Validate Retrieve Relation Data
      for (const entry of retrieveUser)
        expect(entry).toHaveProperty("profile");
    });
    test("User Retrieve By ID", async () => {
      console.info("Test Retrieve User By ID");

      const userData = {
        username: "retrievebyid0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createUser = await user.create({ data: userData });

      const retrieveUser = await user.retrieveById({
        id: createUser.id,
      });

      // Validate Retrieve By ID Type
      expect(retrieveUser).toBeInstanceOf(Object);

      // Validate Retrieve By ID Data Content
      expect(retrieveUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: userData.username,
      }));

      const deleteUser = await user.deleteById({ id: createUser.id });

      // Validate Delete Type
      expect(deleteUser).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: createUser.username,
      }));
    });
    test("User Retrieve By ID Expand", async () => {
      console.info("Test Retrieve User By ID Expand");

      const userData = {
        username: "retrievebyidexpand0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createUser = await user.create({ data: userData });

      const retrieveUser = await user.retrieveById({
        id: createUser.id,
        expand: true,
      });

      // Validate Retrieve By ID Expand Type
      expect(retrieveUser).toBeInstanceOf(Object);

      // Validate Retrieve By ID Expand Data Content
      expect(retrieveUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: userData.username,
        profile: null,
      }));

      const deleteUser = await user.deleteById({ id: createUser.id });

      // Validate Delete Type
      expect(deleteUser).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: createUser.username,
      }));
    });
    test("User Retrieve By Username", async () => {
      console.info("Test Retrieve User By Username");

      const userData = {
        username: "retrievebyusername0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createUser = await user.create({ data: userData });

      const retrieveUser = await user.retrieveByUsername({
        username: createUser.username,
      });

      // Validate Retrieve By Username Type
      expect(retrieveUser).toBeInstanceOf(Object);

      // Validate Retrieve By Username Data Content
      expect(retrieveUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: userData.username,
      }));

      const deleteUser = await user.deleteById({ id: createUser.id });

      // Validate Delete Type
      expect(deleteUser).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: createUser.username,
      }));
    });
    test("User Retrieve By Username Expand", async () => {
      console.info("Test Retrieve User By Username Expand");

      const userData = {
        username: "retrievebyusernameexpand0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createUser = await user.create({ data: userData });

      const retrieveUser = await user.retrieveByUsername({
        username: createUser.username,
        expand: true,
      });

      // Validate Retrieve By Username Expand Type
      expect(retrieveUser).toBeInstanceOf(Object);

      // Validate Retrieve By Username Expand Data Content
      expect(retrieveUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: userData.username,
        profile: null,
      }));

      const deleteUser = await user.deleteById({ id: createUser.id });

      // Validate Delete Type
      expect(deleteUser).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: createUser.username,
      }));
    });
  });

  /**
   * Create
   */
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

      const createUser = await user.create({ data: userData });

      // Validate Create Type
      expect(createUser).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: userData.username,
      }));

      const deleteUser = await user.deleteById({ id: createUser.id });

      // Validate Delete Type
      expect(deleteUser).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: createUser.username,
      }));
    });
  });

  /**
   * Update
   */
  describe.concurrent("Update", () => {
    test("Update User By ID", async () => {
      console.info("Test Update User By ID");

      const userData = {
        username: "updateuser0",
        passwordHash: await hashPassword({
          password: "password",
          salt: passwordSalt + borealisSalt,
        }),
        salt: passwordSalt,
      }

      const createUser = await user.create({ data: userData });

      // Validate Create Type
      expect(createUser).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: userData.username,
      }));

      const updateUser = await user.updateById({
        id: createUser.id,
        data: { username: "updateuser1" },
      });

      // Validate Update Type
      expect(updateUser).toBeInstanceOf(Object);

      // Validate Update Data Content
      expect(updateUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: "updateuser1",
      }));

      const deleteUser = await user.deleteById({ id: createUser.id });

      // Validate Delete Type
      expect(deleteUser).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: updateUser?.username,
      }));
    });
  });

  /**
   * Delete
   */
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

      const createUser = await user.create({
        data: userData,
      });

      // Validate Create Type
      expect(createUser).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: userData.username,
      }));

      const deleteUser = await user.deleteById({ id: createUser.id });

      // Validate Delete Type
      expect(deleteUser).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteUser).toEqual(expect.objectContaining({
        id: createUser.id,
        profileId: null,
        username: createUser.username,
      }));
    });
  });
});
