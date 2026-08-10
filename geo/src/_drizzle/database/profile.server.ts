import { drizzleClient } from "../client";
import { Profile } from "../schema/profile";

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
    } : undefined,
  });
};

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
    } : undefined,
  });
};

export {
  retrieve,
  retrieveById
};
