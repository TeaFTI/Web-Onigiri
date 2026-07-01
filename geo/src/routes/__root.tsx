/**
 * Root
 */

/// <reference types="vite/client" />

import type { ReactNode } from "react";

import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { Toaster } from "~/_shadcn/interface/sonner";
import { siteConfiguration } from "~/configuration/site";
import { ThemeProvider } from "~/context/theme";

// import globalCss from "../res/css/global.css?url";
import "../res/css/global.css";


export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: siteConfiguration.name,
      },
    ],
    links: [
      // { rel: "stylesheet", href: globalCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  notFoundComponent: NotFoundComponent,
  // shellComponent: RootDocument,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function ProviderComponent({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      {children}
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ProviderComponent>
          {children}
        </ProviderComponent>
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundComponent() {
  return <p>404 — Page not found</p>
}
