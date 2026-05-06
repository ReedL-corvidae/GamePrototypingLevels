
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var currentState = 0;
var states = [];

var maxSpeed = 5.5;
var tempBossHealth = 1000;

var waitToMove;
var actionUsed;
var cannotMoveRight;
var cannotMoveLeft;

//State 0
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


//State 1
platform0 = new GameObject();
		platform0.width = canvas.width;
		platform0.height = 300;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";
	
	platform1 = new GameObject();
		platform1.width = 15;
		platform1.height = 300;
		platform1.x = 0;
		platform1.y = canvas.height - platform0.height/2;
		platform1.color = "#ff0000";
	
	platform2 = new GameObject();
		platform2.width = canvas.width/2;
		platform2.height = platform0.height;
		platform2.x = platform0.width/2;
		platform2.y = canvas.height - platform0.height/2;
		platform2.color = "#00ff";
	
	platform3 = new GameObject();
		platform3.width = canvas.width/9;
		platform3.height = platform0.height;
		platform3.x = platform0.width/2;
		platform3.y = canvas.height - platform0.height/2;
		platform3.color = "#00ffff";

states[0] = function()
{
	choice.drawRect();
	player.drawRect();
	console.log("player choice state");
	console.log(cannotMoveRight);
	console.log(cannotMoveLeft);

	context.font = "20px Georgia";
	context.fillText("Left and Right arrow keys to move. Enter to choose.", 50, 50);
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

	if(player.hitTestObject(choice) && enter)
	{
		if(player.x < choice.x - choice.width/6)
		{
			currentState = 1;
		}
		else if (player.x < choice.x + choice.width/6)
		{
			currentState = 2;
		}
		else
		{
			currentState = 3;
		}
	}

}
states[1] = function()
{
	
	console.log("Attack state");

	context.clearRect(0,0,canvas.width, canvas.height);	
	context.font = "20px Georgia";
	context.fillText("Attack state", 50, 50);

	platform1.x += Math.round(platform1.vx) * maxSpeed;


	platform1.move();


		//Player times hits. Only hits ONCE. Function for turns would be added later to allow for later turns again.
	if(platform1.hitTestObject(platform0) && space && !actionUsed)
	{
		actionUsed = true;
		if((platform1.x < platform0.x - platform0.width/4))
		{
			platform1.vx = 0;
			tempBossHealth = tempBossHealth - 25;
			console.log("Health is " + tempBossHealth);
		}
		else if ((platform1.x < platform0.x - platform0.width/18))
		{
			platform1.vx = 0;
			tempBossHealth = tempBossHealth - 50;
			console.log("Health is " + tempBossHealth);
		}
		else if ((platform1.x < platform0.x + platform0.width/20))
		{
			platform1.vx = 0;
			tempBossHealth = tempBossHealth - 100;
			console.log("Health is " + tempBossHealth);
		}
		else if ((platform1.x < platform0.x + platform0.width/4))
		{
			platform1.vx = 0;
			tempBossHealth = tempBossHealth - 50;
			console.log("Health is " + tempBossHealth);
		}
		else if (space == true)
		{
			platform1.vx = 0;
			tempBossHealth = tempBossHealth - 25;
			console.log("Health is " + tempBossHealth);
		}
		setTimeout(changeToFight, 3000);
	}

		//Lets hitbox thing hit back and forth
	if(platform1.x > canvas.width)
	{
		platform1.x--;
		platform1.vx = -maxSpeed;	
	}

	if(platform1.x - platform1.width < 0)
	{
		platform1.x++;
		platform1.vx = maxSpeed;
	}

	platform0.drawRect();
	platform2.drawRect();
	platform3.drawRect();

	platform1.drawRect();

}
states[2] = function()
{
	context.font = "20px Georgia";
	context.fillText("Act state", 50, 50);
	console.log("Act state");
}
states[3] = function()
{
	context.font = "20px Georgia";
	context.fillText("Healing items state", 50, 50);
	console.log("Heal Items state");
}

states[4] = function()
{
	context.font = "20px Georgia";
	context.fillText("Active Fighting state", 50, 50);
	console.log("This would be the fighting state.");
}

moveValid = function()
{
	waitToMove = false;
}

changeToFight = function()
{
	currentState = 4;
}

//-------------------------AnimationLoop--------------------------------

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);
	
	states[currentState]();
}



