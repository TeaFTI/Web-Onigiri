/**
 * Register
 */

import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { isAPIError } from "better-auth/api";

// import * as session from "~/_drizzle/database/session.server";
import { auth } from "~/_betterauth/auth";
import * as user from "~/_drizzle/database/user.server";
import { generateSalt, hashPassword } from "./password";
import { registerSchema } from "./schema";
// import { readSessionToken } from "./session";

const registerFn = createServerFn({ method: "POST" })
  .validator(registerSchema)
  .handler(async ({ data }) => {
    try {
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
      console.debug("BETTER-AUTH User: ", betterauthUser);

      // Self Register
      const retrieveUser = await user.retrieveByUsername({ username: data.username });
      if (retrieveUser) {
        return { error: "Username is already taken. Please try another." };
      }

      // User
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

      const createUser = await user.create({ data: userData });
      console.debug("Create User: ", createUser);

      // Profile
    } catch (error) {
      // BETTER-AUTH Error
      if (isAPIError(error)) {
        console.error("BetterAuth Error Status: ", error.status);
        console.error("BetterAuth Error Message: ", error.message);
        return { error: error.message };
      }

      // General Error
      throw error;
    }

    // const sessionData = {
    //   userId: createUser.id,
    //   token: crypto.randomUUID(),
    //   expiration: new Date(Date.now() + SESSION_TTL_MS),
    // }

    // const createSession = await session.create({ data: sessionData });
    // setSessionCookie(createSession.token);
    throw redirect({ to: "/login" })
  });

// const getCurrentUserFn = createServerFn({ method: "GET" })
//   .handler(async () => {
//     const sessionToken = readSessionToken();
//     if (!sessionToken) return null;

//     // const sessionUser = await session.retrieveByToken({
//     //   token: sessionToken,
//     //   expand: true,
//     // });

//     // return sessionUser || null;
//   });

export {
  // getCurrentUserFn,
  registerFn
};
