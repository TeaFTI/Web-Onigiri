import { createFileRoute } from "@tanstack/react-router";

import * as profile from "~/_drizzle/database/profile.server";
import * as uuid from "~/server/uuid";

export const Route = createFileRoute("/api/v1/profile/$id/expand")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await profile.retrieveById({
              id: params.id,
              expand: true,
            }));
          }
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
