import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { AccordionType, accordionData } from '@/data/accordionData'

export default function AccordionDemo() {
	return (
		<Accordion type='single' collapsible className='w-full'>
			{accordionData.map((item: AccordionType) => {
				return (
					<AccordionItem value={`item-${item.id}`} key={item.id}>
						<AccordionTrigger className='font-semibold text-primaryDarkPurple text-lg hover:no-underline text-balance hover:text-primaryBrightPink focus-visible:ring-primaryBrightPink  focus-visible:ring-2 focus:ring-offset-2 focus-visible:ring-offset-2 focus-within:outline-none'>
							{item.accordionHeading}
						</AccordionTrigger>
						<AccordionContent className='text-base font-medium text-primaryGrayPurple'>
							{item.accodionContent}
						</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}
