import { eq } from "drizzle-orm";

import { drizzleClient } from "../client";
import { Profile, ProfileCreate, profileTable } from "../schema/profile";

/**
 * Retrieve and return the list of profile(s).
 *
 * @param {boolean} expand - Whether to expand the profile data with
 * related data.
 * @returns {Promise<Profile[]>} A promise that resolve to an array of
 * Profile object(s).
 */
async function retrieve({
  expand = false,
}: {
  expand?: boolean;
} = {}): Promise<Profile[]> {
  return await drizzleClient.query.profileTable.findMany({
    with: expand ? {
      user: true,
      emailList: true,
    } : undefined,
  });
};

/**
 * Retrieve and return a profile with the given Universally Unique
 * IDentifier (UUID).
 *
 * @param {string} id - The UUID of the profile.
 * @returns {Promise<Profile | undefined>} A promise that resolve to a
 * Profile object or undefined.
 */
async function retrieveById({
  id,
  expand = false,
}: {
  id: string;
  expand?: boolean;
}): Promise<Profile | undefined> {
  return await drizzleClient.query.profileTable.findFirst({
    where: { id: id },
    with: expand ? {
      user: true,
      emailList: true,
    } : undefined,
  });
};

/**
 * Create and return a new profile with the given data.
 *
 * @param {ProfileCreate} data - The data to create the new profile.
 * @returns {Promise<Profile>} A promise that resolve to a Profile
 * object.
 */
async function create({
  data,
}: {
  data: ProfileCreate;
}): Promise<Profile> {
  const createProfile = await drizzleClient
    .insert(profileTable)
    .values(data)
    .returning();

  return createProfile[0];
}

/**
 * Update and return a profile with the given Universally Unique
 * IDentifier (UUID) and data.
 *
 * @param {string} id - The UUID of the profile.
 * @param {Partial<ProfileCreate>} data - The data to update the
 * profile.
 * @returns {Promise<Profile | undefined>} A promise that resolve to a
 * Profile object or undefined.
 */
async function updateById({
  id,
  data,
}: {
  id: string;
  data: Partial<ProfileCreate>;
}): Promise<Profile | undefined> {
  const updateProfile = await drizzleClient
    .update(profileTable)
    .set(data)
    .where(eq(profileTable.id, id))
    .returning();

  return updateProfile[0];
}

/**
 * Delete and return a profile with the given Universally Unique
 * IDentifier (UUID).
 *
 * @param {string} id - The UUID of the profile.
 * @returns {Promise<Profile | undefined>} A promise that resolve to a
 * Profile object or undefined.
 */
async function deleteById({
  id,
}: {
  id: string;
}): Promise<Profile | undefined> {
  const deleteProfile = await drizzleClient
    .delete(profileTable)
    .where(eq(profileTable.id, id))
    .returning();

  return deleteProfile[0];
}

export {
  create,
  deleteById,
  retrieve,
  retrieveById,
  updateById
};

