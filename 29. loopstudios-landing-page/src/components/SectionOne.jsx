import ImgDesktop from '../assets/images/desktop/image-interactive.jpg'
import ImgMobile from '../assets/images/mobile/image-interactive.jpg'

export default function SectionOne() {
	return (
		<section
			id='sectionOne'
			className='container relative my-32 flex flex-col px-10 md:px-0 lg:flex-row'
		>
			<div className='section-img-wrapper h-full lg:w-1/2 xl:ml-24 2xl:ml-32'>
				<img
					src={ImgDesktop}
					alt=''
					className='hidden h-full w-full object-cover md:block'
				/>
				<img
					src={ImgMobile}
					alt=''
					className='h-full w-full object-cover md:hidden'
				/>
			</div>
			<div className='section-content-wrapper bottom-0 w-full bg-white pt-28 lg:absolute lg:left-[50%] lg:w-1/2 lg:px-16 lg:pt-16 xl:left-[42.5%] xl:px-28 xl:pt-28'>
				<h2 className='mb-10 w-full text-center font-secondaryFont text-5xl uppercase text-black lg:text-left'>
					The leader in <br /> interactive VR
				</h2>
				<p className='text-center font-primaryFont leading-7 text-darkGray lg:text-left'>
					Founded in 2011, Loopstudios has been producing world-class virtual
					reality projects for some of the best companies around the globe. Our
					award-winning creations have transformed businesses through digital
					experiences that bind to their brand.
				</p>
			</div>
		</section>
	)
}
