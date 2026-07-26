import { createFileRoute } from "@tanstack/react-router";

import * as user from "~/_drizzle/database/user.server";

export const Route = createFileRoute("/api/v1/user/expand")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          return Response.json(await user.retrieve({ expand: true }));
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve User.", {
            status: 500,
          });
        }
      }
    }
  }
});
