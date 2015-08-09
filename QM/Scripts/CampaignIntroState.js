"use strict"

var QM = (function(QM){

	function CampaignIntroState()
	{
		QM.QMState.call(this);

		this.backgroundImage = LoadImage("./Images/Book.gif");
		this.textFrameA = undefined;
		this.textFrameB = undefined;
	};
	CampaignIntroState.prototype = Object.create(QM.QMState.prototype);

	CampaignIntroState.prototype.initialize = function(canvas, context)
	{
		this.textFrameA = new QM.TextFrame(canvas, context, 90, 300, 260, 400);
		this.textFrameB = new QM.TextFrame(canvas, context, 395, 300, 260, 400);
	}

	CampaignIntroState.prototype.update = function()
	{
		return "campaignIntroState";
		//return "exit";
	};

	CampaignIntroState.prototype.render = function()
	{
		QM.Canvas2D.canvas.width = document.body.clientWidth;
		QM.Canvas2D.canvas.height = document.body.clientHeight;

		QM.Canvas2D.clearCanvas();

		// Paint a black background.
		QM.Canvas2D.context.fillStyle = "000000";
		QM.Canvas2D.context.fillRect(0, 0, QM.Canvas2D.canvas.width, QM.Canvas2D.canvas.height);

		// Paint the campaignIntro backgroundImage (a book) to the center of the canvas.
		var scale = 1;

		if(this.backgroundImage.width > QM.Canvas2D.canvas.width)
		{
			// The image is wider than the available space
			// Scale the image.
			scale = QM.Canvas2D.canvas.width/this.backgroundImage.width;
		} else if((this.backgroundImage.height * scale) > QM.Canvas2D.canvas.height)
		{
			// The image height is greater than the available screen height
			// Scale the image.
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
		
		QM.Canvas2D.context.font = "30px Arial";
		QM.Canvas2D.context.fillStyle = "white";
		QM.Canvas2D.context.textAlign = "center";

		// Title
		QM.Canvas2D.context.fillText("Hero Quest", 320, 50, 500);

		// Introductory text style
		QM.Canvas2D.context.font = "14px Arial";
		QM.Canvas2D.context.fillStyle = "blue";
		QM.Canvas2D.context.textAlign = "left";

		// set the position of the text frames
		this.textFrameA.setPosition(QM.Canvas2D.canvas.width/2 - 285, QM.Canvas2D.canvas.height/2 - 210);
		this.textFrameB.setPosition(QM.Canvas2D.canvas.width/2 + 20, QM.Canvas2D.canvas.height/2 - 210);

		// write the introductory text
		this.textFrameA.writeText(QM.HeroQuest.introText);
		this.textFrameB.writeText(QM.HeroQuest.introText);


		//writeText(QM.HeroQuest.introText, 20, 100, 30, 980, QM.Canvas2D.context);
		//QM.Canvas2D.context.fillText(QM.HeroQuest.introText, 10, 100, 1000);
		
	};

	QM.CampaignIntroState = CampaignIntroState;
	return QM;
})(QM || {});