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
			const target = nums[index];
			for (var i = 0; i < nums.length - 1; i++) {
				var j = 1;
				var sum = nums[i] + nums[i + j];

				var max;
				var min;
				if (nums[i] > nums[i + j]) {
					max = nums[i];
					min = nums[i + j];
				} else {
					min = nums[i];
					max = nums[i + j];
				}

				while (sum < target) {
					j++;
					sum += nums[i + j];
					if (nums[i + j] > max) max = nums[i + j];
					if (nums[i + j] < min) min = nums[i + j];
				}
				console.log('sum = ', sum, '\ntarget = ', target);
				if (sum === target) {
					console.log(max + min);
					break;
				}
			}
			break;
		}
	}
});
