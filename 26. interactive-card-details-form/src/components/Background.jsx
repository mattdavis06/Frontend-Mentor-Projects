import BgLeftDesktop from '../assets/images/bg-main-desktop.png'
import BgLeftMobile from '../assets/images/bg-main-mobile.png'

export default function Background() {
	return (
		<div className='bg-wrapper relative w-screen h-screen bg-white'>
			<div className='bg-left absolute top-0 left-0 h-1/3 w-full lg:h-screen lg:w-3/12'>
				<img
					src={BgLeftDesktop}
					alt='bg'
					className='hidden lg:block h-full w-full object-cover'
				/>
				<img
					src={BgLeftMobile}
					alt='bg'
					className='lg:hidden h-full w-full object-cover'
				/>
			</div>
		</div>
	)
}
