//=====================================================================================
// File: MainMenu.js
// Desc:
//=====================================================================================

"use strict"

var QM = (function(QM){

	// Class: MainMenuState
	// Parent: State
	function MainMenuState(canvas)
	{
		QM.State.call(this);

		this.img_background = LoadImage("./Images/Background.gif");

		this.Button1 = {id : 1, text : "New Game",	x : 170, y : 160, width : 300, height : 40};
		this.Button2 = {id : 2, text : "Load Game", x : 170, y : 210, width : 300, height : 40};
		this.Button3 = {id : 3, text : "Editor", 	x : 170, y : 260, width : 300, height : 40};
		this.Button4 = {id : 4, text : "Exit", 		x : 170, y : 310, width : 300, height : 40};

		// Constructor
	}
	MainMenuState.prototype = Object.create(QM.State.prototype);

	MainMenuState.prototype.update = function()
	{
		// add code.
	}

	MainMenuState.prototype.render = function()
	{
		// add code.
		QM.Canvas2D.clearCanvas();
		QM.Canvas2D.drawImage(this.img_background, {x : 0, y : 0}, 0, {x : 0, y : 0}, 1);	// Draw the background image
	
		QM.Canvas2D.context.font = "30px Arial";
		QM.Canvas2D.context.fillStyle = "white";
		QM.Canvas2D.context.textAlign = "center";

		// Title
		QM.Canvas2D.context.fillText("Hero Quest", 320, 50, 500);
		QM.Canvas2D.context.fillText("Menu", 320, 100, 300);
	
		// Draw the buttons
		//this.drawButton(this.Button1, this.isButtonSelected(this.Button1));
		//this.drawButton(this.Button2, this.isButtonSelected(this.Button2));
		//this.drawButton(this.Button3, this.isButtonSelected(this.Button3));
		//this.drawButton(this.Button4, this.isButtonSelected(this.Button4));

	}

	QM.MainMenuState = MainMenuState;
	return QM;
})(QM || {});