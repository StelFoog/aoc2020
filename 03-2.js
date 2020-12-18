const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const vertical = data.split('\n').filter((s) => s != ' ');
	const horizontalLength = vertical[0].length;
	const directions = [
		{ x: 1, y: 1 },
		{ x: 1, y: 3 },
		{ x: 1, y: 5 },
		{ x: 1, y: 7 },
		{ x: 2, y: 1 },
	];
	var treesHit = [];
	directions.forEach(() => {
		treesHit.push(0);
	});
	directions.forEach((dir, index) => {
		var pos = { x: 0, y: 0 };
		while (pos.x < vertical.length) {
			if (vertical[pos.x].charAt(pos.y % horizontalLength) === '#') treesHit[index]++;
			pos.x += dir.x;
			pos.y += dir.y;
		}
	});

	var res = 1;
	treesHit.forEach((e) => {
		res *= e;
	});
	console.log(res);
});
