//=====================================================================================
// File: Canvas2D.js
// Desc: This file contains the Canvas2D class which can be instantiated for any canvas
//       element.  The class provides utility functions for manipulating the canvas.
//=====================================================================================

"use strict"

var QM = (function(QM){
	function Canvas2D(){
		this.canvas = undefined;
		this.context = undefined;
	};

	Canvas2D.prototype.initialize = function(canvasName, mousemove, mousedown, mouseup){
		this.canvas = document.getElementById(canvasName);
		this.context = this.canvas.getContext("2d");

		this.canvas.addEventListener("mousemove", mousemove, false);
		this.canvas.addEventListener("mousedown", mousedown, false);
		this.canvas.addEventListener("mouseup", mouseup, false);
	};

	Canvas2D.prototype.drawImage = function(sprite, position, rotation, offset, scale){
		this.context.save();

		// Transformation information
		var offsetx = (sprite.width*scale)/2;
		var offsety = (sprite.height*scale)/2;

		this.context.translate(position.x + offsetx, position.y + offsety);
		this.context.rotate(rotation);

		// Draw the image
		this.context.drawImage(
			sprite,										// Image to be drawn
			0, 0, sprite.width, sprite.height, 			// Clipping coordinates on the sprite
			-offset.x-offsetx, -offset.y-offsety,		// Where to draw the image
			sprite.width * scale, sprite.height * scale	// Scale of the image
		);

		this.context.restore();
	};

	Canvas2D.prototype.clearCanvas = function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	/*
	 * Method: roundedRectangle
	 * Description: This method draws a rectangle with rounded corners.
	 *		This method assumes that the stroke and fill styles have already defined.
	 * To Do:
	 *		-> Option to turn fill and stroke on and off when calling the method.
	 */
	Canvas2D.prototype.roundedRectangle = function(x, y, width, height, radius){
		this.context.beginPath();
		this.context.moveTo(x+radius, y);
		this.context.lineTo((x+width)-radius, y); // top line
		this.context.arcTo((x+width), y, x+width, y+radius, radius); // top right
		this.context.lineTo(x+width, (y+height)-radius); // right line
		this.context.arcTo(x+width, (y+height), (x+width)-radius, y+height, radius); // bottom right
		this.context.lineTo(x+radius, y+height); // bottom line
		this.context.arcTo(x, y+height, x, (y+height)-radius,radius); // bottom left
		this.context.lineTo(x, y+radius); // left line
		this.context.arcTo(x, y, x+radius, y, radius); // top left corner

		this.context.fill();
		this.context.stroke();
	};

	QM.Canvas2D = new Canvas2D();
	return QM;
	
})(QM || {});