import bgDesktopLight from '../assets/images/bg-desktop-light.jpg'
import bgDesktopDark from '../assets/images/bg-desktop-dark.jpg'

function HeaderBg({ theme }) {
  return (
    <div
      className="header-bg-img"
      style={{
        backgroundImage:
          theme === 'dark' ? `url(${bgDesktopDark})` : `url(${bgDesktopLight})`,
      }}
    ></div>
  )
}

export default HeaderBg
