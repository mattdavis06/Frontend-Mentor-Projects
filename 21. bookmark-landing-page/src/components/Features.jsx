import { useState } from "react";
import TabbedFeatures from "./TabbedFeatures";

export default function Features() {
	const [active, setActive] = useState(0);

	return (
		<section id='features' className='features my-5'>
			<div className='container-lg'>
				<div className='row'>
					<div className='features-content text-center w-100'>
						<h2 className='mb-3'>Features</h2>
						<p className='px-2'>
							Our aim is to make it quick and easy for you to access your
							<br className='d-none d-md-block' />
							favourite websites. Your bookmarks sync between your devices so
							<br className='d-none d-md-block' />
							you can access them on the go.
						</p>
					</div>
					<div className='d-none d-md-flex col-md-2'></div>
					<div className='col-md-8 my-5'>
						<div className='features-headings d-flex align-items-center flex-column flex-md-row'>
							<div
								className={`${
									active === 0 ? "active" : ""
								} feature-heading w-100 text-center d-flex justify-content-center`}
								id='1'
								onClick={() => {
									setActive(0);
								}}
							>
								<h3 className='py-4 w-100'>Simple Bookmarking</h3>
							</div>
							<div
								className={`${
									active === 1 ? "active" : ""
								} feature-heading w-100 text-center d-flex justify-content-center`}
								onClick={() => {
									setActive(1);
								}}
							>
								<h3 className='py-4 w-100'>Speedy Searching</h3>
							</div>
							<div
								className={`${
									active === 2 ? "active" : ""
								} feature-heading w-100 text-center d-flex justify-content-center`}
								onClick={() => {
									setActive(2);
								}}
							>
								<h3 className='py-4 w-100'>Easy Sharing</h3>
							</div>
						</div>
					</div>
					<div className='d-none d-md-flex col-md-2'></div>
				</div>
				<TabbedFeatures active={active} />
			</div>
		</section>
	);
}
