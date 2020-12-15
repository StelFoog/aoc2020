const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	var mem = data
		.slice(0, -1)
		.split(',')
		.map((x) => +x);
	turn = mem.length;
	while (turn < 2020) {
		const prevTurn = turn - 1;
		const prev = mem[prevTurn];
		var i;
		for (i = prevTurn - 1; i >= 0; i--) {
			if (mem[i] === prev) {
				mem.push(prevTurn - i);
				break;
			}
		}
		if (i < 0) mem.push(0);
		turn++;
	}
	console.log(mem[turn - 1]);
});
