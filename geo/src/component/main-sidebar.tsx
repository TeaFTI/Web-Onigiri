import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "~/_shadcn/component/interface/sidebar";
import { MainSidebarUser } from "./main-sidebar-user";

export function MainSidebar() {
  return (
    <Sidebar variant="inset">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <img src="/res/img/geo.svg" alt="Geo" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Geo</span>
                <span className="truncate text-xs">Finance</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Primary</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter>
        <MainSidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
