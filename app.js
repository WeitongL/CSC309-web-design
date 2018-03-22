const express = require('express');
const html = require('html');
const ejs = require('ejs');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const app = express();
var uri = "mongodb+srv://uoftunilife:QTiv0EvogdhCrvn9@unilife-uoo56.mongodb.net";
// Read responses in a parsed way
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Set where to look for templates
app.set('views', __dirname + '/views');
// Set what we are rendering views with
app.set('view engine', 'ejs');

// Set where we look for static files
app.use(express.static(__dirname + '/views/js'));

// By default, send them to our index page
app.get('/', function(req, res){
		res.render('index.ejs');
});

// See the front end's username and password
app.post('/signup/', function(req, res){
		// req.body is the json
		// username:username
		// password:password
		console.log(req.body);
		var user = req.body.username;
		var pass = req.body.password;
		MongoClient.connect(uri, function(err, client){
				if (err) console.log(err);
				var db = client.db("test");
				db.collection("users").findOne({username:user}, function (error, result){
						if (result){
								// If the username is in our database, send an error back
								res.status(500).send("Username Taken!");
								client.close();
						}
						else{
								// If the username is not in our database
								// Insert that user and send a success response
								db.collection("users").insertOne(req.body, function(error2, res){
										if (res){
												console.log("Was added"); 
										}
										else{
												console.log("Was not added");
										}
								});
								res.status(200).send("Worked!");
								client.close();
						}
				});
		}); 

});

app.listen(3000,() => console.log("Listening"));
