
// VALUE FUNCTION
// V(x)=(2x-1) * ln(x/(1-x)) where x is a given concentration
export const VofX = (x: number) => {
	let output = (2 * x - 1) * Math.log(x / (1 - x));
	return output;
};

export const defaultValues = {
	F: 100,
	Nf: 0.00711,
	P: 10,
	Np: 0.05,
	Nw: 0.003,
	SWU: 100,
}

export const displayPct = (v: number): string => {
	return (v * 100).toFixed(2) + '%'
}

