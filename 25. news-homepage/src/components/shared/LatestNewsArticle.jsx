export default function LatestNewsArticle({ title, leadText }) {
	return (
		<div className='latest-news-article py-5 lg:py-4 xl:py-5 border-b border-grayishBlue last:border-b-0'>
			<div className='latest-news-title mb-3'>
				<a
					href='/'
					className='text-2xl lg:text-xl xl-text-2xl font-semibold text-offWhite cursor-pointer hover:text-primaryOrange transition ease-in-out'
				>
					{title}
				</a>
			</div>
			<div className='latest-news-lead-text'>
				<p className='text-lg lg:text-base xl:text-lg tracking-wide text-grayishBlue'>
					{leadText}
				</p>
			</div>
		</div>
	)
}
