import { useState, useEffect } from 'react'
import getCMSData from '../lib/getCMSData'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

type TestimonialSection = {
	id: string
	testimonalImage: {
		url: string
	}
	testimonalUser: string
	testimonalText: string
}

export default function Testimonials() {
	const [testionalCMSData, setTestimonalCMSData] = useState<
		TestimonialSection[] | null
	>(null)
	const fetchQuery = `	
	{
		testimonialSections {
			id
			testimonalImage {
			  url
			}
			testimonalUser
			testimonalText
		  }
	}
  `
	useEffect(() => {
		getCMSData(fetchQuery).then((data) => {
			setTestimonalCMSData([...data.testimonialSections])
		})
	}, [fetchQuery])
	const settings = {
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000,
		infinite: true,
		centerMode: true,
		centerPadding: '0px',
		variableWidth: true,
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1050,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	}

	return (
		<section id='_testimonials'>
			<div className='testimonals-heading'>
				<h4 className='text-center text-3xl font-semibold text-primaryBlue'>
					What they’ve said
				</h4>
			</div>
			<div className='testimonals-carousel pb-28 pt-16'>
				{testionalCMSData && (
					<Slider {...settings}>
						{testionalCMSData.map((item) => {
							return (
								<div
									key={item.id}
									className='testimonal relative mt-[50px] min-h-[230px] shrink-0 space-y-6 rounded-sm bg-veryLightGray p-8'
								>
									<div className='testimonal-avatar'>
										<img
											src={item.testimonalImage.url}
											alt={`${item.testimonalUser
												.toLowerCase()
												.replace(' ', '-')}-avatar`}
											className='absolute -top-[35px] left-[50%] h-[75px] w-[75px] translate-x-[-50%]'
										/>
									</div>
									<div className='tesimonal-user text-center'>
										<h5 className='font-semibold text-primaryBlue'>
											{item.testimonalUser}
										</h5>
									</div>
									<div className='testimonial-text text-center'>
										<p className='text-darkGrayishBlue'>
											{item.testimonalText}
										</p>
									</div>
								</div>
							)
						})}
					</Slider>
				)}
			</div>
		</section>
	)
}
