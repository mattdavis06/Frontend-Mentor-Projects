import { navSocialLinks } from '../../data/data'

export default function FooterSocials({ customClass }) {
	return (
		<div className={`footer-social-links ${customClass}`}>
			<ul className='flex items-end'>
				{navSocialLinks.map((socialLink) => {
					return (
						<li className='group/link relative mx-2' key={socialLink.id}>
							<a href='/*'>
								<img src={socialLink.linkImage} alt={socialLink.linkAltText} />
								<span className='absolute left-1/2 -bottom-2.5 hidden h-[2px] w-full -translate-x-2/4 bg-white transition group-hover/link:flex'></span>
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
