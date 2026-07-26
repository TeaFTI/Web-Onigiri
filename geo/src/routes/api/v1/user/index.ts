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
          return new Response("Failed to retrieve User.", {
            status: 500,
          });
        }
      },
      POST: async ({ request }) => {
        try {
          const data = await request.json();
          return new Response(
            JSON.stringify(await user.create({ data: data })),
            { status: 201 }
          );
        } catch (error) {
          console.error("Error:", error);
          return new Response(
            "Failed to create User.", { status: 500 }
          );
        }
      },
    }
  }
});
