
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var waitToSwitch = false;
var direction;
var bulletSpeed = 12;

var frictionX = .8;	
var frictionY = .8;

var playerPrevY;
var playerPrevX;

//------------Use this if you want to implement States---------------
var currentState = 0;
var states = [];

player = new GameObject();
	player.width = 20;
	player.height = 20;
	player.x = canvas.width/2;
	player.y = canvas.height/2;

shield = new GameObject();
	shield.width = 30;
	shield.height = 5;
	shield.x = player.x;
	shield.y = player.y - 20

tempBullet = new GameObject();
	tempBullet.width = 10;
	tempBullet.height = 10;
	tempBullet.x = canvas.width/2;
	tempBullet.y = 10;
	tempBullet.vy = 5;
	tempBullet.vx = 0;

states[0] = function()
{
	player.color = "rgba(214, 18, 51, 0.2)"
	player.drawRect();

		//No leaving the screen for the player
	if((player.y > canvas.height - player.height/2) || (player.y < player.height/2))
	{
		player.y = playerPrevY;	
		player.vy = 0;
	}
	else
	{
		playerPrevY = player.y;
	}
	if((player.x > canvas.width - player.width/2) || (player.x < player.width/2))
	{
		player.x = playerPrevX;	
		player.vx = 0;
	}
	else
	{
		playerPrevX = player.x;
	}

		//Controls player
	if(d)
	{	
		player.vx +=  player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	if(w)
	{	
		player.vy += player.ay * -player.force;
	}
	if(s)
	{
		player.vy += player.ay * player.force;
	}

		//The dodge mechanic
		//Looks at diagnols first to prioritise them.
	if(keye)
	{
		if (w && a)
		{
			player.x = player.x - 10;
			player.y = player.y - 10;
		}
		else if (w && d)
		{
			player.x = player.x + 10;
			player.y = player.y - 10;
		}
		else if (s && a)
		{
			player.x = player.x - 10;
			player.y = player.y + 10;
		}
		else if (s && d)
		{
			player.x = player.x + 10;
			player.y = player.y + 10;
		}
		else if(w)
		{
			player.y = player.y - 20;
		}
		else if(s)
		{
			player.y = player.y + 20;
		}
		else if(d)
		{
			player.x = player.x + 20;
		}
		else if(a)
		{
			player.x = player.x - 20;
		}
		
	}

		//Friction and acceleration and pixel lock
	player.vx *= frictionX;
	player.x += player.vx;

	player.vy *= frictionY;
	player.y += player.vy;

	player.y += Math.round(player.vy);
	player.x += Math.round(player.vx);

		//The information sharer
	if(q)
	{
		context.font = "20px Georgia";
		context.fillText("This state holds the 'dodging' code. Press 'e' to dodge.", 50, 700);
		context.fillText("This would be one variety of defense in a boss's attacks.", 50, 720);
		context.fillText("In gameplay, the player would hit a button to swiftly move and dodge attacks.", 50, 740);
		context.fillText("Known bug: When dodging at the edge of the canvas, player flickers. Looking into fixes.", 50, 760);
	}

		//Switches to next state
	if(t && !waitToSwitch)
	{
		console.log("state 0 changing");
		waitToSwitch = true;
		currentState = 1;

		player.x = canvas.width/2;
		player.y = canvas.height/2;

		tempBullet.x = canvas.width/2;
		tempBullet.y = 10;
		tempBullet.vy = 5;
		tempBullet.vx = 0;

		shield.width = 30;
		shield.height = 5;
		shield.x = player.x;
		shield.y = player.y - 20;

		setTimeout(switchValid, 500);
	}
}

states[1] = function()
{
	
	player.color = "rgba(40, 163, 126, 0.2)"

	tempBullet.move();
	

		//Plays when player gets hit
	if(tempBullet.hitTestObject(player))
	{
		tempBullet.vy = 0;
		tempBullet.vx = 0;
		context.fillText("Ouch. You got hit.", 50, 130);
	}

		//Checks if the shield is hit
	if(tempBullet.hitTestObject(shield))
	{
		//randomises for a random position. Up/down, left/right
		direction = rand(0, 100);

		console.log(direction);

		if(direction <= 50)
		{
			tempBullet.y = rand(0, canvas.height);
			if(tempBullet.y > canvas.height/2)
			{
				tempBullet.y = canvas.height;
				tempBullet.x = canvas.width/2;
				tempBullet.vy = -bulletSpeed;
				tempBullet.vx = 0;
				console.log("randomised to below player");
			} else if (tempBullet.y < canvas.height/2)
			{
				tempBullet.y = 0;
				tempBullet.x = canvas.width/2;
				tempBullet.vy = bulletSpeed;
				tempBullet.vx = 0;
				console.log("randomised to above player");
			}
		}
		else
		{
			tempBullet.x = rand(0, canvas.width);
			if (tempBullet.x > canvas.width/2)
			{
				tempBullet.y = canvas.height/2;
				tempBullet.x = canvas.width;
				tempBullet.vx = -bulletSpeed;
				tempBullet.vy = 0;
				console.log("randomised to right of player");
			} else
			{
				tempBullet.y = canvas.height/2;
				tempBullet.x = 0;
				tempBullet.vx = bulletSpeed;
				tempBullet.vy = 0;
				console.log("randomised to left of player");
			}
		}
	}

	player.drawRect();
	shield.drawRect();
	tempBullet.drawCircle();
		//Moves shield around the player. Will likely adjust to optimise it better later on.
	if(a)
	{
		shield.width = 5;
		shield.height = 30;
		shield.x = player.x - 20;
		shield.y = player.y;
	}
	if (d)
	{
		shield.width = 5;
		shield.height = 30;
		shield.x = player.x + 20;
		shield.y = player.y;
	}
	if (s)
	{
		shield.width = 30;
		shield.height = 5;
		shield.x = player.x;
		shield.y = player.y + 20;
	} 
	if (w)
	{
		shield.width = 30;
		shield.height = 5;
		shield.x = player.x;
		shield.y = player.y - 20;
	}

	if(q)
	{
		context.font = "20px Georgia";
		context.fillText("This state holds the 'blocking' code. Use WASD to move the shield.", 50, 700);
		context.fillText("This would be one variety of defense in a boss's attacks.", 50, 720);
		context.fillText("In gameplay, the player would be defending from incoming projectiles.", 50, 740);
	}

	if(t && !waitToSwitch)
	{
		console.log("state 1 changing");
		waitToSwitch = true;
		currentState = 0;

		setTimeout(switchValid, 500);
	}
}

switchValid = function()
{
	waitToSwitch = false;
}

//-------------------------AnimationLoop--------------------------------

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);
	//-----------Use for State Machine ---------------------------------

	context.font = "20px Georgia";
	context.fillText("Press 't' to swap states:", 50, 50);
	context.fillText(currentState, 260, 50);

	context.fillText("Hold 'q' for information", 50, 90);

	states[currentState]();
}



