/**
 * Login Layout
 */

import type { Metadata } from 'next';

// Style
import './login.scss';

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
    <div className='h-100'>
      {children}
    </div>
  );
}
