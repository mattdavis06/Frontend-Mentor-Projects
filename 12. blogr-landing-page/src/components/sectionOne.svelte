<script>
  import { windowSize } from '../stores/store.js';

  let windowOver900

  windowSize.subscribe(value => {
    windowOver900 = value
  })
</script>

<section id="intro">
  <div class="container">
    <div class="heading">
      <h2>Designed for the future</h2>
    </div>
    <div class="row">
      <div class="col">
        <div class="sub-text-wrapper">
          <div class="sub-heading">
            <h3>Introducing an extensible editor</h3>
          </div>
          <div class="sub-text">
            <p>
              Introducing an extensible editor
              Blogr features an exceedingly intuitive interface which lets you focus on one thing: creating content. 
              The editor supports management of multiple blogs and allows easy manipulation of embeds such as images, 
              videos, and Markdown. Extensibility with plugins and themes provide easy ways to add functionality or 
              change the looks of a blog.
            </p>
          </div>
        </div>
        <div class="sub-text-wrapper">
          <div class="sub-heading">
            <h3>Robust content management</h3>
          </div>
          <div class="sub-text">
            <p>
              Flexible content management enables users to easily move through posts. Increase the usability of your blog 
              by adding customized categories, sections, format, or flow. With this functionality, you’re in full control.
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="img-wrapper">
          {#if windowOver900}
          <img src="/images/illustration-editor-desktop.svg" alt="illustration-editor-image">
          {:else}
          <img src="/images/illustration-editor-mobile.svg" alt="illustration-editor-image">
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
 
 section {
    margin: 2.5rem 0;
    color: var(--very-dark-blue-heading);
  }

  .heading h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 5rem;
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

  .img-wrapper img {
    width: 160%;
    height: auto;
    -o-object-fit: cover;
       object-fit: cover;  
    margin-bottom: 50px;
    margin-left: 90px;
  }

  @media only screen and (max-width: 900px) {
    .col:first-of-type {
      -webkit-box-ordinal-group: 3;
          -ms-flex-order: 2;
              order: 2;
    }

    .col:last-of-type {
      -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
              order: 1;
    }

    .heading h2 {
      margin-bottom: 3rem;
    }

    .sub-heading h3,
    .sub-text p {
      text-align: center;
    }

    .img-wrapper img {
      width: 100%;
      margin-bottom: 0;
      margin-left: 0;
      margin-bottom: 3rem;
    }
  } 
</style>