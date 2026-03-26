//JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000/60;
var object;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	object = new Object();
	
	//Declare the object's speed on the x and y axis
	object.vx = -10;
	object.vy = 10;
	object.image = document.getElementById("dvd");
	
	
	timer = setInterval(animate, interval);


function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Movement using object's move() function
	object.move();
	
	
	//Bouncing
	if(object.x > canvas.width - object.width/2)
	{
		object.vx = -object.vx;	
	}

	if(object.x < object.width/2){
		object.vx *= -1;
	}

	if(object.y > canvas.height - object.height/2)
	{
		object.vy = -object.vy;	
	}

	if(object.y < object.height/2){
		object.vy *= -1;
	}
	
	
	object.draw();
}
