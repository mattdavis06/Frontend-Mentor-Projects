import { creationsGridItems } from '../data/data'
import Button from './shared/Button'

export default function SectionThree() {
	return (
		<section
			id='sectionThree'
			className='container relative my-24 px-10 md:px-0'
		>
			<div className='grid grid-cols-1 gap-7 md:grid-cols-2 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 lg:gap-10'>
				{creationsGridItems.map((item) => {
					return (
						<div className='grid-item relative' key={item.id}>
							<img
								src={item.gridItemImg_d}
								alt={`${item.gridItemText.replace(' ', '-').toLowerCase()}-img`}
								className='hidden w-full object-cover md:block'
							/>
							<img
								src={item.gridItemImg_m}
								alt={`${item.gridItemText.replace(' ', '-').toLowerCase()}-img`}
								className='w-full object-cover md:hidden'
							/>
							<div className='group absolute top-0 left-0 flex h-full w-full cursor-pointer items-end bg-black/20  px-4 py-2 transition hover:bg-white/70 sm:p-6 md:px-10 lg:p-6 xl:px-10 xl:py-8'>
								<h4
									className='font-secondaryFont text-2xl uppercase text-white transition group-hover:text-black sm:text-3xl md:text-4xl xl:w-[85%]'
									onClick={() => console.log(item.gridItemText.length)}
								>
									{item.gridItemText}
								</h4>
							</div>
						</div>
					)
				})}
			</div>
			<div className='section-three-cta my-8 flex items-center justify-center'>
				<Button customClass={'md:hidden'} btnText={'See All'} />
			</div>
		</section>
	)
}
