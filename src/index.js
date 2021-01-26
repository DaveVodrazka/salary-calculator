const {
	salaryId,
	childrenId,
	signedTaxes,
	studentId,
	invalid1,
	invalid3,
	ztp,
	outputId,
	buttonId,
} = require('./config.json');
const calculateSalary = require('./calculateSalary.js');

const elements = {
	salaryInput: document.getElementById(salaryId),
	studentInput: document.getElementById(studentId),
	childrenInput: document.getElementById(childrenId),
	signedInput: document.getElementById(signedTaxes),
	invalid1Input: document.getElementById(invalid1),
	invalid3Input: document.getElementById(invalid3),
	ztpInput: document.getElementById(ztp),
	output: document.getElementById(outputId),
	button: document.getElementById(buttonId),
};

const handleClick = (e) => {
	e.preventDefault();

	const salary = elements.salaryInput.value;
	const student = elements.studentInput.checked;
	const children = elements.childrenInput.value;
	const signed = elements.signedInput.checked;
	const invalid1 = elements.invalid1Input.checked;
	const invalid3 = elements.invalid3Input.checked;
	const ztp = elements.ztpInput.checked;

	const res = calculateSalary({
		salary,
		student,
		children,
		signed,
		invalid1,
		invalid3,
		ztp,
	});
	elements.output.innerText = res;
};

elements.button.addEventListener('click', handleClick);
