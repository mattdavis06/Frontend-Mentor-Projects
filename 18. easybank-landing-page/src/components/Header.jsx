import Nav from './Nav'
import HeroImg from '../assets/images/image-mockups.png'
import Button from './shared/Button'

function Header() {
  return (
    <header>
      <Nav />
      <div className="hero-wrapper">
        <div className="container-lg">
          <div className="row align-items-center">
            <div className="col-md-12 col-lg-6">
              <div className="hero-wrapper-content">
                <div className="hero-title">
                  <h1>
                    Next generation <br /> digital banking
                  </h1>
                </div>
                <div className="hero-text">
                  <p>
                    Take your financial life online. Your Easybank account will
                    be a one-stop-shop for spending, saving, budgeting,
                    investing, and much more.
                  </p>
                </div>
                <Button />
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="hero-bg-img position-relative">
                <img
                  src={HeroImg}
                  className="position-absolute"
                  alt="hero-bg-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
