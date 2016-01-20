/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){


	/**
	 * @constructor
	 * @class User
	 * @method User
	 * @param {String} team The name of the team which the user 'player' belongs to.
	 * @param {Array} roster An array containing the agents belonging to the user.
	 * @return 
	 */
	function User(team, roster){
		this.team = team;
		this.roster = roster;
	}


	gh.User = User;
	
	return gh;
})(gh || {});