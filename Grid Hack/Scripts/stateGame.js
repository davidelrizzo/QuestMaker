/**
 * @module gh
 */

"use strict"

/**
 * @class gh
 */
var gh = (function(gh){
	console.log("stateGame.js loaded");

    /**
     * @class stateGame
     */
	var stateGame = (function(stateGame){

		/**
		 * Private globals
		 */
		var d6 	= new gh.Dice(6, "dice1.png");


		/**
		 * Public globals
		 */
		stateGame.msgPump = new stdlib.MessagePump();

		/**
		 * This method must be called prior to the run method.
		 * It is responsible for:
		 * 1) Setting up the message listening queue's for agents, objects, borders, cells and triggers.
		 * @method initialize
		 * @return 
		 */
		stateGame.initialize = function(){

			gh.hud.setup();

			console.log(gh);

			/**	
			 * Setup message listeners
			 */

			// Hud listeners
			this.msgPump.addListener("onMouseOver", gh.hud.buttonEndTurn, "onMouseOver");
			this.msgPump.addListener("onClick", gh.hud.buttonEndTurn, "onClick");

			// Board listeners

			// Doors
			var doors = gh.ptrActiveLevel.map.getDoors();
			for(var it = 0; it < doors.length; it++){
				this.msgPump.addListener("onMouseOver", doors[it], "onMouseOver");
				this.msgPump.addListener("onClick", doors[it], "onUse");
			}

			stateGame.diceA = new gh.Dice(6, "dice1.png");
			stateGame.diceB = new gh.Dice(6, "dice1.png");


			// Set the first turn to the first agent.
			var manager = gh.ptrActiveLevel.manager;
			var player  = manager.players[manager.activePlayer];
			var agent 	= player.roster[player.activeAgent];
			agent.newTurn(stateGame.diceA);

			this.msgPump.addListener("move", agent, "onMove");

			// Add agents to the onMoueseOver event
			for(var p = 0; p < manager.players.length; p++){
				for(var a = 0; a < manager.players[p].roster.length; a++){
					this.msgPump.addListener("onMouseOver", manager.players[p].roster[a], "onMouseOver");
				}
			}

			console.log(agent);
		};

		/**
		 * This method calls the update and render methods.
		 * @method run
		 * @return Literal
		 */
		stateGame.run = function(){
			this.update();
			this.render();

			return "stateGame";
		};

		/**
		 * This method adjudicates user mouse and keyboard input and updates message queues accordingly.
		 * @method update
		 * @return Literal
		 */
		stateGame.update = function(){

			gh.display.handleInput(input);

			if(gh.hud.buttonEndTurn.clicked === true){
				this.endTurn();
			}

			var selectedCell = gh.display.getMouseToCell(input.mouse.x, input.mouse.y);
			var cell;
			if(gh.ptrActiveLevel.map.floor[selectedCell.y] !== undefined){
				if(gh.ptrActiveLevel.map.floor[selectedCell.y][selectedCell.x] !== undefined){
					cell = gh.ptrActiveLevel.map.floor[selectedCell.y][selectedCell.x];
				} else {
					cell = undefined;
				}
			}

			if(gh.ptrActiveLevel.manager.getActivePlayer().AI === true){
				console.log("AI turn");
				this.endTurn();
			} else {
				console.log("Player turn");

				this.msgPump.postMessage(
					"onMouseOver", 
					{
						"mouseX"    : input.mouse.x, 
					    "mouseY"    : input.mouse.y, 
					    "cellX"     : selectedCell.x, 
					    "cellY"     : selectedCell.y,
					    "cellSize"  : gh.display.cellSize,
					    "scale"     : gh.display.scale,
					    "offset"    : gh.display.offset,
					    "cell"      : cell,
					    "agents"    : gh.ptrActiveLevel.agents
					}
				);

				if(input.mouse.clicked === true){
					this.msgPump.postMessage(
						"onClick", 
						{
							"mouseX" 	: input.mouse.x, 
							"mouseY" 	: input.mouse.y, 
							"cellX" 	: selectedCell.x, 
							"cellY" 	: selectedCell.y, 
							"agent" 	: gh.ptrActiveLevel.manager.getActivePlayer().getActiveAgent(),
							"map"		: gh.ptrActiveLevel.map
						}
					);
					input.mouse.clicked = false;

					// Has an EntryTrigger been selected?

				}

				// character movement input
				if(input.keyboard.isPressed(input.keyboard.A)){
					this.msgPump.postMessage(
						"move", 
						{
							"direction" : "left", 
							"map" 		: gh.ptrActiveLevel.map, 
							"agents" 	: gh.ptrActiveLevel.agents, 
							"objects" 	: undefined
						});
					input.keyboard.key[input.keyboard.A].pressed = false;
				}
				if(input.keyboard.isPressed(input.keyboard.D)){
					this.msgPump.postMessage(
						"move", 
						{
							"direction" : "right", 
							"map" 		: gh.ptrActiveLevel.map, 
							"agents" 	: gh.ptrActiveLevel.agents, 
							"objects" 	: undefined
						});
					input.keyboard.key[input.keyboard.D].pressed = false;
				}
				if(input.keyboard.isPressed(input.keyboard.S)){
					this.msgPump.postMessage(
						"move", 
						{
							"direction" : "down", 
							"map" 		: gh.ptrActiveLevel.map, 
							"agents" 	: gh.ptrActiveLevel.agents, 
							"objects" 	: undefined
						});
					input.keyboard.key[input.keyboard.S].pressed = false;
				}
				if(input.keyboard.isPressed(input.keyboard.W)){
					this.msgPump.postMessage(
						"move", 
						{
							"direction" : "up", 
							"map" 		: gh.ptrActiveLevel.map, 
							"agents" 	: gh.ptrActiveLevel.agents, 
							"objects" 	: undefined
						});
					input.keyboard.key[input.keyboard.W].pressed = false;
				}

			}

			this.msgPump.handleMessages();

			return "stateGame";

		};

		/**
		 * This method draws the board to the canvas with respect to a players (team) view.
		 * @method render
		 * @return 
		 */
		stateGame.render = function(){
			gh.display.clear();

			/**
			 * Draw the game board
			 */

			gh.display.context.save();
			gh.display.context.fillRect(0, 0, gh.display.canvas.width, gh.display.canvas.height);
			gh.display.context.restore();

			gh.ptrActiveLevel.draw(
				gh.display.context,
				gh.display.scale,
				gh.display.cellSize,
				gh.display.offset,
				gh.assets.sprites,
				"Empire");

			/**
			 * Draw the hud
			 */
			//var n = gh.ptrActiveLevel.heroes[0].move;
			var n = gh.ptrActiveLevel.manager.getActivePlayer().getActiveAgent().move;
			if( (n-6) > 0 ){
				stateGame.diceA.draw(
					6, 
					gh.display.context, 
					64, 64, 64*gh.display.scale, 64*gh.display.scale, 
					gh.assets.sprites);

				stateGame.diceB.draw(
					n-6,
					gh.display.context,
					128, 64, 64 * gh.display.scale, 64 * gh.display.scale,
					gh.assets.sprites);
			} else {
				stateGame.diceA.draw(
					n,
					gh.display.context,
					64, 64, 64*gh.display.scale, 64*gh.display.scale, 
					gh.assets.sprites);
			}

			gh.hud.draw();
		};

		stateGame.endTurn = function(){
			this.msgPump.removeListener("move", gh.ptrActiveLevel.manager.getActivePlayer().getActiveAgent());
			gh.ptrActiveLevel.manager.setNextTurn();
			this.msgPump.addListener("move", gh.ptrActiveLevel.manager.getActivePlayer().getActiveAgent(), "onMove");
			gh.ptrActiveLevel.manager.getActivePlayer().getActiveAgent().newTurn(d6);
			gh.hud.buttonEndTurn.clicked = false;
		};

		return stateGame;
	})(stateGame || {});

    gh.stateGame = stateGame;
	return gh;
})(gh || {});