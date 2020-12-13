const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const splt = data.split('\n');
	const earliest = parseInt(splt[0]);
	const departures = splt[1]
		.split(',')
		.filter((x) => x !== 'x')
		.map((x) => +x);

	var departWait = Infinity;
	var departId;
	departures.forEach((dep, index) => {
		const departTime = Math.ceil(earliest / dep) * dep - earliest;
		if (departTime < departWait) {
			departWait = departTime;
			departId = departures[index];
		}
	});

	console.log(departId * departWait);
});
