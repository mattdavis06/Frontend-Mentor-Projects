import Header from './components/Header'
import Features from './components/Features'
import Download from './components/Download'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Features />
        <Download />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
