//=====================================================================================
// File: MainMenu.js
// Desc:
//=====================================================================================

"use strict"

var QM = (function(QM){

	// Class: MainMenuState
	// Parent: State
	function MainMenuState()
	{
		QM.State.call(this);

		this.img_background = LoadImage("./Images/Background.gif");

		this.Button1 = {id : 1, text : "New Game",	x : 170, y : 160, width : 300, height : 40};
		this.Button2 = {id : 2, text : "Load Game", x : 170, y : 210, width : 300, height : 40};
		this.Button3 = {id : 3, text : "Editor", 	x : 170, y : 260, width : 300, height : 40};
		this.Button4 = {id : 4, text : "Exit", 		x : 170, y : 310, width : 300, height : 40};

		// Constructor
	};
	MainMenuState.prototype = Object.create(QM.State.prototype);

	MainMenuState.prototype.update = function()
	{
		if(QM.Mouse.mouseDown)
		{
			QM.Mouse.mouseDown = false;

			// Determine which button is currently selected if at all.
			if(this.isButtonSelected(this.Button1)) return "campaignIntroState";
			if(this.isButtonSelected(this.Button2)) return "mainMenuState";
			if(this.isButtonSelected(this.Button3)) return "mainMenuState";
			if(this.isButtonSelected(this.Button4)) return "exit";
		}

		return "mainMenuState";
	};

	MainMenuState.prototype.render = function()
	{
		// add code.
		QM.Canvas2D.clearCanvas();
		//QM.Canvas2D.drawImage(this.img_background, {x : 0, y : 0}, 0, {x : 0, y : 0}, 1);	// Draw the background image
		QM.Canvas2D.context.drawImage(
			this.img_background,
			0, 0, this.img_background.width, this.img_background.height,
			0, 0,
			1024, 768
			);
	
		QM.Canvas2D.context.font = "30px Arial";
		QM.Canvas2D.context.fillStyle = "white";
		QM.Canvas2D.context.textAlign = "center";

		// Title
		QM.Canvas2D.context.fillText("Hero Quest", 320, 50, 500);
		QM.Canvas2D.context.fillText("Menu", 320, 100, 300);
	
		// Draw the buttons
		this.drawButton(this.Button1, this.isButtonSelected(this.Button1));
		this.drawButton(this.Button2, this.isButtonSelected(this.Button2));
		this.drawButton(this.Button3, this.isButtonSelected(this.Button3));
		this.drawButton(this.Button4, this.isButtonSelected(this.Button4));

	};

	MainMenuState.prototype.isButtonSelected = function(button)
	{	
		if(QM.Mouse.mousex < button.x) return false;
		if(QM.Mouse.mousex > (button.x + button.width)) return false;
		if(QM.Mouse.mousey < button.y) return false;
		if(QM.Mouse.mousey > (button.y + button.height)) return false;
		
		this.selected = button.id;
		return true;
	};

	MainMenuState.prototype.drawButton = function(button, selected)
	{
		QM.Canvas2D.context.font = "30px Arial";
		QM.Canvas2D.context.fillStyle = "white";
		QM.Canvas2D.context.textAlign = "center";
	
		if(selected)
		{
			// Background box
			QM.Canvas2D.context.fillStyle = "yellow";
			QM.Canvas2D.context.globalAlpha = 0.7;
			QM.Canvas2D.context.fillRect(button.x, button.y, button.width, button.height);

			// Text
			QM.Canvas2D.context.globalAlpha = 1.0;
			QM.Canvas2D.context.fillStyle = "purple";
			QM.Canvas2D.context.fillText(button.text, button.x + (button.width/2), button.y+30, button.width);
		}
		else
		{
			// Background box
			QM.Canvas2D.context.fillStyle = "blue";
			QM.Canvas2D.context.globalAlpha = 0.7;
			QM.Canvas2D.context.fillRect(button.x, button.y, button.width, button.height);	

			// Text
			QM.Canvas2D.context.globalAlpha = 1.0;
			QM.Canvas2D.context.fillStyle = "white";
			QM.Canvas2D.context.fillText(button.text, button.x + (button.width/2), button.y+30, button.width);
		}	
	};

	QM.MainMenuState = MainMenuState;
	return QM;
})(QM || {});