/**
 * Root Layout
 */

import { Viewport } from 'next';

import reactArrayToTree from 'react-array-to-tree';

// Context
import BootstrapProvider from '@/context/BootstrapContext';

// CSS
import '@/style/global.scss';
import './root.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

const ProviderTree = reactArrayToTree([
  <BootstrapProvider children={undefined} />,
]);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <ProviderTree>
          {children}
        </ProviderTree>
      </body>
    </html>
  )
}
