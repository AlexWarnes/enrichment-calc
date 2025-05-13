import type { EnrichmentValues } from '$lib/models.js';
import { VofX, defaultValues } from '../mathUtils.js'

export class FeedProductCalculator {

	constructor(initialValues: Partial<EnrichmentValues> = {}) {
		this.Nf = initialValues.Nf ?? defaultValues.Nf;
		this.Np = initialValues.Np ?? defaultValues.Np;
		this.Nw = initialValues.Nw ?? defaultValues.Nw;
		this.SWU = initialValues.SWU ?? defaultValues.SWU;
	}

	// feed concentration
	Nf = $state(defaultValues.Nf);
	
	// product concentration
	Np = $state(defaultValues.Np);

  // waste concentration
	Nw = $state(defaultValues.Nw);

	// SWU
	SWU = $state(defaultValues.SWU);

	// Calculate Feed Mass and SWU from P and F/W/P Concentrations
	FF = $derived((this.Np - this.Nw) / (this.Nf - this.Nw));
	SWF = $derived(VofX(this.Np) - VofX(this.Nw) - this.FF * (VofX(this.Nf) - VofX(this.Nw)));
	
	// feed mass
	P = $derived(this.SWU / this.SWF);
	F = $derived(this.FF * this.P);
		// product mass

	// waste mass
	W = $derived((this.F - this.P ) || 0);
	
}
