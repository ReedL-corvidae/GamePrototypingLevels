//--------------------Goal - To utilize distance and displacement formulas ----------------------------------------------------------------------
//--------------------Description - To make the pearl magnet to the player when it's less than 300 pixels away from the player-------------------
//--------------------Read the commented instructions below to complete this assignment----------------------------------------------------------
//--------------------Upload your completed file to the ict server and submit a link-------------------------------------------------------------

var canvas;
var context;
var timer;
var interval;
var player;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject();
	player.force = 1;
	
	pearl = new GameObject({x:200, y:200, width:25, color:"cyan"});
	
	
	//friction
	var fX = .80;
	var fY = .80;
	
	var angle = 0;
	
	//gravity gets added to the vy
	var gravity = 0;

	interval = 1000/60;
	timer = setInterval(animate, interval);
	

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	/*-----------This function move the player-----------*/
	//w and s move forward and backward
	//a and d rotate the triangle
	angularMovement();
	
	//-------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------INSTRUCTIONS-------------------------------------------------------
	//-------------------------------------------------------------------------------------------------------------------------
	
	//--------Make the blue pearl move to the player when it's within 300 pixels of the player.------
	//--------If the pearl hits the player's x and y coordinates move it off screen.-----------------
	
	magnet();
		
	//--------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------END OF INSTRUCTIONS-------------------------------------------------
	//--------------------------------------------------------------------------------------------------------------------------
	
	player.drawTriangle();
	pearl.drawCircle();
}

function magnet()
{
	var dx = player.x - pearl.x;
	var dy = player.y - pearl.y;
	var dist = Math.sqrt(dx * dx + dy * dy);

	var radians = Math.atan2(dy, dx);

	console.log(dist);

	if(dist <= 300)
	{
		pearl.x += dx/25;
		pearl.y += dy/25;
	}
		//Cheeky way to get it to teleport. They technically are never 100% equal, so doing this is a nice shortcut.
	if(dist < .5)
	{
		console.log("insta teleported");
		pearl.x = canvas.width + 500;
		pearl.y = canvas.height + 500;
	}
}

function angularMovement()
{
	if(w)
	{	
		//Convert Angle to Radians
		var radians = player.angle * Math.PI/180;
		
		//Calculate acceleration modifiers (lengtha and height of triangle)
		player.ax = Math.cos(radians);
		player.ay = Math.sin(radians);
		
		player.vx += player.ax * player.force;
		player.vy += player.ay * player.force;
	}
	
	if(s)
	{
		//Convert Angle to Radians
		var radians = player.angle * Math.PI/180;
		
		//Calculate acceleration modifiers (lengtha and height of triangle)
		player.ax = Math.cos(radians);
		player.ay = Math.sin(radians);
		
		player.vx += player.ax * -player.force;
		player.vy += player.ay * -player.force;
	}
	
	//Rotate Counter Clockwise
	if(a)
	{
		player.angle-=2;
	}
	//Rotate Clockwise
	if(d)
	{
		player.angle+=2;
	}

	//apply physics to velocity
	player.vx *= fX;
	player.vy *= fY;
	
	//apply gravity to velocity
	player.vy += gravity;
	
	//move player
	player.move();
}

