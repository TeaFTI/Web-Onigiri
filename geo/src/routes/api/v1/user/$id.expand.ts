import { createFileRoute } from "@tanstack/react-router";

import * as user from "~/_drizzle/database/user.server";

export const Route = createFileRoute("/api/v1/user/$id/expand")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          return Response.json(await user.retrieveById({
            id: params.id,
            expand: true,
          }));
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve User data.", {
            status: 500,
          });
        }
      }
    }
  }
});
