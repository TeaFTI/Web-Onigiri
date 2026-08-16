import { createFileRoute } from "@tanstack/react-router";

import * as profile from "~/_drizzle/database/profile.server";
import * as uuid from "~/server/uuid";

export const Route = createFileRoute("/api/v1/profile/$id/")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await profile.retrieveById({
              id: params.id,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve Profile.", {
            status: 500,
          });
        }
      },
      PATCH: async ({ params, request }) => {
        try {
          const data = await request.json();
          if (uuid.isValid(params.id)) {
            return Response.json(await profile.updateById({
              id: params.id,
              data: data,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to update Profile.", {
            status: 500,
          });
        }
      },
      DELETE: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await profile.deleteById({
              id: params.id,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to delete Profile.", {
            status: 500,
          });
        }
      },
    },
  },
});
