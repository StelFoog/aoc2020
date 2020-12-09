const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	var accumulator = 0;
	const instructions = data.split('\n');
	instructions.pop();
	var instructionOrder = [];
	instructions.forEach(() => {
		instructionOrder.push(null);
	});

	var currInstruction = 0;
	var step = 0;
	while (instructionOrder[currInstruction] === null) {
		step++;
		instructionOrder[currInstruction] = step;
		const instruction = instructions[currInstruction].split(' ');
		switch (instruction[0]) {
			case 'nop':
				currInstruction++;
				break;

			case 'acc':
				currInstruction++;
				accumulator += parseInt(instruction[1]);
				break;

			case 'jmp':
				currInstruction += parseInt(instruction[1]);
				break;
		}
	}
	console.log(accumulator);
});
