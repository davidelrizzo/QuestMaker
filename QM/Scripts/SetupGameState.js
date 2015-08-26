/**
 * File: SetupGameState
 * Desc:
 *		-> Get starting player postitions
 *		-> Generate sightlines for starting players
 *		-> Start game
 * To Do:
 *		-> Set monsters to inactive	? (this might be better placed in the json file)
 *		-> Implement starting placement of players
 *		-> Generate sightlines for starting players
 */

"use strict"

var QM = (function(QM){

	function SetupGameState(canvas, context){
		QM.QMState.call(this);

		this.canvas = canvas;
		this.context = context;
	}
	SetupGameState.prototype = Object.create(QM.QMState.prototype);

	SetupGameState.prototype.update = function(){
		//getSightline(QM.activeGameData.creatures[0][0].posX, QM.activeGameData.creatures[0][0].posY, 4, 16); // Diagonal Test
		//getSightline(5, 16, 1, 13);
		var map = QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;
		var x, y;
		console.log(map.length);
		for(y = 0; y < map.length; y++){
			if(y == 0 || y == (map.length-1)){
				for(x = 0; x < map[y].length; x++){
					console.log("Get sightline to x: " + x + " y: " + y);
					getSightline(QM.activeGameData.creatures[0][0].posX, QM.activeGameData.creatures[0][0].posY, x, y);
				}
			} else {
				console.log("Get sightline to x: 0 y: " + y);
				getSightline(QM.activeGameData.creatures[0][0].posX, QM.activeGameData.creatures[0][0].posY, 0, y);
				console.log("Get sightline to x: " + (map[y].length-1) + " y: " + y);
				getSightline(QM.activeGameData.creatures[0][0].posX, QM.activeGameData.creatures[0][0].posY, map[y].length-1, y);
			}
		}

		return "gameState";
	};

	SetupGameState.prototype.render = function(){

	};

	function hasWall(map, x, y, wall){
		for(var c = 0; c < map[y][x].wall.length; c++){
			if(map[y][x].wall[c] === wall) return true;
		}
		return false;
	}

	function getSightline(x0, y0, x1, y1){
		var map = QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;

		console.log("generate raycast sightlines");
		var dy = y1-y0;
		var dx = x1-x0;
		var m; // slope
		var itx; // x-axis direction iterator
		var ity; // y-axis direction iterator
		var x, y;
		var b; // y-axis intercept
		var yint;
		
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
			for(x = x0, y = y0; y != y1; y+=ity){
				console.log("x: " + x + " y: " + y);
				map[y][x].visible = true;
			}
			map[y][x].visible = true;
		} else {
			m = dy/dx;
			b = (y0+0.5)-(m*(x0+0.5));
			x = x0;
			y = y0;
			
			for(; x != (x1+itx) && y != (y1+ity);){
				map[y][x].visible = true;
				if(itx > 0){
					yint = m*(x+1)+b;
				} else {
					yint = m*x+b;
				}

				console.log("x: " + x + " y: " + y + " b: " + b + " yint: " + yint);

				if(ity < 0){
					if(yint > y){
						x+=itx;
					} else{
						y+=ity;
					}
				} else {
					if(yint < (y+1)){
						x+=itx;
					} else{
						y+=ity;
					}
				}
			}
		}
	}

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


	QM.SetupGameState = SetupGameState;
	return QM;
})(QM || {});