import ThankYouIcon from '../assets/images/icon-thank-you.svg'

export default function MainThankYou() {
	return (
		<section
			id='main-thankyou'
			className='mx-auto flex h-full w-full max-w-xl flex-col lg:py-4'
		>
			<div className='main-summary-wrapper my-auto flex flex-col items-center'>
				<div className='thankyou-icon mb-8'>
					<img src={ThankYouIcon} alt='thankyou-icon' />
				</div>
				<div className='thankyou-content text-center'>
					<h1 className='mb-5 text-4xl font-bold text-marineBlue'>
						Thank you!
					</h1>
					<p className='text-coolGray'>
						Thanks for confirming your subscription! We hope you have fun using
						our platform. If you ever need support, please feel free to email us
						at support@loremgaming.com.
					</p>
				</div>
			</div>
		</section>
	)
}
