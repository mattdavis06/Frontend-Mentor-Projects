import { useContext } from 'react'
import { JobListingDataTypes } from '../types/types'
import JobListingContext from '../context/JobListingContext'
import JobCard from './JobCard'

export const JobCardList = () => {
	const { displayedData } = useContext(JobListingContext)

	return displayedData.map((item: JobListingDataTypes) => {
		return (
			<JobCard
				key={item.id}
				id={item.id}
				company={item.company}
				logo={item.logo}
				newListing={item.newListing}
				featured={item.featured}
				position={item.position}
				role={item.role}
				level={item.level}
				postedAt={item.postedAt}
				contract={item.contract}
				location={item.location}
				languages={item.languages}
				tools={item.tools}
			/>
		)
	})
}
