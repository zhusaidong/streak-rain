/*
StreakRain
*/

function StreakRain(config)
{
	this._constructor = function(config)
	{
		//雨滴下落距离(速度)
		this.rainDownSpeed = (config.speed || 60) / 60;
		//雨滴长度
		this.rainLength = config.length || 10;
		//雨滴数量
		this.rainNumber = (config.number || 60) / 60;
		//颜色
		this.fgColor = config.fgColor || '#ffffff';
		this.bgColor = config.bgColor || '#000000';
		
		//TODO 风力
		this.windPower = 0;
		//透明度
		this.cOpacity = 0.5;
		
		this.rains = new Array;
		
		this.init();
		this.randomRain();
		this.windowResize();
		if(this.windPower != 0)
		{
			this.mousePosition();
		}
	}
	//init
	this.init = function()
	{
		//create canvas
		this.canvas = document.createElement('canvas');
		this.canvas.id = new Date().getTime();
		this.canvas.textContent = 'you brower not support canvas';
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.style['background-color'] = this.bgColor;

		document.body.appendChild(this.canvas);
		document.body.style.margin = 0;
		document.body.style.padding = 0;

		this.ctx = this.canvas.getContext("2d");
		this.ctx.globalAlpha = this.cOpacity;
		this.ctx.fillStyle 	 = this.fgColor;
		this.ctx.strokeStyle = this.fgColor;
	}
	//get random rain
	this.randomRain = function()
	{
		//风向
		var wind = this.windPower / Math.abs(this.windPower);
		var average = Math.floor(this.canvas.width * (this.windPower != 0 ?  2 : 1) / this.rainNumber);
		for(var i = 0; i < this.rainNumber; i++)
		{
			//雨滴长度
			var rainLength = this.getRandom(3 * this.rainLength,8 * this.rainLength);
			//雨滴位置范围
			var rainPosition_x = average * i;
			var rainPosition_y = average * (i + 1);
			//风向向左，坐标系向左移一个窗口的宽度
			if(wind < 0)
			{
				rainPosition_x -= this.canvas.width;
				rainPosition_y -= this.canvas.width;
			}
			var rainPosition = this.getRandom(rainPosition_x,rainPosition_y);
			this.rains.push(new rainObject(rainPosition,rainLength,this.windPower));
		}
	}
	//run
	this.run = function()
	{
		if(!window.requestAnimationFrame)
		{
			window.requestAnimationFrame = (
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.msRquestAniamtionFrame ||
				window.oRequestAnimationFrame ||
				function (callback)
				{
					return setTimeout(callback,Math.floor(1000/60))
				}
			);
		}
		window.requestAnimationFrame(this.run.bind(this));

		//画线
		this.clearScreen();
		for(var i in this.rains)
		{
			this.line(this.rains[i].rain.start,this.rains[i].rain.end);
		}
		//run
		var needDeleteRain = [];
		for(var i in this.rains)
		{
			//雨滴下落距离(速度)
			var rainDownSpeed = this.getRandom(1 * this.rainDownSpeed,10 * this.rainDownSpeed);
			for(var _i in this.rains[i].rain)
			{
				this.rains[i].rain[_i].x += this.windPower;
				this.rains[i].rain[_i].y += rainDownSpeed;
			}
			//超出屏幕删除
			if(this.rains[i].rain.start.y > this.canvas.height)
			{
				needDeleteRain.push(i);
			}
		}
		this.deleteRain(needDeleteRain);
		needDeleteRain = [];
		
		this.randomRain(this.rainNumber);
	}
	//delete the overflowed rain 
	this.deleteRain = function(needDeleteRain)
	{
		var r = new Array;
		for(var i in this.rains)
		{
			if(!needDeleteRain.includes(i))
			{
				r.push(this.rains[i]);
			}
		}
		this.rains = r;
	}
	//window resize event
	this.windowResize = function()
	{
		var that = this;
		window.onresize = function()
		{
			that.canvas.width = window.innerWidth;
			that.canvas.height = window.innerHeight;
		};
	}
	//mouse move event
	this.mousePosition = function()
	{
		var windPower = this.windPower;
		var that = this;
		this.canvas.addEventListener('mousemove',function(event)
			{
				var middle = Math.floor(that.canvas.width / 2);
				var x = event.clientX;
				var avg = Math.floor(middle / 2 / 5);
				var n = Math.floor((x - middle) / avg);
				that.windPower = windPower * n;
			},false);
	}
	//get random number
	this.getRandom = function(minRandom,maxRandom)
	{
		return Math.floor(Math.random() * (maxRandom - minRandom + 1) + minRandom);
	}
	//draw line with two points
	this.line = function(startPoint,endPoint)
	{
		this.ctx.beginPath();
		this.ctx.moveTo(startPoint.x,startPoint.y);
		this.ctx.lineTo(endPoint.x,endPoint.y);
		this.ctx.strokeStyle = this.fgColor;
		this.ctx.stroke();
		this.ctx.closePath();
	}
	//clear the screen
	this.clearScreen = function()
	{
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.globalAlpha = this.cOpacity;
	}
	this._constructor(config);
}
