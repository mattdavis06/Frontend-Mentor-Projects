import { useEffect, useState } from 'react'
import CardFrontImg from '../assets/images/bg-card-front.png'

export default function CardFront({
	cardDetails: {
		cardHolderName,
		cardHolderNumber,
		cardHolderExpiry_Month,
		cardHolderExpiry_Year,
	},
}) {
	const [formattedCardNumber, setFormattedCardNumber] = useState([])

	const splitString = (str, N) => {
		const arr = []

		for (let i = 0; i < str.length; i += N) {
			arr.push(str.substring(i, i + N))
		}
		setFormattedCardNumber(arr)
	}

	useEffect(() => {
		splitString(cardHolderNumber, 4)
	}, [cardHolderNumber])

	return (
		<div className='card-front self-start absolute top-28 lg:relative lg:top-auto order-2 lg:order-1 z-50 w-[95%] min-[480px]:w-auto'>
			<div className='card-front-wrapper absolute top-0 left-0 flex flex-col justify-between w-[95%] min-[480px]:w-full h-full p-4 sm:p-6 '>
				<div className='card-logo'>
					<svg
						width='84'
						height='47'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<ellipse cx='23.478' cy='23.5' rx='23.478' ry='23.5' fill='#fff' />
						<path
							d='M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z'
							stroke='#fff'
						/>
					</svg>
				</div>
				<div className='card-number flex justify-between w-full text-white pt-10'>
					{cardHolderNumber ? (
						<>
							<span className=' text-lg min-[480px]:text-2xl tracking-widest'>
								{formattedCardNumber[0]}
							</span>
							<span className='text-lg min-[480px]:text-2xl 			tracking-widest'>
								{formattedCardNumber[1]}
							</span>
							<span className='text-lg min-[480px]:text-2xl 			tracking-widest'>
								{formattedCardNumber[2]}
							</span>
							<span className='text-lg min-[480px]:text-2xl 			tracking-widest'>
								{formattedCardNumber[3]}
							</span>
						</>
					) : (
						<>
							<span className=' text-lg min-[480px]:text-2xl tracking-widest'>
								0000
							</span>
							<span className=' text-lg min-[480px]:text-2xl 			tracking-widest'>
								0000
							</span>
							<span className=' text-lg min-[480px]:text-2xl 			tracking-widest'>
								0000
							</span>
							<span className=' text-lg min-[480px]:text-2xl 			tracking-widest'>
								0000
							</span>
						</>
					)}
				</div>
				<div className='card-details flex justify-between text-white'>
					<div className='card-name'>
						<span className='text-xs uppercase tracking-widest'>
							{cardHolderName ? cardHolderName : 'Jane Appleseed'}
						</span>
					</div>
					<div className='card-expiry'>
						<span className='text-xs tracking-widest'>
							{cardHolderExpiry_Month ? cardHolderExpiry_Month : '00'}/
							{cardHolderExpiry_Year ? cardHolderExpiry_Year : '00'}
						</span>
					</div>
				</div>
			</div>
			<img
				src={CardFrontImg}
				alt='card-front'
				className='object-cover w-[95%] min-[480px]:w-auto'
			/>
		</div>
	)
}
