"use strict"

var QM = (function(QM){
	
	function GameState(canvas, context, activeGameData){
		QM.QMState.call(this);

		this.canvas = canvas;
		this.context = context;
		this.stoneTexture = LoadImage("./Images/seamless_tiled_stone_texture_by_lendrick.jpg");

		// requires current game copy of campaign data.
		this.activeGameData = activeGameData;

		this.tileSize = 64;
		this.gridScale = 1;
	}
	GameState.prototype = Object.create(QM.QMState.prototype);

	GameState.prototype.update = function(){
		return "gameState";
	};

	GameState.prototype.render = function(){
		this.width = document.body.clientWidth;
		this.height = document.body.clientHeight;
		QM.Canvas2D.clearCanvas();

		this.printMap();

		//Paint a stone pattern background
		//this.context.fillStyle = this.context.createPattern(this.stoneTexture, "repeat");
		//this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};

	GameState.prototype.printMap = function(){
		var map = this.activeGameData.gameData.levels[this.activeGameData.activeLevel].mapData.map;
		
		for(var y = 0; y < map.length; y++){
			for(var x = 0; x < map[y].length; x++){
				QM.Canvas2D.drawImage(
					this.activeGameData.activeMapSprites[map[y][x].id],
					{x: x*this.tileSize*this.gridScale, y: y*this.tileSize*this.gridScale},
					map[y][x].rotation,
					{x : 0, y : 0},
					this.gridScale
				);
			}
		}
	};

	QM.GameState = GameState;
	return QM;
})(QM || {});