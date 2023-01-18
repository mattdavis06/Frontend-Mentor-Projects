import { useContext } from 'react'
import StepTrackerContext from '../context/StepTracker'
import Button from './shared/Buttons'

export default function MainInfo() {
	const {
		isNameValid,
		isEmailValid,
		isPhoneValid,
		inputValues,
		handleInputChange,
	} = useContext(StepTrackerContext)

	const inputPlaceholderText = {
		name: 'e.g. Stephen King',
		email: 'e.g. stephenking@lorem.com',
		phone: 'e.g. +1 234 567 890',
	}

	return (
		<section
			id='main-info'
			className='mx-auto flex h-full w-full max-w-xl flex-col py-4'
		>
			<div className='main-info-header'>
				<h1 className='mb-3 text-4xl font-bold text-marineBlue'>
					Personal Info
				</h1>
				<p className='text-lg text-coolGray'>
					Please provide your name, email address and phone number.
				</p>
			</div>
			<div className='main-info-form py-4'>
				<div className='form-input'>
					<label htmlFor='name'>Name</label>
					<small
						className={
							isNameValid === undefined
								? 'hidden'
								: isNameValid
								? 'hidden'
								: 'block'
						}
					>
						This field is required
					</small>
					<input
						type='text'
						name='name'
						className={
							isNameValid === undefined
								? 'border-lightGray'
								: isNameValid
								? 'border-lightGray'
								: 'border-strawberryRed'
						}
						placeholder={inputPlaceholderText.name}
						onChange={(e) => handleInputChange(e)}
						value={inputValues.name}
					/>
				</div>
				<div className='form-input'>
					<label htmlFor='email'>Email Address</label>
					<small
						className={
							isEmailValid === undefined
								? 'hidden'
								: isEmailValid
								? 'hidden'
								: 'block'
						}
					>
						This field is required
					</small>
					<input
						type='email'
						name='email'
						className={
							isEmailValid === undefined
								? 'border-lightGray'
								: isEmailValid
								? 'border-lightGray'
								: 'border-strawberryRed'
						}
						placeholder={inputPlaceholderText.email}
						onChange={(e) => handleInputChange(e)}
						value={inputValues.email}
					/>
				</div>
				<div className='form-input'>
					<label htmlFor='phone'>Phone Number</label>
					<small
						className={
							isPhoneValid === undefined
								? 'hidden'
								: isPhoneValid
								? 'hidden'
								: 'block'
						}
					>
						This field is required
					</small>
					<input
						type='text'
						name='phone'
						maxLength='15'
						className={
							isPhoneValid === undefined
								? 'border-lightGray'
								: isPhoneValid
								? 'border-lightGray'
								: 'border-strawberryRed'
						}
						placeholder={inputPlaceholderText.phone}
						onChange={(e) => handleInputChange(e)}
						value={inputValues.phone}
					/>
				</div>
			</div>
			<Button customClass={'hidden md:block'} />
		</section>
	)
}
