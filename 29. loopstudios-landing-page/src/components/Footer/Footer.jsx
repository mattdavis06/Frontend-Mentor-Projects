import { navLinks } from '../../data/data'
import FooterSocials from './FooterSocials'
import CompanyLogo from '../../assets/images/logo.svg'

export default function Footer() {
	return (
		<footer className='w-screen bg-black py-8'>
			<div className='container px-10 md:px-0'>
				<div className='footer-section-one  flex flex-col items-center justify-between py-3 md:flex-row'>
					<div className='company-logo'>
						<object
							data={CompanyLogo}
							type='image/svg+xml'
							aria-labelledby='company-logo'
						></object>
					</div>
					<FooterSocials customClass={'hidden md:flex'} />
				</div>
				<div className='footer-section-two flex flex-col items-center justify-between py-3 md:flex-row'>
					<div className='footer-nav-links py-8 md:w-3/6 md:py-0 xl:w-2/6'>
						<ul className='flex flex-col items-center justify-between md:flex-row'>
							{navLinks.map((link) => {
								return (
									<li
										key={link.id}
										className='group/link relative py-3 font-primaryFont text-xl text-white md:py-0 md:text-base'
									>
										<a href='/*'>{link.linkItem}</a>
										<span className='absolute left-1/2 -bottom-0 hidden h-[2px] w-3/6 -translate-x-2/4 bg-white transition group-hover/link:flex md:-bottom-2.5'></span>
									</li>
								)
							})}
						</ul>
					</div>
					<FooterSocials customClass={'md:hidden py-3 md:py-0'} />
					<div className='footer-copywrite py-3 md:py-0'>
						<p className='font-primaryFont text-veryDarkGray'>
							&copy; {new Date().getFullYear()} Loopstudios. All rights
							reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
