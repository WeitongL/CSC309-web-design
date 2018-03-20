/*jshint esversion: 6 */
const express = require('express');

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3090;

// database
var db;
const DB_PORT = 27017; // TODO: temperary
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:${DB_PORT}/uniLife";
// TODO: not sure if the right thing to do.
mongoClient.connect(url, function(err,res){
	if(err) return console.log(err);
	client = res;
	db = client.db('uniLife');
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// homepage
app.get('/', (req, res) => {
	// TODO
	res.send('Hello World');
});

// retrive data such as user saved universities
app.get('/:id/saved', (req, res) => {
	// TODO: send user saved data from db

});

// user get pseudonym
app.get('/:university', (req, res) => {
	var uni_name = req.uni_name;
	// TODO: find data in database
	var pseudonym;

	res.sent(pseudonym);
});

// user get university related information in a sepecific field, ie, restruant or library
app.get('/:university/:field', (req, res) => {
	var uni_name = req.uni_name;
	// TODO: find data in database
	var data;

	res.sent(data);
});

// login
app.post('/:id', (req, res) => {
	// TODO: encript password
	var login = {
		id: req.body.id,
		psw: req.body.psw
	};
	// TODO: log

	// TODO: varify identity
	var varified;
	if (varified) {
		res.redirect('/:id/saved');
	} else {
		console.log('incorrect username or password.');
		res.sent('incorrect username or password.');
	}
});

// user post pseudonym
app.post('/:university', (req, res) => {
	var uni_name = req.uni_name;
	var pseudonym = req.pseudonym;
	// TODO: add data to database

	console.log('pseudonym set successfully.');
	res.sent('pseudonym set successfully.');
});

// user post university related information in a sepecific field, ie, restruant or library
app.post('/:university/:field', (req, res) => {
	var data;
	var uni_name = req.uni_name;
	var place_name = req.place_name;
	var place_info = {};
	// TODO: put data to database

	// TODO: log
});

app.update('/:university', (req, res) => {
	var uni_name = req.uni_name;
	var old_pseudonym = req.old_pseudonym;
	var new_pseudonym = req.new_pseudonym;
	// TODO: update data in database
	
	console.log('pseudonym updated successfully.');
	res.sent('pseudonym updated successfully.');
});

// user update university related information in a sepecific field, ie, restruant or library
app.update('/:university/:field', (req, res) => {
	var data;
	var uni_name = req.uni_name;
	var place_name = req.place_name;
	// some information for update
	// TODO: update data in database

	// TODO: log
});

app.delet('/:university', (req, res) => {
	var uni_name = req.uni_name;
	var pseudonym = req.pseudonym;
	// TODO: delet data from database
	
	console.log('pseudonym deleted.');
	res.sent('pseudonym deleted.');
});

// user delet university related information in a sepecific field, ie, restruant or library
app.delet('/:university/:field', (req, res) => {
	var data;
	var uni_name = req.uni_name;
	var place_name = req.place_name;
	// TODO: delet data from database

	// TODO: log
});

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});
