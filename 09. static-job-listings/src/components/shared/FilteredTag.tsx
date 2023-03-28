import { useContext } from 'react'
import { TagsTypes } from '../../types/types'
import CloseBtn from '../../assets/images/icon-remove.svg'
import JobListingContext from '../../context/JobListingContext'

export default function FilteredTag({ tag }: TagsTypes) {
	const { filteredTags, setFilteredTags } = useContext(JobListingContext)

	const handleClose = () => {
		if (filteredTags.includes(tag)) {
			setFilteredTags(filteredTags.filter((t) => t !== tag))
		} else {
			setFilteredTags([...filteredTags, tag])
		}
	}

	return (
		<div className='filtered-tag text-bold relative m-2 flex rounded-md bg-backgroundColor py-1 pr-10 pl-2 text-base text-primaryColor'>
			<div className='tag'>{tag}</div>
			<div
				className='tag-close absolute right-0 top-0 flex h-full cursor-pointer items-center justify-center rounded-tr-md rounded-br-md bg-primaryColor py-1 px-2 transition-colors hover:bg-darkColor'
				onClick={handleClose}
			>
				<img src={CloseBtn} alt='close-btn' className='pointer-events-none' />
			</div>
		</div>
	)
}
