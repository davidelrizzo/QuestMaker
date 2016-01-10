"use strict"

var gh = (function(gh){

	function Map(floor, cellSize){
		this.floor        = floor;
		this.cellSize     = cellSize;
	}

	Map.prototype.drawFloor = function(context, scale, offset, sprites, team){
		for(var y = 0; y < this.floor.length; y++){
			for(var x = 0; x < this.floor[y].length; x++){
				if(this.floor[y][x].visible[team] === true){
					this.floor[y][x].draw(context, x * this.cellSize * scale + offset.x, y*this.cellSize * scale + offset.y, scale, sprites);
				}
			}
		}
	};

	Map.prototype.drawGrid = function(canvas, context, scale, offset){
		context.save();
		context.strokeStyle = "grey";

		for(var y = 0 + offset.y % (this.cellSize*scale); y < canvas.height; y+= this.cellSize * scale){
			context.beginPath();
			context.moveTo(0, y);
			context.lineTo(canvas.width, y);
			context.stroke();
		}

		for(var x = 0 + offset.x % (this.cellSize * scale); x < canvas.width; x+= this.cellSize * scale){
			context.beginPath();
			context.moveTo(x, 0);
			context.lineTo(x, canvas.height);
			context.stroke();
		}

		context.restore();
	};

	/**
	 * To build a list of unique doors (a door is refferenced twice in every map)
	 * it is necessary to select only the 'left' and 'top' doors.
	 */
	Map.prototype.getDoors = function(){
        var doors = [];

        for(var y = 0; y < this.floor.length; y++){
            if(this.floor[y] !== undefined){
            	for(var x = 0; x < this.floor[x].length; x++){
            		if(this.floor[y][x] !== undefined){
                        var d = this.floor[y][x].getDoors();
                        while(d.length > 0){
                        	if(d[0][d[0].side].x === x && d[0][d[0].side].y === y){
                        		doors.push(d.shift());
                        	} else {
                        		d.shift();
                        	}
                        }
            		}
            	}
            }
        }

        return doors;
	};

	Map.prototype.clearVisibility = function(teams){
		for(var y = 0; y < this.floor.length; y++){
			for(var x = 0; x < this.floor[y].length; x++){
				this.floor[y][x].visible = {};
				for(var key in teams){
					this.floor[y][x].visible[key] = false;
				}
			}
		}
	};

	/**
	 *	DESC
	 *		This function sets the visibility of a ray of cells from the first cell in
	 *		the ray.  This function checks for doors and walls which may obstruct the
	 *		rays 'line of sight'.
	 * 	INPUT
	 *		ray: 		an array of cells which are in a line
	 *		faction: 	the string reference of the faction for which to set visibility
	 *		visible: 	the visibility to set the cells to
	 */
	Map.prototype.setRayVisibility = function(ray, faction, visible){
		for(var c = 0; c < ray.length; c++){
			ray[c].visible = ray[c].visible || {};
			ray[c].visible[faction] = visible;
			if(ray[c].borders !== undefined){
				if(ray[c+1] !== undefined){
					if(ray[c+1].x > ray[c].x){
						if(ray[c].borders.right){
							switch(ray[c].borders.right.id){
								case "wall":
									return;
									break;
								case "door":
									if(ray[c].borders.right.open === false){
										return;
									}
									break;
								default:
									break;
							}
						}
					} else if(ray[c+1].x < ray[c].x){
						// check the left border for obstruction.
						if(ray[c].borders.left){
							switch(ray[c].borders.left.id){
								case "wall":
									return;
									break;
								case "door":
									if(ray[c].borders.left.open === false){
										return;
									}
									break;
								default:
									break;
							}
						}
					} else if(ray[c+1].y > ray[c].y){
						// check the bottom border
						console.log("check bottom");
						if(ray[c].borders.bottom){
							switch(ray[c].borders.bottom.id){
								case "wall":
									return;
									break;
								case "door":
									console.log("bottom door");
									console.log(ray[c].borders.bottom);
									if(ray[c].borders.bottom.open === false){
										return;
									}
									break;
								default:
									break;
							}
						}
					} else if(ray[c+1].y < ray[c].y){
						// check the top border
						if(ray[c].borders.top){
							switch(ray[c].borders.top.id){
								case "wall":
									return;
									break;
								case "door":
									if(ray[c].borders.top.open === false){
										return;
									}
									break;
								default:
									break;
							}
						}
					}
				}
			}
		}
	};

	Map.prototype.getLine = function(x0, y0, x1, y1){

		var dy 			= y1-y0;						// change in y
		var dx 			= x1-x0;						// change in x
		var m 			= dy/dx;						// slope
		var itx;										// x-axis direction iterator
		var ity;										// y-axis direction iterator
		var x, y;										// for loop iterators per x and y axes
		var b			= (y0+0.5)-(m*(x0+0.5));		// y-axis intercept
		var yint;										// y-intercept
		var blocked 	= false;						// indicates whether line to object is obstructed

		var path 		= [];

		// Get the direction of the line.
		x1 < x0 ? itx = -1 : itx = 1;
		y1 < y0 ? ity = -1 : ity = 1;

		if(dx == 0){ // vertical line
			var ylim = y1;	// The y-axis constraint.
			y1 > y0 ? ylim += 1 : ylim -= 1;
			for(x = x0, y = y0; y != ylim; y += ity){
				path.push(this.floor[y][x]);
			}
		} else {
			x = x0;
			y = y0;

			for(;x != (x1+itx) && y != (y1+ity);){
				path.push(this.floor[y][x]);

				if(itx > 0){
					yint = m*(x+1)+b;
				} else {
					yint = m*x+b;
				}

				if(ity < 0){
					if(yint > y){
						x+=itx;
					} else {
						y+=ity;
					}
				} else {
					if(yint < (y+1)){
						x+=itx;
					} else {
						y+=ity;
					}
				}
			}
		}

		return path;
	}


	gh.Map = Map;
	return gh;
})(gh || {});	