/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("team.js loaded");

	/**
	 * Description
	 * @class Team
	 * @constructor
	 * @method Team
	 * @param {String} name
	 * @param {Object} relations
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