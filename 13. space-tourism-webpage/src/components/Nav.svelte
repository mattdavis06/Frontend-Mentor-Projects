<script>
  import { Router, Link } from "svelte-navigator";

  let mobileNavOpen = false

  function handleNavClick() {
    if (!mobileNavOpen) {
      mobileNavOpen = true
      document.body.style.overflow = 'hidden'
    } else {
      mobileNavOpen = !mobileNavOpen
      document.body.style.overflow = 'auto'
    }
  }
</script>

<Router primary={false}>
  <nav>
    <div class="logo">
      <img src="assets/shared/logo.svg" alt="logo">
    </div>
        <div class="nav-style-line"></div>
        <div class="nav-links">
          <ul>
              <li><span>00</span><Link class="nav-text" to="/">Home</Link></li>
              <li><span>01</span><Link class="nav-text" to="destination">Destination</Link></li>
              <li><span>02</span><Link class="nav-text" to="crew">Crew</Link></li>
              <li><span>03</span><Link class="nav-text" to="technology">Technology</Link></li>
          </ul>
        </div>
        <div class="nav-mobile-menu" on:click={handleNavClick}>
          <img src="assets/shared/icon-hamburger.svg" alt="nav-mobile-icon">
        </div>
        <div class="nav-mobile-links" 
             class:open="{mobileNavOpen}">
          <div class="nav-mobile-close" on:click={handleNavClick}>
            <img src="assets/shared/icon-close.svg" alt="nav-mobile-close">
          </div>
          <ul>
            <li><span>00</span><Link on:click={handleNavClick} class="nav-text" to="/">Home</Link></li>
            <li><span>01</span><Link on:click={handleNavClick} class="nav-text" to="destination">Destination</Link></li>
            <li><span>02</span><Link on:click={handleNavClick} class="nav-text" to="crew">Crew</Link></li>
            <li><span>03</span><Link on:click={handleNavClick} class="nav-text" to="technology">Technology</Link></li>
          </ul>
        </div>
  </nav>
</Router>


<style>
  
 nav {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;    
    position: relative;
  }

  .logo {
    width: 12.5vw;
    text-align: center;
  }

  /* ----- Desktop Nav */
  .nav-style-line {
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    height: 1px;
    background-color: var(--nav-line-color);
    z-index: 10;
  }

  .nav-links {
    height: 96px;
    background: var(--nav-bg-color);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    margin-left: auto;
  }

  .nav-links::before {
    content: '';
    position: absolute;
    top: 49.5%;
    left: 0;
    width: 40px;
    height: 1px;
    background-color: var(--nav-line-color);
    z-index: 10;
  }

  .nav-links ul {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    padding: 0 12.5vw 0 9rem;
  }

  .nav-links ul li {
    margin: 0 1.5rem;
    cursor: pointer;
    position: relative;
  }

  .nav-links ul li:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: -38px;
    width: 100%;
    height: 2px;
    background-color: var(--hover-color);
    opacity: 0;
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  .nav-links ul li:hover::after {
    opacity: 1;
  }

  /* Adds "active" state when on current page, using [aria-current] */
  :global(a[aria-current="page"])::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -38px;
    width: 100%;
    height: 2px;
    background-color: var(--white-color);
  }

  .nav-links ul li:last-child {
    margin: 0 0 0 1.5rem;
  }

  .nav-links ul li span,
  .nav-mobile-links ul li span {
    font-family: var(--secondary-font);
    font-weight: bold;
    color: var(--white-color);
    letter-spacing: 1px;
    margin-right: 0.5rem;
  }

  /* ----- Mobile Nav */
  .nav-mobile-menu {
    display: none;
    -webkit-transform: scale(1.3);
        -ms-transform: scale(1.3);
            transform: scale(1.3);
    cursor: pointer;
  }

  .nav-mobile-close {
    -webkit-transform: scale(1.3);
        -ms-transform: scale(1.3);
            transform: scale(1.3);
    cursor: pointer;
    position: absolute;
    top: 3rem;
    right: 2rem;
  }

  .nav-mobile-links {
    position: fixed;
    top: 0;
    right: -70%;
    bottom: 0;
    width: 70%;
    background: var(--nav-bg-color);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 100;

    -webkit-transition: all 0.5s linear;
         -o-transition: all 0.5s linear;
            transition: all 0.5s linear;
  }

  .nav-mobile-links.open {
    right: 0;
    -webkit-transition: all 0.5s linear;
         -o-transition: all 0.5s linear;
            transition: all 0.5s linear;
  }

  .nav-mobile-links {
    padding: 5rem 0 5rem 3rem;
  }

  .nav-mobile-links ul li {
    margin: 2rem 0;
    position: relative;
    padding: 0.5rem 0;
    cursor: pointer;
  }

  .nav-mobile-links ul li::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background-color: var(--hover-color);
    opacity: 0;
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  @media (hover: hover) {
    .nav-mobile-links ul li:hover::after {
    opacity: 1;
    }
  }

  /* ----------- Desktop ----------- */
  @media only screen and (max-width: 1075px) {
    .nav-style-line,
    .nav-links::before{
      display: none;
    }

    .nav-links ul {
        padding: 0 2rem;
    }
  }

  @media only screen and (max-width: 786px) {
    .nav-links ul li span {
        display: none;
      }
  }
  
  /* ----------- Tablet ----------- */
  /* Portrait and Landscape */
  @media only screen 
    and (min-device-width: 1024px) 
    and (max-device-width: 1366px)
    and (-webkit-min-device-pixel-ratio: 2) { 
      .nav-style-line,
      .nav-links::before,
      .nav-links ul li span {
        display: none;
      }

      .nav-links ul {
        padding: 0 2rem;
      }
  }

  /* ----------- Mobile ----------- */
  @media only screen and (max-width: 650px) {
    nav {
      padding: 2rem;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
    }

    .logo {
      width: unset;
    }

    .nav-links {
        display: none;
    }
    
    .nav-mobile-menu {
      display: block;
    }

    :global(a[aria-current="page"])::after {
      content: '';
      position: absolute;
      top: 0;
      left: unset;
      right: 0 !important;
      bottom: unset;
      width: 4px;
      height: 100%;
      background-color: var(--white-color);
    }
  }
</style>