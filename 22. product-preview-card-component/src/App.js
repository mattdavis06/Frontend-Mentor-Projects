import { useState } from 'react'
import Card from './components/Card'

function App() {
	const [productData] = useState({
		id: 1,
		type: 'perfume',
		title: 'Gabrielle Essence Eau De Parfum',
		description:
			'A floral, solar and voluptuous interpretation composed Olivier Polge, Perfumer-Creator for the House of CHANEL.',
		price: '$149.99',
		rrp: '$169.99,',
	})

	const { type, title, description, price, rrp } = productData

	return (
		<div className='App'>
			<Card
				type={type}
				title={title}
				description={description}
				price={price}
				rrp={rrp}
			/>
		</div>
	)
}

export default App
