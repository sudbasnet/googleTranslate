// Imports the Google Cloud client library
var Translate = require('@google-cloud/translate');
// this is fileSystem that will read the files
var fs = require('fs');
var path = require('path');

// Your Google Cloud Platform project ID
var projectId = 'YOUR_PROJECT_ID';
// this is not absolutely necessary

// Instantiates a client
var translateClient = Translate({
  projectId: projectId
});

// read a local directory and gives list of files
var currentDir = __dirname;
var files = fs.readdirSync(currentDir); //returns an array

//apply foreach function to the array files
files.forEach(function(file){
	if (file.slice(-3) == 'txt' && file.substring(0,11)!='translated_') {
		try {  
		    var data = fs.readFileSync(file, 'utf8'); 
		} catch(e) {
		    console.log('Error:', e.stack);
		}
		var text = data ;
		// The target language
		var target = 'en';

		// Translates some text into target language
		translateClient.translate(text, target)
		  .then((results) => {
		    var translation = results[0];
		 // write the translated data into a text file, located a level above the current dierctory in a separate folder
		    try {
		    	fs.writeFileSync('../translated_text/translated_' + file, translation);
		    	console.log("Translated: " + file);
		    } catch(err) {
		    	console.log('Error saving file: ' + err.stack);
		    }
		  })
		  .catch((err) => {
		    console.error('ERROR:', err);
		  	});
	}
});
