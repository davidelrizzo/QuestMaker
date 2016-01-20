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
	function Campaign(name, introText, agentTemplates, levels){
		this.name           = name;
		this.introText      = introText;
		this.agentTemplates = agentTemplates;
		this.levels         = levels;
	}

	gh.Campaign = Campaign;

	return gh;
})(gh || {});