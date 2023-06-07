import ContentImg from '../assets/images/bg-tablet-pattern.svg'
import { useState, useEffect } from 'react'
import getCMSData from '../lib/getCMSData'

type ContentItem = {
	id: string
	contentItemHeading: string
	contentItemNumber: number
	contentItemText: string
}

type ContentSection = {
	id: string
	contentHeading: string
	contentText: string
	contentItem: ContentItem[]
}

export default function ContentSection() {
	const [contentCMSData, setContentCMSData] = useState<ContentSection | null>(
		null
	)
	const fetchQuery = `	
	{
	    contentSections {
			id
			contentHeading
			contentText
			contentItem {
			  ... on ContentItem {
				id
				contentItemHeading
				contentItemNumber
				contentItemText
			  }
			}
		  }
	}
  `

	useEffect(() => {
		getCMSData(fetchQuery).then((data) => {
			setContentCMSData({ ...data.contentSections[0] })
		})
	}, [fetchQuery])

	return (
		<section
			id='_whatsDifferentAboutManage'
			className='app-wrapper relative py-12 md:flex lg:py-20'
		>
			<div className='content-secton-bg absolute -bottom-[60%] -left-[55%] -z-10 hidden md:block'>
				<img src={ContentImg} alt='hero-img' />
			</div>
			<div className='content-col-1 mb-10 w-full md:mb-0 md:w-1/2'>
				<div className='content-sub-heading'>
					<h2 className='mb-6 text-center text-4xl font-semibold leading-[1.25] text-primaryBlue md:mb-10 md:text-start'>
						{contentCMSData && contentCMSData.contentHeading}
					</h2>
				</div>
				<div className='content-text'>
					<p className='text-center font-normal leading-[1.85] text-darkGrayishBlue md:mr-[35%] md:text-start'>
						{contentCMSData && contentCMSData.contentText}
					</p>
				</div>
			</div>
			<div className='content-col-2 w-full md:w-1/2'>
				<div className='content-bullet-points'>
					{contentCMSData &&
						contentCMSData.contentItem.map((item) => {
							return (
								<div className='content-bullet-point mb-12'>
									<div className='content-bullet-point-heading relative mb-4 flex items-center'>
										<div className='bullet-point-pill mr-2 w-fit rounded-full bg-primaryRed px-6 py-2 font-semibold text-white sm:mr-4'>
											{item.contentItemNumber < 10
												? `0${item.contentItemNumber}`
												: item.contentItemNumber}
										</div>
										<h3 className=' text-normal font-semibold text-primaryBlue'>
											{item.contentItemHeading}
										</h3>
										<div className='content-bullet-text-bg absolute -right-[1rem] top-0 h-full w-full bg-primaryRed/20 md:hidden'></div>
									</div>
									<div className='bullet-point-content md:ml-[5.3rem]'>
										<p className='text-justify font-normal leading-[1.85] text-darkGrayishBlue'>
											{item.contentItemText}
										</p>
									</div>
								</div>
							)
						})}
				</div>
			</div>
		</section>
	)
}
