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
		// for(var i = 0; i < alpha.length; i++)
		// 	yes[alpha.charAt(i)] = false;
		const people = group.split('\n');

		const lastPerson = people.pop();
		if (lastPerson) people.push(lastPerson);

		for (var i = 0; i < alpha.length; i++) {
			const char = alpha.charAt(i);
			var allYes = true;
			people.forEach((person) => {
				if (!person.includes(char)) allYes = false;
			});
			yes[char] = allYes;
		}

		Object.values(yes).forEach((v) => {
			if (v) yeses++;
		});
	});

	console.log(yeses);
});
