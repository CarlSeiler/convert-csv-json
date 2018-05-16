//  **** 
//  Usage: node converter.js <inputfile> <outputfile>
//     by default, uses './customer-data.csv' and './customer-data.json'
//  ****
// TODO: Add error checking for files or file processing. 
const csv = require('csvtojson');
const fs = require('fs');
var outputArray = [];

const converter = (inputFile = './customer-data.csv',
    outputFile = './customer-data.json') => {
    // Delete earlier output file if it exists
    fs.unlink(outputFile, function(err) {
        if (err) {
            console.log('Could not delete or file not present.');
        } else {
            console.log(`Old output file \"${outputFile}\" deleted.`);
        }
    });

    // Convert csv file to json file and output to disc
    csv()
        .fromFile(inputFile)
        .on('json', (jsonObj, lineNumber) => {
            outputArray.push(JSON.stringify(jsonObj, null, 4));
        })
        .on('done', (error) => {

            fs.appendFile(outputFile, outputArray.toString(), function(err) {
                if (err) throw err;
                
            });
            console.log('Conversion completed.');
        });
};

converter(process.argv[2], process.argv[3]);
