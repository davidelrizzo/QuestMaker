"use strict"

var QM = (function(QM){

	function Map(map){
		this.map = map;
		initializeMapVisibility(this.map);
	}

	Map.prototype.hasWall = function(x, y, wall){
		console.log(this.map[y][x]);
		for(var c = 0; c < this.map[y][x].border.wall.length; c++){
			if(this.map[y][x].border.wall[c] === wall) return true;
		}
		return false;		
	};

	/**
	 * Func: hasDoor
	 * Input: border-: ["left", "right", "top", "bottom"], open [undefined, true, false]
	 * Desc: This method checks if there is a door on a particular border of a tile on the map
	 *		and returns true if so. If 'open' is defiend, it will only return true if the 
	 *		doors state matches the 'open' state.
	 */
	Map.prototype.hasDoor = function(x, y, border, open){
		if(this.map[y][x].border !== undefined && this.map[y][x].border.door !== undefined){
			for(var d = 0; d < this.map[y][x].border.door.length; d++){
				if(this.map[y][x].border.door[d].side === border){
					if(open !== undefined){
						if(this.map[y][x].border.door[d].open === open){
							return true;
						} else{
							return false;
						}
					} else {
						return true;
					}
				}
			}
		}

		return false;
	};

	Map.prototype.getSightline = function(x0, y0, x1, y1, checkWall){
		console.log("getSightLine - x,y " + x0 + "," + y0 + " x,y " + x1 + "," + y1);

		var dy = y1-y0;
		var dx = x1-x0;
		var m; // slope
		var itx; // x-axis direction iterator
		var ity; // y-axis direction iterator
		var x, y;
		var b; // y-axis intercept
		var yint;
		var blocked = false;
		
		if(x1 < x0){
			itx = -1;
		} else {
			itx = 1;
		}

		if(y1 < y0){
			ity = -1;
		} else{
			ity = 1;
		}

		if(dx == 0){
			var ylim;
			if(ity > 0){
				ylim = y1+1;
			} else {
				ylim = y1;
			}
			for(x = x0, y = y0; y != ylim && blocked == false; y+=ity){
				this.map[y][x].visible = true;
				
				if(checkWall && this.map[y][x].border !== undefined && this.map[y][x].border.wall !== undefined){
					if(ity > 0 && this.map[y][x].border.wall.indexOf("bottom") != -1){
						blocked = true;
					} else if(ity < 0 && this.map[y][x].border.wall.indexOf("top") != -1){
						blocked = true;
					}
				}
			}
		} else {
			m = dy/dx;
			b = (y0+0.5)-(m*(x0+0.5));
			x = x0;
			y = y0;
			
			for(; x != (x1+itx) && y != (y1+ity) && blocked == false;){
				this.map[y][x].visible = true;
				if(itx > 0){
					yint = m*(x+1)+b;
				} else {
					yint = m*x+b;
				}

				if(ity < 0){
					if(yint > y){
						if(checkWall && itx > 0 && (this.hasWall(x, y, "right") || this.hasDoor(x, y, "right", false))){
							blocked = true;
						} else if(checkWall && itx < 0 && (this.hasWall(x, y, "left") || this.hasDoor(x, y, "left", false))){
							blocked = true;
						}
						x+=itx;
					} else{
						if(checkWall && itx > 0 && (this.hasWall(x, y, "top") || this.hasDoor(x, y, "top", false))){
							blocked = true;
						} else if(checkWall && itx < 0 && (this.hasWall(x, y, "top") || this.hasDoor(x, y, "top", false))){
							blocked = true;
						}
						y+=ity;
					}
				} else {
					if(yint < (y+1)){
						if(checkWall && itx > 0 && (this.hasWall(x, y, "right") || this.hasDoor(x, y, "right", false))){
							blocked = true;
						} else if(checkWall && itx < 0 && (this.hasWall(x, y, "left") || this.hasDoor(x, y, "left", false))){
							blocked = true;
						}
						x+=itx;
					} else{						
						if(checkWall && itx > 0 && (this.hasWall(x, y, "bottom") || this.hasDoor(x, y, "bottom", false))){
							blocked = true;
						} else if(checkWall && itx < 0 && (this.hasWall(x, y, "bottom") || this.hasDoor(x, y, "bottom", false))){
							blocked = true;
						}						
						y+=ity;
					}
				}
			}
		}		
	};

	function initializeMapVisibility(map){
		for(var y = 0; y < map.length; y++){
			for(var x = 0; x < map[y].length; x++){
				map[y][x].visible = false;
			}
		}
	};

	Map.prototype.setGlobalMapVisibility = function(visible){
		for(var y = 0; y < map.length; y++){
			for(var x = 0; x < map[y].length; x++){
				map[y][x].visible = visible;
			}
		}		
	};


	/**
	 * WARNING, NOT CURRENTLY FUNCTIONAL
	 *
	function generateBresenhamSightline(x0, y0, x1, y1){
		console.log("generateSightlines");
		console.log(x0, y0);
		var dx = x1-x0;		
		var dy = y1-y0;
		var d = 2*dy - dx;
		var map = QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;
		map[y0][x0].visible = true;
		var y = y0;
		var x = x0;
		var obstructed = false;
		if(d > 0 && hasWall(map, x, y, "right")){
			obstructed = true;
		} else if(hasWall(map, x, y, "bottom")){
			obstructed = true;
		}

		for(var x = x0+1; x <= x1 && obstructed === false; x++){
			console.log("x: " + x + " y: " + y);
			if(d > 0){
				y+=1;
				map[y][x].visible = true;
				d = d + (2*dy - 2*dx);
			} else {
				map[y][x].visible = true;
				d = d + (2*dy);
			}
				if(d > 0 && hasWall(map, x, y, "right")){
					obstructed = true;
				} else if(hasWall(map, x, y, "bottom")){
					obstructed = false;
				}
		}
	}
	 */

	QM.API = QM.API || {};
	QM.API.Map = Map;
	return QM;

})(QM || {});