"use strict"

var QM = (function (QM){
	
	/**
	 * Class: Campaign
	 * Desc: Base class for a campaign.
	 */

	function Campaign(json){
		var data = JSON.parse(json);

		this.campaignName = data.name;
		this.introText = data.introText;
		this.levels = undefined;
		this.teams = undefined;
		this.creatures = undefined;
		this.furniture = undefined;
		this.triggers = undefined;
		this.walls = undefined;
		this.equipment = undefined;
		this.conditions = undefined;
		this.spells = undefined;
	};
	/*
	class Campaign{
		constructor(campaignName, introText, levels){
			this.campaignName = campaignName;
			this.introText = introText;
			this.levels = levels;
		};
	}
	*/

	QM.Campaign = Campaign;
	return QM;
})(QM || {});