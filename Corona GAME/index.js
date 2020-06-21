//App
var express = require('express');
var app = express();

//Server
var server = require('http').Server(app);
server.listen(8080);

//Socket
var socket = require('socket.io');
var io = socket(server,{});

//Static
app.use('/public',express.static(__dirname + '/public'));
//get index file 
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//lists
var socks = {};
var players = {};

var Player = function(id){
	var me = {
    id:id,
		x:250,
		y:250,
		r:false,
		l:false,
		u:false,
		d:false,	
		corona:false,
		normal:true
	};
  //update pos
	me.updatePosition = function(){
    //move
		if(me.r)
			me.x += 10;
		if(me.l)
			me.x -= 10;
		if(me.u)
			me.y -= 10;
		if(me.d)
			me.y += 10;
    
    //bounds
		if(me.x>750){
			me.x = 750;
		}
		if(me.x<0){
			me.x = 0;
		}
		if(me.y>550){
			me.y = 450;
		}
		if(me.y<0){
			me.y = 0;
		}

    //if infected
		if(me.corona){
      //right and bottom bounds
			me.rb = me.x+50;
			me.b = me.y+50;
      me.normal = false;
      //check if a player is touching me
			for(var i in players ){
				if(players[i].id !== me.id){
					var you = {
						x:players[i].x,
						y:players[i].y,
						rb:players[i].x+50,
						b:players[i].y+50
					};
					if(me.rb>you.x && me.x<you.rb && me.b>you.y && me.y<you.b){
						if(players[i].normal){
							players[i].corona = true;
							me.corona = false;
							me.normal = false;
              setTimeout(()=>{
			          me.normal = true;
		          }, 1000); 
						}
					}
				}
			}
		}
	};
	return me;
};

//socket stuff
io.sockets.on('connection', function(socket){
  var player = Player(socket.id);
	players[socket.id] = player;
	socks[socket.id] = socket;

  //if there is only one player they are infected
  if(Object.keys(players).length === 1){
		players[socket.id].corona = true;
	}
   
  //press keys
	socket.on('keyPress',function(d){
		if(d.inputId === 'left')
			player.l = d.state;
		else if(d.inputId === 'right')
			player.r = d.state;
		else if(d.inputId === 'up')
			player.u = d.state;
		else if(d.inputId === 'down')
			player.d = d.state;
	});


  //disconnect
	socket.on('disconnect',function(){
    var flag=false;
    if(players[socket.id].corona){
      flag = true;
    }

		delete socks[socket.id];
		delete players[socket.id];

    for(var i in players){
			players[i].corona = true;
      break;
		}
	});
	
});

//timed position changes
setInterval(function(){
  //update player
	var change = [];
	for(var i in players){
		var player = players[i];
		player.updatePosition();

    //change coordinates and corona value
		change.push({
			x:player.x,
			y:player.y,
			corona:player.corona
		});		
	}
  //update socket
	for(var i in socks){
		var socket = socks[i];
    //draw thing
		socket.emit('drawNew',change);
	}
},20);