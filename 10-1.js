const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const adapters = data.split('\n').map((x) => +x);
	adapters.pop();
	adapters.sort((a, b) => a - b);
	// const maxValue = Math.max(...adapters);
	const maxValue = adapters[adapters.length - 1];

	var currJolt = 0;
	var oneJoltDiff = adapters[currJolt] === 1 ? 1 : 0;
	var threeJoltDiff = adapters[currJolt] === 3 ? 2 : 1;
	while (adapters[currJolt] != maxValue) {
		const currJoltVal = adapters[currJolt];
		const next = adapters[currJolt + 1];
		if (next === currJoltVal + 3) threeJoltDiff++;
		else oneJoltDiff++;

		currJolt++;
	}

	console.log(oneJoltDiff * threeJoltDiff);
});
