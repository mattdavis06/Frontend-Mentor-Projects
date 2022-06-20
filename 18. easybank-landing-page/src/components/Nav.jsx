import { useState } from 'react'
import Logo from '../assets/images/logo.svg'
import { ReactComponent as Hamburger } from '../assets/images/icon-hamburger.svg'
import { ReactComponent as Close } from '../assets/images/icon-close.svg'
import Button from './shared/Button'

function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-2">
      <div className="container-lg">
        <a href="#/" className="navbar-brand">
          <img src={Logo} alt="easybank-logo" />
        </a>
        <button className="navbar-toggler" onClick={handleToggle}>
          <div className="navbar-icon">
            {isOpen ? <Close /> : <Hamburger />}
          </div>
        </button>
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link mx-2" href="#/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2" href="#/">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2" href="#/">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2" href="#/">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2" href="#/">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div
          className={`navbar-mobile d-flex d-lg-none position-absolute bg-white ${
            isOpen ? 'open' : ''
          }`}
        >
          <ul className="navbar-nav w-100 py-4">
            <li className="nav-item py-1">
              <a className="nav-link mx-2" href="#/">
                Home
              </a>
            </li>
            <li className="nav-item pb-1">
              <a className="nav-link mx-2" href="#/">
                About
              </a>
            </li>
            <li className="nav-item pb-1">
              <a className="nav-link mx-2" href="#/">
                Contact
              </a>
            </li>
            <li className="nav-item pb-1">
              <a className="nav-link mx-2" href="#/">
                Blog
              </a>
            </li>
            <li className="nav-item pb-1">
              <a className="nav-link mx-2" href="#/">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <Button bootstrap_class="d-none d-lg-block" />
      </div>
    </nav>
  )
}

export default Nav
