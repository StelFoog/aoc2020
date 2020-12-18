const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const res = data.split('\n').map((x) => +x);
	for (var i = 0; i < res.length; i++)
		for (var j = i + 1; j < res.length; j++)
			for (var k = j + 2; k < res.length; k++)
				if (res[i] + res[j] + res[k] === 2020) console.log(res[i] * res[j] * res[k]);
});
