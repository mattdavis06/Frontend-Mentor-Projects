import Nav from "./Nav";
import HeaderImg from "../assets/images/illustration-hero.svg";
import ButtonLg from "./shared/ButtonLg";

export default function Header() {
	return (
		<header className='mb-5'>
			<Nav />
			<div className='container-lg'>
				<div className='row my-3 my-md-5'>
					<div className='col-sm-12 col-md-6 order-2 order-md-1 mt-sm-5 d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start'>
						<h1 className='mb-4'> A Simple Bookmark Manager</h1>
						<p className='mb-4 pe-md-5'>
							A clean and simple interface to organize your favourite websites.
							Open a new browser tab and see your sites load instantly. Try it
							for free.
						</p>
						<div className='cta-btns d-flex align-items-center justify-content-start '>
							<ButtonLg
								bootstrap_class='me-2 btn-blue'
								text='Get it on Chrome'
							/>
							<ButtonLg bootstrap_class='btn-white' text='Get it on Firefox' />
						</div>
					</div>
					<div className='col-sm-12 col-md-6 order-1 order-md-2 mb-5 mb-md-0 position-relative'>
						<div className='bg-pill right position-absolute'></div>
						<img src={HeaderImg} alt='header-img' />
					</div>
				</div>
			</div>
		</header>
	);
}
