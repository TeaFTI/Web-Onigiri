import { createFileRoute } from "@tanstack/react-router";

import * as email from "~/_drizzle/database/email.server";

export const Route = createFileRoute("/api/v1/email/expand")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          return Response.json(await email.retrieve({ expand: true }));
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve Email.", {
            status: 500,
          });
        }
      }
    }
  }
})
