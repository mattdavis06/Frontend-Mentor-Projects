import { useContext, useEffect, useState } from 'react'
import CountdownContext from '../Context/CountdownContext'

function Countdown() {
  const { timeLeft } = useContext(CountdownContext)
  const [animationTimeDays, setAnimationTimeDays] = useState(false)
  const [animationTimeHours, setAnimationTimeHours] = useState(false)
  const [animationTimeMinutes, setAnimationTimeMinutes] = useState(false)
  const [animationTimeHourInSeconds] = useState(86400)
  const [animationTimeMinuteInSeconds] = useState(3600)
  const [animationTimeSeconds] = useState(1)

  // Countdown Checks to hit 0, then Updates State if true/false
  const countdownAnimationCheck = () => {
    const secondsValue = timeLeft.find(
      (secs) => secs.countdownText === 'seconds'
    )

    const minutesValue = timeLeft.find(
      (mins) => mins.countdownText === 'minutes'
    )

    const hoursValue = timeLeft.find((hours) => hours.countdownText === 'hours')

    if (secondsValue.countdownValue === 1) {
      setAnimationTimeMinutes(true)
    } else {
      setAnimationTimeMinutes(false)
    }

    if (minutesValue.countdownValue === 0) {
      setAnimationTimeHours(true)
    } else {
      setAnimationTimeHours(false)
    }

    if (hoursValue.countdownValue === 0) {
      setAnimationTimeDays(true)
    } else {
      setAnimationTimeDays(false)
    }

    countdownAnimation()
  }

  const countdownAnimation = () => {
    const daysTop = document.getElementById('countdown-days-top')
    const daysBottom = document.getElementById('countdown-days-bottom')
    const hoursTop = document.getElementById('countdown-hours-top')
    const hoursBottom = document.getElementById('countdown-hours-bottom')
    const minutesTop = document.getElementById('countdown-minutes-top')
    const minutesBottom = document.getElementById('countdown-minutes-bottom')
    const secondsTop = document.getElementById('countdown-seconds-top')
    const secondsBottom = document.getElementById('countdown-seconds-bottom')

    // Minute Animation
    if (animationTimeMinutes) {
      minutesTop.style.animation = `flipCardTop ${animationTimeSeconds}s linear infinite`
      minutesBottom.style.animation = `flipCardBottom ${animationTimeSeconds}s linear infinite`
    } else {
      minutesTop.style.animation = ''
      minutesBottom.style.animation = ''
    }

    // Hour Animation
    if (animationTimeHours) {
      hoursTop.style.animation = `flipCardTop ${animationTimeSeconds}s linear infinite ${animationTimeMinuteInSeconds}s`
      hoursBottom.style.animation = `flipCardBottom ${animationTimeSeconds}s linear infinite ${animationTimeMinuteInSeconds}s`
    } else {
      hoursTop.style.animation = ''
      hoursBottom.style.animation = ''
    }

    // Day Animation
    if (animationTimeDays) {
      daysTop.style.animation = `flipCardTop ${animationTimeSeconds}s linear infinite ${animationTimeHourInSeconds}s`
      daysBottom.style.animation = `flipCardBottom ${animationTimeSeconds}s linear infinite ${animationTimeHourInSeconds}s`
    } else {
      daysTop.style.animation = ''
      daysBottom.style.animation = ''
    }

    // Seconds Animation
    secondsTop.style.animation = `flipCardTop ${animationTimeSeconds}s linear infinite`
    secondsBottom.style.animation = `flipCardBottom ${animationTimeSeconds}s linear infinite`
  }

  useEffect(() => {
    countdownAnimationCheck()
    // eslint-disable-next-line
  }, timeLeft)

  return (
    <div className="countdown-outer-wrapper">
      {timeLeft.map((item) => {
        return (
          <div className="countdown-wrapper" key={item.id}>
            <div className="countdown-card">
              <div className="countdown-card-top"></div>
              <div
                id={`countdown-${item.countdownText}-top`}
                className={'countdown-card-top flip-top'}
              >
                <span>
                  {item.countdownValue > 9
                    ? item.countdownValue
                    : `0${item.countdownValue}`}
                </span>
              </div>
              <div className="countdown-card-bottom"></div>
              <div
                id={`countdown-${item.countdownText}-bottom`}
                className={'countdown-card-bottom flip-bottom'}
              >
                <span>
                  {item.countdownValue > 9
                    ? item.countdownValue
                    : `0${item.countdownValue}`}
                </span>
              </div>
              <div className="countdown">
                <span>
                  {item.countdownValue > 9
                    ? item.countdownValue
                    : `0${item.countdownValue}`}
                </span>
              </div>
            </div>
            <small>{item.countdownText}</small>
          </div>
        )
      })}
    </div>
  )
}

export default Countdown
