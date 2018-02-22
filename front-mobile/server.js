var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http);

app.use('/assets', express.static('distFront/assets'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/distFront/index.html');
});

app.get('/mobile', function(req, res){
    res.sendFile(__dirname + '/distMobile/index.html');
});

app.get('/main.bundle.js', function(req, res){
    res.sendFile(__dirname + '/distFront/main.bundle.js');
});

app.get('/mobile.bundle.js', function(req, res){
    res.sendFile(__dirname + '/distMobile/mobile.bundle.js');
});

let mobile = io.of('/mobile');

mobile.on('connection', (socket)=>{
    console.log('a user connected as '+socket.id);
    socket.on('disconnect', ()=>{
        console.log('a user is disconnected');
    });
    socket.on('init-event', ()=>{
        console.log('init event');
    });

    socket.on('before-event', ()=>{
        console.log('before event');
        socket.emit('call-forward')
    });

    socket.on('after-event', ()=>{
        console.log('after event');
    })
})
  
io.on('connection', function(socket){
    console.log('a user master connected as '+socket.id);
    socket.on('disconnect', ()=>{
        console.log('a user is disconnected of master');
    });
    socket.on('init-event', ()=>{
        console.log('init event master');
    });

    socket.on('before-event', ()=>{
        console.log('before event master');
        io.emit('call-backward')
    });

    socket.on('after-event', ()=>{
        console.log('after event master');
        io.emit('call-forward')
    })
});

http.listen(1813, function(){
    console.log('listening on *:1813');
});