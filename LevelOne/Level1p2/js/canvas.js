var canvas;
var context;
var timer;
var interval = 1000/60;
var object;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	ball = new Ball();

	ball.vx = 5;
	ball.image = document.getElementById("dvd");

	timer = setInterval(animate, interval);

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Movement using ball's move() function
	ball.move();

	ball.draw();
}