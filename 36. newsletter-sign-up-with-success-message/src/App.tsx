import { useRef, useState, FormEventHandler } from 'react'
import NewsletterSignUpCard from './components/NewsletterSignUpCard'
import NewsletterSuccessCard from './components/NewsletterSuccessCard'

function App() {
	const [emailValue, setEmailValue] = useState('')
	const [valid, setValid] = useState(true)
	const [formValid, setFormValid] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)

	// Handle Submit
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()

		// Check Validation of form
		if (!inputRef.current?.checkValidity()) {
			setValid(false)
			setFormValid(false)
		} else {
			setValid(true)
			setFormValid(true)
		}
	}

	// Reset Form and Reload
	const handleResetAndReload = () => {
		setValid(true)
		setFormValid(false)
		setEmailValue('')
	}

	return (
		<main className='md:grid md:place-content-center md:h-screen md:bg-darkSlateGrey'>
			{!formValid && (
				<NewsletterSignUpCard
					handleSubmit={handleSubmit}
					valid={valid}
					setValid={setValid}
					emailValue={emailValue}
					setEmailValue={setEmailValue}
					inputRef={inputRef}
				/>
			)}
			{formValid && (
				<NewsletterSuccessCard
					emailValue={emailValue}
					handleResetAndReload={handleResetAndReload}
				/>
			)}
		</main>
	)
}

export default App
