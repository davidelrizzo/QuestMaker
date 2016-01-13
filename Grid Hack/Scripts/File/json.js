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
	 * @method loadDataFile
	 */
	gh.json.loadDataFile = function(path){
		var data;

		data = file.getAJAX(path);
		data = JSON.parse(data);

		return data;
	};

	/**
	 * @method getTeams
	 */
	gh.json.getTeams = function(jsonTeam){
		var teams = {};

		for(var key in jsonTeam){
			teams[key] = new gh.Team(key, jsonTeam[key]);
		}

		return teams;
	};

	/**
	 * @method getFloor
	 */
	gh.json.getFloor = function(jsonMap, directory, jsonStdGraphics){
		var floor = [];

		for(var y = 0; y < jsonMap.length; y++){
			floor.push([]);
			for(var x = 0; x < jsonMap[y].length; x++){
				var border = {};

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
				floor[y].push(new gh.Cell(x, y, directory + "Graphics/Floor Tiles/", jsonMap[y][x].img, border, 64, jsonMap[y][x].walkable));
			}
		}

		return floor;
	};

	/**
	 * @method getAgents
	 */
	gh.json.getAgents = function(jsonAgents, jsonAgentTemplates, directory){
		var agents = [];

		for(var it = 0; it < jsonAgents.length; it++){
			var agent = new gh.Agent(
				jsonAgents[it].id,
				{"x" : jsonAgents[it].position.x, "y" : jsonAgents[it].position.y},
				jsonAgents[it].faction,
				jsonAgentTemplates[jsonAgents[it].id].sprites
				jsonAgentTemplates[jsonAgents[it].id].moveDice);

			agents[agent.position.y] = agents[agent.position.y] || [];
			agents[agent.position.y][agent.position.x] = agents[agent.position.y][agent.position.x] || [];
			agents[agent.position.y][agent.position.x] = agent;
		}

		return agents;
	};


	/**
	 * @method getTriggers
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
				  triggers.exit.push(new gh.ExitTrigger(jsonTriggers[it].type, jsonTriggers[it].pos.x, jsonTriggers[it].pos.y));
				  break;
				default:
				  triggers.push(new gh.Trigger(jsonTriggers[it].type, jsonTriggers[it].pos.x, jsonTriggers[it].pos.y));
				  break;
			}
			
		}

		return triggers;
	}

	/**
	 * @method getLevel
	 */
	gh.json.getLevel = function(directory, levelName, jsonAgentTemplates){
		var jsonLevel   = gh.json.loadDataFile(directory + "Data/" + levelName + ".json");		
		var teams       = gh.json.getTeams(jsonLevel.teams);

		var level = new gh.Level(
			jsonLevel.name, 
			jsonLevel.introText, 
			jsonLevel.numHeroes, 
			jsonLevel.availableHeroes, 
			teams,
			new gh.Map(gh.json.getFloor(jsonLevel.mapData.map, directory, jsonLevel.stdGraphics), 64),
			gh.json.getAgents(jsonLevel.mapData.agents, jsonAgentTemplates, directory),
			gh.json.getTriggers(jsonLevel.mapData.triggers),
			jsonLevel.stdGraphics);

		return level;
	};

	/**
	 * @method getCampaignLevels
	 */
	gh.json.getCampaignLevels = function(jsonLevels, directory, jsonAgentTemplates){
		var levels = [];

		for(var it = 0; it < jsonLevels.length; it++){
			levels.push(gh.json.getLevel(directory, jsonLevels[it], jsonAgentTemplates));
		}

		return levels;
	};

	/**
	 * @method getCampaign
	 */
	gh.json.getCampaign = function(directory, campaignName){
		var jsonCampaign = gh.json.loadDataFile(directory + campaignName + "/Data/" + campaignName + ".json");

		var jsonAgentTemplates = gh.json.loadDataFile(directory + campaignName + "/Data/creatures.json");
		var levels = gh.json.getCampaignLevels(jsonCampaign.levels, directory + campaignName + "/", jsonAgentTemplates);
		

		var campaign = new gh.Campaign(
			jsonCampaign.name,
			jsonCampaign.introText,
			jsonAgentTemplates,
			levels);

		campaign.ptrActiveLevel = campaign.levels[0];

		return campaign;
	}

	return gh;
})(gh || {});