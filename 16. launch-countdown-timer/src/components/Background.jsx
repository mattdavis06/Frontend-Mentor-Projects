import BgStars from '../assets/images/bg-stars.svg'
import BgMountains from '../assets/images/pattern-hills.svg'

function Background() {
  return (
    <div className="bg">
      <div className="bg-stars">
        <img src={BgStars} alt="bg-stars" />
      </div>
      <div className="bg-mountains">
        <img src={BgMountains} alt="bg-mountains" />
      </div>
    </div>
  )
}

export default Background
