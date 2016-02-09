//make sure csv is installed:
//npm install -g csv
var fs = require('fs');
var parse = require('./node_modules/csv/node_modules/csv-parse');
var output = [];
var fileName = './SampleCSVFile.csv';
var parser = parse({delimiter: ':'}, function(err, output){
  
  for (var i in output) {
  	for( var j in output[i]) {
  		console.log(output[i][j]);
  	}
  }
});
fs.createReadStream(fileName).pipe(parser);