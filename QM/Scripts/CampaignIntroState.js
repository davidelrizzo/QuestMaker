/**
 * File: CampaignIntroState
 * Description: This application state is responsible for diplaying a campaign's
 *		introductory text.  The user should be able to continue from this poin to
 *		the level select application state.
 * To Do:
 *		-> Fix the "continue" button to a relative location rather than fixed
 *		   location.
 *		-> Implement additional pages to the book for overflow text.
 *		-> Consider the merits of scaling the book size and corresponding text
 *		   boxes.
 *		-> Update the textBox input to handle \n characters.
 */

"use strict"

var QM = (function(QM){

	function CampaignIntroState(){
		QM.QMState.call(this);

		this.backgroundImage = LoadImage("./Images/Book.gif");
		this.stoneTexture = LoadImage("./Images/seamless_tiled_stone_texture_by_lendrick.jpg");
		this.textFrameA = undefined;
		this.textFrameB = undefined;
		this.continueButton = undefined;
	}
	CampaignIntroState.prototype = Object.create(QM.QMState.prototype);

	CampaignIntroState.prototype.initialize = function(canvas, context){
		this.textFrameA = new QM.TextFrame(canvas, context, 90, 300, 260, 400);
		this.textFrameB = new QM.TextFrame(canvas, context, 395, 300, 260, 400);

		this.continueButton = new QM.TextButton(
			"Continue",
			 620, 750, 10,
			 QM.Canvas2D.context, 
			 QM.Mouse,
			 "30px Rye", 
			 "#FFFFFF", "#800000", "#FFFFFF"
		);
	}

	CampaignIntroState.prototype.update = function(){
		if(QM.Mouse.mouseDown){
			QM.Mouse.mouseDown = false;

			if(this.continueButton.isSelected()){
				return "levelIntroState";
			}
		}

		return "campaignIntroState";
	};

	CampaignIntroState.prototype.render = function(){
		// Ensure that the canvas dimensions = the document dimensions.
		QM.Canvas2D.canvas.width = document.body.clientWidth;
		QM.Canvas2D.canvas.height = document.body.clientHeight;

		QM.Canvas2D.clearCanvas(); // Clear the canvas for drawing.

		// Paint a stone pattern background.
		QM.Canvas2D.context.fillStyle = QM.Canvas2D.context.createPattern(this.stoneTexture, "repeat");
		QM.Canvas2D.context.fillRect(0, 0, QM.Canvas2D.canvas.width, QM.Canvas2D.canvas.height);

		// Paint the campaignIntro backgroundImage (a book) to the center of the canvas.
		var scale = 1;  // set a default scale of 1 (100%)

		if(this.backgroundImage.width > QM.Canvas2D.canvas.width)
		{
			// The image is wider than the available space
			// adjust the scale as required.
			scale = QM.Canvas2D.canvas.width/this.backgroundImage.width;
		} else if((this.backgroundImage.height * scale) > QM.Canvas2D.canvas.height)
		{
			// The image height is greater than the available screen height
			// adjust the scale as required.
			scale = QM.Canvas2D.canvas.height/(this.backgroundImage.height*scale)
		}
		
		QM.Canvas2D.context.drawImage(
			this.backgroundImage,
			0 , 0, this.backgroundImage.width, this.backgroundImage.height,  // Clipping coordinate on teh image
			0 + ((QM.Canvas2D.canvas.width - (this.backgroundImage.width*scale))/2),
			0 + ((QM.Canvas2D.canvas.height - (this.backgroundImage.height*scale))/2),														  // Where to draw the image
			this.backgroundImage.width * scale, 
			this.backgroundImage.height * scale													  // Scale the image here
			);
		

		// Title
		QM.Canvas2D.context.font = "50px Rye";
		QM.Canvas2D.context.fillStyle = "#FFFFFF"; // white
		QM.Canvas2D.context.textAlign = "center";
		QM.Canvas2D.context.fillText(
			QM.activeGameData.campaign.name, 
			QM.Canvas2D.canvas.width/2,
			0+((QM.Canvas2D.canvas.height - (this.backgroundImage.height*scale))/2) - 20,
			500
			);

		// Introductory text style
		QM.Canvas2D.context.font = "16px Cinzel";
		QM.Canvas2D.context.fillStyle = "blue";
		QM.Canvas2D.context.textAlign = "left";

		// set the position of the text frames
		this.textFrameA.setPosition(QM.Canvas2D.canvas.width/2 - 285, QM.Canvas2D.canvas.height/2 - 210);
		this.textFrameB.setPosition(QM.Canvas2D.canvas.width/2 + 20, QM.Canvas2D.canvas.height/2 - 210);

		// write the introductory text
		var text = this.textFrameA.writeText(QM.activeGameData.campaign.introText);
		this.textFrameB.writeText(text);

		this.continueButton.drawButton();
	};

	QM.CampaignIntroState = CampaignIntroState;
	return QM;
})(QM || {});