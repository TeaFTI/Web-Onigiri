/**
 * Navigation
 */

import Image from 'next/image';
import Link from 'next/link';

import GithubIcon from 'bootstrap-icons/icons/github.svg';
import ListIcon from 'bootstrap-icons/icons/list.svg';

import './Navigation.scss';

export default function NavigationAlpha({ page }: { page: string }) {
  return (
    <header className='navbar navbar-expand-lg sticky-top'>
      <nav className='container-fluid align-items-center' aria-label='Main Navigation'>
        <div className='d-lg-none' style={{ width: '4.25rem' }}></div>
        {/* Brand */}
        <a className='navbar-brand' href="/" aria-label="Borealis">
          <Image className='me-2' src='/res/img/adobe-logo.svg' alt='Adobe Logo' width={32} height={32} role='brand' />
          Borealis
        </a>
        {/* Menu */}
        <div id="NavigationBar" className='offcanvas-lg offcanvas-end flex-grow-1' tabIndex={-1} aria-labelledby='NavigationOffcanvasLabel' data-bs-scroll='true'>
          <div className='offcanvas-header px-4 pb-0'>
            <h5 id='NavigationOffcanvasLabel' className='offcanvas-title text-white'>Borealis</h5>
            <button className='btn-close btn-close-white' type='button' aria-label='Close' data-bs-dismiss='offcanvas' data-bs-target='#NavigationBar'></button>
          </div>
          <div className='offcanvas-body p-4 pt-0 p-lg-0'>
            <hr className='d-lg-none text-white-50' />
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                {page === '/main'
                  ? <Link className='nav-link active' aria-current='page' href='/main'>Main</Link>
                  : <Link className='nav-link' href='/main'>Home</Link>
                }
              </li>
              <li className='nav-item'>
                {page === '/asset'
                  ? <Link className='nav-link active' aria-current='page' href='/asset'>Asset</Link>
                  : <Link className='nav-link' href='/asset'>Asset</Link>
                }
              </li>
            </ul>
            <hr className='d-lg-none text-white-50' />
            <ul className='navbar-nav flex-row flex-wrap'>
              <li className='nav-item '>
                <a className="nav-link py-2 px-0 px-lg-2" href="https://github.com/twbs" target="_blank" rel="noopener">
                  <GithubIcon className='binavbar-nav-svg' width='1em' role='icon' />
                  <small className="d-lg-none ms-2 align-middle">GitHub</small>
                </a>
              </li>
              <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                <hr className="d-lg-none my-2 text-white-50" />
              </li>
              <li className='nav-item'>
                <a className="nav-link py-2 px-0 px-lg-2" href="https://github.com/twbs" target="_blank" rel="noopener">
                  <GithubIcon className='binavbar-nav-svg' width='1em' role='icon' />
                  <small className="d-lg-none ms-2 align-middle">GitHub</small>
                </a>
              </li>
              <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                <hr className="d-lg-none my-2 text-white-50" />
              </li>
            </ul>
          </div>
        </div>
        {/* Right */}
        <div className='d-flex align-items-center'>
          {/* Toggle */}
          <button className='navbar-toggler d-lg-none p-2 ms-auto me-2' type='button' data-bs-target='#NavigationBar' data-bs-toggle='offcanvas' aria-controls='NavigationBar' aria-label='Toggle Navigation'>
            <ListIcon className='bi' width='1.5em' aria-hidden='true' />
          </button>
          {/* Profile */}
          <div className='dropdown'>
            <a href='#' className='d-block link-body-emphasis text-decoration-none dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
              <Image className='rounded-circle' src='https://github.com/mdo.png' alt='Name' width={32} height={32} />
            </a>
            <ul className='dropdown-menu dropdown-menu-end'>
              <li><a className='dropdown-item' href='#'>New project...</a></li>
              <li><a className="dropdown-item" href='#'>Settings</a></li>
              <li><a className="dropdown-item" href='#'>Profile</a></li>
              <li><hr className='dropdown-divider' /></li>
              <li><a className='dropdown-item' href='#'>Sign out</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
