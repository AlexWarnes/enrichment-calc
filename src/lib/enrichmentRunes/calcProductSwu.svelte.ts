import type { EnrichmentValues } from '$lib/models.js';
import { VofX, defaultValues } from '../mathUtils.js'

export class ProductSwuCalculator {

	constructor(initialValues: Partial<EnrichmentValues> = {}) {
		this.Nf = initialValues.Nf ?? defaultValues.Nf;
		this.F = initialValues.F ?? defaultValues.F;
		this.Np = initialValues.Np ?? defaultValues.Np;
		this.Nw = initialValues.Nw ?? defaultValues.Nw;
	}

	// feed concentration
	Nf = $state(defaultValues.Nf);
	
	// product mass
	F = $state(defaultValues.F);
	// product concentration
	Np = $state(defaultValues.Np);

  // waste concentration
	Nw = $state(defaultValues.Nw);

	// Calculate Feed Mass and SWU from P and F/W/P Concentrations
	FF = $derived((this.Np - this.Nw) / (this.Nf - this.Nw));
	SWF = $derived(VofX(this.Np) - VofX(this.Nw) - this.FF * (VofX(this.Nf) - VofX(this.Nw)));
	
	// product mass
	P = $derived(this.F / this.FF);
	SWU = $derived( this.P * this.SWF);

	// waste mass
	W = $derived((this.F - this.P ) || 0);
}
