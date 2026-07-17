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

async function create({
  data,
}: {
  data: EmailCreate;
}): Promise<Email> {
  let emailData = await retrieveByEmail({
    email: data.email,
  });

  if (!emailData) {
    const createEmail = await drizzleClient
      .insert(emailTable)
      .values(data)
      .returning();

    return createEmail[0];
  } else {
    throw new Error("Email already exist.");
  }
}

export {
  create,
  retrieve,
  retrieveByEmail,
  retrieveById
};

