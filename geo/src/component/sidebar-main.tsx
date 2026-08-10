import { Link } from "@tanstack/react-router";
import {
  ComputerIcon,
  LifeBuoyIcon,
  SendIcon,
  Server,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "~/_shadcn/component/interface/sidebar";

import { SidebarPrimary } from "./sidebar-primary";
import { SidebarUser } from "./sidebar-user";

const sidebarData = {
  sidebarPrimary: [
    {
      title: "Main",
      key: "main",
      group: [
        {
          title: "Dashboard",
          key: "dashboard",
          icon: (<ComputerIcon />),
          link: "/dashboard",
        },
        {
          title: "Accounting",
          key: "accounting",
          icon: (<ComputerIcon />),
          group: [
            {
              title: "Account",
              key: "account",
              link: "/account",
            }
          ]
        }
      ]
    },
    {
      title: "Advance",
      key: "advance",
      group: [
        {
          title: "Chart of Account",
          key: "chart-of-account",
          link: "/chart-of-account",
          icon: (<Server />),
        }
      ]
    }
  ],
  sidebarSecondary: [
    {
      title: "Support",
      key: "support",
      link: "#",
      icon: (<LifeBuoyIcon />),
    },
    {
      title: "Feedback",
      key: "feedback",
      link: "#",
      icon: (<SendIcon />),
    },
  ],
};

export function SidebarMain() {
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
        <SidebarPrimary itemList={sidebarData.sidebarPrimary} />
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
