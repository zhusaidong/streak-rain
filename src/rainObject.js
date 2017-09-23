/*
rain Object
*/
function rainObject(x,y,windPower)
{
	this._constructor = function(x,y,windPower)
	{
		this.x = x;
		this.y = y;
		var xdu = 150 * windPower;
		this.rain = {
			start:new point(this.x - xdu,0 - this.y),
			end	 :new point(this.x + windPower * 5 - xdu,0)
		};
		//有风向是长度减半,因为斜边太长了
		if(xdu != 0)
		{
			this.rain.end.x = this.rain.start.x + Math.floor((this.rain.start.x - this.rain.end.x) / 2)
			this.rain.end.y = this.rain.start.y + Math.floor((this.rain.start.y - this.rain.end.y) / 2)
		}
	}
	this._constructor(x,y,windPower);
}
