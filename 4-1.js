const fs = require('fs');

const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const onlyNums = (str) => /^\d+$/.test(str);

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const passes = data.split('\n\n');
	var validPassports = 0;
	passes.forEach((pass, index) => {
		var passObj = {};
		pass = pass.replace(/\n/g, ' ');
		var passSplt = pass.split(' ');
		const lastPassVal = passSplt.pop();
		if (lastPassVal) passSplt.push(lastPassVal);
		passSplt.forEach((pair) => {
			const key = pair.split(':');
			passObj[key[0]] = key[1];
		});

		var valid = true;
		fields.forEach((key) => {
			if (!passObj[key]) valid = false;
		});
		if (valid) validPassports++;
	});
	console.log(validPassports);
});
