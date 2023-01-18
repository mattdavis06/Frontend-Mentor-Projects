import { useContext } from 'react'
import StepTrackerContext from '../../context/StepTracker'

export default function Buttons({ customClass }) {
	const { handleClick, stepTrackerPosition } = useContext(StepTrackerContext)

	return (
		<div className='main-info-form-next-step mt-auto flex'>
			{stepTrackerPosition !== 1 && (
				<div
					className={`btn btn-back ${customClass}`}
					onClick={() => handleClick(stepTrackerPosition - 1)}
				>
					Go Back
				</div>
			)}

			<div
				className={`btn btn-next ml-auto ${customClass} ${
					stepTrackerPosition === 4 &&
					'bg-purplishBlue transition hover:bg-pastelBlue'
				}`}
				onClick={() => handleClick(stepTrackerPosition + 1)}
			>
				{stepTrackerPosition !== 4 ? 'Next Step' : 'Confirm'}
			</div>
		</div>
	)
}
