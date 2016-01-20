"use strict"

var gh = (function(gh){

	/**
	 * Description
	 * @method Team
	 * @param {} name
	 * @param {} relations
	 * @return 
	 */
	function Team(name, relations){
		this.name            = name;
		this.relations       = relations;
	}

	/**
	 * Description
	 * @method getRelation
	 * @param {} team
	 * @return 
	 */
	Team.prototype.getRelation = function(team){
		var relationship = this.relations[team];

		if(relationship === undefined){
			console.log("Team " + team + " does not exist.");
			return "neutral";
		} else {
			return relationship;
		}
	}

	gh.Team = Team;

	return gh;
})(gh || {});