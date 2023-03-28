import { createContext, useState, useEffect } from 'react'
import data from '../data/data.json'

type JobListingContextTypes = {
	displayedData: any
	setDisplayedData: Function
	filteredTags: Array<string>
	setFilteredTags: Function
}

const JobListingContext = createContext<JobListingContextTypes>({
	displayedData: [{}],
	filteredTags: [],
	setFilteredTags: Function,
	setDisplayedData: Function,
})

export const JobListingProvider = ({ children }: any) => {
	const [displayedData, setDisplayedData] = useState<Array<Object>>(data)
	const [filteredTags, setFilteredTags] = useState<Array<string>>([])

	useEffect(() => {
		const filteredData = data.filter((item) => {
			const { role, level, languages, tools } = item
			const tags = [role, level, ...languages, ...tools]
			return filteredTags.every((tag) => tags.includes(tag))
		})
		setDisplayedData(filteredData)
	}, [filteredTags])

	return (
		<JobListingContext.Provider
			value={{
				displayedData,
				setDisplayedData,
				filteredTags,
				setFilteredTags,
			}}
		>
			{children}
		</JobListingContext.Provider>
	)
}

export default JobListingContext
