"use strict"

// This is used because requestAnimationFrame has not been standardized.
// requestAnimationFrame is more efficient than setTimeout
window.requestAnimationFrame = 
	window.requetAnimationFrame 
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| function (callback)
	{
		window.setTimeout(callback, 1000/60);
	};