import { FeedProductCalculator } from "./enrichmentRunes/calcFeedProduct.svelte";
import { FeedSwuCalculator } from "./enrichmentRunes/calcFeedSwu.svelte";
import { ProductSwuCalculator } from "./enrichmentRunes/calcProductSwu.svelte";
import { SwuCalculator } from "./enrichmentRunes/calcSwu.svelte";
import type { CalcConfig, CalcType, Calculator, EnrichmentValues, Link, LinkValues } from "./models"

type CalcState = {
  calculators: CalcConfig[],
  links: Link[],
  creatingLink: Partial<LinkValues> | null;
  linkColorIndex: number;
}
export const calcState = $state<CalcState>({
  calculators: [],
  links: [],
  creatingLink: null,
  linkColorIndex: -1,
})

export function cancelLink(){
  calcState.creatingLink = null;
}

const linkColors = [
  "#efb118",
  "#ff725c",
  "#6cc5b0",
  "#3ca951",
  "#ff8ab7",
  "#a463f2",
  "#97bbf5",
  "#9c6b4e",
  "#9498a0",
  "#4269d0",
]

function initCalcByType(type: CalcType, initialValues: Partial<EnrichmentValues>): Calculator {
      switch (type) {
      case "FeedSwu":
        return new FeedSwuCalculator(initialValues);
      case "ProductSwu":
        return new ProductSwuCalculator(initialValues);
      case "FeedProduct":
        return new FeedProductCalculator(initialValues);
      case "SWU":
        return new SwuCalculator(initialValues);
    }
}

export function addCalculator(type: CalcType, initialValues: Partial<EnrichmentValues>): void {
  const newCalc: CalcConfig = {
    id: crypto.randomUUID(),
    type,
    initialValues,
    calc: initCalcByType(type, initialValues),
  }
  calcState.calculators.push(newCalc)
}

export function removeCalculator(id: string): void {
  clearLinksForCalculatorID(id)
  calcState.calculators = calcState.calculators.filter(calc => {
    return calc.id !== id;
  })
}

function clearLinksForCalculatorID(id: string):void {
  const updatedLinks = calcState.links.filter(link => {
    return link.source.id !== id && link.target.id !== id;
  })
  calcState.links = updatedLinks
}

export function addLink({ source, target }: LinkValues){
  // A count of links created to reduce duplicate colors
  // if links are quickly created and removed
  updateLinkCounter()
  const link = {
    id: crypto.randomUUID(),
    source,
    target,
    color: linkColors[calcState.linkColorIndex]
  }

  calcState.links.push(link)
}

export function removeLink({id}: Link): void {
  calcState.links = calcState.links.filter((link: Link) => {
    return link.id !== id
  })
}

function updateLinkCounter(): void {
  if (calcState.linkColorIndex >= linkColors.length){
    calcState.linkColorIndex = 0;
  } else {
    calcState.linkColorIndex++
  }
}

// export function testLinkPF(){
//   const source = calcState.calculators[0]
//   const sourceID = source.id
//   const sourceOutputKey = 'P'
//   const target = calcState.calculators[1]
//   const targetID = target.id
//   const targetInputKey = 'F'

//   const link = {
//     id: crypto.randomUUID(),
//     source: {
//       id: sourceID,
//       key: sourceOutputKey,
//     },
//     target: {
//       id: targetID,
//       key: targetInputKey,
//     }
//   }

//   calcState.links.push(link)
// }

