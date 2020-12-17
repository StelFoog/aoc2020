const fs = require('fs');

const CYCLES = 6;

function printCubes(cubes) {
	for (var z = 1; z < cubes[0][0].length - 1; z++) {
		console.log('z = ', z - CYCLES - 1);
		for (var y = 1; y < cubes[0].length - 1; y++) {
			var line = '';
			for (var x = 1; x < cubes.length - 1; x++) {
				line += cubes[x][y][z];
			}
			console.log(line);
		}
		console.log();
	}
}

function neighborActive(cubes, x, y, z) {
	var active = 0;
	for (var a = x - 1; a <= x + 1; a++) {
		for (var b = y - 1; b <= y + 1; b++) {
			for (var c = z - 1; c <= z + 1; c++) {
				if (!(a === x && b === y && c === z)) {
					// console.log(a, b, c);
					if (cubes[a][b][c] === '#') active++;
				}
			}
		}
	}
	return active;
}

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const splt = data.split('\n');
	splt.pop();
	var cubes = [];
	for (var x = 0; x < CYCLES * 2 + 2 + splt[0].length; x++) {
		cubes[x] = [];
		for (var y = 0; y < CYCLES * 2 + 2 + splt.length; y++) {
			cubes[x][y] = [];
			for (var z = 0; z < CYCLES * 2 + 3; z++) {
				if (z === CYCLES + 1) {
					if (y >= CYCLES + 1 && y <= CYCLES + splt.length) {
						if (x >= CYCLES + 1 && x <= CYCLES + splt[0].length) {
							cubes[x][y][z] = splt[y - CYCLES - 1].charAt(x - CYCLES - 1);
							continue;
						}
					}
				}
				cubes[x][y][z] = '.';
			}
		}
	}

	// printCubes(cubes);
	for (var i = 1; i <= CYCLES; i++) {
		var newCubes = JSON.parse(JSON.stringify(cubes));
		for (var x = 1; x < cubes.length - 1; x++) {
			for (var y = 1; y < cubes[x].length - 1; y++) {
				for (var z = 1; z < cubes[x][y].length - 1; z++) {
					const activeNeighbors = neighborActive(cubes, x, y, z);
					if (cubes[x][y][z] === '#') {
						if (activeNeighbors !== 2 && activeNeighbors !== 3) newCubes[x][y][z] = '.';
					} else {
						if (activeNeighbors === 3) newCubes[x][y][z] = '#';
					}
				}
			}
		}
		cubes = newCubes;
		// printCubes(cubes);
	}

	var sumActive = 0;
	for (var x = 1; x < cubes.length - 1; x++) {
		for (var y = 1; y < cubes[x].length - 1; y++) {
			for (var z = 1; z < cubes[x][y].length - 1; z++) {
				if (cubes[x][y][z] === '#') sumActive++;
			}
		}
	}
	console.log(sumActive);
});
