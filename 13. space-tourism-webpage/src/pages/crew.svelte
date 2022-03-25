<script>
  import data from '../../data/data.json';
  import PageTransitions from "../components/PageTransitions.svelte";

  let clickedId = 0
  let crewData = data.crew

  function handleClick(clickedValue) {
    clickedId = clickedValue
  }
</script>

<PageTransitions>
<div class="container">
  <div class="row">
    <div class="heading">
      <h5><span>02</span>Meet your crew</h5>
    </div>
  </div>
    <div class="row">
      <div class="col">
        <div class="crew-wrapper">
          <div class="crew-role">
            <h4>{crewData[clickedId].role}</h4>
          </div>
          <div class="crew-member">
            <h2>{crewData[clickedId].name}</h2>
          </div>
          <div class="crew-text">
            <p>{crewData[clickedId].bio}</p>
          </div>
          <nav>
            <div class:active="{clickedId === 0}" 
            on:click={() => handleClick(0)} 
            class="nav-dot">
            </div>
            <div class:active="{clickedId === 1}" 
            on:click={() => handleClick(1)}  
            class="nav-dot">
            </div>
            <div class:active="{clickedId === 2}" 
            on:click={() => handleClick(2)} 
            class="nav-dot">
            </div>
            <div class:active="{clickedId === 3}" 
            on:click={() => handleClick(3)} 
            class="nav-dot">
            </div>
          </nav>
        </div>
      </div>
      <div class="col">
        <div class="crew-img">
          <img src={crewData[clickedId].images.png} alt={crewData[clickedId].name.split(' ').join('-').toLowerCase() + '-img'}>
        </div>
      </div>
    </div>
</div>
</PageTransitions>


<svelte:head>
  <style>
    body {
      background-image: url('/assets/crew/background-crew-desktop.jpg');
    }

     /* ----------- Desktop ----------- */
     @media only screen and (max-width: 786px) {
      body {
          background-image: url('/assets/crew/background-crew-tablet.jpg');
      }
    }

    /* ----------- Tablet ----------- */
    /* Portrait and Landscape */
    @media only screen 
      and (min-device-width: 1024px) 
      and (max-device-width: 1366px)
      and (-webkit-min-device-pixel-ratio: 2) { 
        body {
          background-image: url('/assets/crew/background-crew-tablet.jpg');
      }  
    }

    /* ----------- Mobile ----------- */
    @media only screen and (max-width: 650px) {
      body {
          background-image: url('/assets/crew/background-crew-mobile.jpg');
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

  .row:last-of-type,
  .col:last-of-type {
    height: 100%;
  }

  .crew-wrapper {
    height: 70%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 9rem 0 5rem 0;
  }

  .crew-role h4{
    color: var(--hover-color);
  }

  .crew-member h2 {
    font-size: 3.5rem;
    margin: 1rem 0 2rem 0;
  }

  .crew-text {
    width: max(300px, 75%);
  }

  .crew-text p {
    color: var(--light-blue-color);
  }

  nav {
    width: 10rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin-top: auto;
  }

  .nav-dot {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: var(--nav-bg-color);
    cursor: pointer;
  }

  .nav-dot:hover {
    background-color: var(--hover-color);
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  .nav-dot.active {
    background-color: var(--white-color);
  }

  .crew-img {
    text-align: end;
    position: fixed;
    bottom: 0;
    right: 12.5vw;
  }

  .crew-img img {
    width: 100%;
    height: auto;
    -o-object-fit: cover;
       object-fit: cover;
  }

  @media screen and (max-width: 1075px) {
    .row {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
    }

    .heading {
      margin-top: 2rem;
    }

    .heading span,
    .heading h5 {
      font-size: 1.25rem;
    }

    .crew-wrapper {
      margin: 2rem 0;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
    }

    .crew-role h4 {
      font-size: 1.5rem;
    }

    .crew-member h2 {
      font-size: 2.5rem;
    }

    .crew-text {
      padding: 0 5rem;
    }

    .crew-text p {
      text-align: center;
      font-size: 1rem;
    }

    nav {
      width: 7.5rem;
      margin-top: 2rem;
    }

    .nav-dot {
      height: 10px;
      width: 10px;
    }

    .crew-img {
      text-align: center;
      bottom: -50px;
      left: 15%;
    }

    .crew-img img {

      width: 25rem;
      height: auto;
      -o-object-fit: cover;
         object-fit: cover;
    }
  }

  @media only screen and (max-width: 740px) {
    .crew-text {
      padding: 0 2.5rem;
    }
  }

  @media only screen and (max-width: 650px) {
    .heading {
      margin-top: 0;
      text-align: center;
    }

    .col:first-of-type {
      -webkit-box-ordinal-group: 3;
          -ms-flex-order: 2;
              order: 2;
      padding: 0;
    }

    .col:last-of-type {
      -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
              order: 1;
      padding: 2rem 0 0 0;
    }

    .crew-img {
      position: unset;
      border-bottom: 1px solid var(--hover-color);
    }

    .crew-img img {
      width: 20.438rem;
      margin-left: 3rem;
    }

    .crew-wrapper {
      margin: 1rem 0 4rem 0;
    }

    nav {
      -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
              order: 1;
      margin: 2rem 0;
    }

    .crew-role {
      -webkit-box-ordinal-group: 3;
          -ms-flex-order: 2;
              order: 2;
    }

    .crew-member {
      -webkit-box-ordinal-group: 4;
          -ms-flex-order: 3;
              order: 3;
    }

    .crew-text {
      -webkit-box-ordinal-group: 5;
          -ms-flex-order: 4;
              order: 4;
    }

    .crew-role h4 {
      font-size: 1rem;
    }

    .crew-member h2 {
      font-size: 1.5rem;
    }

    .crew-text {
      padding: 0;
    }
    .crew-text p {
      font-size: 0.938rem;
    }
  }

  @media only screen and (max-width: 450px) {
    .crew-img img {
      margin-left: 0;
    }
  }
</style>