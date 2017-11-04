var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.set('views', './src/views');

app.set('view engine', 'ejs');


app.use(express.static('public'));

app.get('/', function(req, res){

})

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});
