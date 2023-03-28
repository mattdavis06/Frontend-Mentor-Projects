export type JobListingDataTypes = {
	id: number
	company: string
	logo: string
	newListing: boolean
	featured: boolean
	position: string
	role: string
	level: string
	postedAt: string
	contract: string
	location: string
	languages: string[]
	tools: string[]
}

export type RoundedPillTypes = {
	text: string
	pillType: string
}

export type TagsTypes = {
	tag: string
	current?: string[]
}
