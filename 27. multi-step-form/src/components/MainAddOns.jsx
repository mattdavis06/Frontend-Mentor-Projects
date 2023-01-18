import { useContext } from 'react'
import StepTrackerContext from '../context/StepTracker'
import Buttons from './shared/Buttons'

export default function MainAddOns() {
	const {
		isChecked,
		setSelectedPlanAndOptions,
		addOnOptions,
		setAddOnOptions,
	} = useContext(StepTrackerContext)

	const handleAddOnSelection = (id) => {
		// Find the selected add-on
		const selectedAddOn = addOnOptions.find((addon) => addon.id === id)
		//update the state of addOnOptions
		const updatedAddOnOptions = addOnOptions.map((item) => {
			if (item.id === id) {
				return { ...item, addOnChecked: !item.addOnChecked }
			}
			return item
		})
		setAddOnOptions(updatedAddOnOptions)

		// Update the selectedPlanAndOptions state
		if (!selectedAddOn.addOnChecked) {
			setSelectedPlanAndOptions((prevState) => {
				return {
					...prevState,
					addOns: [...prevState.addOns, selectedAddOn],
				}
			})
		} else {
			setSelectedPlanAndOptions((prevState) => {
				const addOns = prevState.addOns.filter((item) => item.id !== id)
				return { ...prevState, addOns }
			})
		}
	}

	return (
		<section
			id='main-plans'
			className='mx-auto flex h-full w-full max-w-xl flex-col lg:py-4'
		>
			<div className='main-addons-header'>
				<h1 className='mb-3 text-4xl font-bold text-marineBlue'>
					Pick add-ons
				</h1>
				<p className='text-lg text-coolGray'>
					Add-ons help enhance your gaming experience.
				</p>
			</div>
			<div className='main-addons-wrapper flex w-full flex-col py-6'>
				{addOnOptions.map((addOn) => {
					return (
						<div
							key={addOn.id}
							id={addOn.id}
							className={`addon-card my-1 flex cursor-pointer items-center rounded-lg border py-4 px-5 transition hover:border-purplishBlue ${
								addOn.addOnChecked
									? 'border-purplishBlue bg-purplishBlue/10'
									: 'border-lightGray bg-white '
							}`}
							onClick={() => handleAddOnSelection(addOn.id)}
						>
							<div className='addon-check flex pr-5'>
								<label htmlFor='onlineServices'></label>
								<input
									type='checkbox'
									name='onlineServices'
									checked={addOn.addOnChecked}
									onChange={() => handleAddOnSelection(addOn.id)}
									className='focus:purplishBlue h-5 w-5 cursor-pointer rounded border border-lightGray accent-purplishBlue transition focus:accent-purplishBlue'
								/>
							</div>
							<div className='addon-content'>
								<h2 className='font-bold text-marineBlue'>
									{addOn.addOnTitle}
								</h2>
								<p className='text-coolGray'>{addOn.addOnText}</p>
							</div>
							<div className='addon-pricing ml-auto'>
								<p className='text-purplishBlue'>
									{isChecked ? addOn.addOnYearPrice : addOn.addOnMonthPrice}
								</p>
							</div>
						</div>
					)
				})}
			</div>
			<Buttons customClass={'hidden md:block'} />
		</section>
	)
}
