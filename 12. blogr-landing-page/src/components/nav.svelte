<script>	
  import { windowSize } from '../stores/store.js';

  let windowOver900

  windowSize.subscribe(value => {
    windowOver900 = value
	})

  function addClass() {
    this.lastElementChild.style.opacity = 1
    this.lastElementChild.style.visibility = 'visible'
    this.lastElementChild.style.transition = '0.3s ease-in-out'
    this.children[1].style.transform = 'rotate(180deg)'
  }

  function removeClass() {
    this.lastElementChild.style.opacity = 0
    this.lastElementChild.style.visibility = 'hidden'
    this.children[1].style.transform = 'rotate(0deg)'
  }

  let openNavCheck = false

  function handleMobileNavClick() {
    if(!openNavCheck === true) {
      openNavCheck = true
    } else {
      openNavCheck = false
    }
  }

  function handleMobileNavLinkClick() {
    let navElLink = this.nextElementSibling
    
    if (navElLink.style.opacity !== '1') {
      this.children[1].style.transform = 'rotate(180deg)'
      navElLink.style.height = 'auto'
      navElLink.style.opacity = '1'
      navElLink.style.padding = '1rem'
    } else {
      this.children[1].style.transform = 'rotate(0deg)'
      navElLink.style.height = '0'
      navElLink.style.opacity = '0'
      navElLink.style.padding = '0'
    }
     
  }
</script>

<nav>
  <div class="nav-desktop-left">
    <div class="logo">
      <svg width="101" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 30.803V1.486h10.653c1.982 0 3.695.31 5.14.93 1.446.619 2.56 1.5 3.345 2.642.785 1.142 1.177 2.484 1.177 4.026 0 1.404-.303 2.636-.909 3.695a6.48 6.48 0 01-2.56 2.498c1.487.578 2.643 1.494 3.469 2.746.826 1.253 1.239 2.732 1.239 4.439 0 1.707-.44 3.18-1.322 4.418-.88 1.239-2.12 2.202-3.716 2.89-1.596.688-3.482 1.033-5.657 1.033H0zM5.946 6.565v6.73h4.046c1.35 0 2.388-.282 3.118-.846.73-.564 1.094-1.397 1.094-2.498 0-1.101-.365-1.94-1.094-2.519-.73-.578-1.769-.867-3.118-.867H5.946zm0 19.159h4.624c1.542 0 2.732-.33 3.572-.991.84-.66 1.26-1.61 1.26-2.85 0-1.238-.42-2.188-1.26-2.848-.84-.66-2.03-.991-3.572-.991H5.946v7.68zm19.282 5.079V0h5.781v30.803h-5.78zm20.893.619c-1.624 0-3.124-.29-4.5-.867a10.94 10.94 0 01-3.593-2.416 10.96 10.96 0 01-2.374-3.654c-.564-1.404-.846-2.931-.846-4.583 0-1.652.289-3.173.867-4.563a11.354 11.354 0 012.415-3.654 10.96 10.96 0 013.634-2.436c1.39-.578 2.91-.867 4.562-.867 1.625 0 3.125.289 4.501.867a10.94 10.94 0 013.592 2.416 11.01 11.01 0 012.375 3.633c.564 1.39.846 2.911.846 4.563 0 1.651-.289 3.179-.867 4.583a11.297 11.297 0 01-2.416 3.675 10.96 10.96 0 01-3.633 2.436c-1.39.578-2.911.867-4.563.867zm.083-5.203c1.046 0 1.982-.275 2.808-.825.825-.551 1.48-1.301 1.96-2.25.483-.95.723-2.03.723-3.242 0-1.211-.24-2.292-.722-3.241-.482-.95-1.136-1.7-1.961-2.25-.826-.551-1.762-.826-2.808-.826-1.046 0-1.982.275-2.808.825-.826.55-1.48 1.301-1.961 2.25-.482.95-.723 2.03-.723 3.242 0 1.211.241 2.292.723 3.241.482.95 1.135 1.7 1.961 2.25.826.551 1.762.826 2.808.826zm24.155 3.964a9.13 9.13 0 01-3.86-.826 9.492 9.492 0 01-3.118-2.291c-.881-.977-1.57-2.12-2.065-3.427-.495-1.308-.743-2.719-.743-4.233 0-1.569.255-3.02.764-4.356a10.614 10.614 0 012.147-3.489 10.174 10.174 0 013.22-2.333c1.225-.564 2.554-.846 3.985-.846 1.404 0 2.67.282 3.799.846a7.402 7.402 0 012.807 2.457l.124-2.684h5.327v19.2c0 1.68-.269 3.207-.805 4.584-.537 1.376-1.301 2.56-2.292 3.55a10.231 10.231 0 01-3.53 2.292c-1.363.537-2.87.805-4.522.805-1.624 0-3.083-.254-4.376-.764a10.468 10.468 0 01-3.386-2.126 10.035 10.035 0 01-2.271-3.18L67.097 32a5.452 5.452 0 001.92 1.879c.784.454 1.672.681 2.663.681 1.074 0 2.003-.24 2.787-.723.785-.481 1.397-1.156 1.838-2.023.44-.867.66-1.879.66-3.035v-1.775a7.793 7.793 0 01-2.828 2.333c-1.143.564-2.402.846-3.778.846zm1.404-5.12c1.018 0 1.92-.254 2.704-.764a5.556 5.556 0 001.879-2.064c.468-.867.702-1.851.702-2.952 0-1.102-.234-2.086-.702-2.953a5.556 5.556 0 00-1.879-2.064c-.784-.51-1.686-.764-2.704-.764-1.019 0-1.92.255-2.705.764a5.556 5.556 0 00-1.879 2.064c-.468.867-.702 1.851-.702 2.953 0 1.1.234 2.085.702 2.952a5.556 5.556 0 001.88 2.064c.784.51 1.685.764 2.704.764zm15.607 5.74V9h5.327l.206 3.304c.55-1.157 1.294-2.044 2.23-2.664.936-.62 2.037-.929 3.303-.929.386 0 .77.035 1.156.103.386.07.73.159 1.033.269l-.62 5.698a4.361 4.361 0 00-.929-.227 7.495 7.495 0 00-.97-.062c-1.597 0-2.822.489-3.675 1.466-.853.977-1.28 2.36-1.28 4.15v10.694h-5.78z" fill="#FFF" fill-rule="nonzero"/></svg>
    </div>
    <ul class="nav-desktop-links">
      <li 
      on:mouseover={addClass} 
      on:focus={addClass}
      on:mouseout={removeClass}
      on:blur={removeClass}
      >
        <a href="#/">Product</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7"><path fill="none" stroke="#FFF" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4"/></svg>
        <div class="nav-desktop-link">
          <ul class="inner-nav">
            <li><a href="#/">Overview</a></li>
            <li><a href="#/">Pricing</a></li>
            <li><a href="#/">Marketplace</a></li>
            <li><a href="#/">Features</a></li>
            <li><a href="#/">Intergrations</a></li>
          </ul>
        </div>
      </li>
      <li 
      on:mouseover={addClass} 
      on:focus={addClass}
      on:mouseout={removeClass}
      on:blur={removeClass}
      >
        <a href="#/">Company</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7"><path fill="none" stroke="#FFF" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4"/></svg>
        <div class="nav-desktop-link">
          <ul class="inner-nav">
            <li><a href="#/">About</a></li>
            <li><a href="#/">Team</a></li>
            <li><a href="#/">Blog</a></li>
            <li><a href="#/">Careers</a></li>
          </ul>
        </div>
      </li>
      <li 
      on:mouseover={addClass} 
      on:focus={addClass}
      on:mouseout={removeClass}
      on:blur={removeClass}
      >
        <a href="#/">Connect</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7"><path fill="none" stroke="#FFF" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4"/></svg>
        <div class="nav-desktop-link">
          <ul class="inner-nav">
            <li><a href="#/">Contact</a></li>
            <li><a href="#/">Newsletter</a></li>
            <li><a href="#/">LinkedIn</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  <div class="nav-desktop-right">
    <div class="login">
      <a href="#/">Login</a>
    </div>
    <div class="btn solid">
      <a href="#/">Sign Up</a>
    </div>
  </div>
  <div class="nav-mobile" on:click={handleMobileNavClick}>
    {#if openNavCheck === false}
    <svg width="32" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><path d="M0 0h32v2H0zM0 8h32v2H0zM0 16h32v2H0z"/></g></svg>
    {:else}
    <svg width="26" height="26" xmlns="http://www.w3.org/2000/svg"><path d="M23.607.98l1.414 1.413L14.414 13l10.607 10.607-1.414 1.414L13 14.414 2.393 25.021.98 23.607 11.586 13 .98 2.393 2.393.98 13 11.586 23.607.98z" fill="#FFF" fill-rule="evenodd"/></svg>
    {/if}
  </div>
  
  <div class="nav-mobile-links-wrapper"
       style="transform: translateX({openNavCheck ? '0%' : '-150%'}; 
              display:{windowOver900 ? 'none' : ''};
              transition: 0.5s linear;">
    <div class="nav-mobile-links">
      <div class="nav-mobile-link">
        <div class="nav-mobile-header" 
             on:click="{handleMobileNavLinkClick}">
          <p>Product</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7"><path fill="none" stroke="#FF7B86" stroke-width="2" d="M1 1l4 4 4-4"/></svg>
        </div>
        <ul>
          <li><a href="#/">Overview</a></li>
          <li><a href="#/">Pricing</a></li>
          <li><a href="#/">Marketplace</a></li>
          <li><a href="#/">Features</a></li>
          <li><a href="#/">Intergrations</a></li>
        </ul>
      </div>
      <div class="nav-mobile-link">
        <div class="nav-mobile-header" 
             on:click="{handleMobileNavLinkClick}">
          <p>Company</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7"><path fill="none" stroke="#FF7B86" stroke-width="2" d="M1 1l4 4 4-4"/></svg>
        </div>
        <ul>
          <li><a href="#/">About</a></li>
          <li><a href="#/">Team</a></li>
          <li><a href="#/">Blog</a></li>
          <li><a href="#/">Careers</a></li>
        </ul>
      </div>
      <div class="nav-mobile-link">
        <div class="nav-mobile-header" 
             on:click="{handleMobileNavLinkClick}">
          <p>Connect</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7"><path fill="none" stroke="#FF7B86" stroke-width="2" d="M1 1l4 4 4-4"/></svg>
        </div>
        <ul>
          <li><a href="#/">Contact</a></li>
          <li><a href="#/">Newsletter</a></li>
          <li><a href="#/">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="nav-mobile-btns">
      <div class="login">
        <a href="#/">Login</a>
      </div>
      <div class="btn solid grad">
        <a href="#/">Sign Up</a>
      </div>
    </div>
  </div>
</nav>

<style>
 nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    padding: 2.5rem 0;
    font-family: var(--nav-footer-font);
    font-weight: 700;
    color: var(--white-text-light);
    position: relative;
  }

  .nav-desktop-left,
  .nav-desktop-right {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  .nav-desktop-links {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  .nav-desktop-left .logo {
    margin-right: 2rem;
  }

  .nav-desktop-left ul {
    list-style-type: none;
  }

  .nav-desktop-links li {
    position: relative;
  }

  .nav-desktop-links li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    margin: 0 0.5rem 0 2rem;
    cursor: pointer;
    font-size: 0.85rem;
  }

  .nav-desktop-links li:hover {
    text-decoration: underline;
    color: var(--white-text);
    -webkit-transition: 0.2s ease-in-out;
    -o-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
  }

  .nav-desktop-links li a {
    margin-right: 0.5rem;
  }

  .nav-desktop-right > div {
    margin:0 1rem;
  }

  .nav-desktop-right a {
    font-size: 0.85rem;
  }

  .nav-desktop-right .login a {
    color: var(--white-text-light);
  }
  .nav-desktop-right .login:hover a {
    color: var(--white-text);
    -webkit-transition: 0.2s ease-in-out;
    -o-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
  }

  .nav-desktop-link {
    background-color: var(--white-text);
  
    min-width: 130px;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    position: absolute;
    top: 30px;
    left: -25px;
    opacity: 0;
    visibility: hidden;
  }

  .nav-desktop-link ul li {
    margin: 1rem 0;
  }

  .nav-desktop-link ul li a {
    color: var(--very-dark-blue-heading);
  }

  .nav-desktop-link .inner-nav li {
    font-size: 0.75rem;
    font-weight: 300;
  }

  .nav-desktop-link .inner-nav li:hover {
    text-decoration: none;
    color: var(--very-dark-black-footer-bg);
    font-weight: 600;
  }

  .nav-mobile {
    display: none;
    cursor: pointer;
  }

  .nav-mobile-links-wrapper {
    position: absolute;
    background: var(--white-text);
    color: var(--very-dark-blue-heading);
    font-weight: 500;
    width: 100%;
    height: auto;
    top: 110px;
    left: 0;
    right: 0;
    border-radius: 0.5rem;
    padding: 1rem 2rem;
  }

  .nav-mobile-links {
    width: 100%;
    border-bottom: 1px solid var(--grey-mobile-nav-bg);
  }

  .nav-mobile-link {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    cursor: pointer;
  }

  .nav-mobile-link:last-child {
    margin-bottom: 1rem;
  }

  .nav-mobile-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  }

  .nav-mobile-link ul {
    list-style-type: none;
    background-color: var(--grey-mobile-nav-bg);
    width: 100%;
    border-radius: 0.35rem;
    text-align: center;
    opacity: 0;
    height: 0;
    overflow: hidden;
    -webkit-transition: 0.3s linear;
    -o-transition: 0.3s linear;
    transition: 0.3s linear;
  }

  .nav-mobile-link ul li {
    margin: 1rem 0;
  }

  .nav-mobile-link ul li a {
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--very-dark-blue-heading);
  }
  

  .nav-mobile-link ul li a:hover {
    -webkit-filter: brightness(150%);
            filter: brightness(150%);
  }

  .nav-mobile-link p {
    font-size: 1.2rem;
    margin: 1rem 0.5rem 1rem 0;
  }

  .nav-mobile-btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin-top: 2rem;
  }

  .nav-mobile-btns > div {
    margin: 1rem 0;
  }

  .nav-mobile-btns a {
    font-size: 1.1rem;
  }

  .nav-mobile-btns .login a {
    color: var(--very-dark-blue-heading);
  }

  .nav-mobile-btns .login:hover {
    -webkit-filter: brightness(150%);
            filter: brightness(150%);
    -webkit-transition: 0.3s ease-in-out;
    -o-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }

  .nav-mobile-btns .grad a {
    color: var(--white-text);
  }


  @media only screen and (max-width: 900px) {
    .nav-desktop-left ul,
    .nav-desktop-right {
      display: none;
    }

    .nav-mobile {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  } 
</style>