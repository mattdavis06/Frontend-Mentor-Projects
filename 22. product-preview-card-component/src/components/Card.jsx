import { useMediaQuery } from 'react-haiku'
import ProductImgDesktop from '../assets/images/image-product-desktop.jpg'
import ProductImgMobile from '../assets/images/image-product-mobile.jpg'
import { ReactComponent as CartIcon } from '../assets/images/icon-cart.svg'
import Attribution from './Attribution'

export default function Card({ type, title, description, price, rrp }) {
	const breakpoint = useMediaQuery('(max-width: 580px)')

	return (
		<>
			<div className='card-wrapper'>
				<div className='col'>
					<div className='card-img'>
						<img
							src={breakpoint ? ProductImgMobile : ProductImgDesktop}
							alt='product-img'
							draggable='false'
						/>
					</div>
				</div>
				<div className='col'>
					<div className='card-content'>
						<div className='product-type'>
							<p>{type}</p>
						</div>
						<div className='product-title'>
							<h1>{title}</h1>
						</div>
						<div className='product-description'>
							<p>{description}</p>
						</div>
						<div className='product-price-wrapper'>
							<h2 className='product-price'>{price}</h2>
							<h3 className='product-rrp'>{rrp}</h3>
						</div>
						<button className='btn add-to-cart'>
							<CartIcon /> Add To Cart
						</button>
					</div>
				</div>
			</div>
			<Attribution />
		</>
	)
}
