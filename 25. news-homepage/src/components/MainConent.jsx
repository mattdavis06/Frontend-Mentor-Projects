import MainImgDesktop from '../assets/images/image-web-3-desktop.jpg'
import MainImgMobile from '../assets/images/image-web-3-mobile.jpg'
import Button from './shared/Button'

export default function MainConent() {
	return (
		<main className='col-span-1 row-span-1 lg:col-span-2 lg:row-span-2'>
			<div className='main-inner-1 row-span-1 col-span-1 lg:col-span-2 h-auto lg:h-3/6'>
				<img
					src={MainImgDesktop}
					alt='web-3-graphic'
					className='h-full w-full object-cover hidden md:block'
				/>
				<img
					src={MainImgMobile}
					alt='web-3-graphic'
					className='h-full w-full object-cover block md:hidden'
				/>
			</div>
			<div className='main-inner-2 row-span-1 col-span-1 lg:col-span-2 h-auto lg:h-3/6 flex flex-col md:flex-row pt-5 gap-4 lg:gap-0'>
				<div className='main-heading w-full md:w-1/2 h-full'>
					<h1 className='text-7xl md:text-6xl lg:text-7xl font-extrabold subpixel-antialiased text-veryDarkBlue'>
						The Bright <br /> Future of <br /> Web 3.0?
					</h1>
				</div>
				<div className='main-text h-full w-full md:w-1/2 flex flex-col px-0 md:px-2'>
					<p className='text-lg lg:text-xl text-grayishBlue'>
						We dive into the next evolution of the web that claims to put the
						power of the platforms back into the hands of the people. But is it
						really fulfilling its promise?
					</p>
					<Button
						btnStyles={'text-offWhite bg-primaryRed hover:bg-veryDarkBlue'}
						btnText={'Read More'}
					/>
				</div>
			</div>
		</main>
	)
}
