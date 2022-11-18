export default function Card({ cardImg, cardNumber, cardTitle, cardText }) {
	return (
		<div className='card flex'>
			<div className='card-img w-2/6'>
				<img
					src={cardImg}
					alt={`${cardTitle.toLowerCase()} card`}
					className='h-full w-full object-cover'
				/>
			</div>
			<div className='card-body w-5/6 pl-5 flex flex-col justify-between'>
				<h3 className='card-number text-4xl font-semibold text-grayishBlue'>
					{cardNumber}
				</h3>
				<a
					href='/'
					className='card-title text-xl font-semibold text-veryDarkBlue hover:text-primaryRed transition ease-in-out'
				>
					{cardTitle}
				</a>
				<p className='card-text text-lg tracking-wide text-darkGrayishBlue'>
					{cardText}
				</p>
			</div>
		</div>
	)
}
