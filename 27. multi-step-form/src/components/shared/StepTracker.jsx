import { useContext } from 'react'
import StepTrackerContext from '../../context/StepTracker'

export default function StepTracker() {
	const { stepTrackerPosition, setStepTrackerPosition, handleClick } =
		useContext(StepTrackerContext)

	const asideStepData = [
		{
			id: 1,
			stepTitle: 'Your Info',
		},
		{
			id: 2,
			stepTitle: 'Select Plan',
		},
		{
			id: 3,
			stepTitle: 'Add-Ons',
		},
		{
			id: 4,
			stepTitle: 'Summary',
		},
	]

	const handleStepIconClick = (stepId) => {
		if (stepId !== 1) {
			handleClick(stepId)
		} else {
			setStepTrackerPosition(stepId)
		}
	}

	return (
		<section
			id='step-tracker-wrapper'
			className='flex justify-center md:flex-col'
		>
			{asideStepData.map((step) => {
				return (
					<div
						className='step flex items-center py-3 px-3 md:px-0'
						key={step.id}
					>
						<div
							className={`step-number flex h-10 w-10  items-center justify-center rounded-full font-medium ${
								stepTrackerPosition === step.id
									? 'bg-lightBlue text-marineBlue'
									: 'border border-white text-white'
							} ${
								stepTrackerPosition === 5
									? 'cursor-not-allowed'
									: 'cursor-pointer'
							}`}
							onClick={
								stepTrackerPosition > 4
									? (e) => e.preventDefault()
									: () => handleStepIconClick(step.id)
							}
						>
							{step.id}
						</div>
						<div className='step-info hidden pl-5 md:block'>
							<small className='uppercase text-pastelBlue'>
								Step {step.id}
							</small>
							<h6 className='font-medium uppercase tracking-widest text-white'>
								{step.stepTitle}
							</h6>
						</div>
					</div>
				)
			})}
		</section>
	)
}
