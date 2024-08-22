/**
 * Login Page
 */

import Image from 'next/image';

export default function Page() {
  return (
    <main className='container-login d-flex align-items-center w-100 h-100 mx-auto' style={{ padding: '5em' }}>
      <form className='w-100 text-center'>
        <Image src='/res/img/onigiri-1.svg' alt='Onigiri Logo' className='mb-3' width={128} height={128} />
        <div className='form-floating mb-3'>
          <input id='loginUsername' className='form-control' type='text' placeholder='Username' autoFocus />
            <label htmlFor='loginUsername'>Username</label>
        </div>
        <div className='form-floating mb-3'>
          <input id='loginPassword' className='form-control' type='text' placeholder='Password' />
            <label htmlFor='loginPassword'>Password</label>
        </div>
      </form>
    </main>
  );
}
