import { useState } from "react";
import Accordion from "./shared/Accordion";
import ButtonSm from "./shared/ButtonSm";

export default function FAQ() {
	const [accordionData] = useState([
		{
			id: 1,
			question: "What is Bookmark?",
			answer:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.",
		},
		{
			id: 2,
			question: "How can I request a new browser?",
			answer:
				"Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.",
		},
		{
			id: 3,
			question: "Is there a mobile app?",
			answer:
				"Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum.",
		},
		{
			id: 4,
			question: "What about other Chromium browsers?",
			answer:
				"  Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.",
		},
	]);
	return (
		<section id='faq' className='faq mt-2 mb-5'>
			<div className='container-lg'>
				<div className='row'>
					<div className='col w-100 text-center'>
						<h2 className='mb-3'>Frequently Asked Questions</h2>
						<p>
							Here are some of our FAQs. If you have any other questions
							<br className='d-none d-md-block' />
							you’d like answered please feel free to email us.
						</p>
					</div>
				</div>
				<div className='row flex-column align-items-center my-5'>
					<div className='col-11 col-md-8'>
						<div className='accordion-wrapper mb-4'>
							{accordionData.map(({ question, answer, id }) => {
								return (
									<Accordion question={question} answer={answer} key={id} />
								);
							})}
						</div>
					</div>
					<ButtonSm bootstrap_class='btn-blue' text='More Info' />
				</div>
			</div>
		</section>
	);
}
