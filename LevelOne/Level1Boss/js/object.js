function Object()
{
	//object location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	//object dimensions
	this.width = 100;
	this.height = 100;
	
	//object velocity or speed on each axis
	this.vx = 0;
	this.vy = 0;
	
	//object color
	this.color = "#c337dfff";
	this.image = "test";
	
	//draws the object to the screen
	this.draw = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.beginPath();
            context.arc(0, 0, this.width/2, 0, 2 * Math.PI);
            context.closePath();
			context.fill();
		context.restore();
		
	}	
	
	//changes the object position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
}