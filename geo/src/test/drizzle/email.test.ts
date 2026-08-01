/**
 * drizzle Email Test
 */

import {
  test as baseTest,
  describe,
  expect
} from "vitest";

import * as email from "~/_drizzle/database/email.server";

/**
 * Automatic Fixture
 */
const test = baseTest.extend<{}>({

});

describe("drizzle Email Test", () => {
  console.info("Test drizzle Email");

  /**
   * Retrieve
   */
  describe.concurrent("Retrieve", () => {
    test("Email Retrieve", async () => {
      console.info("Test Retrieve Email");

      const retrieveEmail = await email.retrieve();

      // Validate Retrieve Type
      expect(retrieveEmail).toBeInstanceOf(Array);

      // Validate Retrieve Seed Data
      expect(retrieveEmail.length).toBeGreaterThanOrEqual(1);
    });
    test("Email Retrieve Expand", async () => {
      console.info("Test Retrieve Email Expand");

      const retrieveEmail = await email.retrieve({ expand: true });

      // Validate Retrieve Type
      expect(retrieveEmail).toBeInstanceOf(Array);

      // Validate Retrieve Seed Data
      expect(retrieveEmail.length).toBeGreaterThanOrEqual(1);

      // Validate Retrieve Relation Data
      for (const entry of retrieveEmail)
        expect(entry).toHaveProperty("profileList");
    });
    test("Email Retrieve By ID", async () => {
      console.info("Test Retrieve Email By ID");

      const emailData = {
        email: "retrievebyid0@localhost.lcl",
      };

      const createEmail = await email.create({ data: emailData });

      const retrieveEmail = await email.retrieveById({
        id: createEmail.id
      });

      // Validate Retrieve By ID Type
      expect(retrieveEmail).toBeInstanceOf(Object);

      // Validate Retrieve By ID Data Content
      expect(retrieveEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: emailData.email,
      }));

      const deleteEmail = await email.deleteById({
        id: createEmail.id,
      });

      // Validate Delete Type
      expect(deleteEmail).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: createEmail.email,
      }));
    });
    test("Email Retrieve By ID Expand", async () => {
      console.info("Test Retrieve Email By ID Expand");

      const emailData = {
        email: "retrievebyidexpand0@localhost.lcl",
      };

      const createEmail = await email.create({ data: emailData });

      const retrieveEmail = await email.retrieveById({
        id: createEmail.id,
        expand: true
      });

      // Validate Retrieve By ID Type
      expect(retrieveEmail).toBeInstanceOf(Object);

      // Validate Retrieve By ID Data Content
      expect(retrieveEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: emailData.email,
        profileList: expect.any(Array),
      }));

      const deleteEmail = await email.deleteById({
        id: createEmail.id,
      });

      // Validate Delete Type
      expect(deleteEmail).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: createEmail.email,
      }));
    });
    test("Email Retrieve By Email", async () => {
      console.info("Test Retrieve Email By Email");

      const emailData = {
        email: "retrievebyemail0@localhost.lcl",
      };

      const createEmail = await email.create({ data: emailData });

      const retrieveEmail = await email.retrieveByEmail({
        email: createEmail.email,
      });

      // Validate Retrieve By Email Type
      expect(retrieveEmail).toBeInstanceOf(Object);

      // Validate Retrieve By Email Data Content
      expect(retrieveEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: emailData.email,
      }));

      const deleteEmail = await email.deleteById({
        id: createEmail.id,
      });

      // Validate Delete Type
      expect(deleteEmail).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: createEmail.email,
      }));
    });
    test("Email Retrieve By Email Expand", async () => {
      console.info("Test Retrieve Email By Email Expand");

      const emailData = {
        email: "retrievebyemailexpand0@localhost.lcl",
      };

      const createEmail = await email.create({ data: emailData });

      const retrieveEmail = await email.retrieveByEmail({
        email: createEmail.email,
        expand: true,
      });

      // Validate Retrieve By Email Expand Type
      expect(retrieveEmail).toBeInstanceOf(Object);

      // Validate Retrieve By Email Expand Data Content
      expect(retrieveEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: emailData.email,
        profileList: expect.any(Array),
      }));

      const deleteEmail = await email.deleteById({
        id: createEmail.id,
      });

      // Validate Delete Type
      expect(deleteEmail).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: createEmail.email,
      }));
    });
  });

  /**
   * Create
   */
  describe.concurrent("Create", () => {
    test("Create Email", async () => {
      console.info("Test Create Email");

      const emailData = {
        email: "createemail0@localhost.lcl",
      };

      const createEmail = await email.create({ data: emailData });

      // Validate Create Type
      expect(createEmail).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: emailData.email,
      }));

      const deleteEmail = await email.deleteById({
        id: createEmail.id,
      });

      // Validate Delete Type
      expect(deleteEmail).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: createEmail.email,
      }));
    });
  });

  /**
   * Update
   */
  describe.concurrent("Update", () => {
    test("Update Email By ID", async () => {
      console.info("Test Update Email By ID");

      const emailData = {
        email: "updateemail0@localhost.lcl",
      };

      const createEmail = await email.create({ data: emailData });

      // Validate Create Type
      expect(createEmail).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: emailData.email,
      }));

      const updateEmail = await email.updateById({
        id: createEmail.id,
        data: { email: "updateemail1@localhost.lcl" },
      });

      // Validate Update Type
      expect(updateEmail).toBeInstanceOf(Object);

      // Validate Update Data Content
      expect(updateEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: "updateemail1@localhost.lcl",
      }));

      const deleteEmail = await email.deleteById({
        id: createEmail.id,
      });

      // Validate Delete Type
      expect(deleteEmail).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: updateEmail?.email,
      }));
    });
  });

  /**
   * Delete
   */
  describe.concurrent("Delete", () => {
    test("Delete Email By ID", async () => {
      console.info("Test Delete Email By ID");

      const emailData = {
        email: "deleteemail0@localhost.lcl",
      };

      const createEmail = await email.create({ data: emailData });

      // Validate Create Type
      expect(createEmail).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: emailData.email,
      }));

      const deleteEmail = await email.deleteById({
        id: createEmail.id,
      });

      // Validate Delete Type
      expect(deleteEmail).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteEmail).toEqual(expect.objectContaining({
        id: createEmail.id,
        email: createEmail.email,
      }));
    });
  });
});
