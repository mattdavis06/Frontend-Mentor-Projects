import { useState } from 'react'
import Background from './components/Background'
import CardFront from './components/CardFront'
import CardBack from './components/CardBack'
import CardForm from './components/CardForm'

function App() {
	const [cardDetails, setCardDetails] = useState({
		cardHolderName: '',
		cardHolderNumber: '',
		cardHolderExpiry_Month: '',
		cardHolderExpiry_Year: '',
		cardHolderCVC: '',
	})

	return (
		<>
			<Background />
			<section
				id='main_content'
				className='absolute top-0 left-0 w-full h-full'
			>
				<div className='container h-full w-full grid items-center'>
					<div className='grid grid-cols-1 lg:grid-cols-[530px_minmax(0,_1fr)] grid-rows-[340px_minmax(0,_1fr)] lg:grid-rows-1 h-100 px-1 sm:px-0'>
						<div className='card-wrapper flex flex-col items-end lg:justify-center px-1 sm:px-10 md:px-20 lg:px-0 lg:gap-8'>
							<CardFront cardDetails={cardDetails} />
							<CardBack cardDetails={cardDetails} />
						</div>
						<CardForm
							cardDetails={cardDetails}
							setCardDetails={setCardDetails}
						/>
					</div>
				</div>
			</section>
		</>
	)
}

export default App
