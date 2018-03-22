const express = require('express');
const html = require('html');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

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

		// if success, just send it back
		res.status(200).send(req.body);

		// if failure
		// res.status(500).send("Username Taken!")
});

app.listen(3000,() => console.log("Listening"));
