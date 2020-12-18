const { S_IFREG } = require('constants');
const fs = require('fs');
const { nextTick } = require('process');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	var accumulator = 0;
	const instructions = data.split('\n');
	instructions.pop();

	var terminates = false;
	for (var i = 0; i < instructions.length; i++) {
		const modInstructions = [...instructions];
		const instructionToMod = modInstructions[i].split(' ');
		if (instructionToMod[0] === 'acc') continue;
		else if (instructionToMod[0] === 'jmp') modInstructions[i] = 'nop ' + instructionToMod[1];
		else if (instructionToMod[0] === 'nop') modInstructions[i] = 'jmp ' + instructionToMod[1];

		accumulator = 0;
		var instructionOrder = [];
		modInstructions.forEach(() => {
			instructionOrder.push(null);
		});
		var currInstruction = 0;
		var step = 0;
		while (instructionOrder[currInstruction] === null) {
			step++;
			instructionOrder[currInstruction] = step;
			const instruction = modInstructions[currInstruction].split(' ');
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
			if (currInstruction >= modInstructions.length) {
				terminates = true;
				console.log('terminates');
				break;
			}
		}
		if (terminates) break;
	}
	console.log(terminates);
	console.log(accumulator);
});
