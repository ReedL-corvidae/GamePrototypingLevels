var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;
var player1;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

    var player1 = new GameObject(canvas.width - 1000, canvas.height/2, 10, 150,"#00ff00");	
    var player2 = new GameObject(canvas.width - 25, canvas.height/2, 10, 150,"#ff00f2");	
	var ball = new GameObject();
	
	//Declare the ball's speed on the x and y axis
	ball.vx = -5;
	ball.vy = 0;

	var player1PrevY;
	var player2PrevY;

	timer = setInterval(animate, interval);

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Movement using ball's move() function
	ball.move();
	
	//Player 1 ball collision
	if(ball.hitTestObject(player1))
	{
		if(ball.y < player1.y - player1.height/6)
		{
			ball.vx = 5;
			ball.vy = -5;
		}
		else if (ball.y < player1.y + player1.height/6)
		{
			ball.vx = 5;
			ball.vy = 0;
		}
		else
		{
			ball.vx = 5;
			ball.vy = 5;
		}
	}
	//Player 2 ball collision
		if(ball.hitTestObject(player2))
	{
		if(ball.y < player2.y - player2.height/6)
		{
			ball.vx = -5;
			ball.vy = -5;
		}
		else if (ball.y < player2.y + player2.height/6)
		{
			ball.vx = -5;
			ball.vy = 0;
		}
		else
		{
			ball.vx = -5;
			ball.vy = 5;
		}
	}

	//Bouncing the ball. Its ready.
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;	
	}

	if(ball.x < ball.width/2){
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
	}

	if(ball.y > canvas.height - ball.height/2)
	{
		ball.vy = -ball.vy;	
	}

	if(ball.y < ball.height/2){
		ball.vy *= -1;
	}

	//Moves player 1 up and down
	if(w)
	{
		console.log("Moving Up");
		player1.y += -5;
	}
	if(s)
	{
		console.log("Moving Down");
		player1.y += 5;
	}

	//moves player 2 up and down
	if(arrowUp)
	{
		console.log("Moving Up");
		player2.y += -5;
	}
	if(arrowDown)
	{
		console.log("Moving Down");
		player2.y += 5;
	}

	//Prevents player 1 from leaving the screen
	if((player1.y > canvas.height - player1.height/2) || (player1.y < player1.height/2))
	{
		player1.y = player1PrevY;	
	}
	else
	{
		player1PrevY = player1.y
	}
	
	//Prevents player 2 from leaving the screen
	if((player2.y > canvas.height - player2.height/2) || (player2.y < player2.height/2))
	{
		player2.y = player2PrevY;	
	}
	else
	{
		player2PrevY = player2.y
	}

    player1.drawRect();
	player2.drawRect();
	ball.drawCircle();
}