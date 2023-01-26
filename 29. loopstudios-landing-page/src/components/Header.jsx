import HeroImgDesktop from '../assets/images/desktop/image-hero.jpg'
import HeroImgMobile from '../assets/images/mobile/image-hero.jpg'
import Nav from './Nav'

export default function Header() {
	return (
		<header className='relative w-screen'>
			<img
				src={HeroImgDesktop}
				alt='hero'
				className='hidden w-screen object-cover mix-blend-darken md:block'
			/>
			<img
				src={HeroImgMobile}
				alt='hero'
				className='w-screen object-cover md:hidden'
			/>
			<div className='hero-overlay absolute top-0 left-0 h-full w-full bg-black/50'></div>
			<div className='absolute top-0 left-0 h-full w-full'>
				<div className='container h-full px-10 md:px-0'>
					<Nav />
					<div className='hero-content my-28 sm:my-96 md:my-0 lg:my-0 xl:my-6'>
						<div className='w-full border-2 border-white p-7 md:w-fit md:py-7 md:px-14'>
							<h1 className='font-secondaryFont text-[2rem] font-light uppercase tracking-widest text-white md:text-5xl lg:text-[5rem] xl:text-6xl'>
								Immersive <br /> experiences <br /> that
								<br className='md:hidden' /> deliver
							</h1>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
