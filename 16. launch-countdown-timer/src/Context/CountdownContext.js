import { createContext, useState, useEffect } from 'react'

const CountdownContext = createContext()

export const CountdownProvider = ({ children }) => {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear()
    let difference = +new Date(`06/30/${year}`) - +new Date()

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = [
        {
          id: 1,
          countdownText: 'days',
          countdownValue: Math.floor(difference / (1000 * 60 * 60 * 24)),
        },
        {
          id: 2,
          countdownText: 'hours',
          countdownValue: Math.floor((difference / (1000 * 60 * 60)) % 24),
        },
        {
          id: 3,
          countdownText: 'minutes',
          countdownValue: Math.floor((difference / 1000 / 60) % 60),
        },
        {
          id: 4,
          countdownText: 'seconds',
          countdownValue: Math.floor((difference / 1000) % 60),
        },
      ]
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <CountdownContext.Provider value={{ timeLeft }}>
      {children}
    </CountdownContext.Provider>
  )
}

export default CountdownContext
