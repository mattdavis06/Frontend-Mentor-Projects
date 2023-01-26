import { Fragment } from 'react'
import Header from './components/Header'
import SectionOne from './components/SectionOne'
import SectionTwo from './components/SectionTwo'
import SectionThree from './components/SectionThree'
import Footer from './components/Footer/Footer'

function App() {
	return (
		<Fragment>
			<Header />
			<SectionOne />
			<SectionTwo />
			<SectionThree />
			<Footer />
		</Fragment>
	)
}

export default App
