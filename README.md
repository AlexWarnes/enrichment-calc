# Enrichment Calculator

_Create, refine, and connect dynamic gas-centrifuge enrichment calculators._

**Try it: [https://enrichment-calc.netlify.app](https://enrichment-calc.netlify.app)**

## How to use it?
Different calculators are provided depending on your scenario and what you want to calculate. Each is named for the values that will be calculated:
* **Feed and SWU** calculates feed mass and SWU
* **Product and SWU** calculates product mass and SWU
* **Feed and Product** calculates feed mass and product mass

### Create a Calculator
Under "Add Calculator" click the button for the type of calculator you want to use.

### Refine Values
Each calculator has the same inputs, but will differ in which inputs are enabled or disabled. 

Adjust the values on enabled inputs, and your output will be automatically updated.

The calculators do allow for physically impossible values (e.g. a product mass greater than the feed mass). There are some indicators to let you know something is off:
* Greyed out bars in the calculator visualization
* Negative or Infinity SWU

**Feedback:** I've considered a notification system to warn against common issues like downblending that causes negative SWU or waste enrichment that exceeds feed enrichment. Let me know if that would be worthwhile.

### Connect Calculators
You might want the output of one calculator to drive the values in the next calculator. You can see the links as a color-coded icons on connected output/input folders. To accomplish this:

#### Start a Link: 
Click _Link Output Values_ button (blue chevron pointing right) for the material you want to use

#### Connect Link to Target
Click a valid _Input Link Values_ button (blue circle) - these will appear automatically when you've started a link

**NOTE:** To cancel the link process without choosing an input, just right click anywhere

### Remove Connections
To delete a link, click the color-coded link icon and it will be removed.

If you delete a calculator, any connections will also be deleted.

### Reading the Visualization Bars
Each calculator has visualization bars to show the mass and enrichment level for Feed, Product, and Waste material.

The width of the dashed bar always reflects to Feed mass (which is equal to Product mass + Waste mass)

Yellow indicates the total mass, and red is the percentage of enriched material.

**Feedback:** I would love to incorporate more useful visualizations. If you have ideas, let me know!

### References
These calculators are built using the math and formulas of [Federation of American Scientists (FAS)](https://fas.org/) and the [URENCO](https://www.urenco.com/swu-calculator) calculator.

Additional references can be found on the references page: [https://enrichment-calc.netlify.app/references](https://enrichment-calc.netlify.app/references)

## Built With

- [Svelte](https://svelte.dev)

- [Lucide Icons](https://lucide.dev//)

- [Svelte Tweakpane UI](https://kitschpatrol.com/svelte-tweakpane-ui)

- [Netlify](https://www.netlify.com/)
