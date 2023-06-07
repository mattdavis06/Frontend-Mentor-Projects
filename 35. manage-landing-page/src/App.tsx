import Header from './components/Header'
import Hero from './components/Hero'
import ContentSection from './components/ContentSection'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<ContentSection />
				<Testimonials />
				<CTASection />
			</main>
			<Footer />
		</>
	)
}

export default App
