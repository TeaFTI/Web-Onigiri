import { createFileRoute, Link } from "@tanstack/react-router";

import { GalleryVerticalEndIcon } from "lucide-react";

import { RegisterForm } from "~/component/register-form";


export const Route = createFileRoute("/register")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div>
          Geo
        </Link>
        <RegisterForm />
      </div>
    </div >
  );
}
