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
			else {
				const val = passObj[key];
				switch (key) {
					case 'byr':
						if (!onlyNums(val)) valid = false;
						if (val < 1920 || val > 2002) valid = false;
						break;

					case 'iyr':
						if (!onlyNums(val)) valid = false;
						if (val < 2010 || val > 2020) valid = false;
						break;

					case 'eyr':
						if (!onlyNums(val)) valid = false;
						if (val < 2020 || val > 2030) valid = false;
						break;

					case 'hgt':
						const unit = val.slice(-2);
						const num = val.slice(0, -2);
						if (!onlyNums(num)) valid = false;
						if (unit === 'cm') {
							if (num < 150 || num > 193) valid = false;
						} else if (unit === 'in') {
							if (num < 59 || num > 76) valid = false;
						} else valid = false;
						break;

					case 'hcl':
						const hexNum = val.substr(1);
						if (val.charAt(0) !== '#') valid = false;
						// Suspicious
						if (!/[0-9a-f]{6}/g.test(hexNum)) valid = false;
						break;

					case 'ecl':
						const clrs = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
						if (!clrs.includes(val)) valid = false;
						break;

					case 'pid':
						if (val.length !== 9) valid = false;
						// Suspicious
						if (!onlyNums(val)) valid = false;
						break;

					default:
				}
			}
		});
		if (valid) validPassports++;
	});
	console.log(validPassports);
});
