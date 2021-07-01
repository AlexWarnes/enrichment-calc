<script>
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div
  class="result"
  
>
  <slot />
</div>

<!-- in:scale={{
  duration: 400,
  delay: 250,
  opacity: 1,
  start: 0,
  easing: quintOut,
}} -->