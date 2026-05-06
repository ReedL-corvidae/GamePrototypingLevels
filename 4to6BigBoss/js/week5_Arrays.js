
//-----------------------------------------------------!!!!IMPORTANT!!!-------------------------------------------------------------------------
//----------------------------------------------Instructor Cover that function first------------------------------------------------------------
//-----------------------------------The rand function is located in js/Utility/Random.js-------------------------------------------------------

//canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
	
//timebase
var interval = 1000/60;
var timer = setInterval(animate, interval);
var gravity = 1;

var colors = [];
colors[0] = "#ff0000";
colors[1] = "#00ff00";
colors[2] = "#0000ff";

var score = 0;
var total = 5;	
var dots = [];
var squares = [];

var frictionX = .6;	
var frictionY = .99;

var player = new GameObject();
	player.width = 50;
	player.height = 50;
	player.y = canvas.height - player.height - 20;
	player.x = canvas.width/2;
	player.color = "#341ef8"

for(var i = 0; i < total; i++)
{
	dots[i] = new GameObject();
	dots[i].x = Math.random() * canvas.width;
	dots[i].y = Math.random()* -500;
	dots[i].width = 30;
	dots[i].vy = rand(4,6);
	//dots[i].vx = rand(-10,10);
	dots[i].color = "#ff0000";
}

for(var i = 0; i < total; i++)
{
	squares[i] = new GameObject();
	squares[i].x = Math.random() * canvas.width;
	squares[i].y = Math.random()* -500;
	squares[i].width = 30;
	squares[i].height = 30;
	squares[i].vy = rand(4,6);
	//dots[i].vx = rand(-10,10);
	squares[i].color = "#00ff00";
}

function showAcceleration()
{
	//--------------Use Velocity and Acceleration to move around----------------------
	if(d)
	{	
		player.vx +=  player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	//---------------------------------------------------------------------------------------
	player.x += player.vx;
	player.y += player.vy;

}
function showFriction()
{
	if(d)
	{	
		player.vx += player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}

	
	//--------------Apply friction to the Velocity-----------------------------------------
	player.vx *= frictionX;
	//ball.vy *= frictionY;
	//ball.vx *= frictionX;
	//---------------------------------------------------------------------------------------
	player.x += player.vx;	
}

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	player.move();

	showAcceleration();
	showFriction();

	for(var i = 0; i < total; i++)
	{
		dots[i].drawCircle();
		dots[i].y--;
		dots[i].move();
	
	if(dots[i].y > canvas.height)
	{
		dots[i].x = Math.random() * canvas.width;
		dots[i].y = Math.random() * -500;
		dots[i].vy = rand(4,8);
		console.log("changing locations");
	}
	}

	for(var i = 0; i < total; i++)
	{
		squares[i].drawRect();
		squares[i].y--;
		squares[i].move();
	
	if(squares[i].y > canvas.height)
	{
		squares[i].x = Math.random() * canvas.width;
		squares[i].y = Math.random() * -500;
		squares[i].vy = rand(4,8);
		console.log("changing locations");
	}
	}

	if(player.x > canvas.width - player.width/2)
	{
		
		player.x = canvas.width - player.width/2;
		player.vx = -player.vx * 0;
	}
	if(player.x < player.width/2)
	{
		player.x = player.width/2;
		player.vx = player.vx * 0;
	}


	player.drawRect();

}










