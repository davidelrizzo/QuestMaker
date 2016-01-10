"use strict"

var gh = (function(gh){
	console.log("level.js loaded");

	function Level(name, introText, numHeroes, availableHeroes, teams, map, agents, triggers, stdGraphics){
		this.name                = name;
		this.introText           = introText;
		this.numHeroes           = numHeroes;
		this.availableHeroes     = availableHeroes;
		this.teams               = teams;
		this.map			     = map;
		this.agents              = agents;
		this.triggers            = triggers;
		this.stdGraphics         = stdGraphics;
	}

	Level.prototype.drawAgents = function(context, scale, size, offset, team){
		//console.log(this.agents);

		for(var y = 0; y < this.agents.length; y++){
			if(this.agents[y] !== undefined){
				for(var x = 0; x < this.agents[y].length; x++){
					if(this.agents[y][x] !== undefined){
						if(this.map.floor[y][x].visible[team] === true){
							this.agents[y][x].draw(
								"token", 
								gh.assets.sprites, 
								context, 
								scale, 
								size, 
								offset);							
						}
					}
				}
			}
		}

	};

	Level.prototype.drawEntryTriggers = function(context, scale, size, offset){
		var entryTriggers = this.triggers.entry;

		for(var it = 0; it < entryTriggers.length; it++){
			entryTriggers[it].draw(context, scale, size, offset);
		}
	}

	Level.prototype.isEntryTriggerSelected = function(x, y){
		for(var it = 0; it < this.triggers.entry.length; it++){
			//if(this.triggers)
		}  
	}

	gh.Level = Level;

	return gh;
})(gh || {});