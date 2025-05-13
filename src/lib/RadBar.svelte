<script lang="ts">
  import { cubicOut } from "svelte/easing";
  import { Tween } from "svelte/motion";
  import { displayPct } from "./mathUtils";

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
  const widthRatio = $derived.by(() => {
    const ratio = kg / maxKg;
    return ratio * 100;
  });

  const hasError = $derived(d > defaultDiameter);

  const bg2 = $derived.by(() => {
    if (hasError) return colorMap.invalid;
    const border = n * 100;
    // rgba(0,0,0,0.1) ${innerBorder}%,
    const s = `linear-gradient(
		to right,
		${colorMap.u235} ${border}%,
		${colorMap.u238} ${border}%
		
	)`;
    return s;
    //background: linear-gradient(#e66465, #9198e5);
  });

  const diameterValue = Tween.of(() => d, {
    duration: 400,
    easing: cubicOut,
  });
  const diameterString = $derived(`${diameterValue.current}px`);
  // const diameterString = $derived(`${Math.min(defaultDiameter, d)}px`);
</script>

<div class="container">
  <div class="title-row">
    <h3>{type.toUpperCase()}</h3>
    <p><span>{kg.toFixed()}kg</span><span>{displayPct(n)}</span></p>
  </div>
  <div class="bar outer" style="justify-content: {type === 'waste' ? 'flex-end' : 'flex-start'};">
    <div
      class="bar mass"
      style="background:{bg2}; width:{widthRatio}%;"
    ></div>
  </div>
</div>

<style>
  .container {
    width: 100%;
    display: list-item;
    list-style-type: square;
  }
  .bar {
    height: 1rem;
    border-radius: 0.125rem;
    width: 100%;
  }
  .bar.outer {
    position: relative;
    display: flex;
    width: 100%;
    /* justify-content: flex-start; */
    align-items: center;
    outline: 1px dashed rgba(var(--feed-rgb), 0.5);
    outline-offset: 2px;
  }
  .title-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #dadada;
    font-variant-numeric: tabular-nums;
    font-family: Roboto Mono;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  p, h3 {
    margin: 0;
  }
  h3 {
    font-weight: 600;
    color: var(--color);
    width: 5rem;
    flex-grow: 1;
  }
  p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 4;
  }
  p > * {
    width: 4.25rem;
    text-align: left;
  }
</style>
