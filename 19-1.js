const fs = require('fs');

const THIS = 'THIS';
const OR = 'OR';
const AND = 'AND';

var rules = {};

function followsAll(msg, index, ruleList) {
	var arr = [index];
	for (var i = 0; i < ruleList.length; i++) {
		var nextArr = [];
		for (var j = 0; j < arr.length; j++) {
			const res = followsRules(msg, [arr[j]], ruleList[i]);
			// console.log('res', res);
			if (res.length >= 1) nextArr.push(...res);
		}
		if (nextArr.length <= 0) return [];
		arr = nextArr;
	}
	return arr;
}

function followsRules(msg, indexArr, nr) {
	const rule = rules[nr];
	// console.log(nr, rule);

	var arr = [];
	indexArr.forEach((index) => {
		switch (rule.type) {
			case THIS:
				// console.log('msg.charAt(', index, ') = ', msg.charAt(index));
				if (rule.val === msg.charAt(index)) {
					if (index + 1 <= msg.length) arr.push(index + 1);
				}
				break;
			case OR:
				const or0 = followsAll(msg, index, rule.val[0]);
				const or1 = followsAll(msg, index, rule.val[1]);
				if (or0.length >= 1) arr.push(...or0);
				if (or1.length >= 1) arr.push(...or1);
				break;
			case AND:
				const res = followsAll(msg, index, rules[nr].val);
				if (res.length >= 1) arr.push(...res);
				break;
		}
	});

	return arr;
}

function followsRulesBool(msg) {
	// console.log(msg);
	const res = followsRules(msg, [0], '0');
	// console.log('RESULT: ', res);
	// console.log('MSG LENGTH: ', msg.length);
	for (var i = 0; i < res.length; i++) {
		if (res[i] === msg.length) return true;
	}
	return false;
}

fs.readFile('./input', 'UTF-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const dataSplt = data.slice(0, -1).split('\n\n');
	const ruleStrs = dataSplt[0].split('\n');
	const messages = dataSplt[1].split('\n');

	ruleStrs.forEach((ruleStr) => {
		const splt = ruleStr.split(': ');
		const nr = splt[0];
		const match = splt[1];
		rules[nr] = {};
		if (match.includes('"')) {
			rules[nr].type = THIS;
			rules[nr].val = match.substring(1, match.length - 1);
		} else if (match.includes('|')) {
			rules[nr].type = OR;
			const orSplt = match.split(' | ');
			rules[nr].val = [orSplt[0].split(' '), orSplt[1].split(' ')];
		} else {
			rules[nr].type = AND;
			rules[nr].val = match.split(' ');
		}
	});
	// console.log(rules);

	var sum = 0;
	// Object.values(rules).forEach((r) => {
	// 	if (r.type === OR) sum++;
	// });
	messages.forEach((msg) => {
		if (followsRulesBool(msg)) sum++;
		// console.log(sum);
	});
	console.log(sum);
});
