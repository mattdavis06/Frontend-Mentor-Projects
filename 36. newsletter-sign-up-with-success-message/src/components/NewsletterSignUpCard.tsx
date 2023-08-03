import { MutableRefObject, FormEventHandler } from 'react'
import HeaderImg_Mobile from '/images/illustration-sign-up-mobile.svg'
import HeaderImg_Desktop from '/images/illustration-sign-up-desktop.svg'
import BulletPoint from '/images/icon-list.svg'

type NewsletterSignUpCardTypes = {
	handleSubmit: FormEventHandler<HTMLFormElement>
	valid: boolean
	setValid: (value: boolean) => void
	emailValue: string
	setEmailValue: (value: string) => void
	inputRef: MutableRefObject<HTMLInputElement | null>
}

export default function NewsletterSignUpCard({
	handleSubmit,
	valid,
	setValid,
	emailValue,
	setEmailValue,
	inputRef,
}: NewsletterSignUpCardTypes) {
	return (
		<section
			id='_newsletterSignUp'
			className='flex flex-col md:flex-row max-w-[1440px] md:w-full md:bg-white md:rounded-3xl md: md:p-6'
		>
			<div className='newsletter-header-img order-1 md:order-2'>
				<img
					src={HeaderImg_Mobile}
					alt='header-img'
					className='w-full object-cover md:hidden'
					height='284'
					width='375'
				/>
				<img
					src={HeaderImg_Desktop}
					alt='header-img'
					className='object-cover hidden md:block'
					height='593'
					width='400'
				/>
			</div>
			<div className='newsletter-content py-10 px-8 space-y-5 order-2 md:order-1 md:my-auto'>
				<h1 className='text-darkSlateGrey font-bold text-4xl sm:text-5xl'>
					Stay updated!
				</h1>
				<h2 className='text-darkSlateGrey'>
					Join 60,000+ product managers receiving monthly updates on:
				</h2>
				<div className='newsletter-bullet-points'>
					<ul className='space-y-3 text-darkSlateGrey'>
						<li className='flex items-center'>
							<span className='mr-4'>
								<img
									src={BulletPoint}
									alt='bullet-point'
									width='21'
									height='21'
								/>
							</span>
							Product discovery and building what matters
						</li>
						<li className='flex items-center'>
							<span className='mr-4'>
								<img
									src={BulletPoint}
									alt='bullet-point'
									width='21'
									height='21'
								/>
							</span>
							Measuring to ensure updates are a success
						</li>
						<li className='flex items-center'>
							<span className='mr-4'>
								<img
									src={BulletPoint}
									alt='bullet-point'
									width='21'
									height='21'
								/>
							</span>
							And much more!
						</li>
					</ul>
				</div>
				<form
					className='newsletter-form py-4 space-y-5'
					noValidate
					onSubmit={handleSubmit}
					onFocus={() => setValid(true)}
				>
					<div className='form-label flex items-center justify-between'>
						<label
							htmlFor='email'
							className='text-darkSlateGrey text-sm font-bold'
						>
							Email address
						</label>
						{!valid && (
							<p className='text-primaryRed text-sm font-bold'>
								Valid email required
							</p>
						)}
					</div>
					<div className='form-input'>
						<input
							type='email'
							name='email'
							className={`border  rounded-xl w-full h-[3.5rem] px-6 placeholder:text-grey text-darkSlateGrey focus:outline-none ${
								!valid
									? 'border-primaryRed bg-primaryRed/20 text-primaryRed'
									: 'border-grey'
							}`}
							placeholder='email@company.com'
							ref={inputRef}
							onChange={(e) => setEmailValue(e.target.value)}
							value={emailValue}
							required
						/>
					</div>
					<div className='form-btn'>
						<button
							type='submit'
							className='w-full h-[3.5rem] text-white bg-darkSlateGrey rounded-xl font-bold hover:bg-gradient-to-r hover:from-gradientStart hover:via-gradientMiddle hover:to-gradientEnd hover:shadow-2xl hover:shadow-gradientEnd/50'
						>
							Subscribe to monthly newsletter
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}
