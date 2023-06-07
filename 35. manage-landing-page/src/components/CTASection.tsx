import { useEffect, useState } from 'react'
import getCMSData from '../lib/getCMSData'
import BgMobile from '../assets/images/bg-simplify-section-mobile.svg'
import BgDesktop from '../assets/images/bg-simplify-section-desktop.svg'
import Btn from './shared/Btn'

type CtaSection = {
	id: string
	ctaHeading: string
	ctaSectionBtn: {
		linkText: string
		linkUrl: string
	}
}

export default function CTASection() {
	const [ctaSectionCMSData, setCTASectionCMSData] = useState<CtaSection | null>(
		null
	)
	const fetchQuery = `	
	{
	    ctaSections {
			id
			ctaHeading
			ctaSectionBtn {
			  linkText
			  linkUrl
			}
		  }
	}
	`

	useEffect(() => {
		getCMSData(fetchQuery).then((data) => {
			setCTASectionCMSData({ ...data.ctaSections[0] })
		})
	}, [fetchQuery])

	return (
		<section
			id='_ctaSection'
			className='relative bg-primaryRed
        '
		>
			<div className='cta-bg absolute left-0 top-[40px] -z-10 h-full w-full overflow-hidden md:left-[120px] md:top-0'>
				<img src={BgMobile} alt='bg' className='md:hidden' />
				<img src={BgDesktop} alt='bg' className='hidden md:block' />
			</div>
			<div className='app-wrapper flex flex-col items-center justify-between  md:flex-row '>
				<div className='cta-heading mb-6 md:mb-0'>
					<h5 className='w-full px-20 text-center text-4xl font-semibold leading-snug text-white md:max-w-[60%] md:px-0 md:text-start md:text-3xl'>
						{ctaSectionCMSData && ctaSectionCMSData.ctaHeading}
					</h5>
				</div>
				<div className='cta-btn'>
					{ctaSectionCMSData && (
						<Btn
							bgColor={'bg-white'}
							textColor={'text-primaryRed'}
							btnText={ctaSectionCMSData.ctaSectionBtn.linkText}
							btnLink={ctaSectionCMSData.ctaSectionBtn.linkUrl}
						/>
					)}
				</div>
			</div>
		</section>
	)
}
