# CSV to JSON Coverter

## A project for [Introduction to NodeJS](https://courses.edx.org/courses/course-v1:Microsoft+DEV283x+1T2018/course/ "Microsoft: DEV283x - Introduction to NodeJS") Course at edX

### Module 1, Assignment Lab

#### Observations, design, and description

1. Program _converter.js_ was modeled on pattern/structure of earlier project
introduced in the Module 1 (_download.js_).  Required items are specified as
**const**'s at the top. Node package _csvtojson_ was added using _npm_. 
The _fs_, of course, is built in to NodeJS. The array _outputArray_ will be
 described later.

```javascript
const csv = require('csvtojson');
const fs = require('fs');
var outputArray = [];
```
2. The main function is then defined as _converter_.  It takes two parameters, 
that are the input and output files.  Default file names are supplied
if they are not provided by the call of the function.

```javascript
const converter = (inputFile = './customer-data.csv', outputFile = './customer-data.json') => {...
};
```
3. Finally, the converter is called. The function is called using the command
line arguments if they are provided.

```javascript
converter(process.argv[2], process.argv[3]);
```

4. Digging into the code of the converter function, it first calls the 
_fs.unlink()_ method in case the output file "_outputFile_" exists.  
This makes sure that it doesn't just append to the previously existing 
file.

```javascript
fs.unlink(outputFile, function(err) {
        if (err) {
            console.log('Could not delete or file not present.');
        } else {
            console.log(`Old output file \"${outputFile}\" deleted.`);
        }
    });
```
Then the call to the _csvtojson_ function _csv_ itself:

```javascript
csv()
        .fromFile(inputFile)
        .on('json', (jsonObj, lineNumber) => {
            outputArray.push(jsonObj);
        })
        .on('done', (error) => {

            fs.appendFile(outputFile, JSON.stringify(outputArray), function(err) {
                if (err) throw err;
                
            });
            console.log('Conversion completed.');
        });
```

It uses the _inputFile_ which is either the default or supplied by the 
user as an argument. Each line of the CSV file is read and converted 
to a JSON object and pushed onto the _outputArray_
array, which was defined globally at the top.

When it is done, it the contents of the array is stringified using
the _JSON.stringify()_ method and the stringified array is written to the
file named in _outputFile_ using the _fs.appendFile()_ method.

### Problems encountered, challenges and testing

1. Originally, the output was incorrect in that it contained a
string of JSON objects but not as an array with brackets and
commas.  This meant that I needed to have in an array of 
JSON before I could write it to the file. I tried writing
a '[' to the file and each of the commas to the file  to separate
the elements.  While this attempt worked
and gave output as desired, it did not seem to be in the spirit of
the lesson.  I eventually was able to figure out that I needed
to use the _JSON.stringify()_ on the entire array while at one time I
was using _toString()_ method.  
2. The general process was to run the program and look at the 
output file to visually determine if the output met the general
look and feel of the model. Ideally, there should be some sort of 
automated unit testing that would check to see if the output exists 
and if that output could be read as a JSON file.  
3. **To be done in the future:** There could be more robust error checking.  
    1. What if there **input file does not exist**? Currently, it creates an 
empty array and writes that to file.  The user has no way of knowing that
to be the case until they examine it.  
    2. What happens if the **input file is not valid CSV**? Currently, the 
    system still convert it anyway.  The results are unpredictable.
    3. What happens if the **output file is not writable** (immutable,
     for example)?  Currently, an error is thrown, and that's it.
    4. Since this builds a large array before it saves it to a file
rather than writing to the file indidually as it builds the JSON,
what happens if the array is too large for the memory of the running
machine?  This needs to be addressed, possibly by using some sort of 
streaming feature, which I have not yet figured out.
