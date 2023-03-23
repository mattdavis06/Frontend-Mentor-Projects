export default function SummaryScoreCard() {
	return (
		<section
			id='summary-score-wrapper'
			className='flex w-full flex-col items-center justify-between rounded-b-[2.5rem] bg-gradient-to-b from-gradient_CardTop to-gradient_CardBottom px-8 pt-5 pb-10 md:w-1/2 md:rounded-3xl md:px-20 md:py-10'
		>
			<h1 className='text-xl text-neutral_LightLavender md:text-2xl'>
				Your Result
			</h1>
			<div className='results-circle my-6 flex h-[150px] w-[150px] flex-col items-center justify-center rounded-full bg-gradient-to-b from-gradient_CircleTop to-gradient_CircleBottom md:h-[210px] md:w-[210px]'>
				<h2 className='py-2 text-6xl font-semibold text-neutral_White md:text-7xl'>
					76
				</h2>
				<small className='text-base text-neutral_LightLavender md:text-xl'>
					of 100
				</small>
			</div>
			<div className='result-text pt-6 text-center md:pt-0'>
				<h3 className='pb-3 text-3xl text-neutral_White'>Great</h3>
				<p className='text-medium text-neutral_LightLavender'>
					You scored higher than 65% of the <br className='md:hidden' />
					people who have taken these tests.
				</p>
			</div>
		</section>
	)
}
