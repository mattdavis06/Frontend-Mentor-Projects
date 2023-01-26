import Button from './shared/Button'

export default function SectionTwo() {
	return (
		<section id='sectionTwo' className='container my-16 px-10 md:px-0'>
			<div className='section-wrapper flex items-center justify-center md:justify-between'>
				<h3 className='font-secondaryFont text-5xl uppercase text-black'>
					Our Creations
				</h3>
				<Button customClass={'hidden md:flex'} btnText={'See All'} />
			</div>
		</section>
	)
}
