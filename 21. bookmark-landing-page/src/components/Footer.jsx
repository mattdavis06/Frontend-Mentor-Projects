import { useState } from 'react'
import ButtonSubmit from './shared/ButtonSubmit'
import ErrorIcon from '../assets/images/icon-error.svg'
import FooterNav from './FooterNav'

export default function Footer() {
	const [text, setText] = useState('')
	const [isValid, setIsValid] = useState(true)

	const isValidEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!isValidEmail(text)) {
			setIsValid(false)
		} else {
			window.location.reload(true)
			setText('')
		}
	}

	const handleChange = (e) => {
		setText(e.target.value)
	}

	return (
		<footer className='pt-5'>
			<div className='container-lg'>
				<div className='row text-center'>
					<div className='col'>
						<p className='mb-4'>35,000+ already joined</p>
						<h6>
							Stay up-to-date with what
							<br className='d-none d-md-block' />
							we’re doing
						</h6>
					</div>
				</div>
				<div className='row justify-content-center mt-4 mb-5'>
					<div className='col-10 col-md-6'>
						<div className='contact-form-wrapper'>
							<div className='email-input'>
								<form
									noValidate
									onSubmit={handleSubmit}
									className='d-flex align-items-center justify-content-center flex-column flex-md-row'
								>
									<div className='input-wrapper position-relative'>
										{!isValid && (
											<div className='validation-error-msg'>
												Whoops, make sure it's an email
											</div>
										)}

										<input
											type='email'
											name='email'
											placeholder='Enter your email address'
											className='d-block'
											onChange={handleChange}
											onFocus={() => setIsValid(true)}
											value={text}
										/>
										<label htmlFor='email' className='d-none'></label>
										{!isValid && (
											<img
												src={ErrorIcon}
												alt='error-icon'
												className='error-icon position-absolute'
											/>
										)}
									</div>

									<ButtonSubmit
										bootstrap_class='btn-sm text-white d-block m-2 mt-4 mt-md-2'
										text='Contact Us'
										type='submit'
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FooterNav />
		</footer>
	)
}
