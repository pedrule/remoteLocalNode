var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/docs', function(req, res){
    res.sendFile(__dirname + '/app/docs/index.html');
});
  
io.on('connection', function(socket){
    console.log('a user connected as '+socket.id);
    socket.on('disconnect', ()=>{
        console.log('a user is disconnected');
    });
    socket.on('init-event', ()=>{
        console.log('init event');
    })
});

http.listen(1812, function(){
    console.log('listening on *:1812');
});