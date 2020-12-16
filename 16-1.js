const fs = require('fs');

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const splt = data.split('\n\n');
	const rulesStrs = splt[0].split('\n');
	const myTicket = splt[1].split('\n')[1];
	const otherTickets = splt[2].split('\n').slice(1, -1);

	var rules = {};
	rulesStrs.forEach((ruleStr) => {
		const ruleSplt = ruleStr.split(': ');
		const vals = ruleSplt[1].split(' or ');
		const r0 = vals[0].split('-').map((x) => +x);
		const r1 = vals[1].split('-').map((x) => +x);
		rules[ruleSplt[0]] = function (v) {
			if (v >= r0[0] && v <= r0[1]) return true;
			if (v >= r1[0] && v <= r1[1]) return true;
			return false;
		};
	});

	const funcs = Object.values(rules);
	var errorRate = 0;
	otherTickets.forEach((ticket) => {
		const fields = ticket.split(',').map((x) => +x);
		fields.forEach((field) => {
			var validForAnyFunc = false;
			funcs.forEach((f) => {
				if (f(field)) validForAnyFunc = true;
			});
			if (!validForAnyFunc) errorRate += field;
		});
	});
	console.log(errorRate);
});
