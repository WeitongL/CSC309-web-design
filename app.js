const express = require('express');
const html = require('html');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
var MongoClient = require('mongodb').MongoClient;

const app = express();
var uri = "mongodb://a3:1234@ds153752.mlab.com:53752/wtdb";
// Read responses in a parsed way
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'unilife', 
    resave: false,
    saveUninitialized: true
}));


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

app.post('/login/', function(req, res) {
    console.log(req.body);
    var user1 = req.body.username;
    var pass1 = req.body.password;
    MongoClient.connect(uri, function(err, client) {
        if (!pass1){
            client.close();
            return res.status(500).send("Enter the password.");
        }
        if (err) {
            console.log(err);
        }
        var db = client.db("wtdb");
        db.collection("users").findOne({$and: [{username: user1}, {password: pass1}]}, function(error, result) {
            //if username and password is correct
            if (result) {
                console.log("success");
                req.session.user = result;
                res.status(200).send("successful");
                client.close();
            }
            else {
                db.collection("users").findOne({username:user1}, function(error2, result2) {
                    if (result2) {
                        res.status(500).send("Invalid password!");
                        client.close();
                    }
										else {
												res.status(500).send("Invalid username!");
												client.close();
										}
								});
            }
        });
    });
});

// See the front end's username and password
app.post('/signup/', function(req, res){
		// req.body is the json
		// username:username
		// password:password
		console.log(req.body);
		var user = req.body.username;
		var pass = req.body.password;
		req.body['saved'] = [];
		MongoClient.connect(uri, function(err, client){
				if(!pass){
						res.status(500).send("Password cannot be empty.");
						client.close();
				}
				if (err) console.log(err);
				var db = client.db("wtdb");
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
												console.log(error2);
										}
								});
								res.status(200).send("Worked!");
								client.close();
						}
				});
		}); 

});

// Update when the user adds a new favourite university
app.put('/favourite/', function(req,res){
		// req.body.fav is the address
		// req.body.name is the query
		if (req.session.user){
				var address = req.body.fav;
				MongoClient.connect(uri, function(err, client){
						console.log(req.session.user.username + " connected"); 
						var db = client.db("wtdb");
                        db.collection("users").findOne({username:req.session.user.username, saved : {$elemMatch: {$elemMatch: {$in:[req.body.fav]}}}}, function(error, result) {
                            if (result) {
                                
                                console.log("Already saved");
                                res.status(500).send("Already saved");
                            }
                            else {
                                console.log("Successfully added");
						        db.collection("users").updateOne(
								    {username:req.session.user.username},
								    {$push: {saved : [req.body.name, req.body.fav]}}
						        );
                                res.status(200).send("Successfully added");
                            }
                       
				        });
                });
		} else{
				res.status(500).send("User is not logged in!");
		}
});

// Get the user's favourite universities
app.get('/favourite/', function(req,res){
		if (req.session.user){
				MongoClient.connect(uri, function(err, client){
						var db = client.db("wtdb");
						db.collection("users").findOne(
								{username:req.session.user.username},
								function(error, result){
										if (result){
												res.status(200).send(result.saved);
										} else{
												res.status(500).send(error);
										}
								}
						);
				});
		} else{
				res.status(500).send("User is not logged in!");
		}
});

app.listen(3000,() => console.log("Listening"));
