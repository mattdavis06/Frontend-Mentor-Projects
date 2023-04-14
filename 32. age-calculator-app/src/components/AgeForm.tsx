import { useState } from 'react'
import { FormTypes } from '../types/types'
import DividerBtn from './DividerBtn'

export default function AgeForm({
	day,
	month,
	year,
	setDay,
	setMonth,
	setYear,
	setCalculatedDay,
	setCalculatedMonth,
	setCalculatedYear,
}: FormTypes) {
	// ===== State for input vaildation
	const [isDayValid, setIsDayValid] = useState({
		inputValid: true,
		inputInvalidMsg: 'Must be a valid day',
		inputEmpty: false,
		inputEmptyMsg: 'The field is required',
	})
	const [isMonthValid, setIsMonthValid] = useState({
		inputValid: true,
		inputInvalidMsg: 'Must be a valid month',
		inputEmpty: false,
		inputEmptyMsg: 'The field is required',
	})
	const [isYearValid, setIsYearValid] = useState({
		inputValid: true,
		inputInvalidMsg: 'Must be in the past',
		inputEmpty: false,
		inputEmptyMsg: 'The field is required',
	})

	// ===== Checks input is only a number
	const numbersOnlyCheck = (value: string) => {
		return value.replace(/[^\d]/g, '')
	}

	const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		const dayValue = numbersOnlyCheck(value)
		const day = parseInt(dayValue, 10)

		// Update day state
		setDay(dayValue)

		// Checks if 2 digits, then is a valid day, sets validation state accordingly
		if (dayValue.length === 2) {
			if (day >= 1 && day <= 31) {
				setIsDayValid({ ...isDayValid, inputValid: true })
			} else {
				setIsDayValid({ ...isDayValid, inputValid: false })
			}
		} else if (dayValue === '') {
			setIsDayValid({ ...isDayValid, inputValid: true })
		}
	}

	const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		const monthValue = numbersOnlyCheck(value)
		const month = parseInt(monthValue, 10)

		// Update month state
		setMonth(monthValue)

		// Checks if 2 digits, then is a valid month, sets validation state accordingly
		if (monthValue.length === 2) {
			if (month >= 1 && month <= 12) {
				setIsMonthValid({ ...isMonthValid, inputValid: true })
			} else {
				setIsMonthValid({ ...isMonthValid, inputValid: false })
			}
		} else if (monthValue === '') {
			setIsMonthValid({ ...isMonthValid, inputValid: true })
		}
	}

	const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		const yearValue = numbersOnlyCheck(value)

		// Update year state
		setYear(yearValue)

		// Get current year
		const currentYear = new Date().getFullYear()
		const inputYear = parseInt(yearValue, 10)

		// Checks if a year between 1900 and 9999 and updates a year in future
		const isValidYear =
			!isNaN(inputYear) && inputYear >= 1900 && inputYear <= 9999
		const isFutureYear = inputYear > currentYear

		// Checks if 4 digits, then if is a valid month in the future, sets validation state accordingly
		if (yearValue.length === 4) {
			if (isValidYear && !isFutureYear) {
				setIsYearValid({ ...isYearValid, inputValid: true })
			} else {
				setIsYearValid({ ...isYearValid, inputValid: false })
			}
		} else if (yearValue === '') {
			setIsYearValid({ ...isYearValid, inputValid: true })
		}
	}
	return (
		<section id='_ageForm'>
			<form className='flex items-start'>
				<div className='form-control mx-2 flex min-h-[120px] flex-col items-start md:mx-3'>
					<label
						htmlFor='day'
						className={`text-sm font-bold uppercase tracking-widest  ${
							!isDayValid.inputValid || isDayValid.inputEmpty
								? 'text-primaryLightRed'
								: 'text-smokeyGrey'
						}`}
					>
						Day
					</label>
					<input
						type='text'
						name='day'
						className={`custom-input ${
							!isDayValid.inputValid || isDayValid.inputEmpty
								? 'border-primaryLightRed'
								: ''
						}`}
						placeholder='DD'
						maxLength={2}
						inputMode='numeric'
						onChange={handleDayChange}
						value={day ?? ''}
					/>
					{!isDayValid.inputValid && (
						<small className='text-xs text-primaryLightRed'>
							{isDayValid.inputInvalidMsg}
						</small>
					)}
					{isDayValid.inputEmpty && (
						<small className='text-xs text-primaryLightRed'>
							{isDayValid.inputEmptyMsg}
						</small>
					)}
				</div>
				<div className='form-control mx-2 flex min-h-[120px] flex-col items-start md:mx-3'>
					<label
						htmlFor='month'
						className={`text-sm font-bold uppercase tracking-widest  ${
							!isMonthValid.inputValid || isMonthValid.inputEmpty
								? 'text-primaryLightRed'
								: 'text-smokeyGrey'
						}`}
					>
						Month
					</label>
					<input
						type='text'
						name='month'
						className={`custom-input ${
							!isMonthValid.inputValid || isMonthValid.inputEmpty
								? 'border-primaryLightRed'
								: ''
						}`}
						placeholder='MM'
						maxLength={2}
						inputMode='numeric'
						onChange={handleMonthChange}
						value={month ?? ''}
					/>
					{!isMonthValid.inputValid && (
						<small className='text-xs text-primaryLightRed'>
							{isMonthValid.inputInvalidMsg}
						</small>
					)}
					{isMonthValid.inputEmpty && (
						<small className='text-xs text-primaryLightRed'>
							{isMonthValid.inputEmptyMsg}
						</small>
					)}
				</div>
				<div className='form-control mx-2 flex min-h-[120px] flex-col items-start md:mx-3'>
					<label
						htmlFor='year'
						className={`text-sm font-bold uppercase tracking-widest  ${
							!isYearValid.inputValid || isYearValid.inputEmpty
								? 'text-primaryLightRed'
								: 'text-smokeyGrey'
						}`}
					>
						Year
					</label>
					<input
						type='text'
						name='year'
						className={`custom-input ${
							!isYearValid.inputValid || isYearValid.inputEmpty
								? 'border-primaryLightRed'
								: ''
						}`}
						placeholder='YYYY'
						maxLength={4}
						inputMode='numeric'
						onChange={handleYearChange}
						value={year ?? ''}
					/>
					{!isYearValid.inputValid && (
						<small className='text-xs text-primaryLightRed'>
							{isYearValid.inputInvalidMsg}
						</small>
					)}
					{isYearValid.inputEmpty && (
						<small className='text-xs text-primaryLightRed'>
							{isYearValid.inputEmptyMsg}
						</small>
					)}
				</div>
			</form>
			<DividerBtn
				day={day}
				month={month}
				year={year}
				isDayValid={isDayValid}
				isMonthValid={isMonthValid}
				isYearValid={isYearValid}
				setIsDayValid={setIsDayValid}
				setIsMonthValid={setIsMonthValid}
				setIsYearValid={setIsYearValid}
				setCalculatedDay={setCalculatedDay}
				setCalculatedMonth={setCalculatedMonth}
				setCalculatedYear={setCalculatedYear}
			/>
		</section>
	)
}
