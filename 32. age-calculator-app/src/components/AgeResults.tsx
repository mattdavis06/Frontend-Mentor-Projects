import { CalulatedDateTypes } from '../types/types'
import { useSpring, animated } from 'react-spring'

export default function AgeResults({
	calculatedDay,
	calculatedMonth,
	calculatedYear,
}: CalulatedDateTypes) {
	// ===== useSpring package to animation numbers
	const animatedYearValue = useSpring({
		// Check is number is infinite, then set to '--' placholder and val to calculated day
		val: Number.isFinite(calculatedYear) ? calculatedYear : '--',
		// Difine 'from' value
		from: { val: 0 },
	})

	const animatedMonthValue = useSpring({
		// Check is number is infinite, then set to '--' placholder and val to calculated month
		val: Number.isFinite(calculatedMonth) ? calculatedMonth : '--',
		// Difine 'from' value
		from: { val: 0 },
	})

	const animatedDayValue = useSpring({
		// Check is number is infinite, then set to '--' placholder and val to calculated year
		val: Number.isFinite(calculatedDay) ? calculatedDay : '--',
		// Difine 'from' value
		from: { val: 0 },
	})

	return (
		<section id='_ageResultsWrapper' className='font-primaryFont'>
			<h1
				id='_calculatedYears'
				className='my-2 text-5xl font-bold text-offBlack sm:text-6xl'
			>
				<animated.span className='pe-4 text-primaryPurple'>
					{animatedYearValue.val.to((val) =>
						// Check if infinite, set value and remove any decimals
						Number.isFinite(val) ? val.toFixed(0) : val
					)}
				</animated.span>
				years
			</h1>
			<h2
				id='_calculatedMonths'
				className='my-2 text-5xl font-bold text-offBlack sm:text-6xl'
			>
				<animated.span className='pe-4 text-primaryPurple'>
					{animatedMonthValue.val.to((val) =>
						// Check if infinite, set value and remove any decimals
						Number.isFinite(val) ? val.toFixed(0) : val
					)}
				</animated.span>
				months
			</h2>
			<h3
				id='_calculatedDays'
				className='my-2 text-5xl font-bold text-offBlack sm:text-6xl'
			>
				<animated.span className='pe-4 text-primaryPurple'>
					{animatedDayValue.val.to((val) =>
						// Check if infinite, set value and remove any decimals
						Number.isFinite(val) ? val.toFixed(0) : val
					)}
				</animated.span>
				days
			</h3>
		</section>
	)
}
