import { v4 as uuidv4 } from 'uuid'

import DesktopImage1 from '../assets/images/desktop/image-deep-earth.jpg'
import DesktopImage2 from '../assets/images/desktop/image-night-arcade.jpg'
import DesktopImage3 from '../assets/images/desktop/image-soccer-team.jpg'
import DesktopImage4 from '../assets/images/desktop/image-grid.jpg'
import DesktopImage5 from '../assets/images/desktop/image-from-above.jpg'
import DesktopImage6 from '../assets/images/desktop/image-pocket-borealis.jpg'
import DesktopImage7 from '../assets/images/desktop/image-curiosity.jpg'
import DesktopImage8 from '../assets/images/desktop/image-fisheye.jpg'

import MobileImage1 from '../assets/images/mobile/image-deep-earth.jpg'
import MobileImage2 from '../assets/images/mobile/image-night-arcade.jpg'
import MobileImage3 from '../assets/images/mobile/image-soccer-team.jpg'
import MobileImage4 from '../assets/images/mobile/image-grid.jpg'
import MobileImage5 from '../assets/images/mobile/image-from-above.jpg'
import MobileImage6 from '../assets/images/mobile/image-pocket-borealis.jpg'
import MobileImage7 from '../assets/images/mobile/image-curiosity.jpg'
import MobileImage8 from '../assets/images/mobile/image-fisheye.jpg'

import FbLogo from '../assets/images/icon-facebook.svg'
import TwitterLogo from '../assets/images/icon-twitter.svg'
import PinterestLogo from '../assets/images/icon-pinterest.svg'
import InstaLogo from '../assets/images/icon-instagram.svg'

const navLinks = [
	{
		id: uuidv4(),
		linkItem: 'About',
	},
	{
		id: uuidv4(),
		linkItem: 'Careers',
	},
	{
		id: uuidv4(),
		linkItem: 'Events',
	},
	{
		id: uuidv4(),
		linkItem: 'Products',
	},
	{
		id: uuidv4(),
		linkItem: 'Support',
	},
]

const creationsGridItems = [
	{
		id: uuidv4(),
		gridItemText: 'Deep Earth',
		gridItemImg_d: DesktopImage1,
		gridItemImg_m: MobileImage1,
	},
	{
		id: uuidv4(),
		gridItemText: 'Night Arcade',
		gridItemImg_d: DesktopImage2,
		gridItemImg_m: MobileImage2,
	},
	{
		id: uuidv4(),
		gridItemText: 'Soccer Team VR',
		gridItemImg_d: DesktopImage3,
		gridItemImg_m: MobileImage3,
	},
	{
		id: uuidv4(),
		gridItemText: 'The Grid',
		gridItemImg_d: DesktopImage4,
		gridItemImg_m: MobileImage4,
	},
	{
		id: uuidv4(),
		gridItemText: 'From Up Above VR',
		gridItemImg_d: DesktopImage5,
		gridItemImg_m: MobileImage5,
	},
	{
		id: uuidv4(),
		gridItemText: 'Pocket Borealis',
		gridItemImg_d: DesktopImage6,
		gridItemImg_m: MobileImage6,
	},
	{
		id: uuidv4(),
		gridItemText: 'The Curiosity',
		gridItemImg_d: DesktopImage7,
		gridItemImg_m: MobileImage7,
	},
	{
		id: uuidv4(),
		gridItemText: 'Make It Fisheye',
		gridItemImg_d: DesktopImage8,
		gridItemImg_m: MobileImage8,
	},
]

const navSocialLinks = [
	{
		id: uuidv4(),
		linkImage: FbLogo,
		linkAltText: 'facebook-logo',
	},
	{
		id: uuidv4(),
		linkImage: TwitterLogo,
		linkAltText: 'twitter-logo',
	},
	{
		id: uuidv4(),
		linkImage: PinterestLogo,
		linkAltText: 'pinterest-logo',
	},
	{
		id: uuidv4(),
		linkImage: InstaLogo,
		linkAltText: 'instagram-logo',
	},
]

export { navLinks, creationsGridItems, navSocialLinks }
