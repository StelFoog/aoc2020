const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const vertical = data.split('\n').filter((s) => s != ' ');
	const horizontalLength = vertical[0].length;
	var pos = { x: 0, y: 0 };
	var treesHit = 0;
	while (pos.x < vertical.length) {
		if (vertical[pos.x].charAt(pos.y % horizontalLength) === '#') treesHit++;
		pos.x += 1;
		pos.y += 3;
	}
	console.log(treesHit);
});
