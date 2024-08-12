/**
 * Login Layout
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onigiri | Login',
  description: 'Onigiri | Login',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='d-flex justify-content-center align-items-center flex-grow-1'>
      {children}
    </div>
  );
}
