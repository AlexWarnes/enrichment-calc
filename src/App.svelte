<script>
  import { Header, ContentSwitcher, Switch } from "carbon-components-svelte";  

  import CalcSWU from "./CalcSWU.svelte";
  import CalcFeedProduct from "./CalcFeedProduct.svelte";
  import CalcFeedSWU from "./CalcFeedSWU.svelte";
  import CalcProductSWU from "./CalcProductSWU.svelte";
  import Footer from "./Footer.svelte";

  let selectedIndex = 0;
  let vw;
</script>

<svelte:window bind:innerWidth={vw}/>
<Header platformName="Enrichment Calculator" />
<main>
  <h3 class="title">Calculation Type</h3>
  <ContentSwitcher bind:selectedIndex size="xl">
    <Switch text={vw > 600 ? "SWU" : "SWU"} />
    <Switch text={vw > 600 ? "Feed and SWU" : "F & SWU"} />
    <Switch text={vw > 600 ? "Product and SWU" : "P & SWU"} />
    <Switch text={vw > 600 ? "Feed and Product" : "F & P"} />
  </ContentSwitcher>
  
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
  }
  h3.title {
    margin: 18px;
    display: block;
    text-align: center;
  }
</style>
