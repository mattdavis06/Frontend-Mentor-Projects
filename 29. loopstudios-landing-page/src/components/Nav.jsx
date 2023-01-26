import { useState } from 'react'
import { navLinks } from '../data/data'
import CompanyLogo from '../assets/images/logo.svg'
import BurgerMenu from '../assets/images/icon-hamburger.svg'
import CloseIcon from '../assets/images/icon-close.svg'

export default function Nav() {
	const [isNavOpen, setIsNavOpen] = useState(false)

	return (
		<nav className='flex items-center justify-between py-10 md:py-16'>
			<div className='company-logo'>
				<object
					data={CompanyLogo}
					type='image/svg+xml'
					aria-labelledby='company-logo'
				></object>
			</div>
			<div className='nav-links hidden md:block md:w-3/6 xl:w-2/6'>
				<ul className=' flex items-center justify-between'>
					{navLinks.map((link) => {
						return (
							<li
								key={link.id}
								className='group/link relative font-primaryFont text-white'
							>
								<a href='/*'>{link.linkItem}</a>
								<span className='absolute left-1/2 -bottom-2.5 hidden h-[2px] w-3/6 -translate-x-2/4 bg-white transition group-hover/link:flex'></span>
							</li>
						)
					})}
				</ul>
			</div>
			<div
				className='nav-links-icon cursor-pointer md:hidden'
				onClick={() => setIsNavOpen(!isNavOpen)}
			>
				<img src={BurgerMenu} alt='nav-menu-icon' />
			</div>
			<div
				className={`nav-links-mobile-wrapper fixed top-0 left-0 z-10 flex h-full w-full bg-black py-10  transition-transform duration-500 md:hidden ${
					isNavOpen ? '-translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='container px-10'>
					<div className='flex items-center justify-between'>
						<div className='company-logo'>
							<object
								data={CompanyLogo}
								type='image/svg+xml'
								aria-labelledby='company-logo'
							></object>
						</div>
						<div
							className='nav-links-close-icon cursor-pointer'
							onClick={() => setIsNavOpen(!isNavOpen)}
						>
							<img src={CloseIcon} alt='nav-menu-icon' className='h-[25px]' />
						</div>
					</div>
					<div className='nav-links-mobile mt-[50%]'>
						<ul>
							{navLinks.map((link) => {
								return (
									<li key={link.id} className='my-8'>
										<a
											href='/*'
											className='text-[2rem] font-thin uppercase text-white hover:text-veryDarkGray sm:text-[3rem]'
										>
											{link.linkItem}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	)
}
