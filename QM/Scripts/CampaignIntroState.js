"use strict"

var QM = (function(QM){

	function CampaignIntroState()
	{
		QM.QMState.call(this);

		this.backgroundImage = LoadImage("./Images/Background.gif");
	};
	CampaignIntroState.prototype = Object.create(QM.QMState.prototype);

	CampaignIntroState.prototype.update = function()
	{
		//return "campaignIntroState";
		return "exit";
	};

	CampaignIntroState.prototype.render = function()
	{
		QM.Canvas2D.clearCanvas();
		QM.Canvas2D.drawImage(this.backgroundImage, {x : 0, y : 0}, 0, {x : 0, y : 0}, 1);	// Draw the background image

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