import FeaturesImg1 from '../assets/images/illustration-features-tab-1.svg'
import FeaturesImg2 from '../assets/images/illustration-features-tab-2.svg'
import FeaturesImg3 from '../assets/images/illustration-features-tab-3.svg'
import ButtonSm from './shared/ButtonSm'

export default function TabbedFeatures({ active }) {
	return (
		<>
			<div
				className={`row feature position-relative ${
					active === 0 ? 'active' : ''
				}`}
			>
				<div className='col-12 col-lg-6 text-center text-lg-left pt-2 pb-5'>
					<img src={FeaturesImg1} alt='features-img' className='img-fluid' />
					<div className='bg-pill left position-absolute'></div>
				</div>
				<div className='col-12 col-lg-6 text-center text-lg-left pt-5 pt-lg-2 pb-5 pl-lg-5 d-flex flex-column align-items-start justify-content-center'>
					<div className='features-details  '>
						<h4 className='mb-4'>Bookmark in one click</h4>
						<p className='mb-4 px-5 px-lg-0'>
							Organize your bookmarks however you like. Our simple drag-and-drop
							interface gives you complete control over how you manage your
							favourite sites.
						</p>
						<ButtonSm
							bootstrap_class='btn-blue d-none d-lg-flex'
							text='More Info'
						/>
					</div>
				</div>
			</div>
			<div
				className={`row feature position-relative ${
					active === 1 ? 'active' : ''
				}`}
			>
				<div className='col-12 col-lg-6 text-center text-lg-left pt-2 pb-5'>
					<img src={FeaturesImg2} alt='features-img' className='img-fluid' />
					<div className='bg-pill left position-absolute'></div>
				</div>
				<div className='col-12 col-lg-6 text-center text-lg-left pt-5 pt-lg-2 pb-5 pl-lg-5 d-flex flex-column align-items-start justify-content-center'>
					<div className='features-details  '>
						<h4 className='mb-4'>Intelligent search</h4>
						<p className='mb-4 px-5 px-lg-0'>
							Our powerful search feature will help you find saved sites in no
							time at all. No need to trawl through all of your bookmarks.
						</p>
						<ButtonSm
							bootstrap_class='btn-blue d-none d-lg-flex'
							text='More Info'
						/>
					</div>
				</div>
			</div>
			<div
				className={`row feature position-relative ${
					active === 2 ? 'active' : ''
				}`}
			>
				<div className='col-12 col-lg-6 text-center text-lg-left pt-2 pb-5'>
					<img src={FeaturesImg3} alt='features-img' className='img-fluid' />
					<div className='bg-pill left position-absolute'></div>
				</div>
				<div className='col-12 col-lg-6 text-center text-lg-left pt-5 pt-lg-2 pb-5 pl-lg-5 d-flex flex-column align-items-start justify-content-center'>
					<div className='features-details  '>
						<h4 className='mb-4'>Share your bookmarks</h4>
						<p className='mb-4 px-5 px-lg-0'>
							Easily share your bookmarks and collections with others. Create a
							shareable link that you can send at the click of a button.
						</p>
						<ButtonSm
							bootstrap_class='btn-blue d-none d-lg-flex'
							text='More Info'
						/>
					</div>
				</div>
			</div>
		</>
	)
}
