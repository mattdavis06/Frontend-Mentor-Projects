import './index.css'
import Header from './components/Header'
import SearchResults from './components/SearchResults'
import Map from './components/Map'
import { IPTrackerProvider } from './context/IPTrackerContext'

function App() {
  return (
    <>
      <IPTrackerProvider>
        <Header />
        <SearchResults />
        <Map />
      </IPTrackerProvider>
    </>
  )
}

export default App
