import { createFileRoute } from "@tanstack/react-router";

import * as user from "~/_drizzle/database/user.server";
import * as uuid from "~/server/uuid";

export const Route = createFileRoute("/api/v1/user/$id/expand")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await user.retrieveById({
              id: params.id,
              expand: true,
            }));
          } else {
            return Response.json(await user.retrieveByUsername({
              username: params.id,
              expand: true,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve User.", {
            status: 500,
          });
        }
      },
    },
  },
});
