import { useState } from "react";
import { ReactComponent as Logo } from "../assets/images/logo-bookmark.svg";
import { ReactComponent as LogoMobileMenu } from "../assets/images/logo-bookmark-mobile-menu.svg";
import { ReactComponent as Hamburger } from "../assets/images/icon-hamburger.svg";
import { ReactComponent as Close } from "../assets/images/icon-close.svg";
import { ReactComponent as FbIcon } from "../assets/images/icon-facebook.svg";
import { ReactComponent as TwitterIcon } from "../assets/images/icon-twitter.svg";
import ButtonSm from "./shared/ButtonSm";

export default function Nav() {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		if (!isOpen) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	};
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
						isOpen ? "open" : ""
					} navbar-mobile-wrapper position-absolute d-flex flex-column`}
				>
					<div className='navbar-mobile d-flex justify-content-between'>
						<a href='#/' className='navbar-brand'>
							<LogoMobileMenu />
						</a>
						<button className='navbar-toggler' onClick={handleClick}>
							<div className='navbar-icon'>
								<Close />
							</div>
						</button>
					</div>
					<div className='navbar-mobile-items mb-auto'>
						<ul className='navbar-nav d-flex align-items-center'>
							<li className='nav-item-mobile py-4 w-100 text-center'>
								<a className='nav-link-mobile' href='#/'>
									Features
								</a>
							</li>
							<li className='nav-item-mobile py-4 w-100 text-center'>
								<a className='nav-link-mobile' href='#/'>
									Pricing
								</a>
							</li>
							<li className='nav-item-mobile py-4 w-100 text-center'>
								<a className='nav-link-mobile' href='#/'>
									Contact
								</a>
							</li>
							<li className='nav-item-mobile py-4 w-100'>
								<ButtonSm
									bootstrap_class='btn-white-outline w-100 h-25'
									text='Login'
								/>
							</li>
						</ul>
					</div>
					<div className='navbar-social-icons d-flex align-items-center justify-content-center m-5'>
						<div className='icon fb mx-4'>
							<a href='#/'>
								<FbIcon />
							</a>
						</div>
						<div className='icon twitter mx-4'>
							<a href='#/'>
								<TwitterIcon />
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
