import { createFileRoute } from "@tanstack/react-router";

import * as user from "~/_drizzle/database/user.server";
import * as uuid from "~/server/uuid";

export const Route = createFileRoute("/api/v1/user/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await user.retrieveById({
              id: params.id,
            }));
          } else {
            return Response.json(await user.retrieveByUsername({
              username: params.id,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve User.", {
            status: 500,
          });
        }
      },
      PATCH: async ({ params, request }) => {
        try {
          const data = await request.json();
          if (uuid.isValid(params.id)) {
            return Response.json(await user.updateById({
              id: params.id,
              data: data,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to update User.", {
            status: 500,
          });
        }
      },
      DELETE: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await user.deleteById({
              id: params.id,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to delete User.", {
            status: 500,
          });
        }
      },
    }
  }
});
