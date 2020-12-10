const fs = require('fs');

var opts = {};

function fillOpts(index, adapters) {
	const valAt = adapters[index];
	if (opts[valAt] !== null) return opts[valAt];

	var sum = 0;
	const alts = adapters.slice(index - 3 >= 0 ? index - 3 : 0, index);
	alts.sort((a, b) => b - a);
	if (valAt <= 3) sum++;
	alts.forEach((alt, altsIndex) => {
		const diff = valAt - alt;
		if (diff <= 3) sum += fillOpts(index - (altsIndex + 1), adapters);
	});
	opts[valAt] = sum;
	return sum;
}

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const adapters = data.split('\n').map((x) => +x);
	adapters.pop();
	adapters.sort((a, b) => a - b);

	adapters.forEach((a) => {
		opts[a] = null;
	});
	opts[0] = 1;
	opts[adapters[0]] = 1;

	console.log(fillOpts(adapters.length - 1, adapters));
});
