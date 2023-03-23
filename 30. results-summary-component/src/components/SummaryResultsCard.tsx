import data from '../data/data.js'
import { DataTypes } from '../types/types'
import SummaryPill from './SummaryPill.js'
import Btn from './Btn'

export default function SummaryResultsCard() {
	return (
		<section
			id='summary-results-wrapper'
			className='w-full bg-neutral_White py-6 px-8 md:flex md:w-1/2 md:flex-col md:justify-center md:rounded-tr-3xl md:rounded-br-3xl'
		>
			<h3 className='mb-5 text-neutral_DarkGrayBlue md:text-xl md:font-semibold'>
				Summary
			</h3>
			<div className='summary-pill-wrapper flex w-full flex-col space-y-5'>
				{data.map((item: DataTypes) => {
					return (
						<SummaryPill
							key={item.key}
							category={item.category}
							score={item.score}
							icon={item.icon}
							backgroundColor={item.backgroundColor}
							textColor={item.textColor}
							borderColor={item.borderColor}
						/>
					)
				})}
			</div>
			<div className='summary-continue my-5'>
				<Btn
					btnText={'Continue'}
					btnBg={'bg-neutral_DarkGrayBlue'}
					btnBgOnHover={
						'hover:bg-gradient-to-b hover:from-gradient_CardTop hover:to-gradient_CardBottom'
					}
				/>
			</div>
		</section>
	)
}
