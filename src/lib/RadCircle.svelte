<script lang="ts">
  import { cubicOut } from 'svelte/easing';
  import { Tween } from 'svelte/motion';

  let {
    kg,
    n,
    maxKg,
    type,
  }: {
    kg: number;
    maxKg: number;
    n: number;
    type: "feed" | "waste" | "product";
  } = $props();

  const colorMap = {
    feed: "var(--feed)",
    waste: "var(--waste)",
    product: "var(--product)",
    u235: "var(--u235)",
    u238: "var(--u238)",
    invalid: "var(--invalid)",
    // feed: "#b8860b",
    // waste: "#b8860b",
    // product: "#b8860b",
  };
  const defaultDiameter = 150;
  const d = $derived.by(() => {
    const proportion = kg / maxKg;
    const d = defaultDiameter * proportion;
    return d;
  });

  const hasError = $derived(d > defaultDiameter);

  const bg2 = $derived.by(() => {
    if (hasError) return colorMap.invalid;
    const border = n * 100;
    const innerBorder = border - 50;
    // rgba(0,0,0,0.1) ${innerBorder}%,
    const s = `radial-gradient(
		circle,
		${colorMap.u235} ${innerBorder}%,
		${colorMap.u235} ${border}%,
		${colorMap.u238} ${border}%
	)`;
    return s;
  });

  const diameterValue = Tween.of(() => Math.min(defaultDiameter, d), { duration: 400, easing: cubicOut});
  const diameterString = $derived(`${diameterValue.current}px`);
  // const diameterString = $derived(`${Math.min(defaultDiameter, d)}px`);

</script>

<div class="box">
  <h3>{type.toUpperCase()} {kg.toFixed()}kg</h3>
  <p>{(n * 100).toFixed(2)}% u235</p>
  <div
    class="ghost-circle"
    style="width:{defaultDiameter}px; height: {defaultDiameter}px;"
  >
    <div
      class="circle"
      style="background:{bg2}; width:{diameterString}; height: {diameterString}"
    ></div>
  </div>
</div>

<style>
  .box {
    display: inline-block;
  }
  .ghost-circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    outline: 1px dashed var(--feed);
  }
  .circle {
    border-radius: 50%;
  }
  p {
    margin: 0;
    font-variant-numeric: tabular-nums;
  }
  h3 {
    margin: 1rem 0 0;
    font-variant-numeric: tabular-nums;
  }
</style>
