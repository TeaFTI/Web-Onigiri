/**
 * Profile Page
 */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/profile/")({
  component: ProfileIndex,
})

function ProfileIndex() {
  return (
    <div>Hello Profile!</div>
  );
}
