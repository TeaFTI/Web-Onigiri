import { eq } from "drizzle-orm";

import { drizzleClient } from "../client";
import { Email, EmailCreate, emailTable } from "../schema/email";

/**
 * Retrieve and return the list of email(s).
 *
 * @param {boolean} expand - Whether to expand the email data with
 * related profile data.
 * @returns {Promise<Email[]>} A promise that resolve to an array of
 * Email object(s).
 */
async function retrieve({
  expand = false
}: {
  expand?: boolean
} = {}): Promise<Email[]> {
  return await drizzleClient.query.emailTable.findMany({
    with: expand ? {
      profileList: true,
    } : undefined,
  });
}

/**
 * Retrieve and return an email with the given Universally Unique
 * IDentifier (UUID).
 *
 * @param {string} id - The UUID of the email.
 * @returns {Promise<Email | undefined>} A promise that resolve to a
 * Email object or undefined.
 */
async function retrieveById({
  id,
  expand = false
}: {
  id: string;
  expand?: boolean
}): Promise<Email | undefined> {
  return await drizzleClient.query.emailTable.findFirst({
    where: { id: id },
    with: expand ? {
      profileList: true,
    } : undefined,
  });
}

/**
 * Retrieve and return an email with the given email address.
 *
 * @param {string} email - The email address.
 * @param {boolean} expand - Whether to expand the email data with
 * related profile data.
 * @returns {Promise<Email | undefined>} A promise that resolve to a
 * Email object or undefined.
 */
async function retrieveByEmail({
  email,
  expand = false
}: {
  email: string;
  expand?: boolean
}): Promise<Email | undefined> {
  return await drizzleClient.query.emailTable.findFirst({
    where: { email: email },
    with: expand ? {
      profileList: true,
    } : undefined,
  });
}

/**
 * Create and return a new email with the given data.
 *
 * @param {EmailCreate} data - The data to create the new email.
 * @returns {Promise<Email>} A promise that resolve to an Email object.
 */
async function create({
  data,
}: {
  data: EmailCreate;
}): Promise<Email> {
  const createEmail = await drizzleClient
    .insert(emailTable)
    .values(data)
    .returning();

  return createEmail[0];
}

/**
 * Update and return an email with the given Universally Unique
 * IDentifier (UUID) and data.
 *
 * @param {string} id - The UUID of the email.
 * @param {Partial<EmailCreate>} data - The data to update the email.
 * @returns {Promise<Email | undefined>} A promise that resolve to an
 * Email object or undefined.
 */
async function updateById({
  id,
  data,
}: {
  id: string;
  data: Partial<EmailCreate>;
}): Promise<Email | undefined> {
  const updateEmail = await drizzleClient
    .update(emailTable)
    .set(data)
    .where(eq(emailTable.id, id))
    .returning();

  return updateEmail[0];
}

/**
 * Delete and return an email with the given Universally Unique
 * IDentifier (UUID).
 *
 * @param {string} id - The UUID of the email.
 * @returns {Promise<Email | undefined>} A promise that resolve to an
 * Email object or undefined.
 */
async function deleteById({
  id,
}: {
  id: string;
}): Promise<Email | undefined> {
  const deleteEmail = await drizzleClient
    .delete(emailTable)
    .where(eq(emailTable.id, id))
    .returning();

  return deleteEmail[0];
}

export {
  create,
  deleteById,
  retrieve,
  retrieveByEmail,
  retrieveById,
  updateById
};

