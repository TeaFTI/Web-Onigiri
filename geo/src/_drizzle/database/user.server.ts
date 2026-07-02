import { drizzleClient } from "../client";
import { User, UserCreate, userTable } from "../schema/user";

/**
 * Retrieve and return the list of user(s).
 *
 * @returns {Promise<User[]>} A promise that resolve to an array of
 * User object(s).
 */
async function retrieve({
  expand = false,
}: {
  expand?: boolean;
} = {}): Promise<User[]> {
  return await drizzleClient.query.userTable.findMany({
    with: expand ? {
      profile: true,
    } : undefined,
  });
}

/**
 * Retrieve and return a user with the given Universally Unique
 * IDentifier (UUID).
 *
 * @returns {Promise<User | undefined>} A promise that resolve to a
 * User object or undefined.
 */
async function retrieveById({
  id,
}: {
  id: string;
}): Promise<User | undefined> {
  return await drizzleClient.query.userTable.findFirst({
    where: { id: id },
  });
}

/**
 * Retrieve and return a user with the given username.
 *
 * @returns {Promise<User | undefined>} A promise that resolve to a
 * User object or undefined.
 */
async function retrieveByUsername({
  username,
}: {
  username: string;
}): Promise<User | undefined> {
  return await drizzleClient.query.userTable.findFirst({
    where: { username: username },
  });
}

/**
 * Create and return a new user with the given data.
 *
 * @param {UserCreate} data - The data to create the user.
 * @returns {Promise<User>} A promise that resolve to a User object.
 */
async function create({
  data,
}: {
  data: UserCreate;
}): Promise<User> {
  let userData = await retrieveByUsername({
    username: data.username,
  });

  if (!userData) {
    const createUser = await drizzleClient
      .insert(userTable)
      .values(data)
      .returning();

    return createUser[0];
  } else {
    throw new Error("User already exist.");
  }
}

export {
  create,
  retrieve,
  retrieveById,
  retrieveByUsername
};

