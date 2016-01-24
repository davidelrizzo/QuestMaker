/**
 * TO CONSIDER
 *        Handling the directories in which files are placed assumes some knowledge of the
 *        file structure.  E.g. a campaign json data file is located in 
 *        "./Data/Campaigns/*campaign name* /Data/*specific file name*".  This might not be
 *        a sensible assumption with regards to flexibility in design.
 *
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){

	console.log("json.js loaded");

	/**
	 * @class json
	 * @constructor
	 */
	gh.json = gh.json || {};

	/**
	 * This method loads a campaign from a number of json files located within the given directory.
	 * This method assumes the following file structure:
	 * 'directory'/'campaignName'
	 * 'directory'/'campaignName'/Data/ - This folder houses the relevant json assets
	 * 'directory'/'campaignName'/Graphics/ - This folder houses the relevant graphic assets
	 *
	 * @method getCampaign
	 * @param {String} directory The directory in which the campaign data is located.
	 * @param {String} campaignName The name of the campaign json file.
	 * @return campaign
	 */
	gh.json.getCampaign = function(directory, campaignName){
		var jsonCampaign 		= gh.json.loadDataFile(directory + campaignName + "/Data/" + campaignName + ".json");
		var jsonAgentTemplates 	= gh.json.loadDataFile(directory + campaignName + "/Data/creatures.json");
		var jsonWeaponTemplates = gh.json.loadDataFile(directory + campaignName + "/Data/weapons.json" )
		var jsonLevels 			= gh.json.getCampaignLevels(
			jsonCampaign.levels, 
			directory + campaignName + "/", 
			jsonAgentTemplates, 
			jsonWeaponTemplates);
		

		var campaign = new gh.Campaign(
			jsonCampaign.name,
			jsonCampaign.introText,
			jsonAgentTemplates,
			jsonWeaponTemplates,
			jsonLevels);

		campaign.ptrActiveLevel = campaign.levels[0];

		return campaign;
	}

	/**
	 * Generic AJAX JSON file loader.
	 *
	 * @method loadDataFile
	 * @param {} path
	 * @return data
	 */
	gh.json.loadDataFile = function(path){
		var data;

		data = file.getAJAX(path);
		data = JSON.parse(data);

		return data;
	};

	/**
	 * Description
	 * @method getCampaignLevels
	 * @param {} jsonLevels
	 * @param {} directory
	 * @param {} jsonAgentTemplates
	 * @return levels
	 */
	gh.json.getCampaignLevels = function(jsonLevels, directory, jsonAgentTemplates, jsonWeaponTemplates){
		var levels = [];

		for(var it = 0; it < jsonLevels.length; it++){
			var level = gh.json.getLevel(
				directory, 
				jsonLevels[it], 
				jsonAgentTemplates,
				jsonWeaponTemplates);
			levels.push(level);
		}

		return levels;
	};

	/**
	 * Description
	 * @method getLevel
	 * @param {String} directory The directory in which the campaign data is located.
	 * @param {} levelName
	 * @param {} jsonAgentTemplates
	 * @return level
	 */
	gh.json.getLevel = function(directory, levelName, jsonAgentTemplates, jsonWeaponTemplates){
		var jsonLevel   = gh.json.loadDataFile(directory + "Data/" + levelName + ".json");		
		var teams       = gh.json.getTeams(jsonLevel.teams);
		var players 	= gh.json.getPlayers(jsonLevel.players, jsonAgentTemplates, jsonWeaponTemplates);
		var agents 		= gh.json.buildAgentList(players);
		var items 		= undefined;
		var triggers    = gh.json.getTriggers(jsonLevel.mapData.triggers);
		var floor 		= gh.json.getFloor(
			jsonLevel.mapData.map, 
			directory, 
			jsonLevel.stdGraphics,
			players,
			items,
			triggers);
		var map 		= new gh.Map(floor);
		
		var level = new gh.Level(
			jsonLevel.name, 
			jsonLevel.introText, 
			jsonLevel.numHeroes, 
			jsonLevel.availableHeroes, 
			teams,
			map,
			players,
			agents,
			triggers,
			jsonLevel.stdGraphics);

		return level;
	};

	/**
	 * Description
	 * @method getTeams
	 * @param {} jsonTeam
	 * @return teams
	 */
	gh.json.getTeams = function(jsonTeam){
		var teams = {};

		for(var key in jsonTeam){
			teams[key] = new gh.Team(key, jsonTeam[key]);
		}

		return teams;
	};

	gh.json.getPlayers = function(jsonPlayers, jsonAgentTemplates, jsonWeaponTemplates){
		jsonPlayers = jsonPlayers || [];

		var players = [];
		for(var it = 0; it < jsonPlayers.length; it++){
			players.push(
				new gh.Player(
					jsonPlayers[it].name, 
					jsonPlayers[it].AI, 
					gh.json.getAgents(jsonPlayers[it].roster, jsonAgentTemplates, jsonWeaponTemplates))
			);
		}

		return players;
	};

	gh.json.buildAgentList = function(players){
		var agents = [];
		players = players || [];

		for(var it = 0; it < players.length; it++){
			players[it].roster = players[it].roster || [];
			agents = agents.concat(players[it].roster);
		}

		return agents;
	};

	/**
	 * This method builds an array of agents which are present in a level.
	 * @method getAgents
	 * @param {} jsonAgents
	 * @param {} jsonAgentTemplates
	 * @return agents
	 */
	gh.json.getAgents = function(jsonAgents, jsonAgentTemplates, jsonWeaponTemplates){
		var agents = [];

		for(var it = 0; it < jsonAgents.length; it++){
			var mainHand = jsonAgentTemplates[jsonAgents[it].name].mainHand;
			var weapon = jsonWeaponTemplates[mainHand];
			agents.push(
				new gh.Agent(
					jsonAgents[it].name,
					jsonAgents[it].id,
					{"x" : jsonAgents[it].position.x, "y" : jsonAgents[it].position.y},
					jsonAgents[it].faction,
					jsonAgentTemplates[jsonAgents[it].name].sprites,
					jsonAgentTemplates[jsonAgents[it].name].moveDice,
					jsonAgentTemplates[jsonAgents[it].name].baseMove,
					jsonAgentTemplates[jsonAgents[it].name].baseDefence,
					new gh.Weapon(
						weapon.name,
						weapon.size,
						weapon.attack,
						weapon.hands,
						weapon.range,
						weapon.diagonal,
						weapon.cost))
				);
		}

		return agents;
	};


	/**
	 * Description
	 * @method getFloor
	 * @param {} jsonMap
	 * @param {} directory
	 * @param {} jsonStdGraphics
	 * @param {} agents
	 * @param {} itmes
	 * @param {} triggers
	 * @return floor
	 */
	gh.json.getFloor = function(jsonMap, directory, jsonStdGraphics, players, itmes, triggers){
		var floor = [];

		for(var y = 0; y < jsonMap.length; y++){
			floor.push([]);
			for(var x = 0; x < jsonMap[y].length; x++){
				var border = {};

				/**
				 * Get the borders
				 */
				if(jsonMap[y][x].border !== undefined){
					
					var jsonBorder = jsonMap[y][x].border;
					if(jsonBorder.wall !== undefined){
						for(var it = 0; it < jsonBorder.wall.length; it++){
							switch(jsonBorder.wall[it]){
								case "top":
								  var wall = new gh.Wall("top", x, y, "bottom", x, y-1);
								  border.top = wall;
								  if(y > 0){
								  	floor[y-1][x].borders = floor[y-1][x].borders || {};
								  	floor[y-1][x].borders.bottom = wall;
								  }
								  break;
								case "left":
								  var wall = new gh.Wall("left", x, y, "right", x-1, y);
								  border.left = wall;
								  if(x > 0){
								  	floor[y][x-1].borders = floor[y][x-1].borders || {};
								  	floor[y][x-1].borders.right = wall;
								  }
								  break;
								default:
								  break;
							}
						}
					}

					if(jsonBorder.door !== undefined){
						for(var key in jsonBorder.door){
							switch (key){
								case "top":
								  var door = new gh.Door("top", x, y, "bottom", x, y-1, jsonBorder.door.top.open, jsonStdGraphics.door);
								  border.top = door;
								  if(y > 0){
								  	floor[y-1][x].borders = floor[y-1][x].borders || {};
								  	floor[y-1][x].borders.bottom = door;
								  }
								  break;
								case "left":
								  var door = new gh.Door("left", x, y, "right", x-1, y, jsonBorder.door.left.open, jsonStdGraphics.door);
								  border.left = door;
								  if(x > 0){
								  	floor[x-1][y].borders = floor[x-1][y].borders || {};
								  	floor[x-1][y].borders.right = door;
								  }
								  break;
								default:
								  break;
							}
						}
					}

				}

				var cell = new gh.Cell(
					x, 
					y, 
					jsonMap[y][x].walkable,
					undefined,					// visible
					border,
					undefined,					// items
					undefined,					// agents
					undefined,					// triggers
					jsonMap[y][x].img);
				floor[y].push(cell);
			}
		}

		this.addPlayerAgentsToMap(floor, players);
		this.addTriggers(floor, triggers);

		return floor;
	};

	/**
	 *
	 */
	gh.json.addPlayerAgentsToMap = function(map, players){
		players = players || [];
		for(var it = 0; it < players.length; it++){
			players[it].roster = players[it].roster || [];
			for(var a = 0; a < players[it].roster.length; a++){
				var agent = players[it].roster[a];
				map[agent.position.y][agent.position.x].agents = map[agent.position.y][agent.position.x].agents || [];
				map[agent.position.y][agent.position.x].agents.push(agent);
			}
		}
	};

	/**
	 * Description
	 *
	 * @depreciated
	 * @method addAgents
	 * @param {} map
	 * @param {} agents
	 * @return 
	 */
	gh.json.addAgents = function(map, agents){
		for(var it = 0; it < agents.length; it++){
			map[agents[it].position.y][agents[it].position.x].agents = map[agents[it].position.y][agents[it].position.x].agents || [];
			map[agents[it].position.y][agents[it].position.x].agents.push(agents[it]);
		}
	};

	/**
	 * Description
	 * @method addTriggers
	 * @param {} map
	 * @param {} triggers
	 * @return 
	 */
	gh.json.addTriggers = function(map, triggers){
		for(var key in triggers){
			for(var it = 0; it < triggers[key].length; it++){
				var cell = map[triggers[key][it].y][triggers[key][it].x];
				cell.triggers = cell.triggers || [];
				cell.triggers.push(triggers[key][it]);
			}
		}
	};


	/**
	 * This method builds a 2d list of agents, with the location of the agent on the map the same as its
	 * location in the 2d array.
	 * This method has been depreciated and no longer part of the framework.
	 * A key weakness of this method is it does not (without alteration) permit multible agents to occupy a cell.
	 *
	 * @method getAgentGrid
	 * @depreciated
	 * @param {} jsonAgents
	 * @param {} jsonAgentTemplates
	 * @param {String} directory This variable is currently not utilized by the method.
	 * @return agents
	 */
	gh.json.getAgentGrid = function(jsonAgents, jsonAgentTemplates, directory){
		var agents = [];

		for(var it = 0; it < jsonAgents.length; it++){
			var agent = new gh.Agent(
				jsonAgents[it].id,
				{"x" : jsonAgents[it].position.x, "y" : jsonAgents[it].position.y},
				jsonAgents[it].faction,
				jsonAgentTemplates[jsonAgents[it].id].sprites,
				jsonAgentTemplates[jsonAgents[it].id].moveDice,
				jsonAgentTemplates[jsonAgents[it].id].baseMove);

			agents[agent.position.y] = agents[agent.position.y] || [];
			agents[agent.position.y][agent.position.x] = agents[agent.position.y][agent.position.x] || [];
			agents[agent.position.y][agent.position.x] = agent;
		}

		return agents;
	};


	/**
	 * Description
	 * @method getTriggers
	 * @param {} jsonTriggers
	 * @return triggers
	 */
	gh.json.getTriggers = function(jsonTriggers){
		var triggers = {};
        triggers.entry = triggers.entry || [];
        triggers.exit  = triggers.exit || [];

		for(var it = 0; it < jsonTriggers.length; it++){
			switch(jsonTriggers[it].type){
				case "entry":
				  triggers.entry.push(
				  	new gh.EntryTrigger(
				  		jsonTriggers[it].pos.x, 
				  		jsonTriggers[it].pos.y));
				  break;
				case "exit":
				  triggers.exit.push(
				  	new gh.ExitTrigger(
				  		jsonTriggers[it].pos.x, 
				  		jsonTriggers[it].pos.y));
				  break;
				default:
				  triggers.push(new gh.Trigger(
				  	jsonTriggers[it].pos.x, 
				  	jsonTriggers[it].pos.y));
				  break;
			}
			
		}

		return triggers;
	}

	return gh;
})(gh || {});