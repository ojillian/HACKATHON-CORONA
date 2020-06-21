//server
var socket = io();

//canvas
var canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.width = 800;

//square
var square = canvas.getContext("2d");
square.fillStyle = "#74E58C";

//draw function
socket.on('drawNew',function(data){
    //clear each update
    square.clearRect(0,0,800,500);
    //replace depending on status
    for(var i = 0 ; i < data.length; i++){
		if(data[i].corona){
			square.fillStyle = "#E87171";
		}
    else{
			square.fillStyle = "#74E58C";
		}
		//fill
    square.fillRect(data[i].x,data[i].y, 50, 50);
    
	}		
});

//release key
document.onkeyup = function(event){
	  //w
  if(event.keyCode === 87) 
		socket.emit('keyPress',
    {inputId:'up',state:false});
  //a
  else if(event.keyCode === 65)
		socket.emit('keyPress',
    {inputId:'left',state:false});
  //s
  else if(event.keyCode === 83)	
		socket.emit('keyPress',
    {inputId:'down',state:false});
  //d
	else if(event.keyCode === 68)	
		socket.emit('keyPress',
    {inputId:'right',state:false});
};

//press key
document.onkeydown = function(event){
  //w
  if(event.keyCode === 87) 
		socket.emit('keyPress',
    {inputId:'up',state:true});
  //a
  else if(event.keyCode === 65)
		socket.emit('keyPress',
    {inputId:'left',state:true});
  //s
  else if(event.keyCode === 83)	
		socket.emit('keyPress',
    {inputId:'down',state:true});
  //d
	else if(event.keyCode === 68)	
		socket.emit('keyPress',
    {inputId:'right',state:true});
};

