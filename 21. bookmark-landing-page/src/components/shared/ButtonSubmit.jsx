export default function ButtonSubmit(props) {
	return (
		<button
			type='submit'
			value='Cancel'
			className={`${props.bootstrap_class} btn-custom`}
		>
			{props.text}
		</button>
	);
}
