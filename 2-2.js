const fs = require("fs");

fs.readFile("./input", "UTF-8", (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const res = data.split("\n").map(s => {
		const splt = s.split(" ");
		if(s) {
			const lohi = splt[0].split("-").map(x => +x);
			const o = {
				char: splt[1].slice(0, -1),
				lo: lohi[0],
				hi: lohi[1],
				str: splt[2]
			};
			return o;
	}
	});
	var numValid = 0;
	res.forEach(o => {
		if(o) {
			if((o.str.charAt(o.lo-1) === o.char) ^ (o.str.charAt(o.hi-1) === o.char))
				numValid++;
		}
	});
	console.log(numValid);
})
