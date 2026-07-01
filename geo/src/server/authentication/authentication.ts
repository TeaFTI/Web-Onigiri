/**
 * Authentication
 */

import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

// import * as session from "~/_drizzle/database/session.server";
import { auth } from "~/_betterauth/auth";
import * as user from "~/_drizzle/database/user.server";
import { generateSalt, hashPassword } from "./password";
import { registerSchema } from "./schema";
import { readSessionToken } from "./session";

const registerFn = createServerFn({ method: "POST" })
  .validator(registerSchema)
  .handler(async ({ data }) => {
    // BETTER-AUTH Register
    const betterauthUser = await auth.api.signUpEmail({
      body: {
        name: data.fullName,
        email: data.email,
        password: data.password,
        username: data.username,
        displayUsername: data.fullName,
      }
    });
    console.debug("BetterAuth User: ", betterauthUser);

    // Self Register
    const retrieveUser = await user.retrieveByUsername({ username: data.username });
    if (retrieveUser) {
      return { error: "User Already Exist." as const };
    }

    const userSalt = generateSalt();
    const geoSalt = process.env.GEO_SALT ?? "";
    const userData = {
      id: betterauthUser.user.id,
      name: data.fullName,
      email: data.email,
      username: data.username,
      passwordHash: await hashPassword(data.password, userSalt + geoSalt),
      salt: userSalt,
    }
    console.debug("User Data: ", userData);

    const createUser = await user.create({ data: userData });
    // console.debug("Create User: ", createUser);

    // const sessionData = {
    //   userId: createUser.id,
    //   token: crypto.randomUUID(),
    //   expiration: new Date(Date.now() + SESSION_TTL_MS),
    // }

    // const createSession = await session.create({ data: sessionData });
    // setSessionCookie(createSession.token);
    throw redirect({ to: "/main" })
  });

const getCurrentUserFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const sessionToken = readSessionToken();
    if (!sessionToken) return null;

    // const sessionUser = await session.retrieveByToken({
    //   token: sessionToken,
    //   expand: true,
    // });

    // return sessionUser || null;
  });

export {
  getCurrentUserFn,
  registerFn
};
