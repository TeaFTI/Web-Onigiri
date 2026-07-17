import { createFileRoute } from "@tanstack/react-router";

import * as email from "~/_drizzle/database/email.server";

export const Route = createFileRoute("/api/v1/email/")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return Response.json(await email.retrieve());
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve Email data.", {
            status: 500,
          });
        }
      },
      POST: async ({ request }) => {
        try {
          const data = await request.json();
          return Response.json(await email.create({ data: data }));
        } catch (error) {
          console.error("Error:", error);
          return new Response(
            "Failed to create Email.",
            { status: 500 }
          );
        }
      },
    }
  }
});
