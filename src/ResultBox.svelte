<script>
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<h4
  in:scale={{
    duration: 400,
    delay: 250,
    opacity: 1,
    start: 0,
    easing: quintOut,
  }}
>
  <slot />
</h4>
