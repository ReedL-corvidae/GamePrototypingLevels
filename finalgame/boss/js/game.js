
var canvas = document.getElementById("canvas");
	canvas.addEventListener("mousemove", track);
	canvas.addEventListener("click", startGame);

var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var mouse = {x:0,y:0};

var currentState = 8;
var states = [];

var hit = false;
var direction;
var bulletSpeed = 12;
var bossAttackNumbers = 30;

var frictionX = .8;	
var frictionY = .8;
var gravity = 0;
var angle = 0;

var playerPrevY;
var playerPrevX;

var bossSpeedDebuff = false;
var dodge = 10;

var maxSpeed = 5.5;
var tempBossHealth = 500;
var playerHealth = 100;
var bossDamage = 10;
var fightOption;

var timeFight = rand(15000, 30000); // this will eventually be a randomised time

var actChoice;
var fightStarted = false;

var actingUp = false;
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

var square = new GameObject({width:50, height:50, x:canvas.width/2, y:canvas.height - 200, color:"orange"})

//State 0
player = new GameObject();
	player.width = canvas.width/3;
	player.height = canvas.width/4;
	player.x = canvas.width/2;
	player.y = canvas.height;
	player.color = "#ffffff";

choice = new GameObject();
	choice.width = canvas.width;
	choice.height = canvas.width/4;
	choice.x = canvas.width/2;
	choice.y = canvas.height;
	choice.color = "#1d1d1d";


//State 1 && 2 (Adjusted IN 2 for 2)
platform0 = new GameObject();
		platform0.width = canvas.width;
		platform0.height = 300;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#1d1d1d";
	
	platform1 = new GameObject();
		platform1.width = 15;
		platform1.height = 300;
		platform1.x = 0;
		platform1.y = canvas.height - platform0.height/2;
		platform1.color = "#ffffff";
	
	platform2 = new GameObject();
		platform2.width = canvas.width/2;
		platform2.height = platform0.height;
		platform2.x = platform0.width/2;
		platform2.y = canvas.height - platform0.height/2;
		platform2.color = "#494949";
	
	platform3 = new GameObject();
		platform3.width = canvas.width/9;
		platform3.height = platform0.height;
		platform3.x = platform0.width/2;
		platform3.y = canvas.height - platform0.height/2;
		platform3.color = "#6b6b6b";

	
	shield = new GameObject();
		shield.width = 30;
		shield.height = 5;
		shield.x = player.x;
		shield.y = player.y - 20
		shield.color = "#2bcdffff";

	gun = new GameObject()
		gun.x = 200;
		gun.y = 200;
		gun.width = 25;
		gun.color = "orange";
	gun2 = new GameObject()
		gun2.x = 500;
		gun2.y = 700;
		gun2.width = 25;
		gun2.color = "orange";
	gun3 = new GameObject()
		gun3.x = 700;
		gun3.y = 200;
		gun3.width = 25;
		gun3.color = "orange";

	tempBullet = new GameObject();
		tempBullet.width = 10;
		tempBullet.height = 10;
		tempBullet.x = canvas.width/2;
		tempBullet.y = 10;
		tempBullet.vy = 5;
		tempBullet.vx = 0;
		tempBullet.color = "rgb(255, 227, 67)";
	tempBullet2 = new GameObject();
		tempBullet2.width = 10;
		tempBullet2.height = 10;
		tempBullet2.x = gun2.x;
		tempBullet2.y = gun2.y;
		tempBullet2.vx = Math.cos(gun.angle * Math.PI/180) * 5;
		tempBullet2.vy = Math.sin(gun.angle * Math.PI/180) * 5;
		tempBullet2.color = "rgb(255, 227, 67)";
	tempBullet3 = new GameObject();
		tempBullet3.width = 10;
		tempBullet3.height = 10;
		tempBullet3.x = gun3.x;
		tempBullet3.y = gun3.y;
		tempBullet3.vx = Math.cos(gun.angle * Math.PI/180) * 5;
		tempBullet3.vy = Math.sin(gun.angle * Math.PI/180) * 5;
		tempBullet3.color = "rgb(255, 227, 67)";

	canvasTrigger = new GameObject({width:canvas.width, height:canvas.height});

states[0] = function()
{

	choice.color = "#313131";
	player.color = "#6b6b6b";
	context.font = "20px Georgia";
	context.fillStyle = "#ffffff"
	context.fillText("Health: " + playerHealth, 450, 660);
	
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

	context.fillText("ACT", 480, 740);
	context.fillText("HEAL", 800, 740);
	context.fillText("FIGHT", 130, 740);
}
states[1] = function()
{

	
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
	context.fillText("Health: " + playerHealth, 450, 370);
	context.fillText("Read Enemy Stats", platform0.x/1.5, platform0.y);
	context.fillText("Increase Dodge", platform1.x/1.1, platform1.y);
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

	setTimeout(inputWait, 200);


	if(backspace)
	{
		changeToPlayer();
		currentState = 0;
	}

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

	context.font = "20px Georgia";
	context.fillStyle = "#FFFFFF"
	context.fillText("Health: " + playerHealth, 450, 370);

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
	context.font = "20px Georgia";
	context.fillStyle = "#FFFFFF"
	//End of this would remove buffs/debuffs. Obviously cant yet... as theres no fight to alter!
	if(!fightStarted)
	{
		fightStarted = true;
		setTimeout(changeToPlayer, timeFight);
	}

	if(tempBossHealth <= 0 || playerHealth <= 0)
	{
		console.log("Wuhoh");
		currentState = 7;
	}

	if(fightOption >= 0 && fightOption < 1)
	{

		changeColorBack();

		if(tempBullet.hitTestObject(player))
		{
			if(!playerImmunity)
			{
				playerHealth = playerHealth - bossDamage;
				playerImmunity = true;
				console.log(playerHealth);

				setTimeout(playerImmune, 500);
				hit = true;
				if(hit)
				{
					player.color = "#2b2a2a";
					setTimeout(changeColorBack, 500);
					hit = false;
					console.log("IT SHOULD CHANGE COLORS DAMMIT");
				}
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
				hit = true;
				if(hit)
				{
					player.color = "#2b2a2a";
					setTimeout(changeColorBack, 500);
					hit = false;
					console.log("IT SHOULD CHANGE COLORS DAMMIT");
				}
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
				player.x = player.x - dodge;
				player.y = player.y - dodge;
			}
			else if (w && d)
			{
				player.x = player.x + dodge;
				player.y = player.y - dodge;
			}
			else if (s && a)
			{
				player.x = player.x - dodge;
				player.y = player.y + dodge;
			}
			else if (s && d)
			{
				player.x = player.x + dodge;
				player.y = player.y + dodge;
			}
			else if(w)
			{
				player.y = player.y - dodge * 2;
			}
			else if(s)
			{
				player.y = player.y + dodge * 2;
			}
			else if(d)
			{
				player.x = player.x + dodge * 2;
			}
			else if(a)
			{
				player.x = player.x - dodge * 2;
			}
			
		}

			//Friction and acceleration and pixel lock
		player.vx *= frictionX;
		player.x += player.vx;

		player.vy *= frictionY;
		player.y += player.vy;

		player.y += Math.round(player.vy);
		player.x += Math.round(player.vx);

		player.drawRect();
	}
	else if(fightOption >= 1 && fightOption < 2)
	{
		changeColorBack();

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
				hit = true;
				if(hit)
				{
					player.color = "#2b2a2a";
					setTimeout(changeColorBack, 100);
					hit = false;
					console.log("IT SHOULD CHANGE COLORS DAMMIT");
				}
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
	else if(fightOption >= 2 && fightOption <= 3)
	{

		changeColorBack();
		point(player, gun);
		point(player, gun2);
		point(player, gun3);

		tempBullet.move();
		tempBullet2.move();
		tempBullet3.move();

		gun.drawTriangle();
		gun2.drawTriangle();
		gun3.drawTriangle();

		tempBullet.drawCircle();
		tempBullet2.drawCircle();
		tempBullet3.drawCircle();
	
		if(tempBullet.hitTestObject(player))
		{
			if(!playerImmunity)
			{
				hit = true;
				if(hit)
				{
					player.color = "#2b2a2a";
					setTimeout(changeColorBack, 300);
					hit = false;
					console.log("IT SHOULD CHANGE COLORS DAMMIT");
				}
				playerHealth = playerHealth - bossDamage;
				playerImmunity = true;
				tempBullet.x = gun.x;
				tempBullet.y = gun.y;
				console.log(playerHealth);

				setTimeout(playerImmune, 300);
			}
		}
		if(tempBullet2.hitTestObject(player))
		{
			if(!playerImmunity)
			{
				hit = true;
				if(hit)
				{
					player.color = "#2b2a2a";
					setTimeout(changeColorBack, 300);
					hit = false;
					console.log("IT SHOULD CHANGE COLORS DAMMIT");
				}
				playerHealth = playerHealth - bossDamage;
				playerImmunity = true;
				tempBullet2.x = gun2.x;
				tempBullet2.y = gun2.y;
				console.log(playerHealth);

				setTimeout(playerImmune, 300);
			}
		}
		if(tempBullet3.hitTestObject(player))
		{
			if(!playerImmunity)
			{
				hit = true;
				if(hit)
				{
					player.color = "#2b2a2a";
					setTimeout(changeColorBack, 300);
					hit = false;
					console.log("IT SHOULD CHANGE COLORS DAMMIT");
				}
				playerHealth = playerHealth - bossDamage;
				playerImmunity = true;
				tempBullet3.x = gun3.x;
				tempBullet3.y = gun3.y;
				console.log(playerHealth);

				setTimeout(playerImmune, 300);
			}
		}

		
		if(tempBullet.hitTestObject(canvasTrigger) == false)
		{
			tempBullet.x = gun.x;
			tempBullet.y = gun.y;
		}
		if(tempBullet.x == gun.x && tempBullet.y == gun.y)
		{
			tempBullet.vx = Math.cos(gun.angle * Math.PI/180) * 15;
			tempBullet.vy = Math.sin(gun.angle * Math.PI/180) * 15;
		}

		if(tempBullet2.hitTestObject(canvasTrigger) == false)
		{
			tempBullet2.x = gun2.x;
			tempBullet2.y = gun2.y;
		}
		if(tempBullet2.x == gun2.x && tempBullet2.y == gun2.y)
		{
			tempBullet2.vx = Math.cos(gun2.angle * Math.PI/180) * 15;
			tempBullet2.vy = Math.sin(gun2.angle * Math.PI/180) * 15;
		}

		if(tempBullet3.hitTestObject(canvasTrigger) == false)
		{
			tempBullet3.x = gun3.x;
			tempBullet3.y = gun3.y;
		}
		if(tempBullet3.x == gun3.x && tempBullet3.y == gun3.y)
		{
			tempBullet3.vx = Math.cos(gun3.angle * Math.PI/180) * 15;
			tempBullet3.vy = Math.sin(gun3.angle * Math.PI/180) * 15;
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
				player.x = player.x - dodge;
				player.y = player.y - dodge;
			}
			else if (w && d)
			{
				player.x = player.x + dodge;
				player.y = player.y - dodge;
			}
			else if (s && a)
			{
				player.x = player.x - dodge;
				player.y = player.y + dodge;
			}
			else if (s && d)
			{
				player.x = player.x + dodge;
				player.y = player.y + dodge;
			}
			else if(w)
			{
				player.y = player.y - dodge * 2;
			}
			else if(s)
			{
				player.y = player.y + dodge * 2;
			}
			else if(d)
			{
				player.x = player.x + dodge * 2;
			}
			else if(a)
			{
				player.x = player.x - dodge * 2;
			}
			
		}

			//Friction and acceleration and pixel lock
		player.vx *= frictionX;
		player.x += player.vx;

		player.vy *= frictionY;
		player.y += player.vy;

		player.y += Math.round(player.vy);
		player.x += Math.round(player.vx);
		player.drawRect();
			//idle things shoot you
	}
		else
		{
				console.log("...How'd you get here...");
		}

		context.font = "20px Georgia";
		context.fillText("Health: " + playerHealth, 50, 50);
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
		context.fillText("Enemy Health: " + tempBossHealth, 50, 450);
		context.fillText("Enemy Damage: " + bossDamage, 50, 470);
		context.fillText("A terrifying placeholder boss!!!", 50, 500);
	}
	if(actChoice == 2)
	{
		console.log("player has dodge buff");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Dodge buffed", 50, 450);

		dodge = 16;
	}
	if(actChoice == 3)
	{
		console.log("enemy deals less damage");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Enemy deals less damage", 50, 450);

		bossDamage = 5;
	}
	if(actChoice == 4)
	{
		console.log("enemy attacks are slower!");
		context.font = "20px Georgia";
		context.fillStyle = "#FFFFFF"
		context.fillText("Enemy attacks slowed", 50, 450);
		bossSpeedDebuff = true;
	}

	if(!actingUp)
	{
		setTimeout(changeToFight, 3000);
		actingUp = true;
	}
}
	//healing outputs
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
	if(!actingUp)
	{
		setTimeout(changeToFight, 3000);
		actingUp = true;
	}
	
}
	//win/lose screen
states[7] = function()
{
	context.fillStyle = "#ffffff"

	if(tempBossHealth <= 0)
	{
		context.font = "20px Georgia";
		context.fillText("You won! Reload to try again!", 360, 200);
	}

	if(playerHealth <= 0)
	{
		context.font = "20px Georgia";
		context.fillText("You lost... Reload to try again!", 360, 200);
	}
}
states[8] = function()
{
	context.fillStyle = "#ffffff"
	context.font = "20px Georgia";
	context.fillText("Game Prototype", 420, 200);
	context.fillText("Click 'e' for more information!", 360, 240);
	context.fillText("When ready, click the orange square to start.", 300, 280);

	if(keye)
	{
		currentState = 9;
	}
	square.drawRect();
}
states[9] = function()
{
	context.fillStyle = "#ffffff"
	context.font = "20px Georgia";
	context.fillText("Controls: ", 70, 100);
	context.fillText("- Press 'enter' to select a choice", 100, 140);
	context.fillText("- Press 'space' to time your attack", 100, 170);
	context.fillText("- Use WASD to move your player or shield.", 100, 200);
	context.fillText("- Press 'e' to dodge.", 100, 230);

	context.fillText("Gameplay: ", 70, 400);
	context.fillText("- Defeat the boss and win! Utitlise quick reaction times to both do damage and survive!", 100, 440);
	context.fillText("- You are equipt with a limited healing supply to support yourself, use these carefully!", 100, 470);
	context.fillText("- At the cost of a turn, you can give yourself a buff, debuff the enemy,", 100, 500);
	context.fillText("or check on the enemy's current status.", 100, 530);
	context.fillText("- Careful! The boss can use upwards of 3 different attacks! Any could be next!", 100, 560);

	context.fillText("If you're done reading. Hit 'backspace' to return to the main menu.", 100, 700);

	if(backspace)
	{
		currentState = 8;
	}

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
			bullets[i].width = 10;
			if(!bossSpeedDebuff)
			{
				bullets[i].vy = rand(6,15);
			}
			else
			{
				bullets[i].vy = rand(4,8);
			}
			//dots[i].vx = rand(-10,10);
			bullets[i].color = "rgb(255, 227, 67)";
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
	else if(fightOption >= 2 && fightOption <= 3)
	{
		player.width = 20;
		player.height = 20;
		player.x = canvas.width/2;
		player.y = canvas.height/2;

		gun.angle = 40;
		tempBullet.x = gun.x;
		tempBullet.y = gun.y;
		tempBullet.vx = Math.cos(gun.angle * Math.PI/180) * 5;
		tempBullet.vy = Math.sin(gun.angle * Math.PI/180) * 5;

		gun2.angle = -90;
		tempBullet2.x = gun2.x;
		tempBullet2.y = gun2.y;
		tempBullet2.vx = Math.cos(gun2.angle * Math.PI/180) * 5;
		tempBullet2.vy = Math.sin(gun2.angle * Math.PI/180) * 5;
	
		gun3.angle = 140;
		tempBullet3.x = gun3.x;
		tempBullet3.y = gun3.y;
		tempBullet3.vx = Math.cos(gun3.angle * Math.PI/180) * 5;
		tempBullet3.vy = Math.sin(gun3.angle * Math.PI/180) * 5;
	}
}

fixTheAttack = function()
{
	platform1.vx = maxSpeed;
	platform0.width = canvas.width;
		platform0.height = 300;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#313131";
	platform1.width = 15;
		platform1.height = 300;
		platform1.x = 0;
		platform1.y = canvas.height - platform0.height/2;
		platform1.color = "#ffffff";
	platform2.width = canvas.width/2;
		platform2.height = platform0.height;
		platform2.x = platform0.width/2;
		platform2.y = canvas.height - platform0.height/2;
		platform2.color = "#494949";
	platform3.width = canvas.width/9;
		platform3.height = platform0.height;
		platform3.x = platform0.width/2;
		platform3.y = canvas.height - platform0.height/2;
		platform3.color = "#6b6b6b";

		context.fillStyle = "#000000"
}
moveValid = function()
{
	waitToMove = false;
}
changeToFight = function()
{
	actingUp = false;
	platform1.vx = maxSpeed;
	actionUsed = false;
	canHeal = true;
	fightOption = rand(0, 3);
	adjustPerAttack();

	platform0.width = canvas.width;
		platform0.height = 300;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#313131";
	platform1.width = 15;
		platform1.height = 300;
		platform1.x = 0;
		platform1.y = canvas.height - platform0.height/2;
		platform1.color = "#ffffff";
	platform2.width = canvas.width/2;
		platform2.height = platform0.height;
		platform2.x = platform0.width/2;
		platform2.y = canvas.height - platform0.height/2;
		platform2.color = "#494949";
	platform3.width = canvas.width/9;
		platform3.height = platform0.height;
		platform3.x = platform0.width/2;
		platform3.y = canvas.height - platform0.height/2;
		platform3.color = "#6b6b6b";

		context.fillStyle = "#ffffff"

	currentState = 4;
}
changeToPlayer = function()
{
	player.width = canvas.width/3;
	player.height = canvas.width/4;
	player.x = canvas.width/2;
	player.y = canvas.height;
	player.color = "#6b6b6b";

	choice.width = canvas.width;
	choice.height = canvas.width/4;
	choice.x = canvas.width/2;
	choice.y = canvas.height;
	choice.color = "#313131";
	fightStarted = false;
	currentState = 0;

	bossSpeedDebuff = false;
	bossDamage = 10;
	dodge = 10;
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

function point(pl, g)
{
	var dx = pl.x - g.x;
	var dy = pl.y - g.y;
	
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	g.angle = radians * 180/Math.PI;
}

function startGame()
{
	var dx = square.x - mouse.x;
	var dy = square.y - mouse.y;
	var dist = Math.sqrt(dx*dx + dy * dy);
	if(dist < square.radius())
	{
		currentState = 0;
	}
}
function track(e)
{
	var rect = canvas.getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
}

function changeColorBack()
{
	player.color = "#FFFFFF";
}