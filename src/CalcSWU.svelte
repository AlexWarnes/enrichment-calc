<script>
  import { NumberInput, Slider } from "carbon-components-svelte";

  // V(x)=(2x-1) * ln(x/(1-x)) where x is a given concentration
  const VofX = (x) => {
    let output = (2 * x - 1) * Math.log(x / (1 - x));
    return output;
  };

  let F = 102;
  let Nf = 0.00711;
  $: W = F - P;
  let Nw = 0.003;
  let P = 10;
  let Np = 0.045;

  // Calculate SWU
  // SWU = P * V(Np) + W * V(Nw) – F * V(Nf)
  $: SWU = P * VofX(Np) + W * VofX(Nw) - F * VofX(Nf);

  // P is the product amount,
  // Np is the product concentration,
  // W is the waste amount,
  // Nw is the waste concentration,
  // F is the feed amount,
  // Nf is the feed concentration,
  // V(x) is a value function
</script>

<section class="swu-container">
  <NumberInput label="Feed Amount" bind:value={F} />
  <NumberInput
    label="Feed Concentration"
    helperText="Natural Uranium is ~0.00711 U235"
    min={0.0001}
    max={0.9999}
    step={0.0001}
    bind:value={Nf}
  />

  <!-- <NumberInput label="Waste Amount" bind:value={W} /> -->
  <NumberInput
  label="Waste Concentration"
  helperText="Waste concentration will always be smaller than that of the feed. Typically in the range of 0.002-0.0003 of U-235."
  min={0.0001}
  max={0.9999}
  step={0.0001}
  bind:value={Nw}
/>

  <NumberInput label="Product Amount" bind:value={P} />
  <NumberInput
    label="Product Concentration"
    helperText="The Product (or enriched) material with a desired concentration of the desired isotope, which is always higher than that of the feed material"
    min={0.0001}
    max={0.9999}
    step={0.0001}
    bind:value={Np}
  />

  <div class="result">
    <h4><strong>SWU</strong>: {SWU.toFixed()}</h4>
  </div>

</section>

<style>
</style>
