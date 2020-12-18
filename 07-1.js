const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	var rules = {};
	const rulesRaw = data.split('\n');
	rulesRaw.pop();

	rulesRaw.forEach((ruleRaw) => {
		const rrSplt = ruleRaw.split(' bags contain ');
		const outerBag = rrSplt[0];
		rules[outerBag] = {};
		if (rrSplt[1] !== 'no other bags.') {
			const innerBags = rrSplt[1].split(',');
			innerBags.forEach((bagRule) => {
				if (bagRule.charAt(0) === ' ') bagRule = bagRule.substr(1);
				const innerRule = bagRule.split(' ');
				const num = parseInt(innerRule[0]);
				innerBag = innerRule[1] + ' ' + innerRule[2];
				rules[outerBag][innerBag] = num;
			});
		}
	});

	const keys = Object.keys(rules);
	var okBags = [];
	keys.forEach((key) => {
		if (rules[key]['shiny gold']) okBags.push(key);
	});

	for (var i = 0; i < okBags.length; i++) {
		keys.forEach((key) => {
			if (!okBags.includes(key)) {
				if (rules[key][okBags[i]]) {
					okBags.push(key);
				}
			}
		});
	}

	console.log(okBags.length);
});
