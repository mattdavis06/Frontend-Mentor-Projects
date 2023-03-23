import SummaryScoreCard from './components/SummaryScoreCard.js'
import SummaryResultsCard from './components/SummaryResultsCard.js'

function App() {
	return (
		<main className='grid md:h-screen md:w-screen md:place-content-center md:bg-neutral_PaleBlue'>
			<section
				id='summary-wrapper'
				className='bg-neutral_White md:flex md:h-[560px] md:w-[780px] md:rounded-3xl md:shadow-2xl lg:w-[820px]'
			>
				<SummaryScoreCard />
				<SummaryResultsCard />
			</section>
		</main>
	)
}

export default App
