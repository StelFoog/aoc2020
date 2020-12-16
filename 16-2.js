const fs = require('fs');

function validFields(key, tickets, rules, validFields) {
	var fieldValid = [];
	tickets[0].forEach((a, index) => {
		if (validFields[index]) fieldValid.push(false);
		else fieldValid.push(true);
	});
	for (var i = 0; i < tickets[0].length; i++) {
		if (!fieldValid[i]) continue;
		for (var j = 0; j < tickets.length; j++) {
			if (!rules[key](tickets[j][i])) {
				fieldValid[i] = false;
				break;
			}
		}
	}
	var arr = [];
	fieldValid.forEach((e, index) => {
		if (e) arr.push(index);
	});
	return arr;
}

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
	var validTickets = [];
	otherTickets.forEach((ticket) => {
		const fields = ticket.split(',').map((x) => +x);
		var allFieldsValid = true;
		fields.forEach((field) => {
			var validForAnyFunc = false;
			funcs.forEach((f) => {
				if (f(field)) validForAnyFunc = true;
			});
			if (!validForAnyFunc) allFieldsValid = false;
		});
		if (allFieldsValid) validTickets.push(fields);
	});

	const keys = Object.keys(rules);
	var fieldValues = [];
	for (var i = keys.length - 1; i >= 0; i--) fieldValues[i] = null;
	for (var k = 0; k < keys.length; k++) {
		var nextKey;
		var nextArr = [null, null, null, null, null];
		for (var i = 0; i < keys.length; i++) {
			if (fieldValues.includes(keys[i])) continue;
			const arr = validFields(keys[i], validTickets, rules, fieldValues);
			if (arr.length < nextArr.length) {
				nextKey = keys[i];
				nextArr = arr;
			}
		}
		fieldValues[nextArr[0]] = nextKey;
	}

	var departureMult = 1;
	const myTicketFields = myTicket.split(',').map((x) => +x);
	fieldValues.forEach((fv, index) => {
		if (fv) {
			if (fv.split(' ')[0] === 'departure') {
				console.log(index, myTicketFields[index]);
				departureMult = departureMult * myTicketFields[index];
			}
		}
	});
	console.log(departureMult);
});
