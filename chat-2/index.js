//app
var express = require('express');
var app = express();

//server
var server = require('http').Server(app);
server.listen(8080);

// Socket
var socket = require('socket.io');
var io = socket(server);

//style
app.use(express.static(__dirname + '/style'));

//get public stuff
app.use(express.static('public'));
app.set('public', __dirname + '/public');


io.on('connection', function(socket){
    socket.on('chat', function(data){
        io.sockets.emit('chat', data); 
    });
    // socket.to(room).emit("user-join", { id: socket.id, room });
    //console
    console.log('someone connected');
});