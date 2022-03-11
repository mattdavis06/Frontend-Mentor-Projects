<script>
  import Nav from './nav.svelte'
</script>

<header>
  <div class="container">
    <Nav />
    <div class="header-wrapper">
      <div class="header-title">
        <h1>A modern publishing platform</h1>
      </div>
      <div class="header-text">
        <p>Grow your audience and build your online brand</p>
      </div>
      <div class="header-cta-btns">
        <div class="btn solid">
          <a href="#">Start for free</a>
        </div>
        <div class="btn outline">
          <a href="#">Learn More</a>
        </div>
      </div>
    </div>

  </div>
</header>

<style>
 
 header {
    background-image: url('/images/bg-pattern-intro-desktop.svg'),-webkit-gradient(linear, left top, right top, from(#ff8f70),color-stop(#ff7e66), color-stop(#ff6c5e), color-stop(#ff5758),  to(#ff3d54));
    background-image: url('/images/bg-pattern-intro-desktop.svg'),-o-linear-gradient(left, #ff8f70,#ff7e66, #ff6c5e, #ff5758,  #ff3d54);
    background-image: url('/images/bg-pattern-intro-desktop.svg'),linear-gradient(to right, #ff8f70,#ff7e66, #ff6c5e, #ff5758,  #ff3d54);
    background-repeat: no-repeat;
    background-size: 150%;
    background-position: 20% 55%;
    border-bottom-left-radius: 5rem;
  }

  .header-wrapper {
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
    padding: 3rem 0;
  }

  .header-title h1 {
    font-size: 2.75rem;
    color: var(--white-text);
    margin-bottom: 1rem;
    text-align: center;
  }

  .header-text p {
    font-size: 1rem;
    color: var(--white-text-light);
    margin-bottom: 2rem;
    text-align: center;
  }

  .header-cta-btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    padding-bottom: 4rem;
  }

  .header-cta-btns > div {
    margin: 0 0.5rem;
  }

  .header-cta-btns a {
    margin-top: 2px;
  }
@media only screen and (max-width: 900px) {
    header {
    background-image: url('/images/bg-pattern-intro-mobile.svg'),-webkit-gradient(linear, left top, right top, from(#ff8f70),color-stop(#ff7e66), color-stop(#ff6c5e), color-stop(#ff5758),  to(#ff3d54));
    background-image: url('/images/bg-pattern-intro-mobile.svg'),-o-linear-gradient(left, #ff8f70,#ff7e66, #ff6c5e, #ff5758,  #ff3d54);
    background-image: url('/images/bg-pattern-intro-mobile.svg'),linear-gradient(to right, #ff8f70,#ff7e66, #ff6c5e, #ff5758,  #ff3d54);
    background-size: 250%;
    background-position: center center;
  }
}
</style>