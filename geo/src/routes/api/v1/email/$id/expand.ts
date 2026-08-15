import { createFileRoute } from "@tanstack/react-router";

import * as email from "~/_drizzle/database/email.server";
import * as uuid from "~/server/uuid";

export const Route = createFileRoute("/api/v1/email/$id/expand")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await email.retrieveById({
              id: params.id,
              expand: true,
            }));
          } else {
            return Response.json(await email.retrieveByEmail({
              email: params.id,
              expand: true,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve Email.", {
            status: 500,
          });
        }
      },
    },
  },
});
