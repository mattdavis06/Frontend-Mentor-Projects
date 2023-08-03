import SuccessBulletPoint from '/images/icon-success.svg'

type NewsletterSuccessCardTypes = {
	emailValue: string
	handleResetAndReload: () => void
}

export default function NewsletterSuccessCard({
	emailValue,
	handleResetAndReload,
}: NewsletterSuccessCardTypes) {
	return (
		<section
			id='_newsletterSignUpConfirmation'
			className='h-screen md:bg-white md:rounded-3xl px-6 py-10 md:p-6 flex flex-col md:h-auto md:w-1/2 md:m-auto md:px-14 md:py-14'
		>
			<div className='newsletter-success space-y-5 md:space-y-8 pt-20 md:pt-0 md:pb-7'>
				<img
					src={SuccessBulletPoint}
					alt='success-icon'
					width='64'
					height='64'
				/>
				<h1 className='text-darkSlateGrey text-4xl md:text-5xl font-bold'>
					Thanks for subscribing!
				</h1>
				<p className='text-darkSlateGrey'>
					A confirmation email has been sent to{' '}
					<span className='font-bold'>{emailValue}</span>. Please open it and
					click the button inside to confirm your subscription.
				</p>
			</div>
			<div className='dismiss-btn mt-auto'>
				<button
					type='button'
					className='w-full h-[3.5rem] text-white bg-darkSlateGrey rounded-xl font-bold hover:bg-gradient-to-r hover:from-gradientStart hover:via-gradientMiddle hover:to-gradientEnd hover:shadow-xl hover:shadow-gradientEnd/50'
					onClick={handleResetAndReload}
				>
					Dismiss message
				</button>
			</div>
		</section>
	)
}
