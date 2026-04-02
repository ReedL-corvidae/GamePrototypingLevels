var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;
var player1;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

    var player1 = new GameObject();	
    var ball = new GameObject();
	
	//Declare the ball's speed on the x and y axis
	ball.vx = -10;
	ball.vy = 10;w

	timer = setInterval(animate, interval);

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Movement using ball's move() function
	ball.move();
	
	
	//Bouncing the ball. Its ready.
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.vx = -ball.vx;	
	}

	if(ball.x < ball.width/2){
		ball.vx *= -1;
	}

	if(ball.y > canvas.height - ball.height/2)
	{
		ball.vy = -ball.vy;	
	}

	if(ball.y < ball.height/2){
		ball.vy *= -1;
	}

	//Moves player up and down
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

    player1.drawRect();
}