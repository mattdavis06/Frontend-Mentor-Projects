<script>
  import Nav from './Nav.svelte'
</script>

<header>
  <Nav />
</header>

<style>
  header {
    height: 17.5vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

    /* ----------- Desktop ----------- */
  @media only screen and (max-width: 1075px) {
    header {
        height: unset;
      }
  }

  /* ----------- Tablet ----------- */
  /* Portrait and Landscape */
  @media only screen 
    and (min-device-width: 1024px) 
    and (max-device-width: 1366px)
    and (-webkit-min-device-pixel-ratio: 2) { 
      header {
        height: unset;
      }
  }
</style>