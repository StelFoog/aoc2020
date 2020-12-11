const fs = require('fs');

Array.prototype.equals = function (array) {
	if (!array) return false;

	if (!(array instanceof Array)) return false;

	if (this.length !== array.length) return false;

	for (var index = 0; index < this.length; index++) {
		if (this[index] !== array[index]) return false;
	}
	return true;
};

String.prototype.replaceAt = function (index, replacement) {
	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const rows = data.split('\n');
	rows.pop();
	rows.forEach((row, index) => {
		rows[index] = '.' + row + '.';
	});
	rows.unshift('.'.repeat(rows[1].length));
	rows.push((' ' + rows[0]).slice(1));

	var oldRows = [...rows];
	var newRows = [...oldRows];

	while (true) {
		for (var i = 1; i < oldRows.length - 1; i++) {
			const row = oldRows[i];
			for (var j = 1; j < row.length - 1; j++) {
				// unoccupied
				if (row.charAt(j) === 'L') {
					var valid = true;
					if (oldRows[i - 1].substr(j - 1, 3).includes('#')) valid = false;
					if (oldRows[i + 1].substr(j - 1, 3).includes('#')) valid = false;
					if (row.charAt(j - 1) === '#' || row.charAt(j + 1) === '#') valid = false;

					if (valid) newRows[i] = newRows[i].replaceAt(j, '#');
				}
				// occupied
				if (row.charAt(j) === '#') {
					var occupiedNextTo = 0;
					occupiedNextTo += oldRows[i - 1].substr(j - 1, 3).split('#').length - 1;

					occupiedNextTo += oldRows[i + 1].substr(j - 1, 3).split('#').length - 1;
					if (row.charAt(j - 1) === '#') occupiedNextTo++;
					if (row.charAt(j + 1) === '#') occupiedNextTo++;

					if (occupiedNextTo >= 4) newRows[i] = newRows[i].replaceAt(j, 'L');
				}
			}
		}
		// exit condition
		if (newRows.equals(oldRows)) break;
		// bewfore next repeat
		oldRows = [...newRows];
	}

	var countOccupied = 0;
	oldRows.forEach((row) => {
		countOccupied += row.split('#').length - 1;
	});

	console.log(countOccupied);
});
