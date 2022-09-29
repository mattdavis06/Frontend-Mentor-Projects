import cardData from './data/cardData.js'
import Card from './components/Card'

function App() {
	return (
		<div className='container'>
			<div className='card-wrapper'>
				<div className='row'>
					{cardData.map((item) => {
						return (
							<Card
								card_id={item.id}
								img={item.cardIcon}
								card_heading={item.cardHeading}
								card_text={item.cardText}
								btn_id={item.id}
								btn_text={item.cardBtnText}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default App
