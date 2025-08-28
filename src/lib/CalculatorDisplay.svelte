<script lang="ts">
  import {
  Button,
    Element,
    Folder,
    Pane,
    Stepper,
    Text,
    Wheel,
  } from "svelte-tweakpane-ui";
  import { displayPct } from "./mathUtils.js";
  import RadBar from "./RadBar.svelte";
  import type { CalcType, Calculator, EnrichmentValues, LinkValues } from "./models";
  import { removeCalculator, calcState } from "./calcState.svelte";
  import LinkButton from "./LinkButton.svelte";
  import { ListCollapse, Trash } from "@lucide/svelte";

  let { type, id, calc, }: { type: CalcType, id: string, calc: Calculator, } = $props();

  let expandAll = $state<boolean>(true)
  const inputLinks = $derived(calcState.links.filter(link => link.target.id === id))
  const targetKeys = $derived(inputLinks.flatMap(link => link.target.keys));
  const targetColors = $derived(inputLinks.flatMap(link => link.color));
  const outputLinks = $derived(calcState.links.filter(link => link.source.id === id))
  const sourceKeys = $derived(outputLinks.flatMap(link => link.source.keys));
  const sourceColors = $derived(outputLinks.flatMap(link => link.color));


  function toggleExpanded(status = !expandAll){
    expandAll = status;
  }

  // Manually updates this calculator with the values from a source calculator
  $effect(() => {
    for (let link of inputLinks){
      const { source, target } = link
      const sourceCalc = calcState.calculators.find(calc => calc.id === source.id)?.calc;
      if (sourceCalc){
        target.keys.forEach((targetKey, i) => {
            calc[targetKey] = sourceCalc[source.keys[i]]
        })
      }
    }
  })


  const paneTitleByType = {
    FeedSwu: "Feed and SWU",
    ProductSwu: "Product and SWU",
    FeedProduct: "Feed and Product",
    SWU: "SWU",
  };

  const resultChipsByType = {
    FeedSwu: [
      {label: 'Feed Mass', display: (calcRef: EnrichmentValues) => calcRef.F.toFixed() + 'kg'},
      {label: 'SWU', display: (calcRef: EnrichmentValues) => calcRef.SWU.toFixed()}
    ],
    ProductSwu: [
      {label: 'Product Mass', display: (calcRef: EnrichmentValues) => calcRef.P.toFixed() + 'kg'},
      {label: 'SWU', display: (calcRef: EnrichmentValues) => calcRef.SWU.toFixed()}
    ],
    FeedProduct: [
      {label: 'Feed Mass', display: (calcRef: EnrichmentValues) => calcRef.F.toFixed() + 'kg'},
      {label: 'Product Mass', display: (calcRef: EnrichmentValues) => calcRef.P.toFixed() + 'kg'},
    ],
    SWU: [
      {label: 'SWU', display: (calcRef: EnrichmentValues) => calcRef.SWU.toFixed()}
    ]
  };

  const inputDisabled = (inputKey: keyof EnrichmentValues, type: CalcType): boolean => {
    if (targetKeys.includes(inputKey)){
      return true;
    }

    switch (type) {
      case "FeedSwu":
        const feedSwuDisabled = ['F', 'SWU']
        return feedSwuDisabled.includes(inputKey)
      case "ProductSwu":
        const productSwuDisabled = ['P', 'SWU']
        return productSwuDisabled.includes(inputKey)
      case "FeedProduct":
        const feedProductDisabled = ['F', 'P']
        return feedProductDisabled.includes(inputKey)
      case "SWU":
        const swuDisabled = ['SWU']
        return swuDisabled.includes(inputKey)
    }
  }

  const warning = $derived.by(() => {
    if (calc.Np < calc.Nf){
      return "Downblending: Your product material has a lower enrichment level than your feed material."
    }

    // if ()
  })
</script>

<Pane position="inline" scale={1} title={paneTitleByType[type]}>
    <Element>
      <div class="calc-actions">
        <button class="tertiary" onclick={() => toggleExpanded()} title={expandAll ? 'Collapse Folders' : 'Expand Folders'}>
          <ListCollapse size="16"/>
        </button>
        <span class="flex-spacer"></span>
        <button class="tertiary" onclick={() => removeCalculator(id)} title="Delete Calculator">
          <Trash size="16"/>
        </button>
      </div>
    </Element>
    <Element>
      <div class="results">
        {#each resultChipsByType[type] as chip (chip.label)}
          <p class="result">{chip.label}: {chip.display(calc)}</p>
        {/each}
      </div>
    </Element>
  <Folder title="FEED: {calc.F.toFixed()}kg | {displayPct(calc.Nf)}" expanded={expandAll}>
    <LinkButton 
      {id}
      keys={['F', 'Nf']}
      outputDisabled={targetKeys.includes('F')}
      {inputLinks}
      {outputLinks}
    />
    <Stepper bind:value={calc.F} label="Feed Mass" step={1} min={1} disabled={inputDisabled('F', type)} />
    <Wheel
      bind:value={calc.Nf}
      label="Feed Enrichment"
      format={(v) => (v * 100).toFixed(2) + "%"}
      step={0.001}
      min={0.001}
      max={1}
      pointerScale={-0.001}
      disabled={inputDisabled('Nf', type)}
    />
  </Folder>
  <Folder title="PRODUCT: {calc.P.toFixed()}kg | {displayPct(calc.Np)}" expanded={expandAll}>
    <LinkButton
      {id}
      keys={['P', 'Np']}
      outputDisabled={targetKeys.includes('P')}
      {inputLinks}
      {outputLinks}
    />
    <Stepper bind:value={calc.P} label="Product Mass" step={1} min={1} disabled={inputDisabled('P', type)} />
    <Wheel
      bind:value={calc.Np}
      label="Product Enrichment"
      format={(v) => (v * 100).toFixed(2) + "%"}
      step={0.001}
      min={0.001}
      max={1}
      pointerScale={-0.001}
      disabled={inputDisabled('Np', type)}
    />
  </Folder>
  <Folder title="WASTE: {calc.W.toFixed()}kg | {displayPct(calc.Nw)}" expanded={expandAll}>
    <LinkButton
      {id}
      keys={['W', 'Nw']}
      inputDisabled 
      {inputLinks}
      {outputLinks}
    />
    <Text value={calc.W.toFixed() + "kg"} label="Waste Mass" disabled />
    <Wheel
      bind:value={calc.Nw}
      label="Waste Enrichment"
      format={(v) => (v * 100).toFixed(3) + "%"}
      step={0.0001}
      min={0.001}
      max={1}
      pointerScale={-0.001}
    />
  </Folder>
  <Folder title="SWU: {calc.SWU.toFixed()}" expanded={expandAll}>
    <Stepper bind:value={calc.SWU} label="SWU" step={1} min={1} disabled={inputDisabled('SWU', type)} />
  </Folder>
  <Folder title="Visualization" expanded={expandAll}>
    <Element>
      <div class="vis-row">
        <RadBar kg={calc.F} n={calc.Nf} maxKg={calc.F} type="feed" />
        <RadBar kg={calc.P} n={calc.Np} maxKg={calc.F} type="product" />
        <RadBar kg={calc.W} n={calc.Nw} maxKg={calc.F} type="waste" />
      </div>
    </Element>
  </Folder>
</Pane>

<style>
  .calc-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  .vis-row {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    color: var(--color);
    max-width: 100%;
    padding: 0.25rem;
  }
  .results {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .result {
    border-radius: 25%;
    background-color: var(--product);
    font-family: 'Roboto Mono', sans-serif;
    font-size: 0.75rem;
    color: var(--color);
    border-radius: 50px;
    padding: 0.25rem 0.75rem;
  }
</style>
