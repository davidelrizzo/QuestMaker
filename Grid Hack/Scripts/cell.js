/**
 *	REQUIRES:
 *		sprite.js
 *
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("cell.js loaded");

	/**
	 * @class Cell
	 * @constructor
	 * @param {Integer} x The x-coordinate of a cell.
	 * @param {Integer} y The y-coordinate of a cell.
	 * @param {String} path The path of the cell image.
	 * @param {Sprite} img The sprite reperasentative of the cell.
	 * @param {Object} borders The borders of the cell.
	 * @param {Integer} size The pixel size of the cell.
	 */
	function Cell(x, y, path, img, borders, size, walkable){
		this.x 				= x;
		this.y 				= y;
		this.sprites        = img;
		this.borders	    = borders;
		this.size           = size;
		this.visible        = undefined;
		this.walkable 		= walkable;
	}

	/**
	 * @method draw
	 */
	Cell.prototype.draw = function(context, x, y, scale, sprites){
		context.save();
 		if(this.sprites !== undefined){
 			sprites[this.sprites].draw(context, x, y, this.size * scale, this.size*scale);
 		}

 		if(this.borders !== undefined){
 			if(this.borders.top !== undefined){
 				this.borders.top.draw(context, x, y, this.size, scale, sprites, "top");
 			}

 			if(this.borders.left !== undefined){
 				this.borders.left.draw(context, x, y, this.size, scale, sprites, "left");
 			}

 			if(this.borders.right !== undefined){
 				this.borders.right.draw(context, x, y, this.size, scale, sprites, "right");
 			}

 			if(this.borders.bottom !== undefined){
 				this.borders.bottom.draw(context, x, y, this.size, scale, sprites, "bottom");
 			}
 		}

		context.restore();
	};

	/**
	 * @method getDoors
	 */
	Cell.prototype.getDoors = function(){
        var doors = [];

        for(var key in this.borders){
        	if(this.borders[key].constructor === gh.Door){
	        	doors.push(this.borders[key]);
        	} 
        }

        return doors;
	};

	/**
	 * This function returns true if the cell is a walkable 'floor'.
	 * This function returns false if the cell is not a walkable 'floor'.
	 *
	 * @method isFloor
	 */
	Cell.prototype.isFloor = function(){
		console.log(this);
		if(this.walkable){
			return true;
		}

		return false;
	}

	/**
	 * This method determines whether or not the border of a cell is 'blocked'.  A wall, closed door or closed secret-door all qualify as blocking objects.  Open doors and open secret doors do not qualify as blocking objects.
	 *
	 * @method isBorderBlocked
	 * @param {String} side The border of the cell which should be checked.
	 * @return {bool} true if the border is blocked or false if the border is not blocked.
	 */
	Cell.prototype.isBorderBlocked = function(side){
		if(!this.borders){
			return false;
		}

		if(!this.borders[side]){
			return false;
		}

		if(this.borders[side] instanceof gh.Wall){
			return true;
		}

		if(this.borders[side] instanceof gh.Door){
			if(this.borders[side].open){
				return false;
			} else {
				return true;
			}
		}

		return false;
	}

	gh.Cell = Cell;
	return gh;
})(gh || {});