import { useState } from 'react'
import { ReactComponent as Logo } from '../assets/images/logo-bookmark.svg'

import { ReactComponent as Hamburger } from '../assets/images/icon-hamburger.svg'
import { ReactComponent as Close } from '../assets/images/icon-close.svg'

import ButtonSm from './shared/ButtonSm'
import NavMobileMenu from './NavMobileMenu'

export default function Nav() {
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		if (!isOpen) {
			document.body.style.overflow = 'hidden'
			setIsOpen(true)
		} else {
			document.body.style.overflow = 'auto'
			setIsOpen(false)
		}
	}
	return (
		<nav className='navbar navbar-expand-lg navbar-light py-4'>
			<div className='container-lg'>
				<a href='#/' className='navbar-brand'>
					<Logo />
				</a>
				<button className='navbar-toggler' onClick={handleClick}>
					<div className='navbar-icon'>
						{isOpen ? <Close /> : <Hamburger />}
					</div>
				</button>
				<div className='collapse navbar-collapse justify-content-end'>
					<ul className='navbar-nav'>
						<li className='nav-item mt-1 mx-3'>
							<a className='nav-link' href='#/'>
								Features
							</a>
						</li>
						<li className='nav-item mt-1 mx-3'>
							<a className='nav-link' href='#/'>
								Pricing
							</a>
						</li>
						<li className='nav-item mt-1 mx-3'>
							<a className='nav-link' href='#/'>
								Contact
							</a>
						</li>
						<li className='nav-item mt-1 mx-3'>
							<ButtonSm bootstrap_class='nav-link' text='Login' />
						</li>
					</ul>
				</div>
				<div
					className={`${
						isOpen ? 'open' : ''
					} navbar-mobile-wrapper position-absolute d-flex flex-column`}
				>
					<NavMobileMenu handleClick={handleClick} />
				</div>
			</div>
		</nav>
	)
}
