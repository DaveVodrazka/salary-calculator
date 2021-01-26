const {
	tax,
	taxHigh,
	highIncome,
	minimalWage,
	ending,
} = require('./config.json');

/**
 * Returns how much money will be deducted for children.
 * @param {} kids - How many kids.
 */
const getChildrenDiscount = (kids) => {
	// first child:   1267
	// second child:  1617
	// next children: 2017
	const n = parseInt(kids, 10);
	if (n <= 0 || !n) return 0;
	if (n === 1) return 1267;
	return 1267 + 1617 + ((n - 2) * 2017);
};

module.exports = ({
	salary,
	student,
	children,
	signed,
	invalid1,
	invalid3,
	ztp,
}) => {
	if (!salary) return 'zadejte hrubou mzdu!';
	if (salary < minimalWage) return 'mzda musí být vyšší než minimální!';
	let res = 0;
	const actualTax = salary >= highIncome ? taxHigh : tax;
	// tax
	res += (salary * (100 - actualTax)) / 100;
	// student
	res += student ? 335 : 0;
	// invalid I, II & III
	if (invalid3) {
		res += 410;
	} else if (invalid1) {
		res += 210;
	}
	// ztp
	res += ztp ? 1345 : 0;
	// signed
	res += signed ? 2320 : 0;
	// children
	res += getChildrenDiscount(children);

	return res.toLocaleString() + ending;
};
