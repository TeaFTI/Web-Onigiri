import { createFileRoute } from "@tanstack/react-router";

import * as profile from "~/_drizzle/database/profile.server";

export const Route = createFileRoute("/api/v1/profile/expand")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          return Response.json(await profile.retrieve({ expand: true }));
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve Profile.", {
            status: 500,
          });
        }
      },
    },
  },
})
