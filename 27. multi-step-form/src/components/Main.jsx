import { useContext } from 'react'
import StepTrackerContext from '../context/StepTracker'
import MainInfo from './MainInfo'
import MainPlans from './MainPlans'
import MainAddOns from './MainAddOns'
import MainSummary from './MainSummary'
import MainThankYou from './MainThankYou'

export default function Main() {
	const { stepTrackerPosition } = useContext(StepTrackerContext)

	return (
		<main className='h-full w-full px-2 py-8 sm:px-4 lg:px-10 xl:px-24'>
			{stepTrackerPosition === 1 ? (
				<MainInfo />
			) : stepTrackerPosition === 2 ? (
				<MainPlans />
			) : stepTrackerPosition === 3 ? (
				<MainAddOns />
			) : stepTrackerPosition === 4 ? (
				<MainSummary />
			) : (
				<MainThankYou />
			)}
		</main>
	)
}
