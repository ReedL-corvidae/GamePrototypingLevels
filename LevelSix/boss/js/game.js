
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var currentState = 0;
var states = [];

var waitToMove;
var cannotMoveRight;
var cannotMoveLeft;

player = new GameObject();
	player.width = canvas.width/3;
	player.height = canvas.width/4;
	player.x = canvas.width/2;
	player.y = canvas.height;
	player.color = "#ff0000";

choice = new GameObject();
	choice.width = canvas.width;
	choice.height = canvas.width/4;
	choice.x = canvas.width/2;
	choice.y = canvas.height;
	choice.color = "#00ff00";

states[0] = function()
{
	choice.drawRect();
	player.drawRect();
	console.log("player choice state");
	console.log(cannotMoveRight);
	console.log(cannotMoveLeft);

		//Movement. Intentionally not smooth.
	if(arrowLeft && !waitToMove && !cannotMoveLeft)
	{
		
		player.x = player.x - player.width;
		waitToMove = true;
		setTimeout(moveValid, 100);
	}
	if(arrowRight && !waitToMove && !cannotMoveRight)
	{
		
		player.x = player.x + player.width;
		waitToMove = true;
		setTimeout(moveValid, 100);
	}

		//Prevent player from moving if in a certain area.
	if(player.x > 600)
	{
		cannotMoveRight = true;
		cannotMoveLeft = false;
	}
	else if(player.x < 400)
	{
		cannotMoveLeft = true;
		cannotMoveRight = false;
	}
	else 
	{
		cannotMoveRight = false;
		cannotMoveLeft = false;
	}
}
states[1] = function()
{
	console.log("Attack state");
}
states[2] = function()
{
	console.log("Act state");
}
states[3] = function()
{
	console.log("Heal Items state");
}

moveValid = function()
{
	waitToMove = false;
}

//-------------------------AnimationLoop--------------------------------

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);
	
	states[currentState]();
}



