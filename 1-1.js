const fs = require("fs");

fs.readFile("./input", "UTF-8", (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	// Code
	const res = data.split("\n").map(x=>+x);
	for(var i = 0; i < res.length; i++)
		for(var j = i + 1; j < res.length; j++)
			if(res[i] + res[j] === 2020)
				console.log(res[i]*res[j]);
})
