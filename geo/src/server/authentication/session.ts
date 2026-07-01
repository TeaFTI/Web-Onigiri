/**
 * Session
 *
 * Session for TanStack Start authentication.
 */

// import crypto from "crypto";

import { createServerFn } from "@tanstack/react-start";
import {
  // getRequestHeader,
  // setResponseHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";

import { auth } from "~/_betterauth/auth";

const SESSION_SIZE = 512;
const SESSION_COOKIE = "__Host-session";
const ONE_DAY = 60 * 60 * 24;

/**
 * Generate a random session token for the user session.
 *
 * @param sessionSize - The size of the session token in bytes.
 * @returns {string} The generated session token.
 */
// function generateSessionToken({
//   sessionSize = SESSION_SIZE,
// }: {
//   sessionSize?: number;
// }): string {
//   return crypto.randomBytes(sessionSize).toString("hex").normalize();
// }

// function setSessionCookie(token: string) {
//   setResponseHeader(
//     "Set-Cookie",
//     [
//       `${SESSION_COOKIE}=${token}`,
//       "HttpOnly",
//       "Secure",
//       "SameSite=Lax",
//       "Path=/",
//       `Max-Age=${ONE_DAY}`,
//     ].join("; ")
//   );
// }

// function clearSessionCookie() {
//   setResponseHeader(
//     "Set-Cookie",
//     `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
//   );
// }

// function readSessionToken(): string | null {
//   const cookieHeader = getRequestHeader("cookie");

//   if (!cookieHeader) return null;

//   for (const part of cookieHeader.split(/;\s*/)) {
//     // Split only on the FIRST '=' - signed/base64 values often contain '='.
//     const eq = part.indexOf("=");
//     if (eq === -1) continue;
//     if (part.slice(0, eq) === SESSION_COOKIE) return part.slice(eq + 1);
//   }

//   return null;
// }

const getCurrentSessionFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await auth.api.getSession({ headers: getRequestHeaders() });
  })

export {
  // clearSessionCookie,
  // generateSessionToken,
  getCurrentSessionFn
};

