/**
 * Main Layout
 */

'use client';

import { usePathname } from "next/navigation";

// Component
import Navigation from "@/component/Header/Navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  // Get the `currentPath` for the `Navigation` component
  const currentPath = usePathname();

  return (
    // <div className='d-flex flex-column h-100'>
    <>
      <Navigation page={currentPath} />
      {children}
    </>
    // </div>
  );
};
