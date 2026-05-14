var w = false;
var a = false;
var s = false;
var d = false;

var arrowRight = false;
var arrowLeft = false;
var arrowUp = false;
var arrowDown = false;
var enter = false;
var space = false;
var backspace = false;
var keye = false;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

function press(e)
{
	//---This logs key codes into the browser's console.
	console.log(e.keyCode);
	
	if(e.keyCode == 87)
	{
		w = true;
	}
	if(e.keyCode == 65)
	{
		a = true;
	}
	if(e.keyCode == 83)
	{
		s = true;
	}
	if(e.keyCode == 68)
	{
		d = true;
	}
	if(e.keyCode == 39)
	{
		arrowRight = true;
	}
	if(e.keyCode == 37)
	{
		arrowLeft = true;
	}
	if(e.keyCode == 38)
	{
		arrowUp = true;
	}
	if(e.keyCode == 40)
	{
		arrowDown = true;
	}
	if(e.keyCode == 13)
	{
		enter = true;
	}
	if(e.keyCode == 32)
	{
		space = true;
	}
	if(e.keyCode == 8)
	{
		backspace = true;
	}
	if(e.keyCode == 69)
	{
		keye = true;
	}
}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log(e.keyCode);
	
	if(e.keyCode == 87)
	{
		w = false;
	}
	if(e.keyCode == 65)
	{
		a = false;
	}
	if(e.keyCode == 83)
	{
		s = false;
	}
	if(e.keyCode == 68)
	{
		d = false;
	}
	if(e.keyCode == 39)
	{
		arrowRight = false;
	}
	if(e.keyCode == 37)
	{
		arrowLeft = false;
	}
	if(e.keyCode == 38)
	{
		arrowUp = false;
	}
	if(e.keyCode == 40)
	{
		arrowDown = false;
	}
	if(e.keyCode == 13)
	{
		enter = false;
	}
	if(e.keyCode == 32)
	{
		space = false;
	}
	if(e.keyCode == 8)
	{
		backspace = false;
	}
	if(e.keyCode == 69)
	{
		keye = false;
	}
}
