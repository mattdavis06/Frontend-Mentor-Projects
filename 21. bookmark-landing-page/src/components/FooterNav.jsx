import { ReactComponent as LogoFooter } from '../assets/images/logo-bookmark-footer.svg'
import { ReactComponent as FbIcon } from '../assets/images/icon-facebook.svg'
import { ReactComponent as TwitterIcon } from '../assets/images/icon-twitter.svg'
import Attribution from './Attribution'

export default function FooterNav() {
	return (
		<div className='footer-nav pt-5 pb-3'>
			<div className='container-lg'>
				<div className='row mb-5'>
					<nav className='d-flex align-items-center justify-content-between flex-column flex-md-row'>
						<div className='footer-nav-wrapper d-flex align-items-center flex-column flex-md-row'>
							<a href='#/' className='navbar-brand me-md-5'>
								<LogoFooter />
							</a>
							<ul className='navbar-nav nav-footer d-flex flex-row align-items-center flex-column flex-md-row my-4 my-md-0'>
								<li className='nav-item mt-1 mx-4'>
									<a className='nav-link' href='#/'>
										Features
									</a>
								</li>
								<li className='nav-item mt-1 mx-4'>
									<a className='nav-link' href='#/'>
										Pricing
									</a>
								</li>
								<li className='nav-item mt-1 mx-4'>
									<a className='nav-link' href='#/'>
										Contact
									</a>
								</li>
							</ul>
						</div>
						<div className='navbar-social-icons d-flex align-items-center'>
							<div className='icon fb mx-4'>
								<a href='#/'>
									<FbIcon />
								</a>
							</div>
							<div className='icon twitter mx-4'>
								<a href='#/'>
									<TwitterIcon />
								</a>
							</div>
						</div>
					</nav>
				</div>
				<div className='row'>
					<div className='col'>
						<Attribution />
					</div>
				</div>
			</div>
		</div>
	)
}
