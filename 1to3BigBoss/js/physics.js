// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000/60;
var player;
var ball;

//---------------Set Friction and Gravity-----------------
var frictionX = .55;	
var frictionY = .99;
var gravity = 1;
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
	ball.vy *= frictionY;
	//---------------------------------------------------------------------------------------
	player.x += player.vx;
	ball.y += ball.vy;

	
}

function showGravity()
{
		
	//--------------Apply Gravity to the Velocity Y-----------------------------------------
	ball.vy += gravity;
	ball.y += ball.vy;
	//---------------------------------------------------------------------------------------
	
	ball.vx *= frictionX;
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
	
	ball.vy *= frictionY;
	ball.vx *= frictionX;
	
	ball.vy += gravity;
	
	ball.x += ball.vx;
	ball.y += ball.vy;
	
	//--------------------Check Collision------------------------------------------------------
	
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.x = ball.width - ball.width/2;
		//the decimal is how bouncy you want the object to be
		//It should be a number between 0 and 2;
		ball.vx = -ball.vx * .99;
	
	}
	//Bounce off left
	if(ball.x < ball.width/2){
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
	
	}

	if(ball.y > canvas.height - ball.height/2)
	{
		ball.y = canvas.height - ball.height/2;
		//the decimal is how bouncy you want the object to be
		//It should be a number between 0 and 2;
		ball.vy = -ball.vy * .99;
	}

	if(ball.y < ball.height/2){
		ball.vy = ball.vy * .99;
	}

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


