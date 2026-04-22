//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var win = false;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

}


