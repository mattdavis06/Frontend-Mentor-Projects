import { cardsData } from './data/data'
import uuid from 'react-uuid'
import Nav from './components/Nav'
import MainConent from './components/MainConent'
import LatestNewsAside from './components/LatestNewsAside'
import Card from './components/shared/Card'

function App() {
	return (
		<div className='container flex h-auto lg:h-screen max-w-screen-2xl p-3 py-7 lg:px-12 xl:px-24'>
			<div className='homepage-wrapper my-auto h-auto lg:h-4/5 w-full grid gap-7 md:gap-4 lg:gap-7 grid-cols-1  lg:grid-cols-3 grid-rows-[40px_1fr_500px_160px] lg:grid-rows-[100px_repeat(2,minmax(260px,_260px))_160px]'>
				<Nav />
				<MainConent />
				<LatestNewsAside />
				{cardsData.map((card) => {
					return (
						<Card
							key={uuid()}
							cardImg={card.cardImg}
							cardNumber={card.cardNumber}
							cardTitle={card.cardTitle}
							cardText={card.cardText}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default App
