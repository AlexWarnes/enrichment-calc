

<script>
  import { NumberInput, Slider } from "carbon-components-svelte";

  // P is the product amount,
  // Np is the product concentration,
  // W is the waste amount,
  // Nw is the waste concentration,
  // F is the feed amount,
  // Nf is the feed concentration,
  // V(x) is the value function
  // https://inis.iaea.org/collection/NCLCollectionStore/_Public/08/330/8330661.pdf
  // https://fas.org/blogs/security/2009/09/calculating-output-of-the-new-iranian-uranium-enrichment-plant/
  // http://web.mit.edu/22.812j/www/enrichment.pdf
  // https://www.urenco.com/swu-calculator

  // V(x)=(2x-1) * ln(x/(1-x)) where x is a given concentration
  const VofX = (x) => {
    let output = (2 * x - 1) * Math.log(x / (1 - x));
    return output;
  };

  let Nf = 0.00711;
  let Nw = 0.0023;
  let Np = 0.044;
  let F = 100;

  // Calculate Feed Mass and SWU from P and F/W/P Concentrations
  $: FF = (Np - Nw) / (Nf - Nw);
  $: SWF = VofX(Np) - VofX(Nw) - FF * (VofX(Nf) - VofX(Nw));
  $: P = F / FF;
  $: SWU = P * SWF;
        
</script>



<section class="swu-container">
  <NumberInput
    label="Feed Concentration"
    helperText="Natural Uranium is ~0.00711 U235"
    min={0.0001}
    max={0.9999}
    step={0.0001}
    bind:value={Nf}
  />
  <NumberInput
    label="Waste Concentration"
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
    <h4><strong>PRODUCT MASS</strong>: {P.toFixed()}</h4>
  </div>
  <div class="result">
    <h4><strong>SWU</strong>: {SWU.toFixed()}</h4>
  </div>
</section>

<style>
</style>
