import { v4 as uuidv4 } from 'uuid'
import { useContext } from 'react'
import JobListingContext from '../context/JobListingContext'
import FilteredTag from './shared/FilteredTag'

export default function JobListingFilter() {
	const { filteredTags, setFilteredTags } = useContext(JobListingContext)

	const clearFilters = () => {
		setFilteredTags([])
	}
	return (
		<section
			id='_jobListingFilteredWrapper'
			className={`${
				filteredTags && filteredTags.length > 0 ? 'opacity-100' : 'opacity-0'
			} absolute -top-[35px] left-[50%] flex w-full max-w-screen-lg -translate-x-[50%] items-center justify-between rounded-md bg-white p-6 shadow-xl transition-opacity`}
		>
			<div className='filtered-tags flex max-w-2xl flex-wrap items-center'>
				{filteredTags &&
					filteredTags.map((tag) => {
						return <FilteredTag key={uuidv4()} tag={tag} />
					})}
			</div>
			<div className='clear-filtered-tags' onClick={() => clearFilters()}>
				<p className='cursor-pointer font-bold text-textColor underline-offset-2 transition-colors hover:text-primaryColor hover:underline hover:decoration-2'>
					Clear
				</p>
			</div>
		</section>
	)
}
