import CardBackImg from '../assets/images/bg-card-back.png'

export default function CardBack({ cardDetails: { cardHolderCVC } }) {
	return (
		<div className='card-back flex justify-end md:self-end absolute top-2 lg:top-auto lg:relative order-1 lg:order-2 w-[95%] min-[480px]:w-auto'>
			<div className='card-back-wrapper absolute top-[40%] right-[9%] flex items-center justify-end w-[81%] h-[18%] px-5'>
				<span className='text-sm tracking-wider text-white'>
					{cardHolderCVC ? cardHolderCVC : '000'}
				</span>
			</div>
			<img
				src={CardBackImg}
				alt='card-back'
				className='object-cover w-[95%] min-[480px]:w-auto'
			/>
		</div>
	)
}
