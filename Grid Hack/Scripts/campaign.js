"use strict"

var gh = (function(gh){

	function Campaign(name, introText, agentTemplates, levels){
		this.name           = name;
		this.introText      = introText;
		this.agentTemplates = agentTemplates;
		this.levels         = levels;
	}

	gh.Campaign = Campaign;

	return gh;
})(gh || {});