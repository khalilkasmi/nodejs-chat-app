var express = require('express');
var socket = require('socket.io');
var mongoose = require('mongoose');


var app = express();

var server = app.listen(process.env.PORT || 5000 ,function(){
    console.log('listening to requests on port 5000');
});

mongoose.connect('mongodb+srv://khalil:kasmi@cluster0-z7jmu.mongodb.net/test?retryWrites=true&w=majority');

var messageSchema = new mongoose.Schema({
    from: String,
    message: String
});

var Msg = mongoose.model('Msg',messageSchema);



app.use(express.static('public'));

var io = socket(server);

app.set('view engine', 'ejs');

app.get('/',function(req,res){
    Msg.find({},function(err,data){
        if (err) throw err;
            res.render('index',{data: data});
    });
});

io.on('connection',function(socket){
    console.log('conenction made !',socket.id);

    socket.on('chat',function(data){
        Msg({from: data.handle,message: data.msg}).save(function(err,data){
            if (err) throw err;            
        });
        io.sockets.emit('chat',{from: data.handle,message: data.msg});
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});