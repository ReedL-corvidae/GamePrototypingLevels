var w = false;
var a = false;
var s = false;
var d = false;
var t = false;
var q = false;
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
	if(e.keyCode == 69)
	{
		keye = true;
	}
	if(e.keyCode == 81)
	{
		q = true;
	}
	if(e.keyCode == 84)
	{
		t = true;
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
	if(e.keyCode == 69)
	{
		keye = false;
	}
	if(e.keyCode == 81)
	{
		q = false;
	}
	if(e.keyCode == 84)
	{
		t = false;
	}
}
