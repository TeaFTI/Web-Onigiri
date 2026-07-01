/**
 * Login
 */

import { createServerFn } from "@tanstack/react-start";

import * as user from "~/_drizzle/database/user.server";
import { loginSchema } from "./schema";

const loginFn = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    try {
      const retrieveUser = await user.retrieveByUsername({ username: data.username });
    } catch (error) {
    }
  });
