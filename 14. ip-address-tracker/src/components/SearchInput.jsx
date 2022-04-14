import { useContext, useState } from 'react'
import { isIP } from 'is-ip'
import Icon from '../images/icon-arrow.svg'
import Alert from './Alert'
import IPTrackerContext from '../context/IPTrackerContext'
import useWindowDimensions from './ScreenWidth'

function SearchInput() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const { fetchResult } = useContext(IPTrackerContext)

  const { width } = useWindowDimensions()

  const isValidDomain = require('is-valid-domain')

  let placeholderText = 'Search for any IP address or domain'
  // Updates input placeholder on screenWidth
  if (width <= 570) {
    placeholderText = 'Search for any IP address...'
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (search === '') {
      setError(true)
      setErrorMsg('Please enter a search')

      setTimeout(() => {
        setError(false)
      }, 2000)
      // Checks input value through isIP and isValidDomain
    } else if (isIP(search) || isValidDomain(search)) {
      fetchResult(search)
    } else {
      setError(true)
      setErrorMsg('Please enter a valid IP or domain')

      setTimeout(() => {
        setError(false)
      }, 2000)
    }

    setSearch('')
  }

  return (
    <>
      <form className="form-control" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          placeholder={placeholderText}
          value={search}
          onChange={handleChange}
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = placeholderText)}
        />
        <label htmlFor="search"></label>
        <button className="input-btn">
          <img src={Icon} alt="input-button" />
        </button>
        <Alert error={error} text={errorMsg} />
      </form>
    </>
  )
}

export default SearchInput
