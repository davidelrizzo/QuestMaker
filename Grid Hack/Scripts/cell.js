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
	 * @constructor
	 * @class Cell
	 * @method Cell
	 * @param {Integer} x The x-coordinate of a cell.
	 * @param {Integer} y The y-coordinate of a cell.
	 * @param {} walkable
	 * @param {} visible
	 * @param {Object} borders The borders of the cell.
	 * @param {} items
	 * @param {} agents
	 * @param {} triggers
	 * @param {Sprite} img The sprite reperasentative of the cell.
	 * @return 
	 */
	function Cell(x, y, walkable, visible, borders, items, agents, triggers, img){
		this.x 				= x;
		this.y 				= y;
		this.walkable 		= walkable;
		this.visible        = visible;
		this.borders 		= borders;
		this.items 			= items;
		this.agents			= agents;
		this.triggers		= triggers;

		this.sprite 		= img;
	}

	/**
	 * Description
	 * @method draw
	 * @param {} context
	 * @param {} size
	 * @param {} scale
	 * @param {} offset
	 * @param {} sprites
	 * @return 
	 */
	Cell.prototype.draw = function(context, size, scale, offset, sprites){

		if(this.sprite !== undefined){
			sprites[this.sprite].draw(
				context, 
				this.x * size * scale + offset.x, 
				this.y * size * scale + offset.y, 
				size * scale, 
				size * scale);
		}

		if(this.borders !== undefined){
 			if(this.borders.top !== undefined){
 				this.borders.top.draw(
 					context, 
 					this.x * size * scale + offset.x, 
 					this.y * size * scale + offset.y, 
 					size, 
 					scale,
 					sprites, 
 					"top");
 			}

 			if(this.borders.left !== undefined){
 				this.borders.left.draw(
 					context, 
 					this.x * size * scale + offset.x, 
 					this.y * size * scale + offset.y, 
 					size, 
 					scale, 
 					sprites, 
 					"left");
 			}

 			if(this.borders.right !== undefined){
 				this.borders.right.draw(
 					context, 
 					this.x * size * scale + offset.x, 
 					this.y * size * scale + offset.y, 
 					size, 
 					scale, 
 					sprites, 
 					"right");
 			}

 			if(this.borders.bottom !== undefined){
 				this.borders.bottom.draw(
 					context, 
 					this.x * size * scale + offset.x, 
 					this.y * size * scale + offset.y, 
 					size, 
 					scale, 
 					sprites, 
 					"bottom");
 			}			
		}

		if(this.items){
			// draw the items.
		}

		if(this.agents && this.agents.length > 0){
			var it = this.agents.length-1;
			this.agents[it].draw(
				"token",
				sprites,
				context, 
				scale, 
				size, 
				offset);
		}

		if(this.triggers){
			for(var it = 0; it < this.triggers.length; it++){
				this.triggers[it].draw(
					context,
					scale,
					size,
					offset);
			}
		}
	};

	/**
	 * Description
	 * @method getDoors
	 * @return doors
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
	 * @method isFloor
	 * @return Literal
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
	 * @method isBorderBlocked
	 * @param {String} side The border of the cell which should be checked.
	 * @return Literal
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