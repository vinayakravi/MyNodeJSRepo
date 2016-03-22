var fs = require('fs');
var stringify = require('csv-stringify');
var parse = require('./node_modules/csv/node_modules/csv-parse');

var column_mapping = {};
var csvparser = parse({delimiter: ','}, function(err, output){
	for( var j in output[0]) {
		column_mapping[output[0][j].trim()] = j;
		column_mapping[output[1][j].trim()] = j;
		}

	});
fs.createReadStream("./scar_column_mapping.csv").pipe(csvparser);
var outputString = "";
var stringifier = stringify({delimiter: '|'})
stringifier.on('readable', function(){
  while(row = stringifier.read()){
    outputString += row;
  }
});
stringifier.on('error', function(err){
  console.log(err.message);
});
stringifier.on('finish', function(){
  fs.appendFile('test.txt', outputString , encoding='utf8', function (err) {
  });
});

var fileName = '/Users/vinayakravi/Desktop/Temp/DELIMIT_MI_SCAREXTRACT.MODL_20160225030348.txt';
				 			 		 								 		

var parser = parse({delimiter: '|'}, function(err, output){
	if (err) throw err;
	var sampleRow = output[20];
	console.log('The Program Code is: ');
	sampleRow[column_mapping['EXTCLMTP']] = '02';
	
	//console.log(sampleRow[column_mapping['EXTCLMTP']].substring(0,1));
	//console.log('The Claim Class is: ');
	//console.log(sampleRow[column_mapping['EXTCLMTP']].substring(1,2));
	stringifier.write(sampleRow);
	stringifier.end();

    //console.log(output);
    
//});
	
	//
});

fs.createReadStream(fileName).pipe(parser);
