import { useContext } from 'react'
import StepTrackerContext from '../context/StepTracker'
import Button from './shared/Buttons'

export default function Footer() {
	const { stepTrackerPosition } = useContext(StepTrackerContext)

	if (stepTrackerPosition !== 5) {
		return (
			<footer className=' bg-white p-4 shadow-footerShadow md:hidden'>
				<Button customClass={'px-4'} />
			</footer>
		)
	}
}
