/**
 * Login Page
 */

import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className='text-center'>
      <Image src='/res/img/onigiri-1.svg' alt='Onigiri Logo' width={128} height={128} />
      <h1>Please Login</h1>
      <form>
        <section className='text-center'>
          <Link href='/main' className='btn btn-primary btn-lg'>Login</Link>
        </section>
      </form>
    </main>
  );
}
