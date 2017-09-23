# streak-rain

> A streak rain on the backgroud of website. 

![travis-ci](https://travis-ci.org/zhusaidong/streak-rain.svg?branch=master) 
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## usage

```html
<script src="./dist/streak-rain-min.js"></script>
<script>
	new StreakRain({
		speed	:60,
		length	:10,
		number	:60,
		fgColor	:'#ee0000',
		bgColor	:'#ffffff',
	}).run();
</script>
```

then ok!

## config

 - **`speed`**: the rain falling speed. default: `'60'` ;
 - **`length`**: the rain length. default: `'10'` ;
 - **`number`**: the rain number. default: `'60'` ;
 - **`fgColor`**: the foreground color. default: `'#ee0000'` ;
 - **`bgColor`**: the background color. default: `'#ffffff'` ;

## preview

[http://github.zhusaidong.cn/streak-rain/](http://github.zhusaidong.cn/streak-rain/)
