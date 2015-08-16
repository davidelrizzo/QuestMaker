"use strict"

var QM = (function(QM){

	function ActiveGameData(){

	}

	ActiveGameData.prototype.setupData = function(campaignData){
		try{
			this.campaignData = JSON.parse(campaignData);
		} catch (e) {
			console.log(e);
		};
		
		this.campaign = {};
		this.campaign.name = campaignData.campaign.name;
		//this.campaign.introText = campaignData.campaign.introText;
	};

	QM.ActiveGameData = ActiveGameData;
	return QM;
})(QM || {});