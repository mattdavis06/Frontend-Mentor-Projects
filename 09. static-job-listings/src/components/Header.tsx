import DesktopBg from '../assets/images/bg-header-desktop.svg'
import MobileBg from '../assets/images/bg-header-mobile.svg'
import JobListingFilter from './JobListingFilter'

export default function Header() {
	return (
		<>
			<header className='w-full overflow-hidden bg-primaryColor sm:max-h-[156px]'>
				<img
					src={DesktopBg}
					alt='header-background'
					className='hidden h-[156px] w-full sm:block'
				/>
				<img
					src={MobileBg}
					alt='header-background'
					className='h-[156px] w-full sm:hidden'
				/>
			</header>
			<div className='relative mx-6'>
				<JobListingFilter />
			</div>
		</>
	)
}
