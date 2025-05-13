<script lang="ts">
  import type { EnrichmentValues, Link } from "./models";

  const {
    targetKeys,
    sourceKeys,
    activeKey,
  }: {
    targetKeys: (keyof EnrichmentValues)[];
    sourceKeys: (keyof EnrichmentValues)[];
    activeKey: keyof EnrichmentValues;
  } = $props();

</script>

<div class="links">
  {#if targetKeys.includes(activeKey)}
    <div class="active-target dot"></div>
  {:else if sourceKeys.includes(activeKey)}
    <div class="active-source dot"></div>
  {/if}
</div>

<style>
  .links {
    position: absolute;
    width: 100%;
  }
  .active-target {
    background-color: var(--primary);
    box-shadow: var(--primary) 0 0 2px;
  }
  .active-source {
    background-color: var(--primary);
    box-shadow: var(--primary) 0 0 2px;
  }
  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    position: absolute;
    top: -1.125rem;
    right: 48px;
  }
</style>
