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

			// Add the agents to the listening queue
			//this.msgPump.addListener("move", gh.ptrActiveLevel.heroes[0], "onMove");
			console.log(gh.ptrActiveLevel.agents);
			for(var it = 0; it < gh.ptrActiveLevel.agents.length; it++){
				this.msgPump.addListener("move", gh.ptrActiveLevel.agents[it], "onMove");
			}

			stateGame.diceA = new gh.Dice(6, "dice1.png");
			stateGame.diceB = new gh.Dice(6, "dice1.png");

			// Set the first turn to the first agent.
			gh.ptrActiveLevel.heroes[0].newTurn(stateGame.diceA);
			gh.ptrActiveLevel.activeAgent = gh.ptrActiveLevel.agents[0];
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
			if(gh.hud.buttonEndTurn.clicked === true){
				this.msgPump.removeListener("move", gh.ptrActiveLevel.activeAgent);
				gh.hud.buttonEndTurn.clicked = false;
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
				});

			/**
			 * Handle mouse input.
			 */
			if(input.mouse.clicked === true){
				this.msgPump.postMessage("onClick", {"mouseX" : input.mouse.x, "mouseY" : input.mouse.y, "cellX" : selectedCell.x, "cellY" : selectedCell.y});
				input.mouse.clicked = false;

				// Has an EntryTrigger been selected?

			}

			/**
			 * Handle keyboard input.
			 */

			// display scale input
			if(input.keyboard.isPressed(input.keyboard.PLUS)){
				input.keyboard.key[input.keyboard.PLUS].pressed = false;
				gh.display.scale += 0.05;
			}
			if(input.keyboard.isPressed(input.keyboard.MINUS)){
				input.keyboard.key[input.keyboard.MINUS].pressed = false;
				gh.display.scale -= 0.05;
				if(gh.display.scale < 0.2){
					gh.display.scale = 0.2;
				}
			}

			// display location input
			//if(input.keyboard.key[input.keyboard.UP]){
			if(input.keyboard.isPressed(input.keyboard.UP)){
				gh.display.offset.y -= 5;
			}
			//if(input.keyboard.key[input.keyboard.DOWN]){
			if(input.keyboard.isPressed(input.keyboard.DOWN)){
				gh.display.offset.y += 5;
			}
			//if(input.keyboard.key[input.keyboard.LEFT]){
			if(input.keyboard.isPressed(input.keyboard.LEFT)){
				gh.display.offset.x -= 5;
			}
			//if(input.keyboard.key[input.keyboard.RIGHT]){
			if(input.keyboard.isPressed(input.keyboard.RIGHT)){
				gh.display.offset.x += 5;
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
			var n = gh.ptrActiveLevel.heroes[0].move;
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

		return stateGame;
	})(stateGame || {});

    gh.stateGame = stateGame;
	return gh;
})(gh || {});