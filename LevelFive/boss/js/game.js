
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var waitToSwitch = false;

//------------Use this if you want to implement States---------------
var currentState = 0;
var states = [];

states[0] = function()
{
	
	

	if(t && !waitToSwitch)
	{
		console.log("state 0 changing");
		waitToSwitch = true;
		currentState = 1;

		setTimeout(switchValid, 500);
	}
}

states[1] = function()
{
	


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
	context.fillText("Press 't' to swap states", 430, 50);
	context.fillText(currentState, 525, 70);

	states[currentState]();
}



