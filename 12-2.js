const fs = require('fs');

function newDirr(wp, left) {
	if (left) {
		return {
			east: -wp.north,
			north: wp.east,
		};
	} else {
		return {
			east: wp.north,
			north: -wp.east,
		};
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
	var east = 0;
	var north = 0;
	var wp = {
		east: 10,
		north: 1,
	};
	actions.forEach((action) => {
		const op = action.charAt(0);
		const val = parseInt(action.substr(1));
		switch (op) {
			case 'N':
				wp.north += val;
				break;
			case 'S':
				wp.north -= val;
				break;
			case 'E':
				wp.east += val;
				break;
			case 'W':
				wp.east -= val;
				break;
			case 'L':
				for (var i = 0; i < val / 90; i++) wp = newDirr(wp, true);
				break;
			case 'R':
				for (var i = 0; i < val / 90; i++) wp = newDirr(wp, false);
				break;
			case 'F':
				north += wp.north * val;
				east += wp.east * val;
				break;
		}
	});

	console.log(Math.abs(north) + Math.abs(east));
});
