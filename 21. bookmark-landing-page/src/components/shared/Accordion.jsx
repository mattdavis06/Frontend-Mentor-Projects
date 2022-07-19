import { useState } from "react";
import ArrowIcon from "../../assets/images/icon-arrow.svg";
import ArrowIconRed from "../../assets/images/icon-arrow-red.svg";

export default function Accordion({ question, answer, id }) {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className='accordion' key={id}>
			<div
				className='accordion-header py-4 d-flex align-items-center justify-content-between'
				onClick={() => setIsActive(!isActive)}
			>
				<h5 className='mb-0'>{question}</h5>
				<img
					src={isActive ? ArrowIconRed : ArrowIcon}
					alt='arrow-icon'
					className={`accordion-icon ${isActive ? "active" : ""}`}
				/>
			</div>
			{isActive && (
				<div className='accordion-content py-3'>
					<p>{answer}</p>
				</div>
			)}
		</div>
	);
}
