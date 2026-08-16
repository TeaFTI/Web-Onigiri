/**
 * drizzle Profile Test
 */

import {
  test as baseTest,
  describe,
  expect
} from "vitest";

import * as profile from "~/_drizzle/database/profile.server";

/**
 * Automatic Fixture
 */
const test = baseTest.extend<{}>({

});

describe("drizzle Profile Test", () => {
  console.info("Test drizzle Profile");

  /**
   * Retrieve
   */
  describe.concurrent("Retrieve", () => {
    test("Profile Retrieve", async () => {
      console.info("Test Retrieve Profile");

      const retrieveProfile = await profile.retrieve();

      // Validate Retrieve Type
      expect(retrieveProfile).toBeInstanceOf(Array);

      // Validate Retrieve Seed Data
      expect(retrieveProfile.length).toBeGreaterThanOrEqual(1);
    });
    test("Profile Retrieve Expand", async () => {
      console.info("Test Retrieve Profile Expand");

      const retrieveProfile = await profile.retrieve({ expand: true });

      // Validate Retrieve Type
      expect(retrieveProfile).toBeInstanceOf(Array);

      // Validate Retrieve Seed Data
      expect(retrieveProfile.length).toBeGreaterThanOrEqual(1);

      // Validate Retrieve Relation Data
      for (const entry of retrieveProfile) {
        expect(entry).toHaveProperty("user");
        expect(entry).toHaveProperty("emailList");
      }
    });
    test("Profile Retrieve By ID", async () => {
      console.info("Test Retrieve Profile By ID");

      const profileData = {
        firstName: "retrievebyidfirstname0",
        lastName: "retrievebyidlastname0",
      };

      const createProfile = await profile.create({ data: profileData });

      const retrieveProfile = await profile.retrieveById({
        id: createProfile.id,
      });

      // Validate Retrieve Type
      expect(retrieveProfile).toBeInstanceOf(Object);

      // Validate Retrieve Data Content
      expect(retrieveProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }));

      const deleteProfile = await profile.deleteById({
        id: createProfile.id,
      });

      // Validate Delete Type
      expect(deleteProfile).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }));
    });
    test("Profile Retrieve By ID Expand", async () => {
      console.info("Test Retrieve Profile By ID Expand");

      const profileData = {
        firstName: "retrievebyidexpandfirstname0",
        lastName: "retrievebyidexpandlastname0",
      };

      const createProfile = await profile.create({ data: profileData });

      const retrieveProfile = await profile.retrieveById({
        id: createProfile.id,
        expand: true,
      });

      // Validate Retrieve Type
      expect(retrieveProfile).toBeInstanceOf(Object);

      // Validate Retrieve Data Content
      expect(retrieveProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }));

      // Validate Retrieve Relation Data
      expect(retrieveProfile).toHaveProperty("user");
      expect(retrieveProfile).toHaveProperty("emailList");

      const deleteProfile = await profile.deleteById({
        id: createProfile.id,
      });

      // Validate Delete Type
      expect(deleteProfile).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }));
    });
  });

  /**
   * Create
   */
  describe.concurrent("Create", () => {
    test("Create Profile", async () => {
      console.info("Test Create Profile");

      const profileData = {
        firstName: "createprofilefirstname0",
        lastName: "createprofilelastname0",
      };

      const createProfile = await profile.create({ data: profileData });

      // Validate Create Type
      expect(createProfile).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }));

      const deleteProfile = await profile.deleteById({
        id: createProfile.id,
      });

      // Validate Delete Type
      expect(deleteProfile).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }));
    });
  });

  /**
   * Update
   */
  describe.concurrent("Update", () => {
    test("Update Profile By ID", async () => {
      console.info("Test Update Profile By ID");

      const profileData = {
        firstName: "updatebyidfirstname0",
        lastName: "updatebyidlastname0",
      };

      const createProfile = await profile.create({ data: profileData });

      const updateProfileData = {
        firstName: "updatebyidfirstname1",
        lastName: "updatebyidlastname1",
      };

      const updateProfile = await profile.updateById({
        id: createProfile.id,
        data: updateProfileData,
      });

      // Validate Update Type
      expect(updateProfile).toBeInstanceOf(Object);

      // Validate Update Data Content
      expect(updateProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: updateProfileData.firstName,
        lastName: updateProfileData.lastName,
      }));

      const deleteProfile = await profile.deleteById({
        id: createProfile.id,
      });

      // Validate Delete Type
      expect(deleteProfile).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: updateProfileData.firstName,
        lastName: updateProfileData.lastName,
      }));
    });
  });

  /**
   * Delete
   */
  describe.concurrent("Delete", () => {
    test("Delete Profile By ID", async () => {
      console.info("Test Delete Profile By ID");

      const profileData = {
        firstName: "deleteprofilefirstname0",
        lastName: "deleteprofilelastname0",
      };

      const createProfile = await profile.create({ data: profileData });

      // Validate Create Type
      expect(createProfile).toBeInstanceOf(Object);

      // Validate Create Data Content
      expect(createProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }));

      const deleteProfile = await profile.deleteById({
        id: createProfile.id,
      });

      // Validate Delete Type
      expect(deleteProfile).toBeInstanceOf(Object);

      // Validate Delete Data Content
      expect(deleteProfile).toEqual(expect.objectContaining({
        id: createProfile.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }));
    });
  });
});
