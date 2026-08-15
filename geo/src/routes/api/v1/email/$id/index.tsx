import { createFileRoute } from "@tanstack/react-router";

import * as email from "~/_drizzle/database/email.server";
import * as uuid from "~/server/uuid";

export const Route = createFileRoute("/api/v1/email/$id/")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await email.retrieveById({
              id: params.id,
            }));
          } else {
            return Response.json(await email.retrieveByEmail({
              email: params.id,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to retrieve Email.", {
            status: 500,
          });
        }
      },
      PATCH: async ({ params, request }) => {
        try {
          const data = await request.json();
          if (uuid.isValid(params.id)) {
            return Response.json(await email.updateById({
              id: params.id,
              data: data,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to update Email.", {
            status: 500,
          });
        }
      },
      DELETE: async ({ params }) => {
        try {
          if (uuid.isValid(params.id)) {
            return Response.json(await email.deleteById({
              id: params.id,
            }));
          }
        } catch (error) {
          console.error("Error:", error);
          return new Response("Failed to delete Email.", {
            status: 500,
          });
        }
      },
    },
  },
})
