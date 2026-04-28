//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var maxSpeed = 5.5;
var tempBossHealth = 1000;
var actionUsed = false;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

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

	

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	//platform1.vx = maxSpeed;

	platform1.x += Math.round(platform1.vx) * maxSpeed;


	platform1.move();


		//Player times hits. Only hits ONCE. Function for turns would be added later to allow for later turns again.
	if(platform1.hitTestObject(platform0) && space == true && !actionUsed)
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


