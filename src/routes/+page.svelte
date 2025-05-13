<script lang="ts">
  import { addCalculator, calcState, cancelLink } from "$lib/calcState.svelte";
  import CalculatorDisplay from "$lib/CalculatorDisplay.svelte";
  import { SquarePlus } from "@lucide/svelte";
  import { Button, Pane, Element } from "svelte-tweakpane-ui";
  import { fade } from "svelte/transition";

  function handleRightClick(event: any) {
    if (calcState.creatingLink) {
      event.preventDefault();
      cancelLink();
    }
  }
</script>

<svelte:window oncontextmenu={handleRightClick} />
<div class="calculator-grid">
  {#each calcState.calculators as { id, type, calc }, idx (id)}
    <div class="calc-wrapper" transition:fade={{ duration: 200 }}>
      <CalculatorDisplay {id} {type} {calc} />
    </div>
  {/each}
  <div class="calc-wrapper">
    <div class="ghost-calc panel">
      <h3><SquarePlus />Add Calculator</h3>
      <button class="secondary" onclick={() => addCalculator("FeedSwu", {})}
        >Feed and SWU</button
      >
      <button class="secondary" onclick={() => addCalculator("ProductSwu", {})}
        >Product and SWU</button
      >
      <button class="secondary" onclick={() => addCalculator("FeedProduct", {})}
        >Feed and Product</button
      >
    </div>
  </div>
</div>

<style>
  .calculator-grid {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: row wrap;
    gap: 1rem;
  }

  .calc-wrapper {
    width: 100%;
    max-width: 500px;
    margin: 1rem auto;
  }

  .ghost-calc h3 {
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
  }
  .ghost-calc {
    width: 210px;
    margin: 1rem auto;
    background-color: var(--bg-tweak-dark);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
  }

  .ghost-calc button {
    padding: 0.125rem 0.375rem;
  }
</style>
