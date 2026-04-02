function GameObject()
{
	//object location

    this.rectY = 300;

	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	//object dimensions
	this.width = 100;
	this.height = 100;
	
	//object velocity or speed on each axis
	this.vx = 0;
	this.vy = 0;
	
	//object color
	this.rectColor = "#c337dfff";
    this.circleColor = "#1fcf19ff";
	
	//draws the object to the screen
	this.drawCircle = function()
	{
		context.save();
			context.fillStyle = this.circleColor;
			context.translate(this.x, this.y);
			context.beginPath();
            context.arc(0, 0, this.width/2, 0, 2 * Math.PI);
            context.closePath();
			context.fill();
		context.restore();
		
	}	

    this.drawRect = function()
    {
        context.fillStyle = this.rectColor;
        context.fillRect(75, this.rectY, 20, 100);
    }
	
	//changes the object position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
}