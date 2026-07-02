/**
 * Logout
 */

import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { isAPIError } from "better-auth/api";

import { auth } from "~/_betterauth/auth";

const logoutFn = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      const response = await auth.api.signOut({
        headers: await getRequestHeaders()
      });
      console.debug("BETTER-AUTH Logout Response: ", response);
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

    throw redirect({ to: "/login" })
  });

export {
  logoutFn
};
