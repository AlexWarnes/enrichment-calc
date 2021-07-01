<script>
  import {
    Header,
    ContentSwitcher,
    Switch,
    Button,
  } from "carbon-components-svelte";
  import LogoGithub24 from "carbon-icons-svelte/lib/LogoGithub24";
  import CalcSWU from "./CalcSWU.svelte";
  import CalcFeedProduct from "./CalcFeedProduct.svelte";
  import CalcFeedSWU from "./CalcFeedSWU.svelte";
  import CalcProductSWU from "./CalcProductSWU.svelte";
  import Footer from "./Footer.svelte";
  import CentrifugeSVG from "./CentrifugeSVG.svelte";
  import AutomateModularManagement from "carbon-pictograms-svelte/lib/AutomateModularManagement.svelte";
import { onMount } from "svelte";
  let selectedIndex = 0;
  let vw;
  let picto;

  onMount(() => {
    const Centrifuge = new CentrifugeSVG({
    target: picto,
    intro: true
  })

  })
</script>

<svelte:window bind:innerWidth={vw} />
<Header platformName="Enrichment Calculator">
  <div slot="skip-to-content">
    <span class="pictogram-wrapper" bind:this={picto}>
    </span>
  </div>
  <span class="btn-wrapper">
    <Button
      kind="ghost"
      href="https://github.com/AlexWarnes/enrichment-calc"
      tooltipPosition="top"
      tooltipAlignment="center"
      iconDescription="GitHub"
      disabled={false}
      icon={LogoGithub24}
    />
  </span>
</Header>
<main>
  <div class="intro">
    <h3 class="title">Calculation Type:</h3>
    <ContentSwitcher bind:selectedIndex size="xl">
      <Switch text={vw > 600 ? "SWU" : "SWU"} />
      <Switch text={vw > 600 ? "Feed and SWU" : "F & SWU"} />
      <Switch text={vw > 600 ? "Product and SWU" : "P & SWU"} />
      <Switch text={vw > 600 ? "Feed and Product" : "F & P"} />
    </ContentSwitcher>
  </div>

  {#if selectedIndex === 0}
    <CalcSWU />
  {:else if selectedIndex === 1}
    <CalcFeedSWU />
  {:else if selectedIndex === 2}
    <CalcProductSWU />
  {:else}
    <CalcFeedProduct />
  {/if}
</main>
<Footer />

<style>
  main {
    max-width: 800px;
    /* overflow: hidden; */
  }
  .intro {
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
  }
  .pictogram-wrapper {
    padding: 0 0 0 1rem;
  }
  .pictogram-wrapper :global(svg) {
    width: 32px;
  }
  h3.title {
    margin: 18px 0 8px;
  }
  .btn-wrapper {
    margin: 0 0 0 auto;
  }

  /* .btn-wrapper :global(svg) {
    fill: #ffffff !important;
  } */
  .btn-wrapper :global(path) {
    fill: #ffffff !important;
  }
  .btn-wrapper :global(.bx--btn--ghost.bx--btn--icon-only[disabled]:hover) {
    cursor: pointer;
    color: #333333;
  }
</style>
