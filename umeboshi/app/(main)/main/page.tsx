/**
 * Main Page
 */

import type { Metadata } from 'next';

const CURRENT_PAGE = 'Main'

export const metadata: Metadata = {
  title: `Onigiri | ${CURRENT_PAGE}`,
  description: `Onigiri ${CURRENT_PAGE}`,
}

export default function Page() {
  return (
    <div className='container-fluid bd-gutter mt-3 my-md-4 bd-layout'>
      <main className='m-3'>
        <h1>Main Page</h1>
      </main>
    </div>
  );
}
