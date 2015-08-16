"use strict"

var QM = (function(QM){
	
	function GameState(canvas, context, activeGameData){
		QM.QMState.call(this);

		this.canvas = canvas;
		this.context = context;
		this.stoneTexture = LoadImage("./Images/seamless_tiled_stone_texture_by_lendrick.jpg");

		// requires current game copy of campaign data.
		this.activeGameData = activeGameData;
	}
	GameState.prototype = Object.create(QM.QMState.prototype);

	GameState.prototype.update = function(){
		return "gameState";
	};

	GameState.prototype.render = function(){
		console.log(this);
		this.width = document.body.clientWidth;
		this.height = document.body.clientHeight;
		QM.Canvas2D.clearCanvas();

		//Paint a stone pattern background
		//this.context.fillStyle = this.context.createPattern(this.stoneTexture, "repeat");
		//this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};

	QM.GameState = GameState;
	return QM;
})(QM || {});