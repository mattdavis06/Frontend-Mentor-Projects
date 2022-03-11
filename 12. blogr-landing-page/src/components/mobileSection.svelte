<section id="mobile">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="img-wrapper">
          <img src="../../public/images/illustration-phones.svg" alt="">
        </div>
      </div>
      <div class="col">
        <div class="text-wrapper">
          <div class="heading">
            <h3>State of the Art Infrastructure</h3>
          </div>
          <div class="sub-text">
            <p>
              With reliability and speed in mind, worldwide data centers provide the backbone for ultra-fast connectivity. 
              This ensures your site will load instantly, no matter where your readers are, keeping your site competitive.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>

section {
    background-image:  url('../../public/images/bg-pattern-circles.svg'),-o-linear-gradient(left bottom, #2c2d3f, #313248, #353751, #3a3c5b, #3f4164);
    background-image:  url('../../public/images/bg-pattern-circles.svg'),-webkit-gradient(linear, left bottom, right top, from(#2c2d3f), color-stop(#313248), color-stop(#353751), color-stop(#3a3c5b), to(#3f4164));
    background-image:  url('../../public/images/bg-pattern-circles.svg'),linear-gradient(to right top, #2c2d3f, #313248, #353751, #3a3c5b, #3f4164);
    background-repeat: no-repeat;
    background-position: left bottom;
    border-bottom-left-radius: 5rem;
    border-top-right-radius: 5rem;
   
  }

  .container,
  .row {
    max-height: 25rem;
    -webkit-box-align: unset;
        -ms-flex-align: unset;
            align-items: unset;
  }

  .col:last-of-type {
    margin: auto;
  }

  .text-wrapper {
    margin-left: 4rem;
  }

  .img-wrapper img {
    width: 100%;
    height: auto;
    -o-object-fit: cover;
       object-fit: cover;  
    margin-top: -50px;
  }

  .heading h3 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--white-text);
    margin-bottom: 1.5rem;
  }

  .sub-text p {
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1.8;
    letter-spacing: 0.25px;
    color: var(--white-text-light);
  }

  @media only screen and (max-width: 900px) {
    section {
      background-position: top center;
      margin-top: 20rem;
    }

    .container,
    .row {
      max-height: unset;
    }

    .img-wrapper img { 
    margin-top: -300px;
    }

    .text-wrapper {
      margin-left: 0;
      padding: 0 0 7.5rem 0;
    }

    .heading h3,
    .sub-text p {
      text-align: center;
    }
  } 

  @media only screen and (max-width: 600px) {
    .img-wrapper img { 
    margin-top: -200px;
    }
  }
</style>