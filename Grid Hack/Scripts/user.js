/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){


	/**
	 * @class User
	 * @constructor
	 */
	function User(team, agents){
		this.team = team;
	}

    /**
     * @class Player
     * @extends User
     * @constructor
     */
	function Player(name, team, agents){
		User.call(this, team, agents);
		this.name = name;
	}
	Player.prototype = Object.create(User.prototype);

    /**
     * @class Computer
     * @extends User
     * @constructor
     */
	function Computer(team, agents){
		User.call(this, team, agents);
	}
	Computer.prototype = Object.create(User.prototype);


	gh.User = User;
	gh.Player = Player;
	gh.Computer = Computer;
	
	return gh;
})(gh || {});