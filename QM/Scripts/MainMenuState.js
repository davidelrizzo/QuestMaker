//=====================================================================================
// File: MainMenu.js
// Desc:
//=====================================================================================

"use strict"

var QM = (function(QM){

	function MainMenuState()
	{
		QM.State.call(this);

		this.img_background = LoadImage("./Images/Background.gif");
		this.stoneTexture = LoadImage("./Images/seamless_tiled_stone_texture_by_lendrick.jpg");

		this.newGameButton = {id : 1, text : "New Game",	x : 170, y : 160, width : 300, height : 40};
		this.loadGameButton = {id : 2, text : "Load Game", x : 170, y : 210, width : 300, height : 40};
		this.editorButton = {id : 3, text : "Editor", 	x : 170, y : 260, width : 300, height : 40};
		this.exitButton = {id : 4, text : "Exit", 		x : 170, y : 310, width : 300, height : 40};
	}
	MainMenuState.prototype = Object.create(QM.State.prototype);

	MainMenuState.prototype.update = function()
	{
		if(QM.Mouse.mouseDown)
		{
			QM.Mouse.mouseDown = false;

			if(this.isButtonSelected(this.newGameButton)){
				var gameData = JSON.parse(getAJAX("./Data/HeroQuest.json"));
				var campaign = new QM.API.Campaign();

				campaign.campaignName = gameData.name;
				campaign.introText = gameData.introText;
				campaign.levels = gameData.levels;
				campaign.creatureTemplates = gameData.creatureTemplates;
				
				QM.activeGameData = new QM.ActiveGameData(campaign);

				console.log(this.activeGameData);

				return "campaignIntroState";	
			} 
			if(this.isButtonSelected(this.loadGameButton)){
				return "mainMenuState";	
			} 
			if(this.isButtonSelected(this.editorButton)){
				return "mainMenuState";	
			} 
			if(this.isButtonSelected(this.exitButton)){
				return "exit";	
			} 
		}

		return "mainMenuState";
	};

	MainMenuState.prototype.render = function()
	{
		QM.Canvas2D.canvas.width = window.innerWidth;   //document.body.clientWidth;
		QM.Canvas2D.canvas.height = window.innerHeight; //document.body.clientHeight;

		QM.Canvas2D.clearCanvas();

		QM.Canvas2D.context.fillStyle = QM.Canvas2D.context.createPattern(this.stoneTexture, "repeat");
		QM.Canvas2D.context.fillRect(0, 0, QM.Canvas2D.canvas.width, QM.Canvas2D.canvas.height);

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
		this.newGameButton.x = (QM.Canvas2D.canvas.width/2) - (this.newGameButton.width/2);
		this.loadGameButton.x = (QM.Canvas2D.canvas.width/2) - (this.loadGameButton.width/2);
		this.editorButton.x = (QM.Canvas2D.canvas.width/2) - (this.editorButton.width/2);
		this.exitButton.x = (QM.Canvas2D.canvas.width/2) - (this.exitButton.width/2);

		// Update the button height coordinates
		this.newGameButton.y = 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 160;
		this.loadGameButton.y = 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 210;
		this.editorButton.y = 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 260;
		this.exitButton.y = 0 + ((QM.Canvas2D.canvas.height - (this.img_background.height*scale))/2) + 310;

		// Draw the buttons
		this.drawButton(this.newGameButton, this.isButtonSelected(this.newGameButton));
		this.drawButton(this.loadGameButton, this.isButtonSelected(this.loadGameButton));
		this.drawButton(this.editorButton, this.isButtonSelected(this.editorButton));
		this.drawButton(this.exitButton, this.isButtonSelected(this.exitButton));

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