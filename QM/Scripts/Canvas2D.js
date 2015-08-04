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

	Canvas2D.prototype.initialize = function(canvasName)
	{
		this.canvas = document.getElementById(canvasName);
		this.context = this.canvas.getContext("2d");
	};

	Canvas2D.prototype.drawImage = function(sprite, position, rotation, offset, scale)
	{
		this.context.save();

		// Transformation information
		var offsetx = (sprite.width*scale)/2;
		var offsety = (sprite.height*scale)/2;

		this.context.translate(position.x + offsetx, position.y + offset);
		this.context.rotate(rotation);

		// Draw the image
		this.context.drawImage(
			sprite,										// Image to be drawn
			0, 0, sprite.width, sprite.height, 			// Clipping coordinates on the sprite
			-offset.x-offsetx, -offset.y-ofset,			// Where to draw the image
			sprite.width * scale, sprite.height * scale	// Scale of the image
			);

		this.context.restore();
	}

	Canvas2D.prototype.clearCanvas = function()
	{
		Canvas2D.context.clearRect(0, 0, Canvas2D.canvas.width, Canvas2D.canvas.height);
	}

	QM.Canvas2D = new Canvas2D();

	return QM;
})(QM || {});