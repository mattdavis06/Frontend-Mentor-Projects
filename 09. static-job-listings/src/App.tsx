import { JobListingProvider } from './context/JobListingContext'
import Header from './components/Header'
import { JobCardList } from './components/JobCardList'

function App() {
	return (
		<div className='w-full bg-backgroundColor'>
			<JobListingProvider>
				<Header />

				<main className='my-28 mx-6'>
					<section
						id='_jobListingWrapper'
						className='space-y-16 py-4 lg:space-y-6 lg:py-0'
					>
						<JobCardList />
					</section>
				</main>
			</JobListingProvider>
		</div>
	)
}

export default App
