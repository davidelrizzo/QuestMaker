"use strict"

var gh = (function(gh){

	function Team(name, relations){
		this.name            = name;
		this.relations       = relations;
	}

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