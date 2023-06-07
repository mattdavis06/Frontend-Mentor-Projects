import { useState, useEffect } from 'react'
import getCMSData from '../lib/getCMSData'
import Btn from './shared/Btn'

type HeroCMSData = {
	id: string
	heroHeading: string
	heroText: string
	heroImg: {
		url: string
	}
	heroCtaBtn: {
		linkText: string
		linkUrl: string
	}
}

export default function Hero() {
	const [heroCMSData, setHeroCMSData] = useState<HeroCMSData | null>(null)
	const fetchQuery = `	
	{
		heroSections {
			id
			heroHeading
			heroText
			heroImg {
			  url
			}
			heroCtaBtn {
			  linkText
			  linkUrl
			}
		  }
	}
  `
	useEffect(() => {
		getCMSData(fetchQuery).then((data) => {
			setHeroCMSData({ ...data.heroSections[0] })
		})
	}, [fetchQuery])

	return (
		<section
			id='_heroSection'
			className='app-wrapper py-12 md:flex md:items-center lg:py-20'
		>
			<div className='hero-img w-full md:order-2 md:w-1/2'>
				{heroCMSData && <img src={heroCMSData.heroImg.url} alt='hero-img' />}
			</div>
			<div className='hero-content w-full md:order-1 md:w-1/2'>
				<div className='hero-heading md: pb-4 md:pb-10'>
					<h1 className=' text-center text-4xl font-semibold leading-[1.25] text-primaryBlue md:text-left md:text-5xl md:leading-[1.25]'>
						{heroCMSData && heroCMSData.heroHeading}
					</h1>
				</div>
				<div className='hero-text pb-8 md:w-2/3 md:pb-10'>
					<p className='text-center font-normal leading-[1.85] text-darkGrayishBlue md:text-left'>
						{heroCMSData && heroCMSData.heroText}
					</p>
				</div>
				<div className='hero-btn flex items-center justify-center md:justify-start'>
					{heroCMSData && (
						<Btn
							bgColor={'bg-primaryRed'}
							textColor={'text-white'}
							btnText={heroCMSData.heroCtaBtn.linkText}
							btnLink={heroCMSData.heroCtaBtn.linkUrl}
						/>
					)}
				</div>
			</div>
		</section>
	)
}
