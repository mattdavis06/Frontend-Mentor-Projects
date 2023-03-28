import { v4 as uuidv4 } from 'uuid'
import { JobListingDataTypes } from '../types/types'
import RoundedPill from './shared/RoundedPill'
import Tag from './shared/Tag'

export default function JobCard({
	id,
	company,
	logo,
	newListing,
	featured,
	position,
	role,
	level,
	postedAt,
	contract,
	location,
	languages,
	tools,
}: JobListingDataTypes) {
	return (
		<div
			className={`job-listing-card relative mx-auto w-full max-w-screen-lg rounded-md ${
				featured ? `border-l-[5px] border-primaryColor` : ''
			} bg-white px-5 pt-10 pb-6 shadow-xl lg:flex lg:items-center lg:justify-between lg:py-6`}
		>
			<div className='job-info-wrapper flex items-center'>
				<div className='job-listing-company-logo absolute -top-[30px] lg:static lg:px-4'>
					<img
						src={logo}
						alt='company-listing-logo'
						className='h-[60px] w-[60px] lg:h-full lg:w-full'
					/>
				</div>
				<div className='job-details'>
					<div className='job-listing-company flex items-center'>
						<h1 className='pr-4 text-sm font-bold text-primaryColor'>
							{company}
						</h1>
						{newListing && <RoundedPill text='New!' pillType='new' />}
						{featured && <RoundedPill text='featured' pillType='featured' />}
					</div>
					<div className='job-postion'>
						<h2 className='py-3 text-base font-bold text-darkColor transition-colors hover:text-primaryColor'>
							<a href='#'>{position}</a>
						</h2>
					</div>
					<div className='job-listing-details text-xl text-textColor'>
						<small>{postedAt}</small>
						<span className='mx-2'>•</span>
						<small>{contract}</small>
						<span className='mx-2'>•</span>
						<small>{location}</small>
					</div>
				</div>
			</div>
			<hr className='my-5 text-textColor' />
			<div className='job-skills-wrapper max-w-2xl'>
				<ul className='flex flex-wrap items-center lg:justify-end'>
					<Tag tag={role} />
					<Tag tag={level} />
					{languages &&
						languages.map((item) => {
							return (
								<li key={uuidv4()}>
									<Tag tag={item} />
								</li>
							)
						})}
					{tools &&
						tools.map((item) => {
							return (
								<li key={uuidv4()}>
									<Tag tag={item} />
								</li>
							)
						})}
				</ul>
			</div>
		</div>
	)
}
