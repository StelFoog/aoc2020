const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const splt = data.split('\n');
	const departures = splt[1].split(',').map((x) => {
		if (x === 'x') return null;
		else return +x;
	});

	var i;
	var t = departures[0];
	var diff = departures[0];
	for (i = 1; i < departures.length; i++) {
		if (departures[i] === null) continue;
		var found = false;
		for (var j = t; ; j += diff) {
			if ((j + i) % departures[i] === 0) {
				if (found) {
					diff = j - t;
					break;
				}
				t = j;
				found = true;
			}
		}
	}

	console.log(t);
});
