import moment from 'moment'
import { DividerBtnTypes } from '../types/types'
import DividerImg from '/src/assets/images/icon-arrow.svg'

export default function DividerBtn({
	day,
	month,
	year,
	isDayValid,
	isMonthValid,
	isYearValid,
	setIsDayValid,
	setIsMonthValid,
	setIsYearValid,
	setCalculatedDay,
	setCalculatedMonth,
	setCalculatedYear,
}: DividerBtnTypes) {
	// ===== Checks is day, month, year is a valid date (e.g. NOT 31/06/1984)
	const isValidDate = (
		day: string | number,
		month: string | number,
		year: string | number
	) => {
		// Parse the input components into a moment object
		const date = moment(`${day}/${month}/${year}`, 'DD/MM/YYYY')

		// Check if the parsed date is valid and the input components match
		return (
			date.isValid() &&
			date.date() === Number(day) &&
			date.month() + 1 === Number(month) &&
			date.year() === Number(year)
		)
	}

	// ===== Calculates the difference between the passed input date and current date
	const calculateDates = (
		day: string | number,
		month: string | number,
		year: string | number
	) => {
		// Get the entered date from your FormTypes state
		const enteredDate = moment(`${day}/${month}/${year}`, 'DD/MM/YYYY')

		// Get the current date
		const currentDate = moment()

		// Calculate the difference between the entered date and the current date
		const duration = moment.duration(currentDate.diff(enteredDate))

		// Get the year, month, and day components of the duration
		const years = duration.years()
		const months = duration.months()
		const days = duration.days()

		// Updates the calculated dates state
		setCalculatedDay(days)
		setCalculatedMonth(months)
		setCalculatedYear(years)
	}

	const handleClick = () => {
		// If day is empty, set validation state accordinly
		if (day === '') {
			setIsDayValid({ ...isDayValid, inputEmpty: true })
			setTimeout(() => {
				setIsDayValid({ ...isDayValid, inputEmpty: false })
			}, 1500)
		}

		// If month is empty, set validation state accordinly
		if (month === '') {
			setIsMonthValid({ ...isMonthValid, inputEmpty: true })
			setTimeout(() => {
				setIsMonthValid({ ...isMonthValid, inputEmpty: false })
			}, 1500)
		}

		// If year is empty, set validation state accordinly
		if (year === '') {
			setIsYearValid({ ...isYearValid, inputEmpty: true })
			setTimeout(() => {
				setIsYearValid({ ...isYearValid, inputEmpty: false })
			}, 1500)
		}

		// Checks if day, month and year state validated & if date is a valid date
		if (
			isDayValid.inputValid &&
			isMonthValid.inputValid &&
			isYearValid.inputValid &&
			isValidDate(day, month, year)
		) {
			// Calls calculation function
			calculateDates(day, month, year)
		}
	}
	return (
		<section id='_divider' className='relative mb-16 mt-10'>
			<hr className=' text-lightGrey' />
			<button
				className='divider-img absolute -top-[35px] left-[50%] h-[70px] w-[70px] -translate-x-[50%] rounded-full bg-primaryPurple p-5 transition-colors hover:bg-offBlack disabled:cursor-not-allowed disabled:bg-lightGrey md:-top-[42.5px] md:left-[95%] md:h-[85px] md:w-[85px]'
				onClick={handleClick}
				disabled={
					!isDayValid.inputValid ||
					!isMonthValid.inputValid ||
					!isYearValid.inputValid
				}
			>
				<img
					src={DividerImg}
					alt='divider-image'
					className='h-full w-full object-cover'
				/>
			</button>
		</section>
	)
}
