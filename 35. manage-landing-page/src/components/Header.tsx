import { useEffect, useState } from 'react'
import getCMSData from '../lib/getCMSData'
import BurgerIcon from '../assets/images/icon-hamburger.svg'
import CloseIcon from '../assets/images/icon-close.svg'
import Btn from './shared/Btn'

type NavItem = {
	id: string
	navItemLink: string
	navItemText: string[]
}

type NavCtaBtn = {
	linkText: string
	linkUrl: string
}

type NavTypes = {
	companyLogo: {
		url: string
	}
	navItem: NavItem[]
	id: string
	navCtaBtn: NavCtaBtn
}

export default function Header() {
	const [navOpen, setNavOpen] = useState(false)
	const [navCMSData, setNavCMSData] = useState<NavTypes | null>(null)
	const fetchQuery = `	
	{
	  navSections {
		  id
		  companyLogo {
			url
		  }
		  navItem {
			... on NavItem {
			  id
			  navItemLink
			  navItemText
			}
		  }
		  navCtaBtn {
			linkText
			linkUrl
		  }
		}
	}
  `
	useEffect(() => {
		// Disable Scroll when mobile nav menu is open
		const body = document.body

		if (navOpen) {
			body.classList.remove('overflow-y-auto')
			body.classList.add('overflow-y-hidden')
		} else {
			body.classList.remove('overflow-y-hidden')
			body.classList.add('overflow-y-auto')
		}
	}, [navOpen])

	useEffect(() => {
		getCMSData(fetchQuery).then((data) => {
			setNavCMSData({ ...data.navSections[0] })
		})
	}, [fetchQuery])

	return (
		<header className='app-wrapper'>
			<nav className='flex items-center justify-between'>
				<div className='brand-logo'>
					{navCMSData && (
						<img src={navCMSData.companyLogo.url} alt='manage-logo' />
					)}
				</div>
				{/* Desktop Nav Items */}
				<div className='desktop-nav-links hidden md:block'>
					<ul className='flex space-x-5'>
						{navCMSData &&
							navCMSData.navItem.map((item: NavItem) => {
								return (
									<li
										key={item.id}
										className='text-primaryBlue transition-colors hover:text-primaryBlue/70'
									>
										<a href={`/${item.navItemLink}`}>{item.navItemText[0]}</a>
									</li>
								)
							})}
					</ul>
				</div>
				{/* Mobile Nav Items */}
				<div
					className={`mobile-nav-links ${
						navOpen ? 'top-0' : '-top-[150%]'
					} absolute left-0 h-screen w-full bg-gradient-to-t from-black/60 to-black/10 transition-all duration-500`}
				>
					<div
						className={`mx-6 ${
							navOpen ? 'mt-28' : '-mt-[250%]'
						} flex max-w-md flex-col items-center rounded-sm bg-white p-8 text-center text-lg font-semibold shadow-lg transition-all delay-300 duration-300 sm:mx-auto`}
					>
						<ul className='space-y-8'>
							{navCMSData &&
								navCMSData.navItem.map((item: NavItem) => {
									return (
										<li
											key={item.id}
											className='text-primaryBlue transition-colors hover:text-primaryBlue/70'
										>
											<a href={`/${item.navItemLink}`}>{item.navItemText[0]}</a>
										</li>
									)
								})}
						</ul>
					</div>
				</div>
				<div className='nav-cta hidden md:block'>
					{navCMSData && (
						<Btn
							bgColor={'bg-primaryRed'}
							textColor={'text-white'}
							btnText={navCMSData.navCtaBtn.linkText}
							btnLink={navCMSData.navCtaBtn.linkUrl}
						/>
					)}
				</div>
				<div
					className='mobile-nav-icon z-10 cursor-pointer md:hidden'
					onClick={() => setNavOpen(!navOpen)}
				>
					{!navOpen ? (
						<img src={BurgerIcon} alt='burger-icon' />
					) : (
						<img src={CloseIcon} alt='close-icon' />
					)}
				</div>
			</nav>
		</header>
	)
}
