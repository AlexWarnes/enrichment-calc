export type CalcType = "FeedSwu" | "ProductSwu" | "FeedProduct" | "SWU";

export type CalcConfig = {
	id: string;
	type: CalcType;
	initialValues: Partial<EnrichmentValues>;
	calc: Calculator
}

export type EnrichmentValues = {
	F: number;
	Nf: number;
	P: number;
	Np: number;
	W: number;
	Nw: number;
	SWU: number;
}

export type Calculator = EnrichmentValues & {
	// Leave open to other calculator methods
}

export type LinkValues = {
	color?: string;
	source: {
		id: string,
		keys: (keyof EnrichmentValues)[];
	},
	target: {
		id: string,
		keys: (keyof EnrichmentValues)[];
	}
}

export type Link = LinkValues & {
	id: string;
}