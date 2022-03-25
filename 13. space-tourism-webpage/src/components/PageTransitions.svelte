<script>
  import { fade } from 'svelte/transition';
</script>

<div
  style="height: inherit;"
  in:fade="{{delay: 350, duration: 1000}}"
  >
  <slot/>
</div>