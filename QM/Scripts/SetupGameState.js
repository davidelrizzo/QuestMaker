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
		/**
		 * Generate the initial visibility of the board based on what the players see.
		 */
		//var map = QM.activeGameData.campaign.levels[QM.activeGameData.activeLevel].mapData.map;
		var map = QM.activeGameData.activeMap.map;
		var x, y;

		for(y = 0; y < map.length; y++){
			if(y == 0 || y == (map.length-1)){
				for(x = 0; x < map[y].length; x++){
					QM.activeGameData.activeMap.getSightline(QM.activeGameData.creatures[0][0].posX, QM.activeGameData.creatures[0][0].posY, x, y, false);
				}
			} else {
				QM.activeGameData.activeMap.getSightline(QM.activeGameData.creatures[0][0].posX, QM.activeGameData.creatures[0][0].posY, 0, y, false);
				QM.activeGameData.activeMap.getSightline(QM.activeGameData.creatures[0][0].posX, QM.activeGameData.creatures[0][0].posY, map[y].length-1, y, false);
			}
		}

		/**
		 * Add a hud overlay for the canvas
		 */
		QM.hud = new QM.HUD();
		
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


	QM.SetupGameState = SetupGameState;
	return QM;
})(QM || {});