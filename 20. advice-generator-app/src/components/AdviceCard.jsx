import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-haiku'
import { ReactComponent as DividerDesktop } from '../images/pattern-divider-desktop.svg'
import { ReactComponent as DividerMobile } from '../images/pattern-divider-mobile.svg'
import { ReactComponent as BtnIcon } from '../images/icon-dice.svg'

export default function AdviceCard() {
  const breakpoint = useMediaQuery('(max-width: 600px)')
  const [advice, setAdvice] = useState('')

  const getData = async () => {
    await fetch('https://api.adviceslip.com/advice')
      .then((res) => res.json())
      .then((data) => setAdvice(data.slip))
      .catch((err) => console.log('There was an error!', err))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container">
      <div className="advice-card-wrapper">
        <div className="advice-card-number">
          <h2>{`Advice #${advice.id}`}</h2>
        </div>
        <div className="advice-card-text">
          <h1>"{advice.advice}"</h1>
        </div>
        <div className="advice-card-divider">
          {breakpoint ? <DividerMobile /> : <DividerDesktop />}
        </div>
        <button className="advice-card-btn" onClick={getData}>
          <BtnIcon />
        </button>
      </div>
    </div>
  )
}
