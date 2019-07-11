var socket = io.connect('http://localhost:5000');

var handle  = document.getElementById('handle');
var message = document.getElementById('message');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

var btn  = document.getElementById('send');

btn.addEventListener('click',function(){
    if (message.value !== "" && handle.value !== ""){
         socket.emit('chat',{handle: handle.value,msg: message.value});
         handle.disabled = true;
        }
    message.value = " ";
});

message.addEventListener('keypress',function(){
    socket.emit('typing',{handle: handle.value});
})

socket.on('chat',function(data){
    feedback.innerHTML = " ";
    if(data.handle === handle.value) {
        output.innerHTML += ' <p style="background-color:#f3eff4;"><strong>me</strong> ' + data.msg + '</p>';
    }else{
    output.innerHTML += ' <p><strong>'+data.handle+'</strong> : ' + data.msg + '</p>'; 
    }
});

socket.on('typing',function(data){
    feedback.innerHTML = "<p><em>"+data.handle+" is typing ...</em></p>";
})