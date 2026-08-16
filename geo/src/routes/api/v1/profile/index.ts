import { createFileRoute } from "@tanstack/react-router";

import * as profile from "~/_drizzle/database/profile.server";

export const Route = createFileRoute("/api/v1/profile/")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return Response.json(await profile.retrieve());
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve Profile data.", {
            status: 500,
          });
        }
      },
    },
  },
});
