import uuid from 'react-uuid'
import LatestNewsArticle from './shared/LatestNewsArticle'
import { latestNews } from '../data/data'

export default function LatestNewsAside() {
	return (
		<aside className='row-span-1 px-5 py-8 lg:col-span-1 lg:row-span-2 bg-veryDarkBlue'>
			<div className='latest-news-heading mb-4 lg:mb-2 xl:mb-4'>
				<h2 className='text-4xl 2xl:text-5xl font-semibold tracking-wide text-primaryOrange'>
					New
				</h2>
			</div>
			<div className='latest-news-articles flex flex-col'>
				{latestNews.map((newsItem) => {
					return (
						<LatestNewsArticle
							key={uuid()}
							title={newsItem.newsTitle}
							leadText={newsItem.newsLeadText}
						/>
					)
				})}
			</div>
		</aside>
	)
}
