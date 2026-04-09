//Define Booleans for each key
var w = false;
var s = false;
var arrowUp = false;
var arrowDown = false;

//Add Event Listeners
document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

//Event Functions
function press(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Pressed" + e.keyCode);
	if(e.keyCode == 87)
	{
		w = true;
	}
	if(e.keyCode == 83)
	{
		s = true;
	}
	if(e.keyCode == 38)
	{
		arrowUp = true;
	}
	if(e.keyCode == 40)
	{
		arrowDown = true;
	}
}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Released" + e.keyCode);
	if(e.keyCode == 87)
	{
		w = false;
	}
	if(e.keyCode == 83)
	{
		s = false;
	}
	if(e.keyCode == 38)
	{
		arrowUp = false;
	}
	if(e.keyCode == 40)
	{
		arrowDown = false;
	}
}
