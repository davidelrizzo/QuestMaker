"use strict"

var QM = (function(QM){
	
	function LevelIntroState()
	{
		QM.QMState.call(this);

		this.stoneTexture = LoadImage("./Images/seamless_tiled_stone_texture_by_lendrick.jpg");

		this.continueButton = undefined;
	};
	LevelIntroState.prototype = Object.create(QM.QMState.prototype);

	LevelIntroState.prototype.initialize = function(canvas, context, mouse)
	{
		this.continueButton = new QM.TextButton(
			"Continue",
			620, 750, 10,
			context,
			mouse,
			"30px Rye",
			"#FFFFFF", "#800000", "#FFFFFF"
		);
	}

	LevelIntroState.prototype.update = function()
	{
		return "levelIntroState";
	};

	LevelIntroState.prototype.render = function()
	{
		// Ensure that the canvas dimensions = the document dimensions.
		QM.Canvas2D.canvas.width = document.body.clientWidth;
		QM.Canvas2D.canvas.height = document.body.clientHeight;

		QM.Canvas2D.clearCanvas(); // Clear the canvas for drawing.

		// Paint a stone pattern background.
		QM.Canvas2D.context.fillStyle = QM.Canvas2D.context.createPattern(this.stoneTexture, "repeat");
		QM.Canvas2D.context.fillRect(0, 0, QM.Canvas2D.canvas.width, QM.Canvas2D.canvas.height);

		/**
		 * Dummy text for prototyping progress
		 */
		QM.Canvas2D.context.font = "50px Rye";
		QM.Canvas2D.context.fillStyle = "#FFFFFF";
		QM.Canvas2D.context.textAlign = "center";
		QM.Canvas2D.context.fillText(
			"LEVEL SELECTION PAGE",
			QM.Canvas2D.canvas.width/2,
			100,
			QM.Canvas2D.context.measureText("LEVEL SELECTION PAGE").width
			);

		QM.Canvas2D.context.font = "50px Rye";
		QM.Canvas2D.context.fillStyle = "#FFFFFF";
		QM.Canvas2D.context.textAlign = "center";
		QM.Canvas2D.context.fillText(
			"PAGE UNDER CONSTRUCTION",
			QM.Canvas2D.canvas.width/2,
			200,
			QM.Canvas2D.context.measureText("PAGE UNDER CONSTRUCTION").width
			);

		this.continueButton.drawButton();
	};

	QM.LevelIntroState = LevelIntroState;
	return QM;
})(QM || {});