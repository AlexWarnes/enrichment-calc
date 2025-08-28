<script lang="ts">
  import { ExternalLink } from "@lucide/svelte";

  const references = [
    {
      title: "Uranium Separative Work Unit Calculator",
      subtitle: "Description of Separative Work",
      authors: "Federation of American Scientists",
      url: "https://fas.org/programs/ssp/nukes/nuclear%20power%20and%20fuel%20cycle/swu%20calc.html",
      date: "",
    },
    {
      title: "Enrichment Cascades",
      subtitle: "",
      authors:
        "Ivan Oelrich, Ivanka Barzashka, Federation of American Scientists",
      url: "https://fas.org/programs/ssp/nukes/fuelcycle/centrifuges/cascades.html",
      date: "",
    },
    {
      title: "Separation Theory",
      subtitle: "",
      authors:
        "Ivan Oelrich, Ivanka Barzashka, Federation of American Scientists",
      url: "https://fas.org/programs/ssp/nukes/fuelcycle/centrifuges/separation_theory.html",
      date: "",
    },
    {
      title: "Nuclear Fuel Cycle / Uranium Enrichment",
      subtitle: "",
      authors:
        "World Nuclear Association",
      url: "https://world-nuclear.org/information-library/nuclear-fuel-cycle/conversion-enrichment-and-fabrication/uranium-enrichment",
      date: "6 June 2025",
    },
    {
      title: "SWU Calculator",
      subtitle: "",
      authors: "URENCO",
      url: "https://www.urenco.com/swu-calculator",
      date: "",
    },
    {
      title:
        "BASIC INFORMATION RELATING TO URANIUM-ENRICHMENT CALCULATIONS AND FUEL REQUIREMENTS FOR NUCLEAR POWER REACTORS",
      subtitle: "",
      authors: "Brown, K.T.",
      url: "https://inis.iaea.org/search/search.aspx?orig_q=RN:8330661",
      date: "1977",
    },
    {
      title: "Calculating Output of the New Iranian Uranium Enrichment Plant",
      subtitle: "",
      authors:
        "Ivan Oelrich, Ivanka Barzashka, Federation of American Scientists",
      url: "https://fas.org/blogs/security/2009/09/calculating-output-of-the-new-iranian-uranium-enrichment-plant/",
      date: "September 25, 2009",
    },
    {
      title: "Nuclear Energy Economics and Policy Analysis (PDF)",
      subtitle: "Additional Note on Uranium Enrichment and Separative Work",
      authors: "",
      url: "http://web.mit.edu/22.812j/www/enrichment.pdf",
      date: "",
    },
  ];
</script>

<div class="content">
  <h1 class="card">References</h1>
  {#each references as R}
    <div class="card panel">
      <h5 class="title">{R.title}</h5>
      <span class="icon-wrapper"> </span>
      <p class="subtitle">{R.subtitle}</p>
      <p class="authors">{R.authors}</p>
      <p class="date">{R.date}</p>
      <a
        class="source-link"
        href={R.url}
        target="_blank"
        rel="noopener noreferrer"
        >
        {R.url}
      </a>
    </div>
  {/each}
</div>

<style>
  .card {
    padding: 1rem;
    gap: 0.5rem;
    margin: 1rem auto;
    width: 100%;
    max-width: 800px;
  }

  .title {
    font-size: 1.375rem;
  }

  .title,
  .subtitle,
  .authors,
  .date {
    word-break: break-word;
    margin: 0;
  }

  .subtitle {
    margin-bottom: 1rem;
  }

  .subtitle,
  .authors,
  .date,
  .source-link {
    font-size: 1rem;
  }
  .authors {
    font-style: italic;
  }

  .source-link {
    display: block;
  }
</style>
