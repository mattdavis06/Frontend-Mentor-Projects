import StepTracker from './shared/StepTracker'

export default function Aside() {
	return (
		<aside className='hidden h-full w-3/6 rounded-lg bg-aside-img bg-cover bg-left bg-no-repeat p-10 md:block md:px-8 md:py-10 lg:p-10 xl:w-2/5'>
			<StepTracker />
		</aside>
	)
}
