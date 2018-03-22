const express = require('express');
const html = require('html');
const ejs = require('ejs');
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views/js'));

app.get('/', function(req,res){
		res.render('index.ejs');
		
});

app.listen(3000,() => console.log("Listening"));
