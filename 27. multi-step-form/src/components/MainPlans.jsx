import { useContext } from 'react'
import StepTrackerContext from '../context/StepTracker'
import Button from './shared/Buttons'

export default function MainPlans() {
	const {
		isChecked,
		setIsChecked,
		optionCards,
		setOptionCards,
		selectedPlanAndOptions,
		setSelectedPlanAndOptions,
	} = useContext(StepTrackerContext)

	const updatePlan = (card) => {
		optionCards.forEach((option) => {
			if (card === option.id) {
				setSelectedPlanAndOptions({
					...selectedPlanAndOptions,
					plan: option.cardTitle,
					monthlyPrice: option.cardMonthPrice,
					yearlyPrice: option.cardYearPrice,
				})
			}
		})
	}

	return (
		<section
			id='main-plans'
			className='mx-auto flex h-full w-full max-w-xl flex-col lg:py-4'
		>
			<div className='main-plans-header'>
				<h1 className='mb-3 text-4xl font-bold text-marineBlue'>
					Select your plan
				</h1>
				<p className='text-lg text-coolGray'>
					You have the option of monthly or yearly billing.
				</p>
			</div>
			<div className='main-plans-wrapper flex w-full flex-col justify-between py-6 lg:flex-row'>
				{optionCards.map((card) => {
					return (
						<div
							className={`option-card ${card.cardActive ? 'active' : ''}`}
							key={card.id}
							onClick={() => {
								const updatedOptionCards = optionCards.map((option) => {
									if (option.id === card.id) {
										return { ...option, cardActive: true }
									} else {
										return { ...option, cardActive: false }
									}
								})
								setOptionCards(updatedOptionCards)
								updatePlan(card.id)
							}}
						>
							<div className='option-card-icon pr-5 lg:pr-0'>
								<img src={card.cardIcon} alt='' />
							</div>
							<div className='option-content'>
								<h2 className='text-xl font-medium text-marineBlue'>
									{card.cardTitle}
								</h2>
								<p className='text-coolGray'>
									{isChecked ? card.cardYearPrice : card.cardMonthPrice}
								</p>
								<small
									className={`mt-2 text-sm text-marineBlue ${
										isChecked ? 'block' : 'hidden'
									}`}
								>
									{card.cardYearOfferText}
								</small>
							</div>
						</div>
					)
				})}
			</div>
			<div className='main-plans-toggle-wrapper flex w-full items-center justify-center rounded-lg bg-purplishBlue/5 py-4'>
				<p className={isChecked ? 'text-coolGray' : 'text-marineBlue'}>
					Monthly
				</p>
				<div className='options-toggle relative mx-6 flex items-center'>
					<label
						htmlFor='planToggle'
						className={`absolute h-3.5 w-3.5 cursor-pointer rounded-full bg-white ${
							isChecked ? 'right-1' : 'left-1'
						}`}
					></label>
					<input
						type='checkbox'
						name='planToggle'
						className='h-5 w-10 cursor-pointer appearance-none rounded-2xl bg-marineBlue'
						checked={isChecked}
						onChange={() => setIsChecked((prev) => !prev)}
					/>
				</div>

				<p className={isChecked ? 'text-marineBlue' : 'text-coolGray'}>
					Yearly
				</p>
			</div>
			<Button customClass={'hidden md:block'} />
		</section>
	)
}
