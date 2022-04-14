import { createContext, useState } from 'react'

const IPTrackerContext = createContext()

const IP_TRACKER_URL = 'http://ipwhois.app/json/'

export const IPTrackerProvider = ({ children }) => {
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(true)

  // Fetches clients IP address on load
  const initialLoadResult = async () => {
    const res = await fetch(`${IP_TRACKER_URL}`)

    const data = await res.json()

    setResult(data)
    setLoading(false)
  }

  // Fetches input search and updates 'result' state with new fetch data
  const fetchResult = async (search) => {
    const res = await fetch(`${IP_TRACKER_URL}${search}`)

    const data = await res.json()

    if (data.success === true) {
      setResult(data)
    } else {
      return alert(
        'Reserved IP Range. Please enter a valid IP address or domain.'
      )
    }
  }

  return (
    <IPTrackerContext.Provider
      value={{
        result,
        loading,
        initialLoadResult,
        fetchResult,
        setLoading,
      }}
    >
      {children}
    </IPTrackerContext.Provider>
  )
}

export default IPTrackerContext
