export default function Card({
	card_id,
	img,
	card_heading,
	card_text,
	btn_id,
	btn_text,
}) {
	return (
		<div className='col'>
			<div className={`card card-${card_id}`}>
				<div className='card-header-icon'>
					<img src={img} alt='sedans-icon' />
				</div>
				<div className='card-heading'>
					<h1>{card_heading}</h1>
				</div>
				<div className='card-body'>
					<p>{card_text}</p>
				</div>
				<div className='card-cta'>
					<div className={`btn btn-${btn_id}`}>
						<a href='/#'>{btn_text}</a>
					</div>
				</div>
			</div>
		</div>
	)
}
