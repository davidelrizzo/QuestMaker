"use strict"

var gh = (function(gh){

	console.log("wall.js loaded");

	/**
	 * Description
	 * @method Wall
	 * @param {} side1
	 * @param {} x1
	 * @param {} y1
	 * @param {} side2
	 * @param {} x2
	 * @param {} y2
	 * @return 
	 */
	function Wall(side1, x1, y1, side2, x2, y2){
		this.id         = "wall";
		this[side1]     = {"x" : x1, "y" : y1};
		this[side2]     = {"x" : x2, "y" : y2};

		if(this[side1].x > this[side2].x){
			this.side = "left";
		}

		if(this[side1].y > this[side2].y){
			this.side = "top";
		}
	}

	/**
	 *  INPUT
	 *        context: the context upon which to draw
	 *        x, y:    the x and y pixel coordinates of the cell
	 *        scale:   the scale at which to draw the walls
	 *        sprites: a list of sprites loaded into memory.  Not used by Wall at
	 *                 this juncture.
	 * @method draw
	 * @param {} context
	 * @param {} x
	 * @param {} y
	 * @param {} size
	 * @param {} scale
	 * @param {} sprites
	 * @param {} side
	 * @return 
	 */
	Wall.prototype.draw = function(context, x, y, size, scale, sprites, side){
		context.save();

		context.strokeStyle = "white";
		context.lineWidth = 6 * scale;

		switch(side){
			case "top":
				context.beginPath();
			 	context.moveTo(x, y);
				context.lineTo(x+(size*scale), y);
				break;
			case "left":
				context.beginPath();
			 	context.moveTo(x, y);
				context.lineTo(x, y+(size*scale));
				break;
			case "right":
				context.beginPath();
				context.moveTo(x+(size*scale), y);
				context.lineTo(x+(size*scale), y+(size*scale));
				break;
			case "bottom":
				context.beginPath();
				context.moveTo(x, y+(size*scale));
				context.lineTo(x+(size*scale), y + (size * scale));
				break;
			default:
				break;
		}

		context.stroke();

		context.restore();
	}

	gh.Wall = Wall;

	return gh;
})(gh || {});