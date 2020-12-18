const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const seats = data.split('\n');
	seats.pop();
	seatIds = [];
	var hiSeat = 0;
	var loSeat = 1000;
	seats.forEach((seat) => {
		const row = seat.substr(0, 7);
		const col = seat.slice(-3);

		var rowMin = 0;
		var rowMax = 127;
		for (var i = 0; i < 7; i++) {
			const mid = Math.ceil((rowMax - rowMin) / 2);
			const char = row.charAt(i);
			if (char === 'F') rowMax -= mid;
			else if (char === 'B') rowMin += mid;
		}

		var colMin = 0;
		var colMax = 7;
		for (var i = 0; i < 3; i++) {
			const mid = Math.ceil((colMax - colMin) / 2);
			const char = col.charAt(i);
			if (char === 'L') colMax -= mid;
			else if (char === 'R') colMin += mid;
		}

		const seatId = rowMax * 8 + colMax;
		seatIds.push(seatId);
		if (seatId > hiSeat) hiSeat = seatId;
		if (seatId < loSeat) loSeat = seatId;
	});
	// seatIds.sort((a,b) => a - b);
	// seatIds.forEach((seatId, index) => {
	// 	if(index !== 0 || index !== seatIds.length - 1) {

	// 	}
	// })

	for (var i = loSeat + 1; i < hiSeat; i++) {
		if (!seatIds.includes(i)) console.log(i);
	}
});
