import {
  createFileRoute
} from "@tanstack/react-router";

import { SidebarProvider } from "~/_shadcn/interface/sidebar";
import { MainSidebar } from "~/component/main-sidebar";

export const Route = createFileRoute("/_authed/main")({
  component: Main,
})

function Main() {
  return (
    <div>
      <SidebarProvider>
        <MainSidebar />
      </SidebarProvider>
    </div>
  );
};
