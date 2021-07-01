

<script>
  import { NumberInput } from "carbon-components-svelte";
  import { VofX } from "./utils";

  // P is the product mass
  // Np is the product concentration
  // W is the waste mass
  // Nw is the waste concentration
  // F is the feed mass
  // Nf is the feed concentration
  // V(x) is the value function

  let Nf = 0.00711;
  let Nw = 0.0023;
  let Np = 0.044;
  let F = 100;

  // Calculate Product Mass and SWU from F and F/W/P Concentrations
  $: FF = (Np - Nw) / (Nf - Nw);
  $: SWF = VofX(Np) - VofX(Nw) - FF * (VofX(Nf) - VofX(Nw));
  $: P = F / FF;
  $: SWU = P * SWF;
        
</script>

<section class="swu-container">
  <NumberInput
    label={`Feed Concentration (${(Nf * 100).toFixed(2)}%)`}
    helperText="Natural Uranium is ~0.00711 U235"
    min={0.0001}
    max={0.9999}
    step={0.0001}
    bind:value={Nf}
  />
  <NumberInput
    label={`Waste Concentration (${(Nw * 100).toFixed(2)}%)`}
    helperText="Waste concentration will always be smaller than that of the feed. Typically in the range of 0.002-0.0003 of U-235."
    min={0.0001}
    max={0.9999}
    step={0.0001}
    bind:value={Nw}
  />
  <NumberInput
    label="Product Concentration"
    helperText="The Product (or enriched) material with a desired concentration of the desired isotope, which is always higher than that of the feed material"
    min={0.0001}
    max={0.9999}
    step={0.0001}
    bind:value={Np}
  />
  <NumberInput label="Feed Mass" bind:value={F} />

  <div class="result">
    <h4><strong>Product Mass</strong>: {P.toFixed()}</h4>
    <h4><strong>SWU</strong>: {SWU.toFixed()}</h4>
  </div>
</section>

<style>
</style>
