const fs = require('fs');

function newDirr(dirr, left) {
	if (left) {
		if (dirr === 'n') return 'w';
		if (dirr === 'w') return 's';
		if (dirr === 's') return 'e';
		if (dirr === 'e') return 'n';
	} else {
		if (dirr === 'n') return 'e';
		if (dirr === 'e') return 's';
		if (dirr === 's') return 'w';
		if (dirr === 'w') return 'n';
	}
}

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const actions = data.split('\n');
	actions.pop();
	var dirr = 'e';
	var east = 0;
	var north = 0;
	actions.forEach((action) => {
		const op = action.charAt(0);
		const val = parseInt(action.substr(1));
		switch (op) {
			case 'N':
				north += val;
				break;
			case 'S':
				north -= val;
				break;
			case 'E':
				east += val;
				break;
			case 'W':
				east -= val;
				break;
			case 'L':
				for (var i = 0; i < val / 90; i++) dirr = newDirr(dirr, true);
				break;
			case 'R':
				for (var i = 0; i < val / 90; i++) dirr = newDirr(dirr, false);
				break;
			case 'F':
				switch (dirr) {
					case 'n':
						north += val;
						break;
					case 's':
						north -= val;
						break;
					case 'e':
						east += val;
						break;
					case 'w':
						east -= val;
						break;
				}
				break;
		}
	});
	console.log(Math.abs(north) + Math.abs(east));
});
