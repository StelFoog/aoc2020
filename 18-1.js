const fs = require('fs');

const isNumber = /^\d+$/;

// Takes a plain math expression and returns the result
function math(expression) {
	const exp = expression.split(' ').map((x) => {
		if (isNumber.test(x)) return +x;
		else return x;
	});

	for (var i = 1; i < exp.length - 1; i++) {
		if (exp[i] === '+') {
			const newVal = exp[i - 1] + exp[i + 1];
			exp.splice(i, 2);
			exp[i - 1] = newVal;
			i--;
		}
	}

	var res = 1;
	for (var i = 0; i < exp.length; i++) {
		if (exp[i] === '*') continue;
		res *= exp[i];
	}
	return res;
}

// returns an array of lengh 3 which contains has split the expresssion up at the index of the
// first '(' followed by a ')' before any other '(' and split at the corresponding ')' leaving us
// with an array like (with the set of parenthesis in question not included):
// [what was before parenthesis, expresssion in parenthesis, what was after parenthesis]
function parenthesisAway(expression) {
	var arr = [];
	for (var i = 0; i < expression.length; i++) {
		const char = expression.charAt(i);
		if (char === '(') arr[0] = i;
		if (char === ')') {
			arr[1] = i;
			break;
		}
	}
	return [
		expression.substr(0, arr[0]),
		expression.substr(arr[0] + 1, arr[1] - arr[0] - 1),
		expression.substr(arr[1] + 1),
	];
}

// returns the number result of the expression
function evaluate(expression) {
	while (expression.includes('(')) {
		const away = parenthesisAway(expression);
		expression = away[0] + math(away[1]) + away[2];
	}
	return math(expression);
}

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const expressions = data.slice(0, -1).split('\n');

	var sum = 0;
	expressions.forEach((expression) => {
		sum += evaluate(expression);
	});
	console.log(sum);
});
