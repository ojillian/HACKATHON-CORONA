
//connect to server
var socket = io.connect('https://chat.xoujix.repl.co');

//get variables
var nickName = prompt('Please enter your Name:');while(nickName===''){
  nickName=prompt('Please enter your Name:');
}
while(nickName.length>12){
  nickName=prompt('Please enter a shorter Name:');
}
var message = document.getElementById('text');
var bttn = document.getElementById('button');
var textArea = document.getElementById('textArea');
socket.emi
//function
function postMessage(){
    if(message.value.length>38){
      alert('Character limit: 38\nYou are '+(message.value.length-38)+' characters over the limit.');
    }
    else if(message.value.length>0){
        var messag = {
            name : nickName,
            message : message.value
        }
        socket.emit('chat', messag);
        var text = messag.name+': '+messag.message;
        textArea.value+=`${text}\n`;
        message.value = '';
        textArea.scrollTop = textArea.clientHeight;
    }
}

// Use button
bttn.addEventListener('click', () => {
   postMessage();
});

socket.on('chat', function(data) {
  console.log('yo');
  if(data.name==''){
    data.name='Anonymous';
  }
  var text = '<p><b>'+data.name+'</b>'+': '+data.message+'</p>';
  textArea.innerHTML +=`${text}\n`;
});
socket.on('connect', () =>{
  console.log('adsuuasghsagkfhjgsjhadghjgsakgfhsjakgfhjk');
  textArea.innerHTML +=`${'You have successfully connected!'}\n`;
});





