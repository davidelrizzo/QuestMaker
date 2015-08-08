//=====================================================================================
// File: Canvas2D.js
// Desc: This file contains the Canvas2D class which can be instantiated for any canvas
//       element.  The class provides utility functions for manipulating the canvas.
//=====================================================================================

"use strict"

var QM = (function(QM){
	function Canvas2D()
	{
		this.canvas = undefined;
		this.context = undefined;
	};

	Canvas2D.prototype.initialize = function(canvasName, mousemove, mousedown, mouseup)
	{
		this.canvas = document.getElementById(canvasName);
		this.context = this.canvas.getContext("2d");

		this.canvas.addEventListener("mousemove", mousemove, false);
		this.canvas.addEventListener("mousedown", mousedown, false);
		this.canvas.addEventListener("mouseup", mouseup, false);
	};

	Canvas2D.prototype.drawImage = function(sprite, position, rotation, offset, scale)
	{
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
	}

	Canvas2D.prototype.clearCanvas = function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	QM.Canvas2D = new Canvas2D();  // Canvas is global to the Namespace here.

	return QM;
})(QM || {});