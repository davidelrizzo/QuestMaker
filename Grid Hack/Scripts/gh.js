/**
*	OBJECTS
*
*	Display
*   Sprite
*   Pixel
*
*	Hud
*	Board
*	
*	Map
*	Cell
*
*	Agent
*   Wall
*   Door
*   Trigger
*	Border
*	Item
*
*	GameState
*	
*	Message
*
*   json
*	
*	Keyboard
*	Mouse
*/

"use strict"

var gh = (function(gh){
	console.log("gh.js loaded");
	

	/**
	 *    Load various game assets here.
	 *
	 * TO DO
	 *    o add a player hero roster for placement on the board
	 *    o add creatures to the resources list
	 */
	gh.setup = function(canvasID){
		console.log("gh.setup");

		gh.display 			   = new graphics.Display(canvasID);
		gh.activeState         = "stateSetup";

		gh.ptrActiveCampaign   = gh.json.getCampaign("./Data/Campaigns/", "Hero Quest");
		gh.ptrActiveLevel      = gh.ptrActiveCampaign.ptrActiveLevel;

		gh.assets.loadMapSprites(gh.ptrActiveLevel.map, "./Data/Campaigns/" + gh.ptrActiveCampaign.name + "/Graphics/Floor Tiles/");
		gh.assets.loadStdGraphics(gh.ptrActiveLevel.stdGraphics, "./Data/Campaigns/" + gh.ptrActiveCampaign.name + "/Graphics/Border/");
		gh.assets.loadAgentSprites(gh.ptrActiveCampaign.agentTemplates, "./Data/Campaigns/" + gh.ptrActiveCampaign.name + "/Graphics/Creatures/");
		gh.assets.sprites.tokenHighlight = new graphics.Sprite("./Data/Campaigns/" + gh.ptrActiveCampaign.name + "/Graphics/Creatures/tokenHighlight.gif");

		gh.ptrActiveLevel.heroes = gh.generateStartingPlayers(gh.ptrActiveCampaign.agentTemplates);

		gh.stateSetup.initialize();

		console.log(this);
	};

	/**
	 *    The main game loop
	 */
	gh.run = function(){
		gh.activeState = gh[gh.activeState].run();

		requestAnimationFrame(gh.run);
	};
	
	/**
	 * DESC
	 *    Dummy function to generate a group of starting heroes for placement.
	 */
	gh.generateStartingPlayers = function(jsonAgentTemplates){
		var players = [];

		var barbarian = new gh.Agent(
			"Barbarian",
			undefined,
			"Empire",
			jsonAgentTemplates["Barbarian"].sprites
			);
		players.push(barbarian);

		var elf = new gh.Agent(
			"Elf",
			undefined,
			"Empire",
			jsonAgentTemplates["Elf"].sprites
			);
		players.push(elf);

		var dwarf = new gh.Agent(
			"Dwarf",
			undefined,
			"Empire",
			jsonAgentTemplates["Dwarf"].sprites
			);
		players.push(dwarf);

		var wizard = new gh.Agent(
			"Wizard",
			undefined,
			"Empire",
			jsonAgentTemplates["Wizard"].sprites
			);
		players.push(wizard);

		return players;
	};

	return gh;
})(gh || {});