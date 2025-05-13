<script lang="ts">
  import "../app.css";
  import BlueskyIcon from "$lib/BlueskyIcon.svelte";
  import { Radius, Github, BookText } from "@lucide/svelte";

  let { children } = $props();
</script>

<nav>
  <a class="nav-link" href="/" title="Home">
    <h1><Radius />Enrichment Calculator</h1>
  </a>

  <span class="flex-spacer"></span>
  <a class="nav-link" href="/references" title="References">
    <BookText />
  </a>
  <a
    href="https://github.com/AlexWarnes/enrichment-calc"
    target="_blank"
    rel="noopener noreferrer"
    title="GitHub"
  >
    <Github />
  </a>
  <a
    href="https://bsky.app/profile/awarnes.bsky.social"
    target="_blank"
    rel="noopener noreferrer"
    title="Bluesky"
  >
    <BlueskyIcon />
  </a>
</nav>

{@render children()}

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background: var(--bg-tweak-dark);
    gap: 1.25rem;
  }
  nav h1 {
    font-weight: 400;
    font-size: 1.25rem;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  nav a {
    color: var(--color);
    text-decoration: none;
  }
</style>
