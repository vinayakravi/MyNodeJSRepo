var fs = require('fs');

var parse = require('./node_modules/csv/node_modules/csv-parse');

var column_mapping = {};
var csvparser = parse({delimiter: ','}, function(err, output){
	for( var j in output[0]) {
		
		column_mapping[output[0][j].trim()] = j;
		column_mapping[output[1][j].trim()] = j;
		}
		var ext =['EXTVIP','EXTLOC','EXTRCPLN','EXTRCODE','EXTRMESG','EXTGPNO','EXTCLMTP','EXTRPROC','EXTXMID','EXTRSRIN','EXTRAGE','EXTGPVNO'
,'EXTCLPCSTP','EXTCLPCEF1','EXTCLPCEF2','EXTCLPCSTS','EXTCLPCME1','EXTCLPCME2','EXTCLPCME3','EXTCPMLOB','EXTCLPCSIG','EXTRHDRC', 'EXTRHDRM', 'EXTACTPL', 'EXTRTCHR'];
for(var s in ext)
	console.log('The position of ' + ext[s] + ' is ' + column_mapping[ext[s]]);

		//console.log('The position is ' + column_mapping['EXTICN']);

	});
fs.createReadStream("./scar_column_mapping.csv").pipe(csvparser);
