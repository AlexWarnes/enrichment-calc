<script lang="ts">
  import { Element } from "svelte-tweakpane-ui";
  import {
    Circle,
    CircleArrowOutDownRight,
    CircleArrowOutUpRight,
    CircleChevronRight,
  } from "@lucide/svelte";
  import { addLink, removeLink, calcState } from "./calcState.svelte";
  import type { EnrichmentValues, Link, LinkValues } from "./models";

  const {
    id,
    keys,
    inputDisabled = false,
    outputDisabled = false,
    inputLinks,
    outputLinks,
  }: {
    id: string;
    keys: (keyof EnrichmentValues)[];
    inputDisabled?: boolean;
    outputDisabled?: boolean;
    inputLinks?: Link[];
    outputLinks?: Link[];
  } = $props();

  const _inputDisabled = $derived(
    inputDisabled ||
      !calcState.creatingLink ||
      calcState.creatingLink.source?.id === id
  );
  const _outputDisabled = $derived(outputDisabled || !!calcState.creatingLink);
  const displayInputLinks = $derived.by(() => {
    return inputLinks?.filter((l) => {
      for (let key of keys) {
        return l.target.keys.includes(key);
      }
    });
  });
  const displayOutputLinks = $derived.by(() => {
    return outputLinks?.filter((l) => {
      for (let key of keys) {
        return l.source.keys.includes(key);
      }
    });
  });

  function handleLink() {
    if (!!calcState.creatingLink) {
      // handle as target
      calcState.creatingLink = {
        ...calcState.creatingLink,
        target: {
          id,
          keys,
        },
      };

      addLink(calcState.creatingLink as LinkValues);
      calcState.creatingLink = null;
    } else {
      // handle as source
      calcState.creatingLink = {
        source: {
          id,
          keys,
        },
      };
    }
  }
</script>

<Element>
  <div class="actions-row">
    <button
      class="input"
      class:active={!_inputDisabled}
      onclick={handleLink}
      disabled={_inputDisabled}
      title="Link Input Values"
    >
      <Circle size={10} />
    </button>
    <div class="inputs">
      {#if displayInputLinks?.length}
        {#each displayInputLinks as link (link.id)}
                    <!-- style="background: {link.color}; box-shadow: 0 0 2px {link.color}"   -->
        <button
            class="dot"
            title="Remove Link"
            onclick={() => removeLink(link)}
          >
          <CircleArrowOutDownRight color={link.color} size="8"/>
          </button>
        {/each}
      {/if}
    </div>
    <div class="outputs">
      {#if displayOutputLinks?.length}
        {#each displayOutputLinks as link (link.id)}
                    <!-- style="background: {link.color}; box-shadow: 0 0 2px {link.color}"   -->
        <button
            class="dot"
            title="Remove Link"
            onclick={() => removeLink(link)}
            >
            <CircleArrowOutUpRight color={link.color} size="8"/>
          </button>
        {/each}
      {/if}
    </div>
    <button
      class="output"
      class:active={!_outputDisabled}
      onclick={handleLink}
      disabled={_outputDisabled}
      title="Link Output Values"
    >
      <CircleChevronRight size={10} />
    </button>
  </div>
</Element>

<style>
  .actions-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: #dadada;
    font-family: Roboto Mono;
    font-size: 0.625rem;
  }
  button {
    background-color: transparent;
  }
  .active {
    color: var(--secondary);
  }
  .inputs,
  .outputs {
    flex: 1;
    display: inline-flex;
    align-items: center;
  }
  .inputs {
    justify-content: flex-start;
  }
  .outputs {
    justify-content: flex-end;
  }

  .dot {
    /* width: 0.5rem;
    height: 0.5rem; */
    border-radius: 50%;
    display: inline-block;
    /* position: absolute;
    top: -1.125rem;
    right: 48px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
