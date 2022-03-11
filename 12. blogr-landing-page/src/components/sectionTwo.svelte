<script>
  import { windowSize } from '../stores/store.js';

  let windowOver900

  windowSize.subscribe(value => {
    windowOver900 = value
  })
</script>

<section id="features">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="img-wrapper">
          {#if windowOver900}
          <img src="../../public/images/illustration-laptop-desktop.svg" alt="illustration-laptop-image">
          {:else}
          <img src="../../public/images/illustration-laptop-mobile.svg" alt="illustration-laptop-image">
          {/if}
        </div>
    </div>
    <div class="col">
      <div class="sub-text-wrapper">
        <div class="sub-heading">
          <h3>Free, open, simple</h3>
        </div>
        <div class="sub-text">
          <p>
            Blogr is a free and open source application backed by a
            large community of helpful developers. It supports features such as code
            syntax highlighting, RSS feeds, social media integration, third-party
            commenting tools, and works seamlessly with Google Analytics. The
            architecture is clean and is relatively easy to learn.
          </p>
        </div>
        <div class="sub-heading">
          <h3>Powerful tooling</h3>
        </div>
        <div class="sub-text">
          <p>
            Batteries included. We built a simple and straightforward CLI tool that
            makes customization and deployment a breeze, but capable of producing even
            the most complicated sites.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>

section {
    margin: 7.5rem 0 2.5rem 0;
    color: var(--very-dark-blue-heading);
  }

  .img-wrapper img {
    width: 150%;
    height: auto;
    -o-object-fit: cover;
       object-fit: cover;  
    margin-bottom: 100px;
    margin-left: -392px;
  }
  .sub-heading h3 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
  }

  .sub-text p {
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1.8;
    letter-spacing: 0.25px;
  }

  .sub-text p:first-child {
    margin-bottom: 5rem;
  }

  @media only screen and (max-width: 900px) {
    .img-wrapper img {
      width: 100%;
      margin-bottom: 0;
      margin-left: 0;
      margin-bottom: 3rem;
    }

    .sub-heading h3,
    .sub-text p {
      text-align: center;
    }
  } 
</style>