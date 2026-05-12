
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var currentState = 0;
var states = [];

var maxSpeed = 5.5;
var tempBossHealth = 1000;
var playerHealth = 100;
var bossDamage = 10;

var timeFight = 5000;

var actChoice;
var fightStarted = false;

var waitToMove;
var actionUsed;
var inputValid = true;

var cannotMoveRight;
var cannotMoveLeft;
var cannotMoveUp;
var cannotMoveDown;

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


//State 1 && 2 (Adjusted IN 2 for 2)
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

	context.font = "20px Georgia";
	context.fillText("Left and Right arrow keys to move. Enter to choose.", 50, 50);

		//Movement. Intentionally not smooth.
	if(arrowLeft && !waitToMove && !cannotMoveLeft)
	{
		console.log("test left");
		waitToMove = true;
		setTimeout(moveValid, 100);
		player.x = player.x - player.width;
		
	}
	if(arrowRight && !waitToMove && !cannotMoveRight)
	{
		console.log("test right");
		waitToMove = true;
		setTimeout(moveValid, 100);
		player.x = player.x + player.width;
		
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
			inputValid = false;
			changeToState2Var();
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

	setTimeout(inputWait, 200);


	if(arrowLeft && !waitToMove && !cannotMoveLeft)
	{
		
		player.x = player.x - player.width*1.45;
		waitToMove = true;
		setTimeout(moveValid, 100);
	}
	if(arrowRight && !waitToMove && !cannotMoveRight)
	{
		
		player.x = player.x + player.width * 1.45;
		waitToMove = true;
		setTimeout(moveValid, 100);
	}

	if(arrowUp && !waitToMove && !cannotMoveUp)
	{
		
		player.y = player.y - player.height*1.35;
		waitToMove = true;
		setTimeout(moveValid, 100);
	}
	if(arrowDown && !waitToMove && !cannotMoveDown)
	{
		
		player.y = player.y + player.height * 1.35;
		waitToMove = true;
		setTimeout(moveValid, 100);
	}

		//Prevent player from moving if in a certain area.
	if(player.x > canvas.width - player.x)
	{
		cannotMoveRight = true;
		cannotMoveLeft = false;
	}
	else if(player.x < (0 + player.x + 5))
	{
		cannotMoveLeft = true;
		cannotMoveRight = false;
	}
	else 
	{
		cannotMoveRight = false;
		cannotMoveLeft = false;
	}

	if(player.y > choice.height * 2 - player.y)
	{
		cannotMoveDown = true;
		cannotMoveUp = false;
	}
	else if (player.y < choice.height * 3 - player.y)
	{
		cannotMoveDown = false;
		cannotMoveUp = true;
	}
	else
	{
		cannotMoveDown = false;
		cannotMoveUp = false;
	}

	if(inputValid){
		if(player.hitTestObject(platform0) && enter)
		{
			actChoice = 1;
			currentState = 5;
		}
		if(player.hitTestObject(platform1) && enter)
		{
			actChoice = 2;
			currentState = 5;
		}
		if(player.hitTestObject(platform2) && enter)
		{
			actChoice = 3;
			currentState = 5;
		}
		if(player.hitTestObject(platform3) && enter)
		{
			actChoice = 4;
			currentState = 5;
		}
	}	

	choice.drawRect();
	player.drawRect();
	platform0.drawRect();
	platform1.drawRect();
	platform2.drawRect();
	platform3.drawRect();

		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Read Enemy Stats", platform0.x/1.5, platform0.y);
		context.fillText("Increase Speed", platform1.x/1.1, platform1.y);
		context.fillText("Decrease Enemy Damage", platform2.x/1.78, platform2.y);
		context.fillText("Slow Enemy Attacks", platform3.x/1.13, platform3.y);

}
states[3] = function()
{
	context.font = "20px Georgia";
	context.fillText("Healing items state", 50, 50);
	console.log("Heal Items state");
}

states[4] = function()
{

	//End of this would remove buffs/debuffs. Obviously cant yet... as theres no fight to alter!
	if(!fightStarted)
	{
		fightStarted = true;
		setTimeout(changeToPlayer, timeFight);
	}
	

	context.font = "20px Georgia";
	context.fillText("Active Fighting state", 50, 50);
	console.log("This would be the fighting state.");
	console.log(tempBossHealth);



	
}

	//Act print screen
states[5] = function()
{
	choice.drawRect();
	if(actChoice == 1)
	{
		console.log("Reading the enemy stats");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Enemy Stats", 50, 450);
	}
	if(actChoice == 2)
	{
		console.log("player has speed buff");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Speed Buff Granted", 50, 450);
	}
	if(actChoice == 3)
	{
		console.log("enemy deals less damage");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Enemy deals less damage", 50, 450);
	}
	if(actChoice == 4)
	{
		console.log("enemy attacks are slower!");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Enemy attacks slowed", 50, 450);
	}

	setTimeout(changeToFight, 5000);
}
moveValid = function()
{
	waitToMove = false;
}
changeToFight = function()
{
	platform1.vx = maxSpeed;
	actionUsed = false;

	platform0.width = canvas.width;
		platform0.height = 300;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";
	platform1.width = 15;
		platform1.height = 300;
		platform1.x = 0;
		platform1.y = canvas.height - platform0.height/2;
		platform1.color = "#ff0000";
	platform2.width = canvas.width/2;
		platform2.height = platform0.height;
		platform2.x = platform0.width/2;
		platform2.y = canvas.height - platform0.height/2;
		platform2.color = "#00ff";
	platform3.width = canvas.width/9;
		platform3.height = platform0.height;
		platform3.x = platform0.width/2;
		platform3.y = canvas.height - platform0.height/2;
		platform3.color = "#00ffff";

		context.fillStyle = "#000000"

	currentState = 4;
}
changeToPlayer = function()
{
	player.width = canvas.width/3;
	player.height = canvas.width/4;
	player.x = canvas.width/2;
	player.y = canvas.height;
	player.color = "#ff0000";

	choice.width = canvas.width;
	choice.height = canvas.width/4;
	choice.x = canvas.width/2;
	choice.y = canvas.height;
	choice.color = "#00ff00";
	currentState = 0;
}

changeToState2Var = function()
{
		//Alter the choice pieces
	choice.width = canvas.width;
	choice.height = canvas.width/2;
	choice.x = canvas.width/2;
	choice.y = canvas.height - choice.height/3;
	choice.color = "#1d1d1d";

		//Alter the player pieces
	player.width = canvas.width/3 + 5;
	player.height = canvas.width/8 + 5;
	player.x = canvas.width/4;
	player.y = choice.height;
	player.color = "#6b6b6b";

		//Just to see the spots easier
		//Platform0
	platform0.width = canvas.width/3;
	platform0.height = canvas.width/8;
	platform0.x = canvas.width/4;
	platform0.y = choice.height;
	platform0.color = "#313131";
		//Platform1
	platform1.width = canvas.width/3;
	platform1.height = canvas.width/8;
	platform1.x = canvas.width/1.35;
	platform1.y = choice.height;
	platform1.color = "#313131";
		//Platform2
	platform2.width = canvas.width/3;
	platform2.height = canvas.width/8;
	platform2.x = canvas.width/4;
	platform2.y = choice.height * 1.35;
	platform2.color = "#313131";

	platform3.width = canvas.width/3;
	platform3.height = canvas.width/8;
	platform3.x = canvas.width/1.35;
	platform3.y = choice.height*1.35;
	platform3.color = "#313131";
}

inputWait = function()
{
	inputValid = true;
}
//-------------------------AnimationLoop--------------------------------

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);
	
	states[currentState]();
}



