import MobileHeader from '../../assets/images/background-pattern-mobile.svg'
import DesktopHeader from '../../assets/images/background-pattern-desktop.svg'

export const Header = () => {
	return (
		<header>
			<div className='md:absolute md:top-0 md:left-0 md:w-full'>
				<img
					src={MobileHeader}
					alt='header-bg'
					className='object-cover h-full w-full block md:hidden'
				/>
				<img
					src={DesktopHeader}
					alt='header-bg'
					className='object-cover h-full w-full hidden md:block lg:max-h-[30rem]'
				/>
			</div>
		</header>
	)
}
