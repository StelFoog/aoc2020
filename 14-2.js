const fs = require('fs');

String.prototype.replaceAt = function (index, replacement) {
	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

function allAddresses(maskedAddr) {
	var arr = [];
	for (var i = 0; i < maskedAddr.length; i++) {
		const char = maskedAddr.charAt(i);
		if (char !== 'X') continue;
		var newArr = [];
		if (arr.length <= 0) {
			newArr.push(maskedAddr.replaceAt(i, '0'));
			newArr.push(maskedAddr.replaceAt(i, '1'));
		} else {
			arr.forEach((a) => {
				newArr.push(a.replaceAt(i, '0'));
				newArr.push(a.replaceAt(i, '1'));
			});
		}
		arr = newArr;
	}
	return arr;
}

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	var mask = '';
	var mem = {}; // could not be an array, we're dealing with too large numbers

	const ops = data.split('\n');
	ops.pop();
	ops.forEach((op, index) => {
		const splt = op.split(' = ');
		if (splt[0] === 'mask') {
			mask = splt[1];
		} else {
			var maskedAddr = parseInt(splt[0].slice(4, splt[0].length - 1)).toString(2);
			var val = parseInt(splt[1]);
			while (maskedAddr.length < mask.length) maskedAddr = '0' + maskedAddr;
			for (var i = 0; i < mask.length; i++) {
				const char = mask.charAt(i);
				if (char === '0') continue;
				maskedAddr = maskedAddr.replaceAt(i, char);
			}
			allAddresses(maskedAddr).forEach((a) => {
				mem[a] = val;
			});
		}
	});
	var sum = 0;
	Object.values(mem).forEach((v) => {
		sum += v;
	});

	console.log(sum);
});
