import StepTracker from './shared/StepTracker'

export default function Header() {
	return (
		<header className='absolute top-0 left-0 h-1/4 w-full bg-header-img bg-cover bg-bottom bg-no-repeat pt-5 md:hidden'>
			<StepTracker />
		</header>
	)
}
