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

function seenSeats(oldRows, x, y) {
	var seats = [];
	var i;
	var j;

	// i- j=
	i = x - 1;
	j = y;
	while (i > 0) {
		const char = oldRows[i].charAt(j);
		if (char === '#') {
			seats.push('#');
			break;
		}
		if (char === 'L') {
			seats.push('L');
			break;
		}
		i--;
	}
	if (i <= 0) {
		seats.push('.');
	}
	// i+ j=
	i = x + 1;
	j = y;
	while (i < oldRows.length - 1) {
		const char = oldRows[i].charAt(j);
		if (char === '#') {
			seats.push('#');
			break;
		}
		if (char === 'L') {
			seats.push('L');
			break;
		}
		i++;
	}
	if (i >= oldRows.length - 1) {
		seats.push('.');
	}
	// i= j-
	i = x;
	j = y - 1;
	while (j > 0) {
		const char = oldRows[i].charAt(j);
		if (char === '#') {
			seats.push('#');
			break;
		}
		if (char === 'L') {
			seats.push('L');
			break;
		}
		j--;
	}
	if (j <= 0) {
		seats.push('.');
	}
	// i= j+
	i = x;
	j = y + 1;
	while (j < oldRows[i].length - 1) {
		const char = oldRows[i].charAt(j);
		if (char === '#') {
			seats.push('#');
			break;
		}
		if (char === 'L') {
			seats.push('L');
			break;
		}
		j++;
	}
	if (j >= oldRows[i].length - 1) {
		seats.push('.');
	}
	// i- j-
	i = x - 1;
	j = y + 1;
	while (j < oldRows[i].length - 1 && i > 0) {
		const char = oldRows[i].charAt(j);
		if (char === '#') {
			seats.push('#');
			break;
		}
		if (char === 'L') {
			seats.push('L');
			break;
		}
		i--;
		j++;
	}
	if (j >= oldRows[i].length - 1 || i <= 0) {
		seats.push('.');
	}
	// i- j-
	i = x - 1;
	j = y - 1;
	while (j > 0 && i > 0) {
		const char = oldRows[i].charAt(j);
		if (char === '#') {
			seats.push('#');
			break;
		}
		if (char === 'L') {
			seats.push('L');
			break;
		}
		i--;
		j--;
	}
	if (j <= 0 || i <= 0) {
		seats.push('.');
	}
	// i+ j+
	i = x + 1;
	j = y + 1;
	while (j < oldRows[i].length - 1 && i < oldRows.length - 1) {
		const char = oldRows[i].charAt(j);
		if (char === '#') {
			seats.push('#');
			break;
		}
		if (char === 'L') {
			seats.push('L');
			break;
		}
		i++;
		j++;
	}
	if (j >= oldRows[i].length - 1 || i >= oldRows.length - 1) {
		seats.push('.');
	}
	// i+ j-
	i = x + 1;
	j = y - 1;
	while (j > 0 && i < oldRows.length - 1) {
		const char = oldRows[i].charAt(j);
		if (char === '#') {
			seats.push('#');
			break;
		}
		if (char === 'L') {
			seats.push('L');
			break;
		}
		i++;
		j--;
	}
	if (j <= 0 || i >= oldRows.length - 1) {
		seats.push('.');
	}

	if (seats.length !== 8) console.log('Error');
	return seats;
}

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
				const seens = seenSeats(oldRows, i, j);
				// unoccupied
				if (row.charAt(j) === 'L') {
					if (!seens.includes('#')) newRows[i] = newRows[i].replaceAt(j, '#');
				}
				// occupied
				if (row.charAt(j) === '#') {
					var occupiedNextTo = 0;

					seens.forEach((seen) => {
						if (seen === '#') occupiedNextTo++;
					});

					if (occupiedNextTo >= 5) newRows[i] = newRows[i].replaceAt(j, 'L');
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
