const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const alpha = 'abcdefghijklmnopqrstuvwxyz';

	var yeses = 0;
	const groups = data.split('\n\n');
	groups.forEach((group) => {
		const yes = {};
		for (var i = 0; i < alpha.length; i++) yes[alpha.charAt(i)] = false;
		const people = group.split('\n');
		// const lastPers = people.pop();
		// if(!lastPers)
		// 	people.push(lastPers);

		people.forEach((person) => {
			for (var i = 0; i < person.length; i++) yes[person.charAt(i)] = true;
		});

		Object.values(yes).forEach((v) => {
			if (v) yeses++;
		});
	});

	console.log(yeses);
});
