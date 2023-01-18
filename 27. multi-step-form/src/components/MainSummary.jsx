import { useContext } from 'react'
import StepTrackerContext from '../context/StepTracker'
import Buttons from './shared/Buttons'

export default function MainSummary() {
	const { setStepTrackerPosition, selectedPlanAndOptions, isChecked } =
		useContext(StepTrackerContext)

	const calculateTotalPrices = (selectedPlanAndOptions) => {
		let monthTotals = parseFloat(
			selectedPlanAndOptions.monthlyPrice.replace('$', '')
		)
		selectedPlanAndOptions.addOns.forEach((addOn) => {
			monthTotals += parseFloat(addOn.addOnMonthPrice.replace('$', ''))
		})

		let yearTotals = parseFloat(
			selectedPlanAndOptions.yearlyPrice.replace('$', '')
		)
		selectedPlanAndOptions.addOns.forEach((addOn) => {
			yearTotals += parseFloat(addOn.addOnYearPrice.replace('$', ''))
		})
		return { monthTotals, yearTotals }
	}

	return (
		<section
			id='main-summary'
			className='mx-auto flex h-full w-full max-w-xl flex-col lg:py-4'
		>
			<div className='main-addons-header'>
				<h1 className='mb-3 text-4xl font-bold text-marineBlue'>
					Finishing up
				</h1>
				<p className='text-lg text-coolGray'>
					Double-check everything looks OK before confirming.
				</p>
			</div>
			<div className='main-smmary-wrapper my-10 w-full rounded bg-alabaster px-8 py-6 md:my-6 md:py-4 '>
				<div className='summary flex items-center justify-between'>
					<div className='summary-plan '>
						<h2 className='text-lg font-medium text-marineBlue'>
							{selectedPlanAndOptions.plan}
							{isChecked ? '(Yearly)' : '(Monthly)'}
						</h2>
						<div
							onClick={() => setStepTrackerPosition(2)}
							className='cursor-pointer text-base text-coolGray underline underline-offset-4 transition hover:text-purplishBlue'
						>
							Change
						</div>
					</div>
					<div className='summary-price'>
						<p className='text-lg font-medium text-marineBlue'>
							{isChecked
								? selectedPlanAndOptions.yearlyPrice
								: selectedPlanAndOptions.monthlyPrice}
						</p>
					</div>
				</div>
				<hr className='mt-8 mb-3 border-coolGray/30' />
				<div className='summary-options-and-addons'>
					{selectedPlanAndOptions.addOns.map((addOn) => {
						return (
							<div
								key={addOn.id}
								className='addon flex items-center justify-between py-2'
							>
								<h3 className='text-coolGray'>{addOn.addOnTitle}</h3>
								<p className='text-marineBlue'>
									{isChecked ? addOn.addOnYearPrice : addOn.addOnMonthPrice}
								</p>
							</div>
						)
					})}
				</div>
			</div>
			<div className='summary-total flex items-center justify-between px-8'>
				<p className='text-coolGray'>
					Total{isChecked ? '(Yearly)' : '(Monthly)'}
				</p>
				<h4 className='text-2xl font-bold text-purplishBlue'>
					{isChecked
						? `$${calculateTotalPrices(selectedPlanAndOptions).yearTotals}/yr`
						: `$${calculateTotalPrices(selectedPlanAndOptions).monthTotals}/mo`}
				</h4>
			</div>
			<Buttons customClass={'hidden md:block'} />
		</section>
	)
}
