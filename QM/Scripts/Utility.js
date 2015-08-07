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

function Debug(arg)
{
	console.log(arg);
}

// Simple helper function to load an image from a given path and return it
function LoadImage(path)
{
	if(path != null && path != undefined)
	{
		var img = new Image();
		img.src = path;
		return img;
	}
};