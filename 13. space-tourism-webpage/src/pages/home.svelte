<script>
    import PageTransitions from "../components/PageTransitions.svelte";
</script>

<PageTransitions>
<div class="container">
  <div class="row">
    <div class="col">
      <div class="sub-heading">
        <h5>So, you want to travel to</h5>
      </div>
      <div class="heading">      
        <h1>Space</h1>
      </div>  
      <div class="text">
        <p>Let&apos;s face it; if you want to go to space, you might as well genuinely go to 
          outer space and not hover kind of on the edge of it. Well sit back, and relax 
          because we&apos;ll give you a truly out of this world experience!</p>
      </div>
    </div>
    <div class="col">
      <div class="explore-circle">
        <h4>Explore</h4>
      </div>
    </div>
  </div>
</div>
</PageTransitions>

<svelte:head>
  <style>
    body {
      background-image: url('/assets/home/background-home-desktop.jpg');
    }

    /* ----------- Desktop ----------- */
    @media only screen and (max-width: 1075px) {
      body {
          background-image: url('/assets/home/background-home-tablet.jpg');
      }
    }

    /* ----------- Tablet ----------- */
    /* Portrait and Landscape */
    @media only screen 
      and (min-device-width: 1024px) 
      and (max-device-width: 1366px)
      and (-webkit-min-device-pixel-ratio: 2) { 
        body {
          background-image: url('/assets/home/background-home-tablet.jpg');
      }  
    }

    /* ----------- Mobile ----------- */
    @media only screen and (max-width: 650px) {
      body {
          background-image: url('/assets/home/background-home-mobile.jpg');
      }  
    }
  </style>
</svelte:head>

<style>
  .row {
    height: 100%;
    align-items: flex-end;
  }
  
  .col:last-of-type {
    display: flex;
    justify-content: flex-end;
  }

  .row {
    height: 100%;
    -webkit-box-align: end;
        -ms-flex-align: end;
            align-items: flex-end;
  }
  
  .col:last-of-type {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
  }

  .heading {
    margin: 3rem 0;
  }

  .text {
    width: max(450px, 70%);
  }

  .text p {
    color: var(--light-blue-color);
    line-height: 2;
  }

  .explore-circle {
    background-color: var(--white-color);
    height: 274px;
    width: 274px;
    border-radius: 50%;
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

  .explore-circle:hover {
    outline: 4rem solid var(--nav-line-color);
    -webkit-transition: all 0.4s linear;
    -o-transition: all 0.4s linear;
    transition: all 0.4s linear;
  }

  .explore-circle h4 {
    color: var(--dark-color);
    z-index: 10;
  }

  /* ----------- Desktop ----------- */
  @media only screen and (max-width: 1075px) {
      .row {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
      }

      .col {
        text-align: center;
        padding: 0;
      }

      .col:first-of-type {
        margin-top: 6rem;
      }

      .sub-heading h5 {
        font-size: 1.25rem;
      }

      .heading {
        margin: 2rem 0 2.5rem 0;
      }

      .text {
        width: 100%;
        padding: 0 3rem;
      }

      .text p {
        font-size: 1rem;
      }

      .col:last-of-type {
        width: 100%;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        margin: 5rem 0 4rem 0;

      }

      .explore-circle:hover {
        outline: 2rem solid var(--nav-line-color);
      }
  }
  
  /* ----------- Mobile ----------- */
  @media only screen and (max-width: 650px) {
      .col:first-of-type {
        margin-top: 2rem;
      }

      .heading h1 {
        font-size: 5rem;
      }

      .text {
        padding: 0;
      }

      .text p {
        font-size: 0.938rem;
      }

      .explore-circle {
        height: 200px;
        width: 200px;
      }

      .explore-circle h4 {
        font-size: 1.25rem;
      }
  }
</style>

