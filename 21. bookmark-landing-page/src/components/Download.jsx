import ChromeLogo from "../assets/images/logo-chrome.svg";
import FirefoxLogo from "../assets/images/logo-firefox.svg";
import OperaLogo from "../assets/images/logo-opera.svg";
import Dots from "../assets/images/bg-dots.svg";
import ButtonLg from "./shared/ButtonLg";
import { useState } from "react";

export default function Download() {
	const [cardData] = useState([
		{
			id: 1,
			logo: ChromeLogo,
			title: "Add to Chrome",
			text: "Minimum version 62",
			alignSelf: "align-self-start",
			btnText: "Add & Install Extension",
		},
		{
			id: 2,
			logo: FirefoxLogo,
			title: "Add to Firefox",
			text: "Minimum version 55",
			alignSelf: "align-self-center",
			btnText: "Add & Install Extension",
		},
		{
			id: 3,
			logo: OperaLogo,
			title: "Add to Opera",
			text: "Minimum version 46",
			alignSelf: "align-self-end",
			btnText: "Add & Install Extension",
		},
	]);
	return (
		<section id='download' className='download'>
			<div className='container-lg'>
				<div className='row justify-content-center'>
					<div className='col-12 download-content w-100 text-center'>
						<h2 className='mb-3'>Download the extension</h2>
						<p>
							We’ve got more browsers in the pipeline. Please do let us know if
							<br className='d-none d-md-block' />
							you’ve got a favourite you’d like us to prioritize.
						</p>
					</div>
					<div className='row w-100 mt-4'>
						{cardData.map((card) => {
							return (
								<div
									className={`${card.alignSelf} col-12 col-sm-6 col-md-4`}
									key={card.id}
								>
									<div className='card text-center pt-4 px-3 border-0 shadow position-relative'>
										<div className='card-body'>
											<img src={card.logo} alt='chrome-logo' className='mb-5' />
											<h4 className='card-title'>{card.title}</h4>
											<p className='card-text'>{card.text}</p>
											<div className='card-dotted-line-break position-absolute'>
												<img
													src={Dots}
													alt='dotted-line-break'
													className='img-fluid w-100'
												/>
											</div>
											<ButtonLg
												bootstrap_class='mr-2 btn-blue w-100'
												text={card.btnText}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
