"use strict"

var QM = (function(QM){

	function CampaignIntroState()
	{
		QM.QMState.call(this);

		this.backgroundImage = LoadImage("./Images/Book.gif");
	};
	CampaignIntroState.prototype = Object.create(QM.QMState.prototype);

	CampaignIntroState.prototype.update = function()
	{
		//return "campaignIntroState";
		return "exit";
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
		
		//QM.Canvas2D.drawImage(this.backgroundImage, {x : 0, y : 0}, 0, {x : 0, y : 0}, 1);	// Draw the background image

		QM.Canvas2D.context.font = "30px Arial";
		QM.Canvas2D.context.fillStyle = "white";
		QM.Canvas2D.context.textAlign = "center";

		// Title
		QM.Canvas2D.context.fillText("Hero Quest", 320, 50, 500);
		QM.Canvas2D.context.font = "20px Arial";
		QM.Canvas2D.context.fillStyle = "blue";
		QM.Canvas2D.context.textAlign = "left";
		writeText(QM.HeroQuest.introText, 20, 100, 30, 980, QM.Canvas2D.context);
		//QM.Canvas2D.context.fillText(QM.HeroQuest.introText, 10, 100, 1000);
		
	};

	QM.CampaignIntroState = CampaignIntroState;
	return QM;
})(QM || {});