import CardImg_01 from '../assets/images/image-retro-pcs.jpg'
import CardImg_02 from '../assets/images/image-top-laptops.jpg'
import CardImg_03 from '../assets/images/image-gaming-growth.jpg'

const navLinks = [
	{
		linkName: 'Home',
		linkTarget: '/',
	},
	{
		linkName: 'New',
		linkTarget: '/',
	},
	{
		linkName: 'Popular',
		linkTarget: '/',
	},
	{
		linkName: 'Trending',
		linkTarget: '/',
	},
	{
		linkName: 'Categories',
		linkTarget: '/',
	},
]

const latestNews = [
	{
		newsTitle: 'Hydrogen VS Electric Cars',
		newsLeadText: 'Will hydrogen-fueled cars ever catch up to EVs?',
	},
	{
		newsTitle: 'The Downsides of AI Artistry',
		newsLeadText:
			'What are the possible adverse effects of on-demand AI image generation?',
	},
	{
		newsTitle: 'Is VC Funding Drying Up?',
		newsLeadText:
			'Private funding by VC firms is down 50% YOY. We take a look at what that means.',
	},
]

const cardsData = [
	{
		cardImg: CardImg_01,
		cardNumber: '01',
		cardTitle: 'Reviving Retro PCs',
		cardText: 'What happens when old PCs are given modern upgrades?',
	},
	{
		cardImg: CardImg_02,
		cardNumber: '02',
		cardTitle: 'Top 10 Laptops of 2022',
		cardText: 'Our best picks for various needs and budgets.',
	},
	{
		cardImg: CardImg_03,
		cardNumber: '03',
		cardTitle: 'The Growth of Gaming',
		cardText: 'How the pandemic has sparked fresh opportunities.',
	},
]

export { navLinks, latestNews, cardsData }
