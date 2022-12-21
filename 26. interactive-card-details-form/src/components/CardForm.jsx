import { useState } from 'react'

export default function CardForm({ cardDetails, setCardDetails }) {
	const inputPlacholderText = {
		cardHolderName: 'e.g Jane Appleseed',
		cardHolderNumber: 'e.g 1234 5678 9123 0000',
		cardHolderExpiry_Month: 'MM',
		cardHolderExpiry_Year: 'YY',
		cardHolderCVC: 'e.g 123',
	}

	const [cardNameNotValid, setCardNameNotValid] = useState(undefined)
	const [cardNumberNotValid, setCardNumberNotValid] = useState(undefined)
	const [cardExpiryMonthNotValid, setCardExpiryMonthNotValid] =
		useState(undefined)
	const [cardExpiryYearNotValid, setCardExpiryYearNotValid] =
		useState(undefined)
	const [cardCVCNotValid, setCardCVCNotValid] = useState(undefined)

	const handleInputChange = (e) => {
		switch (e.target.name) {
			case 'cardholderName':
				setCardDetails({
					...cardDetails,
					cardHolderName: e.target.value.replace(/[^a-zA-Z ]/gi, ''),
				})
				break
			case 'cardholderNumber':
				setCardDetails({
					...cardDetails,
					cardHolderNumber: e.target.value
						.replace(/[^0-9.]/g, '')
						.replace(/(\..*)\./g, '$1'),
				})
				break
			case 'cardholderExp_MM':
				setCardDetails({
					...cardDetails,
					cardHolderExpiry_Month: e.target.value
						.replace(/[^0-9.]/g, '')
						.replace(/(\..*)\./g, '$1'),
				})
				break
			case 'cardholderExp_YY':
				setCardDetails({
					...cardDetails,
					cardHolderExpiry_Year: e.target.value
						.replace(/[^0-9.]/g, '')
						.replace(/(\..*)\./g, '$1'),
				})
				break
			case 'cardholder_CVC':
				setCardDetails({
					...cardDetails,
					cardHolderCVC: e.target.value
						.replace(/[^0-9.]/g, '')
						.replace(/(\..*)\./g, '$1'),
				})
				break

			default:
				break
		}
	}

	const handleName_Validation = () => {
		if (cardDetails.cardHolderName === '') {
			setCardNameNotValid(true)
		} else {
			setCardNameNotValid(false)
		}
	}

	const handleNumber_Validation = () => {
		if (
			cardDetails.cardHolderNumber.length !== 16 ||
			cardDetails.cardHolderNumber === ''
		) {
			setCardNumberNotValid(true)
		} else {
			setCardNumberNotValid(false)
		}
	}

	const handleCVC_Validation = () => {
		if (cardDetails.cardHolderCVC === '') {
			setCardCVCNotValid(true)
		} else {
			setCardCVCNotValid(false)
		}
	}

	const handleMMYY_Validation = () => {
		// Checks MM NOT blank / YY is blank
		if (
			cardDetails.cardHolderExpiry_Month !== '' &&
			cardDetails.cardHolderExpiry_Year === ''
		) {
			setCardExpiryMonthNotValid(false)
			setCardExpiryYearNotValid(true)
		}

		// Checks MM blank / YY NOT is blank
		if (
			cardDetails.cardHolderExpiry_Month === '' &&
			cardDetails.cardHolderExpiry_Year !== ''
		) {
			setCardExpiryMonthNotValid(true)
			setCardExpiryYearNotValid(false)
		}

		// Checks MM && YY blank
		if (
			cardDetails.cardHolderExpiry_Month === '' &&
			cardDetails.cardHolderExpiry_Year === ''
		) {
			setCardExpiryMonthNotValid(true)
			setCardExpiryYearNotValid(true)
		}

		// Checks MM && YY NOT blank
		if (
			cardDetails.cardHolderExpiry_Month !== '' &&
			cardDetails.cardHolderExpiry_Year !== ''
		) {
			setCardExpiryMonthNotValid(false)
			setCardExpiryYearNotValid(false)
		}
	}

	const [formSucess, setFormSuccess] = useState(false)

	const handleSubmitCheck = () => {
		if (
			cardNameNotValid === undefined ||
			cardNumberNotValid === undefined ||
			cardExpiryMonthNotValid === undefined ||
			cardExpiryYearNotValid === undefined ||
			cardCVCNotValid === undefined
		) {
			return
		} else if (
			cardNameNotValid ||
			cardNumberNotValid ||
			cardExpiryMonthNotValid ||
			cardExpiryYearNotValid ||
			cardCVCNotValid
		) {
			return
		} else {
			setFormSuccess(true)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		handleName_Validation()
		handleNumber_Validation()
		handleMMYY_Validation()
		handleCVC_Validation()

		handleSubmitCheck()
	}

	const resetForm = () => {
		setCardDetails({
			...cardDetails,
			cardHolderName: '',
			cardHolderNumber: '',
			cardHolderExpiry_Month: '',
			cardHolderExpiry_Year: '',
			cardHolderCVC: '',
		})

		setCardNameNotValid(undefined)
		setCardNumberNotValid(undefined)
		setCardExpiryMonthNotValid(undefined)
		setCardExpiryYearNotValid(undefined)
		setCardCVCNotValid(undefined)

		setFormSuccess(false)
	}

	if (!formSucess) {
		return (
			<div className='input-section-wrapper flex'>
				<div className='w-10/12 lg:7/12 max-w-full lg:max-w-[400px] m-auto lg:py-10'>
					<form>
						<div className='form-control my-4 flex flex-col'>
							<label
								htmlFor='cardholderName'
								className='uppercase text-xs tracking-widest text-veryDarkViolet'
							>
								Cardholder Name
							</label>
							<input
								type='text'
								name='cardholderName'
								className={`border border-lightGrayishViolet rounded-md text-lightGrayishViolet placeholder:text-lightGrayishViolet my-2 px-4 py-1.5 active:border-veryDarkViolet
					focus:border-veryDarkViolet focus:outline-none 
					${
						cardNameNotValid === undefined
							? 'border-lightGrayishViolet'
							: cardNameNotValid
							? 'border-redErrors'
							: 'border-veryDarkViolet'
					}`}
								value={cardDetails.cardHolderName}
								placeholder={inputPlacholderText.cardHolderName}
								onFocus={(e) => (e.target.placeholder = '')}
								onBlur={(e) =>
									(e.target.placeholder = inputPlacholderText.cardHolderName)
								}
								onChange={(e) => handleInputChange(e)}
							/>
							<small
								className={`${
									cardNameNotValid ? 'block' : 'hidden'
								} text-[11px] text-redErrors`}
							>
								Wrong format, letters only
							</small>
						</div>
						<div className='form-control my-4 flex flex-col'>
							<label
								htmlFor='cardholderNumber'
								className='uppercase text-xs tracking-widest text-veryDarkViolet'
							>
								Cardholder Number
							</label>
							<input
								type='text'
								inputMode='numeric'
								name='cardholderNumber'
								maxLength='16'
								className={`border border-lightGrayishViolet rounded-md text-lightGrayishViolet placeholder:text-lightGrayishViolet my-2 px-4 py-1.5
					active:border-veryDarkViolet
					focus:border-veryDarkViolet focus:outline-none ${
						cardNumberNotValid === undefined
							? 'border-lightGrayishViolet'
							: cardNumberNotValid
							? 'border-redErrors'
							: 'border-veryDarkViolet'
					}`}
								value={cardDetails.cardHolderNumber}
								placeholder={inputPlacholderText.cardHolderNumber}
								onFocus={(e) => (e.target.placeholder = '')}
								onBlur={(e) =>
									(e.target.placeholder = inputPlacholderText.cardHolderNumber)
								}
								onChange={(e) => handleInputChange(e)}
							/>
							<small
								className={`text-[11px] text-redErrors ${
									cardNumberNotValid ? 'block' : 'hidden'
								}`}
							>
								Wrong format, numbers only and at least 16 digits
							</small>
						</div>
						<div className='form-wrapper flex my-4'>
							<div className='form-wrapper-inner w-5/12'>
								<div className='form-control flex flex-col relative'>
									<div className='form-control-labels'>
										<label
											htmlFor='cardholderExp_MM'
											className='uppercase text-xs tracking-widest text-veryDarkViolet'
										>
											Exp. Date (MM/YY)
										</label>
										<label
											htmlFor='cardholderExp_YY'
											className='hidden'
										></label>
									</div>
									<div className='form-control-inputs flex w-full gap-3'>
										<input
											type='text'
											inputMode='numeric'
											name='cardholderExp_MM'
											className={`w-6/12 text-center border border-lightGrayishViolet rounded-md text-lightGrayishViolet placeholder:text-lightGrayishViolet my-2 px-3 py-1.5
								active:border-veryDarkViolet
					focus:border-veryDarkViolet focus:outline-none ${
						cardExpiryMonthNotValid === undefined
							? 'border-lightGrayishViolet'
							: cardExpiryMonthNotValid
							? 'border-redErrors'
							: 'border-veryDarkViolet'
					}`}
											maxLength='2'
											value={cardDetails.cardHolderExpiry_Month}
											placeholder={inputPlacholderText.cardHolderExpiry_Month}
											onFocus={(e) => (e.target.placeholder = '')}
											onBlur={(e) =>
												(e.target.placeholder =
													inputPlacholderText.cardHolderExpiry_Year)
											}
											onChange={(e) => handleInputChange(e)}
										/>

										<input
											type='text'
											inputMode='numeric'
											name='cardholderExp_YY'
											className={`w-6/12 text-center border border-lightGrayishViolet rounded-md text-lightGrayishViolet placeholder:text-lightGrayishViolet my-2 px-3 py-1.5
								active:border-veryDarkViolet
					focus:border-veryDarkViolet focus:outline-none ${
						cardExpiryYearNotValid === undefined
							? 'border-lightGrayishViolet'
							: cardExpiryYearNotValid
							? 'border-redErrors'
							: 'border-veryDarkViolet'
					}`}
											maxLength='2'
											value={cardDetails.cardHolderExpiry_Year}
											placeholder={inputPlacholderText.cardHolderExpiry_Year}
											onFocus={(e) => (e.target.placeholder = '')}
											onBlur={(e) =>
												(e.target.placeholder =
													inputPlacholderText.cardHolderExpiry_Year)
											}
											onChange={(e) => handleInputChange(e)}
										/>
									</div>
									<small
										className={`absolute -bottom-2.5 text-[11px] text-redErrors ${
											cardExpiryMonthNotValid || cardExpiryYearNotValid
												? 'block'
												: 'hidden'
										}`}
									>
										Can't be blank
									</small>
								</div>
							</div>
							<div className='form-wrapper-inner w-7/12 mt-auto'>
								<div className='form-control flex flex-col relative pl-5'>
									<label
										htmlFor='cardholder_CVC'
										className='uppercase text-xs tracking-widest text-veryDarkViolet'
									>
										CVC
									</label>
									<input
										type='text'
										inputMode='numeric'
										name='cardholder_CVC'
										className={`border border-lightGrayishViolet rounded-md text-lightGrayishViolet placeholder:text-lightGrayishViolet my-2 px-3 py-1.5
							active:border-veryDarkViolet
					focus:border-veryDarkViolet focus:outline-none ${
						cardCVCNotValid === undefined
							? 'border-lightGrayishViolet'
							: cardCVCNotValid
							? 'border-redErrors'
							: 'border-veryDarkViolet'
					}`}
										maxLength='3'
										value={cardDetails.cardHolderCVC}
										placeholder={inputPlacholderText.cardHolderCVC}
										onFocus={(e) => (e.target.placeholder = '')}
										onBlur={(e) =>
											(e.target.placeholder = inputPlacholderText.cardHolderCVC)
										}
										onChange={(e) => handleInputChange(e)}
									/>
									<small
										className={`absolute -bottom-2.5 text-[11px] text-redErrors ${
											cardCVCNotValid ? 'block' : 'hidden'
										}`}
									>
										Can't be blank
									</small>
								</div>
							</div>
						</div>
						<div className='form-btn pt-2'>
							<button
								type='submit'
								onClick={(e) => handleSubmit(e)}
								className='btn w-full rounded-md bg-veryDarkViolet text-white py-3
					hover:bg-veryDarkViolet/80 transition ease-in-out'
							>
								Confirm
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	} else {
		return (
			<div className='form-success-wrapper flex'>
				<div className='w-10/12 lg:7/12 max-w-full lg:max-w-[400px] m-auto lg:py-10 flex flex-col items-center'>
					<div className='icon-complete'>
						<svg
							width='80'
							height='80'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle cx='40' cy='40' r='40' fill='url(#a)' />
							<path
								d='M28 39.92 36.08 48l16-16'
								stroke='#fff'
								strokeWidth='3'
							/>
							<defs>
								<linearGradient
									id='a'
									x1='-23.014'
									y1='11.507'
									x2='0'
									y2='91.507'
									gradientUnits='userSpaceOnUse'
								>
									<stop stopColor='#6348FE' />
									<stop offset='1' stopColor='#610595' />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div className='form-success-title mt-12 mb-4'>
						<h1 className='text-3xl text-veryDarkViolet uppercase tracking-widest'>
							Thank You!
						</h1>
					</div>
					<div className='form-success-msg mb-10'>
						<p className='text-lg text-darkGrayishViolet'>
							We've added your card details
						</p>
					</div>
					<div className='form-btn pt-2 w-full'>
						<button
							type='submit'
							onClick={() => resetForm()}
							className='btn w-full rounded-md bg-veryDarkViolet text-white py-3
hover:bg-veryDarkViolet/80 transition ease-in-out'
						>
							Continue
						</button>
					</div>
				</div>
			</div>
		)
	}
}
