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

function getAJAX(path){
	console.log("getAJAX");

    var request = new XMLHttpRequest();
    // "http://localhost/FileTest/text.txt"
	request.open("GET", path, false);
	request.send(null);
		
	if(request.status == 200){
	  //alert(request.responseText);
	}
	else{
	  alert("Error- " + request.status + ": " + request.statusText);
	}

	return request.responseText;
};


/**
 * FUNCTION: writeText
 * DESC: This function allows the user to write a long string to the canvas without
 * 		 it being constrained by a defined width.
 *		 Warning, at present this function does not account for a maximum height for
 *       the area in which the text should be written.  Further, it does not yet
 *       handle new line characters.  The parser appears to ignore them.
 */
function writeText(text, initx, inity, textHeight, maxwidth, context)
{
	var width = context.measureText(text);
	var textArray = text.split(" ");
	var line = "";
	var posx = initx;
	var posy = inity;

	//Debug(textArray);

	for(var n = 0; n < textArray.length; n++)
	{
		if(context.measureText(line + textArray[n]).width > maxwidth)
		{
			context.fillText(line, posx, posy);
			line = "";
			posy += 20;
		}
		else
		{
			line += " " + textArray[n];
		}
	}
};