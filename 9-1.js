const fs = require('fs');

const SIZE = 25;

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const editedData = data.slice(0, -1); // remove final newline
	const nums = editedData.split('\n').map((x) => +x);
	for (var index = SIZE; index < nums.length; index++) {
		var valid = false;
		for (var i = index - SIZE; i < index; i++) {
			for (var j = i + 1; j < index; j++) {
				if (nums[index] === nums[i] + nums[j]) {
					valid = true;
					break;
				}
			}
			if (valid) break;
		}

		if (!valid) {
			// weakness found at index
			console.log(nums[index]);
			break;
		}
	}
});
