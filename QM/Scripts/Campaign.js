"use strict"

var QM = (function (QM){
	
	/**
	 * Class: Campaign
	 * Desc: Base class for a campaign.
	 */
	class Campaign{
		constructor(campaignName, introText, levels){
			this.campaignName = campaignName;
			this.introText = introText;
			this.levels = levels;
		};
	}

	QM.Campaign = Campaign;
	return QM;
})(QM || {});