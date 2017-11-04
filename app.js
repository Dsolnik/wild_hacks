/*jshint node: true */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// routers
var authRouter = require('./src/routes/authRouters')();
var port = process.env.PORT || 5000;

// parse body into app.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// views
app.set('views', './src/views');
app.set('view engine', 'ejs');

// default directory
app.use(express.static('public'));

// set routers 
app.use('/Auth', authRouter);

app.get('/', function(req, res){
    res.send('We\'re working on it!');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

