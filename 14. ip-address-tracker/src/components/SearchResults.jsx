import { useContext, useEffect } from 'react'
import IPTrackerContext from '../context/IPTrackerContext'

function SearchResults() {
  const { result, loading, initialLoadResult } = useContext(IPTrackerContext)

  useEffect(() => {
    initialLoadResult()
  }, [])

  if (loading) {
    return (
      <div className="results-container">
        <div className="results-wrapper">
          <div className="ip-address">
            <h2>IP Address</h2>
            <h3>{result.ip}</h3>
          </div>
          <div className="results-divider"></div>
          <div className="location">
            <h2>Location</h2>
            <h3>
              {result.city}, {result.region}
              <span> {result.country_code}</span>
            </h3>
          </div>
          <div className="results-divider"></div>
          <div className="timezone">
            <h2>Timezone</h2>
            <h3>GMT {result.timezone_gmt}</h3>
          </div>
          <div className="results-divider"></div>
          <div className="provider">
            <h2>ISP</h2>
            <h3>{result.org}</h3>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="results-container">
        <div className="results-wrapper">
          <div className="ip-address">
            <h2>IP Address</h2>
            <h3>{result.ip}</h3>
          </div>
          <div className="results-divider"></div>
          <div className="location">
            <h2>Location</h2>
            <h3>
              {result.city}, {result.region}
              <span> {result.country_code}</span>
            </h3>
          </div>
          <div className="results-divider"></div>
          <div className="timezone">
            <h2>Timezone</h2>
            <h3>GMT {result.timezone_gmt}</h3>
          </div>
          <div className="results-divider"></div>
          <div className="provider">
            <h2>ISP</h2>
            <h3>{result.org}</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResults
