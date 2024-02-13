import StarIcon from '../assets/images/icon-star.svg'
import Accordion from '../components/Accordion'

export const AccordionCard = () => {
	return (
		<section
			id='_faqAccordion'
			className='bg-white p-6 rounded-lg shadow-sm max-w-screen-md md:w-lvw'
		>
			<div className='accordion-header flex items-center space-x-7 w-full pb-6'>
				<img src={StarIcon} alt='star-icon' className='object-cover size-7' />
				<h1 className='text-4xl font-bold text-primaryDarkPurple'>FAQs</h1>
			</div>
			<Accordion />
		</section>
	)
}
