//  **** 
//  Usage: node converter.js <inputfile> <outputfile>
//     by default, uses './customer-data.csv' and './customer-data.json'
//  ****
// TODO: Add error checking for files or file processing. 
const csv = require ('csvtojson');
const fs = require ('fs');

const converter = (inputFile = './customer-data.csv', 
                   outputFile = './customer-data.json')  => {
// Delete earlier output file if it exists
fs.unlink(outputFile, function (err) {
	if (err) { console.log ('Could not delete or file not present.');
	} 
	else {	
	console.log (`Old output file \"${outputFile}\" deleted.`); }
	});

// Convert csv file to json file and output to disc
csv({
		})
  .fromFile(inputFile)
  .on('json',(jsonObj, lineNumber)=>{
	  
	  // Probably a better way to make this a JSON Object array than 
	  // adding my own [ and , symbols in there, but I didn't find 
	  // it in the cvstojson documentation.
	  
	  // Add bracket if at first line of  CSV
	  if (lineNumber == 0) { fs.appendFile(outputFile, '[', function (err) {
		  if (err) throw err;
		  /* console.log ('Converted line ' + lineNumber + '.'); */
		  });}
		  
	  // Add comma between each element of array
	  if (lineNumber > 0) { fs.appendFile(outputFile, ',', function (err) {
		  if (err) throw err;
		  /* console.log ('Converted line ' + lineNumber + '.'); */
		  });}
		  
	  // Save JSON to file.
	  fs.appendFile(outputFile, JSON.stringify(jsonObj, null, 4), function (err) {
		  if (err) throw err;
		  /* console.log ('Converted line ' + lineNumber + '.'); */
		  });
	  
	  })
  .on('done',(error)=>{
		// Add closing bracket if done.
		fs.appendFile(outputFile, ']', function (err) {
		  if (err) throw err;
		  /* console.log ('Converted line ' + lineNumber + '.'); */
		  });
	  console.log('Conversion completed.');
	  });
  };
  
converter(process.argv[2], process.argv[3]);
