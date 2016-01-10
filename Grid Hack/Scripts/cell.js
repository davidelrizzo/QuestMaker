/**
 *	REQUIRES:
 *		sprite.js
 */

"use strict"

var gh = (function(gh){
	console.log("cell.js loaded");

	function Cell(x, y, path, img, borders, size){
		this.x 				= x;
		this.y 				= y;
		this.sprites        = img;
		this.borders	    = borders;
		this.size           = size;
		this.visible        = undefined;
	}

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

	Cell.prototype.getDoors = function(){
        var doors = [];

        for(var key in this.borders){
        	if(this.borders[key].constructor === gh.Door){
	        	doors.push(this.borders[key]);
        	} 
        }

        return doors;
	};

	gh.Cell = Cell;
	return gh;
})(gh || {});