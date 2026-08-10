/**
 * Main Layout (_authed)
 */

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { Separator } from "~/_shadcn/component/interface/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/_shadcn/component/interface/sidebar";
import { SidebarMain } from "~/component/sidebar-main";
import { getCurrentSessionFn } from "~/server/authentication/session";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ location }) => {
    const currentSession = await getCurrentSessionFn();
    // console.debug("Current Session: ", currentSession);

    if (!currentSession) {
      throw redirect({
        to: "/login",
        // search: { redirect: location.href },
      })
    }

    return { currentSession };
  },
  component: MainLayout,
})

function MainLayout() {
  return (
    <div>
      <SidebarProvider>
        <SidebarMain />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
