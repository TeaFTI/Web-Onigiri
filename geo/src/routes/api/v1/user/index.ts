import { createFileRoute } from "@tanstack/react-router";

import * as user from "~/_drizzle/database/user.server";

export const Route = createFileRoute("/api/v1/user/")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return Response.json(await user.retrieve());
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve User data.", {
            status: 500,
          });
        }
      },
    }
  }
});
