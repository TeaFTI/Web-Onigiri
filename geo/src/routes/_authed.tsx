import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentSessionFn } from "~/server/authentication/session";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ location }) => {
    const currentSession = await getCurrentSessionFn();
    console.debug("Current Session: ", currentSession);

    if (!currentSession) {
      throw redirect({
        to: "/login",
        // search: { redirect: location.href },
      })
    }
  },
})
