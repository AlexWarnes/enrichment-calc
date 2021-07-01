
// VALUE FUNCTION
// V(x)=(2x-1) * ln(x/(1-x)) where x is a given concentration
export const VofX = (x) => {
	let output = (2 * x - 1) * Math.log(x / (1 - x));
	return output;
};
