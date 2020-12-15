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
	var past = {};
	for (var i = 0; i < turn - 1; i++) {
		past[mem[i]] = i;
	}
	while (turn < 30000000) {
		const prevTurn = turn - 1;
		const prev = mem[prevTurn];
		if (past[prev] !== undefined) {
			mem.push(prevTurn - past[prev]);
		} else {
			mem.push(0);
		}
		past[mem[prevTurn]] = prevTurn;
		turn++;
	}
	console.log(mem[turn - 1]);
});
