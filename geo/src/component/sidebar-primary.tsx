import { Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/_shadcn/component/interface/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "~/_shadcn/component/interface/sidebar";
import type { SidebarPrimaryItem } from "~/type/sidebar";

export function SidebarPrimary({
  itemList,
}: {
  itemList: SidebarPrimaryItem[],
}) {
  return (
    itemList.map((item) => (
      <SidebarGroup key={item.key}>
        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
        <SidebarMenu>
          {item.group.map((groupItem) => (
            <Collapsible
              key={groupItem.title}
              defaultOpen={groupItem.active}
              render={<SidebarMenuItem />}
            >
              <SidebarMenuButton
                tooltip={groupItem.title}
                render={<Link to={groupItem.link} />}
              >
                {groupItem.icon}
                <span>{groupItem.title}</span>
              </SidebarMenuButton>
              {groupItem.group?.length ? (
                <>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuAction className="aria-expanded:rotate-90" />
                    }
                  >
                    <ChevronRightIcon />
                    <span className="sr-only">Toggle</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {groupItem.group.map((subGroupItem) => (
                        <SidebarMenuSubItem key={subGroupItem.title}>
                          <SidebarMenuSubButton render={<Link to={subGroupItem.link} />}>
                            <span>{subGroupItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    ))
  );
};
