import { Fragment } from 'react'
import { Header } from './components/shared/Header'
import { AccordionCard } from './components/AccordionCard'

function App() {
	return (
		<Fragment>
			<Header />
			<main className='absolute top-[20%] md:relative md:top-0 w-full md:grid md:place-content-center h-full px-6'>
				<AccordionCard />
			</main>
		</Fragment>
	)
}

export default App
