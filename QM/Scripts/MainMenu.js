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
		this.stoneTexture = LoadImage("./Images/seamless_tiled_stone_texture_by_lendrick.jpg");

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
		QM.Canvas2D.canvas.width = window.innerWidth; //document.body.clientWidth;
		QM.Canvas2D.canvas.height = window.innerHeight; //document.body.clientHeight;

		QM.Canvas2D.clearCanvas();

		QM.Canvas2D.context.fillStyle = QM.Canvas2D.context.createPattern(this.stoneTexture, "repeat");
		QM.Canvas2D.context.fillRect(0, 0, QM.Canvas2D.canvas.width, QM.Canvas2D.canvas.height);

		// Paint a black background.
		//QM.Canvas2D.context.fillStyle = "000000";
		//QM.Canvas2D.context.fillRect(0, 0, QM.Canvas2D.canvas.width, QM.Canvas2D.canvas.height);

		// Paint the questmaker (heroquest) background image to the center of the canvas if possible
		var scale = 1;

		if(this.img_background.width > QM.Canvas2D.canvas.width)
		{
			// The image is wider than the available space
			// Scale the image.
			scale = QM.Canvas2D.canvas.width/this.img_background.width;
		} else if((this.img_background.height * scale) > QM.Canvas2D.canvas.height)
		{
			// The image height is greater than the available screen height
			// Scale the image.
			scale = QM.Canvas2D.canvas.height/(this.img_background.height*scale)
		}
		
		QM.Canvas2D.context.drawImage(
			this.img_background,
			0 , 0, this.img_background.width, this.img_background.height,  // Clipping coordinate on teh image
			0 + ((QM.Canvas2D.canvas.width - (this.img_background.width*scale))/2),
			0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2),														  // Where to draw the image
			this.img_background.width * scale, 
			this.img_background.height * scale													  // Scale the image here
			);

		QM.Canvas2D.context.font = "50px Rye";
		QM.Canvas2D.context.fillStyle = "white";
		QM.Canvas2D.context.textAlign = "center";

		// Title
		QM.Canvas2D.context.fillText(
			"Hero Quest", 
			QM.Canvas2D.canvas.width/2, 
			0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 50, 
			500
			);
		QM.Canvas2D.context.fillText("Menu", QM.Canvas2D.canvas.width/2, 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 100, 300);
	
		// Update the button width coordinates
		this.Button1.x = (QM.Canvas2D.canvas.width/2) - (this.Button1.width/2);
		this.Button2.x = (QM.Canvas2D.canvas.width/2) - (this.Button2.width/2);
		this.Button3.x = (QM.Canvas2D.canvas.width/2) - (this.Button3.width/2);
		this.Button4.x = (QM.Canvas2D.canvas.width/2) - (this.Button4.width/2);

		// Update the button height coordinates
		this.Button1.y = 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 160;
		this.Button2.y = 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 210;
		this.Button3.y = 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 260;
		this.Button4.y = 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 310;

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