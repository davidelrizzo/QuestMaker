/**
 *
 * @module gh
 * @main gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("gh.js loaded");

	/**
	 * Public globals.
	 */
	gh.ptrActiveCampaign 	= undefined;
	gh.ptrActiveLevel 		= undefined;
	

	/**
	 * Prep the application for running here by laoding the requisit file data and initializing the gameStates.
	 * 1) Load the display object.
	 * 2) Load the campaign data from JSON sources.
	 * 3) Load game assets (graphics, music, etc.).
	 * 4) initialize the stateSetup prior to its use.
	 * @method setup
	 * @param {String} canvasID The identifier of a DOM canvas element.
	 * @return 
	 */
	gh.setup = function(canvasID){
		gh.display 			   = new graphics.Display(canvasID);
		gh.activeState         = "stateSetup";

		gh.loadCampaignData();

		gh.loadAssets();

		gh.ptrActiveLevel.heroes = gh.generateStartingPlayers(gh.ptrActiveCampaign.agentTemplates);

		/**
		 * Load the dice sprite sheet
		 */
		gh.assets.loadDiceSprites("./Data/Graphics/", "dice1.png");

		gh.stateSetup.initialize();

		console.log(this);
	};

	/**
	 * Load the campaign data here.
	 * This method is a dummy method. It is assumed that a game menu system, when followed, will
	 * replace this.
	 * @method loadCampaignData
	 * @return 
	 */
	gh.loadCampaignData = function(){
		gh.ptrActiveCampaign   = gh.json.getCampaign("./Data/Campaigns/", "Hero Quest");
		gh.ptrActiveLevel      = gh.ptrActiveCampaign.ptrActiveLevel;
	};

	/**
	 * Load the image data and music data.
	 * @method loadAssets
	 * @return 
	 */
	gh.loadAssets = function(){
		gh.assets.loadMapSprites(gh.ptrActiveLevel.map, "./Data/Campaigns/" + gh.ptrActiveCampaign.name + "/Graphics/Floor Tiles/");
		gh.assets.loadStdGraphics(gh.ptrActiveLevel.stdGraphics, "./Data/Campaigns/" + gh.ptrActiveCampaign.name + "/Graphics/Border/");
		gh.assets.loadAgentSprites(gh.ptrActiveCampaign.agentTemplates, "./Data/Campaigns/" + gh.ptrActiveCampaign.name + "/Graphics/Creatures/");
		gh.assets.sprites.tokenHighlight = new graphics.Sprite("./Data/Campaigns/" + gh.ptrActiveCampaign.name + "/Graphics/Creatures/tokenHighlight.gif");
	};

	/**
	 * The main game loop
	 * @method run
	 * @return 
	 */
	gh.run = function(){
		gh.activeState = gh[gh.activeState].run();

		requestAnimationFrame(gh.run);
	};
	
	/**
	 * Dummy function to generate a group of starting heroes for placement.
	 * @method generateStartingPlayers
	 * @param {json} jsonAgentTemplates A json object which defines the properties of agents in the game.
	 * @return players
	 */
	gh.generateStartingPlayers = function(jsonAgentTemplates){
		var players = [];

		var barbarian = new gh.Agent(
			"Barbarian",
			undefined,
			"Empire",
			jsonAgentTemplates["Barbarian"].sprites,
			2,
			0
			);
		players.push(barbarian);

		var elf = new gh.Agent(
			"Elf",
			undefined,
			"Empire",
			jsonAgentTemplates["Elf"].sprites,
			2,
			0
			);
		players.push(elf);

		var dwarf = new gh.Agent(
			"Dwarf",
			undefined,
			"Empire",
			jsonAgentTemplates["Dwarf"].sprites,
			2,
			0
			);
		players.push(dwarf);

		var wizard = new gh.Agent(
			"Wizard",
			undefined,
			"Empire",
			jsonAgentTemplates["Wizard"].sprites,
			2,
			0
			);
		players.push(wizard);

		return players;
	};

	return gh;
})(gh || {});