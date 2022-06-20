import LogoWhite from '../assets/images/logo-white.svg'
import { ReactComponent as FbIcon } from '../assets/images/icon-facebook.svg'
import { ReactComponent as YtIcon } from '../assets/images/icon-youtube.svg'
import { ReactComponent as TwitterIcon } from '../assets/images/icon-twitter.svg'
import { ReactComponent as PinterestIcon } from '../assets/images/icon-pinterest.svg'
import { ReactComponent as InstaIcon } from '../assets/images/icon-instagram.svg'
import Button from './shared/Button'
import Attribution from './Attribution'

function Footer() {
  return (
    <footer className="text-center">
      <div className="container-lg py-5">
        <div className="row">
          <div className="col-12 col-lg-2">
            <div className="footer-img mb-4 mb-lg-5">
              <img src={LogoWhite} alt="easybank-logo" />
            </div>
            <div className="social-media-icons d-flex justify-content-center mb-3 mb-lg-0">
              <div className="fb-icon me-2">
                <a href="#/">
                  <FbIcon />
                </a>
              </div>
              <div className="yt-icon mx-2">
                <a href="#/">
                  <YtIcon />
                </a>
              </div>
              <div className="twitter-icon mx-2">
                <a href="#/">
                  <TwitterIcon />
                </a>
              </div>
              <div className="pin-icon mx-2">
                <a href="#/">
                  <PinterestIcon />
                </a>
              </div>
              <div className="insta-icon ms-2">
                <a href="#/">
                  <InstaIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-1"></div>
          <div className="col-12 col-lg-2 ">
            <div className="footer-nav">
              <ul className="list-unstyled mb-0">
                <li className="my-2">
                  <a href="#/">About Us</a>
                </li>
                <li className="my-2">
                  <a href="#/">Contact</a>
                </li>
                <li className="my-0 my-lg-2 ">
                  <a href="#/">Blog</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-2">
            <div className="footer-nav">
              <ul className="list-unstyled mt-0">
                <li className="my-2">
                  <a href="#/">Careers</a>
                </li>
                <li className="my-2">
                  <a href="#/">Support</a>
                </li>
                <li className="my-2">
                  <a href="#/">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-nav-cta col-12 col-lg-5 d-flex flex-column align-items-center align-items-lg-end justify-content-between">
            <Button bootstrap_class="mt-3 mt-lg-0 mb-4 mb-lg-0" />
            <p>&copy; Easybank. All Rights Reserved</p>
          </div>
        </div>
        <Attribution />
      </div>
    </footer>
  )
}

export default Footer
