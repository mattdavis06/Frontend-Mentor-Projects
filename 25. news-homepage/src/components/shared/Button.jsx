export default function Button({ btnStyles, btnText }) {
	return <button className={`btn ${btnStyles}`}>{btnText}</button>
}
