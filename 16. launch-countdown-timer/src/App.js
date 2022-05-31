import { CountdownProvider } from './Context/CountdownContext'
import Background from './components/Background'
import Title from './components/Title'
import Countdown from './components/Countdown'
import SocialMediaIcon from './components/SocialMediaIcon'

function App() {
  return (
    <div className="container">
      <CountdownProvider>
        <Background />
        <Title />
        <Countdown />
        <SocialMediaIcon />
      </CountdownProvider>
    </div>
  )
}

export default App
