var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(1234,'105.158.212.124',function(){
    console.log('listening to requests on port 8080');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection',function(socket){
    console.log('conenction made !',socket.id);
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});