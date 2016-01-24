"use strict"

var gh = (function(gh){

	/**
	 * Description
	 * @method Campaign
	 * @param {} name
	 * @param {} introText
	 * @param {} agentTemplates
	 * @param {} levels
	 * @return 
	 */
	function Campaign(name, introText, agentTemplates, weaponTemplates, levels){
		this.name           	= name;
		this.introText      	= introText;
		this.agentTemplates 	= agentTemplates;
		this.weaponTemplates 	= weaponTemplates;
		this.levels         	= levels;
	}

	gh.Campaign = Campaign;

	return gh;
})(gh || {});