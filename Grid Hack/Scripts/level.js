/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("level.js loaded");

	/**
	 * @constructor
	 * @class Level
	 * @method Level
	 * @param {String} name The name of the level.
	 * @param {String} introText The introductory text for the level.
	 * @param {} maxHeroes
	 * @param {Array} availableHeroes An array of 
	 * @param {} teams
	 * @param {} map
	 * @param {} players
	 * @param {} agents
	 * @param {} triggers
	 * @param {} stdGraphics
	 * @return 
	 */
	function Level(name, introText, maxHeroes, availableHeroes, teams, map, players, agents, triggers, stdGraphics){
		this.name               = name;
		this.introText          = introText;
		this.maxHeroes          = maxHeroes;
		this.availableHeroes    = availableHeroes;
		this.teams              = teams;
		this.map			    = map;
		this.players 			= players;
		this.agents 			= agents;
		this.triggers 			= triggers;
		this.stdGraphics        = stdGraphics;

		this.heroes 			= undefined;
		this.manager 			= undefined;
	}

	/**
	 * Description
	 * @method draw
	 * @param {} context
	 * @param {} scale
	 * @param {} size
	 * @param {} offset
	 * @param {} sprites
	 * @param {} team
	 * @return 
	 */
	Level.prototype.draw = function(context, scale, size, offset, sprites, team){
		this.map.draw(context, size, scale, offset, sprites, team);
	};

	/**
	 * This method draws the visible agents to the board.
	 * @method drawAgents
	 * @param {Object} context The context upon which to draw.
	 * @param {Float} scale The scale to draw the agent by.
	 * @param {Integer} size The cell size of the map grid.
	 * @param {Object} offset An object which cointains the viewport x and y offset for drawing.
	 * @param {} team
	 * @return 
	 */
	Level.prototype.drawAgents = function(context, scale, size, offset, team){
		var agents = this.agents;

		for(var it = 0; it < agents.length; it++){
			if(this.map.floor[agents[it].position.y][agents[it].position.x].visible[team] === true){
				agents[it].draw("token", gh.assets.sprites, context, scale, size, offset);
			}
		}
	};

	/**
	 * Description
	 * @method drawEntryTriggers
	 * @param {} context
	 * @param {} scale
	 * @param {} size
	 * @param {} offset
	 * @return 
	 */
	Level.prototype.drawEntryTriggers = function(context, scale, size, offset){
		var entryTriggers = this.map.triggers.entry;

		for(var it = 0; it < entryTriggers.length; it++){
			entryTriggers[it].draw(context, scale, size, offset);
		}
	}

	/**
	 * Description
	 * @method isEntryTriggerSelected
	 * @param {} x
	 * @param {} y
	 * @return 
	 */
	Level.prototype.isEntryTriggerSelected = function(x, y){
		for(var it = 0; it < this.triggers.entry.length; it++){
			//if(this.triggers)
		}  
	}

	/**
	 * This method finds a player of a given name and returns it or undefined.
	 * @method getPlayer
	 * @param {String} name The name of the player to be found.
	 */
	Level.prototype.getPlayer = function(name){
		var players = this.players || [];

		for(var it = 0; it < players.length; it++){
			if(players[it].name === name){
				return players[it];
			}
		}

		return undefined;
	}

	gh.Level = Level;

	return gh;
})(gh || {});