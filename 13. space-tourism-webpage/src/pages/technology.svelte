<script>
  import data from '../../data/data.json';
  import { onMount } from 'svelte';
  import PageTransitions from "../components/PageTransitions.svelte";
  
  let innerWidth
  let windowOver1075
  let clickedId = 0
  let techData = data.technology

  onMount(() => {
    windowWidth()
  })

  function windowWidth() {
      if (innerWidth >= 1075) {
      windowOver1075 = true
    } else {
      windowOver1075 = false
    }
  }

  function handleClick(clickedValue) {
    clickedId = clickedValue
  }
</script>

<svelte:window 
bind:innerWidth={innerWidth}
on:resize={windowWidth}
/>

<PageTransitions>
<div class="container">
  <div class="row">
    <div class="heading">
      <h5><span>03</span>Space Launch 101</h5>
    </div>
  </div>
  <div class="row">
    <div class="col">
        <div class="technology-wrapper">
          <nav>
            <div class="nav-num"
            class:active="{clickedId === 0}"
            on:click="{() => handleClick(0)}">
              <h4>1</h4>
            </div>
            <div class="nav-num"
            class:active="{clickedId === 1}"
            on:click="{() => handleClick(1)}">
              <h4>2</h4>
            </div>
            <div class="nav-num"
            class:active="{clickedId === 2}"
            on:click="{() => handleClick(2)}">
              <h4>3</h4>
            </div>
          </nav>
          <div class="technology-info-wrapper">
            <div class="tech-heading nav-text">
              The terminology...
            </div>
            <div class="tech-title">
              <h3>{techData[clickedId].name}</h3>
            </div>
            <div class="tech-text">
              <p>{techData[clickedId].description}</p>
            </div>
          </div>
        </div>
    </div>
    <div class="col">
      <div class="tech-img">
        {#if windowOver1075}
        <img src="{techData[clickedId].images.portrait}" alt="{techData[clickedId].name.split(' ').join('-').toLowerCase() + '-img'}">
        {:else}
        <img src="{techData[clickedId].images.landscape}" alt="{techData[clickedId].name.split(' ').join('-').toLowerCase() + '-img'}">
        {/if}
      </div>
    </div>
  </div>
</div>
</PageTransitions>

<svelte:head>
  <style>
    body {
      background-image: url('/assets/technology/background-technology-desktop.jpg');
    }

     /* ----------- Desktop ----------- */
     @media only screen and (max-width: 786px) {
      body {
          background-image: url('/assets/technology/background-technology-tablet.jpg');
      }
    }

    /* ----------- Tablet ----------- */
    /* Portrait and Landscape */
    @media only screen 
      and (min-device-width: 1024px) 
      and (max-device-width: 1366px)
      and (-webkit-min-device-pixel-ratio: 2) { 
        body {
          background-image: url('/assets/technology/background-technology-tablet.jpg');
      }  
    }

    /* ----------- Mobile ----------- */
    @media only screen and (max-width: 650px) {
      body {
          background-image: url('/assets/technology/background-technology-mobile.jpg');
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

  .row:last-of-type {
    height: 80%;
  }

  .col:first-of-type {
    -webkit-box-flex: 2;
        -ms-flex: 2;
            flex: 2;
  }

  .technology-wrapper {
    height: 100%;
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

  nav {
    height: 18.75rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin-right: 5rem;
  }

  .nav-num {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background-color: var(--black-color);
    border: 1px solid var(--grey-color);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    cursor: pointer;
  }

  .nav-num:hover {
    border: 1px solid var(--white-color);
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  .nav-num.active {
    background-color: var(--white-color);
  }

  .nav-num h4 {
    color: var(--white-color);
  }

  .nav-num.active h4 {
    color: var(--black-color);
  }

  .technology-info-wrapper {
    height: 18.75rem;
  }

  .tech-heading {
    color: var(--light-blue-color);
    margin-bottom: 1rem;
  }

  .tech-title {
    margin: 0 2rem 2rem 0;
  }

  .tech-text {
    width: max(350px, 80%);
  }

  .tech-text p {
    color: var(--light-blue-color);
  }

  .tech-img img {
    width: 515px;
    height: auto;
    -o-object-fit: cover;
       object-fit: cover;
    position: absolute;
    right: 0;
  }

  @media screen and (max-width: 1220px) {
    .technology-wrapper {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
    }

    nav {
      height: 12rem;
      width: 60%;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
          -ms-flex-direction: row;
              flex-direction: row;
      -webkit-box-align: start;
          -ms-flex-align: start;
              align-items: flex-start;
    }
  }

  @media screen and (max-width: 1145px) { 
    .tech-img img {
      right: -50px;
    }
  }

  @media screen and (max-width: 1075px) {
    .heading {
      margin-top: 2rem;
    }

    .heading span,
    .heading h5 {
      font-size: 1.25rem;
    }

    .row:last-of-type {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
    }

    .col:first-of-type {
      -webkit-box-ordinal-group: 3;
          -ms-flex-order: 2;
              order: 2;
      margin-top: max(18rem, 40vw);
    }

    .col:last-of-type {
      -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
              order: 1;
    }

    .tech-img {
      width: 100%;
    }

    .tech-img img {
      display: block;
      width: 100%;
      left: 0;
      right: 0;
    }

    nav {
      width: auto;
      height: auto;
      margin: 0 0 2rem 0;
    }

    .nav-num {
      margin: 0 1rem;
      width: 58px;
      height: 58px;
    }

    .nav-num h4 {
      font-size: 1.5rem;
    }

    .technology-info-wrapper {
      height: auto;
      text-align: center;
    }

    .tech-title h3 {
      font-size: 2.5rem;
    }

    .tech-text {
      width: 100%;
      padding: 0 5rem;
    }

    .tech-text p {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 650px) {
    .heading {
      margin-top: 0;
      text-align: center;
    }

    .col:first-of-type {
      margin-top: max(12.5rem, 40vw);
    }

    .nav-num {
      width: 40px;
      height: 40px;
    }

    .nav-num h4 {
      font-size: 1rem;
    }

    .tech-heading {
      font-size: 0.875rem;
    }

    .tech-title h3 {
      font-size: 1.5rem;
    }

    .tech-text {
      padding: 0;
    }
    .tech-text p {
      font-size: 0.938rem;
    }
  }
</style>