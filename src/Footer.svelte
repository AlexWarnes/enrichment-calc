<script>
  import { Button } from "carbon-components-svelte";
  import LogoGithub24 from "carbon-icons-svelte/lib/LogoGithub24";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import { ClickableTile } from "carbon-components-svelte";
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

<footer>
  <div class="content">
    <h4>References</h4>
    {#each references as R}
      <ClickableTile href={R.url} target="_blank">
        <h5 class="title">{R.title}</h5>
        <span class="icon-wrapper">
          <Launch16 />
        </span>
        <p class="subtitle">{R.subtitle}</p>
        <p class="authors">{R.authors}</p>
        <p class="date">{R.date}</p>
        <p class="link">{R.url}</p>
      </ClickableTile>
    {/each}
  </div>
  <div class="bottom-row">
    <Button
      kind="tertiary"
      href="https://github.com/AlexWarnes/enrichment-calc"
      tooltipPosition="top"
      tooltipAlignment="center"
      iconDescription="GitHub"
      disabled={false}
      icon={LogoGithub24}
    />
  </div>
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid #393939;
    margin: 48px 0 0;
  }
  footer .content {
    flex-grow: 1;
    padding: 24px;
  }

  footer .bottom-row {
    display: flex;
    padding: 12px auto 0;
  }

  footer :global(.bx--tile--clickable) {
    margin: 8px auto;
    max-width: 600px;
    position: relative;
    overflow: hidden;
  }

  .title,
  .subtitle,
  .authors,
  .date,
  .link {
    word-break: break-word;
  }
  .subtitle,
  .authors,
  .date,
  .link {
    font-size: 1em;
  }
  .authors {
    font-style: italic;
  }
  .link {
    color: #71ade8;
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }

  .icon-wrapper {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  footer :global(.bx--btn) {
    color: #ffffff;
  }
  footer
    :global(.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:hover) {
    cursor: pointer;
    color: #333333;
  }
</style>
