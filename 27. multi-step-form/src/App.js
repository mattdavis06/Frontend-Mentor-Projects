import { StepTrackerProvider } from './context/StepTracker'
import Header from './components/Header'
import Aside from './components/Aside'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
	return (
		<StepTrackerProvider>
			<div className='grid h-screen w-screen items-end bg-alabaster'>
				<Header />
				<section
					id='multiStepForm'
					className='container z-10 mt-28 mb-8 flex h-fit w-11/12 max-w-[1440px] gap-4 place-self-center rounded-xl bg-white p-4 shadow-xl md:my-auto md:h-5/6 lg:h-3/4 lg:w-9/12'
				>
					<Aside />
					<Main />
				</section>
				<Footer />
			</div>
		</StepTrackerProvider>
	)
}

export default App
