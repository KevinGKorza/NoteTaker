//create a server.js file
//create variables
//Remember to initialize the app
//Remember the Middleware
//Remember routes
//Remember path strugture
//creation of server.js file 

//The Front end and back end of the app link, however the ability to save and type your notes do not work yet, still currently working on the functionality

//The Dependencies 
const express = require('express');
const path = require('path');
const fs = require('fs');
const databaseInfo = require('./Develop/db/db.json');
const uuid = require('./helpers/uuid.js');
//const api = require('./Develop/public/assets/js/index.js')

//Function to write data to JSON file
const writeToFile = (destination, content) => 
fs.writeFile(destination, JSON.stringify(content, null, 4),
(err) => err ? console.error(err): console.info(`\nData written to ${destination}`));

//Initialization of the app (a url generates in the command line after npm install and node server.js)
//Server start up
const PORT = 3002;
const app = express();


//The setup of Middleware for parson JSON and urlencoded form data and data parsing
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use('/api', api);

//Function to read and append data from a given a file and append content
const readAndAppend = (content, file) => {
    fs.readFile(fire, 'UTF-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file,parsedData);
        }
    });
};
//Remember to set the notes, index, and api routes
app.get('/api/notes',function (req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html')); 
});



//Route for notes
//file path notes.html
app.get('/notes',function (req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html')); 
});

//Route for the homepage
//index file path index.html
app.get('/',function (req, res) {
    res.sendFile(path.join(__dirname,'./Develop/public/index.html')); 
});
//Route for api
app.get('/notes',(req, res) => res.json(databaseInfo));

//Delete option?
app.delete('./Develop/public/notes.html', function (req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});


//Post Route
app.post('/notes',(req, res) =>{
    console.info(`${req.method} request received`);
    const{noteTitle,noteText} = req.body;
    if(req.body){

        
        
    const databaseNote = {
        noteTitle, 
        noteText,
        noteid:uuid(),
    };
    readAndAppend(databaseNote, './Develop/db/db.json');
    res.json('added successfully 🚀');
    } else{
        res.error('Error');
    }
});



//Listener
//will generate in command line
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



