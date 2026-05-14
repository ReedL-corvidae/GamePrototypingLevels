
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var currentState = 0;
var states = [];

var direction;
var bulletSpeed = 12;
var bossAttackNumbers = 20;

var frictionX = .8;	
var frictionY = .8;

var playerPrevY;
var playerPrevX;

var bossSpeedDebuff = false;

var maxSpeed = 5.5;
var tempBossHealth = 1000;
var playerHealth = 100;
var bossDamage = 10;
var fightOption;

var timeFight = rand(15000, 30000); // this will eventually be a randomised time

var actChoice;
var fightStarted = false;

var waitToMove;
var actionUsed;
var inputValid = true;
var canHeal = true;
var playerImmunity = false;

var cannotMoveRight;
var cannotMoveLeft;
var cannotMoveUp;
var cannotMoveDown;
var heal1 = true, heal2 = true, heal3 = true, heal4 = true;

var bullets = [];

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
	context.font = "20px Georgia";
	context.fillText("Left and Right arrow keys to move. Enter to choose.", 50, 50);

	
	choice.drawRect();
	player.drawRect();

		//Movement. Intentionally not smooth.
	if(arrowLeft && !waitToMove && !cannotMoveLeft)
	{
		waitToMove = true;
		setTimeout(moveValid, 100);
		player.x = player.x - player.width;
		
	}
	if(arrowRight && !waitToMove && !cannotMoveRight)
	{
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
			fixTheAttack();
			currentState = 1;
		}
		else if (player.x < choice.x + choice.width/6)
		{
			currentState = 2;
			inputValid = false;
			changeToStateVar();
		}
		else
		{
			currentState = 3;
			inputValid = false;
			changeToStateVar();
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

	if(backspace)
	{
		changeToPlayer();
		currentState = 0;
	}

}
states[3] = function()
{
	context.font = "20px Georgia";
	context.fillText("Healing items state", 50, 50);
	console.log("Heal Items state");

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
			currentState = 6;
		}
		if(player.hitTestObject(platform1) && enter)
		{
			actChoice = 2;
			currentState = 6;
		}
		if(player.hitTestObject(platform2) && enter)
		{
			actChoice = 3;
			currentState = 6;
		}
		if(player.hitTestObject(platform3) && enter)
		{
			actChoice = 4;
			currentState = 6;
		}
	}	

	choice.drawRect();
	player.drawRect();
	platform0.drawRect();
	platform1.drawRect();
	platform2.drawRect();
	platform3.drawRect();

	context.fillStyle = "#FFFFFF"

	if(heal1)
	{
		context.fillText("Healing 1", platform0.x/1.5, platform0.y);
	}
	else
	{
		context.fillText("ITEM OUT", platform0.x/1.5, platform0.y);
	}

	if(heal2)
	{
		context.fillText("Healing 2", platform1.x/1.1, platform1.y);
	}
	else
	{
		context.fillText("ITEM OUT", platform1.x/1.1, platform1.y);
	}

	if(heal3)
	{
		context.fillText("Healing 3", platform2.x/1.78, platform2.y);
	}
	else
	{
		context.fillText("ITEM OUT", platform2.x/1.78, platform2.y);
	}

	if(heal4)
	{
		context.fillText("Healing 4", platform3.x/1.13, platform3.y);
	}
	else
	{
		context.fillText("ITEM OUT", platform3.x/1.13, platform3.y);
	}

	if(backspace)
	{
		changeToPlayer();
		currentState = 0;
	}

}

states[4] = function()
{
	//End of this would remove buffs/debuffs. Obviously cant yet... as theres no fight to alter!
	if(!fightStarted)
	{
		fightStarted = true;
		setTimeout(changeToPlayer, timeFight);
	}

	if(tempBossHealth == 0 || playerHealth == 0)
	{
		console.log("Wuhoh");
		currentState = 7;
	}

	if(fightOption >= 0 && fightOption < 1)
	{

		player.color = "rgba(214, 18, 51, 0.2)"
		player.drawRect();

		if(tempBullet.hitTestObject(player))
		{
			if(!playerImmunity)
			{
				playerHealth = playerHealth - bossDamage;
				playerImmunity = true;
				console.log(playerHealth);

				setTimeout(playerImmune, 100);
			}
		}

	for(var i = 0; i < bossAttackNumbers; i++)
	{
		bullets[i].drawCircle();
		bullets[i].y--;
		bullets[i].move();
	
		if(bullets[i].y > canvas.height)
		{
			bullets[i].x = Math.random() * canvas.width;
			bullets[i].y = Math.random() * -500;
			if(!bossSpeedDebuff)
			{
				bullets[i].vy = rand(6,15);
			}
			else
			{
				bullets[i].vy = rand(4,8);
			}
			
			console.log("changing locations");
		}

		if(bullets[i].hitTestObject(player))
		{
			console.log("collision");
			for(var j = 0; j < bossAttackNumbers; j++)
			{
				bullets[i].x = Math.random() * canvas.width;
				bullets[i].y = Math.random() * -500;
				if(!bossSpeedDebuff)
				{
				bullets[i].vy = rand(6,15);
				}
				else
				{
				bullets[i].vy = rand(4,8);
				}
			}
			if(!playerImmunity)
			{
				playerHealth = playerHealth - bossDamage;
				playerImmunity = true;
				console.log(playerHealth);

				setTimeout(playerImmune, 500);
			}
		}
	}

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
			playerImmunity = true;
			setTimeout(playerImmune, 100);
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


	}
	else if(fightOption >= 1 && fightOption < 2)
	{
			player.color = "rgba(40, 163, 126, 0.2)"

		tempBullet.move();
		
		if(bossSpeedDebuff)
		{
			bulletSpeed = 9;
		}
		else
		{
			bulletSpeed = 12;
		}
			//Plays when player gets hit
		if(tempBullet.hitTestObject(player))
		{
			if(!playerImmunity)
			{
				playerHealth = playerHealth - bossDamage;
				playerImmunity = true;
				console.log(playerHealth);

				setTimeout(playerImmune, 100);

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
	}
	else if(fightOption >= 2 && fightOption < 3)
	{

	}
	else if(fightOption >= 3 && fightOption < 4)
	{

	}
		else if(fightOption >= 4 && fightOption < 5)
	{

	}
	else if (fightOption >= 5 && fightOption <= 6)
	{

	}
	else
	{
			console.log("...How'd you get here...");
	}

	context.font = "20px Georgia";
	context.fillText("Active Fighting state", 50, 50);
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
		bossSpeedDebuff = true;
	}

	setTimeout(changeToFight, 3000);
}
states[6] = function()
{
	choice.drawRect();
	if(actChoice == 1)
	{
		console.log("Added 10 health!");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Added 10 health!", 50, 450);
		heal1 = false;
		//add if statements to ensure player health cannot go above 100.

		if(playerHealth > 90 && canHeal)
		{
			playerHealth = 100;
		}
		else if (canHeal)
		{
			playerHealth = playerHealth + 10;
		}
		canHeal = false;
	}
	if(actChoice == 2)
	{
		console.log("Added 25 health!");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Added 25 health!", 50, 450);
		heal2 = false;

		if(playerHealth > 75 && canHeal)
		{
			playerHealth = 100;
		}
		else if (canHeal)
		{
			playerHealth = playerHealth + 25;
		}
		canHeal = false;
	}
	if(actChoice == 3)
	{
		console.log("Added 35 health!");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Added 35 health!", 50, 450);
		heal3 = false;

		if(playerHealth > 65 && canHeal)
		{
			playerHealth = 100;
		}
		else if (canHeal)
		{
			playerHealth = playerHealth + 35;
		}
		canHeal = false;
	}
	if(actChoice == 4)
	{
		console.log("Added 35 health!");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Added 35 health!", 50, 450);
		heal4 = false;

		if(playerHealth > 65 && canHeal)
		{
			playerHealth = 100;
		}
		else if (canHeal)
		{
			playerHealth = playerHealth + 35;
		}
		canHeal = false;
	}

	
	console.log(playerHealth);
	setTimeout(changeToFight, 3000);
}
states[7] = function()
{
	console.log("Win/Lose screen.");
}
states[8] = function()
{
	console.log("start screen");
}
states[9] = function()
{
	console.log("Instructions screen");
}

adjustPerAttack = function()
{
	if(fightOption >= 0 && fightOption < 1)
	{
		player.width = 20;
		player.height = 20;
		player.x = canvas.width/2;
		player.y = canvas.height/2;

		bulletSpeed.vy = 12;

		for(var i = 0; i < bossAttackNumbers; i++)
		{
			bullets[i] = new GameObject();
			bullets[i].x = Math.random() * canvas.width;
			bullets[i].y = Math.random()* -500;
			bullets[i].width = 20;
			if(!bossSpeedDebuff)
			{
				bullets[i].vy = rand(6,15);
			}
			else
			{
				bullets[i].vy = rand(4,8);
			}
			//dots[i].vx = rand(-10,10);
			bullets[i].color = "#ff0000";
		}
	}
	else if(fightOption >= 1 && fightOption < 2)
	{
		player.width = 20;
		player.height = 20;
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

	
	}
	else if(fightOption >= 2 && fightOption < 3)
	{

	}
	else if(fightOption >= 3 && fightOption < 4)
	{

	}
	else if(fightOption >= 4 && fightOption < 5)
	{

	}
	else if (fightOption >= 5 && fightOption <= 6)
	{

	}
}

fixTheAttack = function()
{
	platform1.vx = maxSpeed;
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
}
moveValid = function()
{
	waitToMove = false;
}
changeToFight = function()
{
	platform1.vx = maxSpeed;
	actionUsed = false;
	canHeal = true;
	fightOption = 0;
	adjustPerAttack();

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
	fightStarted = false;
	currentState = 0;

	bossSpeedDebuff = false;
	
}

changeToStateVar = function()
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
playerImmune = function()
{
	playerImmunity = false;
}

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);
	
	states[currentState]();
}



