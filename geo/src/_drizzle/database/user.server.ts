import { eq } from "drizzle-orm";

import { drizzleClient } from "../client";
import {
  UserBasic,
  UserCreate,
  userTable,
  UserUpdate,
} from "../schema/user";

/**
 * Retrieve and return the list of user(s).
 *
 * @param {boolean} expand - Whether to expand the user data with
 * related profile data.
 * @returns {Promise<UserBasic[]>} A promise that resolve to an array of
 * UserBasic object(s).
 */
async function retrieve({
  expand = false,
}: {
  expand?: boolean;
} = {}): Promise<UserBasic[]> {
  return await drizzleClient.query.userTable.findMany({
    columns: {
      id: true,
      profileId: true,
      username: true,
    },
    with: expand ? {
      profile: true,
    } : undefined,
  });
}

/**
 * Retrieve and return a user with the given Universally Unique
 * IDentifier (UUID).
 *
 * @param {string} id - The UUID of the user.
 * @param {boolean} expand - Whether to expand the user data with
 * related profile data.
 * @returns {Promise<UserBasic | undefined>} A promise that resolve to a
 * UserBasic object or undefined.
 */
async function retrieveById({
  id,
  expand = false,
}: {
  id: string;
  expand?: boolean;
}): Promise<UserBasic | undefined> {
  return await drizzleClient.query.userTable.findFirst({
    columns: {
      id: true,
      profileId: true,
      username: true,
    },
    where: { id: id },
    with: expand ? {
      profile: true,
    } : undefined,
  });
}

/**
 * Retrieve and return a user with the given username.
 *
 * @param {string} username - The username of the user.
 * @param {boolean} expand - Whether to expand the user data with
 * related profile data.
 * @returns {Promise<UserBasic | undefined>} A promise that resolve to a
 * UserBasic object or undefined.
 */
async function retrieveByUsername({
  username,
  expand = false,
}: {
  username: string;
  expand?: boolean;
}): Promise<UserBasic | undefined> {
  return await drizzleClient.query.userTable.findFirst({
    columns: {
      id: true,
      profileId: true,
      username: true,
    },
    where: { username: username },
    with: expand ? {
      profile: true,
    } : undefined,
  });
}

/**
 * Create and return a new user with the given data.
 *
 * @param {UserCreate} data - The data to create the user.
 * @returns {Promise<UserBasic>} A promise that resolve to a UserBasic
 * object.
 */
async function create({
  data,
}: {
  data: UserCreate;
}): Promise<UserBasic> {
  const createUser = await drizzleClient
    .insert(userTable)
    .values(data)
    .returning({
      id: userTable.id,
      profileId: userTable.profileId,
      username: userTable.username,
    });

  return createUser[0];
}

/**
 * Update and return a user with the given Universally Unique
 * IDentifier (UUID) and data.
 *
 * @param {string} id - The UUID of the user.
 * @param {UserUpdate} data - The data to update the user.
 * @returns {Promise<UserBasic | undefined>} A promise that resolve to a
 * UserBasic object or undefined.
 */
async function updateById({
  id,
  data,
}: {
  id: string;
  data: UserUpdate;
}): Promise<UserBasic | undefined> {
  const updateUser = await drizzleClient
    .update(userTable)
    .set(data)
    .where(eq(userTable.id, id))
    .returning({
      id: userTable.id,
      profileId: userTable.profileId,
      username: userTable.username,
    });

  return updateUser[0];
}

/**
 * Delete and return a user with the given Universally Unique
 * IDentifier (UUID).
 *
 * @param {string} id - The UUID of the user.
 * @returns {Promise<UserBasic | undefined>} A promise that resolve to a
 * UserBasic object or undefined.
 */
async function deleteById({
  id,
}: {
  id: string;
}): Promise<UserBasic | undefined> {
  const deleteUser = await drizzleClient
    .delete(userTable)
    .where(eq(userTable.id, id))
    .returning({
      id: userTable.id,
      profileId: userTable.profileId,
      username: userTable.username,
    });

  return deleteUser[0];
}

export {
  create,
  deleteById,
  retrieve,
  retrieveById,
  retrieveByUsername,
  updateById
};

