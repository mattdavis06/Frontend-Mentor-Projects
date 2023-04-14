import { useState } from 'react'
import AgeForm from './components/AgeForm'
import AgeResults from './components/AgeResults'

function App() {
	const [day, setDay] = useState<number | string>('')
	const [month, setMonth] = useState<number | string>('')
	const [year, setYear] = useState<number | string>('')
	const [calculatedDay, setCalculatedDay] = useState<number | string>('--')
	const [calculatedMonth, setCalculatedMonth] = useState<number | string>('--')
	const [calculatedyear, setCalculatedYear] = useState<number | string>('--')

	return (
		<main
			id='_appWrapper'
			className='mx-auto my-20 max-w-3xl px-4 md:my-0 md:grid md:h-screen md:place-items-center'
		>
			<section
				id='_calculatorWrapper'
				className='w-full rounded-3xl rounded-br-[8rem] bg-white px-6 py-12'
			>
				<AgeForm
					day={day}
					month={month}
					year={year}
					setDay={setDay}
					setMonth={setMonth}
					setYear={setYear}
					setCalculatedDay={setCalculatedDay}
					setCalculatedMonth={setCalculatedMonth}
					setCalculatedYear={setCalculatedYear}
				/>
				<AgeResults
					calculatedDay={calculatedDay}
					calculatedMonth={calculatedMonth}
					calculatedYear={calculatedyear}
				/>
			</section>
		</main>
	)
}

export default App
