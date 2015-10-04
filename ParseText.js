var fs = require('fs');
var fileName = './SampleTextFile.txt';

fs.readFile(fileName, function(err, f) {
	var array = f.toString().split('\n');
	printFile(array);

});

function printFile(result) {
 for(var i in result)
 	console.log(result[i]);
}
