const fs = require('fs');

String.prototype.replaceAt = function (index, replacement) {
	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	var mask = '';
	var mem = {}; // could be an arry but this is better optimized

	const ops = data.split('\n');
	ops.pop();
	ops.forEach((op) => {
		const splt = op.split(' = ');
		if (splt[0] === 'mask') {
			mask = splt[1];
		} else {
			const addr = parseInt(splt[0].slice(4, splt[0].length - 1));
			var maskedVal = parseInt(splt[1]).toString(2);
			while (maskedVal.length < mask.length) maskedVal = '0' + maskedVal;
			// console.log(maskedVal);
			for (var i = 0; i < mask.length; i++) {
				const char = mask.charAt(i);
				if (char === 'X') continue;
				maskedVal = maskedVal.replaceAt(i, char);
			}
			// console.log(maskedVal, '\n');
			mem[addr] = maskedVal;
		}
	});

	var sum = 0;
	Object.values(mem).forEach((x) => {
		sum += parseInt(x, 2);
	});

	console.log(sum);
});
