export default function Button({ customClass, btnText }) {
	return (
		<div className={`btn btn-primary ${customClass}`}>
			<a href='/*' className='mt-1'>
				{btnText}
			</a>
		</div>
	)
}
