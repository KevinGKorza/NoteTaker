//Helper
//Dependencies 
const fs = require('fs');
const util = require('util');
//Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 * //Function to write data to the JSON file given a destination and some content
 * @param {string} destination 
 * @param {object} content 
 * @returns {void}
 */
 const writeToFile = (destination, content) => 
 fs.writeFile(destination, JSON.stringify(content, null, 4),
 (err) => err ? console.error(err): console.info(`\nData written to ${destination}`)
 );
 /**
  * Function to read data from a given file and append the content
  * @param {object} content 
  * @param {string} file 
  * @returns {void}
  */

 const readAndAppend = (content, file) => {
    fs.readFile(file, 'UTF-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
 };

 //exporting file and tying it all together
 module.exports = {readFromFile, writeToFile, readAndAppend};
