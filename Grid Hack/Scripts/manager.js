/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("manager.js loaded");

	/**
	 * @class manager
	 * @constructor
	 */
	function Manager(players){
		this.players 			= players || [];
		this.activePlayer 		= 0;
	}

	Manager.prototype.addPlayer = function(player){
		this.players = this.players || [];
		this.players.push(player);
	};

	Manager.prototype.removePlayer = function(player){
		for(var it = 0; it < this.players.length; it++){
			if(player === this.players[it]){
				this.players.shift(it, 1);
				it--;
			}
		}
	};

	Manager.prototype.setActivePlayer = function(name){
		for(var it = 0; it < this.players.length; it++){
			if(name === this.players[it].name){
				this.activePlayer = it;
				return;
			}
		}
	};

	Manager.prototype.getActivePlayer = function(){
		return this.players[this.activePlayer];
	}

	Manager.prototype.setNextTurn = function(){
		if(this.players[this.activePlayer].setNextAgent()){
			return true;
		} 

		this.activePlayer = this.activePlayer || 0;
		this.activePlayer++;
		if(this.activePlayer >= this.players.length){
			this.activePlayer = 0;
		}
	};

	/**
	 * @class Player
	 * @constructor
	 */
	function Player(name, AI, roster){
		this.name 			= name;
		this.AI 			= AI;
		this.roster 		= roster || [];
		this.activeAgent 	= 0;
	}

	Player.prototype.addAgent = function(agent){
		this.roster.push(agent);
	};

	Player.prototype.getActiveAgent = function(){
		return this.roster[this.activeAgent];
	}

	/**
	 * @method setNextAgent
	 * @param
	 * @return {bool} true if the player has an unused agent, false if the player's agents have all had a turn.
	 */
	Player.prototype.setNextAgent = function(){
		this.activeAgent++;
		if(this.activeAgent >= this.roster.length){
			this.activeAgent = 0;
			return false;
		}

		return true;
	}


	gh.Manager = Manager;
	gh.Player = Player;

	return gh;
})(gh || {});