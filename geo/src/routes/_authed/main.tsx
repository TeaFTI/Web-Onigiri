/**
 * Main Route
 */

import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/_authed/main")({
  component: MainPage,
})

function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
    </div>
  );
};
