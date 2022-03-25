<script>
  import data from '../../data/data.json';
  import PageTransitions from "../components/PageTransitions.svelte";

  let clickedId = 0
  let destinationData = data.destinations

  function handleClick(clickedValue) {
    clickedId = clickedValue
  }
 </script>

<PageTransitions>
  <div class="container">
    <div class="row">
      <div class="heading">
        <h5><span>01</span>Pick your destination</h5>
      </div>
    </div>
      <div class="row">
        <div class="col">
          <div class="destination-img">
            <img src={destinationData[clickedId].images.png} alt={destinationData[clickedId].name.toLowerCase() + '-img'}>
          </div>
        </div>
        <div class="col">
          <div class="destination-wrapper">
            <nav>
              <div class="nav-destination-links">
                <ul>
                  <li><a class:active="{clickedId === 0}" 
                         class="nav-text"
                         on:click={() => handleClick(0)}
                         href="#/">Moon</a></li>
                  <li><a class:active="{clickedId === 1}" 
                         class="nav-text"
                         on:click={() => handleClick(1)}
                         href="#/">Mars</a></li>
                  <li><a class:active="{clickedId === 2}" 
                         class="nav-text"
                         on:click={() => handleClick(2)}
                         href="#/">Europa</a></li>
                  <li><a class:active="{clickedId === 3}" 
                         class="nav-text"
                         on:click={() => handleClick(3)}
                         href="#/">Titan</a></li>
                </ul>
              </div>
            </nav>
            <div class="destination-title">
              <h2>{destinationData[clickedId].name}</h2>
            </div>
            <div class="destination-text">
              <p>{destinationData[clickedId].description}</p>
            </div>
            <div class="destination-stats">
              <div class="avg-distance">
                <div class="subheading-two">
                  <p>Avg. Distance</p>
                </div>
                <div class="subheading-one">
                  <p>{destinationData[clickedId].distance}</p>
                </div>
              </div>
              <div class="travel-time">
                <div class="subheading-two">
                  <p>Est. Travel Time</p>
                </div>
                <div class="subheading-one">
                  <p>{destinationData[clickedId].travel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</PageTransitions>

<svelte:head>
  <style>
    body {
      background-image: url('/assets/destination/background-destination-desktop.jpg');
    }

     /* ----------- Desktop ----------- */
     @media only screen and (max-width: 786px) {
      body {
          background-image: url('/assets/destination/background-destination-tablet.jpg');
      }
    }

    /* ----------- Tablet ----------- */
    /* Portrait and Landscape */
    @media only screen 
      and (min-device-width: 1024px) 
      and (max-device-width: 1366px)
      and (-webkit-min-device-pixel-ratio: 2) { 
        body {
          background-image: url('/assets/destination/background-destination-tablet.jpg');
      }  
    }

    /* ----------- Mobile ----------- */
    @media only screen and (max-width: 650px) {
      body {
          background-image: url('/assets/destination/background-destination-mobile.jpg');
      }  
    }
  </style>
</svelte:head>

<style>
.heading {
    margin-top: 3rem;
  }

  .heading span {
    font-weight: 700;
    color: var(--grey-color);
    margin-right: 1rem;
  }

  .heading h5 {
    color: var(--white-color);
  }

  .destination-img img {
    width: 75%;
    height: auto;
    -o-object-fit: cover;
       object-fit: cover;
  }

  .col:first-of-type {
    padding: 7.5rem 0;
  }

  .col:last-of-type {
    padding: 6rem 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
  }

  .destination-wrapper {
    width: 400px;
  }

  .nav-destination-links ul {
    width: max(300px, 47.5%);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin-bottom: 4rem;
  }

  .nav-destination-links ul li {
    cursor: pointer;
    position: relative;
  }

  .nav-destination-links ul li a {
    color: var(--light-blue-color);
  }

  .nav-destination-links ul li a.active {
    color: var(--white-color);
  }
  
  .nav-destination-links ul li a.active:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 2px;
    background-color: var(--white-color);
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  .nav-destination-links ul li:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 2px;
    background-color: var(--hover-color);
    opacity: 0;
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  .nav-destination-links ul li:hover::after {
    opacity: 1;
  }

  .destination-title h2 {
    margin-bottom: 2rem;
  }

  .destination-text {
    width: max(400px, 75%);
    padding-bottom: 3.5rem;
    border-bottom: 1px solid var(--light-blue-color);
  }

  .destination-text p {
    color: var(--light-blue-color);
  }

  .destination-stats {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
    margin-top: 2rem;
  }

  .subheading-two p {
    color: var(--light-blue-color);
  }

  .avg-distance {
    margin-right: 3rem;
  }

  .avg-distance > div,
  .travel-time > div {
    margin-bottom: 0.75rem;
  }

  @media screen and (max-width: 1075px) {
    .row {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
    }

    .col {
      text-align: center;
    }

    .col:first-of-type {
      padding: 2rem 0 0 0;
    }
    .col:last-of-type {
      padding: 3rem 0 0 0;
    }

    .heading {
      margin-top: 2rem;
    }

    .heading span,
    .heading h5 {
      font-size: 1.25rem;
    }
  
    .destination-img img {
      width: 18.75rem;
    }

    .destination-wrapper {
      width: 100%;
    }

    .nav-destination-links ul {
      width: 100%;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      margin-bottom: 2rem;
    }

    .nav-destination-links ul li {
      margin: 0 2rem;
    }

    .destination-title h2 {
      font-size: 5rem;
      margin-bottom: 1rem;
    }

    .destination-text {
      width: 100%;
      padding: 0 7rem 3rem 7rem;
    }

    .destination-text p {
      font-size: 1rem;
    }

    .destination-stats {
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
    }

    .destination-stats > div {
      margin: 0 5rem;
    }
  }

  @media only screen and (max-width: 740px) {
    .destination-text {
      padding: 0 3rem 2rem 3rem;
    }

    .destination-stats > div {
      margin: 0 3rem;
    }
  }

  @media only screen and (max-width: 650px) {
    .heading {
      margin-top: 0;
      text-align: center;
    }

    .destination-img img {
      width: 10.625rem;
    }

    .nav-destination-links ul li {
      margin: 0 1rem;
    }

    .destination-text {
      padding: 0 0 3rem 0;
    }

    .destination-stats {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
    }

    .destination-stats > div {
      margin: 0 0 2rem 0;
    }
  }
</style>