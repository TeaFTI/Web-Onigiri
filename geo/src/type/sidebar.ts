/**
 * Sidebar Type
 */

type SidebarPrimaryItem = SidebarElement & {
  group: (SidebarElement & {
    active?: boolean;
    group?: SidebarElement[];
  })[];
};

type SidebarSecondaryItem = SidebarElement;

type SidebarElement = {
  title: string;
  key: string;
  link?: string;
  icon?: React.ReactNode;
}

export type {
  SidebarPrimaryItem,
  SidebarSecondaryItem
};

