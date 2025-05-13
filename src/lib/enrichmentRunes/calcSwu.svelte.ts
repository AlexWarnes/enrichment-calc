import type { EnrichmentValues } from '$lib/models.js';
import { VofX, defaultValues } from '../mathUtils.js'

export class SwuCalculator {
  // feed mass
  F = $state(defaultValues.F)
  // feed concentration
  Nf = $state(defaultValues.Nf);
  
  // product mass
  P = $state(defaultValues.P);
  // product concentration
  Np = $state(defaultValues.Np);

  // waste mass
  W = $derived((this.F - this.P ) || 0);
  // waste concentration
  Nw = $state(defaultValues.Nw);

  // Calculate SWU
  SWU = $derived(this.P * VofX(this.Np) + this.W * VofX(this.Nw) - this.F * VofX(this.Nf));

  u235Mass = $derived(this.Nf * this.F)
  constructor(initialValues: Partial<EnrichmentValues> = {}) {
    this.F = initialValues.F ?? defaultValues.F;
    this.Nf = initialValues.Nf ?? defaultValues.Nf;
    this.P = initialValues.P ?? defaultValues.P;
    this.Np = initialValues.Np ?? defaultValues.Np;
    this.Nw = initialValues.Nw ?? defaultValues.Nw;
  }
}