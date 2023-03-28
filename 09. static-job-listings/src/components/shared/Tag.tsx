import { useContext } from 'react'
import { TagsTypes } from '../../types/types'
import JobListingContext from '../../context/JobListingContext'

export default function Tag({ tag }: TagsTypes): JSX.Element {
	const { setFilteredTags } = useContext(JobListingContext)

	return (
		<div
			className='tag text-bold mb-4 mr-4 cursor-pointer rounded-md bg-backgroundColor py-1 px-2  text-base text-primaryColor transition-colors hover:bg-primaryColor hover:text-white lg:my-2 lg:mx-2'
			onClick={(e) =>
				setFilteredTags((prev: string[]) => [
					...prev,
					(e.target as HTMLElement).textContent,
				])
			}
		>
			{tag}
		</div>
	)
}
