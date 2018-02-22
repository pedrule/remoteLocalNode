var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use('/assets', express.static('dist/assets'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/main.bundle.js', function(req, res){
    res.sendFile(__dirname + '/dist/main.bundle.js');
});

http.listen(1814, function(){
    console.log('listening on *:1813');
});