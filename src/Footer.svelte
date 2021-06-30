<script>
  import { Button, OutboundLink } from "carbon-components-svelte";
  import LogoGithub24 from "carbon-icons-svelte/lib/LogoGithub24";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
</script>

<footer>
  <div class="content">
    <h4>References</h4>
    <ul>
      <li>
        <OutboundLink
          href="https://inis.iaea.org/collection/NCLCollectionStore/_Public/08/330/8330661.pdf"
          target="_blank">IAEA<Launch16 /></OutboundLink
        >
      </li>
      <li>
        <OutboundLink
          href="https://fas.org/blogs/security/2009/09/calculating-output-of-the-new-iranian-uranium-enrichment-plant/"
          target="_blank">FAS<Launch16 /></OutboundLink
        >
      </li>
      <li>
        <OutboundLink
          href="http://web.mit.edu/22.812j/www/enrichment.pdf"
          target="_blank">MIT<Launch16 /></OutboundLink
        >
      </li>
      <li>
        <OutboundLink href="https://www.urenco.com/swu-calculator" target="_blank"
          >URENCO<Launch16 /></OutboundLink
        >
      </li>
    </ul>
  </div>
  <div class="bottom-row">
    <Button
      kind="tertiary"
      href="https://github.com/AlexWarnes"
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
    margin: 48px 48px 0;
  }
  footer .content {
    flex-grow: 1;
    padding: 24px;
  }

  footer .bottom-row {
    display: flex;
    padding: 12px auto 0;
  }

  footer :global(.bx--btn) {
    color: #ffffff;
  }
  footer :global(.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:hover) {
    cursor: pointer;
    color: #333333;
  }

</style>
