// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000/60;
var player;
var ball;
var score = 0;

//---------------Set Friction and Gravity-----------------
var frictionX = .65;	
var frictionY = .99;
var gravity = .17;
//--------------------------------------------------------



	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	player = new GameObject();
	player.width = 250;
	player.height = 40;
	player.y = canvas.height - 50;
	player.color = "#00ffff";


	ball = new GameObject();
	ball.width = 80;
	ball.color = "#ff00ff";

	ball.force = 2;
	player.force = 2;
	
	timer = setInterval(animate, interval);

	ball.xy = 5;
	ball.vy = 0;

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Call just one of the functions below to view acceleration, friction, gravity and pixel lock.
	showAcceleration();
	showFriction();
	showGravity();
	//showPixelLock();
	showBounce();
	
	player.drawRect();
	ball.drawCircle();

	context.beginPath();

	// Set a start-point
	context.moveTo(player.x, player.y);

	// Set an end-point
	context.lineTo(ball.x, ball.y);

	// Stroke it (Do the Drawing)
	context.stroke();

	context.fillstyle = "#555555"
	context.font = "16px Arial";
	context.fillText("Score: " + score,35,40);
}


/*IMPORTANT: Below are four functions that demonstrate the various elements we will use to simulating Game Physics.
each function is a copy of the previous with more functionality added. 
ONLY CALL ONE OF THESE FUNCTIONS AT A TIME!!!!!!!!*/



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

	ball.y += ball.vy;
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
	ball.y += ball.vy;
	ball.x += ball.vx;

	
}

function showGravity()
{
		
	//--------------Apply Gravity to the Velocity Y-----------------------------------------
	//ball.vy += gravity;
	ball.y += ball.vy;
	//---------------------------------------------------------------------------------------
	
	//ball.vx *= ballFrictionX;
	ball.x += ball.vx;
}

function showPixelLock()
{
	
	if(d)
	{	
		player.vx += player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	

	player.vx *= frictionX;	
	player.vy *= frictionY;
	
	//------Round the velocity before applying it to the position.--------------------------
    //------This will keep the object from moving fractions of a pixel----------------------
	//------This might not be noticeable now, but will help alot when things get complex----
	player.y += Math.round(player.vy);
	player.x += Math.round(player.vx);
	//--------------------------------------------------------------------------------------
}

function showBounce()
{
	
	
	//ball.vx *= ballFrictionX;
	
	
	
	ball.x += ball.vx;
	ball.y += ball.vy;
	
	//--------------------Check Collision------------------------------------------------------
	
	//Ball to Player Collision

	if(ball.hitTestObject(player))
	{
		if(ball.x < player.x - player.width/3)
		{
			ball.vy = -7;
			ball.vx = -ball.force * 5;
		}
		else if (ball.x < player.x - player.width/6){
			ball.vy = -7;
			ball.vx = -ball.force;
		}
		else if (ball.x < player.x + player.width/6)
		{
			ball.vx = 0;
			ball.vy = -7;
		}
		else if (ball.x < player.x + player.width / 3){
			ball.vy = -5;
			ball.vx = ball.force;
		}
		else
		{
			ball.vy = -7;
			ball.vx = ball.force * 5;
		}
		ball.y = player.y - ball.height / 2 - 1;
		score++;
		console.log(score);
	}
	

	//Ball collision on Walls
	if(ball.x > canvas.width - ball.width/2)
	{
		//the decimal is how bouncy you want the object to be
		//It should be a number between 0 and 2;
		ball.x = canvas.width - ball.width/2;
		ball.vx = -ball.vx * .8;
	
	}
	//Bounce off left
	if(ball.x < ball.width/2){
		ball.x = ball.width/2;
		ball.vx = -ball.vx * .8;
	
	}

	if(ball.y > canvas.height - ball.height/2)
	{
		//the decimal is how bouncy you want the object to be
		//It should be a number between 0 and 2;
		ball.y = canvas.height - ball.height/2;
		ball.vy = -ball.vy * .8;
		score = 0;
		console.log(score);
	}

	if(ball.y < ball.height/2){
		ball.y = ball.height/2;
		ball.vy = -ball.vy * .8;
	}

	ball.vy += gravity;
	ball.vy *= frictionY;

	//Player Collision on Walls
	if(player.x > canvas.width - player.width/2)
	{
		
		//--------Stop the Player---------------------------------------------------------------
		player.x = canvas.width - player.width/2;
		//the decimal is how bouncy you want the object to be
		//It should be a number between 0 and 2;
		player.vx = -player.vx * 0;
	}
	if(player.x < player.width/2)
	{
		
		//--------Stop the Player---------------------------------------------------------------
		player.x = player.width/2;
		//the decimal is how bouncy you want the object to be
		//It should be a number between 0 and 2;
		player.vx = player.vx * 0;
	}
	
	//-----------------------------------------------------------------------------------------
}


